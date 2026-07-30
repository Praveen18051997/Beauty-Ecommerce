import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const heroSlides = [
  {
    title: 'Radiance Reimagined',
    subtitle: 'Nourish your skin barrier with 100% cold-pressed organic rosewater & multi-weight hyaluronic acid.',
    tag: 'HYDRATION BREAKTHROUGH',
    buttonText: 'Shop Serum Collection',
    link: '/shop?category=skincare',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1400&auto=format&fit=crop',
    badge: '★ 4.9 Rating (328+ Reviews)',
  },
  {
    title: 'Velvet Liquid Couture',
    subtitle: '16-hour weightless transfer-proof liquid lipsticks enriched with Vitamin E and Jojoba elixir.',
    tag: 'NEW MAKEUP DROP',
    buttonText: 'Discover Lip Shades',
    link: '/shop?category=makeup',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop',
    badge: '100% Transfer-Proof',
  },
  {
    title: 'Midnight Botanical Floral',
    subtitle: 'Sensual oriental aromas opening with Damask Rose, Black Cherry, and warm Vanilla Bean.',
    tag: 'SIGNATURE FRAGRANCE',
    buttonText: 'Explore Perfumes',
    link: '/shop?category=fragrance',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1400&auto=format&fit=crop',
    badge: 'Long-lasting 24H Aura',
  },
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#F8FAFC] dark:bg-[#050A18]">
      {/* Background Glow Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-cyan-400/20 dark:bg-cyan-900/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-6 space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 dark:bg-[#070E20] border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
            <span>{slide.tag}</span>
          </div>

          <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-[1.1] tracking-tight">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={slide.link}
              className="py-4 px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2 active:scale-95 border border-blue-400/30"
            >
              <span>{slide.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/quiz"
              className="py-4 px-8 bg-white/90 dark:bg-[#0C1733]/90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white text-gray-900 dark:text-white font-extrabold rounded-2xl text-xs sm:text-sm uppercase tracking-wider border-2 border-blue-300 dark:border-blue-700/60 shadow-md transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Take Beauty Quiz</span>
            </Link>
          </div>

          {/* Social Proof Badge */}
          <div className="pt-6 border-t border-blue-100 dark:border-blue-900/40 flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Dermatologist Tested</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <Heart className="w-4 h-4 text-blue-600 fill-blue-600 dark:text-blue-400 dark:fill-blue-400" />
              <span>100% Cruelty-Free</span>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 dark:border-white/10">
            <img
              src={slide.image}
              alt={slide.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
              }}
              className="w-full h-full object-cover object-center transition-all duration-1000 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Floating Glass Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                  FEATURED LUXURY ESSENTIAL
                </span>
                <h4 className="font-serif font-bold text-base text-gray-900 dark:text-white">
                  {slide.title}
                </h4>
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs rounded-full shadow-sm shrink-0 border border-blue-400/30">
                {slide.badge}
              </span>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'w-8 bg-blue-600 dark:bg-blue-400'
                    : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
