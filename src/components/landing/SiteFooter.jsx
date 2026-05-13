import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function SiteFooter() {
  const content = useLandingContent();
  const logoRodape = content?.logo_rodape_url;

  return (
    <footer className="bg-[#173727] text-white py-16 px-4 md:px-8 border-t border-white/5">
      <style>{`
        .font-serif-footer { font-family: 'Playfair Display', 'Noto Serif', serif; }
        .font-sans-footer { font-family: 'Inter', 'Work Sans', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto font-sans-footer">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              {logoRodape ? (
                <img src={logoRodape} alt="Rosane Paisagismo" className="w-auto object-contain" style={{ height: `${(content?.logo_rodape_size || 100) * 0.48}px` }} />
              ) : (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#d7ae45] font-serif-footer text-2xl font-bold text-[#173727]">R</span>
                  <span className="font-serif-footer text-2xl font-bold">Rosane Paisagismo</span>
                </>
              )}
            </div>
            <p className="text-sm opacity-60 uppercase tracking-widest">Excelência técnica em paisagismo</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            <Link to="/" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Início</Link>
            <Link to="/portfolio" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Portfólio</Link>
            <Link to="/paisagismo-residencial" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Residencial</Link>
            <Link to="/area-gourmet-piscina" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Área Gourmet</Link>
            <Link to="/paisagismo-clinicas" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Clínicas</Link>
            <Link to="/quiz-paisagismo" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Quiz</Link>
            <Link to="/manutencao-premium" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Manutenção</Link>
            <Link to="/sobre" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Sobre</Link>
            <Link to="/produtos" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Materiais</Link>
            <Link to="/contato" className="text-xs uppercase tracking-widest hover:text-[#d7ae45] transition-colors">Contato</Link>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/rosanepaisagismo/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4 text-xs opacity-50 uppercase tracking-widest">
          <span>© 2026 Rosane Borges. Todos os direitos reservados.</span>
          <span className="hidden md:inline">•</span>
          <Link to="/privacidade" className="hover:opacity-90 transition-opacity">Política de Privacidade</Link>
          <span>•</span>
          <Link to="/termos" className="hover:opacity-90 transition-opacity">Termos de Serviço</Link>
          <span className="hidden md:inline">•</span>
          <Link to="/sistema" className="hover:opacity-90 transition-opacity">Área interna</Link>
        </div>
      </div>
    </footer>
  );
}
