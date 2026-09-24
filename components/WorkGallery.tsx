import Image from "next/image";

const work = [
  ["/work/slate-roof-detail.webp", "Slate roof repair with damaged slates replaced", "Slate roof repair – damaged slates replaced"],
  ["/work/chimney-leadwork-detail.webp", "Leadwork at the junction between a chimney and roof covering", "Chimney and roof leadwork detail"],
  ["/work/roof-abutment-detail.webp", "Roof abutment with a new lead detail installed", "Roof abutment – new lead detail installed"]
] as const;

export function WorkGallery() {
  return <section className="section section-light" id="work" aria-labelledby="work-heading"><div className="shell"><p className="section-label">Real work. Real evidence.</p><h2 id="work-heading">Genuine Vallano roofing work</h2><p className="section-intro">Genuine details from Vallano work, shown without unsupported location or diagnosis claims.</p><div className="gallery-grid">{work.map(([src, alt, caption], i) => <figure key={src}><Image src={src} alt={alt} width={397} height={300} sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" /><figcaption><span>{caption}</span><b>{String(i + 1).padStart(2, "0")}</b></figcaption></figure>)}</div></div></section>;
}