'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, Target, X } from 'lucide-react';

interface FocusFormData {
  category: string;
  label: string;
  status: string;
  progress: number;
  sort_order: number;
}

interface Focus {
  id: string;
  category: string;
  label: string;
  status: string;
  progress: number;
  sort_order: number;
}

const emptyForm: FocusFormData = {
  category: 'learning',
  label: '',
  status: 'active',
  progress: 0,
  sort_order: 0,
};

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

const categoryOptions = ['learning', 'building', 'reading'];
const statusOptions = ['active', 'progress', 'soon'];

export default function FocusPage() {
  const [items, setItems] = useState<Focus[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FocusFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/focus');
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

  const openEdit = (item: Focus) => {
    setForm({
      category: item.category,
      label: item.label,
      status: item.status,
      progress: item.progress,
      sort_order: item.sort_order,
    });
    setEditingId(item.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/admin/focus', {
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
    if (!confirm('Delete this focus item?')) return;
    await fetch(`/api/admin/focus?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    fetchItems();
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Focus</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Focus</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Focus Item
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {editingId ? 'Edit Focus Item' : 'New Focus Item'}
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
              <label className="mb-1 block text-xs font-medium text-text">Label *</label>
              <input
                className={inputClass}
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="Learning Next.js"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Category *</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Status</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Progress (0-100)</label>
              <input
                className={inputClass}
                type="number"
                min={0}
                max={100}
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Sort Order</label>
              <input
                className={inputClass}
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.category || !form.label}
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
          <Target className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Focus Items</h3>
          <p className="mt-2 text-sm text-text-muted">
            Add what you&apos;re currently focused on above.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-alt">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Label
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Progress
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
                    <span className="text-sm font-medium text-text">{item.label}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted">{item.progress}%</span>
                    </div>
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
