import { useState } from "react";
import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function SiteNav({ activeLink }) {
  const content = useLandingContent();
  const logoTopo = content?.logo_topo_url;
  const logoSize = content?.logo_topo_size || 100;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = (key) =>
    `hover:text-[#173727] transition-colors ${activeLink === key ? "text-[#173727] font-semibold" : ""}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-stone-100 font-sans-custom">
      <style>{`
        .font-serif-custom { font-family: 'Playfair Display', 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Inter', 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" style={{ minHeight: "16px" }}>
          {logoTopo ? (
            <img src={logoTopo} alt="Rosane Paisagismo" className="object-contain" style={{ height: `${logoSize * 0.4}px`, maxWidth: "200px" }} />
          ) : (
            <>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#173727] font-serif-custom text-xl font-bold text-[#d7ae45]">R</span>
              <span className="leading-tight">
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-[#173727]">Rosane</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-stone-500">Paisagismo</span>
              </span>
            </>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <Link to="/" className={navLinkClass("inicio")}>Início</Link>
          <Link to="/portfolio" className={navLinkClass("portfolio")}>Portfólio</Link>
          <Link to="/paisagismo-residencial" className={navLinkClass("residencial")}>Residencial</Link>
          <Link to="/area-gourmet-piscina" className={navLinkClass("gourmet")}>Gourmet</Link>
          <Link to="/paisagismo-clinicas" className={navLinkClass("clinicas")}>Clínicas</Link>
          <Link to="/quiz-paisagismo" className={navLinkClass("quiz")}>Quiz</Link>
          <Link to="/manutencao-premium" className={navLinkClass("manutencao")}>Manutenção</Link>
          <Link to="/produtos" className={navLinkClass("produtos")}>Materiais</Link>
          <Link to="/contato" className="ml-2 px-5 py-3 bg-[#173727] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#d7ae45] hover:text-[#173727] transition-colors">
            Diagnóstico
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          <span className="material-symbols-outlined text-[#173727]">menu</span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-3 text-sm font-medium text-stone-700">
          <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="/portfolio" className="block py-2" onClick={() => setMenuOpen(false)}>Portfólio</Link>
          <Link to="/paisagismo-residencial" className="block py-2" onClick={() => setMenuOpen(false)}>Residencial</Link>
          <Link to="/area-gourmet-piscina" className="block py-2" onClick={() => setMenuOpen(false)}>Área Gourmet</Link>
          <Link to="/paisagismo-clinicas" className="block py-2" onClick={() => setMenuOpen(false)}>Clínicas</Link>
          <Link to="/quiz-paisagismo" className="block py-2" onClick={() => setMenuOpen(false)}>Quiz</Link>
          <Link to="/manutencao-premium" className="block py-2" onClick={() => setMenuOpen(false)}>Manutenção</Link>
          <Link to="/sobre" className="block py-2" onClick={() => setMenuOpen(false)}>Sobre</Link>
          <Link to="/produtos" className="block py-2" onClick={() => setMenuOpen(false)}>Materiais</Link>
          <Link to="/contato" className="block py-2" onClick={() => setMenuOpen(false)}>Contato</Link>
          <Link to="/contato" className="block w-full mt-2 px-5 py-3 bg-[#173727] text-white rounded-full text-xs font-bold uppercase tracking-wider text-center" onClick={() => setMenuOpen(false)}>
            Agendar diagnóstico
          </Link>
        </div>
      )}
    </nav>
  );
}
