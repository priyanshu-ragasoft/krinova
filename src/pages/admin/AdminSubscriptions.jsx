import { useEffect, useMemo, useState } from 'react';
import { Mail, Search, Trash2, Users, Sparkles } from 'lucide-react';
import { adminFetch } from '../../lib/api';

function Skeleton() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="h-3 w-1/2 rounded bg-white/10" />
          <div className="mt-2 h-2 w-1/4 rounded bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}

export default function AdminSubscriptions() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true);
    const { res, data } = await adminFetch('/admin/subscriptions');
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Could not load subscribers.');
      return;
    }
    setError('');
    setList(data.subscriptions || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((s) => s.email.includes(q));
  }, [list, query]);

  const remove = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    const { res, data } = await adminFetch(`/admin/subscriptions/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      setError(data.error || 'Could not delete.');
      return;
    }
    setList((items) => items.filter((s) => s.id !== id));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCount = list.filter((s) => new Date(s.createdAt) >= today).length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">
            <Mail size={13} />
            Newsletter
          </p>
          <h1 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl text-white md:text-4xl">Subscribers</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/45">
            Emails collected from the footer “Stay Updated” form on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-md border border-white/12 px-4 py-2.5 text-[11px] font-bold tracking-[0.14em] text-white/60 uppercase transition-colors hover:border-[#C9A259]/40 hover:text-[#C9A259]"
        >
          Refresh
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg border border-[#C9A259]/25 bg-[#C9A259]/10 text-[#C9A259]">
              <Users size={18} />
            </span>
            <div>
              <p className="text-2xl font-bold text-white">{list.length}</p>
              <p className="text-[11px] tracking-widest text-white/40 uppercase">Total subscribers</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg border border-[#C9A259]/25 bg-[#C9A259]/10 text-[#C9A259]">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="text-2xl font-bold text-white">{todayCount}</p>
              <p className="text-[11px] tracking-widest text-white/40 uppercase">Joined today</p>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mt-6 text-sm text-[#C96A45]">{error}</p>}

      <div className="mt-8 overflow-hidden rounded-xl border border-white/8 bg-white/[0.015]">
        <div className="flex flex-wrap items-center gap-3 border-b border-white/8 px-5 py-4">
          <div className="relative min-w-[200px] flex-1">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by email…"
              className="w-full rounded-md border border-white/10 bg-white/[0.03] py-2.5 pr-3 pl-9 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#C9A259]/50"
            />
          </div>
          <p className="text-[12px] text-white/35">{filtered.length} shown</p>
        </div>

        {loading ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <p className="p-10 text-center text-sm text-white/40">
            {list.length === 0 ? 'No subscribers yet. They will appear here when someone uses the footer form.' : 'No emails match your search.'}
          </p>
        ) : (
          <ul className="divide-y divide-white/6">
            {filtered.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#C9A259]/20 bg-[#C9A259]/10 text-[11px] font-bold text-[#C9A259] uppercase">
                  {s.email.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] text-white">{s.email}</p>
                  <p className="mt-0.5 text-[11px] text-white/35">{s.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(s.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#C96A45]/35 px-3 py-1.5 text-[11px] text-[#C96A45] transition-colors hover:bg-[#C96A45]/10"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
