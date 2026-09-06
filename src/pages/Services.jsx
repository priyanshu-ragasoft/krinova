import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Palette, Globe, Bot, Search, TrendingUp, Clapperboard, Hexagon, Workflow, BarChart3, Star, MessageCircle } from 'lucide-react';
import { AnimatedCounter } from '../components/SharedCorporateUI';
import { divisions, MANIFESTO, SIGNATURE_LINE } from '../data/divisions';

/* ── Constants ── */
const NAVY = '#0B1F3A';
const GOLD = '#C6A15B';

const iconMap = { Brain, Palette, Globe, Bot, Search, TrendingUp, Clapperboard, Hexagon, Workflow, BarChart3, Star, MessageCircle };

const services = divisions.map((d) => ({
  ...d,
  icon: iconMap[d.icon],
  desc: d.pitch,
}));

const processSteps = [
  { step: '01', title: 'Listen', desc: 'We ask what you sell, who buys, and what’s already failed.' },
  { step: '02', title: 'Decide', desc: 'We pick two or three things for this quarter. Not twelve.' },
  { step: '03', title: 'Make', desc: 'Brand, site, ads, or film — whatever that plan actually needs.' },
  { step: '04', title: 'Launch', desc: 'We go live together. You see the same numbers we see.' },
  { step: '05', title: 'Tune', desc: 'Keep what pays. Stop what doesn’t. Then we do the next bit.' },
];

/* ── Removed Shared 3D Components ── */

/* ── Removed Shared Helpers ── */

/* ── UI Sections ── */

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-[#F7F8FA] overflow-hidden flex items-center pt-24">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-[#0B1F3A] leading-[1.1] tracking-tight mb-6 font-serif">
            The work we do, <span className="text-[#C6A15B]">named clearly.</span>
          </h1>
          <p className="text-[#C6A15B] text-xs font-bold tracking-[0.22em] uppercase mb-4">Brand · Search · Ads · Content</p>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
            Twelve desks under one roof — from how you name the company to the review you leave after a sale. Pick what you need. We’ll say if you don’t need the rest.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_4px_14px_0_rgba(11,31,58,0.39)] hover:shadow-[0_6px_20px_rgba(11,31,58,0.23)] hover:-translate-y-1 transition-all duration-300">
              View Our Services
            </button>
            <Link to="/contact" className="px-8 py-4 border border-[#0B1F3A] text-[#0B1F3A] font-semibold text-sm tracking-widest uppercase hover:bg-[#0B1F3A] hover:text-white transition-colors duration-300">
              Book a Consultation
            </Link>
          </div>
        </motion.div>

        <div className="h-[400px] lg:h-[600px] w-full relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full rounded-tl-[120px] rounded-br-[120px] rounded-tr-[24px] rounded-bl-[24px] overflow-hidden shadow-[0_20px_50px_rgba(11,31,58,0.1)] relative"
          >
            <div className="absolute inset-0 bg-[#0B1F3A]/10 mix-blend-multiply z-10" />
            <img 
              src="/service.png" 
              alt="Strategic Growth"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustMarquee() {
  const industries = ["FINANCE", "TECHNOLOGY", "HEALTHCARE", "E-COMMERCE", "SAAS", "REAL ESTATE", "B2B CONSULTING", "CONSUMER GOODS"];
  return (
    <div className="w-full bg-[#0B1F3A] py-4 overflow-hidden flex border-y border-[#C6A15B]/30">
      <motion.div 
        animate={{ x: [0, -1035] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex whitespace-nowrap items-center group cursor-default"
      >
        {[...industries, ...industries, ...industries].map((ind, i) => (
          <div key={i} className="flex items-center group-hover:opacity-75 transition-opacity">
            <span className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] px-8">{ind}</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TiltCard({ service }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max tilt ~8 degrees
    const tiltX = ((y - centerY) / centerY) * -4;
    const tiltY = ((x - centerX) / centerX) * 4;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      id={service.id}
      className="scroll-mt-28"
      style={{ perspective: 1000 }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#0B1F3A] p-8 aspect-square flex flex-col rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(11,31,58,0.25)] transition-all duration-300 ease-out group"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.18s ease-out' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-tl-[60px] rounded-br-[60px] rounded-tr-2xl rounded-bl-2xl">
          <img 
            src={service.image} 
            alt={service.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Subtle dark overlay to ensure text is readable without ruining image colors */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center mb-6 rounded-lg group-hover:bg-[#C6A15B] group-hover:border-[#C6A15B] transition-colors duration-300" style={{ transform: 'translateZ(20px)' }}>
            <service.icon size={24} className="text-white group-hover:text-[#0B1F3A]" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#C6A15B] mb-2 [text-shadow:_0_1px_6px_rgb(0_0_0_/_80%)]">
            {service.signature}
          </p>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_100%)] group-hover:text-[#C6A15B] transition-all duration-300" style={{ transform: 'translateZ(25px)' }}>
            {service.title}
          </h3>
          <p className="text-sm text-white/90 font-medium leading-relaxed [text-shadow:_0_1px_5px_rgb(0_0_0_/_100%)] group-hover:text-white transition-colors duration-300 mb-3" style={{ transform: 'translateZ(10px)' }}>
            {service.desc}
          </p>
          <p className="text-[11px] text-white/70 leading-relaxed [text-shadow:_0_1px_5px_rgb(0_0_0_/_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {service.offerings.slice(0, 5).join(' · ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesGrid() {
  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">The menu</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-6 leading-tight">
            Hover a card. That’s the real list.
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Brand, identity, websites, search, ads, video, Web3, automation, and reporting. Same team. You don’t get a different vendor for each line.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <TiltCard key={svc.id} service={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end center"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section className="py-32 px-6 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="mb-20 text-center">
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Process</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A]">How a project usually goes</h3>
        </div>

        <div className="relative">
          {/* SVG Line Background */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -translate-y-1/2 hidden md:block" />
          
          {/* Animated SVG Line */}
          <svg className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden md:block overflow-visible" preserveAspectRatio="none">
            <motion.line 
              x1="0" y1="50%" x2="100%" y2="50%" 
              stroke="#C6A15B" strokeWidth="2" strokeDasharray="1 1"
              style={{ pathLength }} 
            />
          </svg>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-12 md:gap-4">
            {processSteps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center max-w-[200px] mx-auto bg-white p-4"
              >
                <div className="w-10 h-10 rounded-full border border-[#0B1F3A] bg-white text-[#0B1F3A] flex items-center justify-center text-xs font-bold mb-6">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-[#0B1F3A] mb-2">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: 180, suffix: "+", label: "Campaigns Delivered" },
    { value: 12, suffix: "M+", label: "Ad Spend Managed", prefix: "$" },
    { value: 94, suffix: "%", label: "Client Retention Rate" },
    { value: 40, suffix: "%", label: "Avg. Growth in Leads" }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#0B1F3A] border-t border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#C6A15B]">{stat.label}</p>
            <motion.div 
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + (i*0.1), duration: 0.8 }}
              className="w-12 h-[1px] bg-[#C6A15B] mx-auto mt-6 origin-left"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-40 px-6 lg:px-12 bg-[#F7F8FA] overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.12),transparent_60%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl"
      >
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#0B1F3A] mb-8 leading-tight">
          If this sounds like what you need, <span className="text-[#C6A15B]">just call.</span>
        </h2>
        <Link to="/contact" className="inline-block px-10 py-5 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(11,31,58,0.2)] hover:shadow-[0_15px_40px_rgba(11,31,58,0.3)] hover:-translate-y-1 transition-all duration-300">
          Talk to us
        </Link>
      </motion.div>
    </section>
  );
}

export default function Services() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (id) {
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 280);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[#F7F8FA] selection:bg-[#C6A15B] selection:text-white font-sans text-slate-800">
      <HeroSection />
      <TrustMarquee />
      <ServicesGrid />
      <ProcessSection />
      <StatsSection />
      <ClosingCTA />
    </div>
  );
}
