import Image from "next/image";
import { ContactLink } from "./ContactLink";
import { navItems, siteConfig, whatsappHref } from "@/lib/site-config";

export function Header() {
  return <header className="site-header">
    <div className="local-strip"><span>Local roof repairs</span><span>Christleton&nbsp; • &nbsp;Rowton&nbsp; • &nbsp;Waverton</span><span>Three priority service areas</span></div>
    <div className="header-inner shell">
      <a className="logo-link" href="#top" aria-label="Vallano Roofing home">
        <Image src={siteConfig.logo} alt="Vallano Roofing" width={700} height={203} priority unoptimized />
      </a>
      <nav aria-label="Main navigation">
        <ul>{navItems.map(([label, id]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
      </nav>
      <ContactLink className="button button-blue header-cta" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="header" aria-label="Contact Vallano Roofing on WhatsApp">
        <svg className="whatsapp-icon" aria-hidden="true" viewBox="0 0 24 24" width="17" height="17"><path fill="currentColor" d="M12 2a9.84 9.84 0 0 0-9.9 9.75c0 1.72.46 3.4 1.34 4.87L2 22l5.54-1.42A9.95 9.95 0 0 0 12 21.63a9.82 9.82 0 1 0 0-19.63Zm0 17.66a7.97 7.97 0 0 1-4.06-1.11l-.39-.23-3.29.85.88-3.19-.25-.41a7.74 7.74 0 0 1-1.2-4.14A8.31 8.31 0 1 1 12 19.66Zm4.56-5.83c-.25-.12-1.48-.72-1.71-.8-.23-.09-.4-.13-.56.12-.17.25-.65.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.06-.38-2.01-1.22a7.5 7.5 0 0 1-1.39-1.71c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.77-1.83-.2-.49-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.84-.87 2.05s.89 2.38 1.01 2.55c.12.16 1.74 2.62 4.22 3.67.59.25 1.05.4 1.41.52.59.18 1.13.16 1.55.1.48-.07 1.48-.6 1.69-1.17.21-.58.21-1.07.15-1.17-.07-.1-.23-.16-.48-.29Z"/></svg>
        <span className="desktop-label">WhatsApp Jamie</span><span className="mobile-label">WhatsApp</span>
      </ContactLink>
    </div>
  </header>;
}