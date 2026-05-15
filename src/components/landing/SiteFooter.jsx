import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";
import { buildWhatsAppUrl } from "@/data/premiumProjects";

export default function SiteFooter() {
  const content = useLandingContent();
  const logoRodape = content?.logo_rodape_url;

  return (
    <footer className="bg-[#10120e] px-5 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            {logoRodape ? (
              <img
                src={logoRodape}
                alt="Rosane Borges Paisagismo"
                className="mb-5 w-auto object-contain"
                style={{ height: `${(content?.logo_rodape_size || 100) * 0.48}px` }}
              />
            ) : (
              <p className="mb-5 font-heading text-3xl font-medium tracking-normal">
                Rosane Borges
              </p>
            )}
            <p className="max-w-md text-sm leading-7 text-white/58">
              Paisagismo autoral de alto padrão para residências, clínicas e projetos
              selecionados que exigem leitura técnica e implantação orientada.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
              Navegação
            </p>
            <div className="grid gap-3 text-sm text-white/64">
              <Link to="/" className="transition-colors hover:text-white">
                Início
              </Link>
              <Link to="/portfolio" className="transition-colors hover:text-white">
                Projetos
              </Link>
              <Link to="/#metodo" className="transition-colors hover:text-white">
                Método
              </Link>
              <Link to="/#servicos" className="transition-colors hover:text-white">
                Expertise
              </Link>
              <Link to="/#sobre" className="transition-colors hover:text-white">
                Sobre
              </Link>
              <Link to="/contato" className="transition-colors hover:text-white">
                Contato
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d3b473]">
              Contato
            </p>
            <div className="grid gap-4 text-sm text-white/64">
              <a
                href="mailto:rosanepaisagismo@gmail.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                rosanepaisagismo@gmail.com
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                Atendimento privado no WhatsApp
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#d3b473]" aria-hidden="true" />
                MG, SP e projetos selecionados no Brasil
              </p>
              <a
                href="https://www.instagram.com/rosanepaisagismo/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 text-white/78 transition-all hover:-translate-y-0.5 hover:border-[#d3b473] hover:text-[#d3b473]"
                aria-label="Instagram Rosane Paisagismo"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Rosane Borges Paisagismo. Todos os direitos reservados.</span>
          <div className="flex gap-5">
            <Link to="/privacidade" className="transition-colors hover:text-white/70">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="transition-colors hover:text-white/70">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
