import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Globe2, Menu, X, Linkedin, Twitter, Facebook, Mail } from "lucide-react";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Find a Mentor", to: "/mentors" },
  { label: "Community", to: "/community" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="RefugeeConnect home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Globe2 className="h-5 w-5" /></span>
          <span className="text-lg font-bold tracking-tight text-primary">Refugee<span className="text-accent">Connect</span></span>
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }} inactiveProps={{ className: "text-muted-foreground transition-colors hover:text-primary" }}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/community" className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90 lg:inline-flex">Get Started</Link>
        <button className="rounded-md p-2 text-primary lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background lg:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navItems.map((n) => (
              <li key={n.to}><Link to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: "text-accent" }} className="block rounded-md px-3 py-2 font-medium hover:bg-muted">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

const footerCols = [
  { h: "Platform", links: [["Opportunities", "/opportunities"], ["Find a Mentor", "/mentors"], ["Community", "/community"], ["For Employers", "/contact"]] },
  { h: "Organisation", links: [["About", "/about"], ["Our Impact", "/about"], ["Partners", "/about"], ["Contact", "/contact"]] },
  { h: "Support", links: [["Help Centre", "/contact"], ["Privacy Policy", "/contact"], ["Terms of Use", "/contact"], ["Accessibility", "/contact"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-bold text-primary-foreground">Refugee<span className="text-accent">Connect</span></p>
          <p className="mt-3 text-sm">Connecting Talent. Creating Opportunities.</p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Twitter, Facebook, Mail].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        {footerCols.map((c) => (
          <div key={c.h}>
            <h3 className="font-semibold text-primary-foreground">{c.h}</h3>
            <ul className="mt-4 space-y-2 text-sm">{c.links.map(([l, to]) => <li key={l}><Link to={to} className="hover:text-accent">{l}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 py-6 text-center text-xs">© 2026 RefugeeConnect. Supporting SDG 8, 10 & 17.</div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SectionTitle({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
    </div>
  );
}

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: ReactNode }) {
  return (
    <section className="bg-hero text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{text}</p>
        {children}
      </div>
    </section>
  );
}

export function DemoBadge({ children = "Demonstration data — fictional examples" }: { children?: ReactNode }) {
  return <p className="inline-block rounded-full bg-teal-soft px-4 py-1 text-xs font-semibold text-primary">{children}</p>;
}

export const inputCls = "w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";
export const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground";

export function seo(path: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export function Filter({ label, value, set, options }: { label: string; value: string; set: (v: string) => void; options: string[] }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select className={inputCls} value={value} onChange={(e) => set(e.target.value)} aria-label={label}>
        {options.map((o) => <option key={o} value={o}>{o === "All" ? `All ${label.toLowerCase()}s` : o}</option>)}
      </select>
    </label>
  );
}
