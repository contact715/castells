import React from 'react';

/*
  Четыре рисунка к блоку «узнаёте себя», 14 ноября 2026.

  Блок был четырьмя белыми карточками с текстом. Рисунок нужен, чтобы
  ситуацию было видно раньше, чем прочитано. Нарисованы вручную в коде, без
  внешних файлов и без стоковых картинок: линия, два цвета из палитры сайта
  и двойная косая черта из логотипа. Это схемы, а не сцены с героями: одна
  мысль на рисунок.

  Все четыре декоративны, смысл несёт текст рядом, поэтому aria-hidden.
*/

const frame = 'w-full h-full';
const ink = 'var(--color-forest)';
const paper = '#ffffff';
const accent = 'var(--color-accent)';

/** Три подрядчика показывают друг на друга, посередине пусто. */
const Vendors: React.FC = () => (
  <svg viewBox="0 0 320 200" className={frame} fill="none" aria-hidden="true">
    {[
      { x: 160, y: 46, label: 'Site' },
      { x: 62, y: 152, label: 'Ads' },
      { x: 258, y: 152, label: 'CRM' },
    ].map((v) => (
      <g key={v.label}>
        <rect x={v.x - 40} y={v.y - 22} width="80" height="44" rx="10" fill={paper} stroke={ink} strokeWidth="2.5" />
        <text x={v.x} y={v.y + 6} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="15" fill={ink}>{v.label}</text>
      </g>
    ))}
    {/* стрелки по кругу: каждый показывает на соседа */}
    <g stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M126 70 L88 124" /><path d="M88 124 l2 -13 M88 124 l12 -4" />
      <path d="M106 156 H212" /><path d="M212 156 l-10 -7 M212 156 l-10 7" />
      <path d="M232 124 L196 72" /><path d="M196 72 l11 6 M196 72 l1 13" />
    </g>
    <circle cx="160" cy="118" r="19" fill={paper} stroke={ink} strokeWidth="2.5" strokeDasharray="5 5" />
    <text x="160" y="125" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="20" fill={ink}>?</text>
  </svg>
);

/** Запущенная кампания, к которой никто не возвращался: календарь без отметок. */
const Abandoned: React.FC = () => (
  <svg viewBox="0 0 320 200" className={frame} fill="none" aria-hidden="true">
    <rect x="34" y="30" width="150" height="140" rx="12" fill={paper} stroke={ink} strokeWidth="2.5" />
    <path d="M34 62 H184" stroke={ink} strokeWidth="2.5" />
    <path d="M66 22 V40 M152 22 V40" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
    {[0, 1, 2, 3].map((row) => [0, 1, 2, 3, 4].map((col) => {
      const first = row === 0 && col === 0;
      return (
        <rect
          key={`${row}-${col}`}
          x={48 + col * 26} y={74 + row * 23} width="16" height="14" rx="3"
          fill={first ? accent : 'none'} stroke={first ? accent : ink} strokeOpacity={first ? 1 : 0.3} strokeWidth="2"
        />
      );
    }))}
    <path d="M52 81 l3 3 l6 -6" stroke={paper} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* счёт оплачен */}
    <rect x="204" y="52" width="86" height="104" rx="10" fill={paper} stroke={ink} strokeWidth="2.5" />
    <path d="M218 76 H276 M218 94 H262 M218 112 H270" stroke={ink} strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="216" y="126" width="62" height="20" rx="6" fill={accent} />
    <text x="247" y="140" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="11" fill={paper}>PAID</text>
  </svg>
);

/** Заявки приходят, но проваливаются мимо: пропущенные звонки. */
const Missed: React.FC = () => (
  <svg viewBox="0 0 320 200" className={frame} fill="none" aria-hidden="true">
    <rect x="116" y="20" width="88" height="160" rx="16" fill={paper} stroke={ink} strokeWidth="2.5" />
    <path d="M146 34 H174" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x="128" y={56 + i * 36} width="64" height="26" rx="7" fill="none" stroke={ink} strokeOpacity="0.3" strokeWidth="2" />
        <circle cx="141" cy={69 + i * 36} r="5" fill={i === 0 ? accent : 'none'} stroke={i === 0 ? accent : ink} strokeOpacity={i === 0 ? 1 : 0.4} strokeWidth="2" />
        <path d={`M152 ${69 + i * 36} H182`} stroke={ink} strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    ))}
    {/* входящие слева */}
    <g stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 60 H96" /><path d="M96 60 l-10 -7 M96 60 l-10 7" />
      <path d="M28 100 H96" /><path d="M96 100 l-10 -7 M96 100 l-10 7" />
    </g>
    {/* и уходят справа к другому */}
    <g stroke={ink} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6">
      <path d="M216 120 C250 120 262 140 290 164" />
    </g>
    <path d="M290 164 l-13 -2 M290 164 l-3 -13" stroke={ink} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="246" cy="52" r="20" fill={paper} stroke={ink} strokeWidth="2.5" />
    <path d="M246 40 V53 L255 59" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Владелец в центре, вокруг все задачи маркетинга, и все они на нём. */
const Juggling: React.FC = () => (
  <svg viewBox="0 0 320 200" className={frame} fill="none" aria-hidden="true">
    <g stroke={ink} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="5 6">
      <path d="M160 100 L62 46 M160 100 L258 46 M160 100 L52 150 M160 100 L268 150 M160 100 L160 26" />
    </g>
    {[
      { x: 62, y: 46, label: 'Reviews' },
      { x: 258, y: 46, label: 'Ads' },
      { x: 52, y: 150, label: 'Website' },
      { x: 268, y: 150, label: 'Calls' },
      { x: 160, y: 26, label: 'Reports' },
    ].map((t) => (
      <g key={t.label}>
        <rect x={t.x - 38} y={t.y - 15} width="76" height="30" rx="15" fill={paper} stroke={ink} strokeWidth="2.5" />
        <text x={t.x} y={t.y + 5} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="12.5" fill={ink}>{t.label}</text>
      </g>
    ))}
    <circle cx="160" cy="100" r="30" fill={accent} />
    <circle cx="160" cy="92" r="9" fill={paper} />
    <path d="M142 116 C146 104 174 104 178 116" stroke={paper} strokeWidth="5" strokeLinecap="round" />
    <text x="160" y="158" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="12.5" fill={ink}>You</text>
  </svg>
);

const ART: Record<string, React.FC> = {
  vendors: Vendors,
  abandoned: Abandoned,
  missed: Missed,
  juggling: Juggling,
};

export const ProblemArt: React.FC<{ name: string }> = ({ name }) => {
  const Art = ART[name];
  return Art ? <Art /> : null;
};

export default ProblemArt;
