// Функция для отправки уведомлений в Telegram

interface TelegramMessage {
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  orderId: string;
  orderNumber?: string | null;
  filesCount?: number;
  serviceName?: string | null;
  files?: Array<{ name: string; url: string; type: string }>;
}

export async function sendTelegramNotification(data: TelegramMessage): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram bot token or chat ID not configured. Skipping notification.');
    return false;
  }

  // Форматируем сообщение
  const text = `
🔔 <b>Новая заявка${data.orderNumber ? ` #${data.orderNumber}` : ''}!</b>
${data.serviceName ? `\n🎯 <b>Услуга:</b> ${data.serviceName}` : ''}

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
${data.email ? `📧 <b>Email:</b> ${data.email}` : ''}
${data.message ? `\n💬 <b>Сообщение:</b>\n${data.message}` : ''}

📎 <b>Файлов:</b> ${data.filesCount || 0}
${data.orderNumber ? `📋 <b>Номер заказа:</b> #${data.orderNumber}` : ''}

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

// Функция для отправки файлов в Telegram
export async function sendTelegramFiles(
  chatId: string,
  files: Array<{ name: string; buffer: Buffer; type: string }>
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.warn('Telegram bot token not configured. Skipping file upload.');
    return false;
  }

  try {
    for (const file of files) {
      const formData = new FormData();

      // Определяем метод отправки на основе типа файла
      const isImage = file.type.startsWith('image/');
      const method = isImage ? 'sendPhoto' : 'sendDocument';
      const fileField = isImage ? 'photo' : 'document';

      // Создаем blob из buffer
      const blob = new Blob([file.buffer], { type: file.type });
      formData.append(fileField, blob, file.name);
      formData.append('chat_id', chatId);
      formData.append('caption', `📎 ${file.name}`);

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/${method}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(`Error sending file ${file.name}:`, result);
      } else {
        console.log(`File ${file.name} sent successfully`);
      }

      // Небольшая задержка между отправкой файлов
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return true;

  } catch (error) {
    console.error('Error sending Telegram files:', error);
    return false;
  }
}
