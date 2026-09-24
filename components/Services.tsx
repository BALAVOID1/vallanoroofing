import { services } from "@/lib/content";
import Link from "next/link";

export function Services() {
  return <section className="section section-light" id="services" aria-labelledby="services-heading"><div className="shell">
    <p className="section-label">Roof repair services</p><h2 id="services-heading">Roof repair services for Christleton, Rowton &amp; Waverton</h2><p className="section-intro">Focused fault-finding and clearly scoped repairs, with the right repair prioritised over the biggest job.</p>
    <div className="service-grid">{services.map(([title, copy], index) => <article className={index === 0 ? "featured-dark" : index === 5 ? "featured-blue" : ""} key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p>{index === 1 && <Link href="/slate-roof-repairs">Explore slate roof repairs <b aria-hidden="true">→</b></Link>}{index === 2 && <Link href="/chimney-flashing-repairs">Explore chimney flashing repairs <b aria-hidden="true">→</b></Link>}</article>)}</div>
  </div></section>;
}