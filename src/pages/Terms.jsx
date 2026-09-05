import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24">
      <PageTitle
        title="Terms — Krinova"
        description="How we work with clients. Plain language from the Zirakpur studio."
      />
      <article className="mx-auto max-w-2xl px-6">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">Legal</p>
        <h1 className="font-heading mb-8 text-4xl font-bold text-white md:text-5xl">Terms of use</h1>
        <div className="space-y-5 text-[15px] leading-relaxed text-white/65">
          <p>This site is a shop window. Work starts when we agree a brief and a fee — usually on a call, then in writing.</p>
          <p>Portfolio names like Acme or Lumina are samples of the kind of work we take, not claims about those companies unless we say otherwise on a call.</p>
          <p>Copy, marks, and photos on this site belong to Krinova or their owners. Don’t lift them for your own deck.</p>
          <p>If something on a page is wrong, tell us. We’ll fix it. Studio: Cosmo Mall, Zirakpur. <a href="mailto:contact@krinova.com" className="text-[#C9A259] no-underline hover:underline">contact@krinova.com</a>.</p>
        </div>
        <Link to="/" className="btn-ghost mt-12">Back home</Link>
      </article>
    </div>
  );
}
