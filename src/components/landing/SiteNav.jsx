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
    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
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
      <div
        className={`absolute inset-x-0 top-0 h-[76px] border-b transition-all duration-700 md:h-[88px] ${
          hasSurface
            ? "border-white/12 bg-[rgba(8,16,9,0.88)] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
      />

      <div className="relative z-10 mx-auto flex h-[76px] max-w-[1680px] items-center justify-between px-5 md:h-[88px] md:px-10">
        <Link
          to="/"
          className={`rb-premium-focus flex h-10 max-w-[210px] items-center transition duration-500 md:h-12 md:max-w-[280px] ${
            hasSurface ? "opacity-100" : "opacity-95"
          }`}
          aria-label="Rosane Borges Paisagismo"
          onClick={closeMenu}
        >
          {logoTopo ? (
            <img
              src={logoTopo}
              alt="Rosane Borges Paisagismo"
              className="w-auto object-contain brightness-0 invert drop-shadow-[0_2px_16px_rgba(0,0,0,0.42)]"
              style={{ height: `${logoSize * 0.36}px`, maxWidth: "220px" }}
            />
          ) : (
            <img
              src={brandLogoSrc}
              alt="Rosane Borges Paisagismo"
              className="h-full w-auto max-w-full object-contain drop-shadow-[0_2px_18px_rgba(0,0,0,0.42)]"
            />
          )}
        </Link>

        <div
          className={`ml-auto mr-10 hidden items-center gap-7 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/72 transition-all duration-500 xl:flex ${
            hasSurface && !menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          {navItems.map((item) => (
            <NavTarget
              key={item.key}
              item={item}
              className={`rb-premium-focus transition-colors hover:text-[#d3b473] ${
                activeLink === item.key ? "text-[#d3b473]" : ""
              }`}
            >
              {item.label}
            </NavTarget>
          ))}
        </div>

        <button
          className="rb-premium-focus group ml-auto inline-flex h-11 items-center gap-4 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/88 transition-colors hover:text-[#d3b473]"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          type="button"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className="relative h-px w-11 overflow-hidden bg-white/26">
            <span className="absolute inset-y-0 left-0 w-full origin-left bg-current transition-transform duration-500 group-hover:scale-x-50" />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 -z-10 bg-[#081009] transition-all duration-700 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <img
          src="/brand/PAISAGISMO-PRISCILLA-ROSANE_p8_i1.jpg"
          alt=""
          aria-hidden="true"
          className={`absolute inset-y-0 right-0 hidden h-full w-[45vw] object-cover opacity-28 grayscale transition duration-1000 md:block ${
            menuOpen ? "scale-100" : "scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#081009_0%,rgba(8,16,9,0.95)_48%,rgba(8,16,9,0.62)_100%)]" />
        <div className="relative mx-auto flex min-h-svh max-w-[1680px] flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
          <div className="grid gap-12 md:grid-cols-[0.74fr_minmax(340px,560px)] md:items-end">
            <div className="max-w-xl text-sm font-light leading-7 text-white/58">
              <div className="mb-8 h-px w-32 rb-luxury-hairline" aria-hidden="true" />
              Rosane Borges Paisagismo cria jardins autorais para quem busca viver melhor
              através da integração entre natureza, arquitetura e rotina.
            </div>
            <div className="grid gap-2">
              {navItems.map((item, index) => (
                <NavTarget
                  key={item.key}
                  item={item}
                  onClick={closeMenu}
                  className={`rb-premium-focus group flex items-end justify-between border-b border-white/12 py-3 font-heading text-[clamp(2.8rem,6.6vw,5.8rem)] font-medium leading-[0.86] text-white transition-all duration-700 hover:text-[#d3b473] ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  } ${activeLink === item.key ? "text-[#d3b473]" : ""}`}
                  style={{ transitionDelay: menuOpen ? `${150 + index * 60}ms` : "0ms" }}
                >
                  <span>{item.label}</span>
                  <span className="pb-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/34 transition-transform group-hover:translate-x-2 group-hover:text-[#d3b473]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </NavTarget>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
