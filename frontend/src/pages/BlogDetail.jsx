import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsAPI } from '../services/api';
import { ArrowLeft, User, Calendar } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsAPI.detail(id).then(res => {
      setPost(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-primary dark:text-white">
        <p>Loading post detail...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 text-center text-primary dark:text-white">
        <p>Article not found.</p>
        <Link to="/blog" className="text-gold underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center text-xs font-bold text-primary dark:text-white hover:text-gold uppercase tracking-wider mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        {/* Category & Title */}
        <span className="text-xs bg-slate-100 dark:bg-slate-900 text-gold border px-3 py-1 rounded-full uppercase tracking-widest font-extrabold">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary dark:text-white mt-4 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex space-x-6 text-xs text-slate-400 font-bold uppercase tracking-wider border-b pb-6 mb-8">
          <span className="flex items-center"><User className="w-4 h-4 mr-1.5 text-gold" /> {post.author}</span>
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-gold" /> {post.date}</span>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden shadow-premium mb-8 border border-slate-100 dark:border-slate-800">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full object-cover h-[300px] md:h-[450px]"
          />
        </div>

        {/* Content Body */}
        <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>

      </div>

    </div>
  );
};

export default BlogDetail;
