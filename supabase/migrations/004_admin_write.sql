-- ============================================
-- Godsgrace Edem Portfolio — Admin Write Policies
-- ============================================

-- Profiles: admin write
CREATE POLICY "Admin insert profiles" ON profiles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update profiles" ON profiles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete profiles" ON profiles
  FOR DELETE USING (auth.role() = 'authenticated');

-- Skills: admin write
CREATE POLICY "Admin insert skills" ON skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update skills" ON skills
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete skills" ON skills
  FOR DELETE USING (auth.role() = 'authenticated');

-- Projects: admin write
CREATE POLICY "Admin insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Experience: admin write
CREATE POLICY "Admin insert experience" ON experience
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update experience" ON experience
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete experience" ON experience
  FOR DELETE USING (auth.role() = 'authenticated');

-- Certifications: admin write
CREATE POLICY "Admin insert certifications" ON certifications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update certifications" ON certifications
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete certifications" ON certifications
  FOR DELETE USING (auth.role() = 'authenticated');

-- Messages: admin write
CREATE POLICY "Admin insert messages" ON messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update messages" ON messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete messages" ON messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials: admin write
CREATE POLICY "Admin insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Blog Posts: admin write
CREATE POLICY "Admin insert blog_posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update blog_posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete blog_posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Achievements: admin write
CREATE POLICY "Admin insert achievements" ON achievements
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update achievements" ON achievements
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete achievements" ON achievements
  FOR DELETE USING (auth.role() = 'authenticated');

-- Timeline Events: admin write
CREATE POLICY "Admin insert timeline_events" ON timeline_events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update timeline_events" ON timeline_events
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete timeline_events" ON timeline_events
  FOR DELETE USING (auth.role() = 'authenticated');

-- Current Focus Items: admin write
CREATE POLICY "Admin insert current_focus_items" ON current_focus_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update current_focus_items" ON current_focus_items
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete current_focus_items" ON current_focus_items
  FOR DELETE USING (auth.role() = 'authenticated');
