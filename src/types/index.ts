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
  proficiency?: number;
  featured?: boolean;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  achievements: string[];
  type?: 'work' | 'milestone' | 'future';
}

export interface CaseStudy {
  problem: string | null;
  research: string | null;
  solution: string | null;
  designDecisions: string | null;
  challenges: string | null;
  results: string | null;
  lessonsLearned: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  screenshots: string[];
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
  problem?: string | null;
  research?: string | null;
  solution?: string | null;
  designDecisions?: string | null;
  challenges?: string | null;
  results?: string | null;
  lessonsLearned?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  screenshots?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  certificateUrl?: string;
  imageUrl?: string | null;
  verificationUrl?: string | null;
  skillTags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  imageUrl?: string | null;
  featured: boolean;
  sortOrder: number;
}

export type BlogCategory = 'Fire Protection' | 'Engineering' | 'Software Development' | 'Artificial Intelligence' | 'Career Development';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  category: BlogCategory;
  tags: string[];
  publishedAt: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  achievementDate: string;
  icon: string;
  featured: boolean;
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
