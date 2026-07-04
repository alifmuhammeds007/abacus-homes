import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogsAPI } from '../services/api';
import { Search, Calendar, User, ChevronRight } from 'lucide-react';

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
    <div className="pt-24 bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header */}
      <div className="bg-primary dark:bg-slate-900 py-16 text-center text-white border-b border-gold/20">
        <h1 className="text-3xl md:text-5xl font-bold font-serif mb-3">Construction & Design Blog</h1>
        <p className="text-sm md:text-base text-gold uppercase tracking-widest font-semibold">Expert Guidelines, Architecture Advice, and Materials Trends</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-white'
                    : 'bg-slate-50 dark:bg-slate-900 border text-slate-500 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                {cat.replace('all', 'All Topics')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(post => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-all hover:-translate-y-1 group"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-gold border px-3 py-1 rounded-full uppercase tracking-wider font-extrabold">
                  {post.category}
                </span>
                
                <h3 className="text-base font-bold text-primary dark:text-white font-serif mt-4 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-slate-105 dark:border-slate-850 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> {post.author}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {post.date}</span>
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
