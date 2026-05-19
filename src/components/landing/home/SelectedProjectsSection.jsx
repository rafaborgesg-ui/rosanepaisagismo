import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PremiumLink from "@/components/landing/home/PremiumLink";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import { usePortfolioProjects } from "@/lib/portfolioStorage";

const cardLayout = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1 md:mt-28",
  "md:col-start-1 md:row-start-2",
  "md:col-start-2 md:row-start-2 md:mt-14",
];

const imageLayout = [
  "aspect-[4/5] md:aspect-[0.72]",
  "aspect-[4/3] md:aspect-[1.34]",
  "aspect-[4/3]",
  "aspect-[4/3] md:aspect-[1.08]",
];

export default function SelectedProjectsSection({ reducedMotion = false }) {
  const { projects } = usePortfolioProjects();
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};
  const featuredProjects = projects.filter((project) => project.isFeaturedHome);
  const selectedProjects = (featuredProjects.length ? featuredProjects : projects).slice(0, 4).map((project) => ({
    ...project,
    image: project.cover,
  }));

  return (
    <section id="projetos" className="bg-[#0b0f0b] px-5 py-24 text-white md:px-10 md:py-36">
      <div className="mx-auto w-[min(100%,1320px)]">
        <motion.div
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="mb-16 grid gap-8 lg:grid-cols-[0.95fr_0.45fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <p className={labelClass}>{homeTexts.selected_label || "Projetos destacados"}</p>
            <h2 className="mt-5 font-heading text-[clamp(3.2rem,7vw,7.6rem)] font-medium leading-[0.88] text-white">
              {homeTexts.selected_title || "Cases de natureza, arquitetura e permanência."}
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="mb-7 text-base font-light leading-8 text-white/62">
              Uma seleção editorial de projetos que traduzem a assinatura da marca:
              proporção, curadoria botânica e leitura sensível do imóvel.
            </p>
            <PremiumLink to="/portfolio" variant="outline">
              {homeTexts.selected_cta || "Ver acervo completo"}
            </PremiumLink>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-x-14 md:gap-y-20">
          {selectedProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              {...getInViewProps(reducedMotion, {
                offset: 28,
                delay: reducedMotion ? 0 : index * 0.06,
                duration: 0.68,
              })}
              className={cardLayout[index] || ""}
            >
              <Link
                to={`/portfolio/${project.slug}`}
                className="rb-premium-focus group block"
                aria-label={`Ver projeto ${project.title}`}
              >
                <div className={`relative overflow-hidden bg-[#181c19] ${imageLayout[index] || imageLayout[3]}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 grayscale-[10%] transition duration-1000 group-hover:scale-[1.045] group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(5,8,5,0.72))] opacity-80 transition duration-700 group-hover:opacity-45" />
                  <span className="absolute bottom-5 left-5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 border-b border-white/12 pb-7 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <h3 className="font-heading text-3xl font-medium leading-none text-white md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm font-light leading-7 text-white/56">
                      {project.summary}
                    </p>
                  </div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#d3b473] md:pt-1">
                    {project.category}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...getInViewProps(reducedMotion, { offset: 22 })}
          className="mt-20 grid gap-6 border-t border-white/14 pt-9 md:grid-cols-[1fr_auto] md:items-center"
        >
          <p className="max-w-2xl font-heading text-3xl font-medium leading-tight text-white md:text-4xl">
            Cada projeto nasce de uma leitura privada do imóvel, do estilo de vida e da arquitetura.
          </p>
          <PremiumLink to="/contato" variant="light">
            Agendar uma consultoria
          </PremiumLink>
        </motion.div>
      </div>
    </section>
  );
}
