import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Compass } from 'lucide-react';

function Particle({ className, delay, duration, style }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
      transition={{ duration: duration ?? 4, repeat: Infinity, delay: delay ?? 0, ease: 'easeInOut' }}
    />
  );
}

function GlitchText({ text }) {
  return (
    <div className="relative inline-block">
      <span className="block bg-gradient-to-br from-[#C9A259] via-[#f0d898] to-[#C9A259] bg-clip-text text-[clamp(120px,22vw,220px)] leading-none font-black tracking-[-0.04em] text-transparent drop-shadow-[0_0_40px_rgba(201,162,89,0.35)]">
        {text}
      </span>
      <span className="nf-glitch-1 pointer-events-none absolute inset-0 block text-[clamp(120px,22vw,220px)] leading-none font-black tracking-[-0.04em] text-[#ff2d55]/70" aria-hidden="true">
        {text}
      </span>
      <span className="nf-glitch-2 pointer-events-none absolute inset-0 block text-[clamp(120px,22vw,220px)] leading-none font-black tracking-[-0.04em] text-[#0aefff]/70" aria-hidden="true">
        {text}
      </span>
    </div>
  );
}

function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`h${i}`}
          className="absolute right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C9A259] to-transparent"
          style={{ top: `${(i / 12) * 100}%` }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`v${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A259] to-transparent"
          style={{ left: `${(i / 8) * 100}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  const particles = [
    { className: 'size-1.5 bg-[#C9A259]', style: { top: '15%', left: '10%' }, delay: 0, duration: 5 },
    { className: 'size-1 bg-[#C9A259]', style: { top: '30%', left: '80%' }, delay: 0.8, duration: 4 },
    { className: 'size-2 bg-[#A8893F]', style: { top: '60%', left: '5%' }, delay: 1.5, duration: 6 },
    { className: 'size-[5px] bg-[#C9A259]', style: { top: '75%', left: '90%' }, delay: 2, duration: 4.5 },
    { className: 'size-[3px] bg-[#C9A259]', style: { top: '45%', left: '55%' }, delay: 0.4, duration: 3.5 },
    { className: 'size-[7px] bg-[#A8893F]', style: { top: '20%', left: '65%' }, delay: 1.1, duration: 5.5 },
    { className: 'size-1 bg-[#C9A259]', style: { top: '85%', left: '35%' }, delay: 2.3, duration: 4 },
    { className: 'size-[5px] bg-[#C9A259]', style: { top: '10%', left: '45%' }, delay: 0.6, duration: 3.8 },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 pt-20 pb-[60px]">
      <GridLines />

      <div className="nf-pulse-glow pointer-events-none absolute top-[20%] left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,89,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-[10%] -bottom-[10%] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,162,89,0.07)_0%,transparent_65%)]" />

      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="nf-scanline pointer-events-none absolute right-0 left-0 z-[1] h-[3px] bg-gradient-to-r from-transparent via-[#C9A259]/35 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-[2] w-full max-w-[700px] text-center"
      >
        <div className="relative mb-2 inline-block">
          <div className="nf-orbit absolute -inset-[50px] rounded-full border border-[#C9A259]/20">
            <div className="absolute -top-[5px] left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[#C9A259] shadow-[0_0_14px_#C9A259]" />
          </div>
          <div className="nf-orbit-rev absolute -inset-20 rounded-full border border-dashed border-[#C9A259]/10">
            <div className="absolute -right-[5px] -bottom-[5px] size-[7px] rounded-full bg-[#A8893F] shadow-[0_0_10px_rgba(168,137,63,0.9)]" />
          </div>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.15 }}
          >
            <GlitchText text="404" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-1 mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]"
        >
          Page Not Found
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-8 h-px bg-gradient-to-r from-transparent via-[#C9A259]/60 to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4 text-[clamp(22px,4vw,34px)] leading-[1.25] font-bold tracking-[-0.01em] text-white"
        >
          Oops! You've ventured into{' '}
          <span className="bg-gradient-to-br from-[#C9A259] to-[#f0d898] bg-clip-text text-transparent">
            uncharted territory
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-10 max-w-[480px] text-[15px] leading-[1.7] text-white/45"
        >
          The page you're looking for has either been moved, deleted, or never
          existed. Let us guide you back to our digital world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="flex flex-wrap justify-center gap-3.5"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-[#C9A259] bg-[#C9A259] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#0e0c0a] no-underline shadow-[0_0_20px_rgba(201,162,89,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#ddb96a] hover:shadow-[0_0_30px_rgba(201,162,89,0.55)]"
          >
            <Home size={14} />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/15 bg-white/[0.04] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/70 no-underline transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={14} />
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-[52px]"
        >
          <p className="mb-3.5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/25">
            <Compass size={11} className="text-[#C9A259]" />
            Quick Navigation
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { label: 'Home', to: '/' },
              { label: 'About', to: '/about' },
              { label: 'Services', to: '/services' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="rounded-full border border-white/10 bg-white/[0.03] px-[18px] py-[7px] text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 no-underline transition-all hover:border-[#C9A259]/40 hover:bg-[#C9A259]/[0.06] hover:text-[#C9A259]"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
