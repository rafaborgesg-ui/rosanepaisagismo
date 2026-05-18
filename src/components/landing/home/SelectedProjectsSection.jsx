import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PremiumLink from "@/components/landing/home/PremiumLink";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import { usePortfolioProjects } from "@/lib/portfolioStorage";

const cardLayout = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1 md:mt-24",
  "md:col-start-1 md:row-start-2",
  "md:col-start-2 md:row-start-2 md:mt-10",
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
    <section id="projetos" className="bg-[#0d100d] px-4 py-20 text-white md:py-28">
      <div className="mx-auto w-[min(100%,1180px)]">
        <motion.div
          {...getInViewProps(reducedMotion, { offset: 26 })}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className={labelClass}>{homeTexts.selected_label || "Projetos selecionados"}</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-normal text-white md:text-6xl">
              {homeTexts.selected_title || "Obras, estudos e implantações com assinatura botânica."}
            </h2>
          </div>
          <PremiumLink to="/portfolio" variant="outline">
            {homeTexts.selected_cta || "Ver acervo completo"}
          </PremiumLink>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-x-12 md:gap-y-14">
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
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3b473] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0d100d]"
                aria-label={`Ver projeto ${project.title}`}
              >
                <div className={`relative overflow-hidden rounded-[8px] bg-[#181c19] ${imageLayout[index] || imageLayout[3]}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-88 grayscale-[8%] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[#080a08]/10 transition duration-700 group-hover:bg-transparent" />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold leading-tight text-white">{project.title}</h3>
                  <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#d3b473]">
                    {project.category}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
