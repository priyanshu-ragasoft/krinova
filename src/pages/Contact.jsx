import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

function ContactForm() {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const first = data.get('first')?.toString().trim() || '';
    const last = data.get('last')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const help = data.get('help')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';
    const text = `Hi Krinova, I'm ${first} ${last}.\nEmail: ${email}\nNeed: ${help}\n\n${message}`;
    window.open(`https://wa.me/917347535399?text=${encodeURIComponent(text)}`, '_blank');
    setFormState('success');
  };

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0B1F3A] p-12 rounded-2xl text-center text-white h-full flex flex-col justify-center items-center"
      >
        <div className="w-16 h-16 bg-[#C6A15B] rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#0B1F3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-3xl font-serif font-bold mb-4">Message Received</h3>
        <p className="text-white/70">WhatsApp should have opened with your note. If it didn’t, call +91 73475 35399 or email contact@krinova.com.</p>
        <button onClick={() => setFormState('idle')} className="mt-8 text-[#C6A15B] font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_10px_40px_rgba(11,31,58,0.05)] border border-slate-100">
      <h3 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-8">Send us a message</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">First Name</label>
          <input name="first" required type="text" className="w-full bg-[#F7F8FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all" placeholder="Your first name" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Last Name</label>
          <input name="last" required type="text" className="w-full bg-[#F7F8FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all" placeholder="Surname" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
        <input name="email" required type="email" className="w-full bg-[#F7F8FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all" placeholder="you@company.com" />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">How can we help?</label>
        <select name="help" className="w-full bg-[#F7F8FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all appearance-none">
          <option>Brand & positioning</option>
          <option>Logo & identity</option>
          <option>Website</option>
          <option>Search (Google + AI answers)</option>
          <option>Ads & leads</option>
          <option>Video & content</option>
          <option>Web3 / crypto</option>
          <option>WhatsApp / CRM follow-up</option>
          <option>Tracking & reports</option>
          <option>Not sure — just talk</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</label>
        <textarea name="message" required rows="4" className="w-full bg-[#F7F8FA] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all resize-none" placeholder="What do you sell, and what’s stuck?"></textarea>
      </div>

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full bg-[#0B1F3A] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#C6A15B] transition-colors shadow-lg disabled:opacity-70"
      >
        {formState === 'submitting' ? 'Opening WhatsApp...' : 'Send on WhatsApp'}
        {formState !== 'submitting' && <ArrowRight size={18} />}
      </button>
    </form>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col justify-between h-full">
      <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <h2 className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">Get in Touch</h2>
        <h1 className="text-5xl lg:text-7xl font-bold text-[#0B1F3A] font-serif leading-[1.1] tracking-tight mb-6">
          Write us. Or <span className="text-[#C6A15B]">just call.</span>
        </h1>
        <p className="text-lg text-slate-600">
          New brand, a tired site, ads that aren’t paying — say it in a few lines. We’ll tell you if we can help, and if we can’t.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-8 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.05)] shrink-0">
            <Mail size={20} className="text-[#C6A15B]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
            <p className="text-[#0B1F3A] font-bold text-lg">contact@krinova.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.05)] shrink-0">
            <Phone size={20} className="text-[#C6A15B]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
            <p className="text-[#0B1F3A] font-bold text-lg">+91 73475 35399</p>
            <p className="text-[#0B1F3A] font-bold text-lg">+91 8091 555355</p>
          </div>
        </div>

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.05)] shrink-0">
            <MapPin size={20} className="text-[#C6A15B]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Visit Us</p>
            <p className="text-[#0B1F3A] font-bold text-lg">Cosmo Mall</p>
            <p className="text-slate-600">Ambala - Chandigarh Expy, Zirakpur<br />Punjab 140603, India</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MapSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(11,31,58,0.1)] border border-slate-100"
    >
      <iframe
        title="Krinova Location"
        src="https://maps.google.com/maps?q=30.6372992,76.8224633+(Krinova)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </motion.div>
  );
}

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-[#F7F8FA] selection:bg-[#C6A15B] selection:text-white font-sans text-slate-800 pb-24">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 h-[70vh] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-32 lg:pt-40">

        {/* Top Section: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <ContactInfo />
          <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <ContactForm />
          </motion.div>
        </div>

        {/* Bottom Section: Map */}
        <MapSection />

      </div>
    </div>
  );
}
