import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactLink } from "@/components/ContactLink";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileContactBar } from "@/components/MobileContactBar";
import { services } from "@/lib/content";
import { getLocation, locationPath, locations } from "@/lib/locations";
import { buildLocationSchema } from "@/lib/schema";
import { siteConfig, whatsappHref } from "@/lib/site-config";

type Props = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  return locations.map(({ slug }) => ({ area: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = getLocation((await params).area);
  if (!location) return {};
  const canonical = locationPath(location);
  return {
    title: location.title,
    description: location.description,
    alternates: { canonical },
    openGraph: {
      title: location.title,
      description: location.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — roof repairs in ${location.name}` }]
    }
  };
}

export default async function LocationPage({ params }: Props) {
  const location = getLocation((await params).area);
  if (!location) notFound();
  const otherLocations = locations.filter(({ slug }) => slug !== location.slug);
  const detailedWorkExample = "images" in location.workExample ? location.workExample : null;

  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="location-header">
      <div className="local-strip"><span>Local roof repairs</span><span>Christleton&nbsp; • &nbsp;Rowton&nbsp; • &nbsp;Waverton</span><span>Chester &amp; surrounding areas</span></div>
      <div className="shell location-header-inner">
        <Link className="logo-link" href="/" aria-label="Vallano Roofing home"><Image src={siteConfig.logo} alt="Vallano Roofing" width={700} height={203} priority unoptimized /></Link>
        <nav aria-label="Area page navigation"><Link href="/#services">Services</Link><Link href="/#areas">Areas</Link><Link href="/#faqs">FAQs</Link></nav>
        <ContactLink className="button button-blue" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="location_header">
          <svg className="whatsapp-icon" aria-hidden="true" viewBox="0 0 24 24" width="17" height="17"><path fill="currentColor" d="M12 2a9.84 9.84 0 0 0-9.9 9.75c0 1.72.46 3.4 1.34 4.87L2 22l5.54-1.42A9.95 9.95 0 0 0 12 21.63a9.82 9.82 0 1 0 0-19.63Zm0 17.66a7.97 7.97 0 0 1-4.06-1.11l-.39-.23-3.29.85.88-3.19-.25-.41a7.74 7.74 0 0 1-1.2-4.14A8.31 8.31 0 1 1 12 19.66Zm4.56-5.83c-.25-.12-1.48-.72-1.71-.8-.23-.09-.4-.13-.56.12-.17.25-.65.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.06-.38-2.01-1.22a7.5 7.5 0 0 1-1.39-1.71c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.77-1.83-.2-.49-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.84-.87 2.05s.89 2.38 1.01 2.55c.12.16 1.74 2.62 4.22 3.67.59.25 1.05.4 1.41.52.59.18 1.13.16 1.55.1.48-.07 1.48-.6 1.69-1.17.21-.58.21-1.07.15-1.17-.07-.1-.23-.16-.48-.29Z"/></svg>
          WhatsApp Jamie
        </ContactLink>
      </div>
    </header>
    <main id="main-content">
      <section className="location-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Roof repairs in {location.name}</li></ol></nav>
          <div className="location-hero-grid">
            <div>
              <p className="eyebrow">{location.postcode} roofing service area</p>
              <h1>Roof repairs in <em>{location.name}</em></h1>
              <p className="location-lede">{location.introduction}</p>
              <div className="button-row"><ContactLink className="button button-brand" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="location_hero">Send safe photos on WhatsApp <span aria-hidden="true">→</span></ContactLink><ContactLink className="button button-outline" href={siteConfig.phoneHref} kind="phone" placement="location_hero">Call {siteConfig.phoneDisplay}</ContactLink></div>
              <p className="safe-note">Send the property postcode, a short description and photographs taken safely from ground level or inside. Never climb onto the roof.</p>
            </div>
            <div className="hero-image location-hero-image"><Image src={location.heroImage.src} alt={location.heroImage.alt} width={location.heroImage.width} height={location.heroImage.height} priority sizes="(max-width: 760px) 100vw, 42vw" /></div>
          </div>
        </div>
      </section>
      <section className="section section-white" aria-labelledby="local-service-heading"><div className="shell location-intro"><div><p className="section-label">Repair-led local roofing</p><h2 id="local-service-heading">A clear approach to roof problems in {location.name}</h2></div><div><p>{location.serviceCopy}</p><p>Vallano prioritises a suitable targeted repair over unnecessary replacement. Photos can help with an initial review, but some faults require a safe inspection before a cause or scope can be confirmed.</p></div></div></section>
      <section className={`section work-example${detailedWorkExample ? " case-file" : ""}`} aria-labelledby="work-example-heading"><div className="shell"><p className="section-label">Example of our completed work</p><h2 id="work-example-heading">{location.workExample.title}</h2>{detailedWorkExample && <p className="case-file-summary">{detailedWorkExample.summary}</p>}<div className="work-example-grid"><article><span>01</span><h3>Problem reported</h3><p>{location.workExample.problem}</p></article><article><span>02</span><h3>{detailedWorkExample ? "What the inspection found" : "Assessment and quote"}</h3><p>{location.workExample.approach}</p></article><article><span>03</span><h3>{detailedWorkExample ? "Completed repair" : "Agreed repair"}</h3><p>{location.workExample.outcome}</p></article></div>{detailedWorkExample && <><div className="case-file-details"><article><p className="case-file-kicker">How the repair was completed</p><h3>{detailedWorkExample.repairTitle}</h3><p>{detailedWorkExample.repair}</p><p>{detailedWorkExample.detail}</p></article><aside aria-labelledby="materials-heading"><p className="case-file-kicker">Materials used</p><h3 id="materials-heading">Repair specification</h3><ul>{detailedWorkExample.materials.map((material) => <li key={material}>{material}</li>)}</ul></aside></div><div className="case-file-gallery" aria-label="Example repair photographs">{detailedWorkExample.images.map((image, index) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 50vw" /><figcaption><b>{String(index + 1).padStart(2, "0")}</b><span>{image.caption}</span></figcaption></figure>)}</div></>}</div></section>
      <section className="section section-light" aria-labelledby="location-services-heading"><div className="shell"><p className="section-label">Services available</p><h2 id="location-services-heading">Roof repair enquiries in {location.name}</h2><div className="location-services">{services.slice(0, 5).map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div></div></section>
      <section className="section section-white homeowner-guidance" aria-labelledby="homeowner-guidance-heading"><div className="shell"><div className="guidance-heading"><p className="section-label">Practical homeowner guidance</p><h2 id="homeowner-guidance-heading">{location.guidance.title}</h2><p className="section-intro">{location.guidance.introduction}</p></div><div className="guidance-grid">{location.guidance.items.map((item, index) => <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><aside className="guidance-note" aria-label="Safe first steps"><strong>Safe first steps</strong><p>{location.guidance.safeFirstSteps}</p></aside></div></section>
      <section className="section section-white" aria-labelledby="location-faq-heading"><div className="shell faq-layout"><div><p className="section-label">Useful answers</p><h2 id="location-faq-heading">Roof repair questions for {location.name}</h2><p className="section-intro">Clear information helps Jamie understand the problem and recommend the sensible next step.</p></div><div className="faq-list">{location.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="section areas location-links" aria-labelledby="nearby-areas-heading"><div className="shell"><p className="section-label">Nearby service areas</p><h2 id="nearby-areas-heading">Vallano Roofing also serves</h2><div className="area-grid">{otherLocations.map((other) => <article key={other.slug}><span>{other.postcode}</span><h3>Roof repairs in {other.name}</h3><p>Read about repair-led roofing services available to homeowners in {other.name}.</p><Link href={locationPath(other)}>View {other.name} service area <b aria-hidden="true">→</b></Link></article>)}</div></div></section>
      <section className="final-cta" aria-labelledby="location-cta-heading"><div className="shell"><div><p>Have a roof problem in {location.name}?</p><h2 id="location-cta-heading">Send the details for an initial review</h2><p>Include the postcode, a short description and any photographs you can take safely.</p></div><div><ContactLink className="button button-white" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="location_footer">Start on WhatsApp <span aria-hidden="true">→</span></ContactLink><ContactLink href={siteConfig.phoneHref} kind="phone" placement="location_footer">or call {siteConfig.phoneDisplay}</ContactLink></div></div></section>
    </main>
    <Footer />
    <MobileContactBar />
    <JsonLd data={buildLocationSchema(location)} />
  </>;
}