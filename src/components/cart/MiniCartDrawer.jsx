import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MiniCartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    subtotal,
    freeShippingNeeded,
    freeShippingProgress,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:max-w-md bg-white dark:bg-[#0C1733] shadow-2xl flex flex-col justify-between border-l border-blue-200/80 dark:border-blue-800/40 animate-slide-up">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                Your Beauty Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-[#070E20]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-4 sm:px-6 py-3 bg-blue-50/70 dark:bg-[#070E20]/70 border-b border-blue-100 dark:border-blue-900/40">
            <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 font-semibold mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {freeShippingNeeded > 0 ? (
                  <>Add <span className="text-blue-600 dark:text-blue-400">₹{freeShippingNeeded.toFixed(2)}</span> for FREE Shipping</>
                ) : (
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">You unlocked FREE Standard Shipping! 🎉</span>
                )}
              </span>
            </div>
            <div className="w-full bg-blue-200/50 dark:bg-[#0C1733] h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${freeShippingProgress}%` }}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 h-full rounded-full transition-all duration-500 shadow-sm"
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-blue-100 dark:divide-blue-900/40">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-[#070E20] flex items-center justify-center mb-4 text-blue-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-2">
                  Your cart is currently empty
                </h4>
                <p className="text-xs text-gray-500 mb-6 max-w-xs">
                  Discover luxury botanical serums, velvety lipsticks, and nourishing body oils.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="py-3 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-blue-500/25 transition-all border border-blue-400/30 active:scale-95"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartKey} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-16 h-16 rounded-2xl object-cover border border-blue-100 dark:border-blue-800/40 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h5>
                    {item.selectedShade && (
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium block">
                        Shade: {item.selectedShade.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-500 block mb-2">
                      ₹{item.price.toFixed(2)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-gray-100 dark:bg-[#070E20] rounded-lg p-0.5 border border-gray-200 dark:border-blue-800/40">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="w-6 h-6 rounded text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-[#0C1733]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="w-6 h-6 rounded text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-[#0C1733]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-gray-400 hover:text-blue-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-blue-100 dark:border-blue-900/40 bg-blue-50/30 dark:bg-[#070E20]/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Subtotal</span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">
                Taxes and shipping calculated at checkout. Use code <strong className="text-blue-600 dark:text-blue-400">PR30</strong> for 30% off!
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 border border-blue-400/30 active:scale-95"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-white dark:bg-[#070E20] text-gray-700 dark:text-gray-200 font-extrabold rounded-2xl text-xs border-2 border-blue-300 dark:border-blue-700/60 hover:bg-blue-50 dark:hover:bg-[#0C1733] transition-all text-center"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
