import { useEffect, useMemo, useState, Children } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Inbox, Sparkles, PenLine, ArrowUpRight, Clock, CheckCircle2, Eye, Image, Grid3X3, Mail, Users, Activity, Globe } from 'lucide-react';
import { adminFetch } from '../../lib/api';
import { adminEmail } from '../../lib/adminAuth';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function timeAgo(value) {
  if (!value) return '';
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function isFreshCreate(createdAt, updatedAt) {
  if (!createdAt || !updatedAt) return true;
  return new Date(updatedAt).getTime() - new Date(createdAt).getTime() < 60_000;
}

function buildActivity({ posts, messages, subscriptions, projects, banners }) {
  const items = [];

  posts.forEach((p) => {
    const created = isFreshCreate(p.createdAt, p.updatedAt);
    items.push({
      id: `blog-${p.id}`,
      at: p.updatedAt || p.createdAt || p.publishedAt,
      title: created ? 'New blog note' : 'Blog note updated',
      desc: p.title,
      meta: p.published ? (p.featured ? 'Published · Featured' : 'Published') : 'Draft',
      link: '/admin/blog',
      icon: FileText,
      tone: p.featured ? 'gold' : 'default',
    });
  });

  projects.forEach((p) => {
    const created = isFreshCreate(p.createdAt, p.updatedAt);
    items.push({
      id: `portfolio-${p.id}`,
      at: p.updatedAt || p.createdAt,
      title: created ? 'New portfolio project' : 'Portfolio updated',
      desc: p.title,
      meta: p.published ? 'Live on site' : 'Draft',
      link: '/admin/portfolio',
      icon: Grid3X3,
    });
  });

  banners.forEach((b) => {
    const created = isFreshCreate(b.createdAt, b.updatedAt);
    items.push({
      id: `banner-${b.id}`,
      at: b.updatedAt || b.createdAt,
      title: created ? 'New hero slide' : 'Hero banner updated',
      desc: b.heading?.replace('\n', ' · ') || b.tagline,
      meta: b.published ? 'On homepage' : 'Draft',
      link: '/admin/banners',
      icon: Image,
    });
  });

  messages.forEach((m) => {
    items.push({
      id: `msg-${m.id}`,
      at: m.createdAt,
      title: 'New contact inquiry',
      desc: `${m.firstName} ${m.lastName} — ${m.help}`,
      meta: m.read ? 'Read' : 'Unread',
      link: '/admin/messages',
      icon: Inbox,
      tone: m.read ? 'default' : 'gold',
    });
  });

  subscriptions.forEach((s) => {
    items.push({
      id: `sub-${s.id}`,
      at: s.createdAt,
      title: 'New newsletter subscriber',
      desc: s.email,
      meta: 'Footer signup',
      link: '/admin/subscriptions',
      icon: Users,
    });
  });

  return items
    .filter((i) => i.at)
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 10);
}

function weekBuckets(items) {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() + mondayOffset);

  const buckets = DAY_LABELS.map((label, i) => {
    const start = new Date(monday);
    start.setDate(monday.getDate() + i);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    const count = items.filter((item) => {
      const t = new Date(item.createdAt);
      return t >= start && t < end;
    }).length;
    return { d: label, v: count };
  });

  const max = Math.max(...buckets.map((b) => b.v), 1);
  return buckets.map((b) => ({ ...b, pct: (b.v / max) * 100 }));
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    Promise.all([
      adminFetch('/admin/blogs'),
      adminFetch('/admin/messages'),
      adminFetch('/admin/subscriptions'),
      adminFetch('/admin/portfolio'),
      adminFetch('/admin/banners'),
    ]).then(([blogsRes, msgsRes, subsRes, portRes, bannerRes]) => {
      if (blogsRes.res.ok) setPosts(blogsRes.data.posts || []);
      if (msgsRes.res.ok) setMessages(msgsRes.data.messages || []);
      if (subsRes.res.ok) setSubscriptions(subsRes.data.subscriptions || []);
      if (portRes.res.ok) setProjects(portRes.data.projects || []);
      if (bannerRes.res.ok) setBanners(bannerRes.data.slides || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;
  const featured = posts.filter((p) => p.featured).length;
  const unread = messages.filter((m) => !m.read).length;
  const bannersLive = banners.filter((b) => b.published).length;
  const bannersDraft = banners.length - bannersLive;
  const projectsLive = projects.filter((p) => p.published).length;
  const projectsDraft = projects.length - projectsLive;
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const subsToday = subscriptions.filter((s) => new Date(s.createdAt) >= today).length;
  const msgsToday = messages.filter((m) => new Date(m.createdAt) >= today).length;
  const week = useMemo(() => weekBuckets(messages), [messages]);
  const weekTotal = week.reduce((n, d) => n + d.v, 0);
  const recentMessages = messages.slice(0, 3);
  const recentSubs = subscriptions.slice(0, 3);
  const liveBanners = banners.filter((b) => b.published).slice(0, 3);
  const activity = useMemo(
    () => buildActivity({ posts, messages, subscriptions, projects, banners }),
    [posts, messages, subscriptions, projects, banners]
  );
  const email = adminEmail();
  const name = email ? email.split('@')[0] : 'there';

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#C9A259]/10 via-white/[0.02] to-transparent p-8 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#C9A259]/10 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">
              <LayoutDashboard size={13} />
              Console
            </p>
            <h1 className="font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl text-white md:text-[2.35rem]">
              {greeting()}, <span className="text-[#C9A259]">{name}.</span>
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/50">
              Full studio overview — blog, portfolio, banners, messages, and newsletter subscribers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-[#C9A259]/40 bg-[#C9A259]/10 px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] text-[#C9A259] uppercase no-underline transition-colors hover:bg-[#C9A259] hover:text-[#14100A]"
            >
              <Globe size={14} />
              View website
            </Link>
            <Link
              to="/admin/blog"
              className="inline-flex items-center gap-2 rounded-md bg-[#C9A259] px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] text-[#14100A] uppercase no-underline transition-colors hover:bg-[#dfc070]"
            >
              <PenLine size={14} />
              New note
            </Link>
            <Link
              to="/admin/messages"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase no-underline transition-colors hover:border-[#C9A259]/40 hover:text-[#C9A259]"
            >
              <Inbox size={14} />
              Inbox
              {unread > 0 && (
                <span className="rounded-full bg-[#C9A259] px-1.5 py-0.5 text-[9px] text-[#14100A]">{unread}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats — Content */}
      <p className="mt-8 text-[10px] font-bold tracking-[0.24em] text-white/30 uppercase">Content</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          to="/admin/blog"
          label="Blog notes"
          value={loading ? '—' : posts.length}
          hint={`${published} live · ${drafts} draft${drafts === 1 ? '' : 's'}`}
          icon={FileText}
          loading={loading}
        />
        <StatCard
          to="/admin/portfolio"
          label="Portfolio"
          value={loading ? '—' : projects.length}
          hint={`${projectsLive} live · ${projectsDraft} draft${projectsDraft === 1 ? '' : 's'}`}
          icon={Grid3X3}
          loading={loading}
        />
        <StatCard
          to="/admin/banners"
          label="Hero banners"
          value={loading ? '—' : banners.length}
          hint={`${bannersLive} on homepage · ${bannersDraft} draft${bannersDraft === 1 ? '' : 's'}`}
          icon={Image}
          accent={bannersLive > 0}
          loading={loading}
        />
      </div>

      {/* Stats — Inbox */}
      <p className="mt-6 text-[10px] font-bold tracking-[0.24em] text-white/30 uppercase">Inbox</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          to="/admin/messages"
          label="Messages"
          value={loading ? '—' : messages.length}
          hint={`${msgsToday} today · ${weekTotal} this week`}
          icon={Inbox}
          loading={loading}
        />
        <StatCard
          to="/admin/messages"
          label="Unread"
          value={loading ? '—' : unread}
          hint={unread ? 'Needs a reply' : 'All caught up'}
          icon={unread ? Sparkles : CheckCircle2}
          accent={unread > 0}
          loading={loading}
        />
        <StatCard
          to="/admin/subscriptions"
          label="Subscribers"
          value={loading ? '—' : subscriptions.length}
          hint={subsToday ? `${subsToday} joined today` : 'Footer newsletter signups'}
          icon={Users}
          accent={subsToday > 0}
          loading={loading}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Recent activity */}
        <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-6 py-5">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-[#C9A259] uppercase">
                <Activity size={13} />
                Recent updates
              </p>
              <p className="mt-1 text-sm text-white/40">Blog, portfolio, banners, messages & subscribers</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/50">
              {loading ? '…' : `${activity.length} shown`}
            </span>
          </div>

          {loading ? (
            <div className="divide-y divide-white/[0.06]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse px-6 py-4">
                  <div className="flex gap-4">
                    <div className="size-10 shrink-0 rounded-xl bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 rounded bg-white/10" />
                      <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <p className="px-6 py-14 text-center text-sm text-white/40">
              No updates yet. Changes you make in the console will show up here.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {activity.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="group flex items-start gap-4 px-6 py-4 no-underline transition-colors hover:bg-white/[0.03]"
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        item.tone === 'gold'
                          ? 'border-[#C9A259]/30 bg-[#C9A259]/10 text-[#C9A259]'
                          : 'border-white/10 bg-white/[0.04] text-white/45 group-hover:border-[#C9A259]/25 group-hover:text-[#C9A259]'
                      }`}
                    >
                      <item.icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[13px] font-semibold text-white/90">{item.title}</p>
                        {item.meta && (
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9px] font-bold tracking-widest text-white/40 uppercase">
                            {item.meta}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[12.5px] text-white/45">{item.desc}</p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1 text-[11px] text-white/30 sm:flex">
                      <Clock size={11} />
                      {timeAgo(item.at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2 space-y-4">
          <QuickLink to="/admin/blog" title="Blog" desc={`${posts.length} notes · ${featured} featured`} icon={FileText} />
          <QuickLink to="/admin/portfolio" title="Portfolio" desc={`${projectsLive} live project${projectsLive === 1 ? '' : 's'} on site.`} icon={Grid3X3} />
          <QuickLink to="/admin/banners" title="Banners" desc={`${bannersLive} slide${bannersLive === 1 ? '' : 's'} on homepage carousel.`} icon={Image} />
          <QuickLink
            to="/admin/messages"
            title="Messages"
            desc={unread ? `${unread} unread — open the inbox.` : 'Review contact form submissions.'}
            icon={Inbox}
            badge={unread || null}
          />
          <QuickLink
            to="/admin/subscriptions"
            title="Subscribers"
            desc={`${subscriptions.length} email${subscriptions.length === 1 ? '' : 's'} from footer signup.`}
            icon={Mail}
            badge={subsToday || null}
          />
        </div>
      </div>

      {/* Overview snapshots */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <OverviewPanel
          title="Hero banners"
          subtitle="Homepage carousel"
          to="/admin/banners"
          loading={loading}
          empty="No banners yet. Add slides from the Banners section."
        >
          {liveBanners.map((b) => (
            <OverviewRow
              key={b.id}
              primary={b.heading?.replace('\n', ' · ') || b.tagline}
              secondary={b.tagline}
              badge="Live"
              badgeTone="live"
            />
          ))}
        </OverviewPanel>

        <OverviewPanel
          title="Messages"
          subtitle="Contact form inquiries"
          to="/admin/messages"
          loading={loading}
          empty="No messages yet. They appear when someone uses the contact form."
        >
          {recentMessages.map((m) => (
            <OverviewRow
              key={m.id}
              primary={`${m.firstName} ${m.lastName}`}
              secondary={m.help}
              badge={m.read ? 'Read' : 'New'}
              badgeTone={m.read ? 'muted' : 'gold'}
            />
          ))}
        </OverviewPanel>

        <OverviewPanel
          title="Subscribers"
          subtitle="Footer newsletter signups"
          to="/admin/subscriptions"
          loading={loading}
          empty="No subscribers yet. Emails appear from the footer form."
        >
          {recentSubs.map((s) => (
            <OverviewRow
              key={s.id}
              primary={s.email}
              secondary={s.date}
              badge="Subscribed"
              badgeTone="live"
            />
          ))}
        </OverviewPanel>
      </div>

      {/* Published notes strip */}
      {!loading && posts.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#C9A259] uppercase">Live on /blog</p>
            <Link to="/admin/blog" className="text-[11px] font-bold tracking-widest text-white/40 uppercase no-underline hover:text-[#C9A259]">
              Manage
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {posts.filter((p) => p.published).slice(0, 3).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-[#0A0F0C]/40 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[14px] text-white/80">{p.title}</p>
                  <p className="mt-0.5 text-[11px] text-white/35">{p.category}{p.featured ? ' · Featured' : ''}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold tracking-widest text-emerald-400/80 uppercase">
                  <Eye size={11} />
                  Live
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

function StatCard({ to, label, value, hint, icon: Icon, accent, loading }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">{label}</p>
        <Icon size={16} className={accent ? 'text-[#C9A259]' : 'text-white/25'} />
      </div>
      <p className={`mt-3 font-[Iowan_Old_Style,Palatino,Georgia,serif] text-3xl ${loading ? 'text-white/30' : accent ? 'text-[#C9A259]' : 'text-white'}`}>
        {value}
      </p>
      {hint && <p className="mt-2 text-[12px] text-white/35">{hint}</p>}
    </>
  );

  const className = `block rounded-xl border p-5 no-underline transition-all ${
    accent ? 'border-[#C9A259]/25 bg-[#C9A259]/08 hover:border-[#C9A259]/40' : 'border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]'
  }`;

  if (to) {
    return <Link to={to} className={className}>{inner}</Link>;
  }
  return <div className={className}>{inner}</div>;
}

function OverviewPanel({ title, subtitle, to, loading, empty, children }) {
  const hasItems = Children.count(children) > 0;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#C9A259] uppercase">{title}</p>
          <p className="mt-0.5 text-[12px] text-white/40">{subtitle}</p>
        </div>
        <Link to={to} className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-white/40 uppercase no-underline hover:text-[#C9A259]">
          Manage <ArrowUpRight size={12} />
        </Link>
      </div>
      {loading ? (
        <div className="space-y-3 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg bg-white/[0.04] p-3">
              <div className="h-3 w-2/3 rounded bg-white/10" />
              <div className="mt-2 h-2 w-1/2 rounded bg-white/[0.06]" />
            </div>
          ))}
        </div>
      ) : !hasItems ? (
        <p className="px-5 py-8 text-center text-[12.5px] leading-relaxed text-white/35">{empty}</p>
      ) : (
        <ul className="divide-y divide-white/[0.06] p-2">{children}</ul>
      )}
    </div>
  );
}

function OverviewRow({ primary, secondary, badge, badgeTone }) {
  const badgeClass =
    badgeTone === 'gold'
      ? 'border-[#C9A259]/30 bg-[#C9A259]/10 text-[#C9A259]'
      : badgeTone === 'live'
        ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400/90'
        : 'border-white/10 bg-white/[0.03] text-white/40';

  return (
    <li className="rounded-lg px-3 py-3 transition-colors hover:bg-white/[0.03]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-white/85">{primary}</p>
          {secondary && <p className="mt-0.5 truncate text-[11px] text-white/35">{secondary}</p>}
        </div>
        {badge && (
          <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase ${badgeClass}`}>
            {badge}
          </span>
        )}
      </div>
    </li>
  );
}

function QuickLink({ to, title, desc, icon: Icon, badge }) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 no-underline transition-all hover:border-[#C9A259]/30 hover:bg-[#C9A259]/05"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#C9A259] transition-colors group-hover:border-[#C9A259]/30 group-hover:bg-[#C9A259]/10">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold text-white">{title}</p>
          {badge ? (
            <span className="rounded-full bg-[#C9A259] px-2 py-0.5 text-[9px] font-bold text-[#14100A]">{badge}</span>
          ) : null}
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-white/40">{desc}</p>
      </div>
      <ArrowUpRight size={16} className="mt-1 shrink-0 text-white/20 transition-colors group-hover:text-[#C9A259]" />
    </Link>
  );
}
