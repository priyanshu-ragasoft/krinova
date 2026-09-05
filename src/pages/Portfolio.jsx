import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

/* ── Dummy Data ── */
const categories = ['All Work', 'B2B Tech', 'E-Commerce', 'Fintech', 'Healthcare'];

const portfolioProjects = [
  {
    id: 1,
    title: 'Acme Corp Rebranding',
    category: 'B2B Tech',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    metric: '+240% Inbound Leads',
    colSpan: 'col-span-1 md:col-span-2'
  },
  {
    id: 2,
    title: 'Nova Health Systems',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    metric: '4x Lower CPA',
    colSpan: 'col-span-1'
  },
  {
    id: 3,
    title: 'Lumina Pay',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    metric: '$12M Pipeline Gen',
    colSpan: 'col-span-1'
  },
  {
    id: 4,
    title: 'Vertex E-Commerce',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    metric: '2.5x ROAS',
    colSpan: 'col-span-1 md:col-span-2'
  },
  {
    id: 5,
    title: 'Nexus Data Infrastructure',
    category: 'B2B Tech',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    metric: '+180% Organic Traffic',
    colSpan: 'col-span-1 md:col-span-3' // Large span
  }
];

/* ── Components ── */
function HeroSection() {
  return (
    <section className="relative min-h-[60vh] bg-[#F7F8FA] flex items-center justify-center text-center px-6 overflow-hidden pt-24">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.10),transparent_60%)]" />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-6">Our Portfolio</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-[#0B1F3A] font-serif leading-tight tracking-tight mb-8">
          A few things we’ve <span className="text-[#C6A15B]">shipped.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Names below are samples of the kind of work we take — brand, site, ads. If you want a walkthrough of a live one, ask on the call.
        </p>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative rounded-2xl overflow-hidden bg-slate-100 ${project.colSpan} h-[400px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.15)] transition-all duration-500 cursor-pointer`}
    >
      {/* Image */}
      <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      
      {/* Persistent Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <p className="text-[#C6A15B] text-xs font-bold tracking-widest uppercase mb-2">{project.category}</p>
        <h3 className="text-3xl font-serif font-bold text-white mb-4">{project.title}</h3>
        
        {/* Reveal Metrics on Hover */}
        <div className="overflow-hidden h-0 group-hover:h-[60px] transition-all duration-500 ease-out">
          <div className="flex items-center gap-4 border-t border-white/20 pt-4 mt-2">
            <div className="flex items-center gap-2 text-white font-bold bg-[#C6A15B] px-3 py-1 rounded text-sm">
              <TrendingUp size={16} /> {project.metric}
            </div>
            <span className="text-white/70 text-sm flex items-center gap-1 hover:text-white transition-colors">
              Read Case Study <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkGrid() {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);

  useEffect(() => {
    if (activeCategory === 'All Work') setFilteredProjects(portfolioProjects);
    else setFilteredProjects(portfolioProjects.filter(p => p.category === activeCategory));
  }, [activeCategory]);

  return (
    <section className="py-24 px-6 lg:px-12 bg-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
        
        {/* Sticky Filter Bar */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md py-6 mb-12 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#0B1F3A] text-white shadow-[0_4px_14px_rgba(11,31,58,0.39)]' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry/Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
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
          Want something like this <span className="text-[#C6A15B]">for your shop?</span>
        </h2>
        <Link to="/contact" className="inline-block px-10 py-5 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(11,31,58,0.2)] hover:shadow-[0_15px_40px_rgba(11,31,58,0.3)] hover:-translate-y-1 transition-all duration-300">
          Talk to us
        </Link>
      </motion.div>
    </section>
  );
}

export default function Portfolio() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#F7F8FA] selection:bg-[#C6A15B] selection:text-white font-sans text-slate-800">
      <HeroSection />
      <WorkGrid />
      <ClosingCTA />
    </div>
  );
}
