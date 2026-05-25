import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "../config/portfolio";

// Sub-component for counting up stats
function StatCounter({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse the target integer value
    const numericPart = parseInt(value, 10);
    if (isNaN(numericPart)) {
      setCount(value); // If not a number, just set it
      return;
    }

    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeProgress * numericPart);

      setCount(currentVal);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(numericPart); // Ensure exact final value
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [isInView, value]);

  // Check if target value has a '+' or '%' sign (only if it is numeric)
  const isNumeric = !isNaN(parseInt(value, 10));
  const suffix = isNumeric ? value.replace(/[0-9]/g, "") : "";

  return (
    <div ref={ref} className="text-left">
      <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
        {count}
        {suffix && <span className="text-neon-pink">{suffix}</span>}
      </div>
      <p className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const { name, bio, avatar, location } = portfolioConfig.personal;
  const { stats, skills } = portfolioConfig;

  return (
    <section id="about" className="py-24 px-6 md:px-16 lg:px-24 w-full bg-dark-navy/20 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-left mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-neon-pink">
            About Me
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase text-white mt-2 tracking-tight">
            Background & Skills
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image and Statistics */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Interactive Image Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden group border border-white/10 shadow-2xl"
            >
              {/* Decorative glows */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-1" />
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-1" />
              
              <img 
                src={avatar} 
                alt={name}
                className="w-full h-full object-cover scale-100 group-hover:scale-103 transition-transform duration-700 ease-out z-0"
              />

              {/* Holographic Location Tag */}
              <div className="absolute bottom-6 left-6 z-10 glass px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-white tracking-wide">{location}</span>
              </div>
            </motion.div>

            {/* Statistics Bento Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="glass p-5 rounded-2xl border border-white/5 shadow-md">
                  <StatCounter value={stat.value} label={stat.label} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Bio and Skills */}
          <div className="lg:col-span-7 flex flex-col gap-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight uppercase">
                Hello, I'm {name}
              </h3>
              <p className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
                {bio}
              </p>
              <p className="text-neutral-400 font-light leading-relaxed text-xs sm:text-sm">
                With a focus on design systems and interface motion, I bridge the gap between creative ideation and technical execution. I design layouts that adapt to users and build products designed for responsiveness, performance, and accessibility.
              </p>
            </motion.div>

            {/* Skills Container */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                Technical Stack
              </h4>
              
              <div className="space-y-6">
                {skills.map((cat, cIdx) => (
                  <motion.div 
                    key={cIdx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: cIdx * 0.1 }}
                    className="flex flex-col gap-3"
                  >
                    <h5 className="text-xs font-bold text-neutral-400 tracking-wide uppercase">
                      {cat.category}
                    </h5>
                    <div className="flex gap-2.5 flex-wrap">
                      {cat.items.map((skill, sIdx) => (
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="glass px-3.5 py-2 rounded-xl border border-white/5 flex items-center gap-2.5 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 group interactive-target cursor-none"
                        >
                          {/* Colored dot reflecting skill theme color */}
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                          <span className="text-xs font-semibold text-neutral-200 group-hover:text-white">
                            {skill.name}
                          </span>
                          <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider">
                            {skill.level}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
