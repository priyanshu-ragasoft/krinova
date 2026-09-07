import { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { adminEmail, logoutAdmin } from '../../lib/adminAuth';
import BrandLogo from '../../components/BrandLogo';
import PageTitle from '../../components/PageTitle';

const NAV_ITEMS = [
  { label: 'Overview', to: '/admin', icon: IconHome, end: true },
  { label: 'Blog', to: '/admin/blog', icon: IconLayers },
  { label: 'Portfolio', to: '/admin/portfolio', icon: IconGrid },
  { label: 'Banners', to: '/admin/banners', icon: IconImage },
  { label: 'Messages', to: '/admin/messages', icon: IconMail },
  { label: 'Subscribers', to: '/admin/subscriptions', icon: IconUsers },
  { label: 'Settings', to: '/admin/settings', icon: IconSettings },
];

const PAGE_TITLES = {
  '/admin': 'Overview',
  '/admin/blog': 'Blog',
  '/admin/portfolio': 'Portfolio',
  '/admin/banners': 'Banners',
  '/admin/messages': 'Messages',
  '/admin/subscriptions': 'Subscribers',
  '/admin/settings': 'Settings',
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = adminEmail();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pageTitle = PAGE_TITLES[location.pathname] || 'Console';
  const initial = (email || 'A').charAt(0).toUpperCase();

  const signOut = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0A0F0C] text-[#F1F3F1]">
      <PageTitle title="Console — Krinova" description="Krinova studio console." />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileNavOpen(false)} />
      )}

      <Sidebar email={email} signOut={signOut} mobileNavOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0A0F0C]/95 backdrop-blur-md">
          <div className="flex min-h-[72px] items-center justify-between gap-4 px-6 py-4 md:min-h-[80px] md:px-10">
            <div className="flex min-w-0 items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="rounded-lg border border-white/10 p-2.5 text-white/60 hover:border-white/20 hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <IconMenu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.22em] text-[#C9A259] uppercase">Studio console</p>
                <h2 className="truncate font-[Iowan_Old_Style,Palatino,Georgia,serif] text-xl text-white md:text-2xl">
                  {pageTitle}
                </h2>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg border border-[#C9A259]/45 bg-[#C9A259]/10 px-3.5 py-2.5 text-[11px] font-bold tracking-[0.1em] text-[#C9A259] uppercase no-underline transition-all hover:border-[#C9A259] hover:bg-[#C9A259] hover:text-[#14100A] md:px-4"
              >
                <IconGlobe className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">View website</span>
                <span className="sm:hidden">Website</span>
              </Link>
              <div className="flex size-10 items-center justify-center rounded-full border border-[#C9A259]/35 bg-[#C9A259]/10 text-sm font-bold text-[#C9A259] lg:hidden">
                {initial}
              </div>
            </div>
          </div>
        </header>
        <Outlet />

        <Link
          to="/"
          className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#C9A259]/40 bg-[#0A0F0C]/95 px-4 py-3 text-[11px] font-bold tracking-[0.1em] text-[#C9A259] uppercase no-underline shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:border-[#C9A259] hover:bg-[#C9A259] hover:text-[#14100A] hover:shadow-[0_8px_36px_rgba(201,162,89,0.35)]"
          aria-label="Go to website homepage"
        >
          <IconGlobe className="h-4 w-4" />
          <span className="hidden sm:inline">View website</span>
        </Link>
      </div>
    </div>
  );
}

function Sidebar({ email, signOut, mobileNavOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/8 bg-[#0A0F0C] transition-transform duration-200 lg:translate-x-0 ${
        mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <Link to="/" className="no-underline transition-opacity hover:opacity-90" title="Go to website">
          <BrandLogo size="sm" asLink={false} />
        </Link>
        <button type="button" onClick={onClose} className="text-white/40 hover:text-white lg:hidden" aria-label="Close menu">
          <IconX className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] transition-colors ${
                isActive ? 'bg-[#C9A259]/10 text-[#C9A259]' : 'text-white/55 hover:bg-white/[0.04] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-4 w-4 ${isActive ? 'text-[#C9A259]' : 'text-white/35 group-hover:text-white/70'}`} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/8 px-3 py-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A259]/30 text-[11px] font-semibold text-[#C9A259]">
            {(email || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] text-white/80">{email || 'admin'}</p>
            <p className="text-[11px] text-white/35">Studio admin</p>
          </div>
        </div>
        <Link
          to="/"
          onClick={onClose}
          className="mt-2 flex w-full items-center gap-2.5 rounded-lg border border-[#C9A259]/25 bg-[#C9A259]/[0.06] px-3 py-2.5 text-[13px] font-medium text-[#C9A259] no-underline transition-colors hover:bg-[#C9A259]/12"
        >
          <IconGlobe className="h-4 w-4" />
          View website
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="mt-1.5 flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] text-white/50 hover:bg-white/[0.04] hover:text-white"
        >
          <IconLogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

function IconHome(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}
function IconLayers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 13 9 5 9-5" />
    </svg>
  );
}
function IconImage(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 17-5.5-5.5L9 18" />
    </svg>
  );
}
function IconGrid(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}
function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 19c.7-3 3-4.8 5.5-4.8s4.8 1.8 5.5 4.8" />
    </svg>
  );
}
function IconSettings(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}
function IconGlobe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}
function IconLogOut(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}
function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
