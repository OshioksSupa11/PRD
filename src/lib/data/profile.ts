import 'server-only';

import { createClient } from '@/lib/supabase/server';
import type { Profile } from '@/types';

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    headline: data.headline,
    bio: data.bio,
    profileImage: data.profile_image || '',
    email: data.email || '',
    phone: data.phone || '',
    whatsappNumber: data.phone || '',
    linkedinUrl: data.linkedin_url || '',
    githubUrl: data.github_url || '',
    resumeUrl: data.resume_url || '/documents/resume.pdf',
    resumeUrlDesigned: data.resume_url_designed,
    resumeUrlAts: data.resume_url_ats,
    resumeUrlDocx: data.resume_url_docx,
  };
}
