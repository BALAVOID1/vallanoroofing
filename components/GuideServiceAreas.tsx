import Link from "next/link";
import { locationPath, locations } from "@/lib/locations";

export function GuideServiceAreas() {
  return <aside className="guide-service-areas" aria-labelledby="guide-service-areas-heading">
    <h2 id="guide-service-areas-heading">Roof repair help in our priority service areas</h2>
    <p>Vallano Roofing welcomes roof repair enquiries from homeowners in Christleton, Rowton and Waverton.</p>
    <nav aria-label="Local roof repair pages">
      {locations.map((location) => <Link key={location.slug} href={locationPath(location)}>Roof repairs in {location.name}</Link>)}
    </nav>
  </aside>;
}