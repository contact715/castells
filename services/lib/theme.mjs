/*
  Оформление пульта. ВСЕ значения ниже выписаны из app/globals.css репозитория
  Mosco-corp/web (Project X) — файл прочитан целиком через агента Railway
  29 августа 2026. Ничего не подобрано на глаз.

  ПОЧЕМУ ТЕМА ТОЛЬКО ТЁМНАЯ. В их же globals.css стоит комментарий:
  «Dashboard is always visually dark (hardcoded surfaces)», а ThemeProvider
  начинается с `useState<Theme>("dark")`. Панель управления у них тёмная
  всегда, светлого варианта у неё нет — светлые переменные в том файле
  относятся к витринному сайту, не к панели.

  Моя первая версия зависела от настройки системы и на светлой системе
  открывалась бежевой, цветами витрины. Владелец справедливо не узнал в этом
  Mosco. Теперь светлой темы здесь нет вовсе, как и у них.

  ЧТО ОТКУДА, построчно:
    --background       #000000                → ground
    --surface          #111111                → surface
    --surface-tertiary #1a1a1a                → sunk
    --text-primary     #FFFFFF                → ink
    --text-secondary   rgba(255,255,255,.80)  → neutral
    --text-muted       rgba(255,255,255,.50)  → muted
    --border-default   rgba(255,255,255,.06)  → hair
    --border-strong    rgba(255,255,255,.10)  → hairStrong
    --accent           59 130 246 = #3B82F6   → accent
    --success          #10B981                → ok
    --error            #EF4444                → no
    --warning          #F59E0B                → wait
    --radius           0.75rem = 12px         → радиус

  Цвета состояний раньше были моими — теперь нет: в их файле они есть и взяты
  оттуда. Своего в оформлении не осталось ничего, кроме моноширинного шрифта
  для чисел: его в их наборе нет, а таблицы без него плывут.
*/

/** Размеры оболочки. Из components/layout/Sidebar.tsx и globals.css. */
export const РАЗМЕРЫ = {
  сайдбар: '175px',    // Sidebar.tsx: sidebarCollapsed ? '72px' : '175px'
  свёрнутый: '72px',   // там же
  панель: '48px',      // наше: у них высота панели по содержимому
  радиус: '12px',      // globals.css: --radius: 0.75rem
  радиусПункта: '8px', // Tailwind rounded-inner в Sidebar.tsx
};

/**
 * Шрифты. В globals.css: var(--font-plus-jakarta), var(--font-inter),
 * system-ui. Заголовки — тот же Plus Jakarta, вес 600, разрядка -0.01em.
 */
export const ШРИФТЫ = {
  подключение:
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700' +
    '&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
  заголовки: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
  текст: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
  /* наше: моноширинного в их наборе нет, а числа в таблицах без него плывут */
  моно: '"IBM Plex Mono", ui-monospace, monospace',
};

/** Единственная тема. Светлой у панели Mosco нет — нет и здесь. */
export const ТЁМНАЯ = {
  ground: '#000000',
  surface: '#111111',
  sunk: '#1a1a1a',
  ink: '#FFFFFF',
  neutral: 'rgba(255,255,255,.80)',
  muted: 'rgba(255,255,255,.50)',
  hair: 'rgba(255,255,255,.06)',
  hairStrong: 'rgba(255,255,255,.10)',
  accent: '#3B82F6',
  ok: '#10B981',
  no: '#EF4444',
  wait: '#F59E0B',
  human: 'rgba(255,255,255,.60)',
};

const переменные = набор =>
  Object.entries(набор)
    .map(([имя, значение]) => `--${имя}:${значение};`)
    .join('');

/**
 * Блок оформления. Помимо переменных сюда вынесены три вещи из их globals.css,
 * без которых страница выглядит чужой: сглаживание шрифта, правила заголовков
 * и полоса прокрутки.
 */
export const темы = () => `
  :root{
    color-scheme:dark;
    ${переменные(ТЁМНАЯ)}
    --сайдбар:${РАЗМЕРЫ.сайдбар};--свёрнутый:${РАЗМЕРЫ.свёрнутый};
    --панель:${РАЗМЕРЫ.панель};--радиус:${РАЗМЕРЫ.радиус};
    --радиусПункта:${РАЗМЕРЫ.радиусПункта};
  }

  /* globals.css: -webkit-font-smoothing: antialiased */
  body{-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;}

  /* globals.css: h1..h6 — вес 600, разрядка -0.01em */
  h1,h2,h3,h4,h5,h6{font-weight:600; letter-spacing:-0.01em; color:var(--ink);}

  /* globals.css: полоса прокрутки 6px, бегунок белый 20%, при наведении синий */
  ::-webkit-scrollbar{width:6px; height:6px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2); border-radius:10px;}
  ::-webkit-scrollbar-thumb:hover{background:rgba(59,130,246,.5);}
`;
