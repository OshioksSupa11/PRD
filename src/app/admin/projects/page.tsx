'use client';

import { useEffect, useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, FolderOpen, X, ChevronDown, ChevronUp } from 'lucide-react';
import {
  createProject,
  updateProject,
  deleteProject,
  type ProjectFormData,
} from '@/lib/actions/projects';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  tech_stack: string[];
  category: string | null;
  type: string;
  project_date: string | null;
  external_link: string | null;
  featured: boolean;
  published: boolean;
  problem: string | null;
  research: string | null;
  solution: string | null;
  design_decisions: string | null;
  challenges: string | null;
  results: string | null;
  lessons_learned: string | null;
  demo_url: string | null;
  github_url: string | null;
}

const emptyForm: ProjectFormData = {
  title: '',
  slug: '',
  description: '',
  image_url: '',
  technologies: '',
  tech_stack: '',
  category: '',
  type: 'engineering',
  project_date: '',
  external_link: '',
  featured: false,
  published: false,
  problem: '',
  research: '',
  solution: '',
  design_decisions: '',
  challenges: '',
  results: '',
  lessons_learned: '',
  demo_url: '',
  github_url: '',
};

const projectTypes = ['engineering', 'software', 'hybrid'];

const inputClass =
  'w-full rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: editingId ? form.slug : generateSlug(title),
    });
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setShowCaseStudy(false);
    setShowForm(true);
  };

  const openEdit = (project: Project) => {
    const hasCaseStudy = !!(
      project.problem ||
      project.research ||
      project.solution ||
      project.challenges ||
      project.results
    );

    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      image_url: project.image_url || '',
      technologies: project.technologies?.join(', ') || '',
      tech_stack: project.tech_stack?.join(', ') || '',
      category: project.category || '',
      type: project.type || 'engineering',
      project_date: project.project_date || '',
      external_link: project.external_link || '',
      featured: project.featured,
      published: project.published,
      problem: project.problem || '',
      research: project.research || '',
      solution: project.solution || '',
      design_decisions: project.design_decisions || '',
      challenges: project.challenges || '',
      results: project.results || '',
      lessons_learned: project.lessons_learned || '',
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
    });
    setEditingId(project.id);
    setError('');
    setShowCaseStudy(hasCaseStudy);
    setShowForm(true);
  };

  const handleSubmit = () => {
    setError('');
    startTransition(async () => {
      const result = editingId
        ? await updateProject(editingId, form)
        : await createProject(form);
      if (!result.success) {
        setError(result.error || 'Something went wrong');
        return;
      }
      setShowForm(false);
      fetchProjects();
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await deleteProject(id);
    fetchProjects();
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const typeBadge: Record<string, string> = {
    engineering: 'bg-blue-100 text-blue-800',
    software: 'bg-purple-100 text-purple-800',
    hybrid: 'bg-amber-100 text-amber-800',
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Projects</h1>
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">Projects</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-border bg-bg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">
              {editingId ? 'Edit Project' : 'New Project'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-text-muted hover:text-text transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                Basic Info
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Title *</label>
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Slug *</label>
                  <input
                    className={inputClass}
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="project-slug"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-text">Description *</label>
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief project description..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Image URL</label>
                  <input
                    className={inputClass}
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="/images/projects/my-project.jpg"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Category</label>
                  <input
                    className={inputClass}
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Commercial, Industrial, etc."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Type</label>
                  <select
                    className={inputClass}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Project Date</label>
                  <input
                    className={inputClass}
                    type="month"
                    value={form.project_date}
                    onChange={(e) => setForm({ ...form, project_date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Technical */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                Technical
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">
                    Technologies (comma separated)
                  </label>
                  <input
                    className={inputClass}
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    placeholder="React, TypeScript, Next.js"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    className={inputClass}
                    value={form.tech_stack}
                    onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                    placeholder="Next.js, Supabase, Tailwind"
                  />
                </div>
              </div>
            </div>

            {/* Publishing */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                Publishing
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-text">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-border"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-text">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="rounded border-border"
                  />
                  Published
                </label>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">External Link</label>
                  <input
                    className={inputClass}
                    value={form.external_link}
                    onChange={(e) => setForm({ ...form, external_link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-text">Demo URL</label>
                  <input
                    className={inputClass}
                    value={form.demo_url}
                    onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                    placeholder="https://..."
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
              </div>
            </div>

            {/* Case Study (Collapsible) */}
            <div>
              <button
                type="button"
                onClick={() => setShowCaseStudy(!showCaseStudy)}
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted hover:text-text transition-colors"
              >
                {showCaseStudy ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
                Case Study
              </button>
              {showCaseStudy && (
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">Problem</label>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={form.problem}
                      onChange={(e) => setForm({ ...form, problem: e.target.value })}
                      placeholder="Describe the problem..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">Research</label>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={form.research}
                      onChange={(e) => setForm({ ...form, research: e.target.value })}
                      placeholder="Research conducted..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">Solution</label>
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={form.solution}
                      onChange={(e) => setForm({ ...form, solution: e.target.value })}
                      placeholder="The solution implemented..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">
                      Design Decisions
                    </label>
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={form.design_decisions}
                      onChange={(e) => setForm({ ...form, design_decisions: e.target.value })}
                      placeholder="Key design decisions..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">Challenges</label>
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={form.challenges}
                      onChange={(e) => setForm({ ...form, challenges: e.target.value })}
                      placeholder="Challenges faced..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">Results</label>
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={form.results}
                      onChange={(e) => setForm({ ...form, results: e.target.value })}
                      placeholder="Outcomes and results..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-text">
                      Lessons Learned
                    </label>
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={form.lessons_learned}
                      onChange={(e) => setForm({ ...form, lessons_learned: e.target.value })}
                      placeholder="Lessons learned..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={isPending || !form.title || !form.slug || !form.description}
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

      {projects.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg p-12 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-text-muted" />
          <h3 className="mt-4 text-lg font-bold text-primary">No Projects</h3>
          <p className="mt-2 text-sm text-text-muted">
            Create your first project using the button above.
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
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-bg-alt/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-text">{project.title}</span>
                    {project.published ? null : (
                      <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {project.category || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge[project.type] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {project.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {formatDate(project.project_date)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {project.featured ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                        &#9733;
                      </span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(project)}
                        className="rounded-lg p-2 text-text-muted hover:bg-bg-alt hover:text-text transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
