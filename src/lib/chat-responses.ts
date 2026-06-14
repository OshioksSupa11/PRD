export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const profileInfo: Record<string, string> = {
  default:
    "I'm the AI assistant for Godsgrace Edem's portfolio. I can tell you about his **certifications**, **projects**, **work experience**, how to **download his resume**, or how to **contact** him. What would you like to know?",
  about:
    "**Godsgrace Edem** is a Fire Protection Engineer & Emerging Technology Builder with over 6 years of experience. He specializes in fire protection systems inspection, testing, and maintenance across commercial and industrial sectors. He's also transitioning into software development with expertise in Next.js, TypeScript, and modern web technologies.",
  certifications:
    "Godsgrace holds **8 professional certifications** including:\n\n- Certified Fire Protection Specialist (CFPS) — NFPA\n- Professional Engineer (PE) — COREN\n- NICET Level III — Fire Protection Engineering Technology\n- Certified Fire Inspector (CFI-I) — ICC\n- HAZWOPER — OSHA\n- PMP — PMI\n- LEED Green Associate — USGBC\n- Certified Safety Professional (CSP) — BCSP\n\nYou can view all certifications with verification links on the **Certifications** section of the homepage.",
  projects:
    "Godsgrace has completed **over 45 engineering projects** across 6 industries. Featured projects include:\n\n- **Lagos Tower** — Fire protection for a 35-story mixed-use high-rise\n- **PetroChem Refinery** — Fire & gas detection system\n- **Grand Mall** — Smoke management system for 1.2M sq ft mall\n- **University Hospital** — Life safety systems retrofit\n- **Data Center** — Clean agent FM-200 suppression\n- **Residential Estate** — Fire safety compliance for 2,500-unit estate\n\nEach project has a detailed case study page you can explore.",
  experience:
    "Godsgrace's career spans **6+ years** in fire protection engineering:\n\n- **2019** — Fire Maintenance Technician at Hurlag Technologies\n- **2020** — Led major engineering projects across multiple sectors\n- **2023** — Earned NFPA Training Certification\n- **2025** — Promoted to Fire Maintenance Engineer\n- **2026** — Embarked on software development journey\n- **Future** — Aspiring Technology Founder\n\nView the full interactive timeline in the **Experience** section.",
  resume:
    "You can download Godsgrace's resume directly from the **Hero section** (click 'Download Resume') or from the **Contact section** of the homepage. The resume includes his full work history, certifications, education, and technical skills.",
  contact:
    "To contact Godsgrace:\n\n- **Email:** edem.godsgrace.o@gmail.com\n- **Phone:** +2348137229089\n- **LinkedIn:** linkedin.com/in/godsgrace-edem\n- **GitHub:** github.com/godsgrace-edem\n\nOr use the **Contact Form** at the bottom of the homepage to send a direct message.",
  skills:
    "Godsgrace has **32 technical skills** across 4 categories:\n\n- **Engineering** — AutoSPRINK, Revit MEP, FDS, CFD Analysis, CAD, BIM, Hydraulic Calculations\n- **Fire Protection** — NFPA codes, Sprinkler Systems, Fire Alarm, Suppression, Smoke Management\n- **Technical** — TypeScript, Next.js, React, Tailwind CSS, Supabase, PostgreSQL\n- **Professional** — Project Management, Risk Assessment, Communication, Leadership, Team Collaboration",
};

export function generateResponse(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes('certif') ||
    lower.includes('credential') ||
    lower.includes('show certification')
  ) {
    return profileInfo.certifications;
  }
  if (
    lower.includes('project') ||
    lower.includes('portfolio') ||
    lower.includes('case study') ||
    lower.includes('show project')
  ) {
    return profileInfo.projects;
  }
  if (
    lower.includes('experien') ||
    lower.includes('work') ||
    lower.includes('career') ||
    lower.includes('timeline') ||
    lower.includes('job')
  ) {
    return profileInfo.experience;
  }
  if (
    lower.includes('resume') ||
    lower.includes('download') ||
    lower.includes('cv')
  ) {
    return profileInfo.resume;
  }
  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('phone') ||
    lower.includes('reach') ||
    lower.includes('message')
  ) {
    return profileInfo.contact;
  }
  if (
    lower.includes('skill') ||
    lower.includes('technolog') ||
    lower.includes('tech stack') ||
    lower.includes('know')
  ) {
    return profileInfo.skills;
  }
  if (
    lower.includes('about') ||
    lower.includes('who') ||
    lower.includes('tell me') ||
    lower.includes('godsgrace') ||
    lower.includes('background') ||
    lower.includes('bio')
  ) {
    return profileInfo.about;
  }

  return profileInfo.default;
}

export const quickQuestions = [
  "Tell me about Godsgrace",
  "Show certifications",
  "Show projects",
  "Work experience",
  "Download resume",
  "Contact Godsgrace",
];
