import { useEffect, useState } from 'react';
import { adminFetch, adminUpload, assetUrl } from '../../lib/api';

const empty = {
  title: '',
  excerpt: '',
  body: '',
  category: 'Marketing',
  image: '',
  readTime: '5 min read',
  featured: false,
  published: true,
};

const CATEGORIES = ['Marketing', 'Strategy', 'Tech', 'Case Studies'];

function CategorySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const close = () => setOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  return (
    <div className="relative mt-1.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={`${inputClass} flex w-full items-center justify-between text-left`}
      >
        <span>{value}</span>
        <span className="text-[10px] text-white/40">▼</span>
      </button>
      {open && (
        <ul
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-white/10 bg-[#14100A] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          onClick={(e) => e.stopPropagation()}
        >
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2.5 text-left text-[14px] transition-colors ${
                  c === value
                    ? 'bg-[#C9A259]/15 text-[#C9A259]'
                    : 'text-white/80 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { res, data } = await adminFetch('/admin/blogs');
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Could not load posts.');
      return;
    }
    setError('');
    setPosts(data.posts || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing('new');
    setForm(empty);
    setFile(null);
    setPreview('');
  };

  const openEdit = (post) => {
    setEditing(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      body: post.body || '',
      category: post.category,
      image: post.image,
      readTime: post.readTime,
      featured: post.featured,
      published: post.published,
    });
    setFile(null);
    setPreview(assetUrl(post.image));
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
    const path = editing === 'new' ? '/admin/blogs' : `/admin/blogs/${editing}`;
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
    if (!window.confirm('Remove this note from the journal?')) return;
    const { res, data } = await adminFetch(`/admin/blogs/${id}`, { method: 'DELETE' });
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
          <p className="mb-2 text-[11px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">Journal</p>
          <h1 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl text-white">Blog</h1>
          <p className="mt-2 max-w-md text-sm text-white/45">
            What you save here is what the public /blog page shows.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="rounded-md bg-[#C9A259] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#14100A] uppercase hover:bg-[#dfc070]"
        >
          New note
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
              <CategorySelect
                value={form.category}
                onChange={(category) => setForm((f) => ({ ...f, category }))}
              />
            </label>
          </div>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Excerpt
            <textarea required rows={2} value={form.excerpt} onChange={set('excerpt')} className={inputClass} />
          </label>
          <label className="block text-[11px] tracking-widest text-white/40 uppercase">
            Body
            <textarea rows={8} value={form.body} onChange={set('body')} className={inputClass} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="block text-[11px] tracking-widest text-white/40 uppercase">
              Image
              <label className={`${inputClass} mt-1.5 flex cursor-pointer items-center justify-between gap-3`}>
                <span className="truncate text-white/70 normal-case tracking-normal">
                  {file?.name || (form.image ? 'Replace image' : 'Choose an image')}
                </span>
                <span className="shrink-0 text-[10px] tracking-widest text-[#C9A259] uppercase">Browse</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={pickImage}
                  className="sr-only"
                />
              </label>
              {preview && (
                <img src={preview} alt="" className="mt-3 h-28 w-full rounded-md object-cover" />
              )}
            </div>
            <label className="block text-[11px] tracking-widest text-white/40 uppercase">
              Read time
              <input value={form.readTime} onChange={set('readTime')} className={inputClass} />
            </label>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={set('featured')} />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={set('published')} />
              Published
            </label>
          </div>
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
        ) : posts.length === 0 ? (
          <p className="p-8 text-sm text-white/40">No notes yet. Add the first one.</p>
        ) : (
          <ul className="divide-y divide-white/8">
            {posts.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <img src={assetUrl(p.image)} alt="" className="size-14 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] text-white">{p.title}</p>
                  <p className="mt-1 text-[11px] text-white/40">
                    {p.category} · {p.published ? 'Live' : 'Draft'} {p.featured ? '· Featured' : ''}
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
  'mt-1.5 w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[14px] font-normal normal-case tracking-normal text-white outline-none focus:border-[#C9A259]/50';
