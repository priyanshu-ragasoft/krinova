import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUpRight, Send } from 'lucide-react';
import BrandLogo from './BrandLogo';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const links = {
  Services: [
    { label: 'Brand Intelligence', to: '/services#brand-intelligence' },
    { label: 'Identity Studio', to: '/services#identity-studio' },
    { label: 'Digital Experience', to: '/services#digital-experience' },
    { label: 'AI Growth', to: '/services#ai-growth' },
    { label: 'Search Everywhere', to: '/services#search-everywhere' },
    { label: 'Performance Lab', to: '/services#performance-lab' },
    { label: 'All Services', to: '/services' }],

  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ],
};

const IcoInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IcoFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IcoTwitter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IcoYoutube = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#07060a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const socials = [
  { Icon: IcoInstagram, label: 'Instagram', href: '#' },
  { Icon: IcoFacebook, label: 'Facebook', href: '#' },
  { Icon: IcoTwitter, label: 'Twitter', href: '#' },
  { Icon: IcoYoutube, label: 'YouTube', href: '#' },
];

const contact = [
  { Icon: Phone, text: '+91 73475 35399' },
  { Icon: Mail, text: 'contact@krinova.com' },
  { Icon: MapPin, text: 'Cosmo Mall, Zirakpur' },
];

const colTitle = 'mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A259]/70';

function GoldDivider({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-px origin-left bg-gradient-to-r from-transparent via-[#C9A259]/55 to-transparent"
    />
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      whileHover={{ borderColor: '#C9A259', boxShadow: '0 0 22px rgba(201,162,89,0.45)' }}
      whileTap={{ scale: 0.92 }}
      className={`fixed bottom-8 left-8 z-[999] flex size-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#C9A259]/45 bg-[#12100e]/90 text-[#C9A259] backdrop-blur-[14px] ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </motion.button>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer className="relative z-20 overflow-hidden bg-[#07060a] pointer-events-auto">
      <div className="pointer-events-none absolute top-0 left-[15%] h-[300px] w-[500px] bg-[radial-gradient(ellipse,rgba(201,162,89,0.07)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute right-[10%] bottom-0 h-[300px] w-[400px] bg-[radial-gradient(ellipse,rgba(201,162,89,0.05)_0%,transparent_65%)]" />

      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-7 px-8 py-[60px]">
          <div>
            <motion.p
              ref={ref}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={0}
              className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]"
            >
              Zirakpur · Cosmo Mall
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              custom={0.1}
              className="m-0 text-[clamp(24px,4vw,38px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
            >
              Got a brief?{' '}
              <span className="bg-gradient-to-br from-[#C9A259] to-[#f0d898] bg-clip-text text-transparent">
                Send it.
              </span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-[#C9A259] bg-[#C9A259] px-8 py-[15px] text-xs font-bold uppercase tracking-[0.18em] text-[#0e0c0a] no-underline shadow-[0_0_24px_rgba(201,162,89,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[#C9A259] hover:shadow-[0_0_36px_rgba(201,162,89,0.35)]"
            >
              <ArrowUpRight size={13} />
              Get Free Consultation
              <ArrowUpRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-10 gap-y-12 px-8 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.05}>
          <div className="mb-5 origin-left scale-[1.8]">
            <BrandLogo size="lg" />
          </div>
          <p className="mb-7 max-w-[240px] text-[13.5px] leading-[1.75] text-white/40">
            Brand, search, ads, and sites — from Cosmo Mall, Zirakpur. Same two founders you’ll meet on day one.
          </p>
          <div className="flex gap-2.5">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/45 no-underline transition-all hover:border-[#C9A259]/50 hover:bg-[#C9A259]/10 hover:text-[#C9A259]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {Object.entries(links).map(([title, items], ci) => (
          <motion.div
            key={title}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={0.1 + ci * 0.08}
          >
            <p className={colTitle}>{title}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {items.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/45 no-underline transition-colors hover:text-[#C9A259]"
                  >
                    <span className="inline-block h-px w-[5px] shrink-0 bg-[#C9A259]/50 transition-all group-hover:w-3 group-hover:bg-[#C9A259]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.28}>
          <p className={colTitle}>Get In Touch</p>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {contact.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[7px] border border-[#C9A259]/25 bg-[#C9A259]/[0.07] text-[#C9A259]">
                  <Icon size={13} />
                </span>
                <span className="text-[13px] text-white/45">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.36}>
          <p className={colTitle}>Stay Updated</p>
          <p className="mb-4 text-[12.5px] leading-[1.6] text-white/40">
            Get the latest digital marketing trends and insights delivered to your inbox.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              required
              data-cursor-text="Type"
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[13px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#C9A259]"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              data-cursor-text="Subscribe"
              className="flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-[#C9A259] text-[#0e0c0a] transition-all hover:-translate-y-0.5 hover:bg-[#dfc070]"
            >
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1280px] px-8">
        <GoldDivider delay={0.1} />
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-8 py-6">
        <p className="m-0 text-xs text-white/20">
          © {new Date().getFullYear()} Krinova. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Use'].map((t) => (
            <Link key={t} to="/" className="text-xs text-white/20 no-underline transition-colors hover:text-[#C9A259]/80">
              {t}
            </Link>
          ))}
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
