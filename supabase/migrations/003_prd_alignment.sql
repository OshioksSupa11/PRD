-- ============================================
-- Godsgrace Edem Portfolio — PRD Alignment Migration
-- ============================================

-- Alter projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'engineering';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS read_time_minutes INT;

ALTER TABLE projects ADD CONSTRAINT projects_type_check CHECK (type IN ('engineering', 'software', 'hybrid'));

-- Sync technologies into tech_stack for existing rows
UPDATE projects SET tech_stack = technologies WHERE tech_stack = '{}' AND technologies IS NOT NULL;

-- Alter skills table (1-5 proficiency scale)
ALTER TABLE skills ALTER COLUMN proficiency SET DEFAULT 3;
UPDATE skills SET proficiency = LEAST(ROUND(proficiency::numeric / 20), 5) WHERE proficiency > 5;

-- Alter profiles table (dual resume URLs)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS resume_url_designed TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS resume_url_ats TEXT;

-- Timeline events
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

-- Current focus items
CREATE TABLE IF NOT EXISTS current_focus_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('learning', 'building', 'reading')),
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'progress', 'soon')),
  progress INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RLS
-- ============================================

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE current_focus_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read timeline_events" ON timeline_events
  FOR SELECT USING (true);

CREATE POLICY "Public read current_focus_items" ON current_focus_items
  FOR SELECT USING (true);
