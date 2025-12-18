import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // State
    let targetProgress = 0; // 0 (Field) -> 1 (Text)
    let currentProgress = 0;
    
    // Mouse State
    let mouseX = -9999;
    let mouseY = -9999;
    
    interface Point {
      x: number;
      y: number;
    }

    class Particle {
      x: number; y: number; z: number;
      vx: number = 0; vy: number = 0; vz: number = 0;
      
      tx: number = 0; ty: number = 0; tz: number = 0;
      cx: number = 0; cy: number = 0; cz: number = 0;

      size: number;
      randomOffset: number;

      constructor() {
        this.x = 0; this.y = 0; this.z = 0;
        this.size = Math.random() * 3 + 1; // Elegance
        this.randomOffset = Math.random() * 100;
      }

      update(progress: number, time: number) {
        // Ease out cubic
        const t = 1 - Math.pow(1 - progress, 3);

        // Target interpolation
        const targetX = this.cx + (this.tx - this.cx) * t;
        const targetY = this.cy + (this.ty - this.cy) * t;
        const targetZ = this.cz + (this.tz - this.cz) * t;

        // Mouse Interaction (Liquid Ripple)
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distSq = dx * dx + dy * dy;
        const interactionRadius = 250;

        let forceX = 0;
        let forceY = 0;
        let forceZ = 0;

        if (distSq < interactionRadius * interactionRadius) {
            const dist = Math.sqrt(distSq);
            const force = (interactionRadius - dist) / interactionRadius;
            
            // Gentle push
            const pushStrength = 8 * force; 
            const angle = Math.atan2(dy, dx);
            
            forceX = Math.cos(angle) * pushStrength;
            forceY = Math.sin(angle) * pushStrength;
            forceZ = Math.sin(dist * 0.05 - time * 2) * pushStrength * 4; // Ripple depth
        }

        // Ambient Float (Gentle breathing)
        const ambientX = Math.sin(time * 0.5 + this.randomOffset) * 2;
        const ambientY = Math.cos(time * 0.3 + this.randomOffset) * 2;

        // Physics Integration
        const springStiffness = 0.03;
        const ax = (targetX + ambientX - this.x) * springStiffness + forceX;
        const ay = (targetY + ambientY - this.y) * springStiffness + forceY;
        const az = (targetZ - this.z) * springStiffness + forceZ;

        this.vx += ax;
        this.vy += ay;
        this.vz += az;

        const damping = 0.90; // Higher friction for "liquid" feel
        this.vx *= damping;
        this.vy *= damping;
        this.vz *= damping;

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
      }

      draw() {
        if (!ctx) return;
        
        const perspective = 800;
        const scale = Math.max(0.1, perspective / (perspective + this.z + 600));
        
        const drawX = (this.x - width/2) * scale + width/2;
        const drawY = (this.y - height/2) * scale + height/2;
        const drawSize = this.size * scale;

        // --- Color Logic (Guideline Coral Theme) ---
        const minZ = -500;
        const maxZ = 500;
        let norm = (this.z - minZ) / (maxZ - minZ);
        norm = Math.max(0, Math.min(1, norm));

        // Gradient: Coral (#E08576) -> Deep Coral (#D67060)
        // #E08576 = R224 G133 B118
        // #D67060 = R214 G112 B96
        
        const r = 224 - (10 * norm); // 224 -> 214
        const g = 133 - (21 * norm); // 133 -> 112
        const b = 118 - (22 * norm); // 118 -> 96

        // Alpha: Near is opaque, Far is transparent
        const alpha = (1 - norm) * 0.6;

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const getTextPoints = (text: string): Point[] => {
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) return [];

        offCanvas.width = width;
        offCanvas.height = height;

        // Use Newsreader for the particle text (Brand Guideline)
        const fontSize = Math.min(width * 0.2, 400); 
        offCtx.font = `400 ${fontSize}px "Newsreader", serif`;
        offCtx.fillStyle = 'white';
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillText(text, width / 2, height / 2);

        const imageData = offCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const points: Point[] = [];
        
        // Higher density for serif details
        const gap = width < 800 ? 6 : 8; 

        for (let y = 0; y < height; y += gap) {
            for (let x = 0; x < width; x += gap) {
                if (data[(y * width + x) * 4 + 3] > 128) {
                    points.push({ x, y });
                }
            }
        }
        return points;
    };

    const initParticles = () => {
      const textPoints = getTextPoints("Castells");
      particles = [];

      textPoints.forEach((pt) => {
         const p = new Particle();
         
         p.tx = pt.x;
         p.ty = pt.y;
         p.tz = (Math.random() - 0.5) * 50; // Slight thickness

         // Start in a wide, elegant cloud
         const angle = Math.random() * Math.PI * 2;
         const r = Math.random() * width * 0.8;
         p.cx = width/2 + Math.cos(angle) * r;
         p.cy = height/2 + Math.sin(angle) * r;
         p.cz = (Math.random() - 0.5) * 1000;

         p.x = p.cx;
         p.y = p.cy;
         p.z = p.cz;

         particles.push(p);
      });
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const transitionDistance = window.innerHeight * 0.6; 
        const rawProgress = scrollY / transitionDistance;
        targetProgress = Math.max(0, Math.min(1, rawProgress));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches[0]) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }

    const animate = (time: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      currentProgress += (targetProgress - currentProgress) * 0.03;

      particles.forEach(p => {
        p.update(currentProgress, time / 1000);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('scroll', handleScroll);

    handleResize();
    handleScroll();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
};

export default InteractiveBackground;