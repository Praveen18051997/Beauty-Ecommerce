import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { CountdownTimer } from '../common/CountdownTimer';
import { QuickViewModal } from '../common/QuickViewModal';

export const FlashSale = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const saleProducts = products.filter((p) => p.isFlashSale || p.originalPrice);

  return (
    <section className="py-16 px-4 lg:px-8 bg-rose-50/60 dark:bg-emeraldDark-900/60 border-y border-rose-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-white animate-bounce" />
              <span>Limited Time Beauty Offer</span>
            </div>
            <h2 className="font-serif font-extrabold text-3xl lg:text-4xl text-gray-900 dark:text-white pt-1">
              Flash Sale & Exclusive Bundles
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Save up to 30% off top-rated hyaluronic serums, gua sha tools, and velvet liquid lipsticks.
            </p>
          </div>

          {/* Live Countdown Timer */}
          <div className="flex items-center gap-4 bg-white dark:bg-[#16221F] p-3 rounded-2xl border border-rose-200 dark:border-white/10 shadow-sm shrink-0">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Ends In:
            </span>
            <CountdownTimer targetHours={14} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 py-3.5 px-8 bg-white dark:bg-[#16221F] hover:bg-rose-500 hover:text-white text-gray-900 dark:text-white font-bold rounded-2xl text-xs uppercase tracking-wider border border-rose-200 dark:border-white/10 shadow-md transition-all group"
          >
            <span>View All Sale Deals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};
