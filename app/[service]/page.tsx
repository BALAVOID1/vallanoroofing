import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactLink } from "@/components/ContactLink";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MobileContactBar } from "@/components/MobileContactBar";
import { locations, locationPath } from "@/lib/locations";
import { buildServicePageSchema } from "@/lib/schema";
import { getServicePage, servicePages, servicePath } from "@/lib/service-pages";
import { siteConfig, whatsappHref } from "@/lib/site-config";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServicePage((await params).service);
  if (!service) return {};
  const canonical = servicePath(service);
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical },
    openGraph: {
      title: service.title,
      description: service.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: service.hero.image.src, width: service.hero.image.width, height: service.hero.image.height, alt: service.hero.image.alt }]
    }
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const service = getServicePage((await params).service);
  if (!service) notFound();
  const otherService = servicePages.find(({ slug }) => slug !== service.slug)!;
  const caseStudy = "caseStudy" in service ? service.caseStudy : null;

  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="location-header">
      <div className="local-strip"><span>Local roof repairs</span><span>Christleton&nbsp; • &nbsp;Rowton&nbsp; • &nbsp;Waverton</span><span>Chester &amp; surrounding areas</span></div>
      <div className="shell location-header-inner">
        <Link className="logo-link" href="/" aria-label="Vallano Roofing home"><Image src={siteConfig.logo} alt="Vallano Roofing" width={700} height={203} priority unoptimized /></Link>
        <nav aria-label="Service page navigation"><Link href="/#services">Services</Link><Link href="/#areas">Areas</Link><Link href="/#work">Our work</Link></nav>
        <ContactLink className="button button-blue" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="service_header">WhatsApp Jamie</ContactLink>
      </div>
    </header>
    <main id="main-content">
      <section className="location-hero service-page-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">{service.name}</li></ol></nav>
          <div className="location-hero-grid"><div><p className="eyebrow">{service.hero.eyebrow}</p><h1>{service.hero.heading}{" "}<em>{service.hero.emphasis}</em></h1><p className="location-lede">{service.hero.lede}</p><div className="button-row"><ContactLink className="button button-brand" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="service_hero">Send safe photos on WhatsApp <span aria-hidden="true">→</span></ContactLink><ContactLink className="button button-outline" href={siteConfig.phoneHref} kind="phone" placement="service_hero">Call {siteConfig.phoneDisplay}</ContactLink></div><p className="safe-note">Send the property postcode, a short description and photographs taken safely from ground level or inside. Never climb onto the roof.</p></div><div className="hero-image location-hero-image"><Image src={service.hero.image.src} alt={service.hero.image.alt} width={service.hero.image.width} height={service.hero.image.height} priority sizes="(max-width: 760px) 100vw, 42vw" /></div></div>
        </div>
      </section>

      <section className="section section-white" aria-labelledby="service-introduction-heading"><div className="shell location-intro"><div><p className="section-label">A proportionate approach</p><h2 id="service-introduction-heading">{service.introduction.title}</h2></div><div>{service.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>

      <section className="section section-light" aria-labelledby="service-signs-heading"><div className="shell"><div className="guidance-heading"><div><p className="section-label">What to look for</p><h2 id="service-signs-heading">{service.signs.title}</h2></div><p className="section-intro">{service.signs.introduction}</p></div><div className="guidance-grid">{service.signs.items.map((item, index) => <article key={item.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="section work-example service-approach" aria-labelledby="service-approach-heading"><div className="shell"><p className="section-label">From enquiry to scope</p><h2 id="service-approach-heading">{service.approach.title}</h2><div className="work-example-grid">{service.approach.items.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      {caseStudy ? <section className="section work-example case-file service-case-file" aria-labelledby="service-case-study-heading"><div className="shell"><p className="section-label">Verified completed work</p><h2 id="service-case-study-heading">{caseStudy.title}</h2><p className="case-file-summary">{caseStudy.summary}</p><div className="work-example-grid"><article><span>01</span><h3>Problem reported</h3><p>{caseStudy.problem}</p></article><article><span>02</span><h3>What the inspection found</h3><p>{caseStudy.inspection}</p></article><article><span>03</span><h3>Completed repair</h3><p>{caseStudy.outcome}</p></article></div><div className="case-file-details"><article><p className="case-file-kicker">How the repair was completed</p><h3>{caseStudy.repairTitle}</h3><p>{caseStudy.repair}</p><p>{caseStudy.detail}</p></article><div className="case-file-specification" role="group" aria-labelledby="service-materials-heading"><p className="case-file-kicker">Access and materials</p><h3 id="service-materials-heading">Repair specification</h3><ul>{caseStudy.materials.map((material) => <li key={material}>{material}</li>)}</ul></div></div><div className="case-file-gallery service-case-gallery" aria-label="Chimney flashing repair photographs">{caseStudy.images.map((image, index) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 33vw" /><figcaption><b>{String(index + 1).padStart(2, "0")}</b><span>{image.caption}</span></figcaption></figure>)}</div><div className="guidance-note service-case-note" role="note" aria-label="Important repair note"><strong>Important</strong><p>{service.note}</p></div></div></section> : "evidence" in service && <section className="section section-white service-evidence" aria-labelledby="service-evidence-heading"><div className="shell"><p className="section-label">Real work. Clear context.</p><h2 id="service-evidence-heading">{service.evidenceTitle}</h2><p className="section-intro">{service.evidenceIntroduction}</p><div className={`service-evidence-grid service-evidence-grid-${service.evidence.length}`}>{service.evidence.map((item) => <article key={item.title}><Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(max-width: 760px) 100vw, 33vw" /><div><span>{item.area}</span><h3>{item.title}</h3><p>{item.text}</p>{item.href && <Link href={item.href}>Read the completed-work case study <b aria-hidden="true">→</b></Link>}</div></article>)}</div><div className="guidance-note" role="note" aria-label="Important repair note"><strong>Important</strong><p>{service.note}</p></div></div></section>}

      <section className="section section-light" aria-labelledby="service-areas-heading"><div className="shell"><p className="section-label">Priority local service areas</p><h2 id="service-areas-heading">{service.name} in Christleton, Rowton and Waverton</h2><p className="section-intro">Vallano Roofing is Chester-based and focuses this service across Christleton, Rowton and Waverton. Choose your village for local roof-repair information, homeowner guidance and relevant completed-work evidence.</p><div className="area-grid service-area-grid">{locations.map((location) => <article key={location.slug}><span>{location.postcode}</span><h3>{service.name} in {location.name}</h3><p>Read local roofing guidance and see how Vallano approaches roof repair enquiries from homeowners in {location.name}.</p><Link href={locationPath(location)}>Roof repairs in {location.name} <b aria-hidden="true">→</b></Link></article>)}</div></div></section>

      <section className="section section-white" aria-labelledby="service-faq-heading"><div className="shell faq-layout"><div><p className="section-label">Useful answers</p><h2 id="service-faq-heading">{service.name} questions</h2><p className="section-intro">The correct recommendation depends on the detail and condition found at the property.</p></div><div className="faq-list">{service.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section section-light related-service" aria-labelledby="related-service-heading"><div className="shell location-intro"><div><p className="section-label">Related roof repair service</p><h2 id="related-service-heading">Read about {otherService.name.toLowerCase()}</h2></div><div><p>{otherService.description}</p><Link className="button button-brand" href={servicePath(otherService)}>View {otherService.name.toLowerCase()} <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="final-cta" aria-labelledby="service-cta-heading"><div className="shell"><div><p>Need help with {service.name.toLowerCase()}?</p><h2 id="service-cta-heading">Send your Christleton, Rowton or Waverton property details</h2><p>Include the postcode, a short description and any photographs you can take safely.</p></div><div><ContactLink className="button button-white" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="service_footer">Start on WhatsApp <span aria-hidden="true">→</span></ContactLink><ContactLink href={siteConfig.phoneHref} kind="phone" placement="service_footer">or call {siteConfig.phoneDisplay}</ContactLink></div></div></section>
    </main>
    <Footer />
    <MobileContactBar />
    <JsonLd data={buildServicePageSchema(service)} />
  </>;
}