import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, CheckCircle2, FileX, Languages, Network, ShieldAlert, Briefcase } from "lucide-react";
import { SiteLayout, PageHero, SectionTitle, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => seo("/about", "About RefugeeConnect — Mission & Vision", "Our mission, vision and objectives for connecting skilled refugees with decent work, mentors and partners."),
  component: About,
});

const objectives = [
  "Connect refugee professionals with verified internships, fellowships and jobs.",
  "Build a global network of volunteer mentors across industries.",
  "Help employers recognise international qualifications and experience.",
  "Provide learning resources that strengthen employability.",
  "Foster partnerships between NGOs, universities and the private sector.",
];

const challenges = [
  { icon: FileX, title: "Unrecognised qualifications", text: "Degrees and certifications earned abroad are often not recognised by local employers." },
  { icon: Languages, title: "Language barriers", text: "Professional language requirements can hide real expertise and skill." },
  { icon: Network, title: "Limited networks", text: "Many roles are filled through referrals that newcomers simply don't have." },
  { icon: ShieldAlert, title: "Legal & documentation hurdles", text: "Work permits and missing documents create uncertainty for employers and candidates." },
  { icon: Briefcase, title: "Gaps in work history", text: "Displacement interrupts careers, making CVs harder to evaluate." },
];

const sdgs = [
  { n: "8", title: "Decent Work & Economic Growth", text: "We promote full, productive employment and fair work for refugee professionals, unlocking their contribution to host economies." },
  { n: "10", title: "Reduced Inequalities", text: "We tackle the systemic barriers that exclude displaced people from professional opportunity." },
  { n: "17", title: "Partnerships for the Goals", text: "We bring employers, mentors, NGOs and educators together to create lasting change." },
];

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About us" title="Talent has no borders." text="RefugeeConnect exists because skilled refugees bring expertise, resilience and ambition — yet too often lack a fair route into professional work." />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
        {[
          { icon: Target, h: "Our Mission", t: "To connect skilled refugees with mentors, employers and opportunities that recognise their talent and help them build meaningful careers." },
          { icon: Eye, h: "Our Vision", t: "A world where every displaced professional can access decent work and contribute fully to the communities they call home." },
        ].map((c) => (
          <article key={c.h} className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><c.icon className="h-5 w-5" /></span>
            <h2 className="mt-5 font-display text-2xl font-semibold text-primary">{c.h}</h2>
            <p className="mt-3 text-muted-foreground">{c.t}</p>
          </article>
        ))}
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionTitle eyebrow="What we aim to do" title="Our Objectives" />
            <p className="mt-4 text-muted-foreground">Practical goals that guide every feature we build and every partnership we form.</p>
          </div>
          <ul className="space-y-4">
            {objectives.map((o) => (
              <li key={o} className="flex gap-3 rounded-xl bg-card p-5 shadow-card"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" /><span>{o}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="The problem" title="Challenges skilled refugees face" center />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c) => (
            <article key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-soft text-accent"><c.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-bold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-deep text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Sustainable Development Goals</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">How we contribute</h2>
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
    </SiteLayout>
  );
}
