export interface Profile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  profileImage: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  resumeUrlDesigned?: string | null;
  resumeUrlAts?: string | null;
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

export type ExperienceType = 'role' | 'certification' | 'milestone' | 'future';

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  achievements: string[];
  type?: ExperienceType;
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

export type ProjectType = 'engineering' | 'software' | 'hybrid';

export interface Attachment {
  label: string;
  url: string;
  type: 'image' | 'pdf' | 'link';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  techStack?: string[];
  category: string;
  type?: ProjectType;
  projectDate: string;
  externalLink?: string;
  featured: boolean;
  published?: boolean;
  attachments?: Attachment[];
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
  readTimeMinutes?: number | null;
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

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  type: ExperienceType;
  sortOrder: number;
}

export interface CurrentFocusItem {
  id: string;
  category: 'learning' | 'building' | 'reading';
  label: string;
  status: 'active' | 'progress' | 'soon';
  progress: number;
  sortOrder: number;
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
