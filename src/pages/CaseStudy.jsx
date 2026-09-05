import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/work';
import PageTitle from '../components/PageTitle';

export default function CaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center">
        <PageTitle title="Work not found — Krinova" />
        <p className="font-heading text-3xl text-white">That piece isn’t here.</p>
        <Link to="/portfolio" className="btn-ghost mt-8">All work</Link>
      </div>
    );
  }

  const blocks = [
    { t: 'Problem', d: project.problem },
    { t: 'Work', d: project.work },
    { t: 'Result', d: project.result },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-24">
      <PageTitle
        title={`${project.title} — Krinova`}
        description={`${project.category}. ${project.metric}. Sample of the work we take.`}
      />
      <article className="mx-auto max-w-3xl px-6">
        <Link to="/portfolio" className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A259] no-underline hover:text-[#E4C27A]">
          ← Portfolio
        </Link>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A259]">
          {project.category} · {project.metric}
        </p>
        <h1 className="font-heading mt-3 mb-10 text-4xl font-bold text-white md:text-6xl">{project.title}</h1>
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="mb-14 h-[280px] w-full rounded-xl object-cover md:h-[380px]"
        />
        <div className="space-y-10">
          {blocks.map((b) => (
            <section key={b.t}>
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A259]">{b.t}</h2>
              <p className="text-[17px] leading-relaxed text-white/70">{b.d}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-white/40">Sample brief — not a named client case unless we say so on a call.</p>
        <Link to="/contact" className="btn-gold mt-8">Walk through a live one</Link>
      </article>
    </div>
  );
}
