import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  Sun,
  Moon,
  Sparkles,
  Menu,
  X,
  ArrowRightLeft,
  Award,
  User,
  LogOut,
  ChevronDown,
  CheckCircle2,
  CreditCard
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { SearchModal } from './SearchModal';

export const Header = () => {
  const { cart, setIsCartDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const { compareItems } = useCompare();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    addToast('You have been signed out successfully.', 'info', 'Logged Out');
    navigate('/');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Beauty Quiz ✨', path: '/quiz' },
    { name: 'Compare', path: '/compare', badge: compareItems.length > 0 ? compareItems.length : null },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>FREE EXPRESS SHIPPING OVER ₹1,999 • USE CODE <strong className="underline underline-offset-2">GLOW20</strong> FOR 20% OFF</span>
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Main Navbar */}
        <nav
          className={`px-4 lg:px-8 py-3.5 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/85 dark:bg-[#0B1513]/85 backdrop-blur-md shadow-lg border-b border-rose-100/50 dark:border-white/10'
              : 'bg-white/40 dark:bg-[#0B1513]/40 backdrop-blur-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-champagne-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-xl lg:text-2xl tracking-wider text-gray-900 dark:text-white uppercase leading-none">
                  PR<span className="text-rose-500">.BeautyCare</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-rose-500 dark:text-rose-400 font-bold">
                  Botanical Luxury
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-xs font-bold tracking-wider uppercase transition-colors hover:text-rose-500 ${
                      isActive
                        ? 'text-rose-500 font-extrabold'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-1 px-1.5 py-0.5 bg-champagne-500 text-white text-[9px] rounded-full">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-500 rounded-full animate-fade-in" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-emeraldDark-800 transition-all"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-emeraldDark-800 transition-all"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              {/* 1. Wishlist Link (Hidden on mobile to make room for Sign In / Profile) */}
              <Link
                to="/wishlist"
                className="hidden sm:flex relative p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-emeraldDark-800 transition-all"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* 2. Cart Drawer Trigger (Hidden on mobile to make room for Sign In) */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="hidden sm:inline-flex relative p-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 transition-all items-center justify-center active:scale-95"
                title="Cart Drawer"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-amber-950 text-[11px] font-extrabold flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* 3. User Authentication Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border border-rose-200 dark:border-white/10 hover:border-rose-400 bg-white/60 dark:bg-[#16221F]/60 backdrop-blur-md shadow-sm transition-all"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-7 h-7 rounded-full object-cover border border-rose-300"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                        {currentUser.firstName?.[0] || 'U'}
                      </div>
                    )}
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-100 hidden sm:inline truncate max-w-[100px]">
                      {currentUser.firstName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#16221F] rounded-2xl shadow-2xl border border-rose-100 dark:border-white/10 p-3 z-50 animate-fade-in space-y-2">
                      <div className="p-2 border-b border-rose-100 dark:border-white/10">
                        <p className="font-serif font-bold text-sm text-gray-900 dark:text-white truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      <div className="text-xs space-y-1">
                        <button
                          onClick={() => {
                            setIsCartDrawerOpen(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-emeraldDark-800 text-gray-700 dark:text-gray-200 font-semibold text-left"
                        >
                          <span>My Shopping Cart</span>
                          {totalCartCount > 0 && (
                            <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                              {totalCartCount}
                            </span>
                          )}
                        </button>

                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-emeraldDark-800 text-gray-700 dark:text-gray-200 font-semibold"
                        >
                          <span>My Wishlist ({wishlist.length})</span>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-rose-100 dark:border-white/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        >
                          <span>Sign Out</span>
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl bg-white/80 dark:bg-[#16221F]/80 hover:bg-rose-50 text-gray-800 dark:text-gray-100 text-xs font-bold border border-rose-200 dark:border-white/10 transition-all flex items-center gap-1.5 shadow-sm"
                  title="Sign In / Register"
                >
                  <User className="w-4 h-4 text-rose-500" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-[#12201D]/95 backdrop-blur-lg border-b border-rose-100 dark:border-white/10 px-6 py-4 animate-slide-down shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold tracking-wider uppercase text-gray-800 dark:text-gray-100 hover:text-rose-500 py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Smart Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
