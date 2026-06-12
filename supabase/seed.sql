-- ============================================
-- Seed Data for Godsgrace Edem Portfolio
-- ============================================

-- Profile
INSERT INTO profiles (name, headline, bio, email, phone, linkedin_url, github_url, resume_url) VALUES (
  'Godsgrace Edem',
  'Fire Protection Engineer & Technical Specialist',
  'Godsgrace Edem is a dedicated Fire Protection Engineer with extensive experience in designing, implementing, and maintaining comprehensive fire safety systems across commercial, industrial, and residential sectors. With a strong foundation in mechanical engineering principles and specialized expertise in fire dynamics, he has successfully led numerous high-stakes projects ensuring regulatory compliance and occupant safety. His career spans over a decade of hands-on experience in fire risk assessment, suppression system design, code compliance auditing, and emergency response planning. He combines deep technical knowledge with practical field experience to deliver solutions that protect lives, assets, and infrastructure.',
  'godsgrace.edem@example.com',
  '+234 800 000 0000',
  'https://linkedin.com/in/godsgrace-edem',
  'https://github.com/godsgrace-edem',
  '/documents/resume.pdf'
);

-- Skills
INSERT INTO skills (name, category, sort_order) VALUES
  ('Fire Suppression Systems', 'Engineering', 1),
  ('HVAC Design & Integration', 'Engineering', 2),
  ('Sprinkler System Design', 'Engineering', 3),
  ('Smoke Control Systems', 'Engineering', 4),
  ('Building Code Compliance', 'Engineering', 5),
  ('Hydraulic Calculations', 'Engineering', 6),
  ('Piping & Mechanical Systems', 'Engineering', 7),
  ('CAD & BIM Modeling', 'Engineering', 8),
  ('Fire Risk Assessment', 'Fire Protection', 1),
  ('NFPA Code Standards', 'Fire Protection', 2),
  ('Fire Alarm Systems', 'Fire Protection', 3),
  ('Emergency Evacuation Planning', 'Fire Protection', 4),
  ('Hazardous Material Handling', 'Fire Protection', 5),
  ('Passive Fire Protection', 'Fire Protection', 6),
  ('Explosion Prevention', 'Fire Protection', 7),
  ('Fire Investigation', 'Fire Protection', 8),
  ('AutoCAD', 'Technical', 1),
  ('Revit MEP', 'Technical', 2),
  ('AutoSPRINK', 'Technical', 3),
  ('FDS (Fire Dynamics Simulator)', 'Technical', 4),
  ('MATLAB', 'Technical', 5),
  ('Pipe Flow Analysis', 'Technical', 6),
  ('Microsoft Project', 'Technical', 7),
  ('Bluebeam Revu', 'Technical', 8),
  ('Project Management', 'Professional', 1),
  ('Team Leadership', 'Professional', 2),
  ('Technical Writing', 'Professional', 3),
  ('Client Consultation', 'Professional', 4),
  ('Regulatory Compliance', 'Professional', 5),
  ('Training & Mentoring', 'Professional', 6),
  ('Cross-functional Collaboration', 'Professional', 7),
  ('Vendor Management', 'Professional', 8);

-- Experience
INSERT INTO experience (position, company, start_date, end_date, responsibilities, achievements) VALUES
  (
    'Senior Fire Protection Engineer',
    'Safeguard Engineering Solutions',
    '2020-03-01',
    NULL,
    ARRAY[
      'Lead design and implementation of fire suppression systems for commercial and industrial facilities',
      'Conduct comprehensive fire risk assessments and code compliance audits',
      'Manage a team of 5 junior engineers and coordinate with architects and contractors',
      'Develop technical specifications and review submittals for fire protection equipment'
    ],
    ARRAY[
      'Reduced project delivery time by 20% through implementation of standardized design workflows',
      'Successfully delivered fire protection systems for a 500,000 sq ft mixed-use development',
      'Achieved zero non-compliance findings across 15 consecutive regulatory inspections'
    ]
  ),
  (
    'Fire Protection Engineer',
    'Premier Fire & Safety Consultants',
    '2017-06-01',
    '2020-02-01',
    ARRAY[
      'Designed sprinkler, standpipe, and fire alarm systems for commercial buildings',
      'Performed hydraulic calculations and pipe stress analysis',
      'Prepared construction documents and coordinated with MEP teams',
      'Conducted site inspections and commissioning of fire protection systems'
    ],
    ARRAY[
      'Designed and commissioned fire protection systems for 12 high-rise buildings',
      'Developed a digital inspection checklist system adopted company-wide',
      'Received Employee of the Year award in 2019'
    ]
  ),
  (
    'Mechanical Design Engineer',
    'BuildRight Engineering Group',
    '2014-09-01',
    '2017-05-01',
    ARRAY[
      'Designed HVAC and plumbing systems for commercial and residential projects',
      'Performed load calculations and equipment selection',
      'Prepared 2D and 3D CAD drawings for construction documentation',
      'Collaborated with project managers and site supervisors'
    ],
    ARRAY[
      'Optimized HVAC designs resulting in 15% average energy savings across projects',
      'Transitioned the team from 2D CAD to BIM-based workflow using Revit',
      'Mentored 3 intern engineers through their professional development program'
    ]
  ),
  (
    'Junior Engineer (Fire & Safety)',
    'Industrial Safety Solutions Ltd',
    '2012-01-01',
    '2014-08-01',
    ARRAY[
      'Assisted senior engineers in fire protection system design and documentation',
      'Conducted field surveys and collected data for fire risk assessments',
      'Prepared technical reports and compliance documentation',
      'Supported commissioning and testing of fire alarm and suppression systems'
    ],
    ARRAY[
      'Completed 200+ field inspections in first year',
      'Developed an automated report generation tool reducing documentation time by 40%',
      'Earned NFPA Certified Fire Protection Specialist (CFPS) credential'
    ]
  );

-- Projects
INSERT INTO projects (title, slug, description, technologies, category, project_date, external_link, featured) VALUES
  (
    'Lagos Tower — Fire Protection System',
    'lagos-tower-fire-protection',
    'Complete fire protection system design and implementation for a 35-story mixed-use high-rise in Victoria Island. Scope included automatic sprinkler systems, standpipe systems, fire alarm and detection, smoke management, and emergency communication systems.',
    ARRAY['AutoSPRINK', 'NFPA 13', 'NFPA 72', 'Revit MEP', 'Hydraulic Calculations'],
    'Commercial',
    '2023-06-01',
    '#',
    true
  ),
  (
    'PetroChem Refinery — Fire & Gas Detection',
    'petrochem-refinery-fire-gas',
    'Engineered a comprehensive fire and gas detection system for a petrochemical refinery processing facility. Designed flame detection, combustible gas monitoring, toxic gas detection, and integrated deluge suppression systems across hazardous zones.',
    ARRAY['FDS', 'NFPA 15', 'NFPA 70', 'PLC Integration', 'HAZOP'],
    'Industrial',
    '2022-11-01',
    '#',
    true
  ),
  (
    'Grand Mall — Smoke Management System',
    'grand-mall-smoke-management',
    'Designed and validated a mechanical smoke management system for a 1.2 million sq ft shopping mall. Performed CFD modeling using FDS to verify smoke layer height, tenability conditions, and egress safety under various fire scenarios.',
    ARRAY['FDS', 'SmokeView', 'NFPA 92', 'CFD Analysis', 'ASHRAE'],
    'Commercial',
    '2021-08-01',
    '#',
    true
  ),
  (
    'University Hospital — Life Safety Systems',
    'university-hospital-life-safety',
    'Retrofitted life safety and fire protection systems across a 600-bed teaching hospital while maintaining full operational capacity. Included addressable fire alarm, nurse call integration, area of refuge communications, and phased sprinkler installation.',
    ARRAY['NFPA 101', 'NFPA 99', 'Revit MEP', 'Procore', 'Primavera P6'],
    'Healthcare',
    '2021-03-01',
    '#',
    false
  ),
  (
    'Data Center — Clean Agent Suppression',
    'data-center-clean-agent',
    'Implemented FM-200 clean agent fire suppression system for a Tier III data center. Designed early smoke detection (VESDA), pre-action sprinkler backup, and integrated suppression release controls with BMS for seamless facility management.',
    ARRAY['NFPA 2001', 'VESDA', 'FM-200', 'BMS Integration', 'CAD'],
    'Technology',
    '2020-05-01',
    '#',
    false
  ),
  (
    'Residential Estate — Fire Safety Compliance',
    'residential-estate-fire-safety',
    'Conducted fire safety compliance audit and remediation design for a 2,500-unit residential estate. Delivered fire hydrant network design, access road assessments, and community-wide fire safety awareness program.',
    ARRAY['NFPA 1', 'NFPA 1142', 'GIS Mapping', 'Hydrant Flow Testing'],
    'Residential',
    '2019-12-01',
    '#',
    false
  );

-- Certifications
INSERT INTO certifications (title, issuer, issue_date) VALUES
  ('Certified Fire Protection Specialist (CFPS)', 'National Fire Protection Association (NFPA)', '2015-06-01'),
  ('Professional Engineer (PE) — Fire Protection', 'Council for the Regulation of Engineering in Nigeria (COREN)', '2016-11-01'),
  ('NICET Level III — Fire Protection Engineering Technology', 'National Institute for Certification in Engineering Technologies', '2018-03-01'),
  ('Certified Fire Inspector (CFI-I)', 'International Code Council (ICC)', '2017-09-01'),
  ('Hazardous Materials Management (HAZWOPER)', 'Occupational Safety and Health Administration (OSHA)', '2019-01-01'),
  ('Project Management Professional (PMP)', 'Project Management Institute (PMI)', '2020-07-01'),
  ('LEED Green Associate', 'U.S. Green Building Council (USGBC)', '2021-04-01'),
  ('Certified Safety Professional (CSP)', 'Board of Certified Safety Professionals (BCSP)', '2022-02-01');
