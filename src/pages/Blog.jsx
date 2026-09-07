import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { publicFetch, assetUrl } from '../lib/api';
import PageTitle from '../components/PageTitle';

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop';

function HeroSection({ post }) {
  return (
    <section className="relative min-h-[60vh] bg-[#F7F8FA] flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">The Krinova Journal</h2>
          {post ? (
            <>
              <p className="mb-4 text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase">{post.category}</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0B1F3A] leading-[1.1] tracking-tight mb-6 font-serif">
                {post.title}
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Clock size={16} /> {post.readTime}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-[#0B1F3A] font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:text-[#C6A15B] transition-colors no-underline"
                  data-cursor-text={post.title}
                >
                  Read Article <ArrowUpRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl lg:text-7xl font-bold text-[#0B1F3A] leading-[1.1] tracking-tight mb-6 font-serif">
                Notes from <span className="text-[#C6A15B]">the studio.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                Short pieces on ads, search, and sites — written the way we’d tell a client on a Tuesday, not like a LinkedIn essay.
              </p>
            </>
          )}
        </motion.div>
        <div className="h-[400px] w-full relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(11,31,58,0.1)] relative"
          >
            <div className="absolute inset-0 bg-[#0B1F3A]/20 mix-blend-multiply z-10" />
            {post ? (
              <Link to={`/blog/${post.slug}`} className="block h-full" data-cursor-text={post.title}>
                <img
                  loading="eager"
                  decoding="async"
                  src={assetUrl(post.image)}
                  alt={post.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </Link>
            ) : (
              <img
                loading="lazy"
                decoding="async"
                src={FALLBACK_HERO_IMAGE}
                alt="Studio"
                className="w-full h-full object-cover object-center"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ post }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(11,31,58,0.1)] transition-all duration-300 flex flex-col"
    >
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col no-underline" data-cursor-text={post.title}>
        <div className="h-48 overflow-hidden relative">
          <img src={assetUrl(post.image)} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B1F3A] px-3 py-1 rounded text-xs font-bold tracking-widest uppercase">{post.category}</div>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <div className="text-xs text-slate-400 font-medium mb-3 flex items-center justify-between">
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
          <h4 className="text-xl font-serif font-bold text-[#0B1F3A] mb-3 leading-snug group-hover:text-[#C6A15B] transition-colors">{post.title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
          <span className="text-[#C6A15B] font-bold text-xs uppercase tracking-widest flex items-center gap-2 mt-auto">
            Read More <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleGrid({ posts }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F8FA] min-h-[40vh]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-3xl font-serif font-bold text-[#0B1F3A]">Latest Articles</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#0B1F3A] text-white shadow-[0_4px_14px_rgba(11,31,58,0.39)]'
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="text-slate-500">No notes in this category yet.</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-40 px-6 lg:px-12 bg-white overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.12),transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative z-10 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#0B1F3A] mb-8 leading-tight">
          If a note here sounds like your <span className="text-[#C6A15B]">problem,</span> write us.
        </h2>
        <Link to="/contact" className="inline-block px-10 py-5 bg-[#0B1F3A] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(11,31,58,0.2)] hover:shadow-[0_15px_40px_rgba(11,31,58,0.3)] hover:-translate-y-1 transition-all duration-300">
          Talk to us
        </Link>
      </motion.div>
    </section>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadPosts = () => {
      publicFetch('/blogs').then(({ res, data }) => {
        if (res.ok) setPosts(data.posts || []);
        setReady(true);
      }).catch(() => setReady(true));
    };
    loadPosts();
    const onFocus = () => loadPosts();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const featuredPost = posts.find((p) => p.featured) || null;
  const rest = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts;

  return (
    <div className="min-h-screen bg-white selection:bg-[#C6A15B] selection:text-white font-sans text-slate-800">
      <PageTitle title="Journal — Krinova" description="Notes from the studio in Zirakpur." />
      <HeroSection post={featuredPost} />
      {ready && posts.length === 0 ? (
        <p className="py-24 text-center text-slate-500">Nothing published yet.</p>
      ) : (
        <ArticleGrid posts={rest} />
      )}
      <ClosingCTA />
    </div>
  );
}
