import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProjectFacts, labelClass } from "@/components/landing/portfolio/portfolioShared";
import { trackEvent } from "@/lib/tracking";

const layouts = [
  "lg:grid-cols-[0.95fr_0.7fr]",
  "lg:grid-cols-[0.7fr_0.95fr]",
  "lg:grid-cols-[0.9fr_0.78fr]",
];

const MotionLink = motion.create(Link);

function PortfolioRevealImage({ src, alt, reducedMotion, revealDirection = "left-to-right" }) {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(Boolean(reducedMotion));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const isRightToLeft = revealDirection === "right-to-left";
  const initialX = isRightToLeft ? 56 : -56;
  const initialClipPath = isRightToLeft ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
  const hiddenState = { x: initialX, scale: 1.025, clipPath: initialClipPath };
  const visibleState = { x: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" };

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden md:aspect-[16/11] lg:aspect-[4/3]" data-reveal-direction={revealDirection}>
      <motion.div
        className="relative h-full w-full overflow-hidden"
        initial={reducedMotion ? false : hiddenState}
        animate={reducedMotion || hasEntered ? visibleState : hiddenState}
        transition={{ duration: 2.15, ease: [0.2, 0.82, 0.18, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y: reducedMotion ? "0%" : y }}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-[112%] w-full object-cover grayscale-[8%] transition duration-1000 group-hover:grayscale-0"
        />
      </motion.div>
    </div>
  );
}

export default function PortfolioGallery({
  filteredProjects = [],
  reducedMotion = false,
}) {
  return (
    <section id="galeria" className="bg-[#f3eee4] px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-20 grid gap-8 lg:grid-cols-[0.9fr_0.46fr] lg:items-end">
          <div>
            <p className={labelClass}>Galeria selecionada</p>
            <h2 className="mt-5 max-w-5xl font-heading text-[clamp(3rem,6.8vw,7rem)] font-medium leading-[0.9] text-[#111913]">
              Cases com atmosfera, técnica e assinatura botânica.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-[#4b5248] lg:justify-self-end">
            Cada case aparece como uma pauta editorial: contexto, intenção, gesto botânico
            e escopo com o respiro de uma revista de arquitetura.
          </p>
        </div>

        <motion.div layout className="grid gap-24 md:gap-28">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isReversed = index % 2 === 1;
              const revealDirection = (index + 1) % 2 === 0 ? "right-to-left" : "left-to-right";
              return (
                <motion.article
                  layout
                  key={project.slug}
                  className={`grid gap-10 border-t border-[#d8cdbb] pt-10 ${layouts[index % layouts.length]} lg:items-center lg:gap-16 lg:pt-12`}
                >
                  <MotionLink
                    to={`/portfolio/${project.slug}`}
                    onClick={() =>
                      trackEvent("case_cta_clicked", {
                        source: "portfolio_gallery",
                        project_slug: project.slug,
                        project_category: project.category,
                      })
                    }
                    className={`rb-premium-focus group relative block overflow-hidden ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <PortfolioRevealImage
                      src={project.cover}
                      alt={project.title}
                      reducedMotion={reducedMotion}
                      revealDirection={revealDirection}
                    />
                  </MotionLink>

                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                    className={isReversed ? "lg:order-1" : ""}
                  >
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#8a6e42]">
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </p>
                    <h3 className="mt-5 font-heading text-[clamp(3rem,5.4vw,5.8rem)] font-medium leading-[0.9] text-[#111913]">
                      {project.title}
                    </h3>
                    <p className="mt-6 max-w-2xl text-base font-light leading-8 text-[#4b5248] md:text-lg">
                      {project.summary}
                    </p>

                    <div className="mt-8 grid gap-0 border-y border-[#d8cdbb]">
                      {getProjectFacts(project).map(({ label, value }) => (
                        <div key={label} className="grid grid-cols-[0.42fr_1fr] gap-5 border-b border-[#d8cdbb] py-4 last:border-b-0">
                          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#8a6e42]">
                            {label}
                          </p>
                          <p className="text-sm leading-6 text-[#33372f]">{value}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="rb-premium-focus mt-8 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#111913] transition hover:text-[#8a6e42]"
                    >
                      Abrir case completo
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
