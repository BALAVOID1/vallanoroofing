/* eslint-disable react/no-unescaped-entities -- Editorial copy uses contractions. */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { GuidePageLayout } from "@/components/GuidePageLayout";
import { GuideServiceAreas } from "@/components/GuideServiceAreas";
import { contentPagePath, getContentPage } from "@/lib/content-pages";
import { siteConfig, whatsappHref } from "@/lib/site-config";

const page = getContentPage("what-to-do-when-your-roof-leaks");
const heading = "What to do when your roof starts leaking";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: contentPagePath(page) },
  openGraph: { title: page.title, description: page.description, url: contentPagePath(page), siteName: siteConfig.name, locale: "en_GB", type: "article", publishedTime: page.published, modifiedTime: page.lastModified },
  twitter: { card: "summary", title: page.title, description: page.description }
};

export default function WhatToDoWhenYourRoofLeaksPage() {
  return <GuidePageLayout page={page} heading={heading}>
    <p className="guide-lede">If water is entering your home, the first job is to keep people safe and limit avoidable internal damage. You do not need to find or fix the roof defect yourself. Record what you can safely, then arrange for the likely cause and suitable repair to be assessed.</p>

    <p className="guide-safety"><strong>Keep clear of immediate danger.</strong> If water is near electrical fittings, the ceiling is bulging, part of the structure appears unstable or material is falling outside, keep people and pets away. Do not touch wet electrics. Contact the appropriate emergency service, electricity network operator or qualified electrician where there is an immediate electrical or public safety risk.</p>

    <ol className="guide-checklist">
      <li><h2>Move people and belongings away</h2><p>Keep the affected area clear, especially below a sagging or heavily saturated ceiling. Move furniture, electronics and valuables only when it is safe to do so. Do not stand directly beneath a bulge or try to puncture it.</p></li>
      <li><h2>Contain drips without creating another risk</h2><p>Place a bucket or watertight container beneath a straightforward drip if you can reach the area safely from floor level. Protect nearby surfaces with towels or a waterproof sheet. Do not climb on furniture, enter a wet loft or disturb a ceiling to reach the water.</p></li>
      <li><h2>Keep away from affected electrics</h2><p>Water near lights, sockets, wiring or an electrical consumer unit needs particular care. Do not touch the fitting, operate a wet switch or handle electrical equipment in the affected area. Seek appropriate electrical advice rather than assuming the area is safe.</p></li>
      <li><h2>Record when and where the water appeared</h2><p>Note when the leak started, whether rain was heavy or wind-driven, and whether the mark appeared immediately or after prolonged rain. Photograph the internal stain or drip from a safe position. This information helps with the later investigation; it does not prove where water entered the roof.</p></li>
      <li><h2>Send the postcode, description and safe photographs</h2><p>Include the property postcode, the room affected, when you first noticed the problem and whether water is still entering. A wide external view and clear internal photographs can help with an initial review. Never climb onto the roof or use a ladder to obtain them.</p></li>
    </ol>

    <section aria-labelledby="avoid-heading"><h2 id="avoid-heading">What not to do when a roof is leaking</h2><ul><li>Do not climb onto a wet, damaged or windy roof.</li><li>Do not enter a loft if access, boarding, lighting or nearby electrics make it unsafe.</li><li>Do not apply sealant from inside and assume the entry point has been repaired.</li><li>Do not stand beneath a bulging ceiling or loose external material.</li><li>Do not assume the stain sits directly below the roof defect.</li></ul></section>

    <section aria-labelledby="rain-stops-heading"><h2 id="rain-stops-heading">What to do after the rain stops</h2><p>Continue to monitor the affected area and keep a record of any change. A mark that dries does not show that the roof has repaired itself; it only shows that water is not currently reaching that point. The covering, junctions and concealed supporting layers may still need assessment.</p><p>If you want to understand how the source is traced, read <Link href="/roof-leak-investigation">how a roof leak is actually investigated</Link>. For the most useful external and internal views, use the <Link href="/roof-problem-photo-checklist">roof problem photo checklist</Link>.</p></section>

    <section aria-labelledby="repair-heading"><h2 id="repair-heading">When to arrange a roof repair assessment</h2><p>Arrange an assessment when water has entered, staining is spreading, the leak returns in similar weather, or there is visible damage to tiles, slates, valleys, flashings or another roof junction. The right scope depends on the cause and the surrounding condition, so a local repair may be suitable in some cases while wider deterioration may require a different recommendation.</p><p>Read about Vallano's approach to <Link href="/tile-roof-repairs">tile roof repairs</Link>, <Link href="/slate-roof-repairs">slate roof repairs</Link> and <Link href="/chimney-flashing-repairs">chimney flashing repairs</Link>.</p></section>

    <GuideServiceAreas />

    <section className="guide-contact" aria-labelledby="leak-contact-heading"><h2 id="leak-contact-heading">Send the details for an initial review</h2><p>WhatsApp <ContactLink href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="footer">07990 101321</ContactLink> with the postcode, a short description, when the leak appeared and any photographs taken safely from inside or ground level.</p></section>
  </GuidePageLayout>;
}