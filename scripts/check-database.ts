import { supabase, supabaseAdmin } from '@/lib/supabase';

async function checkDatabase() {
  console.log('🔍 Checking database state...\n');

  try {
    // Test 1: Check categories with public client
    console.log('1️⃣ Testing categories with public client...');
    const { data: publicCategories, error: publicCategoriesError } = await supabase
      .from('categories')
      .select('id, name_ru, slug, is_active')
      .limit(5);

    if (publicCategoriesError) {
      console.error('❌ Public client error:', publicCategoriesError);
    } else {
      console.log(`✅ Found ${publicCategories?.length || 0} categories with public client`);
      console.log('Sample:', publicCategories?.[0]);
    }

    // Test 2: Check categories with admin client
    console.log('\n2️⃣ Testing categories with admin client...');
    const { data: adminCategories, error: adminCategoriesError } = await supabaseAdmin
      .from('categories')
      .select('id, name_ru, slug, is_active')
      .limit(5);

    if (adminCategoriesError) {
      console.error('❌ Admin client error:', adminCategoriesError);
    } else {
      console.log(`✅ Found ${adminCategories?.length || 0} categories with admin client`);
      console.log('Sample:', adminCategories?.[0]);
    }

    // Test 3: Check works with public client
    console.log('\n3️⃣ Testing works with public client...');
    const { data: publicWorks, error: publicWorksError } = await supabase
      .from('works')
      .select(`
        id,
        title_ru,
        is_active,
        category:categories(name_ru),
        subcategory:subcategories(name_ru)
      `)
      .limit(3);

    if (publicWorksError) {
      console.error('❌ Public client error:', publicWorksError);
    } else {
      console.log(`✅ Found ${publicWorks?.length || 0} works with public client`);
      console.log('Sample:', publicWorks?.[0]);
    }

    // Test 4: Check works with admin client
    console.log('\n4️⃣ Testing works with admin client...');
    const { data: adminWorks, error: adminWorksError } = await supabaseAdmin
      .from('works')
      .select(`
        id,
        title_ru,
        is_active,
        category:categories(name_ru),
        subcategory:subcategories(name_ru)
      `)
      .limit(3);

    if (adminWorksError) {
      console.error('❌ Admin client error:', adminWorksError);
    } else {
      console.log(`✅ Found ${adminWorks?.length || 0} works with admin client`);
      console.log('Sample:', adminWorks?.[0]);
    }

    // Summary
    console.log('\n📊 Summary:');
    console.log('- Public categories:', publicCategories?.length || 0);
    console.log('- Admin categories:', adminCategories?.length || 0);
    console.log('- Public works:', publicWorks?.length || 0);
    console.log('- Admin works:', adminWorks?.length || 0);

    if (adminCategories && adminCategories.length > 0 && (!publicCategories || publicCategories.length === 0)) {
      console.log('\n⚠️  RLS is blocking public access! You need to apply RLS policies.');
      console.log('📝 Go to Supabase Dashboard → SQL Editor and run:');
      console.log('   supabase/migrations/006_enable_rls_policies.sql');
    } else if (!adminCategories || adminCategories.length === 0) {
      console.log('\n⚠️  No data in database! You need to run migrations.');
    } else {
      console.log('\n✅ Database appears to be working correctly!');
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

checkDatabase();
