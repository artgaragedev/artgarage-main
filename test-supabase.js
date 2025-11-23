const { createClient } = require('@supabase/supabase-js');

// Загружаем переменные из .env.local
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? '***' + supabaseAnonKey.slice(-10) : 'NOT SET');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are not set!');
  console.log('\nMake sure you have .env.local file with:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your-url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test 1: Check if orders table exists
    console.log('\n1. Testing orders table...');
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error accessing orders table:', error.message);
      console.log('Hint:', error.hint || 'Table may not exist or RLS policies are blocking access');
      return false;
    }

    console.log('✅ Orders table is accessible');

    // Test 2: Try to insert a test order
    console.log('\n2. Testing insert into orders table...');
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert({
        name: 'Test Order',
        phone: '+123456789',
        email: 'test@example.com',
        message: 'This is a test order'
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error inserting test order:', insertError.message);
      console.log('Hint:', insertError.hint || 'Check RLS policies');
      return false;
    }

    console.log('✅ Successfully inserted test order:', insertData.id);

    // Test 3: Delete test order
    console.log('\n3. Cleaning up test order...');
    const { error: deleteError } = await supabase
      .from('orders')
      .delete()
      .eq('id', insertData.id);

    if (deleteError) {
      console.log('⚠️  Could not delete test order (this is OK if RLS prevents deletes)');
    } else {
      console.log('✅ Test order cleaned up');
    }

    console.log('\n✅ All tests passed! Supabase is configured correctly.');
    return true;

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return false;
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});
