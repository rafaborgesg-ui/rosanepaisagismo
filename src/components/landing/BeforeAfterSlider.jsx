import React, { useState, useRef } from 'react';
import { ChevronsLeftRight } from "lucide-react";

export default function BeforeAfterSlider({
  before,
  after,
  labelBefore = "Antes",
  labelAfter = "Depois",
  className = "",
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!isDragging) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  const startDrag = (e) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/3] overflow-hidden cursor-col-resize select-none bg-[#121411] md:aspect-[21/10] ${className}`}
      onMouseDown={startDrag}
      onMouseMove={handleMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={startDrag}
      onTouchMove={handleMove}
      onTouchEnd={stopDrag}
      role="img"
      aria-label={`${labelBefore} e ${labelAfter}`}
    >
      {/* After Image (Background) */}
      <img 
        src={after} 
        alt={labelAfter}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Overlay with clip) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={before} 
          alt={labelBefore}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_18px_rgba(0,0,0,0.45)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white shadow-[0_16px_40px_rgba(18,20,17,0.22)]">
          <ChevronsLeftRight className="h-5 w-5 text-[#163528]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
