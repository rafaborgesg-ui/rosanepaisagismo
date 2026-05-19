import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import PremiumLink from "@/components/landing/home/PremiumLink";

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
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.18], ["0%", "18%"]);
  const mediaY = useTransform(scrollYProgress, [0, 0.18], ["0%", "7%"]);

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

  const activeProjectText = [
    "Fachadas, jardins e áreas de permanência desenhados como parte da arquitetura.",
    "Curadoria botânica com técnica, ritmo visual e maturação pensada para o tempo.",
    "Ambientes externos que elevam o cotidiano sem perder naturalidade.",
    "Projetos sob medida para residências, clínicas e empreendimentos selecionados.",
  ];

  return (
    <section
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
      {slides.map((slide, index) => {
        const isActive = activeSlide === index;

        return (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={!isActive}
            className="absolute inset-0 h-[108%] w-full object-cover"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: isActive ? 1 : 0 }
                : {
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1.065 : 1.02,
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 1.15, ease: "easeInOut" },
                    scale: { duration: 6.8, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            loading={index === 0 ? "eager" : "lazy"}
            style={{ zIndex: isActive ? 2 : 1, y: reducedMotion ? 0 : mediaY }}
          />
        );
      })}

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_72%_34%,rgba(211,180,115,0.12),transparent_34%),linear-gradient(90deg,rgba(6,10,7,0.84),rgba(8,13,9,0.24)_45%,rgba(8,13,9,0.58)),linear-gradient(180deg,rgba(8,13,9,0.48),rgba(8,13,9,0.04)_34%,rgba(8,13,9,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[30vh] bg-gradient-to-t from-[#0b0f0b] to-transparent" />

      <motion.div
        style={{ y: reducedMotion ? 0 : contentY }}
        className="relative z-20 mx-auto flex min-h-[100svh] w-[min(100%,1680px)] items-end px-5 pb-20 pt-32 md:px-10 md:pb-16 lg:pb-20"
      >
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(320px,0.42fr)] lg:items-end">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 36, filter: "blur(12px)" }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="max-w-5xl"
          >
            <div className="mb-7 h-px w-28 rb-luxury-hairline" aria-hidden="true" />
            <h1 className="max-w-5xl font-heading text-[clamp(3.45rem,8.1vw,8.8rem)] font-medium leading-[0.86] text-white [text-wrap:balance]">
              Paisagismo autoral para espaços que inspiram
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-white/78 md:text-lg md:leading-8">
              Natureza, arquitetura e sensibilidade em equilíbrio para jardins sob medida,
              concebidos com técnica, atmosfera e desejo de permanência.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PremiumLink to="/contato" variant="light">
                Conversar sobre meu projeto
              </PremiumLink>
              <PremiumLink to="/portfolio" variant="outline">
                Explorar projetos
              </PremiumLink>
            </div>
          </motion.div>

          <motion.aside
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="hidden border-l border-white/18 pl-7 text-white/72 lg:block"
          >
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473]">
              Rosane Borges Paisagismo
            </p>
            <p className="mt-5 text-lg font-light leading-8">
              {activeProjectText[activeSlide] || activeProjectText[0]}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-5 border-t border-white/14 pt-6">
              {[
                ["1:1", "sob medida"],
                ["3D", "conceito"],
                ["obra", "orientada"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-heading text-3xl text-white">{value}</p>
                  <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/44">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-8 left-6 z-30 hidden items-center gap-4 text-white/48 md:left-10 md:flex">
        <span className="h-12 w-px overflow-hidden bg-white/18">
          <span className="block h-5 w-px animate-[rb-scroll-cue_1.9s_cubic-bezier(.16,1,.3,1)_infinite] bg-[#d3b473]" />
        </span>
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
          Role para descobrir
        </span>
      </div>

      <div className="absolute bottom-8 right-6 z-30 flex items-center gap-2 md:bottom-12 md:right-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Ver imagem ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full border border-white/40 transition-all duration-500 ${
              activeSlide === index ? "w-9 bg-white" : "w-1.5 bg-white/20 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
