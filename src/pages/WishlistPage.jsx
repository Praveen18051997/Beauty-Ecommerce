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
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Heart className="w-4 h-4 fill-rose-500" /> Saved Favourites
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Your Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="py-3 px-5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Move All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="py-3 px-4 bg-gray-100 dark:bg-emeraldDark-800 text-gray-600 dark:text-gray-300 font-semibold rounded-2xl text-xs hover:text-rose-500"
            >
              Clear List
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#16221F] rounded-3xl border border-rose-100 dark:border-white/10 p-8 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-emeraldDark-800 text-rose-400 flex items-center justify-center mx-auto mb-4">
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
            className="py-4 px-8 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all inline-flex items-center gap-2"
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
