/* eslint-disable react/no-unescaped-entities -- Editorial copy uses contractions. */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { GuidePageLayout } from "@/components/GuidePageLayout";
import { GuideServiceAreas } from "@/components/GuideServiceAreas";
import { contentPagePath, getContentPage } from "@/lib/content-pages";
import { siteConfig, whatsappHref } from "@/lib/site-config";

const page = getContentPage("slipped-or-missing-roof-tiles");
const heading = "What to do about slipped or missing roof tiles";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: contentPagePath(page) },
  openGraph: { title: page.title, description: page.description, url: contentPagePath(page), siteName: siteConfig.name, locale: "en_GB", type: "article", publishedTime: page.published, modifiedTime: page.lastModified },
  twitter: { card: "summary", title: page.title, description: page.description }
};

export default function SlippedOrMissingRoofTilesPage() {
  return <GuidePageLayout page={page} heading={heading}>
    <p className="guide-lede">A slipped, cracked or missing tile can leave part of the roof more exposed to wind and rain. The visible gap matters, but it does not show whether nearby fixings, underlay or battens have also deteriorated. Keep clear of loose material, record the problem safely and arrange an assessment before the opening becomes worse.</p>

    <p className="guide-safety"><strong>Never climb onto the roof to inspect or replace a tile.</strong> Keep people, pets and vehicles away from the area below loose material. If tiles are falling or there is a risk to the public, keep clear and contact the appropriate emergency service or authority where necessary.</p>

    <section aria-labelledby="warning-signs-heading"><h2 id="warning-signs-heading">Warning signs you can look for from ground level</h2><ul><li>A clear gap or uneven line in the tiled covering.</li><li>A tile sitting lower than the surrounding course or projecting at an unusual angle.</li><li>Cracked pieces in the gutter or fragments on the ground.</li><li>Exposed underlay, battens or daylight where the covering should overlap.</li><li>New damp marks following wind-driven or prolonged rain.</li><li>Neighbouring tiles that appear lifted or disturbed after high winds.</li></ul><p>These signs provide useful context, but a ground-level view cannot confirm the condition beneath the covering.</p></section>

    <section aria-labelledby="risks-heading"><h2 id="risks-heading">Why one displaced tile can still need attention</h2><p>Tiles work as an overlapping system. When one moves or breaks, rain may reach the underlay beneath and wind can act on the exposed edges of nearby tiles. Water may then travel along the underlay or roof structure before appearing internally, so the first stain may not sit below the visible gap.</p><p>A missing tile does not automatically mean the whole roof needs replacing. A targeted repair may be suitable when the surrounding covering and supporting layers remain serviceable. If fixings, battens, underlay or a wider section have deteriorated, the repair scope needs to reflect what is found.</p></section>

    <section aria-labelledby="causes-heading"><h2 id="causes-heading">What can cause tiles to slip or go missing</h2><ul><li><strong>Wind loading:</strong> strong or gusting winds can lift a tile or expose a fixing that was already weak.</li><li><strong>Failed fixings:</strong> nails, clips or other fixings can corrode, loosen or fail over time.</li><li><strong>Cracked tiles:</strong> impact, movement or deterioration can leave part of a tile unsupported.</li><li><strong>Deteriorated battens:</strong> a tile cannot be secured properly where the supporting timber has failed.</li><li><strong>Work around roof details:</strong> movement can occur beside chimneys, valleys, roof windows or other junctions where tiles have been cut or disturbed.</li></ul></section>

    <section aria-labelledby="photos-heading"><h2 id="photos-heading">Photographs that help with an initial review</h2><p>From the ground, take one wide photograph showing the affected slope and its position relative to chimneys, valleys or roof windows. Then take a closer view using the camera zoom rather than a ladder. Photograph fallen pieces only after conditions are safe, without standing below the damaged area.</p><p>If there is an internal mark, include a clear photograph showing its position and scale. The <Link href="/roof-problem-photo-checklist">roof problem photo checklist</Link> explains the useful views and what never to do.</p></section>

    <section aria-labelledby="repair-timing-heading"><h2 id="repair-timing-heading">When is a tile repair needed?</h2><p>Arrange an assessment when a tile is missing, visibly displaced or cracked through; when underlay or timber is exposed; when pieces have fallen; or when internal damp has appeared. Prompt assessment can define the opening and surrounding condition before further weather causes additional movement or water entry.</p><p>The repair may involve reinstating or replacing the affected tile and addressing confirmed local deterioration beneath it. Matching depends on the tile profile, size, material, colour and availability. Read more about <Link href="/tile-roof-repairs">Vallano's tile roof repair service</Link> and, where wind caused the damage, <Link href="/storm-damage-roof-repairs">storm damage roof repairs</Link>.</p></section>

    <section aria-labelledby="active-leak-heading"><h2 id="active-leak-heading">If water is already entering</h2><p>Keep away from affected electrics and any bulging ceiling, move belongings only where safe, and contain a straightforward drip from floor level. Follow the immediate steps in <Link href="/what-to-do-when-your-roof-leaks">what to do when your roof starts leaking</Link>. Do not attempt to reach the opening from the roof or loft.</p></section>

    <GuideServiceAreas />

    <section className="guide-contact" aria-labelledby="tile-contact-heading"><h2 id="tile-contact-heading">Send safe photographs for an initial review</h2><p>WhatsApp <ContactLink href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="footer">07990 101321</ContactLink> with the postcode, when you noticed the damage and photographs taken safely from ground level or inside.</p></section>
  </GuidePageLayout>;
}