import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Trash2, ShoppingBag, Check, X, Sparkles, Star } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export const ComparePage = () => {
  const { compareItems, removeFromCompare, clearCompare, toggleCompare } = useCompare();
  const { addToCart } = useCart();

  const handleSelectToCompare = (product) => {
    toggleCompare(product);
  };

  const uncomparedProducts = products.filter(
    (p) => !compareItems.some((c) => c.id === p.id)
  );

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <ArrowRightLeft className="w-4 h-4" /> Side-By-Side Product Comparison
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Compare Beauty Formulas ({compareItems.length}/4)
          </h1>
        </div>

        {compareItems.length > 0 && (
          <button
            onClick={clearCompare}
            className="py-2.5 px-4 bg-gray-100 dark:bg-[#070E20] text-gray-600 dark:text-gray-300 font-bold rounded-2xl text-xs hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Clear Matrix
          </button>
        )}
      </div>

      {compareItems.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0C1733] rounded-3xl border border-blue-200/80 dark:border-blue-800/40 p-8 shadow-sm space-y-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <ArrowRightLeft className="w-10 h-10" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
            No products selected for comparison
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Select products while browsing by clicking the comparison button to compare prices, ingredients, and skin types.
          </p>

          {/* Quick Select Grid */}
          <div className="pt-4 max-w-2xl mx-auto">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Quick Add to Compare:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {products.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectToCompare(p)}
                  className="p-3 bg-gray-50 dark:bg-[#070E20] rounded-2xl border border-blue-200/80 dark:border-blue-800/40 text-left hover:border-blue-400 transition-all flex flex-col items-center text-center shadow-sm"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-16 h-16 rounded-xl object-cover mb-2"
                  />
                  <span className="text-xs font-bold font-serif text-gray-900 dark:text-white line-clamp-1">{p.name}</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">+ Compare</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Comparison Table */
        <div className="bg-white dark:bg-[#0C1733] rounded-3xl border border-blue-200/80 dark:border-blue-800/40 shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-[#070E20]/50">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase w-48">Product Info</th>
                {compareItems.map((p) => (
                  <th key={p.id} className="p-6 text-center w-64">
                    <div className="relative flex flex-col items-center">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute -top-2 -right-2 p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                        }}
                        className="w-24 h-24 rounded-2xl object-cover mb-3 shadow-md"
                      />
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">{p.brand}</span>
                      <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white leading-tight mb-2">
                        {p.name}
                      </h4>
                      <span className="font-bold text-base text-gray-900 dark:text-white mb-3">₹{p.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 border border-blue-400/30 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100 dark:divide-blue-900/40 text-xs">
              {/* Category */}
              <tr>
                <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Category</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-4 text-center capitalize font-semibold text-gray-600 dark:text-gray-300">
                    {p.category}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-4 font-bold text-gray-700 dark:text-gray-300">User Rating</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-amber-400" /> {p.rating} ({p.reviewCount})
                    </div>
                  </td>
                ))}
              </tr>

              {/* Skin Type */}
              <tr>
                <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Suitable Skin Types</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-4 text-center font-medium text-blue-600 dark:text-blue-400">
                    {p.skinType?.join(', ') || 'All Skin Types'}
                  </td>
                ))}
              </tr>

              {/* Volume */}
              <tr>
                <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Volume / Size</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-4 text-center text-gray-600 dark:text-gray-300">
                    {p.volume}
                  </td>
                ))}
              </tr>

              {/* Vegan / Cruelty-Free */}
              <tr>
                <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Cruelty-Free & Vegan</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    {p.vegan && p.crueltyFree ? (
                      <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-bold">
                        <Check className="w-4 h-4" /> Yes (100%)
                      </span>
                    ) : (
                      <span className="text-gray-400">Standard</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Add more items if under 4 */}
      {compareItems.length > 0 && compareItems.length < 4 && (
        <div className="p-6 bg-white dark:bg-[#0C1733] rounded-3xl border border-blue-200/80 dark:border-blue-800/40 shadow-sm">
          <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Add Another Item to Matrix:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {uncomparedProducts.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectToCompare(p)}
                className="p-3 bg-gray-50 dark:bg-[#070E20] rounded-2xl border border-blue-200/80 dark:border-blue-800/40 text-left hover:border-blue-400 transition-all flex items-center gap-3 shadow-sm"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <span className="text-xs font-bold font-serif text-gray-900 dark:text-white truncate block">{p.name}</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">+ Compare</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
