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
      canvas.clientWidth / canvas.clientHeight,
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
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Geometries

    // A. Digital particle Torus Knot (Central element)
    const knotGeo = new THREE.TorusKnotGeometry(2.2, 0.6, 120, 16);
    
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
      opacity: 0.8,
    });

    const particleKnot = new THREE.Points(knotGeo, pointsMat);
    scene.add(particleKnot);

    // B. Inner wireframe sphere for core depth
    const sphereGeo = new THREE.SphereGeometry(1.0, 12, 12);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerCore = new THREE.Mesh(sphereGeo, wireMat);
    scene.add(innerCore);

    // C. Outer Wireframe Cage (Dodecahedron)
    const cageGeo = new THREE.DodecahedronGeometry(3.6, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const outerCage = new THREE.Mesh(cageGeo, cageMat);
    scene.add(outerCage);

    // D. Outer Orbiting Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(3.3, 0.04, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.25,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.5; // Tilt the ring for orbit effect
    scene.add(orbitalRing);

    // E. Ambient Floating Star Particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 12;
      dustPositions[i + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 6. Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current / 100; // 0 to 1

      // Speed up rotation as progress increases
      const baseRotationSpeed = 0.2;
      const speedMultiplier = 1 + p * 2.5; // Up to 3.5x speed at 100%
      
      // Central Knot rotation
      particleKnot.rotation.x = elapsedTime * baseRotationSpeed * speedMultiplier;
      particleKnot.rotation.y = elapsedTime * (baseRotationSpeed + 0.05) * speedMultiplier;

      // Inner Core rotation (counter-rotation)
      innerCore.rotation.x = -elapsedTime * 0.15;
      innerCore.rotation.y = -elapsedTime * 0.2;

      // Outer Cage rotation (different axis and slow)
      outerCage.rotation.x = -elapsedTime * 0.06;
      outerCage.rotation.y = elapsedTime * 0.09;
      outerCage.rotation.z = elapsedTime * 0.03;

      // Orbital Ring rotation
      orbitalRing.rotation.z = -elapsedTime * 0.15 * speedMultiplier;

      // Ambient Dust rotation
      dustField.rotation.y = elapsedTime * 0.02;

      // Pulse the scale of the outer particle knot matching progress
      const targetScale = 0.95 + p * 0.25 + Math.sin(elapsedTime * 2) * 0.04;
      particleKnot.scale.setScalar(targetScale);

      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      
      knotGeo.dispose();
      sphereGeo.dispose();
      cageGeo.dispose();
      ringGeo.dispose();
      dustGeo.dispose();

      pointsMat.dispose();
      wireMat.dispose();
      cageMat.dispose();
      ringMat.dispose();
      dustMat.dispose();
    };
  }, []);

  return (
    <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center select-none pointer-events-none">
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0 z-10" />
      
      {/* Radial Glow underneath */}
      <div className="absolute w-40 h-40 rounded-full bg-neon-purple/10 blur-[60px] animate-pulse z-0" />
    </div>
  );
}
