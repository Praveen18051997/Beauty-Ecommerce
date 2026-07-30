import React from 'react';

export const Logo = ({ size = 'md', showText = true, variant = 'blue', className = '' }) => {
  const sizes = {
    sm: {
      img: 'h-7',
      title: 'text-base',
      sub: 'text-[8px] tracking-[0.2em]',
      gap: 'gap-2',
    },
    md: {
      img: 'h-9 sm:h-10',
      title: 'text-xl lg:text-2xl',
      sub: 'text-[9px] tracking-[0.25em]',
      gap: 'gap-2.5',
    },
    lg: {
      img: 'h-14 sm:h-16',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-[10px] tracking-[0.3em]',
      gap: 'gap-3.5',
    },
  };

  const current = sizes[size] || sizes.md;
  const logoSrc = variant === 'black' ? '/pr-logo-black.svg' : '/pr-logo-blue.svg';

  return (
    <div className={`flex items-center ${current.gap} group ${className}`}>
      {/* Geometric Hexagon PR Lounge Logo */}
      <img
        src={logoSrc}
        alt="PR Lounge Logo"
        className={`${current.img} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm dark:brightness-110`}
      />

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-black tracking-wider text-gray-900 dark:text-white uppercase leading-none ${current.title}`}>
            PR <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-500 bg-clip-text text-transparent font-extrabold">LOUNGE</span>
          </span>
          <span className={`uppercase text-blue-600 dark:text-blue-400 font-extrabold mt-0.5 ${current.sub}`}>
            Botanical Luxury
          </span>
        </div>
      )}
    </div>
  );
};
