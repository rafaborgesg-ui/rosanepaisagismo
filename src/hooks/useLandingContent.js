import { useState, useEffect } from "react";
import {
  defaultHeroSlides,
  defaultHomeTexts,
  defaultLandingContent,
  getLandingContentRecord,
} from "@/lib/landingContentStorage";

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

export function useLandingContent() {
  const [content, setContent] = useState(() => normalizeLandingContent(null));

  useEffect(() => {
    let active = true;

    getLandingContentRecord()
      .then((record) => {
        if (active) setContent(normalizeLandingContent(record));
      })
      .catch(() => {
        if (active) setContent(normalizeLandingContent(null));
      });

    return () => {
      active = false;
    };
  }, []);

  return content;
}
