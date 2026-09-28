/* eslint-disable react/no-unescaped-entities -- Published copy must remain verbatim. */
import type { Metadata } from "next";
import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { GuidePageLayout } from "@/components/GuidePageLayout";
import { getContentPage, contentPagePath } from "@/lib/content-pages";
import { siteConfig, whatsappHref } from "@/lib/site-config";

const page = getContentPage("roof-problem-photo-checklist");
const heading = "What photos help me assess your roof problem";

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: contentPagePath(page) },
  openGraph: { title: page.title, description: page.description, url: contentPagePath(page), siteName: siteConfig.name, locale: "en_GB", type: "article", publishedTime: page.published, modifiedTime: page.lastModified },
  twitter: { card: "summary", title: page.title, description: page.description }
};

export default function RoofProblemPhotoChecklistPage() {
  return <GuidePageLayout page={page} heading={heading}>
    <p className="guide-lede">Good photos are often enough for me to give you an honest first read on what's likely going on, and they speed up everything that follows. Here's exactly what's useful, and what to avoid.</p>
    <p className="guide-safety">Never climb onto the roof or use a ladder to take these. Every photo below can be taken safely from the ground, from a window, or from inside the loft if you can access it without risk.</p>

    <ol className="guide-checklist">
      <li><h2>One wide shot of the whole roof, or the affected slope</h2><p>Taken from the ground, far enough back to show the full roof or the relevant section. This gives me context: where the problem sits relative to chimneys, valleys and abutments.</p></li>
      <li><h2>Closer photos of anything visibly wrong</h2><p>Zoom in (or walk closer, don't climb) on anything that looks displaced, cracked or missing: a lifted tile or slate, damaged flashing, a cracked ridge tile, debris sitting in a valley.</p></li>
      <li><h2>The internal damage, if there is any</h2><p>A photo of the stain, damp patch or water mark, with something in frame for scale (a light switch, a door frame). If it's spreading, a second photo a day or two later showing the change is genuinely useful.</p></li>
      <li><h2>Inside the loft, if you can get to it safely</h2><p>If you have loft access and it's safe to move around in, a photo of the underside of the roof near the stain can sometimes show the actual entry point: wet timber, a gap in the felt, daylight coming through. Only do this if your loft is genuinely safe.</p></li>
      <li><h2>What the weather was doing</h2><p>Not a photo, but tell me which direction the wind was coming from, whether it was during heavy rain or after prolonged rain, and roughly when the leak first appeared. This narrows things down more than people expect.</p></li>
    </ol>

    <section aria-labelledby="not-needed-heading"><h2 id="not-needed-heading">What I don't need</h2><ul><li>Photos from on top of the roof or from a ladder. It isn't worth the risk, and ground-level photos are almost always enough for a first look.</li><li>Old photos from before the problem started, unless they show something relevant for comparison.</li><li>Extreme close-ups with no context. A single tile filling the whole frame doesn't tell me where it sits on the roof.</li></ul></section>

    <section className="guide-contact" aria-labelledby="send-whatsapp-heading"><h2 id="send-whatsapp-heading">Send it all through WhatsApp</h2><p>Along with your postcode and a short description of what you've noticed, send everything to WhatsApp: <ContactLink href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="footer">07990 101321</ContactLink>. I'll come back to you with an honest first read and the next step.</p></section>

    <p className="guide-related">Related: <Link href="/roof-leak-investigation">How a roof leak is actually investigated</Link> · <Link href="/slipped-or-missing-roof-tiles">What to do about slipped or missing roof tiles</Link></p>
  </GuidePageLayout>;
}