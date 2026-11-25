import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHero, DemoBadge, inputCls, btnPrimary, seo } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => seo("/contact", "Contact RefugeeConnect", "Get in touch with the RefugeeConnect team about opportunities, mentoring or partnerships."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const info = [
  { icon: Mail, h: "Email", t: "hello@refugeeconnect.example" },
  { icon: Phone, h: "Phone", t: "+254 700 000 000" },
  { icon: MapPin, h: "Office", t: "Westlands, Nairobi, Kenya" },
  { icon: Clock, h: "Hours", t: "Mon – Fri, 9:00 – 17:00 EAT" },
];

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] ??= i.message; });
      setErrors(errs); return;
    }
    setErrors({}); setSent(true); e.currentTarget.reset();
  };
  const field = (name: keyof Errors, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-primary">{label}</label>
      {el}
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Let's start a conversation" text="Questions about opportunities, mentoring or partnering with us? Our team would love to hear from you." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-primary">Send us a message</h2>
          {sent && <p className="flex items-center gap-2 rounded-lg bg-teal-soft p-3 text-sm text-primary"><CheckCircle2 className="h-4 w-4 text-accent" /> Thank you! This is a demo form — your message was not actually sent.</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", "Full name", <input id="name" name="name" maxLength={100} className={inputCls} placeholder="Your name" />)}
            {field("email", "Email", <input id="email" name="email" type="email" maxLength={255} className={inputCls} placeholder="you@example.com" />)}
          </div>
          {field("subject", "Subject", <input id="subject" name="subject" maxLength={150} className={inputCls} placeholder="How can we help?" />)}
          {field("message", "Message", <textarea id="message" name="message" rows={6} maxLength={1000} className={`${inputCls} resize-none`} placeholder="Write your message…" />)}
          <button type="submit" className={`${btnPrimary} w-full sm:w-auto`}>Send message</button>
        </form>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {info.map((c) => (
              <div key={c.h} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-soft text-accent"><c.icon className="h-5 w-5" /></span>
                <div><p className="text-sm font-semibold text-primary">{c.h}</p><p className="text-sm text-muted-foreground">{c.t}</p></div>
              </div>
            ))}
          </div>
          <DemoBadge>Contact details are placeholders for demonstration</DemoBadge>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-4 font-display text-2xl font-semibold text-primary">Our location</h2>
        <div className="overflow-hidden rounded-2xl border border-border shadow-card">
          <iframe title="Map of Nairobi, Kenya" className="h-80 w-full" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=36.77%2C-1.28%2C36.83%2C-1.24&layer=mapnik&marker=-1.264%2C36.80" />
        </div>
      </section>
    </SiteLayout>
  );
}
