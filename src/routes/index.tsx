import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
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
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
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
  Zap,
} from "lucide-react";

// Active users tracking in memory (Nitro server-side state)
const activeUsers = new Map<string, { section: string; lastSeen: number }>();

export const updatePresence = createServerFn({ method: "POST" })
  .validator((data: { sessionId: string; section: string }) => data)
  .handler(async ({ data }) => {
    const { sessionId, section } = data;
    if (sessionId) {
      if (section === "offline") {
        activeUsers.delete(sessionId);
      } else {
        activeUsers.set(sessionId, { section, lastSeen: Date.now() });
      }
    }
    
    // Clean up stale sessions (older than 6 seconds)
    const now = Date.now();
    for (const [id, user] of activeUsers.entries()) {
      if (now - user.lastSeen > 6000) {
        activeUsers.delete(id);
      }
    }
    
    const counts = {
      home: 0,
      about: 0,
      contact: 0,
    };
    
    for (const user of activeUsers.values()) {
      if (user.section === "home") counts.home++;
      else if (user.section === "about") counts.about++;
      else if (user.section === "contact") counts.contact++;
    }
    
    return counts;
  });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Franco's webpage" },
      { name: "description", content: "Personal site of Franco. About, projects, and contact." },
      { property: "og:title", content: "Franco's webpage" },
      { property: "og:description", content: "Personal site of Franco." },
    ],
  }),
  component: Index,
});

type SectionId = "home" | "dashboard" | "about" | "projects" | "contact" | "others";
type TabId = "intro" | "resume" | "career" | "education";

function Index() {
  const [dark, setDark] = useState(false);
  const [section, setSection] = useState<SectionId>("home");
  const [tab, setTab] = useState<TabId>("intro");

  // Resizable inner sidebar states removed
  const [isOuterRailCollapsed, setIsOuterRailCollapsed] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);

  // Inner sidebar resize effect removed

  // Generate a tab-specific session ID so that different tabs/browsers act as distinct users
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    try {
      let id = sessionStorage.getItem("portfolio_session_id");
      if (!id) {
        id = Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem("portfolio_session_id", id);
      }
      setSessionId(id);
    } catch (e) {
      console.error("sessionStorage access failed:", e);
      setSessionId(Math.random().toString(36).substring(2, 11));
    }
  }, []);

  const [viewerCounts, setViewerCounts] = useState<{ home: number; about: number; contact: number }>({
    home: 1, // Default section starts at 1 for the current user
    about: 0,
    contact: 0,
  });

  const changeSection = (newSection: SectionId) => {
    if (newSection === "contact") {
      setIsChatCollapsed(false);
    }
    if (newSection === section) return;
    
    // Optimistic update to reflect user switching page instantly on client side
    setViewerCounts((prev) => {
      const next = { ...prev };
      if (section === "home" || section === "about" || section === "contact") {
        next[section] = Math.max(0, next[section] - 1);
      }
      if (newSection === "home" || newSection === "about" || newSection === "contact") {
        next[newSection] = (next[newSection] || 0) + 1;
      }
      return next;
    });
    
    setSection(newSection);
  };

  const toggleFullScreen = () => {
    const nextState = !isPlayerFullScreen;
    setIsPlayerFullScreen(nextState);
    if (nextState) {
      setIsOuterRailCollapsed(true);
      setIsChatCollapsed(true);
    } else {
      setIsOuterRailCollapsed(false);
      setIsChatCollapsed(true);
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    const tick = async () => {
      try {
        const counts = await updatePresence({ data: { sessionId, section } });
        setViewerCounts(counts);
      } catch (error) {
        console.error("Error updating presence:", error);
      }
    };

    tick();
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [sessionId, section]);

  useEffect(() => {
    if (!sessionId) return;

    const handleUnload = () => {
      // Send a quick request to clear presence on the server immediately when closing/reloading the page
      fetch("/_server/?_server_fn=updatePresence", {
        method: "POST",
        body: JSON.stringify({ sessionId, section: "offline" }),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [sessionId]);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const navItems: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "about", label: "About", icon: User },
    { id: "contact", label: "Contact", icon: Send },
  ];

  return (
    <div 
      className="h-screen bg-[var(--twitch-shell)] text-foreground flex flex-col overflow-hidden"
    >
      {/* Mobile Top Navigation Header */}
      <div className="lg:hidden shrink-0 flex items-center justify-between px-4 h-14 bg-[var(--twitch-panel)] border-b border-black/10 dark:border-black/60 z-30">
        <div className="flex items-center gap-2">
          <img 
            src={`${import.meta.env.BASE_URL}franco_logo.png`} 
            alt="Logo" 
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => changeSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  section === item.id 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <TwitchRail
          activeSection={section}
          onSectionChange={changeSection}
          viewerCounts={viewerCounts}
          isCollapsed={isOuterRailCollapsed}
          onToggleCollapse={() => setIsOuterRailCollapsed(!isOuterRailCollapsed)}
        />
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          {/* Stream area */}
          <div className={`flex-1 min-w-0 flex flex-col h-full justify-between ${isPlayerFullScreen ? "overflow-y-auto" : "overflow-hidden"}`}>
            {/* "Video" screen containing the actual site */}
            <div className={`relative bg-black flex flex-col transition-all duration-300 border-b-[8px] border-zinc-950 dark:border-zinc-950 ${
              isPlayerFullScreen 
                ? "h-full min-h-full shrink-0" 
                : "min-h-[300px] sm:min-h-[400px] xl:min-h-0 xl:flex-1"
            }`}>
              <div className="relative w-full h-full flex-1 overflow-hidden">
                {/* Faux scanline / vignette */}
                <div className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-30 dark:opacity-40"
                     style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)" }} />
                <div className="pointer-events-none absolute inset-0 z-20 border border-black/15 dark:border-white/10"
                     style={{
                       boxShadow: dark
                         ? "inset 0 0 50px rgba(200, 200, 200, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.04)"
                         : "inset 0 0 60px rgba(0, 0, 0, 0.12)"
                     }} />

                {/* Top-left viewers overlay removed */}

                {/* The website inside the "screen" */}
                <div className="absolute inset-0 z-10 overflow-auto bg-background dark:bg-[#070709]">
                  <div className="min-h-full flex flex-col md:flex-row">

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
                <PlayerControls
                  isFullScreen={isPlayerFullScreen}
                  onToggleFullScreen={toggleFullScreen}
                  isBgDark={dark || (section === "about" && tab === "resume")}
                />
              </div>
            </div>

            {/* Streamer info bar (under video) */}
            <StreamerBar
              dark={dark}
              onToggleDark={() => setDark(!dark)}
            />
          </div>

          {/* Chat panel */}
          <TwitchChat
            isCollapsed={isChatCollapsed}
            onToggleCollapse={() => setIsChatCollapsed(!isChatCollapsed)}
          />
        </div>
      </div>
    </div>
  );
}



function CollapseLeftIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="12" y1="12" x2="3" y2="12" />
      <polyline points="7 8 3 12 7 16" />
    </svg>
  );
}

function CollapseRightIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="12" y1="12" x2="21" y2="12" />
      <polyline points="17 8 21 12 17 16" />
    </svg>
  );
}

interface TwitchRailProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  viewerCounts: { home: number; about: number; contact: number };
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function TwitchRail({ activeSection, onSectionChange, viewerCounts, isCollapsed, onToggleCollapse }: TwitchRailProps) {
  const channels = [
    { name: "Home", game: "@home", viewers: activeSection === "home" ? 1 : 0, color: "from-primary to-primary-glow", live: activeSection === "home", sectionId: "home" as SectionId },
    { name: "About", game: "@about", viewers: activeSection === "about" ? 1 : 0, color: "from-rose-500 to-orange-400", live: activeSection === "about", sectionId: "about" as SectionId },
    { name: "Contact", game: "@contact", viewers: activeSection === "contact" ? 1 : 0, color: "from-pink-500 to-fuchsia-400", live: activeSection === "contact", sectionId: "contact" as SectionId },
  ];
  return (
    <aside className={`hidden lg:flex shrink-0 flex-col bg-[var(--twitch-panel)] border-r border-black/60 p-2 gap-2 overflow-y-auto transition-all duration-300 ${isCollapsed ? "w-16" : "w-60"}`}>
      <div className={`flex items-center px-2 py-1 ${isCollapsed ? "justify-center" : "justify-end"}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse();
          }}
          title={isCollapsed ? "Expand Side Panel" : "Collapse Side Panel"}
          className="bg-transparent border-none text-black dark:text-white hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center p-1 outline-none"
        >
          {isCollapsed ? (
            <CollapseRightIcon className="h-6 w-6" />
          ) : (
            <CollapseLeftIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      {channels.map((c) => (
        <button
          key={c.name}
          onClick={() => onSectionChange(c.sectionId)}
          title={isCollapsed ? `${c.name} (${c.game})` : undefined}
          className={`flex items-center rounded-md transition-colors ${
            isCollapsed ? "justify-center p-1.5" : "gap-3 px-2 py-1.5 text-left"
          } ${
            activeSection === c.sectionId ? "bg-foreground/10 text-foreground" : "hover:bg-foreground/5 text-muted-foreground"
          }`}
        >
          <div className={`h-8 w-8 rounded-full bg-linear-to-br ${c.color} shrink-0 ring-2 ${c.live ? "ring-live" : "ring-transparent"} ring-offset-2 ring-offset-[var(--twitch-panel)] relative`} >
            {isCollapsed && c.live && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-live ring-2 ring-[var(--twitch-panel)] animate-pulse" />
            )}
          </div>
          {!isCollapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.game}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {c.live ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulse" />
                    <span>{c.viewers}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground/40">0</span>
                )}
              </div>
            </>
          )}
        </button>
      ))}
    </aside>
  );
}

interface PlayerControlsProps {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  isBgDark: boolean;
}

function PlayerControls({ isFullScreen, onToggleFullScreen, isBgDark }: PlayerControlsProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-14 bg-transparent flex items-end px-3 pb-2 justify-between animate-fade-in">
      <div className="flex items-center gap-2 ml-2">
        {/* LIVE box */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded text-white select-none shadow-md">
          <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">LIVE</span>
        </div>
        {/* Count box */}
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs border border-white/15 px-2.5 py-1 rounded text-white select-none shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-live" />
          <span className="text-xs font-semibold">1</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={onToggleFullScreen} 
          className={`p-1.5 rounded transition-colors ${
            isBgDark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"
          }`}
        >
          <Maximize className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

interface StreamerBarProps {
  dark: boolean;
  onToggleDark: () => void;
}

function StreamerBar({ dark, onToggleDark }: StreamerBarProps) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="bg-[var(--twitch-panel)] border-t border-black/10 dark:border-black/60 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <img 
            src={`${import.meta.env.BASE_URL}franco.jpeg`} 
            alt="Francisco Ramirez" 
            className="h-16 w-16 rounded-full object-cover shrink-0 ring-2 ring-live"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <h2 className="text-foreground font-bold text-lg truncate">Francisco Ramirez</h2>
              <span className="text-xs text-muted-foreground font-normal shrink-0">@franco</span>
            </div>
            <p className="text-muted-foreground text-sm truncate">Cloud Engineer @ Bloomberg</p>
            <div className="mt-2">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">Go</span>
                <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">Python</span>
                <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">Data Structures</span>
                <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">Soccer</span>
                <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-muted-foreground">History</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <a 
            href="https://github.com/FrancoRamirezz" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2.5 rounded bg-primary hover:bg-primary-glow text-white transition-colors flex items-center justify-center"
          >
            <Github className="h-4 w-4" />
          </a>

          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            title="LinkedIn"
            className="p-2.5 rounded bg-primary text-white transition-colors flex items-center justify-center cursor-not-allowed opacity-50"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <button
            onClick={onToggleDark}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2.5 rounded bg-foreground/10 text-foreground hover:bg-foreground/15 transition-colors flex items-center justify-center"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

interface TwitchChatProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function TwitchChat({ isCollapsed, onToggleCollapse }: TwitchChatProps) {
  const initialMessages = [
    { user: "Franco Bot", color: "text-emerald-400", badge: "mod", text: "Welcome! Please send a meaningful, detailed message if you want to chat about a project or an opportunity." },
    { user: "pixel_wizard", color: "text-fuchsia-400", text: "What are you shipping next?" },
    { user: "gamer_42", color: "text-sky-400", text: "I have a project in mind. Are you down?" },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [storedMessage, setStoredMessage] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");

  const send = () => {
    if (!input.trim()) return;

    if (step === 1) {
      const msg = input.trim();
      setStoredMessage(msg);

      const randomUsernames = [
        "pixel_wizard", "gamer_42", "cyber_ninja", "code_commander", 
        "tech_guru", "binary_boss", "digital_explorer", "innovator_99",
        "spark_plug", "neon_rider", "quantum_coder", "vector_scale"
      ];
      const randUser = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
      setChosenUsername(randUser);

      setInput("");
      setStep(2);
    } else {
      const email = input.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessages((m) => [
          ...m,
          {
            user: "System",
            color: "text-red-500",
            badge: "mod",
            text: "❌ invalid email format. Please enter your valid email address."
          }
        ]);
        return;
      }

      setMessages((m) => [
        ...m, 
        { 
          user: chosenUsername, 
          color: "text-purple-400", 
          text: storedMessage 
        }
      ]);

      const templateParams = {
        name: chosenUsername,
        message: storedMessage,
        title: "New collaboration inquiry",
        email: email,
        timestamp: new Date().toLocaleString()
      };

      emailjs.send(
        "service_n4rbb08",
        "template_w9p5274",
        templateParams,
        "FgujpuYsQnQamJ-yI"
      ).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setMessages((m) => [
            ...m,
            {
              user: "System",
              color: "text-emerald-500",
              badge: "mod",
              text: "📨 Email sent successfully!"
            }
          ]);
        },
        (error) => {
          console.log("FAILED...", error);
          setMessages((m) => [
            ...m,
            {
              user: "System",
              color: "text-red-500",
              badge: "mod",
              text: `❌ Email failed: ${error?.text || error || "Unknown error"}`
            }
          ]);
        }
      );

      setInput("");
      setStoredMessage("");
      setChosenUsername("");
      setStep(1);
    }
  };

  const cancel = () => {
    setInput("");
    setStoredMessage("");
    setChosenUsername("");
    setStep(1);
  };

  return (
    <aside className={`shrink-0 flex flex-col bg-[var(--twitch-panel)] border-black/60 transition-all duration-300 ${
      isCollapsed
        ? "h-12 w-full border-t xl:h-auto xl:w-12 xl:border-l xl:border-t-0"
        : "h-[350px] w-full border-t xl:h-auto xl:w-80 xl:border-l xl:border-t-0"
    }`}>
      <div 
        onClick={isCollapsed ? onToggleCollapse : undefined}
        className={`h-12 shrink-0 flex items-center px-3 relative transition-colors ${
          isCollapsed 
            ? "justify-between xl:justify-center border-b border-black/60 xl:border-b-0 cursor-pointer hover:bg-foreground/5 select-none" 
            : "justify-between border-b border-black/60"
        }`}
      >
        {isCollapsed ? (
          <>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block xl:hidden">Contact Me</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse();
              }}
              title="Expand"
              className="bg-transparent border-none text-black dark:text-white hover:opacity-75 transition-opacity p-1 outline-none cursor-pointer flex items-center justify-center"
            >
              <CollapseLeftIcon className="h-6 w-6 hidden xl:block" />
              <ChevronUp className="h-5 w-5 block xl:hidden" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse();
              }}
              title="Collapse"
              className="absolute left-3 bg-transparent border-none text-black dark:text-white hover:opacity-75 transition-opacity p-1 outline-none z-10 cursor-pointer flex items-center justify-center"
            >
              <CollapseRightIcon className="h-6 w-6 hidden xl:block" />
              <ChevronDown className="h-5 w-5 block xl:hidden" />
            </button>
            <div className="flex-1 text-center">
              <p className="text-foreground text-sm font-medium uppercase tracking-wider">Contact me</p>
            </div>
          </>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 text-sm">
            {messages.map((m, i) => (
              <div key={i} className="text-foreground/90 leading-snug break-words">
                {m.badge === "mod" && <span className="inline-block mr-1 px-1 rounded bg-emerald-500 text-white text-[10px] font-bold align-middle">MOD</span>}
                {m.badge === "sub" && <span className="inline-block mr-1 px-1 rounded bg-primary text-white text-[10px] font-bold align-middle">SUB</span>}
                <span className={`font-bold ${m.color}`}>{m.user}</span>
                <span className="text-muted-foreground/60">: </span>
                <span>{m.text}</span>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-black/10 dark:border-black/60 space-y-2">
            <div className={`flex items-center gap-2 rounded-md px-2 py-1.5 border transition-all ${
              step === 2 
                ? "bg-red-50 dark:bg-red-950/20 border-red-500" 
                : "bg-white dark:bg-black/40 border-black/15 dark:border-white/10"
            }`}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={step === 2 ? "Enter your email so they can reply..." : "Send a message"}
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-foreground/50 dark:placeholder:text-muted-foreground/40"
              />
              <button className="p-1 text-muted-foreground hover:text-foreground"><Smile className="h-4 w-4" /></button>
            </div>
            <div className="flex justify-end gap-2">
              {step === 2 && (
                <button
                  onClick={cancel}
                  title="Cancel"
                  className="px-3 py-1.5 rounded border border-black/15 dark:border-white/10 text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 text-sm font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              )}
              <button
                onClick={send}
                className="px-3 py-1.5 rounded bg-primary hover:bg-primary-glow text-white text-sm font-bold w-full sm:w-auto"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}


function SectionHeader({ title, subtitle, subtitleClassName }: { title: string; subtitle?: string; subtitleClassName?: string }) {
  return (
    <div className="pb-6 border-b border-border">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className={`mt-2 ${subtitleClassName || "text-muted-foreground"}`}>{subtitle}</p>}
    </div>
  );
}

function HomeSection({ onGoAbout }: { onGoAbout: () => void }) {
  return (
    <div>
      <SectionHeader 
        title="Welcome to my corner of the internet!" 
        subtitle="Hello world, I am Franco. I am currently based in Los Angeles 🌴🎬🌆"
        subtitleClassName="text-primary font-semibold text-base"
      />
      <div className="mt-8 grid gap-4">
        <div className="rounded-xl bg-card border border-border p-6">
          <p className="text-sm uppercase tracking-wider text-primary font-semibold">Right now I am,</p>
          <h3 className="mt-2 text-2xl font-bold">Co-founding a Civic Tech Tool</h3>
          <p className="mt-2 text-muted-foreground">
            Changing how non-native speakers prepare for their U.S. citizenship test.
          </p>
          <button
            onClick={onGoAbout}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-colors"
          >
            See my full story <ArrowRight className="h-4 w-4" />
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 rounded-xl bg-card border border-border">
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
    <div className="rounded-xl bg-foreground/[0.03] border border-foreground/[0.08] p-6 space-y-4 w-full animate-fade-in">
      <h3 className="text-xl font-bold text-primary">
        What I Believe In
      </h3>
      <p className="text-black dark:text-white/90 leading-relaxed text-base">
        I believe that technology should serve a public purpose and empower communities. 
        Whether building tools to make complex bureaucratic processes accessible or writing high-performance systems, 
        the ultimate goal is always to design software that is intuitive, transparent, and built with empathy. 
        By co-founding tools in civic tech, I strive to bridge the gap between people and the resources they need.
      </p>
    </div>
  );
}

function ResumeTab() {
  return (
    <div className="border border-border rounded-xl overflow-hidden h-[450px] sm:h-[650px] w-full bg-zinc-800 animate-fade-in">
      <iframe
        src={`${import.meta.env.BASE_URL}resume.pdf#view=Fit`}
        title="Francisco Ramirez Resume"
        className="w-full h-full border-none"
      />
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
      role: "Cloud Engineer",
      company: "Bloomberg LP",
      location: "New York, NY",
      flag: "🇺🇸",
      period: "Jun 2026 - Present",
      duration: "2 Months",
      type: "Full-time",
      mode: "Hybrid",
      logoBg: "bg-orange-500 text-white",
      logoText: "B",
      responsibilities: [
        "Architecting and maintaining cloud-native infrastructure for low-latency financial systems.",
        "Configuring containerized pipelines utilizing Kubernetes and service mesh overlays.",
        "Automating infrastructure deployment pipelines using Terraform and Ansible."
      ],
    },
    {
      role: "Co-Founder & Lead Dev",
      company: "CivicPrep",
      location: "Los Angeles, CA",
      flag: "🇺🇸",
      period: "Jan 2026 - May 2026",
      duration: "5 Months",
      type: "Co-founder",
      mode: "Remote",
      logoBg: "bg-primary text-white",
      logoText: "CP",
      responsibilities: [
        "Co-founded a civic tech tool that changes how non-native speakers prepare for their U.S. citizenship test.",
        "Designed intuitive multi-lingual learning applications with local caching features.",
        "Implemented real-time quiz pipelines and progress tracking metrics."
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "UCLA IT Services",
      location: "Los Angeles, CA",
      flag: "🇺🇸",
      period: "Jun 2025 - Dec 2025",
      duration: "7 Months",
      type: "Internship",
      mode: "In-Person",
      logoBg: "bg-blue-600 text-white",
      logoText: "UC",
      responsibilities: [
        "Engineered portal endpoints and modernized authentication protocols for student directories.",
        "Collaborated with developers to optimize database query performance and api structures.",
        "Modernized front-end dashboards using React and Tailwind CSS."
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {jobs.map((j, i) => (
        <JobCard key={i} job={j} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

function JobCard({ job, defaultOpen = false }: { job: Job; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition-colors animate-fade-in">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-start">
        <div className={`h-14 w-14 rounded-lg ${job.logoBg} shrink-0 grid place-items-center font-black text-lg select-none`}>
          {job.logoText}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{job.role}</h3>
          <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-foreground/90 font-semibold">{job.company}</span>
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
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-glow"
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
    <div className="rounded-xl bg-card border border-border p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-start">
        <div className="h-16 w-16 rounded-xl bg-blue-600 shrink-0 grid place-items-center text-white font-black text-xl select-none">
          UCLA
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-foreground">B.S. Computer Science</h3>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="text-foreground/90 font-semibold">University of California, Los Angeles</span>{" "}
            <span className="text-primary">•</span> 2022 - 2026
          </p>
          
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Coursework Summary</p>
              <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                Distributed Systems, Cloud Architecture, Operating Systems, Data Structures & Algorithms, Systems Programming, Computer Networks.
              </p>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Certifications</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-foreground/10 text-muted-foreground text-xs font-semibold">
                  AWS Certified Solutions Architect
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-foreground/10 text-muted-foreground text-xs font-semibold">
                  Certified Kubernetes Administrator (CKA)
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Accolades & Leadership</p>
              <ul className="mt-1 text-sm text-foreground/80 list-disc pl-4 space-y-1">
                <li>Dean's Honor List (All Quarters)</li>
                <li>UCLA Civic Hackathon First Place Winner</li>
                <li>Graduated Magna Cum Laude</li>
              </ul>
            </div>
          </div>
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
  return (
    <div>
      <SectionHeader 
        title="Send me a quick DM in the chat." 
        subtitle="OR get in touch professionally and let's have a conversation about on how we can work together." 
        subtitleClassName="text-primary font-semibold text-base"
      />
      <div className="mt-8 pl-1">
        <a 
          href="mailto:hello@franco.dev" 
          className="inline-flex items-center gap-2.5 text-lg font-bold text-foreground hover:text-primary transition-colors group"
        >
          <Mail className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          hello@franco.dev
        </a>
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
