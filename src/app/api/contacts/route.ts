import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Функция для отправки уведомления в Telegram о контактной форме
async function sendContactTelegramNotification(data: {
  name: string;
  email: string;
  message: string;
  contactId: string;
}): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram bot token or chat ID not configured. Skipping notification.');
    return false;
  }

  // Форматируем сообщение
  const text = `
📬 <b>Новое сообщение с формы контактов!</b>

👤 <b>Имя:</b> ${data.name}
📧 <b>Email:</b> ${data.email}

💬 <b>Сообщение:</b>
${data.message}

🆔 <b>ID:</b> ${data.contactId}
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Chisinau' })}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', result);
      return false;
    }

    console.log('Telegram notification sent successfully');
    return true;

  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Проверяем настройку Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase environment variables are not set');
      return NextResponse.json(
        { error: 'Server configuration error: Supabase not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Валидация обязательных полей
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Создаем запись в базе данных
    console.log('Creating contact form with data:', { name, email, message: message.substring(0, 50) + '...' });
    const { data: contact, error: contactError } = await supabaseAdmin
      .from('contact_forms')
      .insert({
        name,
        email,
        message,
      })
      .select()
      .single();

    if (contactError) {
      console.error('Error creating contact form:', contactError);
      return NextResponse.json(
        {
          error: 'Failed to create contact form',
          details: contactError.message,
        },
        { status: 500 }
      );
    }

    console.log('Contact form created successfully:', contact.id);

    // Отправляем уведомление в Telegram
    await sendContactTelegramNotification({
      name: contact.name,
      email: contact.email,
      message: contact.message,
      contactId: contact.id,
    });

    return NextResponse.json({
      success: true,
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        created_at: contact.created_at,
      },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
