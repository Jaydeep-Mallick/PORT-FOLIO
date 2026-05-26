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

    // 4. Geometries

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
    scene.add(particleKnot);

    // B. Inner wireframe sphere for core depth
    const sphereGeo = new THREE.SphereGeometry(0.9, 12, 12);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const innerCore = new THREE.Mesh(sphereGeo, wireMat);
    scene.add(innerCore);

    // C. Outer Wireframe Cage (Dodecahedron)
    const cageGeo = new THREE.DodecahedronGeometry(3.5, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const outerCage = new THREE.Mesh(cageGeo, cageMat);
    scene.add(outerCage);

    // D. Outer Orbiting Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(3.1, 0.04, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.15,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.5; // Tilt the ring for orbit effect
    scene.add(orbitalRing);

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

    // F. Scattered Low-Poly Floating Geometries (No overlapping)
    const scatteredGeometries = [
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.TetrahedronGeometry(0.35),
      new THREE.OctahedronGeometry(0.3),
      new THREE.ConeGeometry(0.2, 0.4, 4),
      new THREE.IcosahedronGeometry(0.25)
    ];

    const scatteredMeshes = [];
    const numScattered = 22;
    const placedPositions = [];
    const minDistanceBetweenShapes = 2.2; // Keep them spaced apart
    const minDistanceFromCenter = 3.6;     // Keep the central text area clear

    for (let i = 0; i < numScattered; i++) {
      let x, y, z;
      let valid = false;
      let attempts = 0;

      while (!valid && attempts < 100) {
        attempts++;
        // Spread across full screen coordinates
        x = (Math.random() - 0.5) * 18;     // -9 to 9
        y = (Math.random() - 0.5) * 10;     // -5 to 5
        z = (Math.random() - 0.5) * 6 - 2;  // -5 to 1

        // 2D distance from center to keep text readable
        const distFromCenter = Math.sqrt(x * x + y * y);
        if (distFromCenter < minDistanceFromCenter) {
          continue;
        }

        // Distance from already placed items
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

        const randomGeo = scatteredGeometries[Math.floor(Math.random() * scatteredGeometries.length)];
        
        const meshMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0xa855f7 : 0xec4899,
          wireframe: true,
          transparent: true,
          opacity: 0.15 + Math.random() * 0.25,
        });

        const mesh = new THREE.Mesh(randomGeo, meshMat);
        mesh.position.set(x, y, z);

        // Save custom animation attributes in userData
        mesh.userData = {
          rotX: (Math.random() - 0.5) * 0.015,
          rotY: (Math.random() - 0.5) * 0.015,
          floatSpeed: 0.4 + Math.random() * 1.2,
          offset: Math.random() * 100
        };

        scene.add(mesh);
        scatteredMeshes.push(mesh);
      }
    }

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 6. Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
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

      // Animate scattered shapes (rotation and drift)
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

      scatteredGeometries.forEach(geo => geo.dispose());

      pointsMat.dispose();
      wireMat.dispose();
      cageMat.dispose();
      ringMat.dispose();
      dustMat.dispose();

      scatteredMeshes.forEach(mesh => {
        mesh.material.dispose();
      });
    };
  }, []);

  return (
    <>
      {/* 3D Full-screen Canvas Backdrop */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      />
      {/* Central glow behind the text */}
      <div className="absolute w-64 h-64 rounded-full bg-neon-purple/5 blur-[80px] animate-pulse z-0" />
    </>
  );
}
