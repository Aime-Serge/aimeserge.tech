import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env.local loader
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const [key, ...value] = line.split('=');
      return [key.trim(), value.join('=').trim()];
    })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = env.ADMIN_EMAIL;

async function setupAdmin() {
  if (!supabaseUrl || !serviceKey || !adminEmail) {
    console.error('❌ Error: Missing required environment variables in .env.local');
    console.log('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL');
    process.exit(1);
  }

  const password = process.argv[2];
  if (!password) {
    console.error('❌ Error: Please provide a password as an argument.');
    console.log('Usage: node scripts/setup-admin.mjs <your-password>');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log(`🚀 Attempting to create/update admin user: ${adminEmail}...`);

  // Check if user exists
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('❌ Error fetching users:', listError.message);
    return;
  }

  const existingUser = users.find(u => u.email === adminEmail);

  if (existingUser) {
    console.log('🔄 User exists. Updating password...');
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password: password, email_confirm: true }
    );
    if (updateError) {
      console.error('❌ Update failed:', updateError.message);
    } else {
      console.log('✅ Password updated successfully!');
    }
  } else {
    console.log('✨ Creating new user...');
    const { error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: password,
      email_confirm: true
    });
    if (createError) {
      console.error('❌ Creation failed:', createError.message);
    } else {
      console.log('✅ Admin user created successfully!');
    }
  }
}

setupAdmin();
