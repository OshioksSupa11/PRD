import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Lagos Tower — Fire Protection System',
    slug: 'lagos-tower-fire-protection',
    description:
      'Complete fire protection system design and implementation for a 35-story mixed-use high-rise in Victoria Island. Scope included automatic sprinkler systems, standpipe systems, fire alarm and detection, smoke management, and emergency communication systems.',
    image: '/images/projects/lagos-tower.jpg',
    technologies: ['AutoSPRINK', 'NFPA 13', 'NFPA 72', 'Revit MEP', 'Hydraulic Calculations'],
    category: 'Commercial',
    projectDate: '2023-06',
    externalLink: '#',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'PetroChem Refinery — Fire & Gas Detection',
    slug: 'petrochem-refinery-fire-gas',
    description:
      'Engineered a comprehensive fire and gas detection system for a petrochemical refinery processing facility. Designed flame detection, combustible gas monitoring, toxic gas detection, and integrated deluge suppression systems across hazardous zones.',
    image: '/images/projects/petrochem.jpg',
    technologies: ['FDS', 'NFPA 15', 'NFPA 70', 'PLC Integration', 'HAZOP'],
    category: 'Industrial',
    projectDate: '2022-11',
    externalLink: '#',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Grand Mall — Smoke Management System',
    slug: 'grand-mall-smoke-management',
    description:
      'Designed and validated a mechanical smoke management system for a 1.2 million sq ft shopping mall. Performed CFD modeling using FDS to verify smoke layer height, tenability conditions, and egress safety under various fire scenarios.',
    image: '/images/projects/grand-mall.jpg',
    technologies: ['FDS', 'SmokeView', 'NFPA 92', 'CFD Analysis', 'ASHRAE'],
    category: 'Commercial',
    projectDate: '2021-08',
    externalLink: '#',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'University Hospital — Life Safety Systems',
    slug: 'university-hospital-life-safety',
    description:
      'Retrofitted life safety and fire protection systems across a 600-bed teaching hospital while maintaining full operational capacity. Included addressable fire alarm, nurse call integration, area of refuge communications, and phased sprinkler installation.',
    image: '/images/projects/hospital.jpg',
    technologies: ['NFPA 101', 'NFPA 99', 'Revit MEP', 'Procore', 'Primavera P6'],
    category: 'Healthcare',
    projectDate: '2021-03',
    externalLink: '#',
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'Data Center — Clean Agent Suppression',
    slug: 'data-center-clean-agent',
    description:
      'Implemented FM-200 clean agent fire suppression system for a Tier III data center. Designed early smoke detection (VESDA), pre-action sprinkler backup, and integrated suppression release controls with BMS for seamless facility management.',
    image: '/images/projects/data-center.jpg',
    technologies: ['NFPA 2001', 'VESDA', 'FM-200', 'BMS Integration', 'CAD'],
    category: 'Technology',
    projectDate: '2020-05',
    externalLink: '#',
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Residential Estate — Fire Safety Compliance',
    slug: 'residential-estate-fire-safety',
    description:
      'Conducted fire safety compliance audit and remediation design for a 2,500-unit residential estate. Delivered fire hydrant network design, access road assessments, and community-wide fire safety awareness program.',
    image: '/images/projects/residential.jpg',
    technologies: ['NFPA 1', 'NFPA 1142', 'GIS Mapping', 'Hydrant Flow Testing'],
    category: 'Residential',
    projectDate: '2019-12',
    externalLink: '#',
    featured: false,
  },
];
