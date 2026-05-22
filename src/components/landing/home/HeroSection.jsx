import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function HeroSection({ reducedMotion = false }) {
  const content = useLandingContent();
  const sectionRef = useRef(null);
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
    const isVideoSrc = (src) => {
      if (!src) return false;
      const lower = src.toLowerCase().split("?")[0];
      return lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".ogg") || lower.endsWith(".mov");
    };

    const adminSlides = Array.isArray(content?.slides)
      ? content.slides
          .map((slide) => {
            const src = slide.imagem_url || slide.src || slide.image || "";
            const isVideo = slide.tipo === "video" || isVideoSrc(src);
            return {
              src,
              alt: slide.titulo || slide.alt || "Projeto de paisagismo Rosane Borges",
              isVideo,
            };
          })
          .filter((slide) => slide.src)
      : [];

    return adminSlides.length ? adminSlides : defaultSlides;
  }, [content?.slides, defaultSlides]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartRef = useRef(null);
  const [slideTimerSeed, setSlideTimerSeed] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.78, 0.42]);

  const goToSlide = (direction) => {
    setActiveSlide((current) => {
      if (!slides.length) return 0;
      return direction === "next"
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length;
    });
  };

  const restartSlideTimer = () => {
    setSlideTimerSeed((current) => current + 1);
  };

  const handleManualSlide = (nextSlide) => {
    setActiveSlide(nextSlide);
    restartSlideTimer();
  };

  const handleManualDirection = (direction) => {
    goToSlide(direction);
    restartSlideTimer();
  };

  useEffect(() => {
    if (reducedMotion) return undefined;

    const timer = window.setTimeout(() => {
      goToSlide("next");
    }, 5800);

    return () => window.clearTimeout(timer);
  }, [activeSlide, reducedMotion, slideTimerSeed, slides.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero-logo-stage
      className="relative min-h-[100svh] touch-pan-y overflow-hidden bg-[#0a100c] text-white"
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

        handleManualDirection(deltaX < 0 ? "next" : "previous");
      }}
    >
      {slides.map((slide, index) => {
        const isActive = activeSlide === index;
        const commonStyle = { zIndex: isActive ? 2 : 1, y: reducedMotion ? 0 : mediaY };
        const commonAnimate = reducedMotion
          ? { opacity: isActive ? 1 : 0 }
          : { opacity: isActive ? 1 : 0, scale: isActive ? 1.08 : 1.02 };
        const commonTransition = reducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 1.6, ease: "easeInOut" },
              scale: { duration: 8, ease: [0.16, 1, 0.3, 1] },
            };

        if (slide.isVideo) {
          return (
            <motion.video
              key={slide.src}
              src={slide.src}
              aria-label={slide.alt}
              aria-hidden={!isActive}
              className="absolute inset-0 h-[115%] w-full object-cover"
              initial={false}
              animate={commonAnimate}
              transition={commonTransition}
              style={commonStyle}
              autoPlay
              muted
              loop
              playsInline
            />
          );
        }

        return (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={!isActive}
            className="absolute inset-0 h-[115%] w-full object-cover"
            initial={false}
            animate={commonAnimate}
            transition={commonTransition}
            style={commonStyle}
          />
        );
      })}

      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(8,16,9,0.18)_100%)]" />
      <motion.div
        style={{ opacity: reducedMotion ? 0.78 : overlayOpacity }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_68%_38%,rgba(211,180,115,0.08),transparent_40%),linear-gradient(90deg,rgba(6,10,7,0.28),rgba(8,13,9,0.08)_48%,rgba(8,13,9,0.2)),linear-gradient(180deg,rgba(8,13,9,0.16),rgba(8,13,9,0)_36%,rgba(8,13,9,0.34)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[24vh] bg-gradient-to-t from-[#0b0f0b]/72 via-[#0b0f0b]/28 to-transparent" />
      <div className="rb-grain absolute inset-0 z-[4]" />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={reducedMotion || !isLoaded ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 md:bottom-12"
      >
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Ver imagem ${index + 1}`}
              onClick={() => handleManualSlide(index)}
              className={`rounded-full border transition-all duration-500 ${
                activeSlide === index
                  ? "h-2.5 w-2.5 border-[#d3b473] bg-[#d3b473] shadow-[0_0_0_5px_rgba(8,16,9,0.34),0_0_18px_rgba(211,180,115,0.34)]"
                  : "h-2 w-2 border-white/70 bg-white/26 shadow-[0_0_0_4px_rgba(8,16,9,0.2)] hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
