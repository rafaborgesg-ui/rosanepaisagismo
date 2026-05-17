import { useEffect, useState } from "react";
import { premiumProjects } from "@/data/premiumProjects";

export const PORTFOLIO_STORAGE_KEY = "rbp-admin-portfolio-projects";

export function slugifyProjectTitle(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPortfolioProjects() {
  if (typeof window === "undefined") return premiumProjects;

  try {
    const stored = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!stored) return premiumProjects;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : premiumProjects;
  } catch {
    return premiumProjects;
  }
}

export function savePortfolioProjects(projects) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new CustomEvent("rbp-portfolio-projects-updated", { detail: projects }));
}

export function usePortfolioProjects() {
  const [projects, setProjects] = useState(() => getPortfolioProjects());

  useEffect(() => {
    const update = () => setProjects(getPortfolioProjects());

    window.addEventListener("storage", update);
    window.addEventListener("rbp-portfolio-projects-updated", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("rbp-portfolio-projects-updated", update);
    };
  }, []);

  return projects;
}
