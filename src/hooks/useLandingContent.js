import { useState, useEffect } from "react";
import { getLandingContentRecord } from "@/lib/landingContentStorage";

export function useLandingContent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let active = true;

    getLandingContentRecord()
      .then((record) => {
        if (active && record) setContent(record);
      })
      .catch(() => {
        if (active) setContent(null);
      });

    return () => {
      active = false;
    };
  }, []);

  return content;
}
