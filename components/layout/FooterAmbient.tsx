
import React, { useEffect, useRef } from 'react';

const FooterAmbient: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Start off-screen

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Particles
    const particles: {x: number; y: number; vx: number; vy: number; size: number; alpha: number}[] = [];
    const PARTICLE_COUNT = 60;

    const initParticles = () => {
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: Math.random() * 2,
                alpha: Math.random() * 0.3 + 0.1
            });
        }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const { x, y } = mouseRef.current;
      
      // Removed volumetric coral glow gradient

      // Draw Dust Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Calculate distance from light for interactive visibility
        // Make them slightly brighter near light
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const proximity = Math.max(0, 1 - dist / 400); // 0 to 1 based on distance

        // Particles light up white/neutral when mouse is near
        const dynamicAlpha = p.alpha + (proximity * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Init
    handleResize();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => { mouseRef.current = { x: -1000, y: -1000 }});

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default FooterAmbient;
