import { useEffect, useMemo, useState } from 'react';
import { Mail, Inbox, Search, Trash2, Clock, Tag, MessageSquare, Sparkles } from 'lucide-react';
import { adminFetch } from '../../lib/api';

function initials(first, last) {
  return `${(first || '?').charAt(0)}${(last || '').charAt(0)}`.toUpperCase();
}

function MessageSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse rounded-lg border border-white/5 bg-white/[0.02] p-4">
          <div className="flex gap-3">
            <div className="size-10 shrink-0 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-white/10" />
              <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
              <div className="h-2 w-1/4 rounded bg-white/[0.06]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const { res, data } = await adminFetch('/admin/messages');
    setLoading(false);
    if (!res.ok) {
      setError(data.error || 'Could not load messages.');
      return;
    }
    setError('');
    const list = data.messages || [];
    setMessages(list);
    if (!openId && list.length) {
      const firstUnread = list.find((m) => !m.read);
      setOpenId((firstUnread || list[0]).id);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    const { res, data } = await adminFetch(`/admin/messages/${id}/read`, { method: 'PATCH' });
    if (!res.ok) {
      setError(data.error || 'Could not update.');
      return;
    }
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const open = (msg) => {
    setOpenId(msg.id);
    if (!msg.read) markRead(msg.id);
  };

  const remove = async (id) => {
    if (!window.confirm('Remove this message?')) return;
    const { res, data } = await adminFetch(`/admin/messages/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      setError(data.error || 'Could not delete.');
      return;
    }
    const next = messages.filter((m) => m.id !== id);
    setMessages(next);
    setOpenId(next[0]?.id || null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      if (filter === 'unread' && m.read) return false;
      if (filter === 'read' && !m.read) return false;
      if (!q) return true;
      const blob = `${m.firstName} ${m.lastName} ${m.email} ${m.help} ${m.message}`.toLowerCase();
      return blob.includes(q);
    });
  }, [messages, query, filter]);

  const selected = messages.find((m) => m.id === openId);
  const unread = messages.filter((m) => !m.read).length;
  const readCount = messages.length - unread;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">
            <Inbox size={13} />
            Inbox
          </p>
          <h1 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl text-white md:text-4xl">Messages</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/45">
            Every note from the contact form — name, need, and message — in one place.
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

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total inquiries" value={messages.length} icon={MessageSquare} />
        <StatCard label="Unread" value={unread} icon={Sparkles} accent={unread > 0} />
        <StatCard label="Read" value={readCount} icon={Mail} />
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-[#C96A45]/30 bg-[#C96A45]/10 px-4 py-3 text-sm text-[#E8A090]">
          {error}
        </p>
      )}

      {/* Main panel */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <div className="grid min-h-[520px] lg:grid-cols-5">
          {/* List column */}
          <div className="border-b border-white/8 lg:col-span-2 lg:border-b-0 lg:border-r">
            <div className="border-b border-white/8 p-4">
              <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, email, topic…"
                  className="w-full rounded-lg border border-white/10 bg-[#0A0F0C]/80 py-2.5 pl-9 pr-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-[#C9A259]/45"
                />
              </div>
              <div className="mt-3 flex gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'unread', label: 'Unread' },
                  { key: 'read', label: 'Read' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFilter(tab.key)}
                    className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors ${
                      filter === tab.key
                        ? 'bg-[#C9A259] text-[#14100A]'
                        : 'bg-white/[0.04] text-white/45 hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[420px] overflow-y-auto lg:max-h-[460px]">
              {loading ? (
                <MessageSkeleton />
              ) : filtered.length === 0 ? (
                <EmptyInbox hasMessages={messages.length > 0} />
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {filtered.map((m) => {
                    const active = openId === m.id;
                    return (
                      <li key={m.id}>
                        <button
                          type="button"
                          onClick={() => open(m)}
                          className={`group w-full px-4 py-4 text-left transition-all ${
                            active
                              ? 'bg-gradient-to-r from-[#C9A259]/12 to-transparent'
                              : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="flex gap-3">
                            <div
                              className={`flex size-11 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold ${
                                active
                                  ? 'border-[#C9A259]/50 bg-[#C9A259]/15 text-[#C9A259]'
                                  : 'border-white/10 bg-white/[0.04] text-white/60 group-hover:border-white/20'
                              }`}
                            >
                              {initials(m.firstName, m.lastName)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`truncate text-[14px] ${m.read ? 'text-white/65' : 'font-semibold text-white'}`}>
                                  {m.firstName} {m.lastName}
                                </p>
                                {!m.read && (
                                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#C9A259] shadow-[0_0_8px_rgba(201,162,89,0.8)]" />
                                )}
                              </div>
                              <p className="mt-0.5 truncate text-[11px] font-medium tracking-wide text-[#C9A259]/80 uppercase">
                                {m.help}
                              </p>
                              <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-white/35">
                                {m.message}
                              </p>
                              <p className="mt-2 flex items-center gap-1 text-[10px] text-white/25">
                                <Clock size={10} />
                                {m.date}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Detail column */}
          <div className="lg:col-span-3">
            {!selected ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center px-8 py-16 text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Mail size={28} className="text-[#C9A259]/60" />
                </div>
                <p className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-xl text-white/70">Pick a message</p>
                <p className="mt-2 max-w-xs text-sm text-white/35">
                  Select an inquiry on the left to read the full note and reply by email.
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col">
                <div className="border-b border-white/8 bg-gradient-to-br from-[#C9A259]/08 via-transparent to-transparent p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[#C9A259]/25 bg-[#C9A259]/10 text-[15px] font-bold text-[#C9A259]">
                        {initials(selected.firstName, selected.lastName)}
                      </div>
                      <div>
                        <h2 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-2xl text-white md:text-[1.65rem]">
                          {selected.firstName} {selected.lastName}
                        </h2>
                        <a
                          href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.help)} — Krinova`}
                          className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-[#C9A259] transition-colors hover:text-[#dfc070]"
                        >
                          <Mail size={14} />
                          {selected.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.help)} — Krinova&body=${encodeURIComponent(`Hi ${selected.firstName},\n\nThanks for writing in about ${selected.help}.\n\n`)}`}
                        className="rounded-md bg-[#C9A259] px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-[#14100A] uppercase no-underline transition-colors hover:bg-[#dfc070]"
                      >
                        Reply
                      </a>
                      <button
                        type="button"
                        onClick={() => remove(selected.id)}
                        className="flex items-center gap-1.5 rounded-md border border-[#C96A45]/35 px-3 py-2 text-[11px] font-bold tracking-[0.12em] text-[#C96A45] uppercase transition-colors hover:bg-[#C96A45]/10"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A259]/20 bg-[#C9A259]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#C9A259] uppercase">
                      <Tag size={11} />
                      {selected.help}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/35">
                      <Clock size={12} />
                      {selected.date}
                    </span>
                    {!selected.read && (
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                        New
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8">
                  <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Message</p>
                  <div className="rounded-xl border border-white/8 bg-[#0A0F0C]/60 p-5 md:p-6">
                    <p className="whitespace-pre-line text-[15px] leading-[1.75] text-white/80">
                      {selected.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className={`rounded-xl border p-5 transition-colors ${
      accent ? 'border-[#C9A259]/25 bg-[#C9A259]/08' : 'border-white/8 bg-white/[0.03]'
    }`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">{label}</p>
        <Icon size={16} className={accent ? 'text-[#C9A259]' : 'text-white/25'} />
      </div>
      <p className={`mt-3 font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl ${accent ? 'text-[#C9A259]' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyInbox({ hasMessages }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <Inbox size={32} className="text-white/20" />
      <p className="mt-4 text-sm text-white/45">
        {hasMessages ? 'No messages match your search.' : 'No inquiries yet — they will show up here when someone uses the contact form.'}
      </p>
    </div>
  );
}
