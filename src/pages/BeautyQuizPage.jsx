import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const BeautyQuizPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const currentQ = quizQuestions[currentStep];

  const handleSelectOption = (optionValue) => {
    const updated = { ...answers, [currentQ.id]: optionValue };
    setAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      addToast('Diagnostic complete! Building your custom botanical glow routine...', 'success', 'Quiz Finished');
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Diagnostic Regimen Recommendation Algorithm
  const recommendedRegimen = products.slice(0, 3);
  const bundleTotalPrice = recommendedRegimen.reduce((s, p) => s + p.price, 0);

  const handleAddAllToCart = () => {
    recommendedRegimen.forEach((p) => addToCart(p, 1));
    addToast('Custom Regimen added to your cart!', 'success');
    navigate('/cart');
  };

  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> AI Skin & Beauty Diagnostic
        </span>
        <h1 className="font-serif font-extrabold text-4xl text-gray-900 dark:text-white">
          Discover Your Custom Glow Routine
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Answer 4 quick questions to find your personalized botanical skincare & makeup regimen.
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white dark:bg-[#16221F] p-8 sm:p-12 rounded-3xl border border-rose-100 dark:border-white/10 shadow-xl space-y-8 animate-slide-up">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400">
              <span>Question {currentStep + 1} of {quizQuestions.length}</span>
              <span className="text-rose-500">{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-rose-100 dark:bg-emeraldDark-800 h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                className="bg-rose-500 h-full rounded-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">
              {currentQ.question}
            </h3>
            <p className="text-xs text-gray-500">{currentQ.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.value)}
                className="p-5 rounded-2xl border border-rose-100 dark:border-white/10 bg-gray-50/50 dark:bg-[#0B1513]/50 hover:bg-rose-50 dark:hover:bg-emeraldDark-800 hover:border-rose-300 text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif font-bold text-base text-gray-900 dark:text-white group-hover:text-rose-500">
                    {opt.label}
                  </h4>
                  <div className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-rose-500 group-hover:bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
                    →
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{opt.description}</p>
              </button>
            ))}
          </div>

          {/* Back button */}
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="text-xs font-bold text-gray-400 hover:text-gray-600"
            >
              ← Back to previous question
            </button>
          )}
        </div>
      ) : (
        /* Quiz Results Screen */
        <div className="bg-white dark:bg-[#16221F] p-8 sm:p-12 rounded-3xl border border-rose-100 dark:border-white/10 shadow-xl space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-8 h-8 fill-rose-500" />
            </div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block">
              Diagnostic Complete
            </span>
            <h2 className="font-serif font-extrabold text-3xl text-gray-900 dark:text-white">
              Your Tailored Glow Regimen
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Based on your answers ({answers[1]} skin type focusing on {answers[2]}), our formulation experts recommend this 3-step routine.
            </p>
          </div>

          {/* Recommended Products Bundle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedRegimen.map((product, idx) => (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-rose-50/50 dark:bg-emeraldDark-900/50 border border-rose-100 dark:border-white/5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-1">
                    Step {idx + 1}: {idx === 0 ? 'Hydrate & Plump' : idx === 1 ? 'Target & Balance' : 'Shine & Nourish'}
                  </span>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full aspect-square rounded-xl object-cover mb-2"
                  />
                  <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white line-clamp-1">
                    {product.name}
                  </h4>
                  <span className="text-xs font-bold text-rose-500">${product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2 bg-white dark:bg-[#16221F] hover:bg-rose-500 hover:text-white text-xs font-bold rounded-xl border border-rose-200 dark:border-white/10"
                >
                  Add Step {idx + 1}
                </button>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-rose-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 block">Total Routine Price:</span>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                ₹{bundleTotalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={resetQuiz}
                className="py-3 px-5 bg-gray-100 dark:bg-emeraldDark-800 text-gray-600 dark:text-gray-300 font-bold rounded-2xl text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Retake Quiz
              </button>
              <button
                onClick={handleAddAllToCart}
                className="flex-1 sm:flex-initial py-3.5 px-8 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add Full Regimen to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
