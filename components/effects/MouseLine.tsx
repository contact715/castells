import React, { useEffect, useRef } from "react";

const MouseLine: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({ 
          x: e.clientX, 
          y: e.clientY, 
          time: Date.now() 
      });
    };

    const animate = () => {
      const now = Date.now();
      // Keep points for 600ms for a fluid trail
      pointsRef.current = pointsRef.current.filter(p => now - p.time < 600);
      
      const path = pathRef.current;
      const points = pointsRef.current;

      if (path) {
          if (points.length < 2) {
              path.setAttribute("d", "");
          } else {
             // Start path
             let d = `M ${points[0].x} ${points[0].y}`;
             
             // Quadratic Bezier for smooth curvature
             for (let i = 1; i < points.length; i++) {
                 const p0 = points[i - 1];
                 const p1 = points[i];
                 const midX = (p0.x + p1.x) / 2;
                 const midY = (p0.y + p1.y) / 2;
                 
                 if (i === 1) {
                     d += ` L ${midX} ${midY}`;
                 } else {
                     d += ` Q ${p0.x} ${p0.y} ${midX} ${midY}`;
                 }
             }
             
             // Connect to the latest point
             const last = points[points.length - 1];
             d += ` L ${last.x} ${last.y}`;
             
             path.setAttribute("d", d);
          }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg className="pointer-events-none fixed inset-0 z-[9999] h-full w-full touch-none">
      <path
        ref={pathRef}
        d=""
        fill="none"
        stroke="#E08576" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-60 transition-opacity duration-75 drop-shadow-[0_0_4px_rgba(224,133,118,0.4)]"
      />
    </svg>
  );
};

export default MouseLine;