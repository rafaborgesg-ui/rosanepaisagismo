import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";
import { buildWhatsAppUrl, WHATSAPP_MESSAGE } from "@/data/premiumProjects";

export default function WhatsAppFloat({ hideOnMobile = false, revealAfterHero = false }) {
  const content = useLandingContent();
  const numero = content?.whatsapp_numero;
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(!revealAfterHero);
  const href = numero
    ? `https://wa.me/${numero}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : buildWhatsAppUrl();

  useEffect(() => {
    if (!revealAfterHero) {
      setIsVisible(true);
      return undefined;
    }

    const updateVisibility = () => {
      const hero = document.querySelector("[data-hero-logo-stage]");
      if (!hero) {
        setIsVisible(true);
        return;
      }

      setIsVisible(hero.getBoundingClientRect().bottom <= 24);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [revealAfterHero]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 transition-all duration-500 ease-out md:bottom-8 md:right-8 ${
        hideOnMobile ? "hidden md:flex" : ""
      } ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden rounded-full border border-[#dfd9cc]/80 bg-white/88 px-4 py-2 shadow-[0_14px_38px_rgba(23,25,20,0.1)] backdrop-blur transition-all duration-300 md:block ${
          isHovered ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
        }`}
      >
        <p className="whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#171914]">
          Atendimento privado
        </p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#101812]/94 text-white shadow-[0_14px_42px_rgba(23,25,20,0.24)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-[#5f6c52] md:h-14 md:w-14"
        aria-label="Falar com a equipe no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full border border-white/20" />
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition group-hover:scale-125 group-hover:opacity-100" />
        <MessageCircle className="relative h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
      </a>
    </div>
  );
}
