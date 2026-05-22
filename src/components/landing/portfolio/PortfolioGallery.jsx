import { Link } from "react-router-dom";
import { useRef } from "react";
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

function PortfolioRevealImage({ src, alt, reducedMotion }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden md:aspect-[16/11] lg:aspect-[4/3]">
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={reducedMotion ? false : { opacity: 1 }}
        whileInView={reducedMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.32, margin: "0px 0px -10% 0px" }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y: reducedMotion ? "0%" : y }}
          className="h-[112%] w-full object-cover grayscale-[8%] transition duration-1000 group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      </motion.div>
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-1px] z-10 bg-[#f3eee4]"
          initial={{ x: "0%" }}
          whileInView={{ x: "101%" }}
          viewport={{ once: true, amount: 0.01, margin: "0px 0px -4% 0px" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}

export default function PortfolioGallery({
  filteredProjects = [],
  reducedMotion = false,
}) {
  return (
    <section id="galeria" className="bg-[#f3eee4] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto w-[min(100%,1320px)]">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_0.46fr] lg:items-end">
          <div>
            <p className={labelClass}>Galeria selecionada</p>
            <h2 className="mt-5 max-w-5xl font-heading text-[clamp(3rem,6.8vw,7rem)] font-medium leading-[0.9] text-[#111913]">
              Estudos reais, narrativa visual e precisão botânica.
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-8 text-[#4b5248] lg:justify-self-end">
            Cada case apresenta contexto, solução aplicada e escopo técnico para orientar
            decisões de projeto, implantação e manutenção.
          </p>
        </div>

        <motion.div layout className="grid gap-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isReversed = index % 2 === 1;
              return (
                <motion.article
                  layout
                  key={project.slug}
                  className={`grid gap-8 border-t border-[#d8cdbb] pt-8 ${layouts[index % layouts.length]} lg:items-center`}
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
                    className={`rb-premium-focus group relative block overflow-hidden bg-[#111913] ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <PortfolioRevealImage
                      src={project.cover}
                      alt={project.title}
                      reducedMotion={reducedMotion}
                    />
                  </MotionLink>

                  <div className={isReversed ? "lg:order-1" : ""}>
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
                      Abrir case
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
