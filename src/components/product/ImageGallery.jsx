import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop';

export const ImageGallery = ({ images = [], name = '' }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [currentSrc, setCurrentSrc] = useState(images[0] || FALLBACK_IMAGE);

  React.useEffect(() => {
    setCurrentSrc(images[activeImage] || FALLBACK_IMAGE);
  }, [activeImage, images]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image Frame with Zoom */}
      <div
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-square w-full rounded-3xl overflow-hidden bg-blue-50/50 dark:bg-[#070E20]/50 border border-blue-200/80 dark:border-blue-800/40 shadow-lg cursor-crosshair group"
      >
        <img
          src={currentSrc}
          alt={name}
          onError={() => setCurrentSrc(FALLBACK_IMAGE)}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isZoomed ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Zoom Lens Lens Overlay */}
        {isZoomed && (
          <div
            style={{
              backgroundImage: `url(${currentSrc})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '220%',
            }}
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200"
          />
        )}

        <div className="absolute top-4 right-4 pointer-events-none p-2 rounded-full bg-white/70 dark:bg-black/50 text-gray-700 dark:text-gray-200 backdrop-blur-md opacity-70 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                activeImage === idx
                  ? 'border-blue-600 dark:border-blue-400 scale-105 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
