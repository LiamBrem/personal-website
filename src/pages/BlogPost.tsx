import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPost, Post } from '../lib/posts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    getPost(slug).then(setPost);
  }, [slug]);

  if (post === undefined) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-2xl font-bold text-slate-100">Post not found.</p>
        <Link to="/blog" className="text-blue-400 hover:underline text-sm">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/blog" className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150 mb-8 inline-block">
          ← Back to Blog
        </Link>

        <div className="bg-slate-800 rounded-3xl shadow-2xl p-10 md:p-14">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">{post.date}</p>
          <h1 className="text-4xl font-bold text-slate-50 mb-4">{post.title}</h1>
          <p className="text-lg text-slate-400 mb-10 pb-10 border-b border-slate-700">{post.description}</p>

          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
