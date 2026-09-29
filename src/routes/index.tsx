import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardList,
  Menu,
  Sparkles,
  UserPlus,
  X,
  Zap,
  BadgeCheck,
  Target,
} from "lucide-react";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Growth Engine — Turn Your Audience Into Booked Calls" },
      {
        name: "description",
        content:
          "AI Growth Engine helps creators, coaches and consultants capture qualified prospects and move them to a booked strategy call.",
      },
      { property: "og:title", content: "AI Growth Engine — Turn Your Audience Into Booked Calls" },
      {
        property: "og:description",
        content: "Capture qualified prospects and guide them straight to a booked strategy call.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Benefits", href: "#benefits" },
  { label: "How It Works", href: "#how-it-works" },
];

const BENEFITS = [
  { icon: Target, title: "Capture Better Leads", body: "Collect the information you need to understand every prospect." },
  { icon: Zap, title: "Move Faster", body: "Turn interest into an immediate next step." },
  { icon: CalendarCheck, title: "Book More Conversations", body: "Guide qualified prospects directly toward a strategy call." },
];

const STEPS = [
  { n: "01", icon: UserPlus, title: "Capture", body: "Visitor submits Name, Email and Niche." },
  { n: "02", icon: ClipboardList, title: "Qualify", body: "Lead information is captured and prepared for the next step." },
  { n: "03", icon: CalendarCheck, title: "Book", body: "The qualified prospect is immediately guided to book a strategy call." },
];

const PIPELINE = [
  { icon: UserPlus, label: "New Lead", sub: "Name, email & niche received" },
  { icon: BadgeCheck, label: "Qualified Prospect", sub: "Details reviewed" },
  { icon: ClipboardList, label: "Growth Assessment", sub: "Next step prepared" },
  { icon: CalendarCheck, label: "Strategy Call", sub: "Invitation sent" },
];

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 font-display text-base font-bold tracking-tight sm:text-lg">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="truncate">AI Growth <span className="text-gradient">Engine</span></span>
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-border bg-secondary/40 p-1 md:flex">
            {NAV.map((i) => (
              <a key={i.href} href={i.href} className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-background hover:text-foreground">
                {i.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <span className="hidden md:block">
              <a href="#get-started" className={`${primaryBtn} whitespace-nowrap px-5 py-2.5 text-sm`}>
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </span>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/60 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="animate-in fade-in slide-in-from-top-2 border-t border-border bg-background/95 px-4 pb-5 pt-3 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((i) => (
                <a key={i.href} href={i.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                  {i.label}
                </a>
              ))}
              <a href="#get-started" onClick={() => setMenuOpen(false)} className={`${primaryBtn} mt-3 px-5 py-3.5 text-base`}>
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero)]" />
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-28">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-cyan" /> AI-Powered Growth for Creators
              </span>
              <h1 className="mt-7 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
                Turn Your Audience Into <span className="text-gradient">Qualified Leads</span> &amp;{" "}
                <span className="text-gradient">Booked Calls</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Capture qualified prospects, understand their business, and move them seamlessly from
                interest to a booked strategy call.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#get-started" className={`${primaryBtn} px-7 py-4 text-sm sm:text-base`}>
                  Get Your Free Growth Assessment <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#how-it-works" className="glass inline-flex items-center justify-center rounded-xl px-7 py-4 text-sm font-semibold transition hover:bg-secondary sm:text-base">
                  See How It Works
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" /> Built for creators, coaches &amp; consultants.
              </p>
            </div>

            {/* Dashboard mockup */}
            <div className="relative animate-in fade-in zoom-in-95 duration-1000">
              <div className="absolute -inset-6 rounded-[2rem] bg-[image:var(--gradient-primary)] opacity-20 blur-3xl" />
              <div className="glass relative rounded-3xl p-5 shadow-[var(--shadow-elegant)] sm:p-7">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Lead Pipeline</span>
                </div>
                <ol className="mt-5 space-y-3">
                  {PIPELINE.map((p, i) => (
                    <li key={p.label} className="flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-3.5 transition hover:border-primary/40">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <p.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{p.label}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.sub}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">Step {i + 1}</span>
                    </li>
                  ))}
                </ol>
                <div className="animate-floaty mt-4 flex items-center gap-4 rounded-2xl bg-[image:var(--gradient-primary)] p-4 text-primary-foreground shadow-[var(--shadow-glow)]">
                  <CalendarCheck className="h-6 w-6 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Booked</p>
                    <p className="text-xs opacity-80">Strategy call confirmed</p>
                  </div>
                  <Check className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="benefits" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Benefits</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to turn interest into conversations
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="glass group relative rounded-3xl p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
                  <b.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="relative scroll-mt-24 py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent)]" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan">How It Works</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                From visitor to booked call in three steps
              </h2>
            </div>
            <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
              <div className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-[image:var(--gradient-text)] opacity-60 md:block" />
              {STEPS.map((s) => (
                <div key={s.n} className="relative text-center">
                  <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-background text-primary shadow-[var(--shadow-glow)]">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <p className="mt-6 font-display text-sm font-bold text-gradient">{s.n}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD CAPTURE */}
        <section id="get-started" className="scroll-mt-24 px-5 py-24 sm:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border p-6 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero)]" />
            <div className="bg-grid pointer-events-none absolute inset-0" />
            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Ready to Turn Interest Into <span className="text-gradient">Conversations?</span>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Share your name, email and niche. We&rsquo;ll use your details to prepare your free
                  growth assessment and guide you straight to booking a strategy call.
                </p>
                <ul className="mt-8 space-y-4">
                  {["Takes under a minute", "No commitment required", "Straight to the next step"].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <LeadCaptureForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <span className="font-display font-semibold text-foreground">AI Growth Engine</span>
          <span>© {new Date().getFullYear()} AI Growth Engine. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
