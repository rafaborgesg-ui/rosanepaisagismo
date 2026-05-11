import { useState, useEffect } from "react";
import { api } from "@/api/apiService";

export function useLandingContent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.entities.LandingContent.list().then(records => {
      if (records.length > 0) setContent(records[0]);
    });
  }, []);

  return content;
}
