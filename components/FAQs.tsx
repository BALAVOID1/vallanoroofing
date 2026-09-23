import { faqs } from "@/lib/content";

export function FAQs() {
  return <section className="section section-white" id="faqs" aria-labelledby="faq-heading"><div className="shell faq-layout"><div><p className="section-label">Useful answers</p><h2 id="faq-heading">Roof-repair questions</h2><p className="section-intro">Photos help with the initial review, but some faults still need a safe inspection.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true"></span></summary><p>{answer}</p></details>)}</div></div></section>;
}