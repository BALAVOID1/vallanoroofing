import Link from "next/link";
import { locationPath, locations } from "@/lib/locations";

export function ServiceAreas() {
  return <section className="section areas" id="areas" aria-labelledby="areas-heading"><div className="shell"><p className="section-label">Focused local coverage</p><h2 id="areas-heading">Local roof repairs across Christleton, Rowton &amp; Waverton</h2><p className="section-intro">Vallano Roofing is Chester-based, with these three neighbouring communities as the current priority service area.</p><div className="area-grid">{locations.map((location) => <article key={location.slug}><span>{location.postcode}</span><h3>Roof Repairs in {location.name}</h3><p>{location.introduction}</p><Link href={locationPath(location)} aria-label={`Read about roof repairs in ${location.name}`}>View {location.name} service area <b aria-hidden="true">→</b></Link></article>)}</div></div></section>;
}