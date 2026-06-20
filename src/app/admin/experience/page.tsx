'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, Briefcase, X } from 'lucide-react';

interface ExperienceFormData {
  position: string;
  company: string;
  start_date: string;
  end_date: string;
  responsibilities: string;
  achievements: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string[];
  achievements: string[];
}

const emptyForm: ExperienceFormData = {
  position: '',
  company: '',
  start_date: '',
  end_date: '',
  responsibilities: '',
  achievements: '',
};

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';


export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ExperienceFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/experience');
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (item: Experience) => {
    setForm({
      position: item.position,
      company: item.company,
      start_date: item.start_date,
      end_date: item.end_date || '',
      responsibilities: item.responsibilities?.join(', ') || '',
      achievements: item.achievements?.join(', ') || '',
    });
    setEditingId(item.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/admin/experience', {
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
      fetchItems();
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    await fetch(`/api/admin/experience?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    fetchItems();
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Experience</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Experience</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Experience
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {editingId ? 'Edit Experience' : 'New Experience'}
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
              <label className="mb-1 block text-xs font-medium text-text">Position *</label>
              <input
                className={inputClass}
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                placeholder="Fire Protection Engineer"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Company *</label>
              <input
                className={inputClass}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Start Date *</label>
              <input
                className={inputClass}
                type="month"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">End Date</label>
              <input
                className={inputClass}
                type="month"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text">
                Responsibilities (comma separated)
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.responsibilities}
                onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                placeholder="Designed fire sprinkler systems, Conducted inspections..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text">
                Achievements (comma separated)
              </label>
              <textarea
                className={inputClass}
                rows={3}
                value={form.achievements}
                onChange={(e) => setForm({ ...form, achievements: e.target.value })}
                placeholder="Reduced inspection time by 30%, Led team of 5..."
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.position || !form.company || !form.start_date}
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

      {items.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg p-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Experience</h3>
          <p className="mt-2 text-sm text-text-muted">
            Add your professional experience above.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-alt">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Dates
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-bg-alt/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-text">{item.position}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{item.company}</td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {item.start_date} &ndash; {item.end_date || 'Present'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
