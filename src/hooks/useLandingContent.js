import { useState, useEffect } from "react";
import {
  defaultHeroSlides,
  defaultHomeTexts,
  defaultLandingContent,
  getLandingContentRecord,
} from "@/lib/landingContentStorage";

const LANDING_CONTENT_CACHE_KEY = "landing_content_cache_v2";
let memoryLandingContentCache = null;

function normalizeLandingContent(record) {
  const source = record || {};

  return {
    ...defaultLandingContent,
    ...source,
    logo_topo_url: source.logo_topo_url || defaultLandingContent.logo_topo_url,
    logo_topo_size: Number(source.logo_topo_size) || defaultLandingContent.logo_topo_size,
    logo_rodape_url: source.logo_rodape_url || defaultLandingContent.logo_rodape_url,
    logo_rodape_size: Number(source.logo_rodape_size) || defaultLandingContent.logo_rodape_size,
    slides: Array.isArray(source.slides) && source.slides.length ? source.slides : defaultHeroSlides,
    home_texts: {
      ...defaultHomeTexts,
      ...(source.home_texts || {}),
    },
  };
}

function readBrowserLandingCache() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LANDING_CONTENT_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeBrowserLandingCache(content) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANDING_CONTENT_CACHE_KEY, JSON.stringify(content));
  } catch {
    // Ignore storage errors and keep in-memory cache.
  }
}

function getInitialLandingContent() {
  if (memoryLandingContentCache) return memoryLandingContentCache;

  const cached = readBrowserLandingCache();
  if (cached) {
    memoryLandingContentCache = normalizeLandingContent(cached);
    return memoryLandingContentCache;
  }

  memoryLandingContentCache = normalizeLandingContent(null);
  return memoryLandingContentCache;
}

export function useLandingContent() {
  const [content, setContent] = useState(() => getInitialLandingContent());

  useEffect(() => {
    let active = true;

    getLandingContentRecord()
      .then((record) => {
        if (!active) return;
        const normalized = normalizeLandingContent(record);
        memoryLandingContentCache = normalized;
        writeBrowserLandingCache(normalized);
        setContent(normalized);
      })
      .catch(() => {
        if (!active) return;
        const fallback = getInitialLandingContent();
        setContent(fallback);
      });

    return () => {
      active = false;
    };
  }, []);

  return content;
}
