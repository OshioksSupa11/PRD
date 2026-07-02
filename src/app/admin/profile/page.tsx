'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { Loader2, Upload, User, X } from 'lucide-react';

interface ProfileFormData {
  name: string;
  headline: string;
  bio: string;
  profile_image: string;
  email: string;
  phone: string;
  linkedin_url: string;
  github_url: string;
  resume_url: string;
  resume_url_designed: string;
  resume_url_ats: string;
  resume_url_docx: string;
}

interface Profile {
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
  resume_url_designed: string | null;
  resume_url_ats: string | null;
  resume_url_docx: string | null;
}

const emptyForm: ProfileFormData = {
  name: '',
  headline: '',
  bio: '',
  profile_image: '',
  email: '',
  phone: '',
  linkedin_url: '',
  github_url: '',
  resume_url: '',
  resume_url_designed: '',
  resume_url_ats: '',
  resume_url_docx: '',
};

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProfileFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingDesigned, setUploadingDesigned] = useState(false);
  const [uploadingAts, setUploadingAts] = useState(false);
  const [uploadingDocx, setUploadingDocx] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileDesignedRef = useRef<HTMLInputElement>(null);
  const fileAtsRef = useRef<HTMLInputElement>(null);
  const fileDocxRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    file: File,
    field: 'resume_url' | 'resume_url_designed' | 'resume_url_ats' | 'resume_url_docx'
  ) => {
    const setter = {
      resume_url: setUploadingResume,
      resume_url_designed: setUploadingDesigned,
      resume_url_ats: setUploadingAts,
      resume_url_docx: setUploadingDocx,
    }[field];

    setter(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload failed');
        return;
      }
      setForm((prev) => ({ ...prev, [field]: data.url }));
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setter(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile');
      const data = await res.json();
      if (data && !Array.isArray(data)) {
        setProfile(data);
        setForm({
          name: data.name || '',
          headline: data.headline || '',
          bio: data.bio || '',
          profile_image: data.profile_image || '',
          email: data.email || '',
          phone: data.phone || '',
          linkedin_url: data.linkedin_url || '',
          github_url: data.github_url || '',
          resume_url: data.resume_url || '',
          resume_url_designed: data.resume_url_designed || '',
          resume_url_ats: data.resume_url_ats || '',
          resume_url_docx: data.resume_url_docx || '',
        });
      }
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const openEdit = () => {
    setError('');
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/admin/profile', {
        method: profile ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile ? { id: profile.id, ...form } : form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong');
        return;
      }
      setShowForm(false);
      fetchProfile();
    });
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Profile</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Profile</h1>
        {profile && !showForm && (
          <button
            onClick={openEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {!profile && !showForm ? (
        <div className="rounded-xl border border-border bg-bg p-12 text-center">
          <User className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Profile</h3>
          <p className="mt-2 text-sm text-text-muted">
            Create your profile to get started.
          </p>
          <button
            onClick={() => {
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
          >
            Create Profile
          </button>
        </div>
      ) : !showForm && profile ? (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-alt">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Field
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { label: 'Name', value: profile.name },
                { label: 'Headline', value: profile.headline },
                { label: 'Bio', value: profile.bio },
                { label: 'Profile Image', value: profile.profile_image },
                { label: 'Email', value: profile.email },
                { label: 'Phone', value: profile.phone },
                { label: 'LinkedIn URL', value: profile.linkedin_url },
                { label: 'GitHub URL', value: profile.github_url },
                { label: 'Resume URL', value: profile.resume_url },
                { label: 'Designed Resume URL', value: profile.resume_url_designed },
                { label: 'ATS Resume URL', value: profile.resume_url_ats },
                { label: 'DOCX Resume URL', value: profile.resume_url_docx },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-bg-alt/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-text">{row.label}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {row.value ? (
                      row.label.toLowerCase().includes('url') ? (
                        <a
                          href={row.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline truncate max-w-xs inline-block"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span>{row.value}</span>
                      )
                    ) : (
                      <span className="text-text-muted/40">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {showForm && (
        <div className="rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {profile ? 'Edit Profile' : 'Create Profile'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-text-muted hover:text-text transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Name</label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Headline</label>
              <input
                className={inputClass}
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="Fire Protection Engineer"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Profile Image URL</label>
              <input
                className={inputClass}
                value={form.profile_image}
                onChange={(e) => setForm({ ...form, profile_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Email</label>
              <input
                className={inputClass}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Phone</label>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 555-555-5555"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">LinkedIn URL</label>
              <input
                className={inputClass}
                value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">GitHub URL</label>
              <input
                className={inputClass}
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Resume URL</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={form.resume_url}
                  onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
                  placeholder="Paste URL or upload file"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'resume_url');
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingResume}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg-alt px-3 py-2 text-xs font-medium text-text-muted hover:text-text hover:border-accent transition-colors disabled:opacity-50 shrink-0"
                >
                  {uploadingResume ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  Upload
                </button>
              </div>
              {form.resume_url && (
                <p className="mt-1 text-xs text-text-muted truncate">
                  <span className="text-accent">Uploaded:</span> {form.resume_url}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Designed Resume URL</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={form.resume_url_designed}
                  onChange={(e) => setForm({ ...form, resume_url_designed: e.target.value })}
                  placeholder="Paste URL or upload file"
                />
                <input
                  ref={fileDesignedRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'resume_url_designed');
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileDesignedRef.current?.click()}
                  disabled={uploadingDesigned}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg-alt px-3 py-2 text-xs font-medium text-text-muted hover:text-text hover:border-accent transition-colors disabled:opacity-50 shrink-0"
                >
                  {uploadingDesigned ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  Upload
                </button>
              </div>
              {form.resume_url_designed && (
                <p className="mt-1 text-xs text-text-muted truncate">
                  <span className="text-accent">Uploaded:</span> {form.resume_url_designed}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">ATS Resume URL</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={form.resume_url_ats}
                  onChange={(e) => setForm({ ...form, resume_url_ats: e.target.value })}
                  placeholder="Paste URL or upload file"
                />
                <input
                  ref={fileAtsRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'resume_url_ats');
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileAtsRef.current?.click()}
                  disabled={uploadingAts}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg-alt px-3 py-2 text-xs font-medium text-text-muted hover:text-text hover:border-accent transition-colors disabled:opacity-50 shrink-0"
                >
                  {uploadingAts ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  Upload
                </button>
              </div>
              {form.resume_url_ats && (
                <p className="mt-1 text-xs text-text-muted truncate">
                  <span className="text-accent">Uploaded:</span> {form.resume_url_ats}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Resume DOCX URL</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={form.resume_url_docx}
                  onChange={(e) => setForm({ ...form, resume_url_docx: e.target.value })}
                  placeholder="Paste URL or upload file"
                />
                <input
                  ref={fileDocxRef}
                  type="file"
                  accept=".docx,.doc"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'resume_url_docx');
                    e.target.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileDocxRef.current?.click()}
                  disabled={uploadingDocx}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg-alt px-3 py-2 text-xs font-medium text-text-muted hover:text-text hover:border-accent transition-colors disabled:opacity-50 shrink-0"
                >
                  {uploadingDocx ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  Upload
                </button>
              </div>
              {form.resume_url_docx && (
                <p className="mt-1 text-xs text-text-muted truncate">
                  <span className="text-accent">Uploaded:</span> {form.resume_url_docx}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text">Bio</label>
              <textarea
                className={inputClass}
                rows={5}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="A brief professional biography..."
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-bg-alt transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
