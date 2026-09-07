import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUpRight, Send, MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import SocialLinks from './SocialLinks';
import { PHONES, WA_DISPLAY, WA_HREF, EMAIL } from '../data/contact';
import { publicFetch } from '../lib/api';

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

const contact = [
  { Icon: Phone, phones: PHONES },
  { Icon: MessageCircle, text: WA_DISPLAY, href: WA_HREF },
  { Icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
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
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle');
  const [subMessage, setSubMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (subStatus === 'loading') return;
    setSubStatus('loading');
    setSubMessage('');
    const { res, data } = await publicFetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setSubStatus('success');
      setSubMessage('You’re subscribed. Thank you!');
      setEmail('');
      return;
    }
    setSubStatus('error');
    setSubMessage(data.error || 'Could not subscribe. Try again.');
  };

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
              Got a brief ?{' '}
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
          <div className="mb-5 w-fit">
            <BrandLogo size="lg" />
          </div>
          <p className="mb-7 max-w-[240px] text-[13.5px] leading-[1.75] text-white/40">
            Brand, search, ads, and sites — from Cosmo Mall, Zirakpur. Same two founders you’ll meet on day one.
          </p>
          <SocialLinks theme="dark" />
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
                    to={to.includes('#') ? { pathname: to.split('#')[0], hash: to.split('#')[1] } : to}
                    className="relative z-[1] group inline-flex items-center gap-1.5 text-[13.5px] text-white/45 no-underline transition-colors hover:text-[#C9A259]"
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
            {contact.map(({ Icon, text, href, phones }) => (
              <li key={phones ? 'phones' : text} className="flex items-start gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[7px] border border-[#C9A259]/25 bg-[#C9A259]/[0.07] text-[#C9A259]">
                  <Icon size={13} />
                </span>
                {phones ? (
                  <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13px] leading-snug text-white/45">
                    {phones.map((phone, i) => (
                      <React.Fragment key={phone.href}>
                        {i > 0 && <span className="shrink-0 text-white/25"></span>}
                        <a href={phone.href} className="whitespace-nowrap text-white/45 no-underline hover:text-[#C9A259]">
                          {phone.display}
                        </a>
                      </React.Fragment>
                    ))}
                  </span>
                ) : href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-[13px] text-white/45 no-underline hover:text-[#C9A259]">
                    {text}
                  </a>
                ) : (
                  <span className="text-[13px] text-white/45">{text}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={0.36}>
          <p className={colTitle}>Stay Updated</p>
          <p className="mb-4 text-[12.5px] leading-[1.6] text-white/40">
            Get the latest digital marketing trends and insights delivered to your inbox.
          </p>
          <form className="flex flex-col gap-2" onSubmit={subscribe}>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subStatus !== 'idle') setSubStatus('idle');
                }}
                placeholder="Your email address"
                required
                disabled={subStatus === 'loading'}
                data-cursor-text="Type"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[13px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#C9A259] disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={subStatus === 'loading'}
                data-cursor-text="Subscribe"
                className="flex size-[42px] shrink-0 items-center justify-center rounded-lg bg-[#C9A259] text-[#0e0c0a] transition-all hover:-translate-y-0.5 hover:bg-[#dfc070] disabled:opacity-60"
              >
                <Send size={16} />
              </button>
            </div>
            {subMessage && (
              <p className={`text-[11.5px] ${subStatus === 'success' ? 'text-[#C9A259]' : 'text-[#C96A45]'}`}>
                {subMessage}
              </p>
            )}
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
