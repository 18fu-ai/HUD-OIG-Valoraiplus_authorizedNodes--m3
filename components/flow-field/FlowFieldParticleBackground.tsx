"use client";

import React, { useEffect, useRef, useCallback } from "react";

/**
 * FlowFieldParticleBackground
 * 
 * Classification: Bounded, adaptive, lifecycle-safe procedural layer
 * Purpose: Internal node-status visualization interface
 * Integration: Production FlowField subsystem
 * Status: CANONICAL
 * 
 * This is a presentation-only visual component.
 * It does not perform real-time routing, telemetry, or enforcement.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const PARTICLE_COUNT = 120;
const FLOW_SCALE = 0.003;
const FLOW_SPEED = 0.0008;

export default function FlowFieldParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random() * 200 + 100,
        maxLife: Math.random() * 200 + 100,
        size: Math.random() * 1.5 + 0.5,
      });
    }
    particlesRef.current = particles;
  }, []);

  const noise2D = useCallback((x: number, y: number, t: number): number => {
    // Simplified Perlin-like noise approximation
    const nx = Math.sin(x * 1.2 + t) * Math.cos(y * 0.8 + t * 0.7);
    const ny = Math.cos(x * 0.9 + t * 0.5) * Math.sin(y * 1.1 + t * 0.9);
    return Math.atan2(ny, nx);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with fade effect
      ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
      ctx.fillRect(0, 0, width, height);

      timeRef.current += FLOW_SPEED;

      particlesRef.current.forEach((p) => {
        // Get flow direction from noise field
        const angle = noise2D(p.x * FLOW_SCALE, p.y * FLOW_SCALE, timeRef.current);
        
        // Update velocity with flow influence
        p.vx = p.vx * 0.95 + Math.cos(angle) * 0.4;
        p.vy = p.vy * 0.95 + Math.sin(angle) * 0.4;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Respawn dead particles
        if (p.life <= 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = p.maxLife;
          p.vx = 0;
          p.vy = 0;
        }

        // Calculate alpha based on life
        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.6;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.fill();

        // Draw trail
        if (Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.3})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, noise2D]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      style={{ background: "linear-gradient(to bottom, #020617, #0f172a)" }}
      aria-hidden="true"
    />
  );
}
