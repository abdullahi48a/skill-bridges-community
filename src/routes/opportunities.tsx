import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Clock, Building2, ArrowRight } from "lucide-react";
import { SiteLayout, PageHero, DemoBadge, Filter, inputCls, btnPrimary, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/opportunities")({
  head: () => seo("/opportunities", "Opportunities — RefugeeConnect", "Search internships, fellowships, volunteering and entry-level jobs for refugee professionals."),
  component: Opportunities,
});

type Opp = { title: string; org: string; category: string; location: string; mode: string; duration: string; desc: string };
const data: Opp[] = [
  { title: "Software Engineering Intern", org: "Horizon Tech Labs", category: "Internship", location: "Remote", mode: "Remote", duration: "6 months · Paid", desc: "Build web features alongside a senior engineering team." },
  { title: "Global Leaders Fellowship", org: "Bridgeway Foundation", category: "Fellowship", location: "Nairobi", mode: "On-site", duration: "12 months · Stipend", desc: "Leadership programme for emerging changemakers." },
  { title: "Finance & Data Analyst Intern", org: "Meridian Partners", category: "Internship", location: "Berlin", mode: "Hybrid", duration: "4 months · Paid", desc: "Support financial reporting and data dashboards." },
  { title: "Community Health Volunteer", org: "CareBridge NGO", category: "Volunteering", location: "Amman", mode: "On-site", duration: "3 months", desc: "Assist health education outreach in local communities." },
  { title: "Junior UX Designer", org: "Lumen Studio", category: "Entry-level job", location: "London", mode: "Hybrid", duration: "Full-time", desc: "Design accessible interfaces for public-sector clients." },
  { title: "Research Fellowship in Migration", org: "Atlas University", category: "Fellowship", location: "Toronto", mode: "Hybrid", duration: "9 months · Stipend", desc: "Conduct applied research on labour market inclusion." },
  { title: "Customer Support Associate", org: "Nova Commerce", category: "Entry-level job", location: "Remote", mode: "Remote", duration: "Full-time", desc: "Help customers across Arabic, English and French." },
  { title: "Digital Skills Tutor", org: "OpenLearn Collective", category: "Volunteering", location: "Remote", mode: "Remote", duration: "Flexible", desc: "Teach basic coding and digital literacy online." },
  { title: "Civil Engineering Graduate", org: "Kestrel Infrastructure", category: "Entry-level job", location: "Nairobi", mode: "On-site", duration: "Full-time", desc: "Join site teams delivering water infrastructure." },
];
const uniq = (k: keyof Opp) => ["All", ...Array.from(new Set(data.map((d) => d[k])))];

function Opportunities() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [loc, setLoc] = useState("All");
  const [mode, setMode] = useState("All");
  const list = useMemo(() => data.filter((d) =>
    (cat === "All" || d.category === cat) && (loc === "All" || d.location === loc) && (mode === "All" || d.mode === mode) &&
    `${d.title} ${d.org} ${d.desc}`.toLowerCase().includes(q.toLowerCase())), [q, cat, loc, mode]);

  return (
    <SiteLayout>
      <PageHero eyebrow="Opportunities" title="Find your next opportunity" text="Internships, fellowships, volunteering and entry-level roles from employers who value diverse talent." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="-mt-20 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="grid gap-3 md:grid-cols-4">
            <label className="relative md:col-span-4 lg:col-span-1">
              <span className="sr-only">Search</span>
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input className={`${inputCls} pl-9`} placeholder="Search roles or organisations" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <Filter label="Category" value={cat} set={setCat} options={uniq("category")} />
            <Filter label="Location" value={loc} set={setLoc} options={uniq("location")} />
            <Filter label="Work arrangement" value={mode} set={setMode} options={uniq("mode")} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-primary">{list.length}</span> opportunities found</p>
          <DemoBadge>All listings are fictional demonstration opportunities</DemoBadge>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => (
            <article key={o.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-primary">{o.category}</span>
                <span className="text-xs font-medium text-muted-foreground">Demo</span>
              </div>
              <h2 className="mt-4 text-lg font-bold text-primary">{o.title}</h2>
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="h-4 w-4" />{o.org}</p>
              <p className="mt-3 flex-1 text-sm">{o.desc}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{o.location} · {o.mode}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{o.duration}</span>
              </div>
              <button className={`${btnPrimary} mt-5`}>View details <ArrowRight className="h-4 w-4" /></button>
            </article>
          ))}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No opportunities match your filters. Try broadening your search.</p>}
      </section>
    </SiteLayout>
  );
}
