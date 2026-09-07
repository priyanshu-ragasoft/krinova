import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { publicFetch, assetUrl } from '../lib/api';
import PageTitle from '../components/PageTitle';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPost(null);
    setMissing(false);
    publicFetch(`/blogs/${slug}`).then(({ res, data }) => {
      if (!res.ok) setMissing(true);
      else setPost(data.post);
    }).catch(() => setMissing(true));
  }, [slug]);

  if (missing) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] px-6 pt-36 text-center">
        <p className="text-slate-500">That note is not here.</p>
        <Link to="/blog" className="mt-6 inline-block text-[#C6A15B] font-bold uppercase tracking-widest text-sm">Back to the journal</Link>
      </div>
    );
  }

  if (!post) {
    return <div className="min-h-screen bg-[#F7F8FA] pt-36 text-center text-slate-400">Loading…</div>;
  }

  return (
    <article className="min-h-screen bg-white pt-32 pb-24">
      <PageTitle title={`${post.title} — Krinova`} description={post.excerpt} />
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-[#C6A15B] text-xs font-bold tracking-[0.2em] uppercase mb-4">{post.category}</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-tight">{post.title}</h1>
        <p className="mt-4 flex items-center gap-4 text-sm text-slate-400">
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
        </p>
        {post.image && (
          <img src={assetUrl(post.image)} alt="" className="mt-10 w-full rounded-2xl object-cover max-h-[420px]" />
        )}
        <p className="mt-8 text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-slate-700 whitespace-pre-line">
          {post.body || post.excerpt}
        </div>
        <Link to="/blog" className="mt-14 inline-block text-[#C6A15B] font-bold uppercase tracking-widest text-sm">
          All notes
        </Link>
      </div>
    </article>
  );
}
