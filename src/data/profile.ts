import { Profile, Stat } from '@/types';

export const profile: Profile = {
  id: '1',
  name: 'Godsgrace Edem',
  headline: 'Fire Protection Engineer & Technical Specialist',
  bio: `Godsgrace Edem is a dedicated Fire Protection Engineer with over 6 years of hands-on experience in the inspection, testing, and maintenance of fire protection systems across commercial and industrial sectors. With a strong foundation in mechanical engineering principles and specialized expertise in fire safety equipment, he has successfully contributed to maintaining reliable fire protection infrastructure and ensuring regulatory compliance.

His career spans over 6 years of practical experience in fire system maintenance, safety inspections, incident prevention, and technical documentation. He combines deep technical knowledge with practical field experience to deliver solutions that protect lives, assets, and infrastructure.

Godsgrace is committed to advancing fire safety standards through continuous learning, professional certifications, and active participation in industry forums. He believes that effective fire protection is not just about meeting codes — it is about creating resilient environments where people can live and work with confidence.`,
  profileImage: 'https://hqsdmfmiawyxynyciwrx.supabase.co/storage/v1/object/public/profile-images/WhatsApp%20Image%202026-06-11%20at%204.49.59%20PM.jpeg',
  email: 'edem.godsgrace.o@gmail.com',
  phone: '+2348137229089',
  linkedinUrl: 'https://linkedin.com/in/godsgrace-edem',
  githubUrl: 'https://github.com/godsgrace-edem',
  resumeUrl: '/documents/resume.pdf',
  resumeUrlDesigned: '/documents/resume.pdf',
  resumeUrlAts: '/documents/resume-ats.pdf',
};

export const stats: Stat[] = [
  { label: 'Years of Experience', value: '6+', icon: 'Briefcase' },
  { label: 'Certifications Earned', value: '8', icon: 'Award' },
  { label: 'Projects Completed', value: '45+', icon: 'FolderCheck' },
  { label: 'Industries Served', value: '6', icon: 'Building2' },
];
