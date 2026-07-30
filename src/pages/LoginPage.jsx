import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth, DEMO_USER } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Logo } from '../components/common/Logo';

export const LoginPage = () => {
  const { login, loginAsDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      const msg = 'Please enter both email and password.';
      setErrorMessage(msg);
      addToast(msg, 'warning');
      return;
    }

    const isMinLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_+\-=\[\]\\\/;']/.test(password);

    if (!isMinLength || !hasSpecialChar) {
      const msg = 'Password must be strong: minimum 8 characters including at least one special character (!@#$%^&*).';
      setErrorMessage(msg);
      addToast(msg, 'warning', 'Weak Password Format');
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setErrorMessage(result.message);
      addToast(result.message, 'error', 'Sign In Failed');
      return;
    }

    addToast(`Welcome back, ${result.user.firstName}! You have successfully signed in.`, 'success', 'Signed In');
    navigate(redirect);
  };

  const handleDemoLogin = () => {
    setErrorMessage('');
    const demo = loginAsDemo();
    addToast(`Signed in as demo user (${demo.name})!`, 'success', 'Demo Login Successful');
    navigate(redirect);
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-[#0C1733] rounded-3xl p-8 border border-blue-200/80 dark:border-blue-800/40 shadow-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Link to="/">
            <Logo size="lg" />
          </Link>
          <h1 className="font-serif font-extrabold text-3xl text-gray-900 dark:text-white pt-1">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {redirect === '/checkout'
              ? 'Please sign in to your account to complete your smooth checkout.'
              : 'Sign in to access your saved wishlist, rewards, and order history.'}
          </p>
        </div>

        {/* Inline Error Alert if User Not Found or Invalid Credentials */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs space-y-2 animate-shake">
            <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Authentication Error</span>
            </div>
            <p className="text-rose-600 dark:text-rose-200 font-semibold leading-relaxed">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-2xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-2xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-400"
              />
              <span>Remember Me</span>
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('Password reset link sent to your email (demo mode).', 'info'); }} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 border border-blue-400/30"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-blue-100 dark:border-blue-900/40 text-center text-xs text-gray-600 dark:text-gray-400">
          Don't have an account yet?{' '}
          <Link
            to={`/signup${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Create an Account →
          </Link>
        </div>
      </div>
    </div>
  );
};
