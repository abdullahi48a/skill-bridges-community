import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Briefcase, Languages, CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHero, DemoBadge, Filter, inputCls, btnPrimary, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/mentors")({
  head: () => seo("/mentors", "Find a Mentor — RefugeeConnect", "Browse volunteer mentors by profession, expertise and language, and request mentorship."),
  component: Mentors,
});

const mentors = [
  { name: "Dr. Leila Haddad", role: "Senior Software Engineer", field: "Technology", years: 12, skills: ["Web development", "Career transitions", "Interviews"], langs: ["English", "Arabic", "French"] },
  { name: "James Okafor", role: "Finance Director", field: "Finance", years: 18, skills: ["Accounting", "Investment", "Leadership"], langs: ["English", "Igbo"] },
  { name: "Sofia Martínez", role: "HR Business Partner", field: "Human Resources", years: 10, skills: ["CV reviews", "Recruitment", "Negotiation"], langs: ["English", "Spanish"] },
  { name: "Ahmad Rahimi", role: "Civil Engineer", field: "Engineering", years: 15, skills: ["Infrastructure", "Licensing", "Project mgmt"], langs: ["English", "Dari", "Pashto"] },
  { name: "Dr. Grace Mwangi", role: "Public Health Physician", field: "Healthcare", years: 14, skills: ["Medical licensing", "NGO careers", "Research"], langs: ["English", "Swahili"] },
  { name: "Elena Petrova", role: "Product Designer", field: "Technology", years: 8, skills: ["UX design", "Portfolios", "Freelancing"], langs: ["English", "Ukrainian", "Russian"] },
  { name: "Samuel Tesfaye", role: "Entrepreneur & Founder", field: "Business", years: 11, skills: ["Startups", "Fundraising", "Marketing"], langs: ["English", "Amharic", "Tigrinya"] },
  { name: "Nadia Karim", role: "Data Scientist", field: "Technology", years: 7, skills: ["Python", "Machine learning", "Upskilling"], langs: ["English", "Arabic"] },
];
const fields = ["All", ...new Set(mentors.map((m) => m.field))];
const langs = ["All", ...new Set(mentors.flatMap((m) => m.langs))].sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)));

function Mentors() {
  const [q, setQ] = useState("");
  const [field, setField] = useState("All");
  const [lang, setLang] = useState("All");
  const [requested, setRequested] = useState<string[]>([]);
  const list = useMemo(() => mentors.filter((m) =>
    (field === "All" || m.field === field) && (lang === "All" || m.langs.includes(lang)) &&
    `${m.name} ${m.role} ${m.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())), [q, field, lang]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Find a Mentor" title="Learn from professionals who care" text="Our volunteer mentors offer career guidance, CV support and industry introductions in many languages." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="-mt-20 grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-card md:grid-cols-3">
          <label className="relative">
            <span className="sr-only">Search mentors</span>
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input className={`${inputCls} pl-9`} placeholder="Search by name, role or skill" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <Filter label="Profession" value={field} set={setField} options={fields} />
          <Filter label="Language" value={lang} set={setLang} options={langs} />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">{list.length}</span> mentors available</p>
          <DemoBadge>Mentor profiles are fictional demonstration data</DemoBadge>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((m) => {
            const done = requested.includes(m.name);
            return (
              <article key={m.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-hero font-display text-xl font-semibold text-primary-foreground">{m.name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("")}</span>
                <h2 className="mt-4 font-bold text-primary">{m.name}</h2>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                <p className="mt-3 flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-accent" />{m.years} years experience</p>
                <p className="mt-1 flex items-start gap-2 text-sm"><Languages className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{m.langs.join(", ")}</p>
                <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                  {m.skills.map((s) => <li key={s} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary">{s}</li>)}
                </ul>
                <button onClick={() => setRequested((r) => [...r, m.name])} disabled={done} className={`${btnPrimary} mt-5 disabled:bg-teal-soft disabled:text-primary`}>
                  {done ? <><CheckCircle2 className="h-4 w-4" /> Request sent (demo)</> : "Request Mentorship"}
                </button>
              </article>
            );
          })}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No mentors match your search.</p>}
      </section>
    </SiteLayout>
  );
}
