import { Navigate, useParams } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { MapPin, Ruler, Sparkles } from "lucide-react";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import ProjectHero from "@/components/landing/project/ProjectHero";
import ProjectNarrativeSection from "@/components/landing/project/ProjectNarrativeSection";
import ProjectGallerySection from "@/components/landing/project/ProjectGallerySection";
import TransformationSection from "@/components/landing/TransformationSection";
import ProjectRelatedSection from "@/components/landing/project/ProjectRelatedSection";
import ProjectCtaSection from "@/components/landing/project/ProjectCtaSection";
import SEO from "@/components/seo/SEO";
import { usePortfolioProjects } from "@/lib/portfolioStorage";

export default function ProjetoPortfolio() {
  const reducedMotion = useReducedMotion();
  const { slug } = useParams();
  const { projects: premiumProjects, isLoading } = usePortfolioProjects();
  const project = premiumProjects.find((item) => item.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3eee4] text-[#171914]">
        <SiteNav activeLink="portfolio" />
        <main className="flex min-h-screen items-center justify-center px-6 pt-28">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f7b55]">
            Carregando projeto
          </p>
        </main>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const relatedProjects = premiumProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const heroStats = [
    { icon: MapPin, label: "Local", value: project.location },
    { icon: Ruler, label: "Área", value: project.area },
    { icon: Sparkles, label: "Escopo", value: project.scope },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} | Rosane Borges Paisagismo`,
    description: project.summary,
    image: project.gallery,
    about: "Projeto de paisagismo de alto padrão",
    creator: {
      "@type": "Organization",
      name: "Rosane Borges Paisagismo",
      url: "https://rosanepaisagismo.vercel.app",
    },
  };

  return (
    <div className="min-h-screen bg-[#f3eee4] text-[#171914]">
      <SEO
        title={`${project.title} | Projeto de Paisagismo`}
        description={`${project.summary} Conheça desafios, solução aplicada e espécies utilizadas neste projeto autoral da Rosane Borges Paisagismo.`}
        keywords={`${project.category}, paisagismo residencial, projetos de paisagismo, jardim moderno, paisagismo de luxo`}
        url={`https://rosanepaisagismo.vercel.app/portfolio/${project.slug}`}
        image={project.cover}
        schema={schema}
      />
      <SiteNav activeLink="portfolio" />

      <main>
        <ProjectHero
          project={project}
          heroStats={heroStats}
          reducedMotion={Boolean(reducedMotion)}
        />
        <ProjectNarrativeSection
          project={project}
          reducedMotion={Boolean(reducedMotion)}
        />
        <TransformationSection project={project} />
        <ProjectGallerySection
          project={project}
          reducedMotion={Boolean(reducedMotion)}
        />
        <ProjectRelatedSection relatedProjects={relatedProjects} />
        <ProjectCtaSection project={project} />
      </main>

      <SiteFooter />
      <WhatsAppFloat hideOnMobile />
    </div>
  );
}
