import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../components/BrandIcons";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { portfolioConfig } from "../config/portfolio";

export default function Contact() {
  const { email, socials } = portfolioConfig.personal;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const iconMap = {
    Github: <GithubIcon size={18} />,
    Linkedin: <LinkedinIcon size={18} />,
    Instagram: <InstagramIcon size={18} />
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    const { serviceId, templateId, publicKey } = portfolioConfig.emailjs;

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
      to_name: portfolioConfig.personal.name,
    };

    // If credentials are not set, fall back to testing simulation gracefully
    if (serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID" || !publicKey) {
      console.warn("EmailJS credentials are not configured in portfolio.js. Simulating dispatch...");
      setTimeout(() => {
        setStatus("success");
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#a855f7", "#ec4899", "#ffffff"]
        });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }, 1200);
      return;
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus("success");
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#a855f7", "#ec4899", "#ffffff"]
        });

        setFormData({ name: "", email: "", message: "" });
        
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS dispatch failed:", error);
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24 w-full relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Large Typographical Header */}
        <div className="text-left mb-16 select-none">
          <span className="text-xs uppercase font-bold tracking-widest text-neon-purple">
            Get In Touch
          </span>
          <h2 
            className="font-display font-black text-5xl sm:text-6xl md:text-8xl tracking-tight leading-none uppercase text-stroke text-white hover:text-transparent hover:bg-gradient-to-r hover:from-neon-purple hover:to-neon-pink hover:bg-clip-text mt-2 transition-all duration-700 cursor-default"
          >
            LET'S WORK<br />TOGETHER.
          </h2>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-10 text-left">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Email Me Directly</h3>
              <a 
                href={`mailto:${email}`}
                className="text-lg sm:text-2xl font-display font-bold text-white hover:text-neon-pink transition-colors duration-300 flex items-center gap-2.5 group interactive-target cursor-none"
              >
                <Mail size={22} className="text-neutral-500 group-hover:text-neon-pink group-hover:scale-105 transition-all duration-300" />
                {email}
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Connect on Social</h3>
              <div className="flex flex-col gap-3">
                {socials.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass px-5 py-4 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-white/20 hover:shadow-[0_8px_20px_rgba(168,85,247,0.05)] transition-all duration-300 interactive-target cursor-none"
                    whileHover={{ x: 6 }}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-neutral-400 group-hover:text-neon-purple group-hover:rotate-6 transition-all duration-300">
                        {iconMap[social.icon] || <Send size={18} />}
                      </span>
                      <span className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 group-hover:text-neutral-300 tracking-widest transition-colors">
                      Follow
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 rounded-full bg-neon-purple text-[9px] uppercase font-black tracking-widest text-white shadow-lg">
                Direct Line
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={status === "sending"}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-purple focus:bg-white/[0.08] transition-all placeholder-neutral-600 w-full"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={status === "sending"}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-purple focus:bg-white/[0.08] transition-all placeholder-neutral-600 w-full"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={status === "sending"}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your project or proposal..."
                    className="bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-purple focus:bg-white/[0.08] transition-all placeholder-neutral-600 w-full resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status !== "idle" || !formData.name || !formData.email || !formData.message}
                  className={`w-full py-4 rounded-xl font-display font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 border transition-all duration-500 interactive-target cursor-none ${
                    status === "success"
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : status === "error"
                      ? "bg-rose-500 border-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse"
                      : status === "sending"
                      ? "bg-transparent border-white/10 text-neutral-400"
                      : "bg-white border-white text-black hover:bg-transparent hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-neon-purple"
                  }`}
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
                      Dispatching Message...
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check size={14} className="animate-bounce" />
                      Message Dispatched!
                    </>
                  ) : status === "error" ? (
                    <>
                      <span>❌</span>
                      Dispatch Failed. Retry?
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Jaydeep Mallick. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors interactive-target cursor-none">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors interactive-target cursor-none">Terms of Service</a>
          </div>
        </div>

      </div>

    </section>
  );
}
