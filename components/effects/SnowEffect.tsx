import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
}

interface SnowEffectProps {
  isActive: boolean;
  onComplete?: () => void;
}

const SnowEffect: React.FC<SnowEffectProps> = ({ isActive, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const snowflakesRef = useRef<Snowflake[]>([]);

  useEffect(() => {
    if (!isActive || !canvasRef.current) {
      // Clean up when inactive
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create snowflakes - limit count for performance
    const createSnowflakes = () => {
      // Limit max snowflakes to 150 for better performance
      const maxCount = 150;
      const densityCount = Math.floor((canvas.width * canvas.height) / 15000);
      const count = Math.min(densityCount, maxCount);
      
      snowflakesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, // Start above screen
        size: Math.random() * 3 + 1, // 1-4px
        speed: Math.random() * 1.5 + 0.5, // 0.5-2px per frame
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: (Math.random() - 0.5) * 0.02,
      }));
    };

    createSnowflakes();

    // Draw snowflake shape
    const drawSnowflake = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.lineCap = 'round';

      // Draw 6-armed snowflake
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, size);
        ctx.stroke();

        // Side branches
        ctx.beginPath();
        ctx.moveTo(0, size * 0.3);
        ctx.lineTo(-size * 0.3, size * 0.4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, size * 0.3);
        ctx.lineTo(size * 0.3, size * 0.4);
        ctx.stroke();

        ctx.rotate((Math.PI * 2) / 6);
      }

      ctx.restore();
    };

    // Animation loop with performance optimization
    let lastTime = 0;
    const targetFPS = 30; // Target 30 FPS for snow effect to save performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isActive) return;

      const deltaTime = currentTime - lastTime;

      // Throttle to target FPS
      if (deltaTime >= frameInterval) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw snowflakes
        snowflakesRef.current.forEach((flake) => {
          // Update position
          flake.y += flake.speed;
          flake.rotation += flake.rotationSpeed;
          flake.sway += flake.swaySpeed;

          // Horizontal sway
          flake.x += Math.sin(flake.sway) * 0.5;

          // Reset if off screen
          if (flake.y > canvas.height) {
            flake.y = -flake.size;
            flake.x = Math.random() * canvas.width;
          }

          // Wrap horizontally
          if (flake.x < -flake.size) {
            flake.x = canvas.width + flake.size;
          } else if (flake.x > canvas.width + flake.size) {
            flake.x = -flake.size;
          }

          // Draw snowflake
          drawSnowflake(flake.x, flake.y, flake.size, flake.rotation, flake.opacity);
        });

        lastTime = currentTime - (deltaTime % frameInterval);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ background: 'transparent' }}
    />
  );
};

export default SnowEffect;

