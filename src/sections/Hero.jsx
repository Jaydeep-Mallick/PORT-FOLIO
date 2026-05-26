import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { portfolioConfig } from "../config/portfolio";

export default function Hero() {
  const { name, title, subtitle } = portfolioConfig.personal;

  // Staggered text containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Slide up item animation
  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { y: "115%", opacity: 0, rotate: 6, scale: 0.85 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const nameWords = name.split(" ");

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home" 
      className="min-h-screen w-full flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 relative overflow-hidden"
    >
      {/* Decorative Grid Overlay with Fade-in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 grid-bg pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl z-10 select-none text-left flex flex-col justify-center"
      >
        {/* Top small greeting tag */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-300">
            // DESIGN DRAFTING ACTIVE
          </span>
        </motion.div>

        {/* Big Animated Developer Name */}
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9] uppercase text-white mb-6">
          {nameWords.map((word, idx) => (
            <span key={idx} className="inline-block whitespace-nowrap overflow-hidden pb-1 mr-4">
              <motion.span
                variants={wordVariants}
                className="inline-block"
              >
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    className="inline-block origin-bottom-left"
                    style={{
                      textShadow: "0 0 40px rgba(168, 85, 247, 0.15)",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Title / Description */}
        <motion.h2 
          variants={itemVariants}
          className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-400 mb-4"
        >
          {title}
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mb-10 leading-relaxed font-sans"
        >
          {subtitle}
        </motion.p>

        {/* View Projects CTA with magnetic effect */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.button
            onClick={handleScrollToProjects}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-white text-black font-display font-bold text-sm tracking-wider uppercase flex items-center gap-3 border border-white hover:bg-transparent hover:text-white transition-colors duration-300 relative shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] group interactive-target cursor-none"
          >
            View Projects
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Floating Badges */}
        <div className="flex gap-4 flex-wrap mt-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="glass px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 self-start shadow-xl"
            style={{ rotate: "2deg" }}
          >
            <span className="text-xl">🧠</span>
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">AI Focus</p>
              <p className="text-xs font-semibold text-white">Generative AI & LLMs</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="glass px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 self-start shadow-xl"
            style={{ rotate: "-4deg" }}
          >
            <span className="text-xl">💻</span>
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Tech Stack</p>
              <p className="text-xs font-semibold text-white">Python, SQL & React</p>
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Floating Abstract Glow Shapes behind */}
      <div className="absolute right-0 bottom-0 w-[40%] h-[40%] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}