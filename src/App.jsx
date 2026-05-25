import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import BackgroundGlow from "./components/BackgroundGlow";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Contact from "./sections/Contact";
import { portfolioConfig } from "./config/portfolio";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preloader progress count
  useEffect(() => {
    if (!loading) return;

    const duration = 1800; // ms
    const intervalTime = 30; // update frequency
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [loading]);

  // Handle setting state safely
  const finishLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (loadingProgress === 100) {
      const timeout = setTimeout(finishLoading, 400);
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading ? (
          // Preloader overlay
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              y: "-100vh",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
            }}
            className="fixed inset-0 z-9999 flex flex-col justify-between p-10 bg-black text-white"
          >
            {/* Top info */}
            <div className="flex justify-between items-center text-xs font-bold tracking-widest text-neutral-500 uppercase">
              <span>{portfolioConfig.personal.name}</span>
              <span>© {new Date().getFullYear()}</span>
            </div>

            {/* Middle title */}
            <div className="text-left max-w-2xl self-center w-full">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-widest text-neon-pink block mb-4"
              >
                Portfolio Interface v2.6
              </motion.span>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-none overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="inline-block"
                >
                  Initializing Experience
                </motion.span>
              </h1>
            </div>

            {/* Bottom loader tracker */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end text-xs font-bold tracking-widest uppercase">
                <span className="text-neutral-500">System Checklist Loading...</span>
                <span className="text-white text-lg font-display font-black">{Math.round(loadingProgress)}%</span>
              </div>
              {/* Progress bar container */}
              <div className="h-[2px] w-full bg-neutral-900 overflow-hidden relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-neon-purple to-neon-pink absolute top-0 left-0"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          // Main Website Content
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen text-white flex flex-col items-center bg-dark-bg selection:bg-neon-pink/30 selection:text-white"
          >
            {/* Background Layer */}
            <BackgroundGlow />

            {/* Header Floating Navbar */}
            <Navbar />

            {/* Main Sections */}
            <main className="w-full flex-grow flex flex-col items-center relative z-10">
              <Hero />
              <Projects />
              <About />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
