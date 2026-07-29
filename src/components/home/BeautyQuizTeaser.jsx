import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BeautyQuizTeaser = () => {
  return (
    <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 text-white p-8 lg:p-14 shadow-2xl">
        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Personalized Diagnostic Quiz</span>
            </div>

            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Not sure which product matches your skin type?
            </h2>

            <p className="text-sm sm:text-base text-rose-100 max-w-xl leading-relaxed">
              Take our 60-second interactive Beauty Quiz. Our AI skin diagnostic algorithm analyzes your skin concerns, environment, and fragrance preferences to build your custom daily glow regimen.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300" /> Tailored Skincare & Shade Match
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300" /> One-Click Add Regimen to Cart
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300" /> Instant 20% Discount Code
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300" /> Dermatologist Formulation Rules
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-3 py-4 px-8 bg-white hover:bg-amber-400 text-gray-900 font-extrabold rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Start Free Beauty Quiz Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Floating Card Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="w-8 h-8 fill-amber-950" />
              </div>
              <h4 className="font-serif font-bold text-xl text-white">Your Ideal Match Awaits</h4>
              <p className="text-xs text-rose-100">Over 14,000+ custom routines crafted this month.</p>
              <div className="p-3 bg-white/20 rounded-2xl text-xs font-semibold text-white flex items-center justify-center gap-2">
                <span>Diagnostic Accuracy Rate: 98.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
