import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

const navItems = [
  { label: "Início", to: "/", key: "inicio" },
  { label: "Projetos", to: "/portfolio", key: "portfolio" },
  { label: "Expertise", to: "/#servicos", key: "expertise" },
  { label: "Método", to: "/#metodo", key: "metodo" },
  { label: "Sobre", to: "/#sobre", key: "sobre" },
  { label: "Contato", to: "/contato", key: "contato" },
];

function NavTarget({ item, children, className = "", onClick = undefined }) {
  return (
    <Link to={item.to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function SiteNav({ activeLink = "" } = {}) {
  const content = useLandingContent();
  const logoTopo = content?.logo_topo_url;
  const logoSize = content?.logo_topo_size || 100;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeAtTop = activeLink === "inicio" && !isScrolled && !menuOpen;
  const navClass = homeAtTop
    ? "border-white/10 bg-[#111913]/56"
    : "border-white/14 bg-[#111913]/88 shadow-[0_10px_35px_rgba(0,0,0,0.25)]";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b text-white backdrop-blur-2xl transition-colors duration-500 ${navClass}`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex min-h-8 items-center" aria-label="Rosane Borges Paisagismo">
          {logoTopo ? (
            <img
              src={logoTopo}
              alt="Rosane Borges Paisagismo"
              className="w-auto object-contain brightness-0 invert"
              style={{ height: `${logoSize * 0.36}px`, maxWidth: "220px" }}
            />
          ) : (
            <span className="font-heading text-2xl font-medium tracking-normal md:text-3xl">
              Rosane Borges
            </span>
          )}
        </Link>

        <div className="hidden items-center gap-7 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/68 lg:flex">
          {navItems.map((item) => (
            <NavTarget
              key={item.key}
              item={item}
              className={`transition-colors hover:text-white ${
                activeLink === item.key ? "text-[#d3b473]" : ""
              }`}
            >
              {item.label}
            </NavTarget>
          ))}
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          type="button"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#171914]/96 px-6 py-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/78 lg:hidden">
          <div className="grid gap-5">
            {navItems.map((item) => (
              <NavTarget
                key={item.key}
                item={item}
                onClick={() => setMenuOpen(false)}
                className={activeLink === item.key ? "text-[#d3b473]" : ""}
              >
                {item.label}
              </NavTarget>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
