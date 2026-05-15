import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

const navItems = [
  { label: "Início", to: "/", key: "inicio" },
  { label: "Portfólio", to: "/portfolio", key: "portfolio" },
  { label: "Residencial", to: "/paisagismo-residencial", key: "residencial" },
  { label: "Contato", to: "/contato", key: "contato" },
];

export default function SiteNav({ activeLink }) {
  const content = useLandingContent();
  const logoTopo = content?.logo_topo_url;
  const logoSize = content?.logo_topo_size || 100;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#121411]/72 text-white backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex min-h-8 items-center" aria-label="Rosane Paisagismo">
          {logoTopo ? (
            <img
              src={logoTopo}
              alt="Rosane Paisagismo"
              className="w-auto object-contain brightness-0 invert"
              style={{ height: `${logoSize * 0.36}px`, maxWidth: "210px" }}
            />
          ) : (
            <span className="text-[1.35rem] font-semibold tracking-tight md:text-[1.55rem]">
              Rosane<span className="text-[#b89445]">.</span>
            </span>
          )}
        </Link>

        <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white/68 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className={`transition-colors hover:text-white ${activeLink === item.key ? "text-[#d5bd7b]" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="rounded-full bg-white px-6 py-3 text-[#121411] transition-all hover:-translate-y-0.5 hover:bg-[#b89445] hover:text-white"
          >
            Agendar consultoria
          </Link>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#121411]/96 px-6 py-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/78 md:hidden">
          <div className="grid gap-5">
            {navItems.map((item) => (
              <Link key={item.key} to={item.to} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link to="/contato" className="text-[#d5bd7b]" onClick={() => setMenuOpen(false)}>
              Solicitar projeto exclusivo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
