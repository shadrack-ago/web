-- Migration: Fix RLS Policies to prevent infinite recursion
-- Run this after the initial schema.sql

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin full access to testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin full access to portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admin full access to blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin full access to contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admin access to admin_users" ON admin_users;

-- Create simplified admin policies (no recursion)
CREATE POLICY "Admin full access to testimonials" ON testimonials
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin full access to portfolio" ON portfolio
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin full access to blog_posts" ON blog_posts
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin full access to contact_submissions" ON contact_submissions
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin access to admin_users" ON admin_users
  FOR ALL USING (
    auth.uid() IS NOT NULL
  );
