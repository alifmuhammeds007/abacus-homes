import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogsAPI } from '../services/api';
import { Search, Calendar, User, ArrowUpRight } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    blogsAPI.list().then(res => setBlogs(res.data));
  }, []);

  const categories = ['all', ...new Set(blogs.map(b => b.category))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 bg-[#fafafa] text-slate-900 min-h-screen selection:bg-[#2596be] selection:text-white font-sans relative z-10">
      
      {/* Header */}
      <div className="relative py-16 sm:py-24 text-center bg-gradient-to-b from-white via-[#f4f7f9] to-[#fafafa] border-b border-slate-200/80 overflow-hidden z-10">
        
        {/* Medium Sized Brand Watermark (Visible on Mobile & Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
          <span className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-slate-900/[0.07] tracking-[0.18em] uppercase whitespace-nowrap leading-none">
            ARTICLES
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#2596be] text-xs font-mono tracking-widest uppercase mb-3 shadow-xs">
            10 // KNOWLEDGE & INSIGHTS
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-[#3b2314] tracking-tight mb-3">
            DESIGN & <span className="text-[#2596be]">INSIGHTS.</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Expert civil engineering articles, tropical architecture guidelines, and modern design trends.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-14">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2596be] text-white shadow-md shadow-[#2596be]/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Topics' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2596be] shadow-xs"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(post => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_50px_rgba(37,150,190,0.12)] hover:border-[#2596be] transition-all hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  {post.category}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#2596be]" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3 text-[#2596be]" /> {post.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#3b2314] font-sans mb-3 group-hover:text-[#2596be] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-6">
                    {post.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2596be] group-hover:underline">Read Complete Article</span>
                  <ArrowUpRight className="w-4 h-4 text-[#2596be] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Blog;
