-- ============================================
-- Seed Data — Enhanced Portfolio Content
-- ============================================

-- Testimonials
INSERT INTO testimonials (name, role, company, content, featured, sort_order) VALUES
(
  'James Adewale',
  'Lead Engineer',
  'SafetyFirst Nigeria Ltd',
  'Godsgrace is an exceptional fire protection engineer. His meticulous approach to safety systems design and NFPA compliance saved our project months of rework. I would recommend him without reservation for any fire protection project.',
  true,
  1
),
(
  'Dr. Amara Okafor',
  'Head of Engineering',
  'Nigerian National Petroleum Corporation',
  'I had the privilege of working with Godsgrace on a large-scale fire and gas detection system. His technical depth, especially in hazardous area classification and suppression system design, was outstanding. A true professional who delivers results.',
  true,
  2
),
(
  'Michael Chen',
  'Construction Project Manager',
  'Urban Development Group',
  'What sets Godsgrace apart is his ability to bridge the gap between engineering design and practical field implementation. On our hospital retrofit, he kept the fire protection scope on track despite challenging operational constraints.',
  true,
  3
);

-- Achievements
INSERT INTO achievements (title, description, achievement_date, icon, featured) VALUES
(
  'NFPA Certified Fire Protection Specialist',
  'Earned NFPA certification demonstrating comprehensive knowledge of fire protection systems, codes, and standards.',
  '2023-09-15',
  'Award',
  true
),
(
  '45+ Major Engineering Projects Completed',
  'Successfully delivered fire protection and life safety projects across commercial, industrial, healthcare, and residential sectors.',
  '2025-06-01',
  'Briefcase',
  true
),
(
  'Fire Safety Compliance Program Lead',
  'Designed and implemented a comprehensive fire safety compliance program adopted across 6 industrial facilities.',
  '2024-03-10',
  'Shield',
  true
),
(
  'Software Development Milestone',
  'Transitioned into technology building, learning full-stack development with Next.js, TypeScript, and modern tooling.',
  '2026-01-01',
  'Code',
  true
);

-- Blog Posts (metadata stubs)
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, tags, published_at, featured) VALUES
(
  'Essential NFPA Standards Every Fire Protection Engineer Must Master',
  'essential-nfpa-standards-fire-protection',
  'A comprehensive guide to the most critical NFPA standards that form the foundation of modern fire protection engineering practice.',
  'Full article content will be synchronized from markdown files.',
  '/images/blog/nfpa-standards.jpg',
  'Fire Protection',
  ARRAY['NFPA', 'Standards', 'Safety', 'Code Compliance'],
  '2026-04-10',
  true
),
(
  'Transitioning from Engineering to Technology: My Journey So Far',
  'engineering-to-technology-journey',
  'Why I decided to expand my career from fire protection engineering into software development and what I have learned along the way.',
  'Full article content will be synchronized from markdown files.',
  '/images/blog/journey.jpg',
  'Career Development',
  ARRAY['Career', 'Technology', 'Learning', 'Software Development'],
  '2026-05-20',
  true
),
(
  'How AI Is Transforming Fire Protection Engineering',
  'ai-fire-protection-engineering',
  'Exploring the emerging applications of artificial intelligence in fire detection, risk assessment, and system design.',
  'Full article content will be synchronized from markdown files.',
  '/images/blog/ai-fire.jpg',
  'Artificial Intelligence',
  ARRAY['AI', 'Fire Protection', 'Innovation', 'Technology'],
  '2026-06-01',
  false
);
