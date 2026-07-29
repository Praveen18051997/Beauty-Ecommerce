import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ShieldCheck, Truck, RefreshCw, Leaf, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    addToast(`Thank you for subscribing! Your 20% discount code is GLOW20.`, 'success', 'Welcome to PR.BeautyCare!');
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-rose-50/50 to-rose-100/60 dark:from-[#0B1513] dark:to-[#070D0C] border-t border-rose-100 dark:border-white/5 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Value Propositions Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-rose-200/60 dark:border-white/10 mb-12">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#16221F]/70 border border-rose-100 dark:border-white/5">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-gray-900 dark:text-white">Free Worldwide Express</h5>
              <p className="text-xs text-gray-500">On all orders over ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#16221F]/70 border border-rose-100 dark:border-white/5">
            <div className="w-12 h-12 rounded-xl bg-champagne-100 dark:bg-champagne-950/60 text-champagne-600 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-gray-900 dark:text-white">100% Organic & Vegan</h5>
              <p className="text-xs text-gray-500">Cruelty-free botanical formulas</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#16221F]/70 border border-rose-100 dark:border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-gray-900 dark:text-white">30-Day Money Back</h5>
              <p className="text-xs text-gray-500">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#16221F]/70 border border-rose-100 dark:border-white/5">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-sm text-gray-900 dark:text-white">Dermatologist Approved</h5>
              <p className="text-xs text-gray-500">Formulated for delicate skin</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-champagne-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <span className="font-serif font-extrabold text-2xl tracking-wider text-gray-900 dark:text-white uppercase">
                PR<span className="text-rose-500">.BeautyCare</span>
              </span>
            </Link>
            <p className="text-xs text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              Crafting science-backed botanical skincare, silky weightless cosmetics, and indulgent body elixirs for your daily self-care ritual.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white dark:bg-[#16221F] border border-rose-100 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-rose-500 hover:border-rose-300 transition-all flex items-center justify-center shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/shop?category=skincare" className="hover:text-rose-500 transition-colors">Skincare Elixirs</Link></li>
              <li><Link to="/shop?category=makeup" className="hover:text-rose-500 transition-colors">Velvet Cosmetics</Link></li>
              <li><Link to="/shop?category=haircare" className="hover:text-rose-500 transition-colors">Botanical Haircare</Link></li>
              <li><Link to="/shop?category=fragrance" className="hover:text-rose-500 transition-colors">Sensual Fragrances</Link></li>
              <li><Link to="/quiz" className="hover:text-rose-500 transition-colors font-bold text-rose-500">Beauty Skin Quiz ✨</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li><Link to="/cart" className="hover:text-rose-500 transition-colors">My Cart & Drawer</Link></li>
              <li><Link to="/wishlist" className="hover:text-rose-500 transition-colors">Saved Wishlist</Link></li>
              <li><Link to="/compare" className="hover:text-rose-500 transition-colors">Product Comparison</Link></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Track Order Status</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Sustainability Commitment</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Join the Glow Club
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Subscribe to unlock <strong>20% off</strong> your first order + VIP early access to secret sales.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-[#16221F] border border-rose-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-rose-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl text-xs shadow-md shadow-rose-500/20 transition-all"
              >
                Claim 20% Discount
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-rose-200/60 dark:border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© 2026 PR.BEAUTYCARE BOTANICAL LUXURY BEAUTY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
