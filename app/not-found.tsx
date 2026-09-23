import Link from "next/link";

export default function NotFound() { return <main className="not-found"><p className="section-label">404</p><h1>That page could not be found.</h1><p>Return to Vallano Roofing’s roof-repair information and contact options.</p><Link className="button button-blue" href="/">Back to the homepage</Link></main>; }