import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

export default function SiteFooter({ reveal = false } = {}) {
  const content = useLandingContent();
  const logoRodape = content?.logo_rodape_url || "/brand/rosane-logo-white.png";
  const logoRodapeSize = Number(content?.logo_rodape_size) || 100;
  const logoRodapeHeight = Math.min(72, Math.max(36, logoRodapeSize * 0.48));
  const footerClass = reveal
    ? "relative bg-[#0c0e0a] px-5 pb-[calc(12rem+env(safe-area-inset-bottom))] pt-20 text-white md:fixed md:inset-x-0 md:bottom-0 md:z-0 md:flex md:min-h-[68svh] md:items-end md:py-24"
    : "relative bg-[#0c0e0a] px-5 pb-[calc(12rem+env(safe-area-inset-bottom))] pt-20 text-white md:py-24";

  return (
    <footer className={footerClass}>
      <div className="rb-grain absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl">
        {/* Gold divider */}
        <div className="mb-16 flex justify-center">
          <div className="h-px w-[min(200px,40vw)] rb-luxury-hairline-gold" />
        </div>

        <div className="grid gap-14 border-b border-white/8 pb-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <img
              src={logoRodape}
              alt="Rosane Borges Paisagismo"
              className="mb-6 w-auto max-w-full object-contain"
              style={{ height: `${logoRodapeHeight}px` }}
            />
            <p className="max-w-md text-sm leading-7 text-white/50">
              Paisagismo autoral de alto padrão para residências, clínicas e projetos
              selecionados que exigem leitura técnica e implantação orientada.
            </p>
            <p className="mt-6 font-heading text-lg italic text-white/28">
              "Jardins criados para viver melhor."
            </p>
          </div>

          <div>
            <p className="mb-6 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#d3b473]">
              Navegação
            </p>
            <div className="grid gap-3 text-sm text-white/56">
              {[
                { label: "Início", to: "/" },
                { label: "Projetos", to: "/portfolio" },
                { label: "Método", to: "/#metodo" },
                { label: "Nossos Serviços", to: "/#servicos" },
                { label: "Sobre", to: "/#sobre" },
                { label: "Contato", to: "/contato" },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="rb-gold-accent w-fit transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[#d3b473]">
              Contato
            </p>
            <div className="grid gap-4 text-sm text-white/56">
              <a
                href="mailto:rosanepaisagismo@gmail.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#d3b473]/72" aria-hidden="true" />
                rosanepaisagismo@gmail.com
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#d3b473]/72" aria-hidden="true" />
                Atendimento privado no WhatsApp
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#d3b473]/72" aria-hidden="true" />
                MG, SP e projetos selecionados no Brasil
              </p>
              <a
                href="https://www.instagram.com/rosanepaisagismo/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/68 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#d3b473]/42 hover:text-[#d3b473] hover:shadow-[0_0_20px_rgba(211,180,115,0.08)]"
                aria-label="Instagram Rosane Paisagismo"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-white/32 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Rosane Borges Paisagismo. Todos os direitos reservados.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <Link to="/privacidade" className="transition-colors hover:text-white/60">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="transition-colors hover:text-white/60">
              Termos de Serviço
            </Link>
            <Link to="/sistema" className="transition-colors hover:text-white/60">
              Sistema
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
