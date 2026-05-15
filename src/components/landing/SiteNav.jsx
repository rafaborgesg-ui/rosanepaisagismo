import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function SiteNav({ activeLink }) {
  const content = useLandingContent();
  const logoTopo = content?.logo_topo_url;
  const logoSize = content?.logo_topo_size || 100;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = typeof window !== "undefined" && window.location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (key) =>
    `text-[10px] font-extrabold uppercase tracking-[0.2em] hover:text-[#d7ae45] transition-colors ${activeLink === key ? "text-[#d7ae45]" : ""}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 font-sans-custom text-white transition-all duration-500 ${
      isHome && !scrolled
        ? "bg-transparent border-b border-transparent"
        : "bg-[#173727]/86 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/10"
    }`}>
      <style>{`
        .font-serif-custom { font-family: 'Playfair Display', 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Inter', 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; display: inline-block; }
      `}</style>
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between md:px-8">
        <Link to="/" className="flex items-center gap-3 group" style={{ minHeight: "16px" }}>
          {logoTopo ? (
            <img src={logoTopo} alt="Rosane Paisagismo" className="object-contain" style={{ height: `${logoSize * 0.4}px`, maxWidth: "200px" }} />
          ) : (
            <>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d7ae45] font-serif-custom text-xl font-bold text-[#173727] transition-transform group-hover:scale-105">R</span>
              <span className="leading-tight">
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-white">Rosane</span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#d7ae45]">Paisagismo</span>
              </span>
            </>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={navLinkClass("inicio")}>Início</Link>
          <Link to="/portfolio" className={navLinkClass("portfolio")}>Portfólio</Link>
          <Link to="/sobre" className={navLinkClass("sobre")}>O Escritório</Link>
          <Link to="/paisagismo-residencial" className={navLinkClass("residencial")}>Residencial</Link>
          <Link to="/paisagismo-clinicas" className={navLinkClass("clinicas")}>Comercial</Link>
          <Link to="/contato" className="ml-4 px-7 py-3.5 bg-[#d7ae45] text-[#173727] rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl hover:scale-105">
            Diagnóstico
          </Link>
        </div>

        <button className="lg:hidden p-2 text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          <span className="material-symbols-outlined text-3xl">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#173727] border-t border-white/10 px-5 py-6 space-y-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white absolute w-full shadow-2xl">
          <Link to="/" className="block py-3 border-b border-white/5 hover:text-[#d7ae45]" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="/portfolio" className="block py-3 border-b border-white/5 hover:text-[#d7ae45]" onClick={() => setMenuOpen(false)}>Portfólio</Link>
          <Link to="/sobre" className="block py-3 border-b border-white/5 hover:text-[#d7ae45]" onClick={() => setMenuOpen(false)}>O Escritório</Link>
          <Link to="/paisagismo-residencial" className="block py-3 border-b border-white/5 hover:text-[#d7ae45]" onClick={() => setMenuOpen(false)}>Residencial</Link>
          <Link to="/paisagismo-clinicas" className="block py-3 border-b border-white/5 hover:text-[#d7ae45]" onClick={() => setMenuOpen(false)}>Comercial</Link>
          <Link to="/manutencao-premium" className="block py-3 border-b border-white/5 hover:text-[#d7ae45]" onClick={() => setMenuOpen(false)}>Manutenção</Link>
          <Link to="/contato" className="block w-full mt-6 px-6 py-4 bg-[#d7ae45] text-[#173727] rounded-full text-center shadow-xl" onClick={() => setMenuOpen(false)}>
            Agendar diagnóstico
          </Link>
        </div>
      )}
    </nav>
  );
}
