import React, { useState, useRef, useCallback } from 'react';

export default function BeforeAfterSlider({
  before,
  after,
  labelBefore = "Antes",
  labelAfter = "Depois",
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, raw)));
  }, []);

  const onMouseMove = (e) => { if (isDragging) updatePos(e.clientX); };
  const onTouchMove = (e) => updatePos(e.touches[0].clientX);
  const onMouseDown = (e) => { e.preventDefault(); setIsDragging(true); };
  const onMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-[28px] select-none shadow-2xl cursor-col-resize group"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After image */}
      <img src={after} alt={labelAfter} className="absolute inset-0 w-full h-full object-cover" draggable="false" />

      {/* Before image — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} alt={labelBefore} className="absolute inset-0 w-full h-full object-cover" draggable="false" />

        {/* Gradient overlay on before side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

        {/* Before label */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2">
          <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em]">
            {labelBefore}
          </div>
        </div>
      </div>

      {/* After label */}
      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        <div className="bg-[#173727]/80 backdrop-blur-md text-[#d7ae45] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em]">
          {labelAfter}
        </div>
      </div>

      {/* Drag instruction — fades on hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/30 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full">
          Arraste para comparar
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute inset-y-0 w-[2px] bg-white/80 z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle */}
        <div
          onMouseDown={onMouseDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl z-30 flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform hover:scale-110 border-2 border-[#173727]/20"
          style={{ boxShadow: '0 4px 24px rgba(23,55,39,0.25), 0 0 0 4px rgba(215,174,69,0.25)' }}
        >
          {/* Arrow icons */}
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M5 7H1M1 7L4 4M1 7L4 10" stroke="#173727" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 7H21M21 7L18 4M21 7L18 10" stroke="#173727" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 7H14" stroke="#d7ae45" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
