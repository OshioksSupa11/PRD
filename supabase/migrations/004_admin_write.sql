-- ============================================
-- Godsgrace Edem Portfolio — Admin Write Policies
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
