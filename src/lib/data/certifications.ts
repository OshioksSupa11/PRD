import 'server-only';

import { createClient } from '@/lib/supabase/server';
import type { Certification } from '@/types';

export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('certifications')
    .select('*')
    .order('issue_date', { ascending: false });

  if (!data) return [];

  return data.map((c) => ({
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    issueDate: c.issue_date,
    certificateUrl: c.certificate_url || undefined,
    imageUrl: c.image_url,
    verificationUrl: c.verification_url,
    skillTags: c.skill_tags || [],
  }));
}
