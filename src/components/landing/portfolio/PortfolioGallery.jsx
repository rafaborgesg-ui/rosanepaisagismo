import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getProjectFacts, labelClass } from "@/components/landing/portfolio/portfolioShared";

export default function PortfolioGallery({
  filteredProjects = [],
  reducedMotion = false,
}) {
  return (
    <section id="galeria" className="px-4 py-20 md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <div className="mb-12 grid gap-7 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div>
            <p className={labelClass}>Galeria selecionada</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
              Composicoes reais, leitura tecnica e narrativa visual.
            </h2>
          </div>
          <p className="text-base leading-8 text-[#5f665c]">
            Cada estudo apresenta contexto, solucao aplicada e escopo tecnico para
            orientar decisoes de projeto e implantacao.
          </p>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { delay: index * 0.04, duration: 0.55 }
                }
                className={index % 2 === 1 ? "md:translate-y-12" : ""}
              >
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group block overflow-hidden rounded-[8px] bg-white shadow-[0_24px_70px_rgba(36,35,28,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(36,35,28,0.14)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#171914] md:aspect-[5/6]">
                    <img
                      src={project.cover}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-92 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11130f]/84 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                        {project.category}
                      </p>
                      <h3 className="mt-3 font-heading text-3xl font-medium tracking-normal md:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-white/74">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 p-5">
                    {getProjectFacts(project).map(({ icon: Icon, label, value }) => (
                      <div key={label}>
                        <Icon className="mb-3 h-4 w-4 text-[#8f7b55]" aria-hidden="true" />
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8f7b55]">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-5 text-[#33372f]">{value}</p>
                      </div>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
