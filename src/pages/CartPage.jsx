import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Tag, Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    estimatedTax,
    grandTotal,
    freeShippingNeeded,
    freeShippingProgress,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const crossSells = products.filter((p) => !cart.some((c) => c.id === p.id)).slice(0, 4);

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <ShoppingBag className="w-4 h-4" /> Review Your Selection
        </span>
        <h1 className="font-serif font-extrabold text-4xl text-gray-900 dark:text-white">
          Your Beauty Cart
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#16221F] rounded-3xl border border-rose-100 dark:border-white/10 p-8 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-emeraldDark-800 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-2">
            Your shopping cart is currently empty
          </h3>
          <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
            Discover our bestselling botanical serums, velvet liquid lipsticks, and Gua Sha tools.
          </p>
          <Link
            to="/shop"
            className="py-4 px-8 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all inline-block"
          >
            Start Shopping Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress */}
            <div className="p-4 bg-rose-50/70 dark:bg-emeraldDark-900/60 rounded-2xl border border-rose-100 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-rose-500" />
                  {freeShippingNeeded > 0 ? (
                    <>Add <strong className="text-rose-500">₹{freeShippingNeeded.toFixed(2)}</strong> more for FREE Shipping</>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">You unlocked FREE Standard Shipping! 🎉</span>
                  )}
                </span>
              </div>
              <div className="w-full bg-rose-200/50 dark:bg-emeraldDark-800 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${freeShippingProgress}%` }}
                  className="bg-gradient-to-r from-rose-400 to-rose-600 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Cart Table Container */}
            <div className="bg-white dark:bg-[#16221F] rounded-3xl border border-rose-100 dark:border-white/10 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-rose-100 dark:border-white/10 hidden sm:grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <div className="divide-y divide-rose-100 dark:divide-white/5 p-4 sm:p-6">
                {cart.map((item) => (
                  <div
                    key={item.cartKey}
                    className="py-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
                  >
                    {/* Item details */}
                    <div className="sm:col-span-6 flex items-center gap-4 w-full">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                        }}
                        className="w-20 h-20 rounded-2xl object-cover border border-rose-100 dark:border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-rose-500">
                          {item.brand}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        {item.selectedShade && (
                          <span className="text-xs text-gray-500 block">
                            Shade: <strong className="text-rose-500">{item.selectedShade.name}</strong>
                          </span>
                        )}
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          ₹{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantitychanger */}
                    <div className="sm:col-span-3 flex items-center justify-center gap-2">
                      <div className="flex items-center bg-gray-100 dark:bg-emeraldDark-800 rounded-xl p-1 border border-gray-200 dark:border-white/10">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#16221F]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#16221F]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-gray-400 hover:text-rose-500 p-2 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="sm:col-span-3 text-right w-full sm:w-auto">
                      <span className="font-bold text-base text-gray-900 dark:text-white">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-[#16221F] rounded-3xl p-6 border border-rose-100 dark:border-white/10 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white pb-4 border-b border-rose-100 dark:border-white/10">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-rose-500" /> Have a Coupon Code?
                </label>

                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                        Code: {appliedCoupon.code}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        {appliedCoupon.description}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-500 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try GLOW20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#0B1513] border border-gray-200 dark:border-white/10 rounded-xl text-xs outline-none uppercase focus:border-rose-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-rose-100 dark:border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-500 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-500">FREE</strong> : `₹${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>₹{estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-rose-100 dark:border-white/10 flex justify-between items-baseline text-sm font-bold text-gray-900 dark:text-white">
                  <span>Estimated Total</span>
                  <span className="text-2xl font-extrabold text-rose-500">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {crossSells.length > 0 && (
        <section className="pt-10 border-t border-rose-100 dark:border-white/10">
          <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-6">
            Recommended Add-Ons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crossSells.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
