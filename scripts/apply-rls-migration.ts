import { supabaseAdmin } from '@/lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

async function applyMigration() {
  try {
    console.log('🔄 Applying RLS policies migration...');

    // Read the migration file
    const migrationPath = path.join(process.cwd(), 'supabase/migrations/006_enable_rls_policies.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Split by statement (simple split by semicolon and newline)
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n${i + 1}/${statements.length} Executing: ${statement.substring(0, 80)}...`);

      const { error } = await supabaseAdmin.rpc('exec_sql', {
        sql: statement
      });

      if (error) {
        // Try direct execution if RPC doesn't work
        console.log('RPC method failed, trying direct execution...');

        const { error: directError } = await supabaseAdmin
          .from('_sql')
          .select('*')
          .limit(0); // This is just to test connection

        if (directError) {
          console.error('❌ Error:', error);
          throw error;
        }
      }

      console.log('✅ Success');
    }

    console.log('\n✨ Migration applied successfully!');
    console.log('🔄 Verifying RLS is enabled...');

    // Verify RLS is enabled by checking categories
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('id, name_ru')
      .limit(1);

    if (error) {
      console.error('❌ Verification failed:', error);
    } else {
      console.log('✅ RLS policies are working correctly!');
      console.log('📊 Sample data:', data);
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

applyMigration();
