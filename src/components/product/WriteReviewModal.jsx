import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const WriteReviewModal = ({ isOpen, onClose, productName, onSubmitReview }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !comment || !name) {
      addToast('Please fill in all review fields.', 'warning');
      return;
    }

    const newReview = {
      id: Date.now(),
      author: name,
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      title,
      comment,
    };

    onSubmitReview(newReview);
    addToast('Thank you! Your product review has been published.', 'success', 'Review Submitted');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#16221F] rounded-3xl shadow-2xl p-6 sm:p-8 border border-rose-100 dark:border-white/10 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-emeraldDark-800"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-1">
          Write a Customer Review
        </h3>
        <p className="text-xs text-rose-500 font-semibold mb-6">for {productName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      rating >= star ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Jessica M."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0B1513] border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Review Title
            </label>
            <input
              type="text"
              placeholder="e.g. Incredible hydration & glow!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0B1513] border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Detailed Review
            </label>
            <textarea
              rows={4}
              placeholder="How did the formula feel on your skin? Did it meet your expectations?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0B1513] border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white outline-none focus:border-rose-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all mt-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};
