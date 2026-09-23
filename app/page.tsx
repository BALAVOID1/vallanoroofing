import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { RepairFirst } from "@/components/RepairFirst";
import { Process } from "@/components/Process";
import { ServiceAreas } from "@/components/ServiceAreas";
import { WorkGallery } from "@/components/WorkGallery";
import { FAQs } from "@/components/FAQs";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MobileContactBar } from "@/components/MobileContactBar";
import { JsonLd } from "@/components/JsonLd";
import { buildSchema } from "@/lib/schema";

export default function Home() {
  return <><a className="skip-link" href="#main-content">Skip to main content</a><div id="top" /><Header /><main id="main-content"><Hero /><Services /><RepairFirst /><Process /><ServiceAreas /><WorkGallery /><FAQs /><FinalCTA /></main><Footer /><MobileContactBar /><JsonLd data={buildSchema()} /></>;
}