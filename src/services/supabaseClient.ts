import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://gwyaphaitircmgxdwbrr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3eWFwaGFpdGlyY21neGR3YnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDU1MjYsImV4cCI6MjA2ODg4MTUyNn0.4BfeAfEbOKWMeeslfImpV7iN2A2NjBsDA34SSwbyKx8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
