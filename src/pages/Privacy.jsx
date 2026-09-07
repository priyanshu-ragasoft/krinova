import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { CALL_LINE, WA_DISPLAY, EMAIL } from '../data/contact';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24">
      <PageTitle
        title="Privacy — Krinova"
        description="How Krinova handles what you send us. Short version from Zirakpur."
      />
      <article className="mx-auto max-w-2xl px-6">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">Legal</p>
        <h1 className="font-heading mb-8 text-4xl font-bold text-white md:text-5xl">Privacy</h1>
        <div className="space-y-5 text-[15px] leading-relaxed text-white/65">
          <p>If you write us — form, WhatsApp, or email — we use that note to reply. We don’t sell your details, and we don’t run a mailing list you didn’t ask for.</p>
          <p>The contact form opens WhatsApp with what you typed. That message lives on your phone and ours, same as any chat.</p>
          <p>This site uses only what the browser needs to load. No extra trackers we added for ads.</p>
          <p>Questions: <a href={`mailto:${EMAIL}`} className="text-[#C9A259] no-underline hover:underline">{EMAIL}</a>, call {CALL_LINE}, or WhatsApp {WA_DISPLAY}. Studio: Cosmo Mall, Zirakpur.</p>
        </div>
        <Link to="/contact" className="btn-ghost mt-12">Write us</Link>
      </article>
    </div>
  );
}
