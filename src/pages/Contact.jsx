import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, MessageCircle, Clock, ChevronDown, ExternalLink } from 'lucide-react';
import { PHONES, CALL_HREF, WA_DISPLAY, WA_HREF, EMAIL, CALL_LINE } from '../data/contact';
import { publicFetch } from '../lib/api';
import SocialLinks from '../components/SocialLinks';
import PageTitle from '../components/PageTitle';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const inputClass =
  'w-full rounded-xl border border-slate-200/90 bg-[#F7F8FA] px-4 py-3.5 text-[15px] text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#C6A15B] focus:bg-white focus:ring-2 focus:ring-[#C6A15B]/15';

function ContactForm() {
  const [formState, setFormState] = useState('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormState('submitting');

    const data = new FormData(e.currentTarget);
    const first = data.get('first')?.toString().trim() || '';
    const last = data.get('last')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const help = data.get('help')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';

    const { res } = await publicFetch('/contact', {
      method: 'POST',
      body: JSON.stringify({ firstName: first, lastName: last, email, help, message }),
    });

    if (!res.ok) {
      setFormState('idle');
      setFormError('Could not save your message. Try WhatsApp or call us directly.');
      return;
    }

    const text = `Hi Krinova, I'm ${first} ${last}.\nEmail: ${email}\nNeed: ${help}\n\n${message}`;
    window.open(`${WA_HREF}?text=${encodeURIComponent(text)}`, '_blank');
    setFormState('success');
  };

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-[#0B1F3A] p-10 md:p-14 text-center text-white shadow-[0_24px_60px_rgba(11,31,58,0.18)]"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-[#C6A15B]/20 blur-3xl" />
        <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[#C6A15B] mb-6">
          <svg className="size-8 text-[#0B1F3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="relative font-serif text-3xl font-bold mb-3">Message received</h3>
        <p className="relative mx-auto max-w-md text-[15px] leading-relaxed text-white/70">
          Saved to our inbox. WhatsApp should have opened ({WA_DISPLAY}). If not, call {CALL_LINE} or email {EMAIL}.
        </p>
        <button
          type="button"
          onClick={() => setFormState('idle')}
          className="relative mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C6A15B] transition-colors hover:text-white"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(11,31,58,0.08)]"
    >
      <div className="border-b border-slate-100 bg-gradient-to-br from-[#0B1F3A]/[0.03] to-transparent px-8 py-7 md:px-10">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#C6A15B]">Start a brief</p>
        <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] md:text-[1.65rem]">Send us a message</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          We read every note. Expect a reply within one business day — often sooner on WhatsApp.
        </p>
      </div>

      <div className="space-y-5 p-8 md:p-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="First name" name="first" placeholder="Your first name" required />
          <Field label="Last name" name="last" placeholder="Surname" required />
        </div>
        <Field label="Work email" name="email" type="email" placeholder="you@company.com" required />
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">How can we help?</label>
          <div className="relative">
            <select name="help" className={`${inputClass} appearance-none pr-10`}>
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
            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Message</label>
          <textarea
            name="message"
            required
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="What do you sell, and what's stuck?"
          />
        </div>

        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_28px_rgba(11,31,58,0.2)] transition-all hover:bg-[#C6A15B] hover:shadow-[0_12px_36px_rgba(198,161,91,0.35)] disabled:opacity-70"
        >
          {formState === 'submitting' ? 'Sending…' : 'Send on WhatsApp'}
          {formState !== 'submitting' && <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />}
        </button>
        {formError && <p className="text-center text-sm text-[#C96A45]">{formError}</p>}
        <p className="text-center text-[11px] leading-relaxed text-slate-400">
          By sending, you agree we may contact you about your inquiry. No spam — ever.
        </p>
      </div>
    </motion.form>
  );
}

function Field({ label, name, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} className={inputClass} />
    </div>
  );
}

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    note: 'Replies within 24h',
  },
  {
    icon: Phone,
    label: 'Call',
    phones: PHONES,
    note: 'Mon–Sat, 10am–7pm',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: WA_DISPLAY,
    href: WA_HREF,
    external: true,
    note: 'Fastest way to reach us',
  },
  {
    icon: MapPin,
    label: 'Studio',
    value: 'Cosmo Mall, Zirakpur',
    href: 'https://maps.google.com/?q=Cosmo+Mall+Zirakpur',
    external: true,
    note: 'Punjab 140603, India',
  },
];

function ContactInfo() {
  return (
    <div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C6A15B]">Get in touch</p>
        <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold leading-[1.08] tracking-tight text-[#0B1F3A]">
          Write us. Or <span className="text-[#C6A15B]">just call.</span>
        </h1>
        <p className="mt-5 max-w-lg text-[16px] leading-[1.7] text-slate-600">
          New brand, a tired site, ads that aren't paying — say it in a few lines. We'll tell you if we can help, and if we can't.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.08}
        className="mt-8 flex flex-wrap gap-3"
      >
        <a
          href={WA_HREF}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#C6A15B]/40 bg-[#C6A15B]/10 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B1F3A] no-underline transition-all hover:bg-[#C6A15B] hover:text-white"
        >
          <MessageCircle size={14} />
          WhatsApp now
        </a>
        <a
          href={CALL_HREF}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 no-underline shadow-sm transition-all hover:border-[#0B1F3A]/20 hover:text-[#0B1F3A]"
        >
          <Phone size={14} />
          Call studio
        </a>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.14}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {CONTACT_CHANNELS.map((channel) => {
          const { icon: Icon, label, note, href, external, value, phones } = channel;
          const Wrapper = href ? 'a' : 'div';
          const wrapperProps = href
            ? {
                href,
                target: external ? '_blank' : undefined,
                rel: external ? 'noreferrer' : undefined,
              }
            : {};

          return (
            <Wrapper
              key={label}
              {...wrapperProps}
              className={`group rounded-2xl border border-slate-100 bg-white p-5 ${
                href ? 'no-underline shadow-[0_8px_30px_rgba(11,31,58,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#C6A15B]/30 hover:shadow-[0_16px_40px_rgba(11,31,58,0.08)]' : ''
              }`}
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#C6A15B]/10 text-[#C6A15B] transition-colors group-hover:bg-[#C6A15B] group-hover:text-white">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
              {phones ? (
                <div className="mt-1 space-y-1">
                  {phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="block text-[15px] font-bold text-[#0B1F3A] no-underline hover:text-[#C6A15B]"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-[15px] font-bold text-[#0B1F3A]">{value}</p>
              )}
              <p className="mt-1 text-[12px] text-slate-500">{note}</p>
            </Wrapper>
          );
        })}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.2}
        className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(11,31,58,0.04)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Follow us</p>
            <p className="mt-1 text-sm text-slate-600">@krinovadigital and our other channels</p>
          </div>
          <SocialLinks theme="light" />
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.24}
        className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-[#F7F8FA]/80 px-5 py-4"
      >
        <Clock size={18} className="shrink-0 text-[#C6A15B]" />
        <p className="text-[13px] leading-relaxed text-slate-600">
          <span className="font-semibold text-[#0B1F3A]">Same founders on day one.</span> No hand-off to a junior after you sign.
        </p>
      </motion.div>
    </div>
  );
}

function MapSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C6A15B]">Find the studio</p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#0B1F3A] md:text-3xl">Cosmo Mall, Zirakpur</h2>
        </div>
        <a
          href="https://maps.google.com/?q=Cosmo+Mall+Zirakpur+Krinova"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 no-underline shadow-sm transition-all hover:border-[#C6A15B]/40 hover:text-[#C6A15B]"
        >
          Open in Maps
          <ExternalLink size={13} />
        </a>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-100 shadow-[0_20px_60px_rgba(11,31,58,0.1)]">
        <div className="absolute left-5 top-5 z-10 hidden max-w-xs rounded-xl border border-white/20 bg-white/95 p-4 shadow-lg backdrop-blur-sm md:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C6A15B]">Krinova</p>
          <p className="mt-1 text-sm font-bold text-[#0B1F3A]">Cosmo Mall</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">Ambala - Chandigarh Expy, Zirakpur, Punjab 140603</p>
        </div>
        <div className="h-[380px] md:h-[480px]">
          <iframe
            title="Krinova Location"
            src="https://maps.google.com/maps?q=30.6372992,76.8224633+(Krinova)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </motion.section>
  );
}

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F8FA] pb-24 font-sans text-slate-800 selection:bg-[#C6A15B] selection:text-white">
      <PageTitle title="Contact — Krinova" description="Get in touch with Krinova in Zirakpur — call, WhatsApp, email, or send a brief." />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute -right-32 top-20 size-[420px] rounded-full bg-[#C6A15B]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-[480px] size-[320px] rounded-full bg-[#0B1F3A]/[0.04] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 lg:px-12 lg:pt-40">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-20 md:mt-28">
          <MapSection />
        </div>
      </div>
    </div>
  );
}
