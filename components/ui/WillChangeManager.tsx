import { useEffect, useRef } from 'react';

/**
 * WillChangeManager - Hook для динамического управления will-change
 * Добавляет will-change только во время анимации, удаляет после
 * Это улучшает производительность, так как will-change создает новый слой композиции
 */
export const useWillChange = (isAnimating: boolean, property: string = 'transform') => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    if (isAnimating) {
      elementRef.current.style.willChange = property;
    } else {
      // Удаляем will-change после анимации с небольшой задержкой
      const timeout = setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.willChange = 'auto';
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating, property]);

  return elementRef;
};

/**
 * WillChangeManager - Component для управления will-change на элементе
 */
interface WillChangeManagerProps {
  children: React.ReactElement;
  isAnimating: boolean;
  property?: string;
}

export const WillChangeManager: React.FC<WillChangeManagerProps> = ({
  children,
  isAnimating,
  property = 'transform',
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isAnimating) {
      ref.current.style.willChange = property;
    } else {
      const timeout = setTimeout(() => {
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating, property]);

  return React.cloneElement(children, { ref });
};



