import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe2, HeartPulse, BookOpen, Coffee, ChevronDown, ArrowUpRight } from 'lucide-react';

/* ── Dummy Data ── */
const perks = [
  { icon: Globe2, title: 'Studio + flexibility', desc: 'Most weeks we’re at Cosmo Mall. Some days from home if the work doesn’t need a desk together.' },
  { icon: HeartPulse, title: 'We look after people', desc: 'Health cover and time off that isn’t a guilt trip. Ask us on the call — we’ll be specific.' },
  { icon: BookOpen, title: 'Learn on the job', desc: 'You’ll sit next to the work, not a LMS. Courses if you need them; we don’t pad a perk list.' },
  { icon: Coffee, title: 'Take the leave', desc: 'Take it. We don’t do “unlimited PTO” that nobody uses.' }
];

const jobs = [
  {
    id: 1,
    title: 'Senior Performance Marketer',
    department: 'Marketing',
    location: 'Zirakpur / hybrid',
    type: 'Full-time',
    desc: 'Run Meta and Google for real businesses — not vanity dashboards. You’ll sit with Kishan, not a 40-person media team.'
  },
  {
    id: 2,
    title: 'Designer',
    department: 'Design',
    location: 'Zirakpur / hybrid',
    type: 'Full-time',
    desc: 'Identity, decks, social, the last 10%. If your Figma file is tidy and your taste is sharp, we want to see it.'
  },
  {
    id: 3,
    title: 'Web developer (React / Next)',
    department: 'Engineering',
    location: 'Zirakpur / hybrid',
    type: 'Full-time',
    desc: 'Sites that load and don’t fight the CMS. You’ll work with Raghvendra. Three.js only if the brief needs it.'
  },
  {
    id: 4,
    title: 'Writer / content',
    department: 'Studio',
    location: 'Zirakpur / hybrid',
    type: 'Full-time',
    desc: 'Pages, ads, scripts. If you write like a person and can sit with a founder for an hour, apply.'
  }
];

/* ── Components ── */
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] bg-[#F7F8FA] flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-2xl">
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Careers at Krinova</h2>
          <h1 className="text-5xl lg:text-7xl font-bold text-[#0B1F3A] leading-[1.1] tracking-tight mb-6 font-serif">
            We hire slowly. <span className="text-[#C6A15B]">On purpose.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
            Small studio in Zirakpur. If you like finishing work more than talking about it, send something you’ve actually shipped.
          </p>
          <button onClick={() => document.getElementById('open-roles').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_4px_14px_0_rgba(11,31,58,0.39)] hover:shadow-[0_6px_20px_rgba(11,31,58,0.23)] hover:-translate-y-1 transition-all duration-300">
            View Open Roles
          </button>
        </motion.div>

        <div className="h-[400px] lg:h-[500px] w-full relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(11,31,58,0.1)] relative"
          >
            <div className="absolute inset-0 bg-[#0B1F3A]/20 mix-blend-multiply z-10" />
            <img
              loading="lazy"
              decoding="async"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PerkCard({ icon: Icon, title, desc, delay }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({ x: ((y - rect.height / 2) / (rect.height / 2)) * -4, y: ((x - rect.width / 2) / (rect.width / 2)) * 4 });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay }} style={{ perspective: 1000 }}>
      <div 
        ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="bg-white p-8 h-full border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d' }}
      >
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:border-[#C6A15B] group-hover:bg-[#C6A15B]/5 transition-colors" style={{ transform: 'translateZ(20px)' }}>
          <Icon size={24} className="text-[#0B1F3A]" strokeWidth={1.5} />
        </div>
        <h4 className="text-xl font-bold text-[#0B1F3A] mb-3" style={{ transform: 'translateZ(25px)' }}>{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{desc}</p>
      </div>
    </motion.div>
  );
}

function PerksSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">How we work</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A]">Designed for deep work.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => <PerkCard key={i} {...p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

function JobAccordion({ job }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex flex-col md:flex-row md:items-center justify-between text-left group transition-colors hover:bg-slate-50 px-4 -mx-4 rounded-lg"
      >
        <div className="flex-1 mb-4 md:mb-0">
          <h4 className="text-2xl font-serif font-bold text-[#0B1F3A] group-hover:text-[#C6A15B] transition-colors">{job.title}</h4>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <span className="bg-slate-100 px-3 py-1 rounded">{job.department}</span>
          <span>{job.location}</span>
          <span>{job.type}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="ml-4 text-[#0B1F3A]">
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-4 -mx-4 text-slate-600 max-w-3xl">
              <p className="mb-8 leading-relaxed text-lg">{job.desc}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A15B] text-white font-bold text-xs uppercase tracking-widest rounded shadow-lg shadow-[#C6A15B]/30 hover:-translate-y-1 transition-transform">
                Apply Now <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OpenRoles() {
  return (
    <section id="open-roles" className="py-24 px-6 lg:px-12 bg-[#F7F8FA]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Current Openings</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F3A]">Join the Engine.</h3>
        </div>
        <div className="border-t border-slate-200">
          {jobs.map((job) => (
            <JobAccordion key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C6A15B] rounded-full filter blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <svg className="w-12 h-12 text-[#C6A15B] mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-4xl font-serif text-white leading-tight font-medium mb-12">
          "I've grown more in my first 6 months at Krinova than I did in 3 years at my previous agency. The standard here is excellence, and the team actively pushes you to reach it."
        </motion.p>
        <div>
          <p className="text-white font-bold tracking-wide text-lg">Michael Vane</p>
          <p className="text-[#C6A15B] text-sm tracking-widest uppercase mt-1">Lead Product Designer</p>
        </div>
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
          Ready to build the <span className="text-[#C6A15B]">future?</span>
        </h2>
        <button onClick={() => document.getElementById('open-roles').scrollIntoView({ behavior: 'smooth' })} className="inline-block px-10 py-5 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(11,31,58,0.2)] hover:shadow-[0_15px_40px_rgba(11,31,58,0.3)] hover:-translate-y-1 transition-all duration-300">
          View Open Roles
        </button>
      </motion.div>
    </section>
  );
}

export default function Careers() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#F7F8FA] selection:bg-[#C6A15B] selection:text-white font-sans text-slate-800">
      <HeroSection />
      <PerksSection />
      <Testimonial />
      <OpenRoles />
      <ClosingCTA />
    </div>
  );
}
