'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, MessageSquareQuote, X } from 'lucide-react';

interface TestimonialFormData {
  name: string;
  role: string;
  company: string;
  content: string;
  featured: boolean;
  sort_order: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  featured: boolean;
  sort_order: number;
}

const emptyForm: TestimonialFormData = {
  name: '',
  role: '',
  company: '',
  content: '',
  featured: false,
  sort_order: 0,
};

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
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

  const openEdit = (item: Testimonial) => {
    setForm({
      name: item.name,
      role: item.role,
      company: item.company,
      content: item.content,
      featured: item.featured,
      sort_order: item.sort_order,
    });
    setEditingId(item.id);
    setError('');
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/admin/testimonials', {
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
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    fetchItems();
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Testimonials</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Testimonials</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Testimonial
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {editingId ? 'Edit Testimonial' : 'New Testimonial'}
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
              <label className="mb-1 block text-xs font-medium text-text">Name *</label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Role *</label>
              <input
                className={inputClass}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Fire Chief"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text">Company *</label>
              <input
                className={inputClass}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="City Fire Department"
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
              <label className="mb-1 block text-xs font-medium text-text">Content *</label>
              <textarea
                className={inputClass}
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="An outstanding professional..."
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.name || !form.role || !form.company || !form.content}
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
          <MessageSquareQuote className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Testimonials</h3>
          <p className="mt-2 text-sm text-text-muted">
            Add client and colleague testimonials above.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-bg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-alt">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Company
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
                    <span className="text-sm font-medium text-text">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{item.role}</td>
                  <td className="px-6 py-4 text-sm text-text-muted">{item.company}</td>
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
