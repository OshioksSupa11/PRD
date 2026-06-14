-- ============================================
-- Godsgrace Edem Portfolio — Enhancements Migration
-- ============================================

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL CHECK (category IN ('Fire Protection', 'Engineering', 'Software Development', 'Artificial Intelligence', 'Career Development')),
  tags TEXT[] DEFAULT '{}',
  published_at DATE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  achievement_date DATE NOT NULL,
  icon TEXT DEFAULT 'Trophy',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Alter existing tables
-- ============================================

ALTER TABLE skills ADD COLUMN IF NOT EXISTS proficiency INT DEFAULT 80;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS problem TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS research TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS design_decisions TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS lessons_learned TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS screenshots TEXT[] DEFAULT '{}';

ALTER TABLE certifications ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS verification_url TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS skill_tags TEXT[] DEFAULT '{}';

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public read blog_posts" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Public read achievements" ON achievements
  FOR SELECT USING (true);
