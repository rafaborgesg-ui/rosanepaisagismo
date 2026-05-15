import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import MobileConciergeBar from "@/components/landing/home/MobileConciergeBar";
import PortfolioHero from "@/components/landing/portfolio/PortfolioHero";
import PortfolioFilterBar from "@/components/landing/portfolio/PortfolioFilterBar";
import PortfolioGallery from "@/components/landing/portfolio/PortfolioGallery";
import PortfolioCtaSection from "@/components/landing/portfolio/PortfolioCtaSection";
import SEO from "@/components/seo/SEO";
import { portfolioCategories, premiumProjects } from "@/data/premiumProjects";

export default function Portfolio() {
  const reducedMotion = useReducedMotion();
  const [filter, setFilter] = useState("Todos");

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return premiumProjects;
    return premiumProjects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] text-[#171914]">
      <SEO
        title="Projetos Selecionados de Paisagismo Autoral"
        description="Explore estudos, implantacoes orientadas e projetos autorais de paisagismo para residencias de alto padrao assinados pela Rosane Paisagismo."
        keywords="projetos selecionados paisagismo, paisagismo autoral, estudo 3d paisagismo, implantacao orientada, paisagismo residencial"
        url="https://rosanepaisagismo-site.vercel.app/portfolio"
        image={premiumProjects[0].cover}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfólio Rosane Paisagismo",
          description: "Seleção editorial de projetos de paisagismo de alto padrão.",
          hasPart: premiumProjects.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            url: `https://rosanepaisagismo-site.vercel.app/portfolio/${project.slug}`,
          })),
        }}
      />
      <SiteNav activeLink="portfolio" />

      <main>
        <PortfolioHero reducedMotion={Boolean(reducedMotion)} />
        <PortfolioFilterBar
          filter={filter}
          setFilter={setFilter}
          categories={portfolioCategories}
        />
        <PortfolioGallery
          filteredProjects={filteredProjects}
          reducedMotion={Boolean(reducedMotion)}
        />
        <PortfolioCtaSection />
      </main>

      <SiteFooter />
      <WhatsAppFloat hideOnMobile />
      <MobileConciergeBar href="/contato#briefing" />
    </div>
  );
}
