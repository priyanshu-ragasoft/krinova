import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/services' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'About Us', to: '/about' },
  { name: 'Careers', to: '/careers' },
  { name: 'Contact Us', to: '/contact' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const slideIn = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[200] w-full pointer-events-auto border-0 shadow-none transition-[background,backdrop-filter] duration-500 ${
          scrolled
            ? 'bg-[#0e0c0a]/95 backdrop-blur-[18px]'
            : 'bg-gradient-to-b from-black/55 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 md:h-[88px] md:px-8">
          <BrandLogo size="lg" />

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ name, to }) => {
              const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.14em] no-underline transition-colors duration-250 ${
                    isActive ? 'text-[#C9A259]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute bottom-0.5 left-1/2 block h-[1.5px] w-[18px] -translate-x-1/2 rounded-sm bg-[#C9A259] shadow-[0_0_6px_rgba(201,162,89,0.7)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="mx-2 h-[18px] w-px bg-white/15" />

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#C9A259]/60 bg-[#C9A259]/[0.06] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C9A259] no-underline transition-all duration-300 hover:border-[#C9A259] hover:bg-[#C9A259] hover:text-[#0e0c0a] hover:shadow-[0_4px_20px_rgba(201,162,89,0.4)]"
            >
              <ArrowUpRight size={12} />
              Free Consultation
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="relative z-[1] flex size-10 items-center justify-center rounded-md border border-white/20 bg-white/[0.06] text-white lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[210] bg-black/75 backdrop-blur-[4px]"
            />

            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-[220] flex h-dvh w-full flex-col bg-[#0e0c0a] md:inset-auto md:top-0 md:right-0 md:h-full md:w-[min(85vw,320px)] md:border-l md:border-[#C9A259]/20"
            >
              <div className="pointer-events-none absolute top-0 right-0 size-[200px] bg-[radial-gradient(circle_at_top_right,rgba(201,162,89,0.12),transparent_70%)]" />

              <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.07] px-4">
                <BrandLogo size="sm" asLink={false} />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/70"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.nav
                variants={stagger}
                initial="hidden"
                animate="show"
                className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 py-5"
              >
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A259]/70">
                  Menu
                </p>

                {navLinks.map(({ name, to }) => {
                  const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to);
                  return (
                    <motion.div key={to} variants={slideIn}>
                      <Link
                        to={to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] no-underline ${
                          isActive
                            ? 'bg-[#C9A259]/12 text-[#C9A259]'
                            : 'text-white/70'
                        }`}
                      >
                        {name}
                        {isActive && <span className="size-1.5 rounded-full bg-[#C9A259]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="border-t border-white/[0.07] p-5"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#C9A259] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e0c0a] no-underline transition-all hover:bg-[#dfc070] hover:shadow-[0_4px_20px_rgba(201,162,89,0.4)]"
                >
                  <ArrowUpRight size={14} />
                  Free Consultation
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
