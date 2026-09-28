import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactLink } from "./ContactLink";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import type { ContentPage } from "@/lib/content-pages";
import { buildContentPageSchema } from "@/lib/schema";
import { siteConfig, whatsappHref } from "@/lib/site-config";

type Props = { page: ContentPage; heading: string; children: ReactNode };

export function GuidePageLayout({ page, heading, children }: Props) {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="location-header">
      <div className="local-strip"><span>Local roof repairs</span><span>Christleton&nbsp; • &nbsp;Rowton&nbsp; • &nbsp;Waverton</span><span>Three priority service areas</span></div>
      <div className="shell location-header-inner">
        <Link className="logo-link" href="/" aria-label="Vallano Roofing home"><Image src={siteConfig.logo} alt="Vallano Roofing" width={700} height={203} priority unoptimized /></Link>
        <nav aria-label="Roofing information page navigation"><Link href="/#services">Services</Link><Link href="/#areas">Areas</Link><Link href="/#faqs">FAQs</Link></nav>
        <ContactLink className="button button-blue" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="header">WhatsApp Jamie</ContactLink>
      </div>
    </header>
    <main id="main-content" className="guide-page">
      <header className="guide-page-hero"><div className="shell guide-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">{heading}</li></ol></nav>
        <h1>{heading}</h1>
      </div></header>
      <article className="guide-article"><div className="shell guide-shell">
        <aside className="business-source" aria-label="Information source">
          <strong>Roofing information from Vallano Roofing</strong>
          <p>Repair-led roofing guidance from Vallano Roofing, serving homeowners in Christleton, Rowton and Waverton. The correct repair depends on the evidence available and the condition confirmed at the property.</p>
        </aside>
        {children}
      </div></article>
    </main>
    <Footer />
    <JsonLd data={buildContentPageSchema(page, heading)} />
  </>;
}