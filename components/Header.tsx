import Image from "next/image";
import { ContactLink } from "./ContactLink";
import { navItems, siteConfig, whatsappHref } from "@/lib/site-config";

export function Header() {
  return <header className="site-header">
    <div className="local-strip"><span>Local roof repairs</span><span>Christleton&nbsp; • &nbsp;Rowton&nbsp; • &nbsp;Waverton</span><span>Chester &amp; surrounding areas</span></div>
    <div className="header-inner shell">
      <a className="logo-link" href="#top" aria-label="Vallano Roofing home">
        <Image src={siteConfig.logo} alt="Vallano Roofing" width={700} height={203} priority unoptimized />
      </a>
      <nav aria-label="Main navigation">
        <ul>{navItems.map(([label, id]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
      </nav>
      <ContactLink className="button button-blue header-cta" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="header" aria-label="WhatsApp Jamie at Vallano Roofing">WhatsApp Jamie</ContactLink>
    </div>
  </header>;
}