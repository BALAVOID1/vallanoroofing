export type ContactEvent = "whatsapp_click" | "phone_click";
export type Placement = "header" | "hero" | "service_area" | "mobile_bar" | "footer";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

export function trackContact(event: ContactEvent, placement: Placement) {
  window.gtag?.("event", event, { placement });
}