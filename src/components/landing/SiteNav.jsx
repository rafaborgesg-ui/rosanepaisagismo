import { useState } from "react";
import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

export default function SiteNav({ activeLink }) {
  const content = useLandingContent();
  const logoTopo = content?.logo_topo_url;
  const logoSize = content?.logo_topo_size || 100;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-stone-100 font-sans-custom">
      <style>{`
        .font-serif-custom { font-family: 'Noto Serif', serif; }
        .font-sans-custom { font-family: 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-smoothing: antialiased; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center" style={{minHeight: "16px"}}>
          {logoTopo && (
            <img src={logoTopo} alt="Logo" className="object-contain" style={{height: `${(logoSize * 0.4)}px`, maxWidth: "200px"}} />
          )}
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link to="/" className={`hover:text-[#276a4d] transition-colors ${activeLink === "inicio" ? "text-[#276a4d] font-semibold" : ""}`}>Início</Link>
          <Link to="/produtos" className={`hover:text-[#276a4d] transition-colors ${activeLink === "produtos" ? "text-[#276a4d] font-semibold" : ""}`}>Produtos</Link>
          <Link to="/contato" className={`hover:text-[#276a4d] transition-colors ${activeLink === "contato" ? "text-[#276a4d] font-semibold" : ""}`}>Contato</Link>
          <Link to="/sistema" className="ml-4 px-5 py-2 bg-[#276a4d] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1a3d2b] transition-colors">
            Acessar Sistema
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined text-[#276a4d]">menu</span>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-3 text-sm font-medium text-stone-700">
          <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="/produtos" className="block py-2" onClick={() => setMenuOpen(false)}>Produtos</Link>
          <Link to="/contato" className="block py-2" onClick={() => setMenuOpen(false)}>Contato</Link>
          <Link to="/sistema" className="block w-full mt-2 px-5 py-2 bg-[#276a4d] text-white rounded-full text-xs font-bold uppercase tracking-wider text-center" onClick={() => setMenuOpen(false)}>
            Acessar Sistema
          </Link>
        </div>
      )}
    </nav>
  );
}
