export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

interface ProfileRow {
  id: string;
  name: string;
  headline: string;
  bio: string;
  profile_image: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  resume_url: string | null;
  created_at: string;
  updated_at: string;
}

interface SkillRow {
  id: string;
  name: string;
  category: 'Engineering' | 'Fire Protection' | 'Technical' | 'Professional';
  sort_order: number;
  created_at: string;
}

interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  category: string | null;
  project_date: string | null;
  external_link: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface ExperienceRow {
  id: string;
  position: string;
  company: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string[];
  achievements: string[];
  created_at: string;
  updated_at: string;
}

interface CertificationRow {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  certificate_url: string | null;
  created_at: string;
  updated_at: string;
}

interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<ProfileRow, 'id'>>;
        Update: Partial<ProfileRow>;
      };
      skills: {
        Row: SkillRow;
        Insert: Omit<SkillRow, 'id' | 'created_at'> & Partial<Pick<SkillRow, 'id'>>;
        Update: Partial<SkillRow>;
      };
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<ProjectRow, 'id'>>;
        Update: Partial<ProjectRow>;
      };
      experience: {
        Row: ExperienceRow;
        Insert: Omit<ExperienceRow, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<ExperienceRow, 'id'>>;
        Update: Partial<ExperienceRow>;
      };
      certifications: {
        Row: CertificationRow;
        Insert: Omit<CertificationRow, 'id' | 'created_at' | 'updated_at'> & Partial<Pick<CertificationRow, 'id'>>;
        Update: Partial<CertificationRow>;
      };
      messages: {
        Row: MessageRow;
        Insert: Omit<MessageRow, 'id' | 'created_at'> & Partial<Pick<MessageRow, 'id'>>;
        Update: Partial<MessageRow>;
      };
    };
  };
}
