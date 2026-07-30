import React from 'react';
import { Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

export const FrequentlyBoughtTogether = ({ currentProduct }) => {
  const { addToCart } = useCart();

  // Find 2 related items
  const bundleItems = products
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, 2);

  const allItems = [currentProduct, ...bundleItems];
  const originalBundlePrice = allItems.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscountPrice = originalBundlePrice * 0.85; // 15% discount
  const savings = originalBundlePrice - bundleDiscountPrice;

  const handleAddBundleToCart = () => {
    allItems.forEach((item) => {
      addToCart(item, 1);
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-[#070E20]/70 border border-blue-100 dark:border-blue-900/40 my-10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white">
          Frequently Bought Together (Save 15%)
        </h4>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Products List Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto py-2">
          {allItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div className="flex items-center gap-3 bg-white dark:bg-[#0C1733] p-3 rounded-2xl border border-blue-200/80 dark:border-blue-800/40 shadow-sm min-w-[200px]">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h5>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    ₹{item.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {idx < allItems.length - 1 && (
                <Plus className="w-5 h-5 text-gray-400 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Price & Action */}
        <div className="shrink-0 p-4 bg-white dark:bg-[#0C1733] rounded-2xl border border-blue-200/80 dark:border-blue-800/40 text-center lg:text-right space-y-2">
          <div className="text-xs text-gray-500">
            Total Price: <span className="line-through text-gray-400">₹{originalBundlePrice.toFixed(2)}</span>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{bundleDiscountPrice.toFixed(2)}
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block font-sans">
              Save ₹{savings.toFixed(2)} (15% Bundle OFF)
            </span>
          </div>
          <button
            onClick={handleAddBundleToCart}
            className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 border border-blue-400/30 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" /> Add All 3 to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
