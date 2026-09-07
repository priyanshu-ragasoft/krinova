import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { publicFetch, assetUrl } from '../lib/api';

const FALLBACK_SLIDES = [
  {
    tagline: 'BUILD. DIFFERENTIATE. GROW.',
    heading: 'We build brands.\nThen we grow them.',
    sub: 'Strategy, design, ads, and content — one team in Zirakpur, working with you like an in-house crew, not a distant agency.',
    cta: { label: 'See what we do', to: '/services' },
    image: '/banner.png',
  },
  {
    tagline: 'SHOW UP WHERE PEOPLE LOOK',
    heading: 'Google. ChatGPT.\nAnd everything in between.',
    sub: 'If someone asks a question your brand should answer, we want your name in the reply — search, maps, and AI tools included.',
    cta: { label: 'See our work', to: '/portfolio' },
    image: '/banner1.png',
  },
  {
    tagline: 'STRAIGHT TALK',
    heading: 'Less noise.\nMore customers.',
    sub: 'We care about calls, orders, and pipeline. Likes are nice. They are not the job.',
    cta: { label: 'Talk to us', to: '/contact' },
    image: '/banner2.png',
  },
];

function slideImage(url) {
  if (!url) return '';
  if (url.startsWith('/uploads')) return assetUrl(url);
  return url;
}

function AnimatedHeading({ text }) {
  const lines = text.split('\n');
  return (
    <h1 className="m-0 p-0 leading-[1.08]">
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.72, delay: 0.1 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function HeroBanner() {
  const ref = useRef(null);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  useEffect(() => {
    publicFetch('/banners').then(({ res, data }) => {
      if (res.ok && data.slides?.length) setSlides(data.slides);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setActive((a) => (slides.length ? a % slides.length : 0));
  }, [slides.length]);

  useEffect(() => {
    if (!auto || slides.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [auto, slides.length]);

  const goTo = (i) => { setActive(i); setAuto(false); };
  const slide = slides[active];
  if (!slide) return null;

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#050505]"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-[20%] -bottom-[20%] z-0 will-change-transform"
        style={{ y: imgY }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image + active}
            src={slideImage(slide.image)}
            fetchPriority={active === 0 ? 'high' : 'low'}
            loading={active === 0 ? 'eager' : 'lazy'}
            decoding="async"
            alt="Krinova digital marketing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 block size-full object-cover object-center"
          />
        </AnimatePresence>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.52)_38%,rgba(0,0,0,0.18)_62%,transparent_88%),linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,transparent_28%,transparent_62%,rgba(0,0,0,0.7)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[2] flex max-w-[780px] flex-col items-start justify-start px-[clamp(24px,8vw,120px)] pt-[clamp(120px,18vh,200px)] pb-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="w-full pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex items-center gap-2"
            >
              <span className="inline-block h-px w-7 bg-[#C9A259]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
                {slide.tagline}
              </span>
            </motion.div>

            <div className="mb-[22px] text-[clamp(2.4rem,5.5vw,5rem)] font-extrabold tracking-[-0.02em] text-white [text-shadow:0_8px_28px_rgba(0,0,0,0.55)]">
              <AnimatedHeading key={active} text={slide.heading} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mb-9 max-w-[440px] text-[clamp(15px,1.6vw,18px)] leading-[1.65] text-white/90 [text-shadow:0_4px_18px_rgba(0,0,0,0.7)]"
            >
              {slide.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3.5"
            >
              <Link
                to={slide.cta.to}
                className="inline-flex items-center gap-2 rounded-md bg-[#C9A259] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white no-underline shadow-[0_4px_20px_rgba(201,162,89,0.38)] transition-all hover:-translate-y-px hover:bg-[#A8893F] hover:shadow-[0_8px_28px_rgba(201,162,89,0.5)]"
              >
                {slide.cta.label}
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-md border border-white/30 bg-white/5 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 no-underline backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 hover:text-white"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 md:flex"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">Scroll</span>
        <div className="flex size-[38px] items-center justify-center rounded-full border border-white/30 bg-white/[0.06] backdrop-blur-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2.5 8l4.5 4.5L11.5 8" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-5 z-[2] flex items-center gap-2 md:right-[clamp(24px,6vw,80px)] md:bottom-[42px] md:left-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
            >
              <motion.span
                animate={{
                  width: i === active ? 24 : 8,
                  background: i === active ? '#C9A259' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block h-2 rounded"
              />
            </button>
          ))}
        </div>
      )}

      {auto && slides.length > 1 && (
        <motion.div
          key={active}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5.5, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-[#C9A259] to-[#F5D78E]"
        />
      )}
    </section>
  );
}
