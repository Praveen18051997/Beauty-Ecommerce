import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MiniCartDrawer } from './components/cart/MiniCartDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { BeautyQuizPage } from './pages/BeautyQuizPage';
import { ComparePage } from './pages/ComparePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Scroll to Top helper on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                  <ScrollToTop />
                  <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F5] dark:bg-[#0B1513] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
                    <Header />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ProductListingPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                        <Route path="/quiz" element={<BeautyQuizPage />} />
                        <Route path="/compare" element={<ComparePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                      </Routes>
                    </main>
                    <Footer />
                    <MiniCartDrawer />
                    <ToastContainer />
                  </div>
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
