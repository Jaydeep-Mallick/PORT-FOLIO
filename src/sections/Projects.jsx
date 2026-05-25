import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import { portfolioConfig } from "../config/portfolio";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = portfolioConfig;

  return (
    <section 
      id="projects" 
      className="w-full relative bg-dark-bg py-24 px-4 md:px-10 lg:px-16"
    >
      {/* Section Header */}
      <div className="w-full max-w-[88vw] mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 select-none">
        <div className="text-left">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-neon-purple">
            // DESIGN DRAFT DECK
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase text-white mt-1 tracking-tight">
            Selected Work
          </h2>
        </div>
        <p className="text-xs font-mono text-neutral-400 max-w-xs md:text-right font-light leading-relaxed">
          SYSTEM SCHEMATICS / STACKED DRAFTS
          <br />
          SCALE: 1:1 [REACT + THREE.JS]
        </p>
      </div>

      {/* Cards container - flex column with gap allowing scroll overlap */}
      <div className="relative w-full max-w-[88vw] mx-auto flex flex-col gap-24 md:gap-32 pb-12">
        
        {/* Card 0 - Tourist Safety */}
        {projects[0] && (
          <div
            className="sticky top-[12vh] w-full h-auto md:h-[500px] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row cursor-none interactive-target transition-all duration-300 hover:border-white/20 z-10 bg-black"
            onClick={() => setSelectedProject(projects[0])}
          >
            {/* Draft Blueprint grid background */}
            <div 
              className="absolute inset-0 z-0 opacity-10 pointer-events-none"
              style={{
                backgroundColor: "#06060a",
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />

            {/* Technical Drawing corner markings */}
            <div className="absolute top-2 left-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>
            <div className="absolute top-2 right-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 left-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 right-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>

            {/* Left Side: Thumbnail */}
            <div className="w-full md:w-1/2 h-[220px] md:h-full relative overflow-hidden flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 z-10 m-0 md:m-3 rounded-t-xl md:rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/60 via-transparent to-transparent z-1" />
              <img
                src={projects[0].thumbnail}
                alt={projects[0].title}
                className="w-full h-full object-cover object-top opacity-80"
              />
              
              {/* Draft Metrics Overlay */}
              <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 font-mono text-[8px] text-emerald-400 bg-black/70 px-3 py-2 rounded border border-emerald-400/20 backdrop-blur-sm">
                <span>SYSTEM: GPS_COORDINATES</span>
                <span>LAT: 22.5726 | LON: 88.3639</span>
                <span>STATUS: SECURE_CHANNEL</span>
              </div>
            </div>

            {/* Right Side: Technical Blueprint Sheet details */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-left relative z-10 m-0 md:m-3 border-t md:border-t-0 md:border border-dashed border-white/10 rounded-b-xl md:rounded-xl bg-black/40 backdrop-blur-sm">
              
              {/* Glow matching theme */}
              <div 
                className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full blur-[80px] opacity-15 pointer-events-none"
                style={{ backgroundColor: projects[0].glowColor || 'rgba(16, 185, 129, 0.3)' }}
              />

              {/* Draft details block */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 font-mono text-[9px] text-neutral-400">
                <span>[SHEET: TS-01]</span>
                <span>[DRAWN BY: J.MALLICK]</span>
                <span>[VER: 1.0.4]</span>
              </div>
              
              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase leading-none mb-2">
                {projects[0].title}
              </h3>
              
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                {projects[0].subtitle}
              </p>

              {/* Technical brackets tags */}
              <div className="flex gap-2 flex-wrap mb-6 font-mono">
                {projects[0].tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[9px] text-neutral-300 border border-white/20 px-2 py-0.5"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button className="px-5 py-2.5 bg-transparent border border-white text-white font-mono text-xs uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 cursor-none">
                  // EXECUTE_SPEC
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 1 - MediHelp */}
        {projects[1] && (
          <div
            className="sticky top-[18vh] w-full h-auto md:h-[500px] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row cursor-none interactive-target transition-all duration-300 hover:border-white/20 z-20 bg-black"
            onClick={() => setSelectedProject(projects[1])}
          >
            {/* Draft Blueprint grid background */}
            <div 
              className="absolute inset-0 z-0 opacity-10 pointer-events-none"
              style={{
                backgroundColor: "#06060a",
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />

            {/* Technical Drawing corner markings */}
            <div className="absolute top-2 left-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>
            <div className="absolute top-2 right-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 left-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>
            <div className="absolute bottom-2 right-3 text-[10px] text-white/30 font-mono select-none pointer-events-none">+</div>

            {/* Left Side: Thumbnail */}
            <div className="w-full md:w-1/2 h-[220px] md:h-full relative overflow-hidden flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 z-10 m-0 md:m-3 rounded-t-xl md:rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/60 via-transparent to-transparent z-1" />
              <img
                src={projects[1].thumbnail}
                alt={projects[1].title}
                className="w-full h-full object-cover object-top opacity-80"
              />
              
              {/* Draft Metrics Overlay */}
              <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1 font-mono text-[8px] text-cyan-400 bg-black/70 px-3 py-2 rounded border border-cyan-400/20 backdrop-blur-sm">
                <span>SYSTEM: MEDICAL_awareness</span>
                <span>ECG: ACTIVE | STATUS: ONLINE</span>
                <span>METRICS: ANALYTICAL_DRAFT</span>
              </div>
            </div>

            {/* Right Side: Technical Blueprint Sheet details */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-left relative z-10 m-0 md:m-3 border-t md:border-t-0 md:border border-dashed border-white/10 rounded-b-xl md:rounded-xl bg-black/40 backdrop-blur-sm">
              
              {/* Glow matching theme */}
              <div 
                className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full blur-[80px] opacity-15 pointer-events-none"
                style={{ backgroundColor: projects[1].glowColor || 'rgba(6, 182, 212, 0.3)' }}
              />

              {/* Draft details block */}
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 font-mono text-[9px] text-neutral-400">
                <span>[SHEET: MH-02]</span>
                <span>[DRAWN BY: J.MALLICK]</span>
                <span>[VER: 2.1.0]</span>
              </div>
              
              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase leading-none mb-2">
                {projects[1].title}
              </h3>
              
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                {projects[1].subtitle}
              </p>

              {/* Technical brackets tags */}
              <div className="flex gap-2 flex-wrap mb-6 font-mono">
                {projects[1].tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[9px] text-neutral-300 border border-white/20 px-2 py-0.5"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button className="px-5 py-2.5 bg-transparent border border-white text-white font-mono text-xs uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 cursor-none">
                  // EXECUTE_SPEC
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/85 backdrop-blur-xl"
          >
            {/* Close backdrop hit target */}
            <div 
              className="absolute inset-0 cursor-none"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-4xl h-[85vh] lg:h-[80vh] bg-neutral-950/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row glass"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 interactive-target cursor-none"
              >
                <X size={18} />
              </button>

              {/* Left Side: Dynamic Showcase Image */}
              <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950 via-transparent to-transparent z-1" />
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top opacity-80"
                />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Right Side: Detailed Metadata */}
              <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-10 flex flex-col text-left">
                <div className="pr-4">
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm font-semibold text-neutral-400 mb-6">
                    {selectedProject.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-6">
                    {selectedProject.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-white/5 px-2.5 py-1 rounded border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-full bg-white/10 mb-6" />

                  {/* Description */}
                  <h4 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Project Overview</h4>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Highlighted features */}
                  <h4 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Key Features & Highlights</h4>
                  <ul className="space-y-3 mb-8">
                    {selectedProject.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-pink mt-2 flex-shrink-0" />
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons at bottom */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 hover:bg-neutral-200 transition-colors duration-300 interactive-target cursor-none"
                  >
                    Live Demo
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase border border-white/10 flex items-center gap-1.5 hover:bg-neutral-800 transition-colors duration-300 interactive-target cursor-none"
                  >
                    Code repo
                    <GithubIcon size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
