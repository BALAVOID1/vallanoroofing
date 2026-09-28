/* eslint-disable react/no-unescaped-entities -- Published copy must remain verbatim. */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { GuidePageLayout } from "@/components/GuidePageLayout";
import { getContentPage, contentPagePath } from "@/lib/content-pages";
import { siteConfig, whatsappHref } from "@/lib/site-config";

const page = getContentPage("roof-leak-investigation");
const heading = "How a roof leak is actually investigated";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: contentPagePath(page) },
  openGraph: { title: page.title, description: page.description, url: contentPagePath(page), siteName: siteConfig.name, locale: "en_GB", type: "article", publishedTime: page.published, modifiedTime: page.lastModified },
  twitter: { card: "summary", title: page.title, description: page.description }
};

export default function RoofLeakInvestigationPage() {
  return <GuidePageLayout page={page} heading={heading}>
    <p className="guide-safety">If water is entering now, first follow the immediate safety and damage-limitation steps in <Link href="/what-to-do-when-your-roof-leaks">what to do when your roof starts leaking</Link>. This page explains how the cause is investigated once immediate risks are under control.</p>

    <section aria-labelledby="stain-heading"><h2 id="stain-heading">Why the stain isn't always below the leak</h2><p>Water rarely enters a roof and travels straight down. It often runs along a batten, a rafter or the underside of a membrane before it drips, so a stain on your ceiling can be a metre or more from where the water is getting in. Chasing the stain, instead of tracing the water's path above it, is one of the most common reasons a quick fix doesn't stop a leak.</p></section>

    <section aria-labelledby="direction-heading"><h2 id="direction-heading">What direction and timing tell us</h2><p>Before any inspection, two things narrow the search significantly:</p><ul><li><strong>Which way the wind was blowing when the leak appeared.</strong> Wind-driven rain can force water sideways under tiles, slates or flashings that are fine in still weather. A leak that only appears in a north-easterly points toward a specific junction, not a general roof fault.</li><li><strong>How quickly it appeared.</strong> A leak that shows within minutes of rain starting usually means a direct route in, often at a flashing, valley or damaged covering. One that only shows after hours of sustained rain can point to a slower route, such as water tracking along the membrane or pooling against debris.</li></ul></section>

    <section aria-labelledby="junctions-heading"><h2 id="junctions-heading">What chimneys, valleys, flashings and roof windows usually mean</h2><p>These are the roof's junctions, where two surfaces or materials meet. Most leaks start there, because they rely on overlaps and seals rather than one continuous surface.</p><ul><li><strong>Chimneys</strong> rely on lead flashing tucked into the brickwork. If the lead has lifted or cracked, or the mortar joint has failed, water can track down the chimney breast inside the loft.</li><li><strong>Valleys</strong> (where two roof slopes meet) carry a lot of water in a narrow channel. A cracked liner, or debris blocking it, makes water back up and find a way under the surrounding tiles or slates.</li><li><strong>Flashings</strong> around any abutment (where a roof meets a wall, an extension or a dormer) fail the same way: lifted, corroded or poorly lapped.</li><li><strong>Roof windows</strong> are sealed into the covering with a flashing kit. A failed seal, cracked glazing bar or blocked drainage channel around the frame are the usual causes.</li></ul></section>

    <section aria-labelledby="photographs-heading"><h2 id="photographs-heading">What can and can't be diagnosed from photographs</h2><p>Photographs are useful for a first look, and I always ask for them, but they have real limits.</p><ul><li><strong>What photos usually show clearly:</strong> a slipped, cracked or missing tile or slate; visible daylight through the covering; obvious damage to a valley or flashing; the location and pattern of an internal stain.</li><li><strong>What photos usually can't confirm:</strong> whether the felt or membrane underneath is damaged; whether water is tracking from a different point entirely; the condition of timber once it's been wet for some time; a fault hidden under an otherwise intact covering.</li></ul><p>That's why a photo review may point toward a likely cause, but a physical inspection is needed to confirm it before any repair is agreed. I'd rather tell you that honestly than guess and get it wrong.</p></section>

    <section aria-labelledby="opening-heading"><h2 id="opening-heading">Why opening a small section may sometimes be necessary</h2><p>Occasionally the only reliable way to find the entry point is to carefully lift a small area of covering near where the internal evidence points, instead of guessing from outside. This is a normal part of leak-finding, not a sign the job has grown, and I'll explain what I'm doing and why before I do it.</p></section>

    <section aria-labelledby="safe-photos-heading"><h2 id="safe-photos-heading">Photos you can send safely</h2><p>See the <Link href="/roof-problem-photo-checklist">photo checklist</Link> for exactly what helps and what to avoid. If there is visible tile damage, read what to do about <Link href="/slipped-or-missing-roof-tiles">slipped or missing roof tiles</Link>. Never go onto the roof or use a ladder to take photographs.</p></section>

    <section className="guide-contact" aria-labelledby="contact-heading"><h2 id="contact-heading">Get in touch</h2><p>WhatsApp: <ContactLink href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="footer">07990 101321</ContactLink>. Send your postcode, a short description and any safe photos, and I'll take it from there.</p></section>
  </GuidePageLayout>;
}