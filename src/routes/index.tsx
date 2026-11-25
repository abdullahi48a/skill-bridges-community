import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Briefcase, GraduationCap, MapPin, Clock, Menu, X, UserPlus, Search,
  Handshake, Rocket, Users, Globe2, Quote, Mail, Linkedin, Twitter, Facebook,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import mentorImg from "@/assets/mentor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RefugeeConnect — Connecting Talent. Creating Opportunities." },
      { name: "description", content: "RefugeeConnect connects skilled refugees with mentors, employers, internships, fellowships and professional networks." },
      { property: "og:title", content: "RefugeeConnect — Your Skills Deserve an Opportunity" },
      { property: "og:description", content: "A platform connecting skilled refugees with mentors, employers and career opportunities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = ["Home", "About", "Opportunities", "Find a Mentor", "Community", "Contact"];

const stats = [
  { value: "12,500+", label: "Registered professionals" },
  { value: "850+", label: "Volunteer mentors" },
  { value: "320", label: "Partner employers" },
  { value: "4,200", label: "Opportunities matched" },
];

const opportunities = [
  { type: "Internship", icon: Briefcase, title: "Software Engineering Intern", org: "Horizon Tech Labs", loc: "Remote", dur: "6 months · Paid" },
  { type: "Fellowship", icon: GraduationCap, title: "Global Leaders Fellowship", org: "Bridgeway Foundation", loc: "Nairobi, Kenya", dur: "12 months · Stipend" },
  { type: "Internship", icon: Briefcase, title: "Finance & Data Analyst Intern", org: "Meridian Partners", loc: "Berlin · Hybrid", dur: "4 months · Paid" },
];

const steps = [
  { icon: UserPlus, title: "Create your profile", text: "Showcase your skills, education and experience in a professional profile." },
  { icon: Search, title: "Discover opportunities", text: "Browse internships, fellowships and roles matched to your expertise." },
  { icon: Handshake, title: "Connect with mentors", text: "Get guidance from experienced professionals in your field." },
  { icon: Rocket, title: "Grow your career", text: "Apply with confidence, build your network and move forward." },
];

const sdgs = [
  { n: "8", title: "Decent Work & Economic Growth", text: "Opening pathways to fair, meaningful employment for refugee professionals." },
  { n: "10", title: "Reduced Inequalities", text: "Removing barriers so talent is recognised regardless of displacement." },
  { n: "17", title: "Partnerships for the Goals", text: "Bringing together employers, NGOs, universities and mentors." },
];

const testimonials = [
  { name: "Amina K.", role: "Data Analyst", text: "Through my mentor I rebuilt my CV, practised interviews and secured a paid internship within three months." },
  { name: "Yousef R.", role: "Civil Engineer", text: "RefugeeConnect helped me translate my qualifications and connect with employers who valued my experience." },
  { name: "Grace M.", role: "Mentor, HR Director", text: "Mentoring here is rewarding. The talent is remarkable — it just needs the right doors opened." },
];

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">Skip to content</a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2" aria-label="RefugeeConnect home">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Globe2 className="h-5 w-5" /></span>
            <span className="text-lg font-bold tracking-tight text-primary">Refugee<span className="text-accent">Connect</span></span>
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm font-medium">
              {nav.map((n, i) => (
                <li key={n}><a href="#" className={i === 0 ? "text-accent" : "text-muted-foreground transition-colors hover:text-primary"}>{n}</a></li>
              ))}
            </ul>
          </nav>
          <a href="#" className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90 lg:inline-flex">Get Started</a>
          <button className="rounded-md p-2 text-primary lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav aria-label="Mobile" className="border-t border-border lg:hidden">
            <ul className="space-y-1 px-4 py-3">
              {nav.map((n) => <li key={n}><a href="#" className="block rounded-md px-3 py-2 font-medium hover:bg-muted">{n}</a></li>)}
            </ul>
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section className="bg-hero text-primary-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium">Connecting Talent. Creating Opportunities.</p>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Your Skills Deserve an Opportunity.</h1>
              <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">RefugeeConnect links skilled refugees with professional mentors, employers, internships, fellowships and networks — so talent can thrive wherever life leads.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#opportunities" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:opacity-90">Explore Opportunities <ArrowRight className="h-4 w-4" /></a>
                <a href="#community" className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-6 py-3.5 font-semibold transition hover:bg-primary-foreground/10">Join Our Community</a>
              </div>
            </div>
            <div className="relative">
              <img src={heroImg} alt="Diverse group of professionals collaborating around a laptop" width={1024} height={1024} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl" />
              <div className="absolute -bottom-6 left-6 hidden items-center gap-3 rounded-xl bg-card p-4 text-card-foreground shadow-card sm:flex">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-soft text-accent"><Users className="h-5 w-5" /></span>
                <div><p className="text-sm font-bold">850+ mentors</p><p className="text-xs text-muted-foreground">ready to guide you</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section aria-labelledby="impact" className="border-b border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 id="impact" className="sr-only">Impact</h2>
            <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-card p-6 text-center shadow-card">
                  <dd className="font-display text-3xl font-semibold text-primary sm:text-4xl">{s.value}</dd>
                  <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-center text-xs text-muted-foreground">Demonstration data for illustrative purposes.</p>
          </div>
        </section>

        {/* Opportunities */}
        <section id="opportunities" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionTitle eyebrow="Featured" title="Internships & Fellowships" />
            <a href="#" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">View all opportunities <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((o) => (
              <article key={o.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-soft text-accent"><o.icon className="h-5 w-5" /></span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">{o.type}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-primary">{o.title}</h3>
                <p className="text-sm text-muted-foreground">{o.org}</p>
                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{o.loc}</p>
                  <p className="flex items-center gap-2"><Clock className="h-4 w-4" />{o.dur}</p>
                </div>
                <a href="#" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">Learn more <ArrowRight className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center"><SectionTitle eyebrow="Simple process" title="How It Works" center /></div>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl bg-card p-6 shadow-card">
                  <span className="absolute right-5 top-4 font-display text-4xl font-semibold text-border">0{i + 1}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><s.icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Mentorship */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <img src={mentorImg} alt="A mentor guiding a young professional" loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover shadow-card lg:aspect-[4/3]" />
          <div>
            <SectionTitle eyebrow="Mentorship" title="Guidance from people who've been there" />
            <p className="mt-5 text-muted-foreground">Our mentors are experienced professionals across technology, finance, health, engineering and more. They volunteer their time to help you navigate new job markets, refine your applications and grow your network.</p>
            <ul className="mt-6 space-y-3">
              {["One-to-one career coaching", "CV and interview preparation", "Industry introductions and referrals", "Qualification recognition support"].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-accent" />{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">Find a Mentor <ArrowRight className="h-4 w-4" /></a>
              <a href="#" className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 font-semibold text-primary hover:bg-muted">Become a Mentor</a>
            </div>
          </div>
        </section>

        {/* SDGs */}
        <section className="bg-navy-deep text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Sustainable Development Goals</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Aligned with the global agenda</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {sdgs.map((g) => (
                <article key={g.n} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-7">
                  <span className="font-display text-5xl font-semibold text-accent">SDG {g.n}</span>
                  <h3 className="mt-4 text-lg font-bold">{g.title}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">{g.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="community" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionTitle eyebrow="Voices" title="Stories from our community" center />
            <p className="mx-auto mt-4 inline-block rounded-full bg-teal-soft px-4 py-1 text-xs font-semibold text-primary">Fictional testimonials for demonstration purposes only</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <Quote className="h-8 w-8 text-accent" />
                <blockquote className="mt-4 text-foreground">"{t.text}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{t.name[0]}</span>
                  <div><p className="font-semibold text-primary">{t.name}</p><p className="text-xs text-muted-foreground">{t.role} · Demo</p></div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-16 rounded-2xl bg-hero p-10 text-center text-primary-foreground">
            <h2 className="font-display text-3xl font-semibold">Ready to take the next step?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Join thousands of professionals, mentors and employers building a more inclusive workforce.</p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:opacity-90">Join Our Community <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>

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
          {[
            ["Platform", ["Opportunities", "Find a Mentor", "Community", "For Employers"]],
            ["Organisation", ["About", "Our Impact", "Partners", "Contact"]],
            ["Support", ["Help Centre", "Privacy Policy", "Terms of Use", "Accessibility"]],
          ].map(([h, links]) => (
            <div key={h as string}>
              <h3 className="font-semibold text-primary-foreground">{h as string}</h3>
              <ul className="mt-4 space-y-2 text-sm">{(links as string[]).map((l) => <li key={l}><a href="#" className="hover:text-accent">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 py-6 text-center text-xs">© 2026 RefugeeConnect. Supporting SDG 8, 10 & 17.</div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl" : ""}>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h2>
    </div>
  );
}
