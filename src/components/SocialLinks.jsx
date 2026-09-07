import { INSTAGRAM_HREF, FACEBOOK_HREF } from '../data/contact';

const SOCIALS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: INSTAGRAM_HREF,
    Icon: IcoInstagram,
    hover:
      'hover:border-transparent hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:text-white hover:shadow-[0_8px_22px_rgba(221,42,123,0.38)]',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: FACEBOOK_HREF,
    Icon: IcoFacebook,
    hover:
      'hover:border-transparent hover:bg-[#1877F2] hover:text-white hover:shadow-[0_8px_22px_rgba(24,119,242,0.38)]',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: '#',
    Icon: IcoTwitter,
    hover:
      'hover:border-transparent hover:bg-[#0f0f0f] hover:text-white hover:shadow-[0_8px_22px_rgba(0,0,0,0.28)]',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: '#',
    Icon: IcoYoutube,
    hover:
      'hover:border-transparent hover:bg-[#FF0000] hover:text-white hover:shadow-[0_8px_22px_rgba(255,0,0,0.32)]',
  },
];

const themes = {
  dark: {
    btn: 'inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/45 no-underline transition-all duration-300',
    icon: 15,
  },
  light: {
    btn: 'inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 no-underline shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5',
    icon: 18,
  },
};

export default function SocialLinks({ theme = 'dark', className = '' }) {
  const t = themes[theme] || themes.dark;

  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {SOCIALS.map(({ id, label, href, Icon, hover }) => (
        <a
          key={id}
          href={href}
          aria-label={label}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          className={`group/social ${t.btn} ${hover}`}
        >
          <Icon size={t.icon} className="transition-transform duration-300 group-hover/social:scale-110" />
        </a>
      ))}
    </div>
  );
}

function IcoInstagram({ size = 15, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IcoFacebook({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IcoTwitter({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IcoYoutube({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
      />
      <polygon fill="currentColor" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
