import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Leaf } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingStars } from './RatingStars';

export const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(
    product?.shades ? product.shades[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedShade(product.shades ? product.shades[0] : null);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShade);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0C1733] rounded-3xl shadow-2xl overflow-hidden border border-blue-200/80 dark:border-blue-800/40 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:bg-white transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="w-full md:w-1/2 p-6 bg-blue-50/50 dark:bg-[#070E20]/50 flex flex-col items-center justify-center">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 shadow-inner">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-blue-600 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {product.brand}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500 capitalize">{product.category}</span>
            </div>

            <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-2 leading-snug">
              {product.name}
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stock})
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {product.shortDescription || product.description}
            </p>

            {/* Shades Selector */}
            {product.shades && (
              <div className="mb-4">
                <span className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Select Shade: <span className="text-blue-600 dark:text-blue-400">{selectedShade?.name}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedShade(shade)}
                      style={{ backgroundColor: shade.hex }}
                      className={`w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 shadow-md transition-all ${
                        selectedShade?.name === shade.name ? 'ring-2 ring-blue-600 scale-110' : 'hover:scale-105'
                      }`}
                      title={shade.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex items-center gap-3 py-3 border-y border-blue-100 dark:border-blue-900/40 mb-5 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Vegan & Cruelty Free
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> 100% Authentic
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-100 dark:bg-[#070E20] rounded-xl p-1 border border-gray-200 dark:border-blue-800/40">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#0C1733] transition-all"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#0C1733] transition-all"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 border border-blue-400/30 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-xl border transition-all ${
                isFavorite
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500'
                  : 'border-blue-200 dark:border-blue-800/40 text-gray-500 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          <div className="mt-3 text-center">
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              View Full Product Details & Customer Reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
