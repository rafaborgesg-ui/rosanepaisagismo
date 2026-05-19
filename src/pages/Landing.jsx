import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { api } from "@/api/apiService";
import SiteNav from "@/components/landing/SiteNav";
import SiteFooter from "@/components/landing/SiteFooter";
import SitePreloader from "@/components/landing/SitePreloader";
import SmoothScroll from "@/components/landing/SmoothScroll";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";
import SEO from "@/components/seo/SEO";
import { buildWhatsAppUrl } from "@/data/premiumProjects";
import { getAttributionData, trackEvent } from "@/lib/tracking";
import HeroSection from "@/components/landing/home/HeroSection";
import ManifestoSection from "@/components/landing/home/ManifestoSection";
import FounderSection from "@/components/landing/home/FounderSection";
import SelectedProjectsSection from "@/components/landing/home/SelectedProjectsSection";
import ExpertiseSection from "@/components/landing/home/ExpertiseSection";
import MethodSection from "@/components/landing/home/MethodSection";
import DeliverablesSection from "@/components/landing/home/DeliverablesSection";
import PresenceSection from "@/components/landing/home/PresenceSection";
import TestimonialsSection from "@/components/landing/home/TestimonialsSection";
import ConciergeSection from "@/components/landing/home/ConciergeSection";

export default function Landing() {
  const reduceMotion = useReducedMotion();
  const [briefingStarted, setBriefingStarted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    whatsapp: "",
    city: "",
    propertyType: "Residencial",
    phase: "Em obra",
    scope: "Projeto completo",
    timeline: "Até 3 meses",
    investment: "Ainda não sei",
    details: "",
  });

  const handleBriefingStarted = () => {
    if (briefingStarted) return;
    setBriefingStarted(true);
    trackEvent("briefing_started", {
      source: "home_concierge",
      ...getAttributionData(),
    });
  };

  const submitLead = async (event) => {
    event.preventDefault();
    if (isSubmittingLead) return;

    setIsSubmittingLead(true);
    const attribution = getAttributionData();
    const highIntentRanges = ["R$15k a R$35k", "R$35k a R$80k", "Acima de R$80k"];
    const isQualified = highIntentRanges.includes(lead.investment);

    trackEvent("briefing_submitted", {
      source: "home_concierge",
      investment_range: lead.investment,
      city: lead.city,
      scope: lead.scope,
      ...attribution,
    });

    if (isQualified) {
      trackEvent("lead_qualified", {
        source: "home_concierge",
        investment_range: lead.investment,
        city: lead.city,
        ...attribution,
      });
    }

    try {
      await api.entities.Leads.create({
        nome: lead.name,
        email: null,
        whatsapp: lead.whatsapp,
        fonte: "home_concierge",
        status: isQualified ? "qualified" : "new",
        data_captura: new Date().toISOString(),
        utm_source: attribution.utm_source || null,
        utm_campaign: attribution.utm_campaign || null,
      });
    } catch (error) {
      trackEvent("briefing_lead_save_error", {
        source: "home_concierge",
        message: error?.message || "unknown_error",
      });
    }

    try {
      const message = [
        "Olá, quero iniciar uma avaliação de projeto com a Rosane Paisagismo.",
        "",
        `Nome: ${lead.name || "-"}`,
        `WhatsApp: ${lead.whatsapp || "-"}`,
        `Cidade: ${lead.city || "-"}`,
        `Tipo de imóvel: ${lead.propertyType}`,
        `Fase: ${lead.phase}`,
        `Escopo desejado: ${lead.scope}`,
        `Prazo: ${lead.timeline}`,
        `Faixa de investimento: ${lead.investment || "Não informado"}`,
        `Detalhes: ${lead.details || "Sem detalhes adicionais."}`,
      ].join("\n");

      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="isolate min-h-screen overflow-x-hidden bg-[#0b0f0b] text-[#151913]">
      <SitePreloader />
      <SmoothScroll disabled={Boolean(reduceMotion)} />
      <SEO
        title="Paisagismo Autoral de Alto Padrão"
        description="Rosane Borges Paisagismo cria jardins autorais e projetos sob medida para residências premium, integrando natureza, arquitetura, técnica e estilo de vida."
        keywords="paisagismo autoral, paisagismo alto padrão, paisagismo residencial premium, projeto executivo paisagismo, jardim contemporâneo, paisagismo para casas de luxo"
        url="https://rosanepaisagismo.vercel.app"
        schema={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Rosane Borges Paisagismo",
          description:
            "Escritório boutique de paisagismo para residências, clínicas e empreendimentos com projeto técnico e implantação orientada.",
          url: "https://rosanepaisagismo.vercel.app",
          telephone: "+55 38 99931-3930",
          areaServed: ["Minas Gerais", "São Paulo", "Brasil"],
          sameAs: ["https://www.instagram.com/rosanepaisagismo/"],
        }}
      />
      <SiteNav activeLink="inicio" />

      <main className="relative z-10 bg-[#f3eee4] shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
        <HeroSection reducedMotion={Boolean(reduceMotion)} />
        <ManifestoSection reducedMotion={Boolean(reduceMotion)} />
        <FounderSection reducedMotion={Boolean(reduceMotion)} />
        <SelectedProjectsSection reducedMotion={Boolean(reduceMotion)} />
        <ExpertiseSection reducedMotion={Boolean(reduceMotion)} />
        <MethodSection reducedMotion={Boolean(reduceMotion)} />
        <PresenceSection reducedMotion={Boolean(reduceMotion)} />
        <DeliverablesSection reducedMotion={Boolean(reduceMotion)} />
        <TestimonialsSection reducedMotion={Boolean(reduceMotion)} />
        <ConciergeSection
          lead={lead}
          setLead={setLead}
          submitLead={submitLead}
          onBriefingStarted={handleBriefingStarted}
          isSubmitting={isSubmittingLead}
        />
      </main>

      <div className="relative z-0 hidden bg-transparent md:block md:h-[68svh]" aria-hidden="true" />
      <SiteFooter reveal />
      <WhatsAppFloat hideOnMobile revealAfterHero />
    </div>
  );
}
