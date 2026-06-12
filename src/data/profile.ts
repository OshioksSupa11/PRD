import { Profile, Stat } from '@/types';

export const profile: Profile = {
  id: '1',
  name: 'Godsgrace Edem',
  headline: 'Fire Protection Engineer & Technical Specialist',
  bio: `Godsgrace Edem is a dedicated Fire Protection Engineer with extensive experience in designing, implementing, and maintaining comprehensive fire safety systems across commercial, industrial, and residential sectors. With a strong foundation in mechanical engineering principles and specialized expertise in fire dynamics, he has successfully led numerous high-stakes projects ensuring regulatory compliance and occupant safety.

His career spans over a decade of hands-on experience in fire risk assessment, suppression system design, code compliance auditing, and emergency response planning. He combines deep technical knowledge with practical field experience to deliver solutions that protect lives, assets, and infrastructure.

Godsgrace is committed to advancing fire safety standards through continuous learning, professional certifications, and active participation in industry forums. He believes that effective fire protection is not just about meeting codes — it is about creating resilient environments where people can live and work with confidence.`,
  profileImage: 'https://hqsdmfmiawyxynyciwrx.supabase.co/storage/v1/object/public/profile-images/WhatsApp%20Image%202026-06-11%20at%204.49.59%20PM.jpeg',
  email: 'godsgrace.edem@example.com',
  phone: '+234 800 000 0000',
  linkedinUrl: 'https://linkedin.com/in/godsgrace-edem',
  githubUrl: 'https://github.com/godsgrace-edem',
  resumeUrl: '/documents/resume.pdf',
};

export const stats: Stat[] = [
  { label: 'Years of Experience', value: '12+', icon: 'Briefcase' },
  { label: 'Certifications Earned', value: '8', icon: 'Award' },
  { label: 'Projects Completed', value: '45+', icon: 'FolderCheck' },
  { label: 'Industries Served', value: '6', icon: 'Building2' },
];
