import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export function useLandingContent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    base44.entities.LandingContent.list().then(records => {
      if (records.length > 0) setContent(records[0]);
    });
  }, []);

  return content;
}