import { ContactLink } from "./ContactLink";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export function FinalCTA() {
  return <section className="final-cta" aria-labelledby="final-heading"><div className="shell"><div><p>Have a roof problem?</p><h2 id="final-heading">Worried about a leak or damaged roof?</h2><p>Send the postcode. Show the problem. Jamie will review what you send and explain the sensible next step.</p></div><div><ContactLink className="button button-white" href={whatsappHref()} target="_blank" rel="noopener noreferrer" kind="whatsapp" placement="footer">Start on WhatsApp <span aria-hidden="true">→</span></ContactLink><ContactLink href={siteConfig.phoneHref} kind="phone" placement="footer">or call {siteConfig.phoneDisplay}</ContactLink></div></div></section>;
}