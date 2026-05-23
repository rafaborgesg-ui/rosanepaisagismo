import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();
  const isInstantTopPage =
    location.pathname === "/contato" ||
    location.pathname === "/portfolio" ||
    location.pathname.startsWith("/portfolio/");

  useLayoutEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash || !isInstantTopPage) return undefined;

    const jumpTo = (top) => {
      const destination = Math.max(0, top);
      window.__rbLenis?.scrollTo?.(destination, { immediate: true, force: true, duration: 0 });
      window.scrollTo({ top: destination, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = destination;
      document.body.scrollTop = destination;
    };

    jumpTo(0);
    return undefined;
  }, [isInstantTopPage, location.hash, location.key, location.pathname]);

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    const navOffset = 92;

    if (!hash) {
      if (!isInstantTopPage) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }

    const scrollToHash = () => {
      if (document.documentElement.classList.contains("rbp-preloading")) return false;
      const target = document.getElementById(decodeURIComponent(hash));
      if (!target) return false;
      const destination = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navOffset);
      if (window.__rbLenis?.scrollTo) {
        window.__rbLenis.scrollTo(destination, { duration: 1.05 });
      } else {
        window.scrollTo({
          top: destination,
          left: 0,
          behavior: "smooth",
        });
      }
      return Math.abs(window.scrollY - destination) <= 6;
    };

    if (scrollToHash()) return;

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (scrollToHash() || attempts >= 120) {
        window.clearInterval(intervalId);
      }
    }, 60);

    return () => window.clearInterval(intervalId);
  }, [isInstantTopPage, location.pathname, location.hash]);

  return null;
}
