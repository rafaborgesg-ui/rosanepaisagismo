import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection({ reducedMotion = false }) {
  const slides = useMemo(
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
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  return (
    <section data-hero-logo-stage className="relative min-h-svh overflow-hidden bg-[#101812] text-white">
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
