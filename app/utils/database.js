import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cqfgqbprllhjrbjoktkz.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZmdxYnBybGxoanJiam9rdGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDYyNDcsImV4cCI6MjA3MzQ4MjI0N30.Hmhhl3QWiyuNB6Aeuzw5L85HblBWjjVovu69XJtYias"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase