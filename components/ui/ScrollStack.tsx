
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import './ScrollStack.css';

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stackOffset?: number; // Distance from top where stack starts (px) or %? we'll use px or vh
  scaleFactor?: number; // How much to scale down underlying cards
  blurAmount?: number; // How much to blur underlying cards
}

export const ScrollStackItem: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`scroll-stack-card ${className}`}>{children}</div>
  );
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stackOffset = 120, // 120px from top
  scaleFactor = 0.05,
  blurAmount = 4,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    
    // Select only direct children cards
    const cardElements = Array.from(
      wrapperRef.current.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    setCards(cardElements);

    // Initial Setup: Set sticky top positions
    cardElements.forEach((card, index) => {
      // Each card stacks slightly lower than the previous one
      card.style.top = `${stackOffset + (index * 15)}px`;
      // Ensure proper z-index layering
      card.style.zIndex = `${index + 10}`;
    });

  }, [children, stackOffset]);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      if (!wrapperRef.current || cards.length === 0) return;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        // The target "stuck" position for this card
        const targetTop = stackOffset + (index * 15);
        
        // Calculate how far into the "stickiness" we are
        // If rect.top matches targetTop, it's fully stuck.
        // If rect.top > targetTop, it's scrolling up normally.
        
        // We want to affect previous cards based on the NEXT card's position
        // Or simply scale cards as they sit at the top.
        
        // Alternative Logic:
        // As a card hits the top, it stays. 
        // As the *next* card scrolls up over it, the *current* card scales down.
        
        const nextCard = cards[index + 1];
        if (nextCard) {
            const nextRect = nextCard.getBoundingClientRect();
            const nextTargetTop = stackOffset + ((index + 1) * 15);
            
            // Distance of the next card from its sticking point
            const distance = Math.max(0, nextRect.top - nextTargetTop);
            const windowHeight = window.innerHeight;
            
            // Normalize distance: 0 = next card is stuck (fully covering current), 1 = next card is at bottom of screen
            // We use a shorter range for the effect to complete quickly
            const range = windowHeight * 0.5; // Effect happens over 50% of viewport height
            const progress = Math.min(1, Math.max(0, distance / range));
            
            // When progress is 1 (next card far away), scale is 1.
            // When progress is 0 (next card on top), scale is (1 - scaleFactor).
            const scale = 1 - ((1 - progress) * scaleFactor);
            const blur = (1 - progress) * blurAmount;
            const brightness = 1 - ((1 - progress) * 0.2); // Darken slightly

            card.style.transform = `scale(${scale}) translateZ(0)`;
            card.style.filter = `blur(${blur}px) brightness(${brightness})`;
        } else {
            // Last card doesn't scale down
            card.style.transform = 'scale(1) translateZ(0)';
            card.style.filter = 'none';
        }
      });

      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    // Initial call
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [cards, stackOffset, scaleFactor, blurAmount]);

  return (
    <div ref={wrapperRef} className={`scroll-stack-wrapper ${className}`}>
      {children}
      <div className="scroll-stack-buffer" />
    </div>
  );
};

export default ScrollStack;
