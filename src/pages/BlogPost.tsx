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
      <div className="flex items-center justify-center py-32 pt-[65px]">
        <p className="text-gray-600 text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>Loading...</p>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="flex flex-col items-center justify-center py-32 pt-[65px] gap-4">
        <p className="text-xl font-bold text-white">Post not found.</p>
        <Link to="/blog" className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Back to writing
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[65px]">
      <div className="max-w-3xl mx-auto px-8 md:px-16 py-24">
        <Link
          to="/blog"
          className="text-xs text-gray-600 hover:text-white transition-colors mb-12 inline-block tracking-wider uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          ← Writing
        </Link>

        <div className="mt-8">
          <p
            className="text-xs text-gray-600 tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {post.date}
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-gray-500 text-lg mb-12 pb-12 border-b border-white/10">{post.description}</p>

          <article className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-a:text-white prose-a:underline prose-a:underline-offset-4
            prose-strong:text-white
            prose-code:text-gray-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-l-white/20 prose-blockquote:text-gray-500
            prose-hr:border-white/10
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
