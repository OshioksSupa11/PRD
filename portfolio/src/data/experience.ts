import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    position: 'Senior Fire Protection Engineer',
    company: 'Safeguard Engineering Solutions',
    startDate: '2020-03',
    endDate: null,
    responsibilities: [
      'Lead design and implementation of fire suppression systems for commercial and industrial facilities',
      'Conduct comprehensive fire risk assessments and code compliance audits',
      'Manage a team of 5 junior engineers and coordinate with architects and contractors',
      'Develop technical specifications and review submittals for fire protection equipment',
    ],
    achievements: [
      'Reduced project delivery time by 20% through implementation of standardized design workflows',
      'Successfully delivered fire protection systems for a 500,000 sq ft mixed-use development',
      'Achieved zero non-compliance findings across 15 consecutive regulatory inspections',
    ],
  },
  {
    id: 'exp-2',
    position: 'Fire Protection Engineer',
    company: 'Premier Fire & Safety Consultants',
    startDate: '2017-06',
    endDate: '2020-02',
    responsibilities: [
      'Designed sprinkler, standpipe, and fire alarm systems for commercial buildings',
      'Performed hydraulic calculations and pipe stress analysis',
      'Prepared construction documents and coordinated with MEP teams',
      'Conducted site inspections and commissioning of fire protection systems',
    ],
    achievements: [
      'Designed and commissioned fire protection systems for 12 high-rise buildings',
      'Developed a digital inspection checklist system adopted company-wide',
      'Received Employee of the Year award in 2019',
    ],
  },
  {
    id: 'exp-3',
    position: 'Mechanical Design Engineer',
    company: 'BuildRight Engineering Group',
    startDate: '2014-09',
    endDate: '2017-05',
    responsibilities: [
      'Designed HVAC and plumbing systems for commercial and residential projects',
      'Performed load calculations and equipment selection',
      'Prepared 2D and 3D CAD drawings for construction documentation',
      'Collaborated with project managers and site supervisors',
    ],
    achievements: [
      'Optimized HVAC designs resulting in 15% average energy savings across projects',
      'Transitioned the team from 2D CAD to BIM-based workflow using Revit',
      'Mentored 3 intern engineers through their professional development program',
    ],
  },
  {
    id: 'exp-4',
    position: 'Junior Engineer (Fire & Safety)',
    company: 'Industrial Safety Solutions Ltd',
    startDate: '2012-01',
    endDate: '2014-08',
    responsibilities: [
      'Assisted senior engineers in fire protection system design and documentation',
      'Conducted field surveys and collected data for fire risk assessments',
      'Prepared technical reports and compliance documentation',
      'Supported commissioning and testing of fire alarm and suppression systems',
    ],
    achievements: [
      'Completed 200+ field inspections in first year',
      'Developed an automated report generation tool reducing documentation time by 40%',
      'Earned NFPA Certified Fire Protection Specialist (CFPS) credential',
    ],
  },
];
