import Image from "next/image";
import { ContactLink } from "./ContactLink";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export function Hero() {
  return <section className="hero" id="repairs" aria-labelledby="hero-heading">
    <div className="shell hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Focused local coverage <span>•</span> Repair-led <span>•</span> Small jobs welcome</p>
        <h1 id="hero-heading">Roof repairs in <em>Christleton, Rowton &amp; Waverton</em></h1>
        <p className="hero-lede">Roof leaks, slipped or broken tiles, leadwork, valleys and suitable flat-roof repairs—investigated carefully and repaired with a clear, targeted scope.</p>
        <div className="button-row">
          <ContactLink className="button button-brand" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="hero">Send photos on WhatsApp <span aria-hidden="true">→</span></ContactLink>
          <ContactLink className="button button-outline" href={siteConfig.phoneHref} kind="phone" placement="hero">Call {siteConfig.phoneDisplay}</ContactLink>
        </div>
        <p className="safe-note">Send your postcode, a short description and any photos you can take safely from ground level or inside.</p>
        <ul className="trust-list"><li>26 years’ trade experience</li><li>Targeted repairs first</li><li>12-month workmanship guarantee on quoted work</li></ul>
      </div>
      <div className="hero-media">
        <div className="hero-image"><Image src="/work/completed-lead-abutment-flashing.jpeg" alt="Completed lead abutment flashing repair on a tiled roof by Vallano Roofing" width={1200} height={1600} priority sizes="(max-width: 800px) 100vw, 43vw" /></div>
        <div className="hero-card"><span className="kicker">Get a clear next step</span><h2>Send Jamie your postcode + safe photos</h2><p>Tell us the problem and whether the leak is active now.</p><ContactLink className="button button-brand" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="hero">Open WhatsApp enquiry <span aria-hidden="true">→</span></ContactLink><small>Never climb onto the roof.</small></div>
      </div>
    </div>
    <div className="hero-stats" aria-label="Why choose Vallano Roofing"><div><span aria-hidden="true">✓</span><strong>26 years’ trade experience</strong></div><div><span aria-hidden="true">✓</span><strong>Small roof repairs welcome</strong></div><div><span aria-hidden="true">✓</span><strong>12-month workmanship guarantee</strong></div></div>
  </section>;
}