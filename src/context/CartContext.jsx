import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

const VALID_COUPONS = {
  PR30: { discountPercent: 30, description: '30% Off Your Entire Order' },
  BEAUTY15: { discountPercent: 15, description: '15% Off Beauty Favorites' },
  FREESHIP: { discountPercent: 0, freeShipping: true, description: 'Free Standard Express Shipping' },
};

const FREE_SHIPPING_THRESHOLD = 1999.00;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('aura_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (product, quantity = 1, selectedShade = null) => {
    const itemKey = selectedShade ? `${product.id}-${selectedShade.name}` : product.id;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            cartKey: itemKey,
            selectedShade: selectedShade,
            quantity,
          },
        ];
      }
    });

    addToast(
      `${quantity}x ${product.name} ${selectedShade ? `(${selectedShade.name})` : ''} added to your cart.`,
      'success',
      'Added to Cart'
    );
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();
    if (VALID_COUPONS[formatted]) {
      setAppliedCoupon({ code: formatted, ...VALID_COUPONS[formatted] });
      addToast(`Coupon "${formatted}" applied successfully!`, 'success', 'Promo Applied');
      return { success: true, message: 'Coupon applied!' };
    } else {
      addToast('Invalid coupon code. Try "PR30" or "BEAUTY15"', 'error', 'Invalid Code');
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon code removed', 'info');
  };

  const addRecentlyViewed = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, 8); // Keep top 8
    });
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || !appliedCoupon.discountPercent) return 0;
    return (subtotal * appliedCoupon.discountPercent) / 100;
  }, [subtotal, appliedCoupon]);

  const rawShippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || (appliedCoupon && appliedCoupon.freeShipping) ? 0 : 149.00;
  const shippingFee = cart.length === 0 ? 0 : rawShippingFee;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);
  const freeShippingNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        estimatedTax,
        grandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingNeeded,
        freeShippingProgress,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
