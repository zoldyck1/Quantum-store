import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://myvsedtugkodvzqykpxi.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dnNlZHR1Z2tvZHZ6cXlrcHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mzg0NTgsImV4cCI6MjA2NzIxNDQ1OH0.jBpUyE3hfAs7s66Rxj8idYKM-bRsaUDOVOQLoF0cXlM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)