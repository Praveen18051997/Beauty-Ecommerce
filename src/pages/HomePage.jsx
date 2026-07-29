import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp, Award, RefreshCw, ShieldCheck } from 'lucide-react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FlashSale } from '../components/home/FlashSale';
import { BeautyQuizTeaser } from '../components/home/BeautyQuizTeaser';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { products } from '../data/products';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'bestsellers':
        return products.filter((p) => p.isBestSeller);
      case 'new':
        return products.filter((p) => p.isNewArrival);
      case 'trending':
      default:
        return products.filter((p) => p.isTrending);
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories Showcase */}
      <CategoryGrid />

      {/* Featured Products Tabbed Section */}
      <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4" /> Curated Beauty Selections
            </span>
            <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white">
              Discover Product Highlights
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-rose-50 dark:bg-emeraldDark-900 p-1.5 rounded-2xl border border-rose-100 dark:border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'trending'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-rose-500'
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-rose-500'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-rose-500'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Limited Time Flash Sale */}
      <FlashSale />

      {/* Interactive Beauty Quiz Banner */}
      <BeautyQuizTeaser />

      {/* Customer Reviews & Testimonials */}
      <CustomerReviews />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
