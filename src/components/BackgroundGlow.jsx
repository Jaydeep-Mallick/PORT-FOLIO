import { useEffect, useRef } from "react";
import Interactive3DScene from "./Interactive3DScene";

export default function BackgroundGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updatePosition = () => {
      // Add inertial ease to the mouse follow glow
      const ease = 0.08;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      glow.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationFrame = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-dark-bg">
      {/* Interactive 3D WebGL Canvas */}
      <Interactive3DScene />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Floating neon shapes / blobs */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-purple-600/10 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-pink-600/10 blur-[120px] animate-float-medium" />
      <div className="absolute top-[60%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-900/5 blur-[150px] animate-pulse-glow" />

      {/* Futuristic Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 50%, transparent 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Mouse Follow Glow Container */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 100%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
