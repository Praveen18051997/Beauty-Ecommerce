import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Sparkles, TrendingUp } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#16221F] rounded-3xl shadow-2xl overflow-hidden border border-rose-100 dark:border-white/10 animate-slide-down">
        {/* Header Search Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-rose-100 dark:border-white/10">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            placeholder="Search serums, lipsticks, fragrances, brands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder-gray-400 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-emeraldDark-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              {/* Popular Searches */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-500" /> Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Hyaluronic Acid', 'Velvet Liquid Lip', 'Rose Quartz Gua Sha', 'Niacinamide', 'Eau de Parfum', 'Argan Oil'].map(
                    (tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-emeraldDark-800 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-colors"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Browse Categories */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-500" /> Browse Categories
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.id}`}
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-gray-50 dark:bg-[#0B1513] hover:bg-rose-50 dark:hover:bg-emeraldDark-800 transition-colors flex items-center gap-3 group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                        }}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-rose-500">
                          {cat.name}
                        </h5>
                        <span className="text-[10px] text-gray-400">{cat.itemCount}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-gray-500">
                  Found <strong className="text-rose-500">{filteredProducts.length}</strong> matching products
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500 mb-2">No beauty products matched your search "{query}"</p>
                  <p className="text-xs text-gray-400">Try searching for "serum", "lipstick", or "oil"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={onClose}
                      className="p-3 rounded-2xl border border-rose-100 dark:border-white/10 hover:border-rose-300 bg-white dark:bg-[#0B1513] transition-all flex items-center gap-3 group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                        }}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-rose-500">
                          {p.brand}
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-rose-500">
                          {p.name}
                        </h5>
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-200">
                          ₹{p.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
