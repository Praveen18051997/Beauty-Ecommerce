import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List, X, Search, Sparkles, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { categories, skinTypes, brands } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMax, setPriceMax] = useState(4000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleSkinTypeToggle = (type) => {
    if (type === 'All Skin Types') {
      setSelectedSkinTypes([]);
      return;
    }
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSkinTypes([]);
    setSelectedBrands([]);
    setPriceMax(4000);
    setMinRating(0);
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter Algorithm
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat) return false;
        }

        // Skin Type Filter
        if (selectedSkinTypes.length > 0) {
          const hasMatchingType = p.skinType?.some((st) => selectedSkinTypes.includes(st));
          if (!hasMatchingType) return false;
        }

        // Brand Filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

        // Price Filter
        if (p.price > priceMax) return false;

        // Rating Filter
        if (p.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.isNewArrival ? -1 : 1;
        return 0; // Default Featured
      });
  }, [
    selectedCategory,
    searchQuery,
    selectedSkinTypes,
    selectedBrands,
    priceMax,
    minRating,
    sortBy,
  ]);

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Botanical Luxury Boutique
        </span>
        <h1 className="font-serif font-extrabold text-4xl sm:text-5xl text-gray-900 dark:text-white capitalize">
          {selectedCategory === 'all' ? 'All Beauty Products' : `${selectedCategory} Collection`}
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Discover clinical-grade serums, rich body butter, rose quartz massage tools, and long-wearing cosmetics.
        </p>
      </div>

      {/* Categories Horizontal Selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setSearchParams({});
          }}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white dark:bg-[#16221F] text-gray-700 dark:text-gray-300 border border-rose-100 dark:border-white/10 hover:border-rose-300'
          }`}
        >
          All Categories ({products.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSearchParams({ category: cat.id });
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white dark:bg-[#16221F] text-gray-700 dark:text-gray-300 border border-rose-100 dark:border-white/10 hover:border-rose-300'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white dark:bg-[#16221F] p-6 rounded-3xl border border-rose-100 dark:border-white/10 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-white/10">
            <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-rose-500" /> Filters
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-500 hover:underline font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search inside shop */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name, ingredient, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-[#0B1513] border border-gray-200 dark:border-white/10 rounded-xl text-xs outline-none focus:border-rose-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Skin Type Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Skin Type
            </h4>
            <div className="space-y-2">
              {skinTypes.map((st) => (
                <label
                  key={st}
                  className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer hover:text-rose-500"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkinTypes.includes(st)}
                    onChange={() => handleSkinTypeToggle(st)}
                    className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400 border-gray-300"
                  />
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Brand
            </h4>
            <div className="space-y-2">
              {brands.map((b) => (
                <label
                  key={b}
                  className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer hover:text-rose-500"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => handleBrandToggle(b)}
                    className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400 border-gray-300"
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-gray-900 dark:text-white uppercase tracking-wider">Max Price</span>
              <span className="text-rose-500">₹{priceMax}</span>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>

          {/* Min Rating Filter */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
              Minimum Rating
            </h4>
            <div className="flex items-center gap-2">
              {[0, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    minRating === r
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}+ ★`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Grid Section */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Bar Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#16221F] p-4 rounded-2xl border border-rose-100 dark:border-white/10 shadow-sm">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden w-full sm:w-auto py-2 px-4 bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" /> Filter Options
            </button>

            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              Showing <strong className="text-rose-500">{filteredProducts.length}</strong> beauty products
            </span>

            {/* Sorting & Layout Switcher */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-[#0B1513] border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200 outline-none focus:border-rose-500"
              >
                <option value="featured">Sort by Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>

              <div className="flex items-center bg-gray-100 dark:bg-emeraldDark-800 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-[#16221F] text-rose-500 shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-[#16221F] text-rose-500 shadow-sm'
                      : 'text-gray-400'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedSkinTypes.length > 0 || selectedBrands.length > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">Active Filters:</span>
              {selectedSkinTypes.map((st) => (
                <span
                  key={st}
                  onClick={() => handleSkinTypeToggle(st)}
                  className="px-2.5 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-rose-200"
                >
                  {st} <X className="w-3 h-3" />
                </span>
              ))}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  onClick={() => handleBrandToggle(b)}
                  className="px-2.5 py-1 bg-champagne-100 dark:bg-champagne-950/60 text-champagne-800 dark:text-champagne-200 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-champagne-200"
                >
                  {b} <X className="w-3 h-3" />
                </span>
              ))}
            </div>
          )}

          {/* Products View */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#16221F] rounded-3xl border border-rose-100 dark:border-white/10 p-8">
              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-2">
                No products match your filter criteria
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Try widening your price range or clearing selected skin type tags.
              </p>
              <button
                onClick={clearAllFilters}
                className="py-3 px-6 bg-rose-500 text-white font-semibold rounded-2xl text-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}

          {/* Load More Pagination */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="py-3.5 px-8 bg-white dark:bg-[#16221F] hover:bg-rose-500 hover:text-white text-gray-900 dark:text-white font-bold rounded-2xl text-xs uppercase tracking-wider border border-rose-200 dark:border-white/10 shadow-md transition-all"
              >
                Load More Products ({filteredProducts.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </main>
      </div>

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
