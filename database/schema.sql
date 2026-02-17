-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_name VARCHAR(255),
  author_title VARCHAR(255),
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio table
CREATE TABLE portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type VARCHAR(100) NOT NULL,
  description TEXT,
  accent_color VARCHAR(7) DEFAULT '#7fd1b9',
  external_link VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR(500),
  author_name VARCHAR(255) DEFAULT 'FAR Researchers',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  service_interest VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for simple authentication
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial portfolio data
INSERT INTO portfolio (title, type, accent_color, sort_order) VALUES
('Uptake of voluntary MBAO pension savings by informal sector traders', 'Report', '#7fd1b9', 1),
('Development Finance Institutions & MSME Growth', 'Policy Brief', '#5c1f2d', 2),
('Instructional supervision practices & teachers'' job performance', 'Academic', '#4a1824', 3),
('Parental involvement & learners'' behavior', 'Study', '#7fd1b9', 4),
('Organizational culture & teachers'' job performance', 'Study', '#5c1f2d', 5),
('Competitive strategies and beverage firms performance', 'Corporate', '#4a1824', 6),
('Assessing Cambridge Analytica – Facebook Data Scandal', 'Case Review', '#7fd1b9', 7),
('Evaluating financial performance of Limuru Tea Plc (2021–2023)', 'Financial', '#5c1f2d', 8);

-- Insert initial testimonials
INSERT INTO testimonials (content, author_name, author_title) VALUES
('Very dependable. Helped me with data analysis.', 'John M.', 'Graduate Student'),
('Professional and high-quality writing.', 'Sarah K.', 'Researcher'),
('Loved the flow of my literature review.', 'Michael T.', 'Postgraduate'),
('Best research guidance I''ve ever received.', 'Emily R.', 'PhD Candidate');

-- Insert admin user (password: admin123 - you should change this)
INSERT INTO admin_users (email, password_hash) VALUES
('admin@fresearchers.org', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvOa');

-- Create indexes for better performance
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
CREATE INDEX idx_portfolio_active ON portfolio(is_active);
CREATE INDEX idx_blog_published ON blog_posts(is_published);
CREATE INDEX idx_blog_slug ON blog_posts(slug);

-- Set up Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for testimonials, portfolio, and published blog posts
CREATE POLICY "Public read access for testimonials" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for portfolio" ON portfolio
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Public insert for contact submissions
CREATE POLICY "Public insert for contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Admin-only policies
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

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
