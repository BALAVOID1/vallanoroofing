const FALLBACK_DEV_URL = "http://localhost:3000";

function siteOrigin(): string {
  const supplied = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (!supplied) {
    // Server-only SITE_URL is deliberately absent from the browser bundle.
    // Client components import this module only for public contact constants.
    if (typeof window !== "undefined") return FALLBACK_DEV_URL;
    if (process.env.NODE_ENV === "production") {
      throw new Error("SITE_URL is required in production and must be the canonical HTTPS origin.");
    }
    return FALLBACK_DEV_URL;
  }
  const url = new URL(supplied);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("SITE_URL must use HTTPS in production.");
  }
  return url.origin;
}

export const whatsappMessage = "Hello Jamie, I need help with a roof problem. My postcode is [POSTCODE]. The issue is [SHORT DESCRIPTION]. I can send photos taken safely from ground level or inside.";

export const siteConfig = {
  name: "Vallano Roofing",
  contactName: "Jamie",
  url: siteOrigin(),
  phoneDisplay: "07990 101321",
  phoneInternational: "+44 7990 101321",
  phoneHref: "tel:+447990101321",
  whatsappNumber: "447990101321",
  areas: ["Christleton", "Rowton", "Waverton"] as const,
  widerArea: "Chester and surrounding areas",
  title: "Roof Repairs Christleton, Rowton & Waverton | Vallano Roofing",
  description: "Repair-led roofing for leaks, tiles, slates, leadwork, valleys and suitable flat roofs across Christleton, Rowton and Waverton. WhatsApp Vallano Roofing.",
  logo: "/brand/vallano-roofing-logo.webp",
  icon: "/brand/vallano-icon.png",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://www.facebook.com/VallanoRoofing",
  googleBusinessUrl: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL || null,
  verification: process.env.GOOGLE_SITE_VERIFICATION || null,
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || null
} as const;

export function whatsappHref() {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}

export const navItems = [
  ["Repairs", "repairs"], ["Services", "services"], ["How It Works", "process"],
  ["Areas", "areas"], ["Our Work", "work"], ["FAQs", "faqs"]
] as const;