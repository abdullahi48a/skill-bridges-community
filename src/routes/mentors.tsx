import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Briefcase, Languages, CheckCircle2, X, Compass, Network, FileText, TrendingUp, HeartHandshake, ArrowRight } from "lucide-react";
import { SiteLayout, PageHero, SectionTitle, DemoBadge, Filter, inputCls, btnPrimary, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/mentors")({
  head: () => seo("/mentors", "Find a Mentor — RefugeeConnect", "Browse experienced volunteer mentors by industry, experience and language, and request mentorship."),
  component: Mentors,
});

type Mentor = { name: string; title: string; industry: string; years: number; langs: string[]; bio: string; skills: string[] };
const mentors: Mentor[] = [
  { name: "Dr. Leila Haddad", title: "Senior Software Engineer", industry: "Technology", years: 12, langs: ["English", "Arabic", "French"], bio: "Former refugee turned tech lead. Helps engineers break into international software teams.", skills: ["Web development", "Tech interviews", "Career transitions"] },
  { name: "James Okafor", title: "Finance Director", industry: "Finance", years: 18, langs: ["English", "Igbo"], bio: "Guides finance professionals through local certifications and senior-level job searches.", skills: ["Accounting", "Investment", "Leadership"] },
  { name: "Sofia Martínez", title: "HR Business Partner", industry: "Human Resources", years: 10, langs: ["English", "Spanish"], bio: "Recruiter who knows what employers look for — and how to make your CV stand out.", skills: ["CV reviews", "Recruitment", "Salary negotiation"] },
  { name: "Ahmad Rahimi", title: "Chartered Civil Engineer", industry: "Engineering", years: 15, langs: ["English", "Dari", "Pashto"], bio: "Supports engineers navigating licensing and professional registration abroad.", skills: ["Infrastructure", "Licensing", "Project management"] },
  { name: "Dr. Grace Mwangi", title: "Public Health Physician", industry: "Healthcare", years: 14, langs: ["English", "Swahili"], bio: "Mentors health workers on medical licensing, NGO careers and research roles.", skills: ["Medical licensing", "NGO careers", "Research"] },
  { name: "Elena Petrova", title: "Lead Product Designer", industry: "Technology", years: 8, langs: ["English", "Ukrainian", "Russian"], bio: "Helps designers build standout portfolios and find remote or freelance work.", skills: ["UX design", "Portfolios", "Freelancing"] },
  { name: "Samuel Tesfaye", title: "Entrepreneur & Founder", industry: "Business", years: 11, langs: ["English", "Amharic", "Tigrinya"], bio: "Built two startups after resettling. Coaches aspiring founders from idea to launch.", skills: ["Startups", "Fundraising", "Marketing"] },
  { name: "Nadia Karim", title: "Data Scientist", industry: "Technology", years: 4, langs: ["English", "Arabic"], bio: "Early-career mentor focused on upskilling in data, Python and analytics.", skills: ["Python", "Machine learning", "Upskilling"] },
  { name: "Marie Dubois", title: "Secondary School Principal", industry: "Education", years: 20, langs: ["French", "English"], bio: "Advises teachers on transferring credentials and returning to the classroom.", skills: ["Teaching", "Credential transfer", "Leadership"] },
];
const industries = ["All", ...new Set(mentors.map((m) => m.industry))];
const languages = ["All", ...[...new Set(mentors.flatMap((m) => m.langs))].sort()];
const expRanges = ["All", "Under 5 years", "5–10 years", "10–15 years", "15+ years"];
const inRange = (y: number, r: string) => r === "All" || (r === "Under 5 years" ? y < 5 : r === "5–10 years" ? y >= 5 && y < 10 : r === "10–15 years" ? y >= 10 && y < 15 : y >= 15);
const initials = (n: string) => n.replace("Dr. ", "").split(" ").map((w) => w[0]).join("");

const benefits = [
  { icon: Compass, t: "Career direction", d: "Clarify goals and map a realistic path into your field." },
  { icon: FileText, t: "Stronger applications", d: "Get expert feedback on CVs, cover letters and interviews." },
  { icon: Network, t: "Professional networks", d: "Access introductions and referrals that open doors." },
  { icon: TrendingUp, t: "Confidence & growth", d: "Learn local workplace culture and grow with support." },
];

function Mentors() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All");
  const [exp, setExp] = useState("All");
  const [lang, setLang] = useState("All");
  const [requested, setRequested] = useState<string[]>([]);
  const [open, setOpen] = useState<Mentor | null>(null);
  const list = useMemo(() => mentors.filter((m) =>
    (industry === "All" || m.industry === industry) && inRange(m.years, exp) && (lang === "All" || m.langs.includes(lang)) &&
    `${m.name} ${m.title} ${m.bio} ${m.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())), [q, industry, exp, lang]);
  const request = (n: string) => setRequested((r) => (r.includes(n) ? r : [...r, n]));

  const RequestBtn = ({ m, full }: { m: Mentor; full?: boolean }) => {
    const done = requested.includes(m.name);
    return (
      <button onClick={() => request(m.name)} disabled={done} className={`${btnPrimary} ${full ? "w-full" : "flex-1"} disabled:bg-teal-soft disabled:text-primary`}>
        {done ? <><CheckCircle2 className="h-4 w-4" /> Requested (demo)</> : "Request Mentorship"}
      </button>
    );
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Mentorship" title="Find a Mentor" text="Experienced professionals volunteer their time to guide skilled refugees — sharing industry insight, reviewing applications and opening doors to new networks." />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="-mt-20 grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-card md:grid-cols-2 lg:grid-cols-4">
          <label className="relative">
            <span className="sr-only">Search mentors</span>
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input className={`${inputCls} pl-9`} placeholder="Search name, title or skill" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <Filter label="Industry" value={industry} set={setIndustry} options={industries} />
          <Filter label="Experience" value={exp} set={setExp} options={expRanges} />
          <Filter label="Language" value={lang} set={setLang} options={languages} />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">{list.length}</span> mentors available</p>
          <DemoBadge>All mentor profiles are fictional demonstration profiles</DemoBadge>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <article key={m.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-4">
                <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-hero font-display text-xl font-semibold text-primary-foreground">{initials(m.name)}</span>
                <div>
                  <h2 className="font-bold text-primary">{m.name}</h2>
                  <p className="text-sm text-muted-foreground">{m.title}</p>
                  <span className="mt-1 inline-block rounded-full bg-teal-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{m.industry}</span>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm">{m.bio}</p>
              <p className="mt-4 flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-accent" />{m.years} years experience</p>
              <p className="mt-1 flex items-start gap-2 text-sm"><Languages className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{m.langs.join(", ")}</p>
              <p className="mt-3 text-xs font-medium text-muted-foreground">Fictional demo profile</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setOpen(m)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-primary hover:bg-muted">View Profile</button>
                <RequestBtn m={m} />
              </div>
            </article>
          ))}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No mentors match your filters. Try broadening your search.</p>}
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Why mentorship" title="The benefits of having a mentor" center />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <article key={b.t} className="rounded-2xl bg-card p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><b.icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-bold text-primary">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-hero p-10 text-center text-primary-foreground md:flex-row md:text-left">
          <HeartHandshake className="h-14 w-14 shrink-0 text-accent" />
          <div className="flex-1">
            <h2 className="font-display text-3xl font-semibold">Become a Mentor</h2>
            <p className="mt-2 text-primary-foreground/80">Share a few hours a month and help a skilled professional rebuild their career.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:opacity-90">Apply to mentor <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>

      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="mentor-title" className="fixed inset-0 z-50 grid place-items-center bg-navy-deep/60 p-4" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-lg rounded-2xl bg-card p-7 shadow-card" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button>
            <div className="flex items-center gap-4">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-hero font-display text-2xl font-semibold text-primary-foreground">{initials(open.name)}</span>
              <div>
                <h2 id="mentor-title" className="font-display text-2xl font-semibold text-primary">{open.name}</h2>
                <p className="text-sm text-muted-foreground">{open.title} · {open.industry}</p>
              </div>
            </div>
            <p className="mt-5">{open.bio}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="font-semibold text-primary">Experience</dt><dd className="text-muted-foreground">{open.years} years</dd></div>
              <div><dt className="font-semibold text-primary">Languages</dt><dd className="text-muted-foreground">{open.langs.join(", ")}</dd></div>
            </dl>
            <p className="mt-5 text-sm font-semibold text-primary">Can help with</p>
            <ul className="mt-2 flex flex-wrap gap-2">{open.skills.map((s) => <li key={s} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary">{s}</li>)}</ul>
            <div className="mt-6"><RequestBtn m={open} full /></div>
            <p className="mt-3 text-center text-xs text-muted-foreground">Fictional demonstration profile</p>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
