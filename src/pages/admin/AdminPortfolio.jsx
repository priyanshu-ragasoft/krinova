import { useEffect, useState } from 'react';
import { adminFetch, adminUpload, assetUrl } from '../../lib/api';

const empty = {
  title: '',
  category: 'B2B Tech',
  image: '',
  metric: '',
  colSpan: '1',
  problem: '',
  work: '',
  result: '',
  published: true,
  sortOrder: 0,
};

const CATEGORIES = ['B2B Tech', 'E-Commerce', 'Fintech', 'Healthcare'];
const SPANS = [
  { value: '1', label: 'Standard (1 column)' },
  { value: '2', label: 'Wide (2 columns)' },
  { value: '3', label: 'Full row (3 columns)' },
];

function DarkSelect({ value, onChange, options, labelKey = 'label', valueKey = 'value' }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const close = () => setOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const normalized = options.map((o) => (
    typeof o === 'string' ? { [valueKey]: o, [labelKey]: o } : o
  ));
  const selected = normalized.find((o) => o[valueKey] === value);
  const display = selected?.[labelKey] || value;

  return (
    <div className="relative mt-1.5">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((p) => !p); }}
        className={`${inputClass} flex w-full items-center justify-between text-left`}
      >
        <span>{display}</span>
        <span className="text-[10px] text-white/40">▼</span>
      </button>
      {open && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-white/10 bg-[#14100A] shadow-[0_12px_40px_rgba(0,0,0,0.45)]" onClick={(e) => e.stopPropagation()}>
          {normalized.map((o) => (
            <li key={o[valueKey]}>
              <button
                type="button"
                onClick={() => { onChange(o[valueKey]); setOpen(false); }}
                className={`w-full px-3 py-2.5 text-left text-[14px] transition-colors ${
                  o[valueKey] === value ? 'bg-[#C9A259]/15 text-[#C9A259]' : 'text-white/80 hover:bg-white/[0.06]'
                }`}
              >
                {o[labelKey]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { res, data } = await adminFetch('/admin/portfolio');
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Could not load projects.');
      return;
    }
    setError('');
    setProjects(data.projects || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing('new');
    setForm(empty);
    setFile(null);
    setPreview('');
  };

  const openEdit = (p) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      category: p.category,
      image: p.image,
      metric: p.metric,
      colSpan: p.colSpan || '1',
      problem: p.problem || '',
      work: p.work || '',
      result: p.result || '',
      published: p.published,
      sortOrder: p.sortOrder || 0,
    });
    setFile(null);
    setPreview(assetUrl(p.image));
  };

  const closeForm = () => {
    setEditing(null);
    setForm(empty);
    setFile(null);
    setPreview('');
  };

  const pickImage = (e) => {
    const next = e.target.files?.[0];
    if (!next) return;
    setFile(next);
    setPreview(URL.createObjectURL(next));
    setError('');
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    let image = form.image;
    if (file) {
      const payload = new FormData();
      payload.append('image', file);
      const uploaded = await adminUpload('/admin/upload', payload);
      if (!uploaded.res.ok) {
        setSaving(false);
        setError(uploaded.data.error || 'Could not upload the image.');
        return;
      }
      image = uploaded.data.url;
    }
    if (!image) {
      setSaving(false);
      setError('Choose an image to upload.');
      return;
    }
    const path = editing === 'new' ? '/admin/portfolio' : `/admin/portfolio/${editing}`;
    const method = editing === 'new' ? 'POST' : 'PUT';
    const { res, data } = await adminFetch(path, {
      method,
      body: JSON.stringify({ ...form, image }),
    });
    setSaving(false);
    if (!res.ok) {
      setError(data.error || 'Could not save.');
      return;
    }
    closeForm();
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Remove this project from the portfolio?')) return;
    const { res, data } = await adminFetch(`/admin/portfolio/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      setError(data.error || 'Could not delete.');
      return;
    }
    if (editing === id) closeForm();
    load();
  };

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">Work</p>
          <h1 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl text-white">Portfolio</h1>
          <p className="mt-2 max-w-md text-sm text-white/45">
            What you save here is what the public /portfolio page shows.
          </p>
        </div>
        <button type="button" onClick={openNew} className="rounded-md bg-[#C9A259] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#14100A] uppercase hover:bg-[#dfc070]">
          New project
        </button>
      </div>

      {error && <p className="mt-6 text-sm text-[#C96A45]">{error}</p>}

      {editing && (
        <form onSubmit={save} className="mt-8 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-[11px] tracking-widest text-white/40 uppercase">
              Title
              <input required value={form.title} onChange={set('title')} className={inputClass} />
            </label>
            <label className="block text-[11px] tracking-widest text-white/40 uppercase">
              Category
              <DarkSelect value={form.category} options={CATEGORIES} onChange={(category) => setForm((f) => ({ ...f, category }))} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-[11px] tracking-widest text-white/40 uppercase">
              Result metric
              <input required value={form.metric} onChange={set('metric')} placeholder="+240% Inbound Leads" className={inputClass} />
            </label>
            <label className="block text-[11px] tracking-widest text-white/40 uppercase">
              Grid size
              <DarkSelect value={form.colSpan} options={SPANS} onChange={(colSpan) => setForm((f) => ({ ...f, colSpan }))} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="block text-[11px] tracking-widest text-white/40 uppercase">
              Image
              <label className={`${inputClass} mt-1.5 flex cursor-pointer items-center justify-between gap-3`}>
                <span className="truncate text-white/70 normal-case tracking-normal">
                  {file?.name || (form.image ? 'Replace image' : 'Choose an image')}
                </span>
                <span className="shrink-0 text-[10px] tracking-widest text-[#C9A259] uppercase">Browse</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={pickImage} className="sr-only" />
              </label>
              {preview && <img src={preview} alt="" className="mt-3 h-28 w-full rounded-md object-cover" />}
            </div>
            <label className="block text-[11px] tracking-widest text-white/40 uppercase">
              Sort order
              <input type="number" value={form.sortOrder} onChange={set('sortOrder')} className={inputClass} />
              <span className="mt-1 block text-[10px] normal-case tracking-normal text-white/30">Higher = appears first</span>
            </label>
          </div>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Problem
            <textarea rows={2} value={form.problem} onChange={set('problem')} className={inputClass} />
          </label>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Work
            <textarea rows={2} value={form.work} onChange={set('work')} className={inputClass} />
          </label>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Result
            <textarea rows={2} value={form.result} onChange={set('result')} className={inputClass} />
          </label>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={form.published} onChange={set('published')} />
            Published on /portfolio
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-md bg-[#C9A259] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#14100A] uppercase disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={closeForm} className="rounded-md border border-white/15 px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-white/60 uppercase">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 overflow-hidden rounded-xl border border-white/8">
        {loading ? (
          <p className="p-8 text-sm text-white/40">Loading…</p>
        ) : projects.length === 0 ? (
          <p className="p-8 text-sm text-white/40">No projects yet. Add the first one.</p>
        ) : (
          <ul className="divide-y divide-white/8">
            {projects.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <img src={assetUrl(p.image)} alt="" className="size-14 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] text-white">{p.title}</p>
                  <p className="mt-1 text-[11px] text-white/40">
                    {p.category} · {p.metric} · {p.published ? 'Live' : 'Draft'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(p)} className="rounded-md border border-white/15 px-3 py-1.5 text-[11px] text-white/70 hover:text-white">
                    Edit
                  </button>
                  <button type="button" onClick={() => remove(p.id)} className="rounded-md border border-[#C96A45]/40 px-3 py-1.5 text-[11px] text-[#C96A45]">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

const inputClass =
  'mt-1.5 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[14px] font-normal normal-case tracking-normal text-white outline-none focus:border-[#C9A259]/50 [color-scheme:dark]';
