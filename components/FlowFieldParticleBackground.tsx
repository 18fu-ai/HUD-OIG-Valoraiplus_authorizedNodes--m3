"use client";

import { useEffect, useRef } from "react";

/**
 * FlowFieldParticleBackground
 * Elite production-grade particle flow field with mouse interaction
 * VALORAIPLUS2E_ ELITE ORCHESTRATOR v1 • EPOCH #2207
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const NUM_PARTICLES = 1200;
const FLOW_SCALE = 0.0035;
const INTERACTION_RADIUS = 280;

export function FlowFieldParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const createParticle = (): Particle => ({
      x: Math.random() * dimensionsRef.current.width,
      y: Math.random() * dimensionsRef.current.height,
      vx: 0,
      vy: 0,
      size: Math.random() * 2.8 + 0.8,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      dimensionsRef.current = { width, height };
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      particlesRef.current = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const getFlow = (x: number, y: number) => {
      const time = timeRef.current;
      const angle = 
        Math.sin(time * 0.0012 + x * FLOW_SCALE) * 
        Math.cos(time * 0.0017 + y * FLOW_SCALE * 1.3) * 
        Math.PI * 2.4;
      
      let fx = Math.cos(angle) * 1.8;
      let fy = Math.sin(angle) * 1.8;

      const mouse = mouseRef.current;
      if (mouse.active) {
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distSq = dx * dx + dy * dy;
        const r2 = INTERACTION_RADIUS * INTERACTION_RADIUS;
        
        if (distSq < r2) {
          const falloff = 1 - distSq / r2;
          fx += (dx / INTERACTION_RADIUS) * falloff * 4.5;
          fy += (dy / INTERACTION_RADIUS) * falloff * 4.5;
        }
      }
      
      return { x: fx, y: fy };
    };

    const animate = (ts: number) => {
      const dt = Math.min((ts - lastTimeRef.current) / 16.666, 2.0);
      lastTimeRef.current = ts;
      timeRef.current += dt * 16;

      const { width, height } = dimensionsRef.current;

      // Trail effect
      ctx.fillStyle = "rgba(1, 1, 3, 0.085)";
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const time = timeRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const flow = getFlow(p.x, p.y);

        // Update velocity and position
        p.vx = p.vx * 0.92 + flow.x * 1.1;
        p.vy = p.vy * 0.92 + flow.y * 1.1;
        p.x += p.vx * dt * 65;
        p.y += p.vy * dt * 65;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.atan2(p.vy, p.vx));
        ctx.fillStyle = `hsla(${(time * 0.018) % 360}, 88%, 72%, 0.92)`;
        ctx.fillRect(-p.size * 2.2, -0.9, p.size * 4.4, 1.8);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    // Initialize
    resize();
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    // Event listeners
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: "#010103" }}
    />
  );
}
