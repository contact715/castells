import React, { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
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
  const cardOffsets = useRef<number[]>([]);
  const ticking = useRef(false);
  const rafId = useRef<number>(0);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);
  const windowHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 800);

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

  const calculateOffsets = useCallback(() => {
    if (!wrapperRef.current) return;

    cardOffsets.current = cards.map((card) => {
      return card.offsetTop;
    });
  }, [cards]);

  const updateCards = useCallback(() => {
    if (!wrapperRef.current || cards.length === 0) {
      ticking.current = false;
      return;
    }

    if (windowHeight.current !== window.innerHeight) {
      windowHeight.current = window.innerHeight;
    }

    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];
      if (nextCard) {
        const nextCardTopRelativeToViewport = wrapperRect.top + nextCard.offsetTop;
        const nextTargetTop = stackOffset + ((index + 1) * 15);

        const distance = Math.max(0, nextCardTopRelativeToViewport - nextTargetTop);
        const range = windowHeight.current * 0.5;
        const progress = Math.min(1, Math.max(0, distance / range));

        const scale = 1 - ((1 - progress) * scaleFactor);
        const blur = (1 - progress) * blurAmount;
        const brightness = 1 - ((1 - progress) * 0.2);

        card.style.transform = `scale(${scale}) translateZ(0)`;
        card.style.filter = `blur(${blur}px) brightness(${brightness})`;
      } else {
        card.style.transform = 'scale(1) translateZ(0)';
        card.style.filter = 'none';
      }
    });

    ticking.current = false;
  }, [cards, stackOffset, scaleFactor, blurAmount]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(updateCards);
        ticking.current = true;
      }
    };

    const onResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        windowHeight.current = window.innerHeight;
        calculateOffsets();
        updateCards();
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial call
    calculateOffsets();
    updateCards();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [calculateOffsets, updateCards]);

  return (
    <div ref={wrapperRef} className={`scroll-stack-wrapper ${className}`}>
      {children}
      <div className="scroll-stack-buffer" />
    </div>
  );
};

export default ScrollStack;
