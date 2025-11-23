// Тестовый скрипт для проверки Telegram бота

// Загружаем переменные из .env.local
require('dotenv').config({ path: '.env.local' });

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

console.log('🔍 Проверка Telegram настроек...\n');

if (!botToken) {
  console.error('❌ TELEGRAM_BOT_TOKEN не установлен в .env.local');
  console.log('Получите токен от @BotFather в Telegram');
  process.exit(1);
}

if (!chatId) {
  console.error('❌ TELEGRAM_CHAT_ID не установлен в .env.local');
  console.log('Получите Chat ID от @userinfobot в Telegram');
  process.exit(1);
}

console.log('✅ Bot Token:', botToken.slice(0, 10) + '...' + botToken.slice(-5));
console.log('✅ Chat ID:', chatId);
console.log('\n📤 Отправка тестового сообщения...\n');

const testMessage = `
🧪 <b>Тестовое сообщение</b>

Это тестовое уведомление для проверки работы Telegram бота.

Если вы получили это сообщение, значит бот настроен правильно! ✅

⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Chisinau' })}
`;

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chat_id: chatId,
    text: testMessage.trim(),
    parse_mode: 'HTML',
  }),
})
  .then(response => response.json())
  .then(result => {
    if (result.ok) {
      console.log('✅ Сообщение успешно отправлено!');
      console.log('📱 Проверьте ваш Telegram');
      console.log('\n🎉 Telegram бот настроен правильно!\n');
    } else {
      console.error('❌ Ошибка отправки:', result.description);

      if (result.error_code === 400) {
        console.log('\n💡 Возможные причины:');
        console.log('   - Неправильный Chat ID');
        console.log('   - Вы не начали диалог с ботом (отправьте /start)');
      } else if (result.error_code === 401) {
        console.log('\n💡 Неправильный Bot Token');
      }
    }
  })
  .catch(error => {
    console.error('❌ Ошибка:', error.message);
  });
