import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLandingContent } from "@/hooks/useLandingContent";

const navItems = [
  { label: "Início", to: "/", key: "inicio" },
  { label: "Sobre", to: "/#sobre", key: "sobre" },
  { label: "Projetos", to: "/portfolio", key: "portfolio" },
  { label: "Nossos Serviços", to: "/#servicos", key: "expertise" },
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
  const brandRef = useRef(null);
  const scrolledRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (activeLink !== "inicio") return undefined;

    let frameId = 0;

    const updateBrandMotion = () => {
      frameId = 0;
      const threshold = Math.max(window.innerHeight * 0.9, 560);
      const nextScrolled = window.scrollY > threshold;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      const mobile = window.innerWidth < 768;
      const endLeft = mobile ? 20 : 40;
      const endTop = mobile ? 20 : 24;
      const endHeight = mobile ? 38 : 46;
      const startOffset = window.innerHeight * 0.73;
      const progress = Math.min(1, Math.max(0, window.scrollY / startOffset));
      const scale = 4.6 - 3.6 * progress;
      const y = Math.max(0, startOffset - window.scrollY);
      const brand = brandRef.current;

      if (brand) {
        brand.style.left = `${endLeft}px`;
        brand.style.top = `${endTop}px`;
        brand.style.height = `${endHeight}px`;
        brand.style.opacity = "1";
        brand.style.transform = `translate3d(0px, ${y.toFixed(2)}px, 0) scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
      }
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateBrandMotion);
    };

    updateBrandMotion();
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

  const isHome = activeLink === "inicio";
  const showCompactLinks = !menuOpen && (!isHome || isScrolled);
  const headerHasSurface = menuOpen || !isHome || isScrolled;
  const textGlowClass = "[text-shadow:0_2px_18px_rgba(0,0,0,0.38)]";

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 text-white">
      <div
        className={`absolute inset-x-0 top-0 h-[78px] border-b transition-all duration-500 md:h-[86px] ${
          headerHasSurface
            ? "border-white/14 bg-[#10120e] shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            : "border-transparent bg-transparent"
        }`}
      />

      <div className="relative z-10 mx-auto flex h-[78px] max-w-[1680px] items-center justify-between px-5 md:h-[86px] md:px-10">
        <Link
          ref={brandRef}
          to="/"
          className={`rb-site-brand flex min-h-8 items-center ${isHome ? "rb-site-brand-home" : ""}`}
          aria-label="Rosane Borges Paisagismo"
          onClick={closeMenu}
        >
          {logoTopo && !isHome ? (
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
              className="rb-site-brand-image drop-shadow-[0_2px_18px_rgba(0,0,0,0.42)]"
            />
          )}
        </Link>

        <div
          className={`ml-auto mr-8 hidden items-center gap-6 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/78 transition-all duration-500 lg:flex ${
            showCompactLinks ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          } ${textGlowClass}`}
        >
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
          className={`group ml-auto inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/86 transition-colors hover:text-white ${textGlowClass}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          type="button"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className="h-2.5 w-2.5 rounded-full border border-current transition-transform group-hover:scale-125" />
        </button>
      </div>

      <div
        className={`fixed inset-0 -z-10 bg-[#11150f] transition-all duration-700 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(202,177,125,0.2),transparent_32%),linear-gradient(140deg,rgba(255,255,255,0.06),transparent_42%)]" />
        <div className="relative mx-auto flex min-h-svh max-w-[1680px] flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
          <div className="grid gap-10 md:grid-cols-[1fr_minmax(340px,520px)] md:items-end">
            <div className="hidden max-w-xl text-sm font-light leading-7 text-white/58 md:block">
              Paisagismo autoral para espaços que unem arquitetura, natureza e permanência.
            </div>
            <div className="grid gap-3">
              {navItems.map((item, index) => (
                <NavTarget
                  key={item.key}
                  item={item}
                  onClick={closeMenu}
                  className={`group flex items-center justify-between border-b border-white/12 py-3 font-heading text-[clamp(2.6rem,8vw,6.9rem)] font-medium leading-[0.9] tracking-normal transition-all duration-500 hover:text-[#d3b473] ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  } ${activeLink === item.key ? "text-[#d3b473]" : "text-white"}`}
                  style={{ transitionDelay: menuOpen ? `${160 + index * 55}ms` : "0ms" }}
                >
                  <span>{item.label}</span>
                  <span className="text-base font-body font-light opacity-40 transition-transform group-hover:translate-x-2">
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
