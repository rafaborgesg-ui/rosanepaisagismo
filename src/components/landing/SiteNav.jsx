import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

const navItems = [
  { label: "Início", to: "/", key: "inicio" },
  { label: "Sobre", to: "/#sobre", key: "sobre" },
  { label: "Projetos", to: "/portfolio", key: "portfolio" },
  { label: "Serviços", to: "/#servicos", key: "expertise" },
  { label: "Método", to: "/#metodo", key: "metodo" },
  { label: "Contato", to: "/contato", key: "contato" },
];

function NavTarget({ item, children, className = "", onClick, style }) {
  return (
    <Link to={item.to} className={className} onClick={onClick} style={style}>
      {children}
    </Link>
  );
}

export default function SiteNav({ activeLink = "" } = {}) {
  const content = useLandingContent();
  const logoTopo = content?.logo_topo_url;
  const logoSize = content?.logo_topo_size || 100;
  const brandLogoSrc = "/brand/rosane-logo-white.png";
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(activeLink !== "inicio");

  useEffect(() => {
    if (activeLink !== "inicio") {
      setIsScrolled(true);
      return undefined;
    }

    let frameId = 0;
    const update = () => {
      frameId = 0;
      setIsScrolled(window.scrollY > Math.max(window.innerHeight * 0.78, 560));
    };
    const req = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
    };
  }, [activeLink]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const hasSurface = menuOpen || isScrolled || activeLink !== "inicio";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 text-white">
      <div className={`absolute inset-x-0 top-0 h-[72px] transition-all duration-700 md:h-[84px] ${hasSurface ? "border-b border-white/8 bg-[rgba(8,16,9,0.78)] shadow-[0_1px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-[1.4]" : "border-b border-transparent bg-transparent"}`} />
      <div className={`absolute inset-x-0 top-[71px] z-10 h-px transition-opacity duration-700 md:top-[83px] ${hasSurface && !menuOpen ? "opacity-100" : "opacity-0"}`} style={{ background: "linear-gradient(90deg, transparent 5%, rgba(211,180,115,0.18) 30%, rgba(211,180,115,0.24) 50%, rgba(211,180,115,0.18) 70%, transparent 95%)" }} />

      <div className="relative z-10 mx-auto flex h-[72px] max-w-[1680px] items-center justify-between px-5 md:h-[84px] md:px-10">
        <Link to="/" className={`rb-premium-focus flex h-9 max-w-[200px] items-center transition duration-500 md:h-11 md:max-w-[260px] ${hasSurface ? "opacity-100" : "opacity-95"}`} aria-label="Rosane Borges Paisagismo" onClick={closeMenu}>
          {logoTopo ? (
            <img src={logoTopo} alt="Rosane Borges Paisagismo" className="w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.36)]" style={{ height: `${logoSize * 0.34}px`, maxWidth: "210px" }} />
          ) : (
            <img src={brandLogoSrc} alt="Rosane Borges Paisagismo" className="h-full w-auto max-w-full object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.36)]" />
          )}
        </Link>

        <div className={`ml-auto mr-10 hidden items-center gap-8 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/64 transition-all duration-500 xl:flex ${hasSurface && !menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
          {navItems.map((item) => (
            <NavTarget key={item.key} item={item} className={`rb-premium-focus rb-gold-accent pb-0.5 transition-colors hover:text-[#d3b473] ${activeLink === item.key ? "text-[#d3b473]" : ""}`}>{item.label}</NavTarget>
          ))}
        </div>

        <button className="rb-premium-focus group ml-auto inline-flex h-12 items-center gap-4 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.24em] text-white/82 transition-colors hover:text-[#d3b473]" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} type="button">
          <span className="relative block h-[1.45em] min-w-[4.25em] overflow-hidden leading-[1.45]">
            <span className={`block transition-all duration-500 ${menuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>Menu</span>
            <span className={`absolute inset-x-0 top-0 block transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>Close</span>
          </span>
          <span className="relative h-px w-10 overflow-hidden bg-white/20">
            <span className={`absolute inset-y-0 left-0 w-full origin-left bg-current transition-transform duration-600 ${menuOpen ? "scale-x-100" : "group-hover:scale-x-50"}`} />
          </span>
        </button>
      </div>

      <div className={`fixed inset-0 -z-10 transition-all duration-700 ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="absolute inset-0 bg-[#071009]" />
        <img src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg" alt="" aria-hidden="true" className={`absolute inset-y-0 right-0 hidden h-full w-[42vw] object-cover opacity-20 grayscale transition duration-[1.2s] md:block ${menuOpen ? "scale-100" : "scale-110"}`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071009_0%,rgba(7,16,9,0.96)_50%,rgba(7,16,9,0.55)_100%)]" />
        <div className="rb-grain absolute inset-0" />

        <div className="relative mx-auto flex min-h-svh max-w-[1680px] flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
          <div className="ml-auto grid w-full max-w-5xl gap-1">
            {navItems.map((item, index) => (
              <NavTarget key={item.key} item={item} onClick={closeMenu} className={`rb-premium-focus group flex items-end justify-between border-b border-white/10 py-3 font-heading text-[clamp(2.6rem,6.2vw,5.4rem)] font-medium leading-[0.95] text-white transition-all duration-700 hover:text-[#d3b473] ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeLink === item.key ? "text-[#d3b473]" : ""}`} style={{ transitionDelay: menuOpen ? `${160 + index * 55}ms` : "0ms" }}>
                <span>{item.label}</span>
                <span className="pb-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/28 transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#d3b473]">{String(index + 1).padStart(2, "0")}</span>
              </NavTarget>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
