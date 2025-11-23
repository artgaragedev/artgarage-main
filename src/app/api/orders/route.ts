import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendTelegramNotification, sendTelegramFiles } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    // Проверяем настройку Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are not set');
      return NextResponse.json(
        { error: 'Server configuration error: Supabase not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string | null;
    const message = formData.get('message') as string | null;
    const serviceName = formData.get('service_name') as string | null;

    // Валидация обязательных полей
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Создаем заявку в базе данных
    console.log('Creating order with data:', { name, phone, email, message, serviceName });
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        name,
        phone,
        email,
        message,
        service_name: serviceName,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        {
          error: 'Failed to create order',
          details: orderError.message,
          hint: orderError.hint,
          code: orderError.code
        },
        { status: 500 }
      );
    }

    console.log('Order created successfully:', order);

    // Обработка файлов
    const files = formData.getAll('files') as File[];
    const uploadedFiles = [];
    const telegramFiles = [];
    let filesCount = 0;

    for (const file of files) {
      if (file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${order.id}/${Date.now()}.${fileExt}`;

        // Конвертируем файл в buffer для Telegram
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Загружаем файл в Supabase Storage
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('order-files')
          .upload(fileName, file, {
            contentType: file.type,
          });

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          continue; // Пропускаем файл, если не удалось загрузить
        }

        // Сохраняем информацию о файле в базе данных
        const { error: fileError } = await supabaseAdmin
          .from('order_files')
          .insert({
            order_id: order.id,
            file_name: file.name,
            file_path: fileName,
            file_size: file.size,
            file_type: file.type,
          });

        if (fileError) {
          console.error('Error saving file info:', fileError);
        } else {
          uploadedFiles.push(fileName);
          filesCount++;

          // Добавляем файл для отправки в Telegram
          telegramFiles.push({
            name: file.name,
            buffer: buffer,
            type: file.type,
          });
        }
      }
    }

    // Отправляем уведомление в Telegram
    const chatId = process.env.TELEGRAM_CHAT_ID;

    await sendTelegramNotification({
      name: order.name,
      phone: order.phone,
      email: order.email,
      message: order.message,
      orderId: order.id,
      orderNumber: order.order_number,
      filesCount: filesCount,
      serviceName: order.service_name,
    });

    // Отправляем файлы в Telegram (если есть)
    if (telegramFiles.length > 0 && chatId) {
      console.log(`Sending ${telegramFiles.length} files to Telegram...`);
      await sendTelegramFiles(chatId, telegramFiles);
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_number: order.order_number,
        name: order.name,
        phone: order.phone,
        email: order.email,
        message: order.message,
        created_at: order.created_at,
      },
      files: uploadedFiles,
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
