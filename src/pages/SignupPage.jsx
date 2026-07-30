import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, User, Phone, MapPin, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Logo } from '../components/common/Logo';

export const SignupPage = () => {
  const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isMinLength = formData.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_+\-=\[\]\\\/;']/.test(formData.password);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      const msg = 'Please complete all required fields.';
      setErrorMessage(msg);
      addToast(msg, 'warning');
      return;
    }

    if (!isMinLength || !hasSpecialChar) {
      const msg = 'Password must be strong: at least 8 characters including at least one special character.';
      setErrorMessage(msg);
      addToast(msg, 'warning', 'Weak Password');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const msg = 'Passwords do not match. Please check and try again.';
      setErrorMessage(msg);
      addToast(msg, 'error');
      return;
    }

    const result = signup(formData);

    if (!result.success) {
      setErrorMessage(result.message);
      addToast(result.message, 'error', 'Signup Failed');
      return;
    }

    addToast(`Welcome to PR Lounge, ${formData.firstName}! Account created successfully.`, 'success', 'Account Created');
    navigate(redirect);
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-white dark:bg-[#0C1733] rounded-3xl p-8 border border-blue-200/80 dark:border-blue-800/40 shadow-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Link to="/">
            <Logo size="lg" />
          </Link>
          <h1 className="font-serif font-extrabold text-3xl text-gray-900 dark:text-white pt-1">
            Create Your Account
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {redirect === '/checkout'
              ? 'Sign up in seconds to complete your order and unlock express checkout.'
              : 'Join over 45,000 beauty lovers for exclusive luxury rewards and early drops.'}
          </p>
        </div>

        {/* Inline Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs space-y-2 animate-shake">
            <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Signup Error</span>
            </div>
            <p className="text-rose-600 dark:text-rose-200 font-semibold leading-relaxed">
              {errorMessage}
            </p>
            {errorMessage.includes('already exists') && (
              <div className="pt-1">
                <Link
                  to={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 dark:text-blue-300 hover:underline"
                >
                  Sign In with Existing Account →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                First Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Strong Password Requirements Indicator */}
          <div className="p-3 bg-blue-50/70 dark:bg-[#070E20] rounded-xl border border-blue-100 dark:border-blue-800/40 text-[11px] space-y-1.5">
            <div className="font-semibold text-gray-700 dark:text-gray-300">Strong Password Checklist:</div>
            <div className="flex items-center gap-1.5">
              {isMinLength ? (
                <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 font-bold" />
              ) : (
                <X className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span className={isMinLength ? 'text-cyan-700 dark:text-cyan-300 font-bold' : 'text-gray-500'}>
                Minimum 8 characters ({formData.password.length}/8)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {hasSpecialChar ? (
                <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 font-bold" />
              ) : (
                <X className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span className={hasSpecialChar ? 'text-cyan-700 dark:text-cyan-300 font-bold' : 'text-gray-500'}>
                Include at least 1 special character (!@#$%^&*)
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 border border-blue-400/30"
          >
            <span>Create Account & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-blue-100 dark:border-blue-900/40 text-center text-xs text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Sign In Here →
          </Link>
        </div>
      </div>
    </div>
  );
};
