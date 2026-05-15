import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";
import { buildWhatsAppUrl, WHATSAPP_MESSAGE } from "@/data/premiumProjects";

export default function WhatsAppFloat({ hideOnMobile = false }) {
  const content = useLandingContent();
  const numero = content?.whatsapp_numero;
  const [isHovered, setIsHovered] = useState(false);
  const href = numero
    ? `https://wa.me/${numero}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : buildWhatsAppUrl();

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 md:bottom-8 md:right-8 ${
        hideOnMobile ? "hidden md:flex" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden rounded-full border border-[#dfd9cc] bg-white/95 px-4 py-2 shadow-[0_18px_50px_rgba(23,25,20,0.14)] backdrop-blur transition-all duration-300 md:block ${
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
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#171914] text-white shadow-[0_20px_55px_rgba(23,25,20,0.34)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6f7b5f] md:h-16 md:w-16"
        aria-label="Falar com a equipe no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full border border-white/20" />
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition group-hover:scale-125 group-hover:opacity-100" />
        <MessageCircle className="relative h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
      </a>
    </div>
  );
}
