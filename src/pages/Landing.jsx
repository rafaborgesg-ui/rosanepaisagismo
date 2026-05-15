import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { buildWhatsAppUrl } from "@/data/premiumProjects";
import HeroSection from "@/components/landing/home/HeroSection";
import ManifestoSection from "@/components/landing/home/ManifestoSection";
import FounderSection from "@/components/landing/home/FounderSection";
import SelectedProjectsSection from "@/components/landing/home/SelectedProjectsSection";
import ExpertiseSection from "@/components/landing/home/ExpertiseSection";
import MethodSection from "@/components/landing/home/MethodSection";
import DeliverablesSection from "@/components/landing/home/DeliverablesSection";
import PresenceSection from "@/components/landing/home/PresenceSection";
import ConciergeSection from "@/components/landing/home/ConciergeSection";
import MobileConciergeBar from "@/components/landing/home/MobileConciergeBar";

export default function Landing() {
  const reduceMotion = useReducedMotion();
  const [lead, setLead] = useState({
    name: "",
    whatsapp: "",
    city: "",
    propertyType: "Residencial",
    phase: "Em obra",
    scope: "Projeto completo",
    timeline: "Ate 3 meses",
    investment: "",
    details: "",
  });

  const submitLead = (event) => {
    event.preventDefault();
    const message = [
      "Ola, quero iniciar uma avaliacao de projeto com a Rosane Paisagismo.",
      "",
      `Nome: ${lead.name || "-"}`,
      `WhatsApp: ${lead.whatsapp || "-"}`,
      `Cidade: ${lead.city || "-"}`,
      `Tipo de imovel: ${lead.propertyType}`,
      `Fase: ${lead.phase}`,
      `Escopo desejado: ${lead.scope}`,
      `Prazo: ${lead.timeline}`,
      `Faixa de investimento: ${lead.investment || "Nao informado"}`,
      `Detalhes: ${lead.details || "Sem detalhes adicionais."}`,
    ].join("\n");
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#151913]">
      <SEO
        title="Paisagismo Autoral de Alto Padrao"
        description="Escritorio boutique de paisagismo para residencias, clinicas e empreendimentos de alto padrao com base botanica, projeto tecnico e implantacao orientada."
        keywords="paisagismo autoral, paisagismo alto padrao, paisagismo residencial, projeto executivo paisagismo, jardim vertical, paisagismo para clinicas"
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Rosane Borges Paisagismo",
          description:
            "Escritorio boutique de paisagismo para residencias, clinicas e empreendimentos com projeto tecnico e implantacao orientada.",
          url: "https://rosanepaisagismo-site.vercel.app",
          telephone: "+55 38 99931-3930",
          areaServed: ["Minas Gerais", "Sao Paulo", "Brasil"],
          sameAs: ["https://www.instagram.com/rosanepaisagismo/"],
        }}
      />
      <SiteNav activeLink="inicio" />

      <main>
        <HeroSection reducedMotion={Boolean(reduceMotion)} />
        <ManifestoSection reducedMotion={Boolean(reduceMotion)} />
        <FounderSection reducedMotion={Boolean(reduceMotion)} />
        <SelectedProjectsSection reducedMotion={Boolean(reduceMotion)} />
        <ExpertiseSection reducedMotion={Boolean(reduceMotion)} />
        <MethodSection reducedMotion={Boolean(reduceMotion)} />
        <DeliverablesSection reducedMotion={Boolean(reduceMotion)} />
        <PresenceSection reducedMotion={Boolean(reduceMotion)} />
        <ConciergeSection lead={lead} setLead={setLead} submitLead={submitLead} />
      </main>

      <SiteFooter />
      <WhatsAppFloat hideOnMobile />
      <MobileConciergeBar />
    </div>
  );
}
