import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function SiteFooter() {
  const content = useLandingContent();
  const logoRodape = content?.logo_rodape_url;

  return (
    <footer className="bg-[#102a1d] text-white py-24 px-5 md:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#d7ae45]/5 to-transparent pointer-events-none" />
      <style>{`
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto font-body relative z-10">
        <div className="grid md:grid-cols-[1fr_2fr_1fr] gap-16 md:gap-12 mb-20">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-6">
              {logoRodape ? (
                <img src={logoRodape} alt="Rosane Paisagismo" className="w-auto object-contain" style={{ height: `${(content?.logo_rodape_size || 100) * 0.48}px` }} />
              ) : (
                <>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d7ae45] font-display text-2xl font-bold text-[#173727]">R</span>
                  <span className="leading-tight">
                    <span className="block text-lg font-bold uppercase tracking-[0.2em] text-white">Rosane</span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-[#d7ae45]">Paisagismo</span>
                  </span>
                </>
              )}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 text-center md:text-left leading-relaxed">Ateliê de arquitetura botânica especializado em imóveis de alto padrão.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start lg:justify-center gap-8 md:gap-12 text-[10px] font-extrabold uppercase tracking-[0.2em]">
            <div className="flex flex-col gap-5">
              <p className="text-white/30 tracking-[0.3em] mb-2">Escritório</p>
              <Link to="/sobre" className="hover:text-[#d7ae45] transition-colors">Sobre a Rosane</Link>
              <Link to="/portfolio" className="hover:text-[#d7ae45] transition-colors">Portfólio de Obras</Link>
              <Link to="/contato" className="hover:text-[#d7ae45] transition-colors">Agendar Diagnóstico</Link>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-white/30 tracking-[0.3em] mb-2">Expertise</p>
              <Link to="/paisagismo-residencial" className="hover:text-[#d7ae45] transition-colors">Residencial Premium</Link>
              <Link to="/paisagismo-clinicas" className="hover:text-[#d7ae45] transition-colors">Corporativo e Clínicas</Link>
              <Link to="/manutencao-premium" className="hover:text-[#d7ae45] transition-colors">Gestão de Manutenção</Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/30">Acompanhe</p>
            <a
              href="https://www.instagram.com/rosanepaisagismo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d7ae45] hover:text-[#173727] transition-all hover:scale-105"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-extrabold uppercase tracking-widest text-white/40">
          <span>© {new Date().getFullYear()} Rosane Paisagismo. Todos os direitos reservados.</span>
          <div className="flex items-center gap-6">
            <Link to="/privacidade" className="hover:text-[#d7ae45] transition-colors">Privacidade</Link>
            <Link to="/termos" className="hover:text-[#d7ae45] transition-colors">Termos</Link>
            <Link to="/sistema" className="hover:text-[#d7ae45] transition-colors">Sistema</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
