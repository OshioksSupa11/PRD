'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, Trophy, X } from 'lucide-react';

interface AchievementFormData {
  title: string;
  description: string;
  achievement_date: string;
  icon: string;
  featured: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  achievement_date: string;
  icon: string | null;
  featured: boolean;
}

const emptyForm: AchievementFormData = {
  title: '',
  description: '',
  achievement_date: '',
  icon: '',
  featured: false,
};

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function AchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AchievementFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/achievements');
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

  const openEdit = (item: Achievement) => {
    setForm({
      title: item.title,
      description: item.description,
      achievement_date: item.achievement_date,
      icon: item.icon || '',
      featured: item.featured,
    });
    setEditingId(item.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/admin/achievements', {
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
    if (!confirm('Delete this achievement?')) return;
    await fetch(`/api/admin/achievements?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    fetchItems();
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Achievements</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Achievements</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Achievement
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {editingId ? 'Edit Achievement' : 'New Achievement'}
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
                placeholder="Awarded Engineer of the Year"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Achievement Date *</label>
              <input
                className={inputClass}
                type="date"
                value={form.achievement_date}
                onChange={(e) => setForm({ ...form, achievement_date: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Icon</label>
              <input
                className={inputClass}
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="Trophy"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                Featured
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text">Description *</label>
              <textarea
                className={inputClass}
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the achievement..."
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.title || !form.description || !form.achievement_date}
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
          <Trophy className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Achievements</h3>
          <p className="mt-2 text-sm text-text-muted">
            Add your notable achievements above.
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
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Featured
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
                    <span className="text-sm font-medium text-text">{item.title}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {new Date(item.achievement_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {item.featured ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">No</span>
                    )}
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
