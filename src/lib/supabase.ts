import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kytriaaeqjsjgvdkcajn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dHJpYWFlcWpzamd2ZGtjYWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNDE5MTQsImV4cCI6MjA4NjkxNzkxNH0.O-xMKxDMTahY-bxJZ0h2qIN7lbEJN9rXNWkIsQpsKk4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
