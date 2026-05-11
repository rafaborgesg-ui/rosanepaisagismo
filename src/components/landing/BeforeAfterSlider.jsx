import React, { useState, useRef } from 'react';

export default function BeforeAfterSlider({ before, after, labelBefore = "Antes", labelAfter = "Depois" }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl cursor-col-resize select-none shadow-2xl"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <img 
        src={after} 
        alt="Depois" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Overlay with clip) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={before} 
          alt="Antes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {labelBefore}
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-[#276a4d]/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        {labelAfter}
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#276a4d]">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 border-t-2 border-l-2 border-[#276a4d] rotate-[-45deg]"></div>
            <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-[#276a4d] rotate-[45deg]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
