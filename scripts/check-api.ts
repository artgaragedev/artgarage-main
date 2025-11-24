async function checkAPI() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('📍 Supabase URL:', url);
  console.log('🔑 Anon Key:', anonKey?.substring(0, 30) + '...\n');

  if (!url || !anonKey) {
    console.error('❌ Missing environment variables!');
    return;
  }

  // Тест 1: Проверим базовый endpoint
  console.log('1️⃣ Testing base API endpoint...');
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    });

    console.log('Status:', response.status, response.statusText);
    const text = await response.text();
    console.log('Response:', text.substring(0, 200));
  } catch (error) {
    console.error('❌ Error:', error);
  }

  // Тест 2: Попробуем запросить categories
  console.log('\n2️⃣ Testing categories endpoint...');
  try {
    const response = await fetch(`${url}/rest/v1/categories?select=*&limit=1`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status, response.statusText);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error);
  }

  // Тест 3: С service role key
  console.log('\n3️⃣ Testing with service role key...');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    try {
      const response = await fetch(`${url}/rest/v1/categories?select=*&limit=1`, {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Status:', response.status, response.statusText);
      const data = await response.json();
      console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
}

checkAPI();
