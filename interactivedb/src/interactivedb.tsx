"use client";

// src/interactivedb.tsx
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Moon,
  Sun,
  Target,
  Clock,
  CheckCircle,
  Circle,
  ExternalLink,
  Calendar,
  Layers,
  Zap,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

/**
 * InteractiveDB - "GlassFocus Netflix Edition"
 * Single-file component (TypeScript + React).
 *
 * Notes:
 * - Requires Tailwind in the project.
 * - Requires framer-motion, lucide-react and react-confetti packages.
 * - Save as src/interactivedb.tsx and export default.
 */

/* -------------------- Types -------------------- */
type Day = {
  id: number;
  title: string;
  subtitle?: string;
  preview?: string;
  timeEstimate?: string;
  emoji?: string;
  color?: string; // tailwind gradient classes root (used for card accent)
  focus?: string;
  tasks: { action: string; duration?: string; details?: string }[];
  deliverables: string[];
  resources: { title: string; url: string; type?: string }[];
  checkpoints: string[];
};

/* -------------------- Data (based on your original) -------------------- */
const DAYS: Day[] = [
  {
    id: 1,
    title: "Foundation & Environment Setup",
    subtitle: "Build the infrastructure",
    preview: "Set up React popup, manifest, and backend /health endpoint.",
    timeEstimate: "6-8 hours",
    emoji: "🏗️",
    color: "from-blue-500 to-cyan-500",
    focus:
      "Establish development environment, create base extension structure, and initialize backend API skeleton",
    tasks: [
      {
        action: "Create extension directory structure",
        duration: "15 min",
        details: "mkdir fake-news-extension && cd fake-news-extension",
      },
      {
        action: "Initialize React app for extension popup",
        duration: "30 min",
        details: "Use Vite: npm create vite@latest popup -- --template react",
      },
      {
        action: "Create manifest.json (v3)",
        duration: "20 min",
        details: "Define permissions: activeTab, storage; set popup HTML",
      },
      {
        action: "Test extension loading",
        duration: "15 min",
        details: "Load unpacked extension in Chrome, verify popup",
      },
      {
        action: "Set up Python virtual environment",
        duration: "10 min",
        details: "python3 -m venv venv && source venv/bin/activate",
      },
      {
        action: "Initialize Flask/FastAPI project",
        duration: "30 min",
        details: "pip install flask flask-cors, create app.py",
      },
      {
        action: "Test API endpoint",
        duration: "15 min",
        details: "Run server, curl localhost:5000/health",
      },
      {
        action: "Create project README",
        duration: "30 min",
        details: "Document setup steps and architecture",
      },
    ],
    deliverables: [
      "Working browser extension with React popup",
      "Python backend with /health endpoint",
      "Project documentation in README.md",
    ],
    resources: [
      {
        title: "Chrome Extension Getting Started",
        url: "https://developer.chrome.com/docs/extensions/mv3/getstarted/",
        type: "docs",
      },
      {
        title: "React Chrome Extension with Vite",
        url: "https://github.com/guocaoyi/create-chrome-ext",
        type: "github",
      },
      {
        title: "Flask Quickstart",
        url: "https://flask.palletsprojects.com/en/stable/quickstart/",
        type: "docs",
      },
      {
        title: "Flask-CORS Setup",
        url: "https://flask-cors.readthedocs.io/",
        type: "docs",
      },
    ],
    checkpoints: [
      "Extension icon appears in Chrome toolbar",
      "React popup displays without console errors",
      "Flask server logs incoming requests",
      "Can curl API endpoint successfully",
    ],
  },
  {
    id: 2,
    title: "ML Model Integration",
    subtitle: "Add the intelligence",
    preview:
      "Load a transformer, make a /predict endpoint, and test inference.",
    timeEstimate: "7-9 hours",
    emoji: "🤖",
    color: "from-purple-500 to-pink-500",
    focus:
      "Load pre-trained transformer model, create inference pipeline, and build prediction API endpoint",
    tasks: [
      {
        action: "Install ML dependencies",
        duration: "20 min",
        details: "pip install transformers torch accelerate",
      },
      {
        action: "Research lightweight models",
        duration: "45 min",
        details: "Test distilbert or find fake-news model on Hugging Face",
      },
      {
        action: "Create model loader",
        duration: "60 min",
        details: "Write model.py with load_model() function",
      },
      {
        action: "Build inference function",
        duration: "90 min",
        details: "Create predict(text) returning label + confidence",
      },
      {
        action: "Implement /predict endpoint",
        duration: "45 min",
        details: "Add POST route to Flask/FastAPI",
      },
      {
        action: "Test with sample inputs",
        duration: "30 min",
        details: "Use curl or Postman for validation",
      },
    ],
    deliverables: [
      "Model loading module with caching",
      "POST /predict endpoint returning classifications",
      "Test suite with sample inputs",
    ],
    resources: [
      {
        title: "Hugging Face Transformers",
        url: "https://huggingface.co/docs/transformers/index",
        type: "docs",
      },
      {
        title: "Text Classification Pipeline",
        url: "https://huggingface.co/docs/transformers/main_classes/pipelines",
        type: "docs",
      },
      {
        title: "Fake News Detection Models",
        url: "https://huggingface.co/models?search=fake-news",
        type: "hub",
      },
    ],
    checkpoints: [
      "Model downloads and loads without errors",
      "Can classify sample text via Python console",
      "API endpoint returns structured JSON",
    ],
  },
  {
    id: 3,
    title: "Browser-Backend Integration",
    subtitle: "Connect the pieces",
    preview: "Content script + selection + popup → API → display result.",
    timeEstimate: "7-8 hours",
    emoji: "🔗",
    color: "from-green-500 to-emerald-500",
    focus:
      "Connect extension frontend to backend API, implement text selection feature, and display classification results",
    tasks: [
      {
        action: "Create content script",
        duration: "45 min",
        details: "Add content_scripts to manifest, inject script",
      },
      {
        action: "Implement text capture",
        duration: "60 min",
        details: "Use window.getSelection() and messaging API",
      },
      {
        action: "Build API service in React",
        duration: "45 min",
        details: "Create api.js with fetch function",
      },
      {
        action: "Design popup UI for input",
        duration: "60 min",
        details: "Add textarea and 'Analyze' button",
      },
      {
        action: "Implement classification flow",
        duration: "90 min",
        details: "Button click → API call → update state",
      },
    ],
    deliverables: [
      "Text selection feature on web pages",
      "API communication layer with error handling",
      "Result display system in popup",
    ],
    resources: [
      {
        title: "Chrome Content Scripts",
        url: "https://developer.chrome.com/docs/extensions/mv3/content_scripts/",
        type: "docs",
      },
      {
        title: "Chrome Messaging API",
        url: "https://developer.chrome.com/docs/extensions/mv3/messaging/",
        type: "docs",
      },
    ],
    checkpoints: [
      "Can select text on any webpage",
      "Extension receives selected text",
      "API call succeeds with correct payload",
    ],
  },
  {
    id: 4,
    title: "UI/UX Polish & Error Resilience",
    subtitle: "Make it shine",
    preview: "Polish UI, accessibility, and robust error handling.",
    timeEstimate: "6-7 hours",
    emoji: "✨",
    color: "from-orange-500 to-red-500",
    focus:
      "Design intuitive interface, implement comprehensive error handling, and optimize user experience",
    tasks: [
      {
        action: "Design result card component",
        duration: "60 min",
        details: "Create ResultCard.jsx with label and confidence",
      },
      {
        action: "Implement color-coded feedback",
        duration: "30 min",
        details: "Green for real, red for fake, yellow for uncertain",
      },
      {
        action: "Add loading indicators",
        duration: "45 min",
        details: "Spinner, disabled buttons, 'Analyzing...' message",
      },
    ],
    deliverables: [
      "Polished popup interface with Tailwind CSS",
      "Comprehensive error handling",
    ],
    resources: [
      {
        title: "Tailwind CSS",
        url: "https://tailwindcss.com/docs",
        type: "docs",
      },
    ],
    checkpoints: [
      "UI looks professional and polished",
      "All error scenarios display helpful messages",
    ],
  },
  {
    id: 5,
    title: "Testing, Packaging & Documentation",
    subtitle: "Ship the prototype",
    preview: "Test widely, optimize, bundle and create demo materials.",
    timeEstimate: "7-8 hours",
    emoji: "🚀",
    color: "from-indigo-500 to-purple-500",
    focus:
      "End-to-end testing, performance optimization, packaging for distribution, and creating demo materials",
    tasks: [
      {
        action: "Create test plan",
        duration: "45 min",
        details: "Document test cases for all features",
      },
      {
        action: "Execute manual testing",
        duration: "90 min",
        details: "Test on CNN, BBC, Reddit, Twitter, blog sites",
      },
      {
        action: "Build production bundle",
        duration: "30 min",
        details: "npm run build, verify output",
      },
    ],
    deliverables: [
      "Complete test suite",
      "Packaged extension ready for distribution",
    ],
    resources: [
      {
        title: "Chrome Extension Publishing",
        url: "https://developer.chrome.com/docs/webstore/publish/",
        type: "guide",
      },
      {
        title: "README Template",
        url: "https://github.com/othneildrew/Best-README-Template",
        type: "template",
      },
    ],
    checkpoints: [
      "Extension installs cleanly on fresh Chrome",
      "All features work as demonstrated",
    ],
  },
];

/* -------------------- Helpers -------------------- */
const LS_KEY = "interactiveDB_completed";

function safeParseLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/* -------------------- Component -------------------- */
const InteractiveDB: React.FC = () => {
  /* UI state */
  const [selected, setSelected] = useState<number>(0); // index into DAYS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const [pomodoroOpen, setPomodoroOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<"work" | "break">("work");
  const pomodoroIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /* Saved tasks state: keyed by "day-taskIndex" => boolean */
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    safeParseLS<Record<string, boolean>>(LS_KEY, {})
  );

  /* expanded sections (for modal) */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    tasks: true,
    deliverables: false,
    resources: false,
    checkpoints: false,
  });

  /* confetti when completing tasks */
  const [confetti, setConfetti] = useState(false);

  /* refs for slider container */
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  /* derived */
  const currentDay = DAYS[selected];

  /* persist completed */
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(completed));
    } catch {}
  }, [completed]);

  useEffect(() => {
    if (pomodoroRunning) {
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTime((prev) => {
          if (prev <= 1) {
            setPomodoroRunning(false);
            // Switch modes
            if (pomodoroMode === "work") {
              setPomodoroMode("break");
              return 5 * 60; // 5 minute break
            } else {
              setPomodoroMode("work");
              return 25 * 60; // 25 minute work
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
      }
    }
    return () => {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
      }
    };
  }, [pomodoroRunning, pomodoroMode]);

  useEffect(() => {
    const calculateVisibleCards = () => {
      const container = sliderRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const cardWidth = 400 + 48;
      const visible = Math.floor(containerWidth / cardWidth);
      setCardsPerPage(Math.max(1, visible));
    };

    calculateVisibleCards();
    window.addEventListener("resize", calculateVisibleCards);
    return () => window.removeEventListener("resize", calculateVisibleCards);
  }, []);

  useEffect(() => {
    const newPage = Math.floor(selected / cardsPerPage);
    setCurrentPage(newPage);
  }, [selected, cardsPerPage]);

  /* Hotkeys */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // don't trigger when typing in inputs - basic guard
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (e.key.toLowerCase() === "f") {
        setPomodoroOpen((s) => !s);
        e.preventDefault();
      }

      // T - toggle theme
      if (e.key.toLowerCase() === "t") {
        setDarkTheme((s) => !s);
        e.preventDefault();
      }

      // Esc - close modal / exit pomodoro
      if (e.key === "Escape") {
        if (isModalOpen) setIsModalOpen(false);
        else if (pomodoroOpen) setPomodoroOpen(false);
      }

      if (e.key === "ArrowLeft") {
        setSelected((s) => Math.max(0, s - cardsPerPage));
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setSelected((s) => Math.min(DAYS.length - 1, s + cardsPerPage));
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, pomodoroOpen, cardsPerPage]);

  /* slider scroll helpers */
  function scrollToIndex(idx: number) {
    const container = sliderRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>(`[data-index="${idx}"]`);
    if (!card) return;
    // center card: compute left offset
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const desiredLeft =
      card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2;
    container.scrollTo({ left: desiredLeft, behavior: "smooth" });
  }

  function nextCard() {
    setSelected((s) => Math.min(DAYS.length - 1, s + cardsPerPage));
    // scroll will be invoked by effect below
  }
  function prevCard() {
    setSelected((s) => Math.max(0, s - cardsPerPage));
  }

  /* sync scrolling when selected changes */
  useEffect(() => {
    scrollToIndex(selected);
  }, [selected]);

  /* toggle task completion */
  const toggleTask = (dayId: number, taskIndex: number) => {
    const key = `${dayId}-${taskIndex}`;
    setCompleted((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      // show confetti only when marking done
      if (newState[key]) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 1600);
      }
      return newState;
    });
  };

  /* toggle section */
  const toggleSection = (name: string) => {
    setExpanded((p) => ({ ...p, [name]: !p[name] }));
  };

  /* UI effects: body class for theme */
  useEffect(() => {
    const root = document.documentElement;
    if (darkTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkTheme]);

  /* small metrics */
  const dayCompletedCount = (idx: number) =>
    DAYS[idx].tasks.reduce(
      (acc, _, i) => acc + (completed[`${DAYS[idx].id}-${i}`] ? 1 : 0),
      0
    );

  const overallCompletedCount = DAYS.reduce(
    (acc, _d, idx) => acc + dayCompletedCount(idx),
    0
  );
  const overallTotal = DAYS.reduce((acc, d) => acc + d.tasks.length, 0);
  const overallProgress = Math.round(
    (overallCompletedCount / overallTotal) * 100
  );

  /* click a card */
  const openCard = (idx: number) => {
    setSelected(idx);
    setIsModalOpen(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const totalPages = Math.ceil(DAYS.length / cardsPerPage);

  /* small component: DayCard */
  const DayCard: React.FC<{ day: Day; idx: number; active?: boolean }> = ({
    day,
    idx,
    active,
  }) => {
    return (
      <motion.div
        data-index={idx}
        layout
        initial={{ opacity: 0.9, scale: 0.98 }}
        animate={
          active ? { scale: 1.03, opacity: 1 } : { scale: 1, opacity: 0.95 }
        }
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        onClick={() => openCard(idx)}
        className={`cursor-pointer select-none snap-center flex-shrink-0 w-80 md:w-96 lg:w-[400px] p-6 rounded-2xl transform-gpu
          ${
            darkTheme
              ? "bg-black/40 text-white"
              : "bg-white/80 text-slate-900 shadow-xl"
          }
          backdrop-blur-md border ${
            darkTheme ? "border-white/10" : "border-slate-200"
          } hover:shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="text-4xl select-none">{day.emoji}</div>
          <div
            className={`text-sm ${
              darkTheme ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <div className="flex items-center gap-2 select-none">
              <Calendar className="w-4 h-4 pointer-events-none" />{" "}
              <span>{day.timeEstimate}</span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div
            className={`text-sm uppercase tracking-wide ${
              darkTheme ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Day {day.id}
          </div>
          <div className="font-semibold text-xl mt-2 select-none">
            {day.title}
          </div>
          <div
            className={`text-base mt-3 h-14 line-clamp-3 select-none ${
              darkTheme ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {day.preview}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between select-none">
          <div
            className={`text-sm ${
              darkTheme ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {day.tasks.length} tasks
          </div>
          <div className="text-sm font-medium">
            {Math.round((dayCompletedCount(idx) / day.tasks.length) * 100)}%
          </div>
        </div>
      </motion.div>
    );
  };

  /* AnimatePresence Modal content */
  return (
    <div
      className={`min-h-screen relative transition-colors duration-300
        ${
          darkTheme
            ? "bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] text-white"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-900"
        }`}
    >
      {/* Background glass accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -left-24 -top-10 w-96 h-96 rounded-full blur-3xl ${
            darkTheme ? "opacity-20" : "opacity-30"
          } bg-gradient-to-tr from-[#456882] to-[#234C6A]`}
        />
        <div
          className={`absolute right-10 bottom-10 w-80 h-80 rounded-full blur-3xl ${
            darkTheme ? "opacity-10" : "opacity-20"
          } bg-gradient-to-tr from-[#D2C1B6] to-[#456882]`}
        />
      </div>

      {/* Top nav */}
      <header className={`sticky top-4 z-40 mx-auto max-w-6xl px-6`}>
        <div
          className={`flex items-center justify-between gap-4 p-4 rounded-2xl
            ${
              darkTheme
                ? "bg-black/40 text-white"
                : "bg-white/80 text-slate-900 shadow-lg"
            } backdrop-blur-md border ${
            darkTheme ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="flex items-center gap-4 select-none">
            <div
              className={`rounded-full p-3 ${
                darkTheme
                  ? "bg-gradient-to-tr from-white/20 to-white/5"
                  : "bg-gradient-to-tr from-[#456882]/20 to-[#234C6A]/10"
              }`}
            >
              <Target className="w-7 h-7 pointer-events-none" />
            </div>
            <div>
              <div className="text-xl font-semibold">Interactive DB</div>
              <div
                className={`text-sm ${
                  darkTheme ? "text-slate-400" : "text-slate-600"
                }`}
              >
                5-Day Build Sprint · Fake News Extension
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`hidden md:flex items-center gap-4 text-base ${
                darkTheme ? "text-slate-400" : "text-slate-600"
              }`}
            >
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg select-none ${
                  darkTheme ? "bg-white/5" : "bg-slate-200/50"
                }`}
              >
                <Layers className="w-5 h-5 pointer-events-none" />
                <span>{overallProgress}%</span>
                <span
                  className={`text-sm ml-2 ${
                    darkTheme ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {overallCompletedCount}/{overallTotal} tasks
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                title="Toggle Theme (T)"
                onClick={() => setDarkTheme((s) => !s)}
                className={`p-3 rounded-lg select-none cursor-pointer ${
                  darkTheme ? "hover:bg-white/5" : "hover:bg-slate-200/50"
                }`}
              >
                {darkTheme ? (
                  <Sun className="w-6 h-6 pointer-events-none" />
                ) : (
                  <Moon className="w-6 h-6 pointer-events-none" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 select-none">
          <h2 className="text-2xl md:text-3xl font-semibold">Timeline</h2>
        </div>

        <div className="relative">
          <button
            onClick={prevCard}
            disabled={selected === 0}
            className={`cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full select-none
              ${
                darkTheme
                  ? "bg-black/60 hover:bg-black/80"
                  : "bg-white/80 hover:bg-white shadow-lg"
              }
              disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7 pointer-events-none" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="relative overflow-x-auto snap-x snap-mandatory gap-6 flex items-stretch py-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="pl-3" />
            {DAYS.map((d, i) => (
              <div key={d.id} className="snap-center px-3">
                <DayCard day={d} idx={i} active={i === selected} />
              </div>
            ))}
            <div className="pr-10" />
          </div>

          <button
            onClick={nextCard}
            disabled={selected === DAYS.length - 1}
            className={`cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full select-none
              ${
                darkTheme
                  ? "bg-black/60 hover:bg-black/80"
                  : "bg-white/80 hover:bg-white shadow-lg"
              }
              disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm`}
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7 pointer-events-none" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => setSelected(pageIdx * cardsPerPage)}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all select-none ${
                pageIdx === currentPage
                  ? darkTheme
                    ? "bg-white w-10"
                    : "bg-slate-900 w-10"
                  : darkTheme
                  ? "bg-white/30 hover:bg-white/50"
                  : "bg-slate-400 hover:bg-slate-600"
              }`}
              aria-label={`Go to page ${pageIdx + 1}`}
            />
          ))}
        </div>
      </main>

      <AnimatePresence>
        {pomodoroOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center px-4 py-8 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPomodoroOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md mx-auto rounded-2xl p-8
                ${
                  darkTheme
                    ? "bg-black/80 text-white"
                    : "bg-white text-slate-900"
                } shadow-2xl backdrop-blur-xl border ${
                darkTheme ? "border-white/10" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => setPomodoroOpen(false)}
                className={`cursor-pointer absolute top-4 right-4 p-3 rounded-lg select-none ${
                  darkTheme ? "hover:bg-white/10" : "hover:bg-slate-100"
                }`}
              >
                <X className="w-6 h-6 pointer-events-none" />
              </button>

              <div className="text-center">
                <h3 className="text-3xl font-bold mb-3">Pomodoro Timer</h3>
                <div
                  className={`text-base mb-8 ${
                    darkTheme ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {pomodoroMode === "work" ? "Focus Time" : "Break Time"}
                </div>

                <div className="text-8xl font-bold mb-10 font-mono select-none">
                  {formatTime(pomodoroTime)}
                </div>

                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() => setPomodoroRunning(!pomodoroRunning)}
                    className={`cursor-pointer p-5 rounded-full select-none ${
                      darkTheme
                        ? "bg-[#456882] hover:bg-[#234C6A]"
                        : "bg-[#456882] hover:bg-[#234C6A]"
                    } text-white`}
                  >
                    {pomodoroRunning ? (
                      <Pause className="w-7 h-7 pointer-events-none" />
                    ) : (
                      <Play className="w-7 h-7 pointer-events-none" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setPomodoroRunning(false);
                      setPomodoroTime(
                        pomodoroMode === "work" ? 25 * 60 : 5 * 60
                      );
                    }}
                    className={`cursor-pointer p-5 rounded-full select-none ${
                      darkTheme
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  >
                    <RotateCcw className="w-7 h-7 pointer-events-none" />
                  </button>
                </div>

                <div
                  className={`mt-8 text-base ${
                    darkTheme ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Press F to toggle timer • Esc to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center px-4 py-8 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layout
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className={`relative w-full max-w-4xl mx-auto rounded-2xl
                ${
                  darkTheme
                    ? "bg-black/80 text-white"
                    : "bg-white text-slate-900"
                } shadow-2xl backdrop-blur-xl border ${
                darkTheme ? "border-white/10" : "border-slate-200"
              } overflow-hidden max-h-[90vh] flex flex-col`}
            >
              {/* Close & nav buttons */}
              <div className="absolute top-4 right-4 z-30 flex gap-3">
                <button
                  title="Prev"
                  onClick={() => setSelected((s) => Math.max(0, s - 1))}
                  className={`cursor-pointer p-3 rounded-lg select-none ${
                    darkTheme
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 pointer-events-none" />
                </button>
                <button
                  title="Next"
                  onClick={() =>
                    setSelected((s) => Math.min(DAYS.length - 1, s + 1))
                  }
                  className={`cursor-pointer p-3 rounded-lg select-none ${
                    darkTheme
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <ChevronRight className="w-5 h-5 pointer-events-none" />
                </button>
                <button
                  title="Close (Esc)"
                  onClick={() => setIsModalOpen(false)}
                  className={`cursor-pointer p-3 rounded-lg select-none ${
                    darkTheme
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <X className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 my-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
                  {/* left overview */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-5 select-none">
                      <div className="text-7xl">{currentDay.emoji}</div>
                      <div>
                        <div
                          className={`text-sm uppercase ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Day {currentDay.id}
                        </div>
                        <h3 className="text-3xl font-bold">
                          {currentDay.title}
                        </h3>
                        <div
                          className={`text-base mt-2 ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {currentDay.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4 select-none">
                      <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5 pointer-events-none" />
                        <div
                          className={`text-base ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {currentDay.timeEstimate}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Zap className="w-5 h-5 pointer-events-none" />
                        <div
                          className={`text-base ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Focus: {currentDay.focus}
                        </div>
                      </div>

                      <div className="mt-6">
                        <div
                          className={`text-sm uppercase mb-2 ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          Progress
                        </div>
                        <div
                          className={`w-full rounded-full h-4 overflow-hidden ${
                            darkTheme ? "bg-white/5" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-[#456882] to-[#D2C1B6] transition-all duration-500"
                            style={{
                              width: `${Math.round(
                                (dayCompletedCount(selected) /
                                  currentDay.tasks.length) *
                                  100
                              )}%`,
                            }}
                          />
                        </div>
                        <div
                          className={`text-sm mt-3 ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {dayCompletedCount(selected)}/
                          {currentDay.tasks.length} tasks complete
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* center: tasks */}
                  <div className="col-span-1 lg:col-span-2 space-y-5">
                    {/* Tasks header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 select-none">
                        <div
                          className={`p-3 rounded-lg ${
                            darkTheme ? "bg-white/5" : "bg-slate-100"
                          }`}
                        >
                          <CheckCircle className="w-6 h-6 pointer-events-none" />
                        </div>
                        <h4 className="text-2xl font-semibold">Tasks</h4>
                        <div
                          className={`text-base ml-3 ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {currentDay.tasks.length} items
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setExpanded({ ...expanded, tasks: true })
                          }
                          className={`cursor-pointer text-base px-4 py-2 rounded-full select-none ${
                            darkTheme
                              ? "bg-white/5 hover:bg-white/10"
                              : "bg-slate-100 hover:bg-slate-200"
                          }`}
                        >
                          Expand
                        </button>
                        <button
                          onClick={() =>
                            setExpanded({ ...expanded, tasks: false })
                          }
                          className={`cursor-pointer text-base px-4 py-2 rounded-full select-none ${
                            darkTheme
                              ? "bg-white/5 hover:bg-white/10"
                              : "bg-slate-100 hover:bg-slate-200"
                          }`}
                        >
                          Collapse
                        </button>
                      </div>
                    </div>

                    <div
                      className={`${
                        expanded.tasks ? "block" : "hidden"
                      } space-y-4`}
                    >
                      {currentDay.tasks.map((t, idx) => {
                        const key = `${currentDay.id}-${idx}`;
                        const done = !!completed[key];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleTask(currentDay.id, idx)}
                            className={`p-5 rounded-xl border cursor-pointer select-none ${
                              done
                                ? darkTheme
                                  ? "bg-green-500/10 border-green-400/20"
                                  : "bg-green-50 border-green-200"
                                : darkTheme
                                ? "bg-white/5 border-white/10 hover:bg-white/10"
                                : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="mt-1">
                                {done ? (
                                  <CheckCircle className="w-7 h-7 text-green-400 pointer-events-none" />
                                ) : (
                                  <Circle
                                    className={`w-7 h-7 pointer-events-none ${
                                      darkTheme
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                    }`}
                                  />
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div
                                    className={`text-base ${
                                      done
                                        ? darkTheme
                                          ? "line-through text-slate-400"
                                          : "line-through text-slate-500"
                                        : "font-semibold"
                                    }`}
                                  >
                                    {t.action}
                                  </div>
                                  <div
                                    className={`text-sm ${
                                      darkTheme
                                        ? "text-slate-400"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {t.duration}
                                  </div>
                                </div>
                                <div
                                  className={`text-base mt-3 ${
                                    darkTheme
                                      ? "text-slate-400"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {t.details}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Deliverables */}
                    <div className="pt-3">
                      <button
                        className={`cursor-pointer w-full flex items-center justify-between p-4 rounded-lg select-none ${
                          darkTheme
                            ? "bg-white/5 hover:bg-white/10"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                        onClick={() => toggleSection("deliverables")}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-md ${
                              darkTheme ? "bg-white/10" : "bg-slate-200"
                            }`}
                          >
                            <Zap className="w-5 h-5 pointer-events-none" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">
                              Deliverables
                            </div>
                            <div
                              className={`text-sm ${
                                darkTheme ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {currentDay.deliverables.length} items
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-base ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {expanded.deliverables ? "Hide" : "Show"}
                        </div>
                      </button>

                      <div
                        className={`${
                          expanded.deliverables
                            ? "mt-4 grid grid-cols-1 gap-3"
                            : "hidden"
                        }`}
                      >
                        {currentDay.deliverables.map((d, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg text-base select-none ${
                              darkTheme ? "bg-white/5" : "bg-slate-50"
                            }`}
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="pt-3">
                      <button
                        className={`cursor-pointer w-full flex items-center justify-between p-4 rounded-lg select-none ${
                          darkTheme
                            ? "bg-white/5 hover:bg-white/10"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                        onClick={() => toggleSection("resources")}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-md ${
                              darkTheme ? "bg-white/10" : "bg-slate-200"
                            }`}
                          >
                            <ExternalLink className="w-5 h-5 pointer-events-none" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">
                              Resources
                            </div>
                            <div
                              className={`text-sm ${
                                darkTheme ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {currentDay.resources.length} links
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-base ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {expanded.resources ? "Hide" : "Show"}
                        </div>
                      </button>

                      <div
                        className={`${
                          expanded.resources
                            ? "mt-4 grid grid-cols-1 md:grid-cols-2 gap-3"
                            : "hidden"
                        }`}
                      >
                        {currentDay.resources.map((r, i) => (
                          <a
                            key={i}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`cursor-pointer p-4 rounded-lg flex items-center justify-between select-none ${
                              darkTheme
                                ? "bg-white/5 hover:bg-white/10"
                                : "bg-slate-50 hover:bg-slate-100"
                            }`}
                          >
                            <div>
                              <div className="font-medium text-base">
                                {r.title}
                              </div>
                              <div
                                className={`text-sm ${
                                  darkTheme
                                    ? "text-slate-400"
                                    : "text-slate-600"
                                }`}
                              >
                                {r.type}
                              </div>
                            </div>
                            <ExternalLink
                              className={`w-5 h-5 pointer-events-none ${
                                darkTheme ? "text-slate-400" : "text-slate-600"
                              }`}
                            />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Checkpoints */}
                    <div className="pt-3">
                      <button
                        className={`cursor-pointer w-full flex items-center justify-between p-4 rounded-lg select-none ${
                          darkTheme
                            ? "bg-white/5 hover:bg-white/10"
                            : "bg-slate-100 hover:bg-slate-200"
                        }`}
                        onClick={() => toggleSection("checkpoints")}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-md ${
                              darkTheme ? "bg-white/10" : "bg-slate-200"
                            }`}
                          >
                            <Clock className="w-5 h-5 pointer-events-none" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">
                              Success Checkpoints
                            </div>
                            <div
                              className={`text-sm ${
                                darkTheme ? "text-slate-400" : "text-slate-600"
                              }`}
                            >
                              {currentDay.checkpoints.length} checks
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-base ${
                            darkTheme ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {expanded.checkpoints ? "Hide" : "Show"}
                        </div>
                      </button>

                      <div
                        className={`${
                          expanded.checkpoints ? "mt-4 space-y-3" : "hidden"
                        }`}
                      >
                        {currentDay.checkpoints.map((c, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg flex items-start gap-4 text-base select-none ${
                              darkTheme ? "bg-white/5" : "bg-slate-50"
                            }`}
                          >
                            <div className="text-green-400 font-bold text-lg">
                              ✓
                            </div>
                            <div>{c}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* modal footer */}
              <div
                className={`p-5 border-t flex items-center justify-between flex-shrink-0 ${
                  darkTheme ? "border-white/5" : "border-slate-200"
                }`}
              >
                <div
                  className={`text-base select-none ${
                    darkTheme ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Built with React & Tailwind • Hotkeys: F pomodoro, T theme
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-2 rounded-md text-base select-none ${
                      darkTheme
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelected((s) => Math.min(DAYS.length - 1, s + 1));
                    }}
                    className="cursor-pointer px-4 py-2 rounded-md bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-white font-semibold text-base select-none"
                  >
                    Next Day
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confetti overlay */}
      <AnimatePresence>
        {confetti && <Confetti recycle={false} numberOfPieces={120} />}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveDB;
