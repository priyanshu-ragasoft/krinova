import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { AnimatedCounter } from '../components/SharedCorporateUI';
import { Target, BarChart2, Users, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const ragvendraImg = '/ragvendra.png';
const kishanImg = '/kishan.png';

const NAVY = '#0B1F3A';
const GOLD = '#C6A15B';

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] bg-[#F7F8FA] overflow-hidden flex items-center pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-2xl">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#0B1F3A] leading-[1.1] tracking-tight mb-6 font-serif">
            Two people. A studio in <span className="text-[#C6A15B]">Zirakpur.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
            Raghvendra builds the systems. Kishan looks after the brand and the campaigns. You get both on the call, not a junior reading notes.
          </p>
        </motion.div>

        <div className="h-[400px] lg:h-[600px] w-full relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(11,31,58,0.1)] relative"
          >
            <div className="absolute inset-0 bg-[#0B1F3A]/10 mix-blend-multiply z-10" />
            <img
              src="/About.png"
              alt="Corporate Office"
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

function OurStory() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Story</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-8">We got tired of agencies that vanish after the deck.</h3>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              Krinova started because we’d sat on the other side of the table. Big promises. Pretty slides. Then a new face every quarter. We wanted a shop that still picks up the phone in month six.
            </p>
            <p>
              So we keep the team small on purpose. Brand, site, ads, and follow-up live in the same room. If we don’t know how to do a piece, we say so — we don’t invent a department overnight.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0B1F3A] p-12 lg:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A15B] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
          <svg className="w-12 h-12 text-[#C6A15B] mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          <p className="text-2xl lg:text-3xl font-serif text-white leading-tight font-medium relative z-10">
            "I’d rather do fewer clients well than keep a roster we can’t actually remember."
          </p>
          <div className="mt-8 relative z-10">
            <p className="text-white font-bold tracking-wide">Kishan Kumar</p>
            <p className="text-[#C6A15B] text-sm tracking-widest uppercase">Founder & CMO</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValueCard({ icon: Icon, title, desc, delay }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="bg-white p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group h-full relative overflow-hidden"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#F7F8FA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/5 transition-colors relative z-10">
          <Icon size={24} className="text-[#0B1F3A]" strokeWidth={1.5} />
        </div>
        <h4 className="text-xl font-bold text-[#0B1F3A] mb-3 relative z-10">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed relative z-10">{desc}</p>
      </div>
    </motion.div>
  );
}

function ValuesSection() {
  const values = [
    { icon: Target, title: "Write it down first", desc: "If we can’t say who it’s for in one sentence, we don’t spend on ads yet." },
    { icon: BarChart2, title: "Numbers on Monday", desc: "You get a short note on what moved. Not a 40-page PDF nobody opens." },
    { icon: Users, title: "Same faces", desc: "The people on the first call are still there when something breaks." },
    { icon: Layers, title: "Finish the last 10%", desc: "A logo without a social kit, or a site without tracking, is half a job." }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">How we work</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A]">How we like to work</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <ValueCard key={i} {...v} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end center"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const milestones = [
    { year: "Start", title: "A desk, two laptops", desc: "First clients came from people we already knew. That’s still how most of them come." },
    { year: "Then", title: "Web + ads together", desc: "We stopped handing sites to one vendor and ads to another. Too many gaps." },
    { year: "Now", title: "Search beyond Google", desc: "Clients asked why they didn’t show up in ChatGPT. So we added that work." },
    { year: "Next", title: "Stay small", desc: "We’re not opening a second city to look big. The work has to stay close." }
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="mb-24">
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Milestones</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A]">How we got here</h3>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -translate-y-1/2 hidden lg:block" />
          <svg className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block overflow-visible" preserveAspectRatio="none">
            <motion.line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C6A15B" strokeWidth="2" strokeDasharray="1 1" style={{ pathLength }} />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-4 relative z-10">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15 }} className="relative pl-8 lg:pl-0 lg:text-center">
                {/* Mobile vertical line logic */}
                <div className="absolute left-0 top-0 w-[1px] h-full bg-slate-100 lg:hidden" />
                <div className="absolute left-[-4px] lg:left-1/2 top-0 lg:top-auto lg:-mt-12 w-2 h-2 rounded-full bg-[#0B1F3A] lg:-translate-x-1/2 ring-4 ring-white" />

                <h4 className="text-3xl font-serif font-bold text-[#C6A15B] mb-2">{m.year}</h4>
                <h5 className="text-lg font-bold text-[#0B1F3A] mb-2">{m.title}</h5>
                <p className="text-sm text-slate-500 max-w-[250px] lg:mx-auto">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamRow({ name, role, bio, image, reverse }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? '[&>div:first-child]:order-2' : ''}`}
    >
      <div className="group relative h-[420px] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_12px_40px_rgba(11,31,58,0.1)] sm:h-[480px] lg:h-[520px]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full origin-top object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <p className="text-xs font-bold tracking-widest uppercase text-[#C6A15B]">{role}</p>
        </div>
      </div>

      <div className={reverse ? 'lg:pr-4' : 'lg:pl-4'}>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C6A15B]">Founder</p>
        <h4 className="mb-3 font-serif text-4xl font-bold text-[#0B1F3A] md:text-5xl">{name}</h4>
        <p className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{role}</p>
        <p className="max-w-md text-lg leading-relaxed text-slate-600">“{bio}”</p>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  const team = [
    {
      name: 'Raghvendra',
      role: 'Founder & CTO',
      bio: 'Looks after how things are built — sites, tracking, the boring systems that keep a campaign honest.',
      image: ragvendraImg,
    },
    {
      name: 'Kishan Kumar',
      role: 'Founder & CMO',
      bio: 'Looks after how the brand feels and how the ads read. If it sounds like every other shop, he sends it back.',
      image: kishanImg,
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <div>
            <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Leadership</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A]">Who you’ll actually meet</h3>
          </div>
          <Link to="/contact" className="text-sm font-bold text-[#0B1F3A] hover:text-[#C6A15B] flex items-center gap-2 transition-colors">
            Join the Team <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-20 lg:gap-28">
          {team.map((t, i) => (
            <TeamRow key={t.name} {...t} reverse={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: 12, suffix: "+", label: "Years in Business" },
    { value: 180, suffix: "+", label: "Campaigns Delivered" },
    { value: 94, suffix: "%", label: "Client Retention Rate" },
    { value: 40, suffix: "+", label: "Elite Team Members" }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#0B1F3A] border-t border-[#C6A15B]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#C6A15B]">{stat.label}</p>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }} className="w-12 h-[1px] bg-[#C6A15B] mx-auto mt-6 origin-left" />
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
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative z-10 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#0B1F3A] mb-8 leading-tight">
          Come by Cosmo Mall, or <span className="text-[#C6A15B]">we’ll come on a call.</span>
        </h2>
        <Link to="/contact" className="inline-block px-10 py-5 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(11,31,58,0.2)] hover:shadow-[0_15px_40px_rgba(11,31,58,0.3)] hover:-translate-y-1 transition-all duration-300">
          Say hello
        </Link>
      </motion.div>
    </section>
  );
}

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#F7F8FA] selection:bg-[#C6A15B] selection:text-white font-sans text-slate-800">
      <HeroSection />
      <OurStory />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <StatsSection />
      <ClosingCTA />
    </div>
  );
}
