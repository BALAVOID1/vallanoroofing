import { faqs, services } from "./content";
import { siteConfig } from "./site-config";
import type { Location } from "./locations";
import { locationPath } from "./locations";

export function buildSchema() {
  const root = `${siteConfig.url}/`;
  const socialProfiles = [siteConfig.facebookUrl, siteConfig.googleBusinessUrl].filter(
    (url): url is string => Boolean(url)
  );
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor", "@id": `${root}#business`, name: siteConfig.name,
        url: root, logo: `${siteConfig.url}${siteConfig.logo}`, image: `${siteConfig.url}/work/tiled-roof-work.webp`,
        telephone: siteConfig.phoneInternational,
        sameAs: socialProfiles,
        description: "Chester-based, repair-led roofing specialists serving Christleton, Rowton and Waverton.",
        areaServed: siteConfig.areas.map((area) => ({ "@type": "Place", name: `${area}, Cheshire, United Kingdom` })),
        hasOfferCatalog: { "@id": `${root}#services` }
      },
      { "@type": "WebSite", "@id": `${root}#website`, url: root, name: siteConfig.name, publisher: { "@id": `${root}#business` } },
      { "@type": "WebPage", "@id": `${root}#webpage`, url: root, name: siteConfig.title, description: siteConfig.description, isPartOf: { "@id": `${root}#website` }, about: { "@id": `${root}#business` } },
      { "@type": "OfferCatalog", "@id": `${root}#services`, name: "Roof repair services", itemListElement: services.map(([name, description]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, description, provider: { "@id": `${root}#business` } } })) },
      { "@type": "FAQPage", "@id": `${root}#faq`, mainEntity: faqs.map(([name, answer]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text: answer } })) }
    ]
  };
}

export function buildLocationSchema(location: Location) {
  const root = `${siteConfig.url}/`;
  const path = locationPath(location);
  const url = `${siteConfig.url}${path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RoofingContractor",
        "@id": `${root}#business`,
        name: siteConfig.name,
        url: root,
        telephone: siteConfig.phoneInternational,
        areaServed: { "@type": "Place", name: `${location.name}, Cheshire, United Kingdom` }
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: location.title,
        description: location.description,
        about: { "@id": `${url}#service` },
        isPartOf: { "@id": `${root}#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Roof repair services in ${location.name}`,
        description: location.serviceCopy,
        provider: { "@id": `${root}#business` },
        areaServed: { "@type": "Place", name: `${location.name}, Cheshire, United Kingdom` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: root },
          { "@type": "ListItem", position: 2, name: `Roof repairs in ${location.name}`, item: url }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: location.faqs.map(([name, answer]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };
}