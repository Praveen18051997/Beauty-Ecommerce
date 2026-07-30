import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const CheckoutPage = () => {
  const { cart, subtotal, discountAmount, shippingFee, estimatedTax, grandTotal, clearCart, appliedCoupon } = useCart();
  const { addToast } = useToast();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Authentication Guard: Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      addToast('Please sign in to proceed to checkout.', 'info', 'Authentication Required');
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate, addToast]);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateShippingForm = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zip.trim()
    ) {
      addToast('Please fill in all required shipping address fields to proceed!', 'warning', 'Fields Required');
      return false;
    }
    return true;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!validateShippingForm()) {
      setStep(1);
      return;
    }

    const orderReceipt = {
      orderId: `AG-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: cart,
      subtotal,
      discountAmount,
      shippingFee,
      estimatedTax,
      grandTotal,
      shippingDetails: formData,
      paymentMethod,
    };

    sessionStorage.setItem('aura_last_order', JSON.stringify(orderReceipt));
    clearCart();
    addToast('Order placed successfully! Redirecting to confirmation...', 'success', 'Order Confirmed');
    navigate('/order-confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-lg mx-auto text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">No items to checkout</h2>
        <p className="text-xs text-gray-500">Your cart is empty. Add products to proceed.</p>
        <button
          onClick={() => navigate('/shop')}
          className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs rounded-xl shadow-md border border-blue-400/30 active:scale-95 transition-all"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-md mx-auto">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
          <Lock className="w-4 h-4" /> 256-Bit Encrypted Secure Checkout
        </span>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
          Finalize Your Order
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-7 space-y-8">
          {/* Form Step Indicators */}
          <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-900/40 pb-4">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                step === 1 ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-gray-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
              1. Shipping & Contact
            </button>
            <button
              onClick={() => {
                if (validateShippingForm()) {
                  setStep(2);
                }
              }}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                step === 2 ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-gray-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
              2. Payment Method
            </button>
          </div>

          {/* Step 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="bg-white dark:bg-[#0C1733] p-6 sm:p-8 rounded-3xl border border-blue-200/80 dark:border-blue-800/40 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white mb-4">
                Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    First Name <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Last Name <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Email Address <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Street Address <span className="text-blue-600 dark:text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter house no., street name, area"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    City <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    State <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Zip Code <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="zip"
                    placeholder="Enter zip/PIN"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Delivery Option */}
              <div className="pt-4">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Delivery Option</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200/80 dark:border-blue-800/40 bg-gray-50 dark:bg-[#070E20] cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryOption === 'standard'}
                        onChange={() => setDeliveryOption('standard')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-gray-900 dark:text-white block">Standard Express Shipping</span>
                        <span className="text-[10px] text-gray-500">Delivered in 3-5 business days</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹149.00</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all mt-4 border border-blue-400/30 active:scale-95"
              >
                Continue to Payment →
              </button>
            </form>
          )}

          {/* Step 2: Payment Details */}
          {step === 2 && (
            <div className="bg-white dark:bg-[#0C1733] p-6 sm:p-8 rounded-3xl border border-blue-200/80 dark:border-blue-800/40 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white">
                Select Payment Method
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['card', 'paypal', 'applepay', 'upi'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`p-3 rounded-2xl border text-xs font-bold capitalize transition-all ${paymentMethod === m
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'border-blue-200/60 dark:border-blue-800/40 text-gray-600 dark:text-gray-300'
                      }`}
                  >
                    {m === 'card' && 'Credit Card'}
                    {m === 'paypal' && 'PayPal'}
                    {m === 'applepay' && 'Apple Pay'}
                    {m === 'upi' && 'UPI / Scan'}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                      <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">CVC Code</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-gray-50 dark:bg-[#070E20] border border-blue-200/80 dark:border-blue-800/40 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-4 px-6 bg-gray-100 dark:bg-[#070E20] text-gray-700 dark:text-gray-200 font-bold rounded-2xl text-xs uppercase"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all border border-blue-400/30 active:scale-95"
                >
                  Place Order (₹{grandTotal.toFixed(2)})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-[#0C1733] p-6 rounded-3xl border border-blue-200/80 dark:border-blue-800/40 shadow-sm space-y-4 sticky top-32">
            <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white pb-3 border-b border-blue-100 dark:border-blue-900/40">
              Order Items ({cart.length})
            </h3>

            <div className="divide-y divide-blue-100 dark:divide-blue-900/40 max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.cartKey} className="py-3 flex items-center gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.name}</h5>
                    <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 pt-3 border-t border-blue-100 dark:border-blue-900/40">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-blue-600 dark:text-blue-400 font-bold"><span>Discount</span><span>-₹{discountAmount.toFixed(2)}</span></div>
              )}
              <div className="flex justify-between"><span>Shipping</span><span>₹{shippingFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (8%)</span><span>₹{estimatedTax.toFixed(2)}</span></div>
              <div className="pt-2 border-t border-blue-100 dark:border-blue-900/40 flex justify-between items-baseline font-bold text-sm text-gray-900 dark:text-white">
                <span>Grand Total</span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
