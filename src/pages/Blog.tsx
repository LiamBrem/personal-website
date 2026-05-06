import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, PostMeta } from '../lib/posts';

export default function Blog() {
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="pt-[65px]">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <p
          className="text-xs text-gray-500 tracking-widest uppercase mb-4"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Blog
        </p>
        <h1 className="text-5xl font-bold text-white mb-3">Writing</h1>
        <p className="text-gray-500 mb-16">Thoughts on engineering, systems, and whatever else is on my mind.</p>

        <div className="flex flex-col divide-y divide-white/10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="py-8 group flex flex-col md:flex-row md:items-start md:justify-between gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.description}</p>
              </div>
              <p
                className="text-xs text-gray-600 tracking-wider uppercase shrink-0 md:pt-1"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {post.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
