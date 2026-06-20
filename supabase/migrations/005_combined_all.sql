-- ============================================
-- Godsgrace Edem Portfolio — Combined Migration
-- Creates all tables, RLS, public read + admin write policies
-- ============================================

-- ============================================
-- TABLES (001_initial)
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  profile_image TEXT,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Engineering', 'Fire Protection', 'Technical', 'Professional')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  category TEXT,
  project_date DATE,
  external_link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  responsibilities TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  certificate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLES (002_enhancements)
-- ============================================

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
-- TABLE ALTERS (002 + 003)
-- ============================================

ALTER TABLE skills ADD COLUMN IF NOT EXISTS proficiency INT DEFAULT 3;
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

ALTER TABLE projects ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'engineering';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS read_time_minutes INT;

ALTER TABLE certifications ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS verification_url TEXT;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS skill_tags TEXT[] DEFAULT '{}';

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS resume_url_designed TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS resume_url_ats TEXT;

-- ============================================
-- TABLES (003_prd_alignment)
-- ============================================

CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'role' CHECK (type IN ('role', 'certification', 'milestone', 'future')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS current_focus_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('learning', 'building', 'reading')),
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'progress', 'soon')),
  progress INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add type constraint if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'projects_type_check'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_type_check CHECK (type IN ('engineering', 'software', 'hybrid'));
  END IF;
END $$;

-- ============================================
-- RLS: ENABLE ON ALL TABLES
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE current_focus_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES
-- ============================================

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'profiles', 'skills', 'projects', 'experience', 'certifications',
    'testimonials', 'blog_posts', 'achievements', 'timeline_events', 'current_focus_items'
  ] LOOP
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = tbl) THEN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Public read ' || tbl
      ) THEN
        EXECUTE format('CREATE POLICY %I ON %I FOR SELECT USING (true);', 'Public read ' || tbl, tbl);
      END IF;
    END IF;
  END LOOP;
END $$;

-- Messages special policies
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'messages') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'messages' AND policyname = 'Public insert messages') THEN
      CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'messages' AND policyname = 'Admin read messages') THEN
      CREATE POLICY "Admin read messages" ON messages FOR SELECT USING (true);
    END IF;
  END IF;
END $$;

-- ============================================
-- ADMIN WRITE POLICIES (004) — safe, skips missing tables
-- ============================================

DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'profiles',
    'skills',
    'projects',
    'experience',
    'certifications',
    'messages',
    'testimonials',
    'blog_posts',
    'achievements',
    'timeline_events',
    'current_focus_items'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = tbl) THEN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin insert ' || tbl) THEN
        EXECUTE format('CREATE POLICY %I ON %I FOR INSERT WITH CHECK (auth.role() = ''authenticated'');', 'Admin insert ' || tbl, tbl);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin update ' || tbl) THEN
        EXECUTE format('CREATE POLICY %I ON %I FOR UPDATE USING (auth.role() = ''authenticated'');', 'Admin update ' || tbl, tbl);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl AND policyname = 'Admin delete ' || tbl) THEN
        EXECUTE format('CREATE POLICY %I ON %I FOR DELETE USING (auth.role() = ''authenticated'');', 'Admin delete ' || tbl, tbl);
      END IF;
    END IF;
  END LOOP;
END $$;
