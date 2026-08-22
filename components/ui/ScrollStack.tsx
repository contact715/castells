import React, { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
import './ScrollStack.css';

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  stackOffset?: number;
  scaleFactor?: number;
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
  stackOffset = 120,
  scaleFactor = 0.05,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<HTMLElement[]>([]);
  const ticking = useRef(false);
  const rafId = useRef<number>(0);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);
  const windowHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 800);
  const prevProgress = useRef<number[]>([]);
  const isVisible = useRef(false);
  /*
    Позиции карточек внутри контейнера при прокрутке не меняются, меняется только
    положение самого контейнера. Раньше offsetTop читался в цикле прямо между
    записями transform, и браузер пересчитывал макет на каждой карточке заново.
    Теперь позиции считаются один раз и обновляются только при смене размера окна.
  */
  const cardOffsets = useRef<number[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const cardElements = Array.from(
      wrapperRef.current.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    setCards(cardElements);

    cardElements.forEach((card, index) => {
      card.style.top = `${stackOffset + (index * 15)}px`;
      card.style.zIndex = `${index + 10}`;
    });

    prevProgress.current = new Array(cardElements.length).fill(1);
    // Снимаем позиции один раз, после того как карточки расставлены
    cardOffsets.current = cardElements.map((card) => card.offsetTop);
  }, [children, stackOffset]);

  const updateCards = useCallback(() => {
    ticking.current = false;

    // Skip all work when section is not visible
    if (!isVisible.current || !wrapperRef.current || cards.length === 0) return;

    if (windowHeight.current !== window.innerHeight) {
      windowHeight.current = window.innerHeight;
    }

    // Единственное чтение геометрии за кадр. Дальше только записи.
    const wrapperTop = wrapperRef.current.getBoundingClientRect().top;

    cards.forEach((card, index) => {
      const nextCard = cards[index + 1];
      if (nextCard) {
        const nextOffset = cardOffsets.current[index + 1];
        if (nextOffset === undefined) return;

        /*
          Карточка, до которой ещё целый экран прокрутки, всё равно не видна:
          писать ей transform значит зря заставлять браузер пересобирать её
          слой. Считаем положение из уже снятых величин, без чтения геометрии.
        */
        const cardTop = wrapperTop + (cardOffsets.current[index] ?? 0);
        if (cardTop > windowHeight.current * 1.5) return;

        const nextCardTopRelativeToViewport = wrapperTop + nextOffset;
        const nextTargetTop = stackOffset + ((index + 1) * 15);

        const distance = Math.max(0, nextCardTopRelativeToViewport - nextTargetTop);
        const range = windowHeight.current * 0.5;
        const progress = Math.min(1, Math.max(0, distance / range));

        // Skip DOM update if progress barely changed
        if (Math.abs(progress - (prevProgress.current[index] ?? 1)) < 0.005) return;
        prevProgress.current[index] = progress;

        const scale = 1 - ((1 - progress) * scaleFactor);
        const dim = (1 - progress) * 0.6;

        card.style.transform = `scale(${scale})`;
        card.style.setProperty('--stack-dim', `${dim}`);
      } else {
        if (prevProgress.current[index] !== 1) {
          card.style.transform = 'scale(1)';
          card.style.setProperty('--stack-dim', '0');
          prevProgress.current[index] = 1;
        }
      }
    });
  }, [cards, stackOffset, scaleFactor]);

  // IntersectionObserver — only activate scroll handler when wrapper is near viewport
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        // Слои видеопамяти отдаём браузеру обратно, когда секция ушла с экрана
        wrapperRef.current?.classList.toggle('is-active', entry.isIntersecting);
        // Run once when becoming visible to initialize positions
        if (entry.isIntersecting) updateCards();
      },
      { rootMargin: '200px' }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [updateCards]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current && isVisible.current) {
        rafId.current = requestAnimationFrame(updateCards);
        ticking.current = true;
      }
    };

    const onResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        windowHeight.current = window.innerHeight;
        // при смене размера окна карточки переверстались, позиции надо снять заново
        cardOffsets.current = cards.map((card) => card.offsetTop);
        if (isVisible.current) updateCards();
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    if (isVisible.current) updateCards();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateCards]);

  return (
    <div ref={wrapperRef} className={`scroll-stack-wrapper ${className}`}>
      {children}
      <div className="scroll-stack-buffer" />
    </div>
  );
};

export default ScrollStack;
