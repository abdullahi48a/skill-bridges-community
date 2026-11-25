import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Award, Lightbulb, BookOpen, Image, Send, TrendingUp } from "lucide-react";
import { SiteLayout, PageHero, DemoBadge, inputCls, btnPrimary, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/community")({
  head: () => seo("/community", "Community — RefugeeConnect", "Network with refugee professionals and mentors, share achievements, career advice and learning resources."),
  component: Community,
});

type Post = { id: number; author: string; role: string; time: string; tag: "Achievement" | "Career advice" | "Resource"; text: string; likes: number; comments: { author: string; text: string }[] };
const initial: Post[] = [
  { id: 1, author: "Amina K.", role: "Data Analyst", time: "2h", tag: "Achievement", text: "Thrilled to share that I've started my paid internship at a data consultancy! Huge thanks to my mentor for months of interview practice. 🎉", likes: 48, comments: [{ author: "Leila H.", text: "So proud of you, Amina! Well deserved." }] },
  { id: 2, author: "Sofia M.", role: "HR Business Partner · Mentor", time: "5h", tag: "Career advice", text: "Tip: when your qualifications are from abroad, add a one-line local equivalent next to each degree on your CV. It helps recruiters understand your level instantly.", likes: 72, comments: [] },
  { id: 3, author: "Yousef R.", role: "Civil Engineer", time: "1d", tag: "Resource", text: "Found a free online course on local building codes and safety standards — great for engineers preparing for licensing. Sharing in Resources.", likes: 31, comments: [{ author: "Ahmad R.", text: "Very useful, thank you for sharing!" }] },
];
const tagStyle = { Achievement: Award, "Career advice": Lightbulb, Resource: BookOpen };
const resources = ["Writing a CV for a new country", "Interview preparation toolkit", "Guide to qualification recognition", "Free digital skills courses", "Networking on LinkedIn"];

function Community() {
  const [posts, setPosts] = useState(initial);
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [replies, setReplies] = useState<Record<number, string>>({});

  const publish = () => {
    const text = draft.trim().slice(0, 1000);
    if (!text) return;
    setPosts([{ id: Date.now(), author: "You (demo)", role: "RefugeeConnect member", time: "now", tag: "Career advice", text, likes: 0, comments: [] }, ...posts]);
    setDraft("");
  };
  const comment = (id: number) => {
    const text = (replies[id] ?? "").trim().slice(0, 500);
    if (!text) return;
    setPosts(posts.map((p) => (p.id === id ? { ...p, comments: [...p.comments, { author: "You (demo)", text }] } : p)));
    setReplies({ ...replies, [id]: "" });
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Community" title="Grow together, professionally" text="Share wins, swap advice and discover resources with refugee professionals, mentors and allies." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-6">
          <DemoBadge>Posts and members shown are fictional demonstrations — nothing is saved</DemoBadge>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <label htmlFor="new-post" className="font-semibold text-primary">Start a post</label>
            <textarea id="new-post" rows={3} maxLength={1000} className={`${inputCls} mt-3 resize-none`} placeholder="Share an achievement, advice or resource…" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <div className="mt-3 flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary" type="button"><Image className="h-4 w-4" /> Add media</button>
              <button onClick={publish} className={btnPrimary}>Post</button>
            </div>
          </div>
          {posts.map((p) => {
            const Icon = tagStyle[p.tag];
            const isLiked = liked.includes(p.id);
            return (
              <article key={p.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{p.author[0]}</span>
                    <div><p className="font-semibold text-primary">{p.author}</p><p className="text-xs text-muted-foreground">{p.role} · {p.time}</p></div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-primary"><Icon className="h-3.5 w-3.5" />{p.tag}</span>
                </header>
                <p className="mt-4">{p.text}</p>
                <div className="mt-4 flex gap-6 border-y border-border py-2 text-sm text-muted-foreground">
                  <button onClick={() => setLiked(isLiked ? liked.filter((x) => x !== p.id) : [...liked, p.id])} className={`flex items-center gap-1.5 ${isLiked ? "text-accent" : "hover:text-primary"}`} aria-pressed={isLiked}><Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />{p.likes + (isLiked ? 1 : 0)}</button>
                  <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" />{p.comments.length}</span>
                  <button className="flex items-center gap-1.5 hover:text-primary"><Share2 className="h-4 w-4" />Share</button>
                </div>
                <ul className="mt-3 space-y-2">
                  {p.comments.map((c, i) => (
                    <li key={i} className="rounded-lg bg-muted px-4 py-2 text-sm"><span className="font-semibold text-primary">{c.author}</span> {c.text}</li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <input aria-label="Write a comment" maxLength={500} className={inputCls} placeholder="Write a comment…" value={replies[p.id] ?? ""} onChange={(e) => setReplies({ ...replies, [p.id]: e.target.value })} onKeyDown={(e) => e.key === "Enter" && comment(p.id)} />
                  <button onClick={() => comment(p.id)} className={btnPrimary} aria-label="Send comment"><Send className="h-4 w-4" /></button>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-bold text-primary"><BookOpen className="h-5 w-5 text-accent" /> Learning resources</h2>
            <ul className="mt-4 space-y-3 text-sm">{resources.map((r) => <li key={r}><a href="#" className="hover:text-accent">{r}</a></li>)}</ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-bold text-primary"><TrendingUp className="h-5 w-5 text-accent" /> Trending topics</h2>
            <div className="mt-4 flex flex-wrap gap-2">{["#CareerChange", "#TechJobs", "#Licensing", "#RemoteWork", "#Fellowships"].map((t) => <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary">{t}</span>)}</div>
          </div>
          <div className="rounded-2xl bg-hero p-6 text-primary-foreground">
            <h2 className="font-display text-xl font-semibold">Monthly networking call</h2>
            <p className="mt-2 text-sm text-primary-foreground/80">Meet mentors and peers online. Demo event — last Thursday of each month.</p>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
