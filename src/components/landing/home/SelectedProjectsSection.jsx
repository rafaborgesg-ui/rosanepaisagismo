import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { labelClass } from "@/components/landing/home/landingContent";
import { getInViewProps } from "@/components/landing/home/motion";
import { useLandingContent } from "@/hooks/useLandingContent";
import { usePortfolioProjects } from "@/lib/portfolioStorage";

const cardLayout = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-2 md:row-start-1 md:mt-32",
  "md:col-start-1 md:row-start-2",
  "md:col-start-2 md:row-start-2 md:mt-16",
];

const imageLayout = [
  "aspect-[4/5] md:aspect-[0.72]",
  "aspect-[4/3] md:aspect-[1.34]",
  "aspect-[4/3]",
  "aspect-[4/3] md:aspect-[1.08]",
];

function ParallaxImage({ src, alt, reducedMotion, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Imagem desce um pouco enquanto usuário faz o scroll para criar a ilusão de profundidade
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 72, scale: 0.985 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16, margin: "0px" }}
      transition={{ duration: 1.18, ease: [0.19, 1, 0.22, 1] }}
      className={`relative overflow-hidden bg-[#181c19] ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y: reducedMotion ? "0%" : y }}
        className="absolute inset-0 h-[120%] w-full object-cover grayscale-[10%] origin-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(5,8,5,0.76))] opacity-75 transition-opacity duration-1000 group-hover:opacity-30" />
    </motion.div>
  );
}

export default function SelectedProjectsSection({ reducedMotion = false }) {
  const { projects } = usePortfolioProjects();
  const content = useLandingContent();
  const homeTexts = content?.home_texts || {};
  const featuredProjects = projects.filter((p) => p.isFeaturedHome);
  const selectedProjects = (featuredProjects.length ? featuredProjects : projects).slice(0, 4).map((p) => ({
    ...p,
    image: p.cover,
  }));

  return (
    <section id="projetos" className="relative bg-[#0b0f0b] px-5 py-section-md text-white md:px-10 overflow-hidden">
      {/* Gold divider */}
      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="h-px w-[min(280px,50vw)] rb-luxury-hairline-gold" />
      </div>

      <div className="mx-auto w-[min(100%,1320px)] relative z-10">
        <motion.div
          {...getInViewProps(reducedMotion, { offset: 26, blur: true })}
          className="mb-20 grid gap-8 lg:grid-cols-[0.95fr_0.45fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <p className={labelClass}>{homeTexts.selected_label || "Projetos selecionados"}</p>
            <h2 className="mt-6 font-heading text-[clamp(3rem,6.6vw,7.2rem)] font-medium leading-[0.88] text-white">
              {homeTexts.selected_title || "Cases de natureza, arquitetura e permanência."}
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-base font-light leading-8 text-white/56">
              Uma seleção editorial de projetos que traduzem a assinatura da marca:
              proporção, curadoria botânica e leitura sensível do imóvel.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-14 md:grid-cols-2 md:items-start md:gap-x-16 md:gap-y-24">
          {selectedProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
              className={cardLayout[index] || ""}
            >
              <Link
                to={`/portfolio/${project.slug}`}
                className="rb-premium-focus group block"
                aria-label={`Ver projeto ${project.title}`}
              >
                <div className="relative">
                  <ParallaxImage 
                    src={project.image} 
                    alt={project.title} 
                    reducedMotion={reducedMotion} 
                    className={imageLayout[index] || imageLayout[3]} 
                  />
                </div>
                <div className="mt-6 grid gap-3 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto] md:items-start relative">
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#d3b473] to-transparent transition-all duration-700 ease-out group-hover:w-full" />
                  <div>
                    <h3 className="font-heading text-[1.7rem] font-medium leading-none text-white transition-colors duration-500 group-hover:text-[#d3b473] md:text-[2rem]">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm font-light leading-7 text-white/50 transition-colors duration-500 group-hover:text-white/70">
                      {project.summary}
                    </p>
                  </div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#d3b473] md:pt-1">
                    {project.category}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...getInViewProps(reducedMotion, { offset: 22 })}
          className="mt-24 border-t border-white/12 pt-10"
        >
          <p className="max-w-2xl font-heading text-[1.7rem] font-medium leading-tight text-white md:text-[2.1rem]">
            Cada projeto nasce de uma leitura privada do imóvel, do estilo de vida e da arquitetura.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
