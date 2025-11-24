
import React, { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Physics configuration
    const PARTICLE_DENSITY = 6000; // Higher number = fewer particles (pixels per particle)
    const MOUSE_RADIUS = 200;
    const MOUSE_FORCE = 0.3;
    const DRAG = 0.96; // Friction
    const DRIFT_SPEED = 0.2; // Natural zero-g movement speed

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Theme detection
      const isDark = document.documentElement.classList.contains('dark');
      
      // Colors - very subtle
      const baseRGB = isDark ? '255, 255, 255' : '0, 0, 0';
      const accentRGB = '224, 133, 118'; // Coral
      
      const count = Math.floor((width * height) / PARTICLE_DENSITY);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() > 0.95; // 5% accent particles
        const color = isAccent ? accentRGB : baseRGB;
        const alpha = Math.random() * 0.2 + 0.05; // Very low opacity (0.05 - 0.25)
        
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
          size: Math.random() * 1.5 + 0.5, // Tiny size (0.5px - 2px)
          color: color,
          alpha: alpha,
        });
      }
      particlesRef.current = newParticles;
    };

    const update = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      particlesRef.current.forEach(p => {
        // 1. Mouse Repulsion (Anti-Gravity Field)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS; // 0 to 1
          const angle = Math.atan2(dy, dx);
          
          // Apply force
          p.vx += Math.cos(angle) * force * MOUSE_FORCE;
          p.vy += Math.sin(angle) * force * MOUSE_FORCE;
        }

        // 2. Apply Physics
        p.x += p.vx;
        p.y += p.vy;

        // 3. Friction (Drag) - slows them down after push
        p.vx *= DRAG;
        p.vy *= DRAG;

        // 4. Constant Minimum Drift (Zero Gravity)
        // If they slow down too much, nudge them slightly to keep "floating"
        const currentSpeed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (currentSpeed < DRIFT_SPEED * 0.5) {
             p.vx += (Math.random() - 0.5) * 0.01;
             p.vy += (Math.random() - 0.5) * 0.01;
        }

        // 5. Screen Wrap
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // 6. Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(update);
    };

    init();
    update();

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const observer = new MutationObserver(init);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none -z-10 ${className}`}
    />
  );
};

export default AuroraBackground;
