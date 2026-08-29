/*
  Оформление пульта. ВСЕ значения ниже выписаны из ЖИВОГО кабинета Mosco —
  рабочее дерево `~/projectx-app` (репозиторий Mosco-corp/console-next, ветка
  redesign-mosco), файлы `app/globals.css` и `tailwind.config.ts`, прочитанные
  напрямую 29 августа 2026. Ничего не подобрано на глаз.

  ЧТО БЫЛО НЕ ТАК ДО ЭТОЙ ПРАВКИ. Прошлая версия файла честно писала, что
  читала Mosco «через агента Railway» из репозитория Mosco-corp/web. Тот
  репозиторий — СТАРЫЙ. Кабинет с тех пор переехал на макет Figma «Mosco -
  Application», и разошлось всё, что видно глазом:

    было (старый репозиторий)        стало (живой кабинет)
    --background  #000000            #171717
    --surface     #111111            #212121
    --accent      #3B82F6 синий      #08A2FF голубой из макета
    радиус        12px на всё        10 / 14 / 20 / 24 по назначению
    шрифт         Plus Jakarta       DM Sans
    сайдбар       175px              208px, свёрнутый рельс 52px

  Поэтому пульт и не выглядел как Mosco: цвета брались из продукта, которого
  уже нет. Класс ошибки — `single-repo-assumed-canonical`: проверять надо было
  ВСЕ копии кода, а не ту, до которой дотянулись.

  ЧТО ОТКУДА, построчно (адрес в живом кабинете → имя здесь):

    globals.css `.dark` (строки 322-395):
      --background        #171717                → ground
      --surface           #212121                → surface
      --surface-secondary #2a2a2a                → sunk
      --surface-tertiary  #333333                → raised
      --surface-header    #303030                → thead
      --text-header       #b8b8b8                → theadInk
      --text-primary      #ffffff                → ink
      --text-secondary    #d6d6d6                → neutral
      --text-tertiary     #bbbbbb                → dim
      --text-muted        #999999                → muted
      --border-light      rgba(255,255,255,.05)  → hairLight
      --border-default    rgba(255,255,255,.14)  → hair
      --border-strong     rgba(255,255,255,.22)  → hairStrong
      --accent            8 162 255              → accent
      --accent-dark       0 118 191              → accentDark
      --shadow-sm/md/lg                          → теньМалая/Средняя/Большая

    globals.css `:root` (строки 54-57) — статусные цвета, тёмная тема их
    наследует, своих не объявляет:
      --success  #10B981 → ok
      --warning  #F59E0B → wait
      --error    #EF4444 → no

    globals.css `.dashboard-font` (строки 947-975) — шкала кабинета:
      --r-element 10px, --r-inner 14px, --r-card 20px, --r-container 24px
      шрифт DM Sans, --lh-ui 1.3

    tailwind.config.ts `spacing` (237-249) и `height` (275-290) — шаг отступов
    и высоты органов управления. Пульт пользуется теми же именами, чтобы при
    сверке было видно, откуда что взято.

  СВОЕГО в оформлении осталось ровно одно: моноширинный шрифт для чисел. В их
  наборе его нет, а колонки цифр без него плывут. Помечено, а не выдано за чужое.
*/

/** Размеры оболочки. Из lib/store/sidebarPrefsStore.ts и tailwind.config.ts. */
export const РАЗМЕРЫ = {
  сайдбар: '208px',     // SIDEBAR_DEFAULT_WIDTH = 208
  свёрнутый: '52px',    // SIDEBAR_RAIL_WIDTH = 52
  панель: '44px',       // DashboardPageHeader: min-h-[44px]
};

/** Шаг отступов кабинета. tailwind.config.ts → theme.extend.spacing. */
export const ШАГ = {
  hair: '2px',
  icon: '4px',
  tight: '8px',
  base: '10px',
  inset: '12px',
  card: '16px',
  roomy: '20px',
  section: '24px',
  page: '32px',
};

/** Радиусы кабинета. globals.css → .dashboard-font. */
export const РАДИУСЫ = {
  element: '10px',    // --r-element: 0.625rem
  inner: '14px',      // --r-inner: 0.875rem — кнопки, поля, строки меню
  card: '20px',       // --r-card: 1.25rem — карточки, плашки сайдбара и шапки
  container: '24px',  // --r-container: 1.5rem — крупные панели
  pill: '9999px',
};

/** Высоты органов управления. tailwind.config.ts → theme.extend.height. */
export const ВЫСОТЫ = {
  chip: '28px',
  control: '32px',    // строка меню сайдбара (SIDEBAR_ROW: h-control)
  cta: '36px',
  form: '40px',
  touch: '44px',
};

/**
 * Шрифты. globals.css: `.dashboard-font { font-family: var(--font-dm-sans) }`
 * — DM Sans по макету Figma «Mosco - Application», владелец 2026-07-27:
 * применять системно, в обеих темах.
 */
export const ШРИФТЫ = {
  подключение:
    'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700' +
    '&family=IBM+Plex+Mono:wght@400;500&display=swap',
  заголовки: '"DM Sans", system-ui, sans-serif',
  текст: '"DM Sans", system-ui, sans-serif',
  /* наше: моноширинного в их наборе нет, а числа в таблицах без него плывут */
  моно: '"IBM Plex Mono", ui-monospace, monospace',
};

/**
 * Единственная тема — тёмная.
 *
 * У кабинета Mosco есть и светлая (globals.css, `html:not(.dark)
 * .dashboard-font`), но по умолчанию он открывается тёмным, и владелец узнаёт
 * продукт именно таким. Светлую сюда не тянем: половина переноса выглядела бы
 * готовой и не была бы ею.
 */
export const ТЁМНАЯ = {
  ground: '#171717',
  surface: '#212121',
  sunk: '#2a2a2a',
  raised: '#333333',
  thead: '#303030',
  theadInk: '#b8b8b8',
  ink: '#ffffff',
  neutral: '#d6d6d6',
  dim: '#bbbbbb',
  muted: '#999999',
  hairLight: 'rgba(255,255,255,.05)',
  hair: 'rgba(255,255,255,.14)',
  hairStrong: 'rgba(255,255,255,.22)',
  accent: '#08A2FF',
  accentDark: '#0076BF',
  accentSoft: 'rgba(8,162,255,.15)',   /* заливка активного пункта: акцент 15% */
  ok: '#10B981',
  no: '#EF4444',
  wait: '#F59E0B',
  human: '#bbbbbb',
};

const переменные = набор =>
  Object.entries(набор)
    .map(([имя, значение]) => `--${имя}:${значение};`)
    .join('');

const сПрефиксом = (префикс, набор) =>
  Object.entries(набор)
    .map(([имя, значение]) => `--${префикс}-${имя}:${значение};`)
    .join('');

/**
 * Блок оформления. Помимо переменных сюда вынесено то, без чего страница
 * выглядит чужой: сглаживание шрифта, межстрочный кабинета, правила
 * заголовков и полоса прокрутки.
 */
export const темы = () => `
  :root{
    color-scheme:dark;
    ${переменные(ТЁМНАЯ)}
    ${сПрефиксом('шаг', ШАГ)}
    ${сПрефиксом('r', РАДИУСЫ)}
    ${сПрефиксом('h', ВЫСОТЫ)}
    --сайдбар:${РАЗМЕРЫ.сайдбар};
    --свёрнутый:${РАЗМЕРЫ.свёрнутый};
    --панель:${РАЗМЕРЫ.панель};
    /* globals.css .dashboard-font: --lh-ui: 1.3 — межстрочный из макета */
    --lh:1.3;
    --теньМалая:0 1px 2px rgba(0,0,0,.12);
    --теньСредняя:0 2px 6px rgba(0,0,0,.16);
    --теньБольшая:0 4px 12px rgba(0,0,0,.20);
  }

  /* globals.css: -webkit-font-smoothing: antialiased */
  body{-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;}

  /* globals.css: h1..h6 — вес 600, разрядка -0.01em */
  h1,h2,h3,h4,h5,h6{font-weight:600; letter-spacing:-0.01em; color:var(--ink);}

  /* globals.css: полоса прокрутки 6px, бегунок белый 20%, при наведении акцент */
  ::-webkit-scrollbar{width:6px; height:6px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2); border-radius:10px;}
  ::-webkit-scrollbar-thumb:hover{background:rgba(8,162,255,.5);}
`;
