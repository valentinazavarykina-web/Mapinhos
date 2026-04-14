import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '❌ Missing Supabase env vars.\n' +
    'Copy .env.example → .env.local and fill in your credentials.\n' +
    'Get them at: https://supabase.com/dashboard/project/_/settings/api'
  )
}

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
export const supabase = createClient(supabaseUrl, supabaseKey);



