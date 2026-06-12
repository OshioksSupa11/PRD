export interface Profile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  profileImage: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export type SkillCategory = 'Engineering' | 'Fire Protection' | 'Technical' | 'Professional';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  projectDate: string;
  externalLink?: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  certificateUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactFormData {
  id: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}
