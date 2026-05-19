import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import PremiumLink from "@/components/landing/home/PremiumLink";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

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
    }, 5800);

    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  const activeProjectText = [
    "Fachadas, jardins e áreas de permanência desenhados como extensão da arquitetura.",
    "Curadoria botânica com técnica, ritmo visual e maturação pensada para o tempo.",
    "Ambientes externos que elevam o cotidiano sem perder a naturalidade.",
    "Projetos sob medida para residências, clínicas e empreendimentos selecionados.",
  ];

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

        goToSlide(deltaX < 0 ? "next" : "previous");
      }}
    >
      {/* Background slides with Ken Burns */}
      {slides.map((slide, index) => {
        const isActive = activeSlide === index;

        return (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={!isActive}
            className="absolute inset-0 h-[115%] w-full object-cover"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: isActive ? 1 : 0 }
                : {
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1.08 : 1.02,
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 1.6, ease: "easeInOut" },
                    scale: { duration: 8, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            loading={index === 0 ? "eager" : "lazy"}
            style={{ zIndex: isActive ? 2 : 1, y: reducedMotion ? 0 : mediaY }}
          />
        );
      })}

      {/* Cinematic overlays — warm vignette + gradient */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,16,9,0.4)_100%)]" />
      <motion.div
        style={{ opacity: reducedMotion ? 1 : overlayOpacity }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_68%_38%,rgba(211,180,115,0.08),transparent_38%),linear-gradient(90deg,rgba(6,10,7,0.82),rgba(8,13,9,0.18)_48%,rgba(8,13,9,0.52)),linear-gradient(180deg,rgba(8,13,9,0.38),rgba(8,13,9,0.02)_30%,rgba(8,13,9,0.82)_100%)]"
      />

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[35vh] bg-gradient-to-t from-[#0b0f0b] via-[#0b0f0b]/60 to-transparent" />

      {/* Grain texture overlay */}
      <div className="rb-grain absolute inset-0 z-[4]" />

      {/* Hero content */}
      <motion.div
        style={{ y: reducedMotion ? 0 : contentY }}
        className="relative z-20 mx-auto flex min-h-[100svh] w-[min(100%,1680px)] items-end px-5 pb-24 pt-32 md:px-10 md:pb-20 lg:pb-24"
      >
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.38fr)] lg:items-end">
          {/* Main hero text */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 40, filter: "blur(16px)" }}
            animate={reducedMotion || !isLoaded ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="max-w-5xl"
          >
            <div className="mb-8 h-px w-32 rb-luxury-hairline-left" aria-hidden="true" />
            <h1 className="max-w-5xl font-heading text-[clamp(3.2rem,7.8vw,8.4rem)] font-medium leading-[0.86] text-white [text-wrap:balance]">
              Paisagismo autoral para espaços que inspiram
            </h1>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={reducedMotion || !isLoaded ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="mt-7 max-w-2xl text-base font-light leading-8 text-white/72 md:text-lg md:leading-9"
            >
              Natureza, arquitetura e sensibilidade em equilíbrio para jardins sob medida,
              concebidos com técnica, atmosfera e desejo de permanência.
            </motion.p>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={reducedMotion || !isLoaded ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <PremiumLink to="/contato" variant="light">
                Conversar sobre meu projeto
              </PremiumLink>
              <PremiumLink to="/portfolio" variant="outline">
                Explorar projetos
              </PremiumLink>
            </motion.div>
          </motion.div>

          {/* Sidebar with project info */}
          <motion.aside
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={reducedMotion || !isLoaded ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="hidden border-l border-white/14 pl-8 text-white/72 lg:block"
          >
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#d3b473]">
              Rosane Borges Paisagismo
            </p>
            <p className="mt-5 text-lg font-light leading-8" key={activeSlide}>
              {activeProjectText[activeSlide] || activeProjectText[0]}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/12 pt-7">
              {[
                ["1:1", "sob medida"],
                ["3D", "conceito"],
                ["obra", "orientada"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-heading text-3xl text-white">{value}</p>
                  <p className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>

      {/* Scroll indicator — premium minimal */}
      <div className="pointer-events-none absolute bottom-10 left-6 z-30 hidden items-center gap-4 text-white/42 md:left-10 md:flex">
        <span className="h-14 w-px overflow-hidden bg-white/14">
          <span className="block h-5 w-px animate-[rb-scroll-cue_2.2s_cubic-bezier(.16,1,.3,1)_infinite] bg-[#d3b473]/72" />
        </span>
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em]">
          Scroll
        </span>
      </div>

      {/* Slide counter — editorial style 01 / 04 */}
      <div className="absolute bottom-10 right-6 z-30 flex items-center gap-4 md:bottom-14 md:right-10">
        <div className="flex items-baseline gap-2 font-heading text-white/60">
          <span className="rb-counter text-2xl text-white">{String(activeSlide + 1).padStart(2, "0")}</span>
          <span className="text-xs text-white/30">/</span>
          <span className="rb-counter text-sm text-white/36">{String(slides.length).padStart(2, "0")}</span>
        </div>
        <div className="ml-2 flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Ver imagem ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-[3px] rounded-full transition-all duration-700 ${
                activeSlide === index
                  ? "w-8 bg-[#d3b473]"
                  : "w-[3px] bg-white/24 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
