import { Skill } from '@/types';

export const skills: Skill[] = [
  {
    id: 'eng-1',
    name: 'Fire Suppression Systems',
    category: 'Engineering',
  },
  {
    id: 'eng-2',
    name: 'HVAC Design & Integration',
    category: 'Engineering',
  },
  {
    id: 'eng-3',
    name: 'Sprinkler System Design',
    category: 'Engineering',
  },
  {
    id: 'eng-4',
    name: 'Smoke Control Systems',
    category: 'Engineering',
  },
  {
    id: 'eng-5',
    name: 'Building Code Compliance',
    category: 'Engineering',
  },
  {
    id: 'eng-6',
    name: 'Hydraulic Calculations',
    category: 'Engineering',
  },
  {
    id: 'eng-7',
    name: 'Piping & Mechanical Systems',
    category: 'Engineering',
  },
  {
    id: 'eng-8',
    name: 'CAD & BIM Modeling',
    category: 'Engineering',
  },
  {
    id: 'fp-1',
    name: 'Fire Risk Assessment',
    category: 'Fire Protection',
  },
  {
    id: 'fp-2',
    name: 'NFPA Code Standards',
    category: 'Fire Protection',
  },
  {
    id: 'fp-3',
    name: 'Fire Alarm Systems',
    category: 'Fire Protection',
  },
  {
    id: 'fp-4',
    name: 'Emergency Evacuation Planning',
    category: 'Fire Protection',
  },
  {
    id: 'fp-5',
    name: 'Hazardous Material Handling',
    category: 'Fire Protection',
  },
  {
    id: 'fp-6',
    name: 'Passive Fire Protection',
    category: 'Fire Protection',
  },
  {
    id: 'fp-7',
    name: 'Explosion Prevention',
    category: 'Fire Protection',
  },
  {
    id: 'fp-8',
    name: 'Fire Investigation',
    category: 'Fire Protection',
  },
  {
    id: 'tech-1',
    name: 'AutoCAD',
    category: 'Technical',
  },
  {
    id: 'tech-2',
    name: 'Revit MEP',
    category: 'Technical',
  },
  {
    id: 'tech-3',
    name: 'AutoSPRINK',
    category: 'Technical',
  },
  {
    id: 'tech-4',
    name: 'FDS (Fire Dynamics Simulator)',
    category: 'Technical',
  },
  {
    id: 'tech-5',
    name: 'MATLAB',
    category: 'Technical',
  },
  {
    id: 'tech-6',
    name: 'Pipe Flow Analysis',
    category: 'Technical',
  },
  {
    id: 'tech-7',
    name: 'Microsoft Project',
    category: 'Technical',
  },
  {
    id: 'tech-8',
    name: 'Bluebeam Revu',
    category: 'Technical',
  },
  {
    id: 'pro-1',
    name: 'Project Management',
    category: 'Professional',
  },
  {
    id: 'pro-2',
    name: 'Team Leadership',
    category: 'Professional',
  },
  {
    id: 'pro-3',
    name: 'Technical Writing',
    category: 'Professional',
  },
  {
    id: 'pro-4',
    name: 'Client Consultation',
    category: 'Professional',
  },
  {
    id: 'pro-5',
    name: 'Regulatory Compliance',
    category: 'Professional',
  },
  {
    id: 'pro-6',
    name: 'Training & Mentoring',
    category: 'Professional',
  },
  {
    id: 'pro-7',
    name: 'Cross-functional Collaboration',
    category: 'Professional',
  },
  {
    id: 'pro-8',
    name: 'Vendor Management',
    category: 'Professional',
  },
];

export const skillCategories = [
  {
    name: 'Engineering' as const,
    description: 'Core engineering competencies in mechanical and fire protection systems',
  },
  {
    name: 'Fire Protection' as const,
    description: 'Specialized expertise in fire safety and prevention',
  },
  {
    name: 'Technical' as const,
    description: 'Software and tools proficiency for engineering workflows',
  },
  {
    name: 'Professional' as const,
    description: 'Soft skills and business capabilities',
  },
];
