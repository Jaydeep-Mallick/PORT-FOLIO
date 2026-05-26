import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Preloader3D({ progress }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);

  // Keep progress ref updated for the animation loop
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Helper to create high-quality language texture dynamically with SVG logo
    const createLanguageTexture = (tech, color) => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 128;
      textureCanvas.height = 128;
      const ctx = textureCanvas.getContext("2d");

      // Draw initial fallback state with text
      const drawFallback = () => {
        // Solid dark background
        ctx.fillStyle = "#0c0a1f";
        ctx.fillRect(0, 0, 128, 128);

        // Cyber glowing border
        ctx.strokeStyle = color;
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, 120, 120);

        // Text placeholder
        ctx.fillStyle = color;
        ctx.font = "bold 26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillText(tech.text, 64, 64);
      };

      drawFallback();
      const texture = new THREE.CanvasTexture(textureCanvas);

      // Async load official brand SVG from SimpleIcons
      const img = new Image();
      img.crossOrigin = "anonymous";

      const slugMap = {
        JS: "javascript",
        Python: "python",
        React: "react",
        SQL: "sqlite",
        Node: "nodedotjs",
        Git: "git",
        HTML: "html5",
        CSS: "css3",
        TW: "tailwindcss",
      };

      const slug = slugMap[tech.text] || tech.text.toLowerCase();
      const hexColor = color.replace("#", "");

      img.src = `https://cdn.simpleicons.org/${slug}/${hexColor}`;

      img.onload = () => {
        // Redraw canvas with the logo image replacing the text
        ctx.shadowBlur = 0; // Clear text shadow for crisp rendering
        ctx.fillStyle = "#0c0a1f";
        ctx.fillRect(0, 0, 128, 128);

        ctx.strokeStyle = color;
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, 120, 120);

        // Render logo centered with padding
        ctx.drawImage(img, 24, 24, 80, 80);
        
        // Notify Three.js that texture needs updating
        texture.needsUpdate = true;
      };

      // Fallback if loading fails (keep text placeholder)
      img.onerror = () => {
        drawFallback();
        texture.needsUpdate = true;
      };

      return texture;
    };

    // 5. Geometries & Central Group Setup

    // A. Digital particle Torus Knot (Central element behind text)
    const knotGeo = new THREE.TorusKnotGeometry(2.1, 0.55, 120, 16);
    
    // Custom colors for points
    const count = knotGeo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const purple = new THREE.Color(0xa855f7); // neon-purple
    const pink = new THREE.Color(0xec4899);   // neon-pink
    
    for (let i = 0; i < count; i++) {
      const u = i / count;
      const mixedColor = new THREE.Color().lerpColors(purple, pink, u);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    
    knotGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    const particleKnot = new THREE.Points(knotGeo, pointsMat);

    // B. Inner wireframe sphere for core depth
    const sphereGeo = new THREE.SphereGeometry(0.9, 12, 12);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const innerCore = new THREE.Mesh(sphereGeo, wireMat);

    // C. Outer Wireframe Cage (Dodecahedron)
    const cageGeo = new THREE.DodecahedronGeometry(3.5, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const outerCage = new THREE.Mesh(cageGeo, cageMat);

    // D. Outer Orbiting Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(3.1, 0.04, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.15,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.5; // Tilt the ring for orbit effect

    // Group the central elements, scale them to standard size, and place in balanced center-top area
    const centralGroup = new THREE.Group();
    centralGroup.add(particleKnot);
    centralGroup.add(innerCore);
    centralGroup.add(outerCage);
    centralGroup.add(orbitalRing);
    
    // Position centrally (slightly shifted up for visual balance relative to bottom-anchored text)
    centralGroup.position.y = 0.5;
    centralGroup.scale.setScalar(0.82);
    scene.add(centralGroup);

    // E. Ambient Floating Star Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 20;
      dustPositions[i + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // F. Scattered Language 3D Logo Cubes (JS, Python, React, SQL, Node, Git, HTML, CSS, TW)
    const techStack = [
      { text: "JS", color: "#f7df1e" },
      { text: "Python", color: "#3776ab" },
      { text: "React", color: "#61dafb" },
      { text: "SQL", color: "#00758f" },
      { text: "Node", color: "#339933" },
      { text: "Git", color: "#f05032" },
      { text: "HTML", color: "#e34f26" },
      { text: "CSS", color: "#1572b6" },
      { text: "TW", color: "#06b6d4" }
    ];

    const boxGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const scatteredMeshes = [];
    const placedPositions = [];
    
    const minDistanceBetweenShapes = 2.4; 
    const minDistanceFromCenter = 3.2;    // Avoid central preloader knot
    const minDistanceFromBottom = 2.8;    // Avoid bottom progress bar/text area

    // Create unique cubes for languages
    techStack.forEach((tech) => {
      let x, y, z;
      let valid = false;
      let attempts = 0;

      while (!valid && attempts < 100) {
        attempts++;
        x = (Math.random() - 0.5) * 18;     // -9 to 9
        y = (Math.random() - 0.5) * 10;     // -5 to 5
        z = (Math.random() - 0.5) * 6 - 2;  // -5 to 1

        const distFromKnot = Math.sqrt(x * x + (y - 0.5) * (y - 0.5));
        const distFromText = Math.sqrt(x * x + (y + 3.5) * (y + 3.5));
        
        if (distFromKnot < minDistanceFromCenter || distFromText < minDistanceFromBottom) {
          continue;
        }

        let tooClose = false;
        for (const pos of placedPositions) {
          const dx = x - pos.x;
          const dy = y - pos.y;
          const dz = z - pos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < minDistanceBetweenShapes) {
            tooClose = true;
            break;
          }
        }

        if (!tooClose) {
          valid = true;
        }
      }

      if (valid) {
        placedPositions.push({ x, y, z });

        // Generate texture for specific tech
        const techTexture = createLanguageTexture(tech, tech.color);
        
        const meshMat = new THREE.MeshBasicMaterial({
          map: techTexture,
          transparent: true,
          opacity: 0.85,
        });

        const mesh = new THREE.Mesh(boxGeo, meshMat);
        mesh.position.set(x, y, z);

        mesh.userData = {
          texture: techTexture, // Reference for cleanup
          rotX: (Math.random() - 0.5) * 0.015,
          rotY: (Math.random() - 0.5) * 0.015,
          floatSpeed: 0.4 + Math.random() * 1.2,
          offset: Math.random() * 100
        };

        scene.add(mesh);
        scatteredMeshes.push(mesh);
      }
    });

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 7. Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current / 100; // 0 to 1

      const baseRotationSpeed = 0.2;
      const speedMultiplier = 1 + p * 2.5;
      
      // Central Knot rotation
      particleKnot.rotation.x = elapsedTime * baseRotationSpeed * speedMultiplier;
      particleKnot.rotation.y = elapsedTime * (baseRotationSpeed + 0.05) * speedMultiplier;

      // Inner Core rotation
      innerCore.rotation.x = -elapsedTime * 0.15;
      innerCore.rotation.y = -elapsedTime * 0.2;

      // Outer Cage rotation
      outerCage.rotation.x = -elapsedTime * 0.06;
      outerCage.rotation.y = elapsedTime * 0.09;
      outerCage.rotation.z = elapsedTime * 0.03;

      // Orbital Ring rotation
      orbitalRing.rotation.z = -elapsedTime * 0.15 * speedMultiplier;

      // Ambient Dust rotation
      dustField.rotation.y = elapsedTime * 0.02;

      // Pulse central scale matching progress
      const targetScale = 0.95 + p * 0.25 + Math.sin(elapsedTime * 2) * 0.04;
      particleKnot.scale.setScalar(targetScale);

      // Animate language logo cubes (rotation and drift)
      scatteredMeshes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rotX * (1 + p);
        mesh.rotation.y += mesh.userData.rotY * (1 + p);
        
        // Slow organic wave movement
        mesh.position.y += Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.offset) * 0.0015;
        mesh.position.x += Math.cos(elapsedTime * mesh.userData.floatSpeed * 0.8 + mesh.userData.offset) * 0.0008;
      });

      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      
      knotGeo.dispose();
      sphereGeo.dispose();
      cageGeo.dispose();
      ringGeo.dispose();
      dustGeo.dispose();
      boxGeo.dispose();

      pointsMat.dispose();
      wireMat.dispose();
      cageMat.dispose();
      ringMat.dispose();
      dustMat.dispose();

      scatteredMeshes.forEach(mesh => {
        mesh.material.dispose();
        if (mesh.userData.texture) {
          mesh.userData.texture.dispose();
        }
      });
    };
  }, []);

  return (
    <>
      {/* 3D Full-screen Canvas Backdrop */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-10" 
      />
      {/* Central glow behind the text */}
      <div className="absolute w-64 h-64 rounded-full bg-neon-purple/5 blur-[80px] animate-pulse z-0" />
    </>
  );
}
