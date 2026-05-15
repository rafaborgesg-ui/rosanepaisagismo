import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    const navOffset = 92;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash);
      if (!target) return false;
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: Math.max(0, top),
        left: 0,
        behavior: "smooth",
      });
      return true;
    };

    if (scrollToHash()) return;

    let attempts = 0;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (scrollToHash() || attempts >= 20) {
        window.clearInterval(intervalId);
      }
    }, 60);

    return () => window.clearInterval(intervalId);
  }, [location.pathname, location.hash]);

  return null;
}
