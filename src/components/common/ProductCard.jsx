import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, ArrowRightLeft, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { RatingStars } from './RatingStars';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const [selectedShade, setSelectedShade] = useState(
    product?.shades ? product.shades[0] : null
  );

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white dark:bg-[#16221F] rounded-3xl p-3 border border-rose-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Badges */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5 pointer-events-none">
        {discountPercent && (
          <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            -{discountPercent}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Best Seller
          </span>
        )}
        {product.isNewArrival && !product.isBestSeller && (
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            New
          </span>
        )}
      </div>

      {/* Action Floating Buttons */}
      <div className="absolute top-5 right-5 z-10 flex flex-col gap-2 transition-all duration-300 opacity-90 group-hover:opacity-100">
        <button
          onClick={() => toggleWishlist(product)}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            isFavorite
              ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105'
              : 'bg-white/80 dark:bg-[#0B1513]/80 text-gray-600 dark:text-gray-300 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        <button
          onClick={() => toggleCompare(product)}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
            isCompared
              ? 'bg-champagne-500 text-white scale-105'
              : 'bg-white/80 dark:bg-[#0B1513]/80 text-gray-600 dark:text-gray-300 hover:text-champagne-500 hover:bg-white'
          }`}
          title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-rose-50/50 dark:bg-emeraldDark-800/50 mb-3 group/img">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover/img:scale-108 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
            }}
          />
        </Link>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="w-full py-2.5 px-3 bg-white/90 dark:bg-[#12201D]/90 backdrop-blur-md text-gray-800 dark:text-gray-100 text-xs font-semibold rounded-xl shadow-lg hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-rose-500 dark:text-rose-400 font-semibold mb-1 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span className="text-gray-400 font-normal capitalize">{product.category}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="block font-serif font-semibold text-gray-900 dark:text-white text-base leading-snug line-clamp-1 hover:text-rose-500 dark:hover:text-rose-400 transition-colors mb-1.5"
          >
            {product.name}
          </Link>

          {/* Ratings */}
          <div className="mb-2">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="xs" />
          </div>

          {/* Shades Selector Dots (if applicable) */}
          {product.shades && product.shades.length > 0 && (
            <div className="flex items-center gap-1.5 my-2">
              <span className="text-[10px] text-gray-400 font-medium">Shades:</span>
              <div className="flex items-center gap-1">
                {product.shades.slice(0, 4).map((shade, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedShade(shade);
                    }}
                    style={{ backgroundColor: shade.hex }}
                    className={`w-3.5 h-3.5 rounded-full border border-white dark:border-gray-700 shadow-sm transition-transform ${
                      selectedShade?.name === shade.name ? 'scale-125 ring-2 ring-rose-400' : 'hover:scale-110'
                    }`}
                    title={shade.name}
                  />
                ))}
                {product.shades.length > 4 && (
                  <span className="text-[10px] text-gray-400 font-bold ml-0.5">
                    +{product.shades.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Pricing & Add to Cart */}
        <div className="pt-3 border-t border-rose-50 dark:border-white/5 flex items-center justify-between gap-2 mt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1, selectedShade)}
            className="py-2 px-3 bg-[#12201D] dark:bg-rose-500 text-white hover:bg-rose-600 dark:hover:bg-rose-600 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md active:scale-95 shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
