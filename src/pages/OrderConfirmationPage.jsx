import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Printer, ArrowRight, Sparkles, Truck } from 'lucide-react';

export const OrderConfirmationPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem('aura_last_order');
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  if (!order) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-lg mx-auto text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">No Order Receipt Found</h2>
        <Link to="/" className="py-3 px-6 bg-rose-500 text-white font-bold text-xs rounded-xl inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Success Banner */}
      <div className="text-center bg-white dark:bg-[#16221F] p-8 sm:p-12 rounded-3xl border border-rose-100 dark:border-white/10 shadow-lg space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center mx-auto shadow-inner animate-pulse">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
          Order Confirmed & Processing
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
          Thank You for Your Order, {order.shippingDetails?.firstName}!
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          We’ve received your order <strong className="text-rose-500">{order.orderId}</strong> and are carefully preparing your luxury botanical beauty products.
        </p>

        <div className="inline-flex items-center gap-3 p-3 bg-rose-50 dark:bg-emeraldDark-900 rounded-2xl text-xs text-rose-700 dark:text-rose-300 font-semibold">
          <Truck className="w-4 h-4" /> Estimated Delivery: 3 - 5 Business Days
        </div>
      </div>

      {/* Printable Receipt Box */}
      <div className="bg-white dark:bg-[#16221F] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-white/10">
          <div>
            <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white">
              Order Receipt #{order.orderId}
            </h3>
            <span className="text-xs text-gray-400">Placed on {order.date}</span>
          </div>

          <button
            onClick={() => window.print()}
            className="py-2 px-4 bg-gray-100 dark:bg-emeraldDark-800 hover:bg-gray-200 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-xs flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600 dark:text-gray-300">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase mb-1">Shipping Details</h4>
            <p>{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</p>
            <p>{order.shippingDetails?.address}</p>
            <p>{order.shippingDetails?.city}, {order.shippingDetails?.state} {order.shippingDetails?.zip}</p>
            <p>{order.shippingDetails?.email}</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase mb-1">Payment Summary</h4>
            <p className="capitalize">Method: {order.paymentMethod}</p>
            <p className="text-rose-500 font-bold mt-1">Total Paid: ₹{order.grandTotal?.toFixed(2)}</p>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="divide-y divide-rose-100 dark:divide-white/5 pt-2">
          {order.items?.map((item) => (
            <div key={item.cartKey} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                  }}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white">{item.name}</h5>
                  {item.selectedShade && <span className="text-rose-500 text-[10px]">Shade: {item.selectedShade.name}</span>}
                  <span className="text-gray-400 block">Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/shop"
          className="py-4 px-8 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg inline-flex items-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
