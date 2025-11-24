import { supabase, supabaseAdmin } from '@/lib/supabase';

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  // Проверим переменные окружения
  console.log('Environment variables:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
  console.log('- SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...');

  // Тест 1: Таблица orders (есть в типах)
  console.log('\n1️⃣ Testing orders table...');
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .limit(1);

  if (ordersError) {
    console.log('❌ Error:', ordersError);
  } else {
    console.log('✅ Orders table accessible:', orders?.length || 0, 'records');
  }

  // Тест 2: Проверим с admin
  console.log('\n2️⃣ Testing orders table (admin)...');
  const { data: ordersAdmin, error: ordersAdminError } = await supabaseAdmin
    .from('orders')
    .select('*')
    .limit(1);

  if (ordersAdminError) {
    console.log('❌ Error:', ordersAdminError);
  } else {
    console.log('✅ Orders table accessible (admin):', ordersAdmin?.length || 0, 'records');
  }

  // Тест 3: Попробуем получить список всех таблиц через запрос к information_schema
  console.log('\n3️⃣ Checking if categories table exists...');
  const { data: tableCheck, error: tableError } = await supabaseAdmin
    .from('categories')
    .select('count');

  if (tableError) {
    console.log('❌ Error accessing categories:', tableError);

    // Проверим, может таблица вообще не существует
    if (tableError.message.includes('does not exist') || tableError.message.includes('relation')) {
      console.log('⚠️  The "categories" table does not exist in the database!');
      console.log('📝 You need to run the migrations to create the tables.');
    }
  } else {
    console.log('✅ Categories table exists');
  }
}

testConnection().catch(console.error);
