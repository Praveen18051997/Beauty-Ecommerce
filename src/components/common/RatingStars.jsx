import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewCount = 0, size = 'sm', showCount = true }) => {
  const starSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const currentSize = starSizes[size] || starSizes.sm;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = rating >= star;
          const isHalf = rating >= star - 0.5 && rating < star;

          return (
            <Star
              key={star}
              className={`${currentSize} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
          {rating.toFixed(1)} {reviewCount > 0 && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
};
