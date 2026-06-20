'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export interface CertificationFormData {
  title: string;
  issuer: string;
  issue_date: string;
  certificate_url?: string;
  image_url?: string;
  verification_url?: string;
  skill_tags?: string;
}

function parseTags(value?: string): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

export async function createCertification(formData: CertificationFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('certifications').insert({
    title: formData.title,
    issuer: formData.issuer,
    issue_date: formData.issue_date,
    certificate_url: formData.certificate_url || null,
    image_url: formData.image_url || null,
    verification_url: formData.verification_url || null,
    skill_tags: parseTags(formData.skill_tags),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true };
}

export async function updateCertification(id: string, formData: CertificationFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('certifications')
    .update({
      title: formData.title,
      issuer: formData.issuer,
      issue_date: formData.issue_date,
      certificate_url: formData.certificate_url || null,
      image_url: formData.image_url || null,
      verification_url: formData.verification_url || null,
      skill_tags: parseTags(formData.skill_tags),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true };
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('certifications').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true };
}
