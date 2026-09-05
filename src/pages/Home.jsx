import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, Palette, Globe, Bot, Search, TrendingUp, Clapperboard, Hexagon, Workflow, BarChart3, Star, MessageCircle, ArrowUpRight,
} from 'lucide-react';
import { divisions } from '../data/divisions';
import HeroBanner from '../components/HeroBanner';

const iconMap = { Brain, Palette, Globe, Bot, Search, TrendingUp, Clapperboard, Hexagon, Workflow, BarChart3, Star, MessageCircle };

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const industries = [
  'FINANCE', 'TECHNOLOGY', 'HEALTHCARE', 'E-COMMERCE', 'SAAS',
  'WEB3', 'FINTECH', 'REAL ESTATE', 'D2C', 'B2B',
];

const humanPitch = {
  'brand-intelligence': 'Who you are, who you serve, and why anyone should pick you. Written down so the whole company can use it.',
  'identity-studio': 'Logo, colours, type, and the everyday stuff — decks, packs, social — so you look like one brand, not five.',
  'digital-experience': 'Websites and product screens that load fast, read clearly, and make the next step obvious.',
  'ai-growth': 'Useful AI in the work: drafts, chat, follow-ups. Not a slide that says “we use AI.”',
  'search-everywhere': 'You show up on Google — and when people ask ChatGPT or Gemini, your name still comes up.',
  'performance-lab': 'Ads that are meant to get leads and sales. We cut what does not pay.',
  'content-studio': 'Reels, YouTube, founder videos, UGC. Content people actually watch, not a leftover calendar.',
  'web3': 'Token launches, community, and listings — said in plain language, not crypto slang.',
  'automation': 'WhatsApp, CRM, email — the boring follow-up that should happen without someone chasing it.',
  'growth-intelligence': 'Dashboards and tracking so you can see what worked last month, not a 40-page PDF.',
  reputation: 'Google reviews and Maps. We ask happy customers, we reply to the rest.',
  'social-desk': 'Instagram and LinkedIn that stay alive. Posts plus replies — not a calendar that dies in week two.',
};

const services = divisions.map((d) => ({
  icon: iconMap[d.icon],
  title: d.title,
  id: d.id,
  pitch: humanPitch[d.id] || d.pitch,
}));

const work = [
  { title: 'A B2B brand that finally looked the part', cat: 'B2B', metric: 'More inbound, same spend', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200', feat: true },
  { title: 'A payments startup launch', cat: 'Fintech', metric: 'Pipeline we could point to', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=900' },
  { title: 'An online store that stopped wasting ads', cat: 'D2C', metric: 'Better return on spend', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900' },
];

const steps = [
  { n: '01', t: 'Listen', d: 'We start with your business. No template. No 80-slide opener.' },
  { n: '02', t: 'Decide', d: 'We pick what matters this quarter and leave the rest for later.' },
  { n: '03', t: 'Make', d: 'Brand, site, ads, content — whatever the plan actually needs.' },
  { n: '04', t: 'Launch', d: 'We go live, then we watch the numbers with you.' },
  { n: '05', t: 'Improve', d: 'Keep what works. Drop what does not. Repeat.' },
];

const stats = [
  { v: '180+', l: 'Projects shipped' },
  { v: '$12M+', l: 'Ads we have run' },
  { v: '94%', l: 'Clients who stayed' },
  { v: '40%', l: 'Leads up, on average' },
];

const wrap = 'mx-auto max-w-[1240px] px-7';
const serif = 'font-[Iowan_Old_Style,Palatino_Linotype,Palatino,Georgia,serif]';
const h2 = `${serif} m-0 text-[clamp(30px,4.6vw,50px)] font-bold leading-[1.12] tracking-[-0.03em] text-white`;
const goldText = 'bg-gradient-to-br from-[#c9a259] to-[#f0d898] bg-clip-text text-transparent';
const moreLink = 'inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#c9a259] no-underline transition-[color,gap] duration-250 hover:gap-3 hover:text-[#f0d898]';

function Label({ children }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#c9a259]">
      <span className="h-px w-[22px] bg-[#c9a259]" />
      {children}
    </p>
  );
}

function Marquee() {
  const row = [...industries, ...industries, ...industries];
  return (
    <div className="overflow-hidden border-y border-[#c9a259]/30 bg-[#07060a]">
      <motion.div
        animate={{ x: [0, -1100] }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        className="flex whitespace-nowrap py-[18px]"
      >
        {row.map((name, i) => (
          <div key={i} className="flex items-center">
            <span className="px-9 text-[11px] font-bold tracking-[0.24em] text-[#C9A259]">
              {name}
            </span>
            <span className="size-1 rounded-full bg-[#c9a259]/45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Intro() {
  return (
    <section className="relative overflow-hidden py-20 lg:pb-20 lg:pt-[120px]">
      <div className="pointer-events-none absolute -top-[120px] right-0 size-[520px] bg-[radial-gradient(circle,rgba(201,162,89,0.09),transparent_68%)]" />
      <div className={`${wrap} grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[72px]`}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <Label>About us</Label>
          <h2 className={`${h2} max-w-[620px]`}>
            Two founders. One studio.{' '}
            <span className={goldText}>You talk to us.</span>
          </h2>
          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.8] text-white/60">
            Raghvendra and Kishan run Krinova from Zirakpur. When a job needs more hands, we call people we already trust.
            You won’t get passed to a new manager every month.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.15}
          variants={fadeUp}
          className="rounded-sm border border-[#c9a259]/20 bg-gradient-to-b from-[#c9a259]/10 to-white/[0.02] px-8 py-9"
        >
          <p className={`${serif} m-0 text-xl leading-[1.5] text-white`}>
            “If the story is messy, more content just makes the mess louder. We fix the story first.”
          </p>
          <div className="mt-7 flex items-center gap-3.5">
            <div className="h-px w-9 bg-[#C9A259]" />
            <div>
              <p className="m-0 text-[13px] font-bold text-white">Raghvendra</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#C9A259]">
                Founder, Krinova
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="pb-[120px] pt-10">
      <div className={wrap}>
        <div className="mb-[52px] flex flex-wrap items-end justify-between gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <Label>What we do</Label>
            <h2 className={h2}>What a week with us looks like</h2>
          </motion.div>
          <Link to="/services" className={moreLink}>
            All services <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="group relative min-h-[240px] overflow-hidden rounded-sm border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.012] px-7 pb-[30px] pt-8 transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#c9a259]/40 hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              custom={i * 0.05}
              variants={fadeUp}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#c9a259] to-transparent opacity-45 transition-opacity duration-300 group-hover:opacity-100" />
              <Link to={`/services#${s.id}`} className="block text-inherit no-underline">
                <span className="absolute top-[22px] right-[22px] text-[11px] font-bold tracking-[0.12em] text-white/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mb-[22px] flex size-11 items-center justify-center rounded-lg border border-[#c9a259]/30 bg-[#c9a259]/[0.06] text-[#c9a259] transition-colors duration-300 group-hover:border-[#c9a259] group-hover:bg-[#c9a259] group-hover:text-[#111]">
                  <s.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2.5 text-lg font-bold text-white">{s.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.65] text-white/50">{s.pitch}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-[#c9a259]/20 bg-gradient-to-b from-[#0b0a0d] to-[#07060a] py-20">
      <div className={`${wrap} grid grid-cols-2 lg:grid-cols-4`}>
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i * 0.08}
            variants={fadeUp}
            className={`px-4 py-2 text-center ${i > 0 ? 'border-l border-white/[0.07]' : ''}`}
          >
            <div className={`${serif} mb-2.5 text-[clamp(34px,4.2vw,48px)] font-bold tracking-[-0.03em] text-white`}>
              {s.v}
            </div>
            <p className="m-0 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A259]">
              {s.l}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="py-[120px]">
      <div className={wrap}>
        <div className="mb-[52px] flex flex-wrap items-end justify-between gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <Label>Work</Label>
            <h2 className={h2}>Work we can walk you through</h2>
          </motion.div>
          <Link to="/portfolio" className={moreLink}>
            View portfolio <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {work.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.08}
              variants={fadeUp}
              className={p.feat ? 'md:col-span-2' : undefined}
            >
              <Link
                to="/portfolio"
                className={`group relative block min-h-[360px] overflow-hidden rounded-sm no-underline ${p.feat ? 'md:min-h-[460px]' : 'md:min-h-[380px]'}`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="block size-full min-h-[360px] object-cover transition-transform duration-700 group-hover:scale-105 md:min-h-[380px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
                <div className="absolute inset-x-7 bottom-[26px] z-[1]">
                  <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C9A259]">
                    {p.cat} · {p.metric}
                  </p>
                  <h3 className={`${serif} m-0 font-bold text-white ${p.feat ? 'text-[32px]' : 'text-[22px]'}`}>
                    {p.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="pb-[120px] pt-10">
      <div className={wrap}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 max-w-[640px]"
        >
          <Label>How we work</Label>
          <h2 className={h2}>How a project usually goes</h2>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="pointer-events-none absolute top-[21px] right-[21px] left-[21px] hidden h-px bg-[#c9a259]/20 lg:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="relative pt-2 pr-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.07}
              variants={fadeUp}
            >
              <div className="relative z-[1] mb-[22px] flex size-[42px] items-center justify-center rounded-full border border-[#c9a259]/55 bg-[#0a0908] text-[11px] font-extrabold tracking-[0.08em] text-[#c9a259]">
                {s.n}
              </div>
              <h3 className="mb-2.5 text-lg font-bold text-white">{s.t}</h3>
              <p className="m-0 text-[13.5px] leading-[1.65] text-white/50">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="pb-10">
      <div className={wrap}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden border border-[#c9a259]/30 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,89,0.14),#08070b_58%)] px-7 py-[88px] text-center"
        >
          <Label>Say hello</Label>
          <h2 className={`${h2} mx-auto mb-[18px] max-w-[680px]`}>
            Got 20 minutes?{' '}
            <span className={goldText}>That’s enough.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-[460px] text-base leading-[1.7] text-white/50">
            Tell us what you’re selling and where it’s stuck. We’ll tell you if we can help — or who might.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-sm bg-[#c9a259] px-[34px] py-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#111] no-underline shadow-[0_10px_32px_rgba(201,162,89,0.32)] transition-[transform,box-shadow,background] duration-250 hover:-translate-y-0.5 hover:bg-[#dbb56a] hover:shadow-[0_16px_40px_rgba(201,162,89,0.42)]"
          >
            Book a call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#050505] font-sans text-white">
      <HeroBanner />
      <Marquee />
      <Intro />
      <ServicesPreview />
      <Stats />
      <Work />
      <Process />
      <Closing />
    </div>
  );
}
