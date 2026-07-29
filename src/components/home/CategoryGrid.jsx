import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';

export const CategoryGrid = () => {
  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" /> Curated Collections
          </span>
          <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white">
            Shop by Beauty Ritual
          </h2>
        </div>
        <Link
          to="/shop"
          className="mt-3 md:mt-0 text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-wider flex items-center gap-1 group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className="group relative h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-rose-100 dark:border-white/10 transition-all duration-500"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div className="flex justify-end">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold rounded-full border border-white/30">
                  {cat.itemCount}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-widest block mb-1">
                  {cat.tagline}
                </span>
                <h3 className="font-serif font-bold text-2xl text-white mb-2 group-hover:text-rose-200 transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-2 transition-transform">
                  Explore Products <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
