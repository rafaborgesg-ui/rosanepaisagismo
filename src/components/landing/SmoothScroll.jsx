import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ disabled = false } = {}) {
  useEffect(() => {
    if (disabled || typeof window === "undefined") return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
      smoothWheel: true,
    });
    window.__rbLenis = lenis;

    const scrollToCurrentHash = (immediate = false) => {
      const hash = window.location.hash?.slice(1);
      if (!hash) return;
      const target = document.getElementById(decodeURIComponent(hash));
      if (!target) return;
      const destination = Math.max(0, target.offsetTop - 92);
      window.scrollTo({ top: destination, left: 0, behavior: "auto" });
      lenis.scrollTo(destination, { immediate, duration: immediate ? 0 : 1.05 });
    };

    const hashTimers = [
      window.setTimeout(() => scrollToCurrentHash(true), 120),
      window.setTimeout(() => scrollToCurrentHash(false), 2900),
    ];
    const handleHashChange = () => scrollToCurrentHash(false);
    window.addEventListener("hashchange", handleHashChange);

    let frameId = 0;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      hashTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", handleHashChange);
      if (window.__rbLenis === lenis) {
        delete window.__rbLenis;
      }
      lenis.destroy();
    };
  }, [disabled]);

  return null;
}
