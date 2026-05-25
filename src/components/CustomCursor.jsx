import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    // Add custom cursor active class to body for hiding default cursor
    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current;
    if (!cursor || !dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    
    // Main cursor coordinates (no lag)
    let curX = 0;
    let curY = 0;

    // Trail elements coordinates
    const numTrails = 8;
    const trailCoords = Array.from({ length: numTrails }, () => ({ x: 0, y: 0 }));

    let isHovering = false;
    let isClicking = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseDown = () => {
      isClicking = true;
      dot.style.scale = "0.5";
      ring.style.scale = "0.8";
      ring.style.borderColor = "rgba(255, 255, 255, 0.9)";
      ring.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
    };

    const onMouseUp = () => {
      isClicking = false;
      dot.style.scale = "1";
      ring.style.scale = isHovering ? "1.8" : "1";
      ring.style.borderColor = isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)";
      ring.style.boxShadow = isHovering 
        ? "0 0 25px rgba(255, 255, 255, 0.6)" 
        : "0 0 15px rgba(255, 255, 255, 0.2)";
    };

    const updateCursor = () => {
      // 1. Move main cursor exactly with mouse (immediate, no lag)
      curX = mouseX;
      curY = mouseY;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;

      // 2. Cascade calculations for the trails
      let prevX = curX;
      let prevY = curY;

      for (let i = 0; i < numTrails; i++) {
        const t = trails[i];
        if (!t) continue;

        const coord = trailCoords[i];
        // Elastic interpolation towards the item in front of it
        const ease = 0.35 - i * 0.02; // decreasing ease creates longer tail
        coord.x += (prevX - coord.x) * ease;
        coord.y += (prevY - coord.y) * ease;

        // Apply transform relative to the main cursor's translate
        const dx = coord.x - curX;
        const dy = coord.y - curY;
        t.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;

        prevX = coord.x;
        prevY = coord.y;
      }

      requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".interactive-target") ||
        target.classList.contains("interactive-target");

      if (isInteractive) {
        isHovering = true;
        ring.style.scale = "1.8";
        ring.style.borderColor = "rgba(255, 255, 255, 1)";
        ring.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        ring.style.boxShadow = "0 0 25px rgba(255, 255, 255, 0.7)";
        dot.style.scale = "0.5";
      } else {
        isHovering = false;
        if (!isClicking) {
          ring.style.scale = "1";
          ring.style.borderColor = "rgba(255, 255, 255, 0.5)";
          ring.style.backgroundColor = "transparent";
          ring.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.2)";
          dot.style.scale = "1";
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    const animationFrame = requestAnimationFrame(updateCursor);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Wrapper (hidden on mobile, hidden lg:block) */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-9999 mix-blend-screen"
        style={{ willChange: "transform" }}
      >
        {/* Core Dot (Center-aligned) */}
        <div
          ref={dotRef}
          className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        />

        {/* Outer Ring (Center-aligned, concentric and fixed to the dot) */}
        <div
          ref={ringRef}
          className="absolute w-8 h-8 rounded-full border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.2)] -translate-x-1/2 -translate-y-1/2 transition-[scale,border-color,background-color,box-shadow] duration-300 ease-out"
        />

        {/* Trail Elements */}
        {Array.from({ length: 8 }).map((_, idx) => {
          // Shrinking size and opacity for trailing spheres
          const size = 6 - idx * 0.6;
          const opacity = 0.45 - idx * 0.055;
          return (
            <div
              key={idx}
              ref={(el) => (trailRefs.current[idx] = el)}
              className="absolute rounded-full bg-white pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.5)] -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                willChange: "transform",
              }}
            />
          );
        })}
      </div>
    </>
  );
}
