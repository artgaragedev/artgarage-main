import { supabase, supabaseAdmin } from '@/lib/supabase';

async function testQueries() {
  console.log('🔍 Testing simple queries...\n');

  // Test 1: Простой запрос categories без условий
  console.log('1️⃣ Testing categories (no conditions)...');
  const { data: cat1, error: err1 } = await supabase
    .from('categories')
    .select('*');

  console.log('Result:', { count: cat1?.length || 0, error: err1?.message || 'none' });
  if (cat1?.[0]) console.log('Sample:', cat1[0]);

  // Test 2: Categories с условием is_active
  console.log('\n2️⃣ Testing categories (is_active=true)...');
  const { data: cat2, error: err2 } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true);

  console.log('Result:', { count: cat2?.length || 0, error: err2?.message || 'none' });

  // Test 3: Admin client без условий
  console.log('\n3️⃣ Testing categories (admin, no conditions)...');
  const { data: cat3, error: err3 } = await supabaseAdmin
    .from('categories')
    .select('*');

  console.log('Result:', { count: cat3?.length || 0, error: err3?.message || 'none' });
  if (cat3?.[0]) console.log('Sample:', cat3[0]);

  // Test 4: Works простой запрос
  console.log('\n4️⃣ Testing works (no joins)...');
  const { data: works1, error: err4 } = await supabase
    .from('works')
    .select('id, title_ru, category_id, is_active');

  console.log('Result:', { count: works1?.length || 0, error: err4?.message || 'none' });
  if (works1?.[0]) console.log('Sample:', works1[0]);

  // Test 5: Works с join
  console.log('\n5️⃣ Testing works (with joins)...');
  const { data: works2, error: err5 } = await supabase
    .from('works')
    .select(`
      id,
      title_ru,
      category:categories(name_ru)
    `);

  console.log('Result:', { count: works2?.length || 0, error: err5?.message || 'none' });
  if (works2?.[0]) console.log('Sample:', works2[0]);

  // Test 6: Проверка с admin и join
  console.log('\n6️⃣ Testing works (admin with joins)...');
  const { data: works3, error: err6 } = await supabaseAdmin
    .from('works')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*)
    `);

  console.log('Result:', { count: works3?.length || 0, error: err6?.message || 'none' });
  if (works3?.[0]) console.log('Sample:', works3[0].title_ru);
}

testQueries().catch(console.error);
