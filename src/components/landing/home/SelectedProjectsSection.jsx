import { motion } from "framer-motion";
import PremiumLink from "@/components/landing/home/PremiumLink";
import { labelClass, selectedProjects } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";

export default function SelectedProjectsSection({ reducedMotion = false }) {
  return (
    <section id="projetos" className="bg-[#f4f0e8] px-4 py-20 md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <motion.div
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className={labelClass}>Projetos selecionados</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal md:text-6xl">
              Obras, estudos e implantacoes com assinatura botanica.
            </h2>
          </div>
          <PremiumLink to="/portfolio">Ver acervo completo</PremiumLink>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {selectedProjects.map((project, index) => (
            <motion.article
              key={project.title}
              {...getInViewProps(reducedMotion, {
                offset: 28,
                delay: reducedMotion ? 0 : index * 0.06,
                duration: 0.68,
              })}
              className={index % 2 === 1 ? "md:translate-y-12" : ""}
            >
              <div className="group block overflow-hidden rounded-[8px] bg-[#111913]">
                <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11130f]/82 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
                      {project.category}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-medium tracking-normal md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/72">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
