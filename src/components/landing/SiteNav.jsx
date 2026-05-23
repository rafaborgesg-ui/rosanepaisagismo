import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const logoTopo = content?.logo_topo_url || "/brand/rosane-logo-white.png";
  const logoSize = Number(content?.logo_topo_size) || 100;
  const logoHeight = Math.min(56, Math.max(30, logoSize * 0.34));
  const heroLogoHeight = Math.min(118, Math.max(64, logoSize * 0.74));
  const logoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => activeLink !== "inicio" || (typeof window !== "undefined" && window.innerWidth < 768)
  );
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    if (activeLink !== "inicio") {
      setIsScrolled(true);
      return undefined;
    }

    let frameId = 0;
    const update = () => {
      frameId = 0;
      const isMobile = window.innerWidth < 768;
      setIsMobileViewport(isMobile);
      setIsScrolled(isMobile || window.scrollY > Math.max(window.innerHeight * 0.78, 560));
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

  useLayoutEffect(() => {
    const logo = logoRef.current;
    if (!logo) return undefined;

    let frameId = 0;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const mix = (from, to, progress) => from + (to - from) * progress;

    const updateLogoPosition = () => {
      frameId = 0;
      const isHome = activeLink === "inicio";
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isDesktop = viewportWidth >= 768;
      const navHeight = isDesktop ? 84 : 72;
      const navLeft = isDesktop ? 40 : 20;
      const heroBottom = isDesktop ? 48 : 30;
      const navTop = (navHeight - logoHeight) / 2;
      const heroHeight = Math.min(isDesktop ? 118 : 86, Math.max(isDesktop ? 64 : 54, logoSize * (isDesktop ? 0.74 : 0.56)));
      const heroTop = viewportHeight - heroBottom - heroHeight;
      const navWidth = Math.min(isDesktop ? 260 : 210, logoHeight * 4.8);
      const heroWidth = Math.min(viewportWidth - navLeft * 2 - (isDesktop ? 160 : 84), heroHeight * 4.7);
      const scrollRange = Math.max(viewportHeight * 0.92, isDesktop ? 760 : 560);
      const rawProgress = isHome && isDesktop && !menuOpen ? clamp(window.scrollY / scrollRange, 0, 1) : 1;
      const progress = rawProgress;
      const currentTop = isHome ? mix(heroTop, navTop, progress) : navTop;
      const currentHeight = isHome ? mix(heroHeight, logoHeight, progress) : logoHeight;
      const currentWidth = isHome ? mix(heroWidth, navWidth, progress) : navWidth;

      logo.style.transform = `translate3d(${navLeft}px, ${currentTop}px, 0)`;
      logo.style.height = `${currentHeight}px`;
      logo.style.width = `${currentWidth}px`;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateLogoPosition);
    };

    updateLogoPosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [activeLink, logoHeight, logoSize, menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const hasSurface = menuOpen || isScrolled || isMobileViewport || activeLink !== "inicio";
  const initialLogoStyle = useMemo(
    () =>
      activeLink === "inicio"
        ? {
            top: 0,
            left: 0,
            transform: `translate3d(clamp(1.25rem,2.4vw,2.5rem), clamp(${(72 - logoHeight) / 2}px, calc((100vw - 767px) * 999), calc(100svh - clamp(1.875rem,5svh,3rem) - ${heroLogoHeight}px)), 0)`,
            height: `clamp(${logoHeight}px, calc((100vw - 767px) * 999), ${heroLogoHeight}px)`,
            width: `clamp(${Math.min(210, logoHeight * 4.8)}px, calc((100vw - 767px) * 999), ${Math.min(340, heroLogoHeight * 4.7)}px)`,
            transition: "none",
          }
        : {
            top: 0,
            left: 0,
            transform: `translate3d(clamp(1.25rem,2.4vw,2.5rem), ${(84 - logoHeight) / 2}px, 0)`,
            height: `${logoHeight}px`,
            width: `${Math.min(260, logoHeight * 4.8)}px`,
            transition: "none",
          },
    [activeLink, heroLogoHeight, logoHeight]
  );

  return (
    <nav className="fixed inset-x-0 top-0 z-50 text-white">
      <div className={`absolute inset-x-0 top-0 h-[72px] transition-all duration-700 md:h-[84px] ${hasSurface ? "border-b border-white/8 bg-[rgba(8,16,9,0.68)] shadow-[0_1px_32px_rgba(0,0,0,0.16)] backdrop-blur-2xl backdrop-saturate-[1.35]" : "border-b border-transparent bg-transparent"}`} />
      <div className={`absolute inset-x-0 top-[71px] z-10 h-px transition-opacity duration-700 md:top-[83px] ${hasSurface && !menuOpen ? "opacity-80" : "opacity-0"}`} style={{ background: "linear-gradient(90deg, transparent 5%, rgba(211,180,115,0.14) 30%, rgba(211,180,115,0.2) 50%, rgba(211,180,115,0.14) 70%, transparent 95%)" }} />

      <div className="relative z-10 mx-auto flex h-[72px] max-w-[1680px] items-center justify-between px-5 md:h-[84px] md:px-10">
        <Link
          ref={logoRef}
          to="/"
          className="rb-premium-focus fixed left-0 top-0 z-20 flex origin-top-left items-center will-change-transform"
          style={initialLogoStyle}
          aria-label="Rosane Borges Paisagismo"
          onClick={closeMenu}
        >
          <img
            src={logoTopo}
            alt="Rosane Borges Paisagismo"
            className="h-full w-auto max-w-full object-contain drop-shadow-[0_2px_14px_rgba(0,0,0,0.36)]"
          />
        </Link>

        <div className={`ml-auto mr-10 hidden items-center gap-8 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/64 transition-all duration-500 xl:flex ${hasSurface && !menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
          {navItems.map((item) => (
            <NavTarget key={item.key} item={item} className={`rb-premium-focus rb-gold-accent pb-0.5 transition-colors hover:text-[#d3b473] ${activeLink === item.key ? "text-[#d3b473]" : ""}`}>{item.label}</NavTarget>
          ))}
        </div>

        <button className="rb-premium-focus rb-nav-menu-button group ml-auto inline-flex h-12 items-center gap-4 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.24em] text-white/82 transition-colors hover:text-[#d3b473]" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} type="button">
          <span className="relative block h-[1.45em] min-w-[5.25em] overflow-hidden leading-[1.45]">
            <span className={`block transition-all duration-500 ${menuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>Menu</span>
            <span className={`absolute inset-x-0 top-0 block transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>Fechar</span>
          </span>
          <span className="relative h-px w-10 overflow-hidden bg-white/20">
            <span className={`absolute inset-y-0 left-0 w-full origin-left bg-current transition-transform duration-600 ${menuOpen ? "scale-x-100" : "group-hover:scale-x-50"}`} />
          </span>
        </button>
      </div>

      <div className={`fixed inset-0 -z-10 transition-all duration-700 ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="absolute inset-0 bg-[#071009]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(211,180,115,0.055),transparent_24%),linear-gradient(120deg,#071009_0%,#08130a_48%,#040805_100%)]" />
        <div className="rb-grain absolute inset-0" />

        <div className="relative mx-auto flex min-h-svh max-w-[1680px] flex-col justify-end px-6 pb-12 pt-28 md:px-10 md:pb-16">
          <div className="mb-10 hidden h-px w-40 rb-luxury-hairline-left md:block" aria-hidden="true" />
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
