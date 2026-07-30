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
import { Logo } from './Logo';

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
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>FREE EXPRESS SHIPPING OVER ₹1,999 • USE CODE <strong className="underline underline-offset-2">PR30</strong> FOR 30% OFF</span>
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Main Navbar */}
        <nav
          className={`px-4 lg:px-8 py-3.5 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/90 dark:bg-[#070E20]/90 backdrop-blur-md shadow-lg border-b border-blue-200/60 dark:border-blue-800/40'
              : 'bg-white/40 dark:bg-[#070E20]/40 backdrop-blur-sm'
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
            <Link to="/">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-xs font-bold tracking-wider uppercase transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-1 px-1.5 py-0.5 bg-cyan-500 text-white text-[9px] font-bold rounded-full">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full animate-fade-in" />
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
                className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-[#070E20] transition-all"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-[#070E20] transition-all"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              {/* 1. Wishlist Link (Hidden on mobile to make room for Sign In / Profile) */}
              <Link
                to="/wishlist"
                className="hidden sm:flex relative p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-[#070E20] transition-all"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* 2. Cart Drawer Trigger (Hidden on mobile to make room for Sign In) */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="hidden sm:inline-flex relative p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 transition-all items-center justify-center active:scale-95"
                title="Cart Drawer"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 text-cyan-950 text-[11px] font-extrabold flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* 3. User Authentication Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border border-blue-200 dark:border-blue-800/40 hover:border-blue-400 bg-white/80 dark:bg-[#0C1733]/80 backdrop-blur-md shadow-sm transition-all"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        className="w-7 h-7 rounded-full object-cover border border-blue-300"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center">
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
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0C1733] rounded-2xl shadow-2xl border border-blue-100 dark:border-blue-800/40 p-3 z-50 animate-fade-in space-y-2">
                      <div className="p-2 border-b border-blue-100 dark:border-blue-900/40">
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
                          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-[#070E20] text-gray-700 dark:text-gray-200 font-semibold text-left"
                        >
                          <span>My Shopping Cart</span>
                          {totalCartCount > 0 && (
                            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                              {totalCartCount}
                            </span>
                          )}
                        </button>

                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-[#070E20] text-gray-700 dark:text-gray-200 font-semibold"
                        >
                          <span>My Wishlist ({wishlist.length})</span>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-blue-100 dark:border-blue-900/40">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-[#070E20] transition-colors"
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
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold border border-blue-400/40 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  title="Sign In / Register"
                >
                  <User className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-[#0C1733]/95 backdrop-blur-lg border-b border-blue-200/80 dark:border-blue-800/40 px-6 py-4 animate-slide-down shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold tracking-wider uppercase text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 py-1"
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
