import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProjectFacts, labelClass } from "@/components/landing/portfolio/portfolioShared";
import { trackEvent } from "@/lib/tracking";

const layouts = [
  "lg:grid-cols-[0.95fr_0.7fr]",
  "lg:grid-cols-[0.7fr_0.95fr]",
  "lg:grid-cols-[0.9fr_0.78fr]",
];

const MotionLink = motion.create(Link);

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
              const imageOffset = isReversed ? 76 : -76;
              return (
                <motion.article
                  layout
                  key={project.slug}
                  initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { delay: index * 0.04, duration: 0.62, ease: [0.16, 1, 0.3, 1] }
                  }
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
                    initial={reducedMotion ? false : { opacity: 0, x: imageOffset }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.34, margin: "-8% 0px -8% 0px" }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.9, ease: [0.19, 1, 0.22, 1] }
                    }
                    className={`rb-premium-focus group relative block overflow-hidden bg-[#111913] ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/3]">
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="h-full w-full object-cover grayscale-[8%] transition duration-1000 group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                    </div>
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
