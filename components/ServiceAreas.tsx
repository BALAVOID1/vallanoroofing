import { ContactLink } from "./ContactLink";
import { whatsappHref } from "@/lib/site-config";

const areas = [
  ["Christleton", "For roof repairs in Christleton, Vallano can investigate leaks and help with tile or slate defects, leadwork, valleys and suitable flat-roof repairs. Send your postcode, a concise description and safe photos for an initial review."],
  ["Rowton", "Vallano is a Chester-based roofer serving Rowton with repair-led help for leaks and localised roof defects. Small jobs are welcome; Jamie will review what you send and explain whether a safe inspection is the sensible next step."],
  ["Waverton", "Homeowners looking for roof repairs in Waverton can enquire about careful fault-finding and a clearly defined, targeted scope. Message the postcode and useful photos taken only from ground level or inside."]
];

export function ServiceAreas() {
  return <section className="section areas" id="areas" aria-labelledby="areas-heading"><div className="shell"><p className="section-label">Focused local coverage</p><h2 id="areas-heading">Local roof repairs across Christleton, Rowton &amp; Waverton</h2><p className="section-intro">Vallano Roofing is Chester-based, with these three neighbouring communities as the current priority service area.</p><div className="area-grid">{areas.map(([area, copy]) => <article key={area}><span>CH3</span><h3>Roof Repairs in {area}</h3><p>{copy}</p><ContactLink href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="service_area" aria-label={`Enquire on WhatsApp about roof repairs in ${area}`}>Enquire on WhatsApp <b aria-hidden="true">→</b></ContactLink></article>)}</div></div></section>;
}