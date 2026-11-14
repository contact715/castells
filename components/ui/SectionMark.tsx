import React from 'react';

/*
  Метка раздела: двойная косая черта из логотипа «Caste//s» и подпись.
  Появилась 14 ноября 2026 вместо зелёной точки. Точка была нейтральной и
  могла стоять на любом сайте; черта взята из нашего же знака.
*/
interface SectionMarkProps {
  children: React.ReactNode;
  /** На тёмной полосе подпись и черта светлые. */
  onDark?: boolean;
  className?: string;
}

export const SectionMark: React.FC<SectionMarkProps> = ({ children, onDark = false, className = '' }) => (
  <div className={`flex items-center gap-2.5 mb-4 ${className}`}>
    <span
      className={`font-display italic font-semibold text-xl leading-none select-none ${onDark ? 'text-lime' : 'text-accent-text'}`}
      aria-hidden="true"
    >
      //
    </span>
    <span
      className={`text-xs font-semibold tracking-[0.12em] uppercase ${onDark ? 'text-white/70' : 'text-text-secondary dark:text-white/60'}`}
    >
      {children}
    </span>
  </div>
);

export default SectionMark;
