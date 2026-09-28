import Link from "next/link";
import { contentPagePath, contentPages } from "@/lib/content-pages";

type Props = { compact?: boolean };

const guideLabels: Record<(typeof contentPages)[number]["slug"], { compact: string; heading: string }> = {
  "roof-problem-photo-checklist": { compact: "Photo checklist", heading: "What photos help with a roof problem" },
  "roof-leak-investigation": { compact: "How leaks are investigated", heading: "How a roof leak is investigated" },
  "what-to-do-when-your-roof-leaks": { compact: "What to do when a roof leaks", heading: "What to do when your roof starts leaking" },
  "slipped-or-missing-roof-tiles": { compact: "Slipped or missing tiles", heading: "What slipped or missing roof tiles can mean" }
};

export function GuideLinks({ compact = false }: Props) {
  if (compact) {
    return <nav className="cta-guide-links" aria-label="Roof problem information">
      <span>Before you send an enquiry:</span>
      {contentPages.map((page) => <Link key={page.slug} href={contentPagePath(page)}>{guideLabels[page.slug].compact}</Link>)}
    </nav>;
  }

  return <section className="section section-light guide-links" aria-labelledby="guide-links-heading"><div className="shell">
    <p className="section-label">Roofing advice from Vallano</p>
    <h2 id="guide-links-heading">Clear information about roof problems and repairs</h2>
    <div className="guide-link-grid">
      {contentPages.map((page) => <article key={page.slug}><h3>{guideLabels[page.slug].heading}</h3><p>{page.description}</p><Link href={contentPagePath(page)}>Read the roofing advice <span aria-hidden="true">→</span></Link></article>)}
    </div>
  </div></section>;
}