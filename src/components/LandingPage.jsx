import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export default function LandingPage({ onOpenSignIn }) {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem("seenOnboard")
  );
  const [typed, setTyped] = useState("");

  const message = "Understand your emotions. Pause. Breathe.";

  // TYPEWRITER EFFECT
  useEffect(() => {
    let i = 0;
    let t;
    const type = () => {
      if (i <= message.length) {
        setTyped(message.slice(0, i));
        i++;
        t = setTimeout(type, 40);
      }
    };
    type();
    return () => clearTimeout(t);
  }, []);

  // SYSTEM THEME DETECTION
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (!localStorage.getItem("theme")) setDarkMode(mq.matches);
  }, []);

  // APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const begin = () => {
    navigate("/app");
  };

  // SWIPE LEFT → BEGIN
  const handlers = useSwipeable({
    onSwipedLeft: () => begin(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  return (
    <div
      className="
      min-h-screen w-full flex flex-col items-center justify-center
      bg-gradient-to-br from-[#E6F0FF] via-[#F3E9FF] to-[#FFF1F6]
      dark:from-[#0f0f11] dark:via-[#15151a] dark:to-[#1b1b20]
      overflow-hidden p-6"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-44 -top-40 w-[520px] h-[520px] rounded-full 
        bg-gradient-to-tr from-[#C7D2FF] to-[#BFEAF5] opacity-40 blur-3xl dark:opacity-10" />

        <div className="absolute -right-40 -bottom-28 w-[460px] h-[460px] rounded-full 
        bg-gradient-to-bl from-[#FFD1E8] to-[#C9E6FF] opacity-40 blur-3xl dark:opacity-10" />
      </div>

      {/* ONBOARDING MODAL */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Welcome to MindfulConnect
              </h3>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                Pick your preferred theme — we’ll remember it.
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setDarkMode(false);
                    setShowOnboarding(false);
                    localStorage.setItem("seenOnboard", "1");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-xl"
                >
                  Light
                </button>

                <button
                  onClick={() => {
                    setDarkMode(true);
                    setShowOnboarding(false);
                    localStorage.setItem("seenOnboard", "1");
                  }}
                  className="px-4 py-2 bg-gray-800 text-white rounded-xl"
                >
                  Dark
                </button>

                <button
                  onClick={() => {
                    setShowOnboarding(false);
                    localStorage.setItem("seenOnboard", "1");
                  }}
                  className="px-4 py-2 rounded-xl border"
                >
                  Ask later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl bg-white/30 dark:bg-white/10 
          backdrop-blur-md border border-white/30 dark:border-white/10 
          flex items-center justify-center shadow-md"
          >
            <svg width="28" height="28">
              <path
                d="M12 2C14.7 2 16 4 16 6s-1.3 4-4 4-4-2-4-4 1.3-4 4-4z"
                fill="white"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              MindfulConnect
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A calm space for reflection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-md 
          border border-white/30 dark:border-white/10 shadow-sm hover:scale-105 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => onOpenSignIn && onOpenSignIn()}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-2xl 
          bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/30 
          dark:border-white/10 shadow hover:scale-105 transition"
          >
            <User size={16} /> Sign in
          </button>
        </div>
      </motion.header>

      {/* MAIN BODY */}
      <main
        {...handlers}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center"
      >
        {/* LEFT PANEL */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-md border 
          border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight 
          text-gray-900 dark:text-white">
            Calm your mind. Connect with yourself.
          </h2>

          <p className="text-gray-700 dark:text-gray-300 max-w-lg mt-6">
            <span className="font-medium">{typed}</span>
          </p>

          <div className="flex flex-wrap gap-4 items-center mt-8">
            <button
              onClick={begin}
              className="flex items-center gap-3 bg-gradient-to-r from-[#4F83FF] 
            to-[#9BD3FF] text-white px-6 py-3 rounded-2xl shadow-lg"
            >
              Get started <ArrowRight size={18} />
            </button>

            <button
              onClick={() =>
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-sm text-gray-700 px-3 py-2 rounded-xl hover:underline"
            >
              Explore features
            </button>
          </div>

          {/* Feature Chips */}
          <div className="flex gap-3 flex-wrap mt-6">
            <div className="px-3 py-2 rounded-xl bg-white/60 backdrop-blur-md 
            border border-white/30 text-sm">
              Real Sentiment AI
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/60 backdrop-blur-md 
            border border-white/30 text-sm">
              Guided Breathing
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/60 backdrop-blur-md 
            border border-white/30 text-sm">
              Mood Trends
            </div>
          </div>
        </motion.section>

        {/* RIGHT PANEL — Gradient Visual */}
        <motion.figure
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div
            className="bg-gradient-to-br from-blue-300/40 to-purple-300/40 
          dark:from-gray-700/40 dark:to-gray-900/40 
          w-full h-[420px] rounded-2xl backdrop-blur-md flex items-center 
          justify-center text-gray-700 dark:text-gray-300 text-lg"
          >
            Visual Area
          </div>
        </motion.figure>
      </main>

      {/* FEATURES SECTION */}
      <section id="features" className="w-full max-w-6xl mt-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Intelligent Suggestions",
              desc: "Automatic, sensitive recommendations based on your text and mood.",
            },
            {
              title: "Meaningful Connections",
              desc: "Actionable prompts to reach out or self-soothe in minutes.",
            },
            {
              title: "Privacy-first",
              desc: "Your data stays private in your Firestore collection.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white/40 dark:bg-white/5 backdrop-blur-md 
          rounded-2xl p-5 shadow"
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {f.title}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {f.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Swipe Hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden">
        <div className="px-4 py-2 bg-white/60 dark:bg-white/5 rounded-full shadow">
          Swipe left to begin →
        </div>
      </div>
    </div>
  );
}
