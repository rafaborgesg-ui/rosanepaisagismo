import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function HeroSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const defaultSlides = useMemo(
    () => [
      {
        src: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p6_i2.jpg",
        alt: "Fachada residencial com paisagismo autoral",
      },
      {
        src: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p9_i1.jpg",
        alt: "Jardim residencial contemporaneo com leitura arquitetonica",
      },
      {
        src: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p5_i1.jpg",
        alt: "Jardim vertical e area externa com paisagismo premium",
      },
      {
        src: "/brand/PAISAGISMO-PRISCILLA-ROSANE_p3_i2.jpg",
        alt: "Projeto de paisagismo residencial de alto padrao",
      },
    ],
    []
  );
  const slides = useMemo(() => {
    const adminSlides = Array.isArray(content?.slides)
      ? content.slides
          .map((slide) => ({
            src: slide.imagem_url || slide.src || slide.image || "",
            alt: slide.titulo || slide.alt || "Projeto de paisagismo Rosane Borges",
          }))
          .filter((slide) => slide.src)
      : [];

    return adminSlides.length ? adminSlides : defaultSlides;
  }, [content?.slides, defaultSlides]);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartRef = useRef(null);

  const goToSlide = (direction) => {
    setActiveSlide((current) => {
      if (!slides.length) return 0;
      return direction === "next"
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length;
    });
  };

  useEffect(() => {
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      goToSlide("next");
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section
      data-hero-logo-stage
      className="relative min-h-svh touch-pan-y overflow-hidden bg-[#101812] text-white"
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStartRef.current;
        const touch = event.changedTouches[0];
        touchStartRef.current = null;
        if (!start || slides.length <= 1) return;

        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

        goToSlide(deltaX < 0 ? "next" : "previous");
      }}
    >
      {slides.map((slide, index) => {
        const isActive = activeSlide === index;

        return (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={!isActive}
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: isActive ? 1 : 0 }
                : {
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 1.018,
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.95, ease: "easeInOut" },
                    scale: { duration: 5.2, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            loading={index === 0 ? "eager" : "lazy"}
            style={{ zIndex: isActive ? 2 : 1 }}
          />
        );
      })}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,18,0.22),rgba(16,24,18,0.02)_48%,rgba(16,24,18,0.16)),linear-gradient(180deg,rgba(16,24,18,0.02)_45%,rgba(16,24,18,0.34)_100%)]" />

      <div className="absolute bottom-8 right-6 z-20 flex items-center gap-2 md:bottom-12 md:right-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Ver imagem ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-3 w-3 rounded-full border border-white/50 transition-all duration-300 ${
              activeSlide === index ? "bg-white" : "bg-white/35 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
