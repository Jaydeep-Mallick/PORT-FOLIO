import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Interactive3DScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // Transparent background so CSS gradients show through
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Floating Geometries
    // Outer wireframe torus knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(5, 1.4, 120, 16, 2, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xec4899, // Neon Pink
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torusKnotWire = new THREE.Mesh(torusKnotGeo, wireframeMat);
    scene.add(torusKnotWire);

    // Inner mesh core for depth
    const innerGeo = new THREE.TorusKnotGeometry(4.8, 1.2, 100, 14, 2, 3);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0a0518,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });
    const torusKnotCore = new THREE.Mesh(innerGeo, innerMat);
    scene.add(torusKnotCore);

    // 5. Particle Field (3D Starfield)
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const purpleColor = new THREE.Color(0xa855f7);
    const pinkColor = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random coordinates in space
      positions[i] = (Math.random() - 0.5) * 80;     // X
      positions[i + 1] = (Math.random() - 0.5) * 80; // Y
      positions[i + 2] = (Math.random() - 0.5) * 40; // Z

      // Dynamic color interpolation between purple and pink
      const mixRatio = Math.random();
      const mixedColor = new THREE.Color().lerpColors(purpleColor, pinkColor, mixRatio);
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambientLight);

    const neonSpotlight = new THREE.PointLight(0xa855f7, 8, 40); // Neon purple light
    neonSpotlight.position.set(0, 0, 10);
    scene.add(neonSpotlight);

    const pinkSpotlight = new THREE.PointLight(0xec4899, 5, 30); // Neon pink light
    pinkSpotlight.position.set(-10, 5, 8);
    scene.add(pinkSpotlight);

    // 7. Mouse Interactivity Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      // Normalize coordinate between -1 and 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow rotation on the mesh
      torusKnotWire.rotation.x = elapsedTime * 0.12;
      torusKnotWire.rotation.y = elapsedTime * 0.15;
      
      torusKnotCore.rotation.x = elapsedTime * 0.12;
      torusKnotCore.rotation.y = elapsedTime * 0.15;

      // Slow rotation on particle array
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      // Smooth inertia mouse follow for camera movement (3D Parallax)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate scene slightly based on mouse
      scene.rotation.y = targetX * 0.15;
      scene.rotation.x = -targetY * 0.15;

      // Move spotlights tracking cursor coordinates
      neonSpotlight.position.x = targetX * 15;
      neonSpotlight.position.y = targetY * 12;
      
      pinkSpotlight.position.x = -targetX * 10;
      pinkSpotlight.position.y = -targetY * 10;

      // Render Scene
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // 10. Clean Up on Unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      torusKnotGeo.dispose();
      innerGeo.dispose();
      wireframeMat.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
