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
  Diamond,
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
    <div className="min-h-screen bg-[var(--twitch-shell)] text-foreground flex flex-col">
      <TwitchTopBar />
      <div className="flex flex-1 min-h-0">
        <TwitchRail />
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          {/* Stream area */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* "Video" screen containing the actual site */}
            <div className="relative bg-black">
              <div className="relative aspect-video w-full overflow-hidden border-b-4 border-black">
                {/* Faux scanline / vignette */}
                <div className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-40"
                     style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)" }} />
                <div className="pointer-events-none absolute inset-0 z-20"
                     style={{ boxShadow: "inset 0 0 120px 20px rgba(0,0,0,0.55)" }} />

                {/* Top-left LIVE + viewers */}
                <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-live text-white text-xs font-black tracking-wider">LIVE</span>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white text-xs font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-live" /> 12,847
                  </span>
                </div>

                {/* Top-right stream time */}
                <div className="absolute top-3 right-3 z-30">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white text-xs font-mono">
                    3:42:19
                  </span>
                </div>

                {/* The website inside the "screen" */}
                <div className="absolute inset-0 z-10 overflow-auto bg-background">
                  <div className="min-h-full flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <aside className="md:w-60 shrink-0 bg-[var(--sidebar-bg)] border-b md:border-b-0 md:border-r border-border p-4 flex flex-col">
                      <div className="flex flex-col items-center md:items-start">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-primary-glow p-[3px]">
                          <div className="w-full h-full rounded-full bg-card grid place-items-center text-2xl font-bold text-primary">
                            SW
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <h1 className="text-lg font-bold">Swanand Wagh</h1>
                          <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
                        </div>
                        <p className="text-xs text-muted-foreground">@alias</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="flex items-center gap-1.5 text-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse" />
                            Software Engineer
                          </span>
                          <button
                            onClick={() => setDark((d) => !d)}
                            aria-label="Toggle theme"
                            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${dark ? "bg-primary" : "bg-muted"}`}
                          >
                            <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${dark ? "translate-x-4" : "translate-x-0.5"}`}>
                              {dark ? <Moon className="h-2.5 w-2.5 text-primary" /> : <Sun className="h-2.5 w-2.5 text-amber-500" />}
                            </span>
                          </button>
                        </div>
                      </div>

                      <nav className="mt-5 flex-1 space-y-0.5">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          const active = section === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setSection(item.id)}
                              className={`w-full group flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                                active ? "bg-primary/15 text-primary" : "text-foreground/80 hover:bg-card-hover hover:text-foreground"
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon className="h-3.5 w-3.5" />
                                {item.label}
                              </span>
                              <ArrowRight className={`h-3.5 w-3.5 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                            </button>
                          );
                        })}
                      </nav>

                      <div className="mt-5 pt-4 border-t border-border text-[10px] text-muted-foreground">
                        © 2026 with <Heart className="inline h-2.5 w-2.5 fill-primary text-primary" /> by Swanand
                      </div>
                    </aside>

                    {/* Main */}
                    <main className="flex-1 p-5 md:p-8">
                      {section === "home" && <HomeSection onGoAbout={() => setSection("about")} />}
                      {section === "dashboard" && <DashboardSection />}
                      {section === "about" && <AboutSection tab={tab} setTab={setTab} />}
                      {section === "projects" && <ProjectsSection />}
                      {section === "contact" && <ContactSection />}
                      {section === "others" && <OthersSection />}
                    </main>
                  </div>
                </div>

                {/* Player controls overlay */}
                <PlayerControls />
              </div>
            </div>

            {/* Streamer info bar (under video) */}
            <StreamerBar />
          </div>

          {/* Chat panel */}
          <TwitchChat />
        </div>
      </div>
    </div>
  );
}

function TwitchTopBar() {
  return (
    <header className="h-12 shrink-0 bg-[var(--twitch-shell)] border-b border-black/60 flex items-center justify-between px-3 gap-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-primary grid place-items-center">
          <Tv className="h-5 w-5 text-white" />
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-white/90">
          <a className="hover:text-white">Following</a>
          <a className="hover:text-white">Browse</a>
          <span className="text-white/40">|</span>
          <a className="hover:text-white flex items-center gap-1">More <ChevronDown className="h-3.5 w-3.5" /></a>
        </nav>
      </div>
      <div className="flex-1 max-w-md hidden md:block">
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-sm text-white/70">
          <Search className="h-4 w-4" />
          <span>Search</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded hover:bg-white/10 text-white/80"><Diamond className="h-4 w-4" /></button>
        <button className="p-2 rounded hover:bg-white/10 text-white/80"><Gift className="h-4 w-4" /></button>
        <button className="p-2 rounded hover:bg-white/10 text-white/80"><Bell className="h-4 w-4" /></button>
        <div className="h-7 w-7 rounded-full bg-linear-to-br from-primary to-primary-glow" />
      </div>
    </header>
  );
}

function TwitchRail() {
  const channels = [
    { name: "swanand", game: "Just Chatting", viewers: "12.8K", color: "from-primary to-primary-glow", live: true },
    { name: "ninja", game: "Fortnite", viewers: "34.2K", color: "from-rose-500 to-orange-400", live: true },
    { name: "pokimane", game: "Valorant", viewers: "18.9K", color: "from-pink-500 to-fuchsia-400", live: true },
    { name: "shroud", game: "Apex", viewers: "22.1K", color: "from-emerald-500 to-teal-400", live: true },
    { name: "xqc", game: "Chess", viewers: "45.6K", color: "from-yellow-400 to-amber-500", live: true },
    { name: "hasan", game: "Politics", viewers: "8.3K", color: "from-indigo-500 to-blue-400", live: true },
  ];
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-[var(--twitch-panel)] border-r border-black/60 p-2 gap-2 overflow-y-auto">
      <div className="flex items-center justify-between px-2 py-1 text-white/80 text-xs font-bold uppercase tracking-wider">
        <span>For You</span>
        <MoreHorizontal className="h-4 w-4" />
      </div>
      {channels.map((c) => (
        <button key={c.name} className={`flex items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors ${c.name === "swanand" ? "bg-white/10" : "hover:bg-white/5"}`}>
          <div className={`h-8 w-8 rounded-full bg-linear-to-br ${c.color} shrink-0 ring-2 ${c.live ? "ring-live" : "ring-transparent"} ring-offset-2 ring-offset-[var(--twitch-panel)]`} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{c.name}</p>
            <p className="text-xs text-white/60 truncate">{c.game}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            {c.viewers}
          </div>
        </button>
      ))}
    </aside>
  );
}

function PlayerControls() {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-14 bg-linear-to-t from-black/90 to-transparent flex items-end px-3 pb-2 gap-2">
      <button onClick={() => setPlaying((p) => !p)} className="p-1.5 rounded hover:bg-white/10 text-white">
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
      <button className="p-1.5 rounded hover:bg-white/10 text-white"><Volume2 className="h-5 w-5" /></button>
      <div className="w-20 h-1 rounded-full bg-white/25 overflow-hidden">
        <div className="h-full w-3/4 bg-white" />
      </div>
      <div className="flex items-center gap-1.5 ml-2">
        <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
        <span className="text-xs text-white font-semibold">LIVE</span>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <button className="p-1.5 rounded hover:bg-white/10 text-white"><Settings className="h-5 w-5" /></button>
        <button className="p-1.5 rounded hover:bg-white/10 text-white"><Maximize className="h-5 w-5" /></button>
      </div>
    </div>
  );
}

function StreamerBar() {
  const [following, setFollowing] = useState(false);
  return (
    <div className="bg-[var(--twitch-panel)] border-b border-black/60 p-4">
      <div className="flex items-start gap-3">
        <div className="h-14 w-14 rounded-full bg-linear-to-br from-primary to-primary-glow shrink-0 ring-2 ring-live" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-white font-bold text-lg truncate">swanand</h2>
            <BadgeCheck className="h-4 w-4 text-primary fill-primary/30" />
          </div>
          <p className="text-white text-sm truncate">shipping a portfolio site live — !socials !uses</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <a className="text-primary hover:underline font-semibold">Software & Game Development</a>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80">English</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80">React</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80">TypeScript</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80">Chill</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setFollowing((f) => !f)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-bold transition-colors ${
              following ? "bg-white/10 text-white hover:bg-white/15" : "bg-primary text-white hover:bg-primary-glow"
            }`}
          >
            <Heart className={`h-4 w-4 ${following ? "fill-primary text-primary" : ""}`} />
            {following ? "Following" : "Follow"}
          </button>
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-white text-sm font-bold hover:bg-primary-glow">
            <Diamond className="h-4 w-4" /> Subscribe
          </button>
          <button className="p-2 rounded bg-white/10 text-white hover:bg-white/15"><Share2 className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}

function TwitchChat() {
  const initialMessages = [
    { user: "modBot", color: "text-emerald-400", badge: "mod", text: "Welcome to the stream! Please follow chat rules. <3" },
    { user: "pixel_wizard", color: "text-fuchsia-400", text: "the site is CLEAN wow" },
    { user: "gamer_42", color: "text-sky-400", text: "TwitchPurple is elite theme choice PogChamp" },
    { user: "chatterbox", color: "text-amber-400", text: "click About!! click About!!" },
    { user: "swanand_fan", color: "text-rose-400", badge: "sub", text: "day 47 of watching swanand build things" },
    { user: "kappa_king", color: "text-lime-400", text: "Kappa Kappa Kappa" },
    { user: "devops_dan", color: "text-cyan-400", text: "the LIVE badge is a nice touch lol" },
    { user: "night_owl", color: "text-violet-400", text: "how did you do the scanline effect?" },
    { user: "modBot", color: "text-emerald-400", badge: "mod", text: "swanand has been live for 3 hours" },
    { user: "ez_clap", color: "text-orange-400", text: "EZ Clap 👏" },
    { user: "lurker99", color: "text-teal-400", text: "just lurking, love the vibe" },
    { user: "code_gremlin", color: "text-pink-400", badge: "sub", text: "please add a bookshelf tab ty" },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { user: "you", color: "text-primary", text: input.trim() }]);
    setInput("");
  };

  return (
    <aside className="xl:w-80 shrink-0 flex flex-col bg-[var(--twitch-panel)] border-l border-black/60 h-[70vh] xl:h-auto">
      <div className="h-12 shrink-0 border-b border-black/60 flex items-center justify-between px-3">
        <button className="p-1.5 rounded hover:bg-white/10 text-white/80"><MoreHorizontal className="h-4 w-4" /></button>
        <p className="text-white text-sm font-bold uppercase tracking-wider">Stream Chat</p>
        <button className="p-1.5 rounded hover:bg-white/10 text-white/80"><Users className="h-4 w-4" /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 text-sm">
        <div className="rounded-md bg-white/5 p-3 mb-2 text-white/80 text-xs flex gap-2">
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          <span>Welcome to the chat room! Be excellent to each other.</span>
        </div>
        {messages.map((m, i) => (
          <div key={i} className="text-white/90 leading-snug break-words">
            {m.badge === "mod" && <span className="inline-block mr-1 px-1 rounded bg-emerald-500 text-white text-[10px] font-bold align-middle">MOD</span>}
            {m.badge === "sub" && <span className="inline-block mr-1 px-1 rounded bg-primary text-white text-[10px] font-bold align-middle">SUB</span>}
            <span className={`font-bold ${m.color}`}>{m.user}</span>
            <span className="text-white/60">: </span>
            <span>{m.text}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-black/60 space-y-2">
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-md px-2 py-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Send a message"
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40"
          />
          <button className="p-1 text-white/70 hover:text-white"><Smile className="h-4 w-4" /></button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-white/60">
            <button className="p-1.5 rounded hover:bg-white/10"><Gift className="h-4 w-4" /></button>
            <button className="p-1.5 rounded hover:bg-white/10"><Diamond className="h-4 w-4" /></button>
            <button className="p-1.5 rounded hover:bg-white/10"><Zap className="h-4 w-4" /></button>
          </div>
          <button
            onClick={send}
            className="px-3 py-1.5 rounded bg-primary hover:bg-primary-glow text-white text-sm font-bold"
          >
            Chat
          </button>
        </div>
        <div className="flex items-center justify-between text-[11px] text-white/50">
          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {messages.length} messages</span>
          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> BetterTTV</span>
        </div>
      </div>
    </aside>
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
