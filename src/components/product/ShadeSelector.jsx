import React from 'react';
import { Check } from 'lucide-react';

export const ShadeSelector = ({ shades, selectedShade, onSelectShade }) => {
  if (!shades || shades.length === 0) return null;

  return (
    <div className="space-y-3 my-6">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          Shade Variant: <strong className="text-blue-600 dark:text-blue-400 font-bold ml-1">{selectedShade?.name}</strong>
        </span>
        <span className="text-gray-400 font-medium">{shades.length} Shades Available</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {shades.map((shade, idx) => {
          const isSelected = selectedShade?.name === shade.name;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectShade(shade)}
              style={{ backgroundColor: shade.hex }}
              className={`relative w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-md transition-all flex items-center justify-center ${
                isSelected
                  ? 'ring-2 ring-blue-500 scale-110 shadow-lg'
                  : 'hover:scale-105 opacity-90 hover:opacity-100'
              }`}
              title={shade.name}
            >
              {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
