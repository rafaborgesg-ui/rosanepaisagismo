import { useLandingContent } from "@/hooks/useLandingContent";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppFloat() {
  const content = useLandingContent();
  const numero = content?.whatsapp_numero || "5538999313930";
  const [isHovered, setIsHovered] = useState(false);
  const message = encodeURIComponent("Olá, quero falar com um especialista sobre um projeto exclusivo de paisagismo.");

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 md:bottom-8 md:right-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden rounded-full border border-[#e8e3d4] bg-white/95 px-4 py-2 shadow-[0_18px_50px_rgba(18,20,17,0.12)] backdrop-blur transition-all duration-300 md:block ${
          isHovered ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
        }`}
      >
        <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-[#163528]">
          Falar com especialista
        </p>
      </div>

      <a
        href={`https://wa.me/${numero}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#163528] text-white shadow-[0_20px_55px_rgba(22,53,40,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#b89445] md:h-16 md:w-16"
        aria-label="Falar com especialista via WhatsApp"
      >
        <span className="absolute inset-0 rounded-full border border-white/20" />
        <span className="absolute inset-0 rounded-full bg-[#163528]/25 opacity-0 transition group-hover:scale-125 group-hover:opacity-100" />
        <MessageCircle className="relative h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
      </a>
    </div>
  );
}
