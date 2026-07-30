import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item, 1));
  };

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Heart className="w-4 h-4 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" /> Saved Favourites
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Your Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="py-3 px-5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 border border-blue-400/30 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" /> Move All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="py-3 px-4 bg-gray-100 dark:bg-[#070E20] text-gray-600 dark:text-gray-300 font-semibold rounded-2xl text-xs hover:text-blue-600"
            >
              Clear List
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#0C1733] rounded-3xl border border-blue-200/80 dark:border-blue-800/40 p-8 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-[#070E20] text-blue-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
            Save your favorite botanical serums, hyaluronic oils, and liquid lipsticks by clicking the heart icon while browsing.
          </p>
          <Link
            to="/shop"
            className="py-4 px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all inline-flex items-center gap-2 border border-blue-400/30 active:scale-95"
          >
            <span>Explore Collection</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
