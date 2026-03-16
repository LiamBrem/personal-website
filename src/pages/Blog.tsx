import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, PostMeta } from '../lib/posts';

export default function Blog() {
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-slate-50 mb-3">Blog</h1>
        <p className="text-lg text-slate-400 mb-12">Thoughts on engineering, systems, and whatever else is on my mind.</p>

        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:bg-slate-700 transition-all duration-200 p-7 group"
            >
              <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                {post.date}
              </p>
              <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors duration-150">
                {post.title}
              </h2>
              <p className="text-slate-400 leading-relaxed">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
