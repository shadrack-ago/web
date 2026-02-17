-- Temporary fix: Disable RLS for admin operations
-- This allows admin dashboard to work while we fix authentication

-- Disable RLS temporarily (for development)
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
