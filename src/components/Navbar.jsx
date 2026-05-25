import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "../config/portfolio";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  // Update scrolled state and track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver to highlight current active section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Detect section when it's in center viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-6 lg:px-16 ${
        scrolled ? "py-4 bg-dark-bg/40 backdrop-blur-md border-b border-white/5" : "py-8 bg-transparent"
      }`}
    >
      {/* Logo */}
      <button 
        onClick={() => scrollToSection("home")}
        className="font-display font-black text-xl tracking-tighter bg-gradient-to-r from-white via-neutral-300 to-purple-400 bg-clip-text text-transparent group interactive-target"
      >
        JM<span className="text-neon-pink group-hover:animate-pulse">.</span>
      </button>

      {/* Navigation Links Pill */}
      <nav className="glass rounded-full px-1.5 py-1 flex items-center border border-white/10 shadow-lg">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative interactive-target ${
              activeSection === item.id 
                ? "text-white" 
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {activeSection === item.id && (
              <span className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 -z-1" />
            )}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Side: CTA Button */}
      <div className="hidden md:block">
        <a 
          href={`mailto:${portfolioConfig.personal.email}`}
          className="glass rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase border border-white/10 hover:border-neon-pink/40 hover:text-neon-pink flex items-center gap-1.5 transition-all duration-300 group interactive-target"
        >
          Let's Chat
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </header>
  );
}
