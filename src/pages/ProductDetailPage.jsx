import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Leaf,
  Sparkles,
  ArrowRightLeft,
  Truck,
  RefreshCw,
  MessageSquare,
  Share2,
  Star
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';
import { ImageGallery } from '../components/product/ImageGallery';
import { ShadeSelector } from '../components/product/ShadeSelector';
import { FrequentlyBoughtTogether } from '../components/product/FrequentlyBoughtTogether';
import { WriteReviewModal } from '../components/product/WriteReviewModal';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addRecentlyViewed } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { addToast } = useToast();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedShade, setSelectedShade] = useState(
    product?.shades ? product.shades[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(product?.reviewsList || []);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      if (product.shades) setSelectedShade(product.shades[0]);
    }
  }, [id, product]);

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedShade);
    navigate('/checkout');
  };

  const handleAddReview = (newReview) => {
    setReviewsList((prev) => [newReview, ...prev]);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-rose-500">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-rose-500">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="capitalize hover:text-rose-500">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6">
          <ImageGallery images={product.images} name={product.name} />
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                {product.brand}
              </span>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </span>
            </div>

            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white leading-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={product.rating} reviewCount={reviewsList.length} size="md" />
              <a href="#reviews" className="text-xs text-rose-500 hover:underline font-semibold">
                Read Reviews ({reviewsList.length})
              </a>
            </div>

            {/* Price & Discounts */}
            <div className="flex items-baseline gap-3 py-3 border-y border-rose-100 dark:border-white/10">
              <span className="font-bold text-3xl text-gray-900 dark:text-white">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="px-2.5 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full">
                    SAVE ₹{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              {product.description}
            </p>
          </div>

          {/* Makeup Shade Selector (if applicable) */}
          {product.shades && (
            <ShadeSelector
              shades={product.shades}
              selectedShade={selectedShade}
              onSelectShade={(s) => setSelectedShade(s)}
            />
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              {/* Quantity Changer */}
              <div className="flex items-center bg-gray-100 dark:bg-emeraldDark-800 rounded-2xl p-1.5 border border-gray-200 dark:border-white/10 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#16221F] shadow-sm"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#16221F] shadow-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity, selectedShade)}
                className="flex-1 py-4 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-2xl border transition-all ${
                  isFavorite
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-rose-500 hover:border-rose-300'
                }`}
                title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
              </button>

              {/* Compare Button */}
              <button
                onClick={() => toggleCompare(product)}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompared
                    ? 'bg-champagne-500 text-white border-champagne-500'
                    : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-champagne-500 hover:border-champagne-300'
                }`}
                title="Compare Product Specs"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-rose-100 dark:text-gray-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all text-center"
            >
              Buy Now (Express Checkout)
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-rose-50/50 dark:bg-emeraldDark-900/50 rounded-2xl border border-rose-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose-500" />
              <span>Free Shipping over ₹1,999</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-500" />
              <span>30-Day Easy Return</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-500" />
              <span>100% Vegan & Cruelty Free</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span>Dermatologist Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Details, Ingredients, How to Use */}
      <div className="bg-white dark:bg-[#16221F] rounded-3xl p-6 lg:p-8 border border-rose-100 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-6 border-b border-rose-100 dark:border-white/10 pb-4 mb-6 overflow-x-auto">
          {['description', 'ingredients', 'howToUse'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs sm:text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-rose-500 text-rose-500'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'description' && 'Key Benefits'}
              {tab === 'ingredients' && 'Ingredients Breakdown'}
              {tab === 'howToUse' && 'How to Use Ritual'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-rose-50/50 dark:bg-emeraldDark-900/50 rounded-2xl">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-1">Suitable Skin Types</h5>
                  <p className="text-xs text-rose-500 font-semibold">{product.skinType?.join(', ')}</p>
                </div>
                <div className="p-4 bg-rose-50/50 dark:bg-emeraldDark-900/50 rounded-2xl">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-1">Volume & Size</h5>
                  <p className="text-xs text-rose-500 font-semibold">{product.volume}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <p className="font-mono text-xs bg-gray-50 dark:bg-[#0B1513] p-4 rounded-2xl border border-gray-200 dark:border-white/10 leading-loose">
                {product.ingredients}
              </p>
              <p className="text-xs text-gray-400">
                Formulated without parabens, sulfates, phthalates, synthetic mineral oils, or artificial colorants.
              </p>
            </div>
          )}

          {activeTab === 'howToUse' && (
            <div className="space-y-3">
              <p className="p-4 bg-rose-50/50 dark:bg-emeraldDark-900/50 rounded-2xl border border-rose-100 dark:border-white/5">
                {product.howToUse}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bundle Module: Frequently Bought Together */}
      <FrequentlyBoughtTogether currentProduct={product} />

      {/* Customer Reviews Section */}
      <section id="reviews" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-extrabold text-2xl text-gray-900 dark:text-white">
              Customer Reviews ({reviewsList.length})
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={product.rating} reviewCount={reviewsList.length} />
            </div>
          </div>

          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <MessageSquare className="w-4 h-4" /> Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white dark:bg-[#16221F] rounded-3xl border border-rose-100 dark:border-white/10 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>
              <h5 className="font-serif font-bold text-sm text-gray-900 dark:text-white">
                {rev.title}
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {rev.comment}
              </p>
              <div className="pt-2 text-[11px] text-rose-500 font-semibold">
                — {rev.author} (Verified Purchase)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-rose-100 dark:border-white/10">
          <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-6">
            You Might Also Love
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        productName={product.name}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
};
