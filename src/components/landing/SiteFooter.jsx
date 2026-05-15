import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function SiteFooter() {
  const content = useLandingContent();
  const logoRodape = content?.logo_rodape_url;
  const whatsapp = content?.whatsapp_numero || "5538999313930";

  return (
    <footer className="bg-[#10130f] px-5 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            {logoRodape ? (
              <img
                src={logoRodape}
                alt="Rosane Paisagismo"
                className="mb-5 w-auto object-contain"
                style={{ height: `${(content?.logo_rodape_size || 100) * 0.48}px` }}
              />
            ) : (
              <p className="mb-5 text-3xl font-semibold tracking-tight">
                Rosane<span className="text-[#b89445]">.</span>
              </p>
            )}
            <p className="max-w-md text-sm leading-7 text-white/58">
              Paisagismo autoral de alto padrão para residências, piscinas, áreas gourmet, clínicas e espaços corporativos que precisam transmitir sofisticação.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d5bd7b]">Navegação</p>
            <div className="grid gap-3 text-sm text-white/64">
              <Link to="/" className="transition-colors hover:text-white">Início</Link>
              <Link to="/portfolio" className="transition-colors hover:text-white">Portfólio</Link>
              <Link to="/paisagismo-residencial" className="transition-colors hover:text-white">Residencial premium</Link>
              <Link to="/paisagismo-clinicas" className="transition-colors hover:text-white">Clínicas e corporativo</Link>
              <Link to="/contato" className="transition-colors hover:text-white">Contato</Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d5bd7b]">Contato</p>
            <div className="grid gap-4 text-sm text-white/64">
              <a href="mailto:rosanepaisagismo@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-[#d5bd7b]" aria-hidden="true" />
                rosanepaisagismo@gmail.com
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-white">
                <MessageCircle className="h-4 w-4 text-[#d5bd7b]" aria-hidden="true" />
                WhatsApp premium
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#d5bd7b]" aria-hidden="true" />
                SP, MG e projetos selecionados no Brasil
              </p>
              <a
                href="https://www.instagram.com/rosanepaisagismo/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/78 transition-all hover:-translate-y-0.5 hover:border-[#d5bd7b] hover:text-[#d5bd7b]"
                aria-label="Instagram Rosane Paisagismo"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Rosane Paisagismo. Todos os direitos reservados.</span>
          <div className="flex gap-5">
            <Link to="/privacidade" className="transition-colors hover:text-white/70">Política de Privacidade</Link>
            <Link to="/termos" className="transition-colors hover:text-white/70">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
