import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophia Varghese',
    location: 'Los Angeles, CA',
    skinType: 'Dry & Sensitive Skin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    title: 'Transformative for my dry barrier!',
    review: 'The Celestial Dew Hyaluronic Serum completely saved my skin during winter. My face looks luminous and hydrated all day long without any heavy greasy feeling.',
    productBought: 'Celestial Dew Hyaluronic Acid Serum',
  },
  {
    name: 'Elena Rostova',
    location: 'New York, NY',
    skinType: 'Combination Skin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    title: 'Lipstick lasts through 3 meals!',
    review: 'I bought Velvet Mulberry liquid lip for a wedding. It didn’t smudge or transfer onto wine glasses. Extremely comfortable formulas.',
    productBought: 'Velvet Matte Liquid Lipstick',
  },
  {
    name: 'Camilla Fontana',
    location: 'Miami, FL',
    skinType: 'Normal Skin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    title: 'Compliments every single night!',
    review: 'Midnight Bloom perfume is so mysterious and alluring. Warm vanilla mixed with dark cherry. Shipping was lightning fast too!',
    productBought: 'Midnight Bloom Eau de Parfum',
  },
];

export const CustomerReviews = () => {
  return (
    <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4" /> Real Results & Verified Reviews
        </span>
        <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
          Loved by 45,000+ Beauty Lovers
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            4.9 / 5.0 Average Rating
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white dark:bg-[#16221F] border border-rose-100 dark:border-white/10 shadow-lg relative flex flex-col justify-between hover:-translate-y-1 transition-transform"
          >
            <Quote className="w-10 h-10 text-rose-200 dark:text-rose-900/40 absolute top-6 right-6 pointer-events-none" />

            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-2">
                "{t.title}"
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t.review}
              </p>
            </div>

            <div className="pt-4 border-t border-rose-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-rose-300"
                />
                <div>
                  <h5 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 text-white" />
                  </h5>
                  <span className="text-[10px] text-gray-400 block">{t.skinType}</span>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-2 py-1 rounded-md">
                Verified Buyer
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
