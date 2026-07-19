import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  LayoutDashboard,
  User,
  Coffee,
  Send,
  MoreHorizontal,
  BookOpen,
  FileText,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Sun,
  Moon,
  ArrowRight,
  Mail,
  Github,
  Twitter,
  Linkedin,
  ChevronDown,
  ChevronRight,
  Heart,
  Search,
  Bell,
  Bits,
  Gift,
  Settings,
  Volume2,
  Maximize,
  Play,
  Pause,
  Eye,
  Share2,
  MessageSquare,
  Smile,
  Users,
  Sparkles,
  Gamepad2,
  Music,
  Tv,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swanand Wagh — Software Engineer" },
      { name: "description", content: "Personal site of Swanand Wagh, software engineer. About, projects, and contact." },
      { property: "og:title", content: "Swanand Wagh — Software Engineer" },
      { property: "og:description", content: "Personal site of Swanand Wagh." },
    ],
  }),
  component: Index,
});

type SectionId = "home" | "dashboard" | "about" | "projects" | "contact" | "others";
type TabId = "intro" | "resume" | "career" | "education";

function Index() {
  const [dark, setDark] = useState(true);
  const [section, setSection] = useState<SectionId>("about");
  const [tab, setTab] = useState<TabId>("career");

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const navItems: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Coffee },
    { id: "contact", label: "Contact", icon: Send },
    { id: "others", label: "Others", icon: MoreHorizontal },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-72 md:min-h-screen bg-[var(--sidebar-bg)] border-b md:border-b-0 md:border-r border-border p-6 flex flex-col">
        <div className="flex flex-col items-center md:items-start">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-primary to-primary-glow p-[3px]">
              <div className="w-full h-full rounded-full bg-card grid place-items-center text-3xl font-bold text-primary">
                SW
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <h1 className="text-2xl font-bold">Swanand Wagh</h1>
            <BadgeCheck className="h-5 w-5 text-primary fill-primary/20" />
          </div>
          <p className="text-sm text-muted-foreground">@alias</p>

          <div className="mt-3 flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
              Software Engineer
            </span>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                dark ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
                  dark ? "translate-x-5" : "translate-x-0.5"
                }`}
              >
                {dark ? <Moon className="h-3 w-3 text-primary" /> : <Sun className="h-3 w-3 text-amber-500" />}
              </span>
            </button>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/80 hover:bg-card-hover hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                <ArrowRight
                  className={`h-4 w-4 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                />
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center md:text-left">
          © 2026 with <Heart className="inline h-3 w-3 fill-primary text-primary" /> by Swanand
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl">
        {section === "home" && <HomeSection onGoAbout={() => setSection("about")} />}
        {section === "dashboard" && <DashboardSection />}
        {section === "about" && <AboutSection tab={tab} setTab={setTab} />}
        {section === "projects" && <ProjectsSection />}
        {section === "contact" && <ContactSection />}
        {section === "others" && <OthersSection />}
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pb-6 border-b border-border">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function HomeSection({ onGoAbout }: { onGoAbout: () => void }) {
  return (
    <div>
      <SectionHeader title="Home" subtitle="Welcome to my corner of the internet." />
      <div className="mt-8 grid gap-4">
        <div className="rounded-xl bg-card border border-border p-6">
          <p className="text-sm uppercase tracking-wider text-primary font-semibold">Currently Live</p>
          <h3 className="mt-2 text-2xl font-bold">Building things at Stuut Technologies</h3>
          <p className="mt-2 text-muted-foreground">
            Shipping real-time systems, dashboards, and the occasional side quest.
          </p>
          <button
            onClick={onGoAbout}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-colors"
          >
            Follow the story <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardSection() {
  const stats = [
    { label: "Projects", value: "12" },
    { label: "Years coding", value: "6+" },
    { label: "Coffee/week", value: "∞" },
    { label: "Commits (2026)", value: "1.2k" },
  ];
  return (
    <div>
      <SectionHeader title="Dashboard" subtitle="A quick glance at the numbers." />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection({ tab, setTab }: { tab: TabId; setTab: (t: TabId) => void }) {
  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "intro", label: "Intro", icon: BookOpen },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
  ];
  return (
    <div>
      <SectionHeader title="About" subtitle="A short story of me, not important but seems better than nothing." />

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 p-1 rounded-xl bg-card border border-border">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
              }`}
            >
              <Icon className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tab === "intro" && <IntroTab />}
        {tab === "resume" && <ResumeTab />}
        {tab === "career" && <CareerTab />}
        {tab === "education" && <EducationTab />}
      </div>
    </div>
  );
}

function IntroTab() {
  return (
    <div className="rounded-xl bg-card border border-border p-6 space-y-4">
      <p className="text-lg leading-relaxed">
        Hey — I'm <span className="text-primary font-semibold">Swanand</span>. I build software for a living and for fun.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Currently a Software Engineer working on real-time systems, developer tooling, and things that involve too much
        WebSocket debugging. Previously at Apriora and Abby Intelligence. When I'm not shipping, I'm probably rewatching
        the same three streams on Twitch.
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        {["TypeScript", "Python", "Go", "React", "PostgreSQL", "AWS"].map((s) => (
          <span key={s} className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ResumeTab() {
  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <h3 className="text-xl font-bold">Resume</h3>
      <p className="mt-2 text-muted-foreground">
        The one-pager version, condensed for recruiters and their PDF viewers.
      </p>
      <a
        href="#"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-colors"
      >
        <FileText className="h-4 w-4" /> Download PDF
      </a>
    </div>
  );
}

type Job = {
  role: string;
  company: string;
  location: string;
  flag: string;
  period: string;
  duration: string;
  type: string;
  mode: string;
  logoBg: string;
  logoText: string;
  responsibilities: string[];
};

function CareerTab() {
  const jobs: Job[] = [
    {
      role: "SWE",
      company: "Stuut Technologies Inc.",
      location: "San Francisco, CA",
      flag: "🇺🇸",
      period: "Jun 2026 - Present",
      duration: "2 Months",
      type: "Fulltime",
      mode: "In-Person",
      logoBg: "bg-yellow-300",
      logoText: "S",
      responsibilities: [
        "Building the next generation of collections automation with LLM-driven workflows.",
        "Owning core services end-to-end, from schema design to on-call rotation.",
      ],
    },
    {
      role: "SWE",
      company: "Apriora Inc. dba Alex",
      location: "San Francisco, CA",
      flag: "🇺🇸",
      period: "Nov 2025 - May 2026",
      duration: "7 Months",
      type: "Fulltime",
      mode: "In-Person",
      logoBg: "bg-green-900",
      logoText: "A",
      responsibilities: [
        "Built Zoom + Recall.ai interview automation pipelines (OAuth, webhooks, transcript ingestion, media processing, cheating detection, fraud detection, etc) enabling real-time meeting capture and post-interview analytics.",
        "Remediated security vulnerabilities (IDOR, unauthenticated data exposure, NoSQL injection, path disclosure, etc) while implementing observability with Datadog (RUM, APM tracing, Logging, Synthetics, Monitors & Alerts).",
      ],
    },
    {
      role: "SWE Intern",
      company: "Abby Intelligence Inc.",
      location: "Hollywood, CA",
      flag: "🇺🇸",
      period: "Jul 2025 - Nov 2025",
      duration: "5 Months",
      type: "Internship",
      mode: "In-Person",
      logoBg: "bg-white",
      logoText: "abby",
      responsibilities: [
        "Built AI-driven consumer product features shipping to production.",
        "Prototyped speech-to-agent flows using OpenAI Realtime + custom tool routing.",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {jobs.map((j, i) => (
        <JobCard key={i} job={j} defaultOpen={i === 1} />
      ))}
    </div>
  );
}

function JobCard({ job, defaultOpen = false }: { job: Job; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition-colors">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-start">
        <div className={`h-14 w-14 rounded-lg ${job.logoBg} shrink-0 grid place-items-center font-black text-black text-lg`}>
          {job.logoText}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{job.role}</h3>
          <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-foreground/90">{job.company}</span>
            <span className="text-primary">•</span>
            <span>
              {job.location} <span className="ml-0.5">{job.flag}</span>
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground flex flex-wrap items-center gap-x-2">
            <span>{job.period}</span>
            <span className="text-primary">•</span>
            <span>{job.duration}</span>
            <span className="text-primary">•</span>
            <span>{job.type}</span>
            <span className="text-primary">•</span>
            <span>{job.mode}</span>
          </p>
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-glow"
          >
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            {open ? "Hide Responsibilities" : "Show Responsibilities"}
          </button>
          {open && (
            <ul className="mt-3 space-y-2 pl-4">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="text-sm text-muted-foreground list-disc leading-relaxed">
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function EducationTab() {
  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-start">
        <div className="h-14 w-14 rounded-lg bg-primary/20 shrink-0 grid place-items-center">
          <GraduationCap className="h-7 w-7 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold">B.S. Computer Science</h3>
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground/90">University Name</span>{" "}
            <span className="text-primary">•</span> 2021 - 2025
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Coursework in distributed systems, compilers, ML, and enough LeetCode to fill a small library.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    { name: "streamdeck.gg", desc: "Overlay tool for Twitch streamers with live chat integrations.", tag: "TypeScript" },
    { name: "queuebot", desc: "Discord bot for game queues with ELO tracking.", tag: "Go" },
    { name: "notes.sh", desc: "Terminal-first note taking with sync.", tag: "Rust" },
    { name: "portfolio", desc: "This site! Built in a weekend.", tag: "React" },
  ];
  return (
    <div>
      <SectionHeader title="Projects" subtitle="Things I built when I probably should've been sleeping." />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{p.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">{p.tag}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  const links = [
    { label: "Email", value: "hello@swanand.dev", icon: Mail, href: "mailto:hello@swanand.dev" },
    { label: "GitHub", value: "@swanand", icon: Github, href: "#" },
    { label: "Twitter", value: "@swanand", icon: Twitter, href: "#" },
    { label: "LinkedIn", value: "in/swanand", icon: Linkedin, href: "#" },
  ];
  return (
    <div>
      <SectionHeader title="Contact" subtitle="Slide into the DMs — or use email like a professional." />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <a
              key={l.label}
              href={l.href}
              className="group flex items-center gap-4 rounded-xl bg-card border border-border p-5 hover:border-primary transition-colors"
            >
              <div className="h-11 w-11 rounded-lg bg-primary/15 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{l.label}</p>
                <p className="font-semibold truncate">{l.value}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function OthersSection() {
  const items = [
    { title: "Now", desc: "What I'm up to this month." },
    { title: "Bookshelf", desc: "Recent reads, mostly sci-fi and dry technical manuals." },
    { title: "Playlists", desc: "The soundtrack to shipping bugs at 2am." },
    { title: "Uses", desc: "The gear, apps, and dotfiles powering all of this." },
  ];
  return (
    <div>
      <SectionHeader title="Others" subtitle="The miscellaneous bin. Everything that didn't fit elsewhere." />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {items.map((i) => (
          <div key={i.title} className="rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition-colors">
            <h3 className="font-bold">{i.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
