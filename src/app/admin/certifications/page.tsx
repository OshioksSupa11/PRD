'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, Award, X } from 'lucide-react';
interface CertificationFormData {
  title: string;
  issuer: string;
  issue_date: string;
  certificate_url?: string;
  image_url?: string;
  verification_url?: string;
  skill_tags?: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  certificate_url: string | null;
  image_url: string | null;
  verification_url: string | null;
  skill_tags: string[];
}

const emptyForm: CertificationFormData = {
  title: '',
  issuer: '',
  issue_date: '',
  certificate_url: '',
  image_url: '',
  verification_url: '',
  skill_tags: '',
};

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CertificationFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const fetchCerts = async () => {
    try {
      const res = await fetch('/api/admin/certifications');
      const data = await res.json();
      if (Array.isArray(data)) setCerts(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (cert: Certification) => {
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issue_date,
      certificate_url: cert.certificate_url || '',
      image_url: cert.image_url || '',
      verification_url: cert.verification_url || '',
      skill_tags: cert.skill_tags?.join(', ') || '',
    });
    setEditingId(cert.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/admin/certifications', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong');
        return;
      }
      setShowForm(false);
      fetchCerts();
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    await fetch(`/api/admin/certifications?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    fetchCerts();
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr + '-01').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Certifications</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Certifications</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Certification
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {editingId ? 'Edit Certification' : 'New Certification'}
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
              <label className="mb-1 block text-xs font-medium text-text">Title *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Certified Fire Protection Specialist"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Issuer *</label>
              <input
                className={inputClass}
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="NFPA"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Issue Date *</label>
              <input
                className={inputClass}
                type="month"
                value={form.issue_date}
                onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Certificate URL</label>
              <input
                className={inputClass}
                value={form.certificate_url}
                onChange={(e) => setForm({ ...form, certificate_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Image URL</label>
              <input
                className={inputClass}
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Verification URL</label>
              <input
                className={inputClass}
                value={form.verification_url}
                onChange={(e) => setForm({ ...form, verification_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text">
                Skill Tags (comma separated)
              </label>
              <input
                className={inputClass}
                value={form.skill_tags}
                onChange={(e) => setForm({ ...form, skill_tags: e.target.value })}
                placeholder="NFPA, Fire Protection, Sprinkler Systems"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.title || !form.issuer || !form.issue_date}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Saving...' : editingId ? 'Update' : 'Create'}
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

      {certs.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg p-12 text-center">
          <Award className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Certifications</h3>
          <p className="mt-2 text-sm text-text-muted">
            Add your professional certifications above.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-alt">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Issuer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Tags
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certs.map((cert) => (
                <tr key={cert.id} className="hover:bg-bg-alt/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-text">{cert.title}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{cert.issuer}</td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {formatDate(cert.issue_date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {cert.skill_tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                      {(cert.skill_tags?.length || 0) > 3 && (
                        <span className="text-xs text-text-muted">
                          +{cert.skill_tags!.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(cert)}
                        className="rounded-lg p-2 text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
