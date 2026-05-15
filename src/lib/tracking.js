export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}

export function getAttributionData() {
  if (typeof window === "undefined") return {};

  const url = new URL(window.location.href);
  const qs = url.searchParams;

  return {
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: document.referrer || "",
    utm_source: qs.get("utm_source") || "",
    utm_medium: qs.get("utm_medium") || "",
    utm_campaign: qs.get("utm_campaign") || "",
    utm_content: qs.get("utm_content") || "",
    utm_term: qs.get("utm_term") || "",
  };
}
