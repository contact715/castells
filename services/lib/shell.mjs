/*
  Оболочка пульта: сайдбар слева, полоса рабочей области сверху, экран под ней.

  ОТКУДА УСТРОЙСТВО. Из живого кабинета Mosco — рабочее дерево `~/projectx-app`
  (Mosco-corp/console-next, ветка redesign-mosco), прочитанное напрямую
  29 августа 2026. Адреса, по которым сверялась каждая величина:

    app/(dashboard)/layout.tsx            — рама кабинета
    components/layout/sidebar/Sidebar.tsx — плашка сайдбара, порядок частей
    components/layout/sidebar/parts/SidebarNavGroup.tsx     — группа и её дети
    components/layout/sidebar/parts/SidebarAccordionItem.tsx — строка меню
    components/layout/sidebar/parts/SidebarHeader.tsx        — шапка сайдбара
    components/layout/DashboardPageHeader.tsx — полоса рабочей области и островок
    lib/styles.ts                         — SIDEBAR_ROW, SIDEBAR_GROUP_LABEL
    lib/store/sidebarPrefsStore.ts        — ширины 208 / 52

  ЧТО БЫЛО НЕ ТАК ДО ЭТОЙ ПРАВКИ. Прошлая версия писала честно: «прочитать
  консоль из рабочего окружения не удалось», и устройство было восстановлено
  ПО ОПИСАНИЮ. Отсюда четыре расхождения, каждое видно глазом:

    было (по описанию)                стало (из кода)
    сайдбар — чёрный блок вплотную    плашка: фон #212121, рамка, радиус 20px
    панели стыкуются без зазора       рама 12px по краям, зазор 8px
    активный пункт — белая подложка   акцент #08A2FF 15% + текст акцентом
    заголовок группы — КАПС .15em     11px обычным регистром, без разрядки
    строка меню 36px, значок 20px     32px, значок 16px

  Главное здесь не цвет, а СЛОЙ: у Mosco плашка — это сайдбар и шапка, а
  рабочая область под ними ПЛОСКАЯ, прямо на холсте. В layout.tsx это назвали
  «shell inversion»: «the panel treatment moved to the sidebar; the content
  area is now a flat canvas where the interface lives». Пульт делал наоборот —
  панель была у рабочей области, а сайдбар сливался с фоном.

  РАЗДЕЛЕНИЕ ОБЯЗАННОСТЕЙ. Здесь только оболочка и переходы между экранами.
  Что показывать внутри — дело dashboard.mjs. Иначе через месяц оболочка
  начнёт знать про доступы и отчёты, и её нельзя будет переодеть, не задев
  данные. Всё оформление живёт в lib/theme.mjs одним набором переменных.

  ПЕРЕХОДЫ ЧЕРЕЗ РЕШЁТКУ (#/…), а не через адреса сервера. Причина простая:
  у пульта два потребителя — сервер на Railway и одиночный файл, который
  открывают локально. Переходы на решётке работают в обоих случаях
  одинаково, серверные маршруты — только в первом.
*/

import { темы, ШРИФТЫ } from './theme.mjs';

/** Экранирование: внутрь попадают названия компаний, а не проверенный HTML. */
export const экр = значение =>
  String(значение ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/*
  Значки. Рисуем сами, простыми линиями, и красим через currentColor — тогда
  они работают в свёрнутом сайдбаре без второго набора.

  Взять значки Mosco нельзя: у них lucide-react, это библиотека компонентов, а
  не файлы. Поэтому здесь НАШИ значки в их размере и их толщине линии (16px,
  stroke 1.5 — SidebarAccordionItem.tsx: `<item.icon className="w-4 h-4" />`).
  Это помечено, а не выдано за чужое.
*/
const зн = путь =>
  `<svg class="navlink__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" ` +
  `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${путь}</svg>`;

/* Значок переключателя режимов: у них он 18px (w-[18px] h-[18px]) против
   16px у строк меню — ряд режимов стоит выше по иерархии, чем пункт. */
const зн18 = путь =>
  `<svg class="mode__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" ` +
  `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${путь}</svg>`;

export const ЗНАЧКИ = {
  сводка: зн('<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>'),
  доступы: зн('<circle cx="5.5" cy="8" r="2.5"/><path d="M8 8h6M12 8v2.5"/>'),
  каталог: зн('<path d="M2 4h12M2 8h12M2 12h8"/>'),
  проект: зн('<path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.2l1.2 1.6h5.6A1.5 1.5 0 0 1 14 6.1v5.4A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5z"/>'),
  настройки: зн('<circle cx="8" cy="8" r="2"/><path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4"/>'),
};

/** Значки двух режимов сайдбара. */
export const ЗНАЧКИ_РЕЖИМОВ = {
  меню: зн18('<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>'),
  проекты: зн18('<path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.2l1.2 1.6h5.6A1.5 1.5 0 0 1 14 6.1v5.4A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5z"/>'),
};

export const СТИЛИ = `
  ${темы()}

  *{box-sizing:border-box;}
  body{
    background:var(--ground); color:var(--ink);
    font-family:${ШРИФТЫ.текст}; font-size:14px; line-height:var(--lh); margin:0;
  }
  h1,h2,h3,h4{font-family:${ШРИФТЫ.заголовки}; text-wrap:balance; margin:0;}
  h1{font-size:20px; font-weight:700; letter-spacing:-0.01em;}   /* text-xl font-bold */
  h2{font-size:17px; font-weight:600;}
  /* Заголовок блока — тот же «эйбрау», что у групп меню: 11px, обычный
     регистр, без разрядки (lib/styles.ts, SIDEBAR_GROUP_LABEL). Капс с
     разрядкой был приёмом «корпоративной панели» и перекрикивал содержимое. */
  h3{font-size:11px; font-weight:500; color:var(--muted); letter-spacing:normal;}
  h4{font-size:11px; font-weight:500; color:var(--muted); margin-bottom:var(--шаг-tight);}
  code,.mono{font-family:${ШРИФТЫ.моно}; font-size:.86em;}
  a{color:var(--accent);}
  .muted{color:var(--muted);}
  /* lib/styles.ts FOCUS_RING: кольцо акцента 60% с отбивкой от поверхности */
  :focus-visible{
    outline:none;
    box-shadow:0 0 0 2px var(--surface), 0 0 0 4px rgba(8,162,255,.6);
  }

  /* ══════════════════════════════════════════════════════════════════════
     РАМА КАБИНЕТА — app/(dashboard)/layout.tsx:

       <div class="flex flex-col h-[100dvh] p-base lg:p-inset gap-base lg:gap-inset">
         <div class="flex-1 flex min-h-0 gap-icon lg:gap-tight"> сайдбар + main

     То есть: 12px по краям экрана и 8px между сайдбаром и рабочей областью.
     Именно эти зазоры и делают из сайдбара плашку — без них он сливается с
     холстом, и весь приём пропадает.
     ══════════════════════════════════════════════════════════════════════ */
  .shell{
    height:100dvh; padding:var(--шаг-inset); display:flex; flex-direction:column;
    gap:var(--шаг-inset); overflow:hidden;
  }
  .shell__row{flex:1; min-height:0; display:flex; gap:var(--шаг-tight);}

  /* ── САЙДБАР ─────────────────────────────────────────────────────────
     Sidebar.tsx: <div class="sidebar-shell flex flex-col h-full overflow-hidden
     rounded-card bg-[var(--surface)] border border-[color:var(--border-default)]">
     Ширина 208px (SIDEBAR_DEFAULT_WIDTH), свёрнутая полоса 52px. */
  .side{
    width:var(--сайдбар); flex:none;
    display:flex; flex-direction:column; overflow:hidden;
    background:var(--surface);
    border:1px solid var(--hair);
    border-radius:var(--r-card);
    transition:width .3s;                 /* duration-300 у них на <aside> */
  }

  /* Шапка сайдбара: SidebarHeader.tsx — px-inset py-inset, логотип 32px и
     переключатель рабочего пространства рядом. У Mosco в шапке сайдбара
     стоит именно выбор места работы, поэтому выбор проекта живёт здесь же,
     а не в верхней полосе. */
  .side__head{
    flex:none; padding:var(--шаг-inset);
    display:flex; align-items:center; gap:var(--шаг-base);
  }
  .side__mark{
    width:32px; height:32px; flex:none; border-radius:var(--r-pill);
    background:var(--accent); color:#fff;
    display:flex; align-items:center; justify-content:center;
    font:700 13px/1 ${ШРИФТЫ.заголовки};
  }
  .side__wsp{min-width:0; flex:1;}
  .side__wsp select{
    width:100%; max-width:100%;
    font-family:${ШРИФТЫ.текст}; font-size:13px; font-weight:500;
    color:var(--ink); background:transparent;
    border:0; border-radius:var(--r-element);
    padding:6px 22px 6px 6px; cursor:pointer; appearance:none;
    background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);
    background-position:calc(100% - 10px) calc(50% + 1px),calc(100% - 6px) calc(50% + 1px);
    background-size:4px 4px,4px 4px; background-repeat:no-repeat;
    text-overflow:ellipsis;
  }
  .side__wsp select:hover{background-color:var(--sunk);}
  .side__wsp select option{background:var(--surface); color:var(--ink);}

  /* ── ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМОВ ──────────────────────────────────────────
     SidebarModeSwitcher.tsx. У них три режима (меню, входящие, ассистент),
     у нас два: МЕНЮ и ПРОЕКТЫ. Ряд стоит сразу под шапкой сайдбара, до
     списка — у них там же.

     Оформление их, до значения: ряд «px-base py-base flex items-center
     gap-icon«; кнопка »h-9 rounded-pill«, с подписью — »gap-icon px-inset
     flex-1«; активная — »bg-[--surface-tertiary] text-[--text-primary]
     ring-1 ring-[--border-default]«; спящая — »text-[--text-muted]« с
     наведением на вторичную поверхность. Значок 18px, а не 16px.

     Почему обе кнопки с подписями. У них подпись показывается только
     активному режиму и только если рельс шире 280px — потому что режимов
     три и они не влезают. У нас их два, места хватает обоим, а два
     безымянных значка пришлось бы разгадывать. */
  .modes{
    flex:none; display:flex; align-items:center; gap:var(--шаг-icon);
    padding:var(--шаг-base);
  }
  .mode{
    flex:1; min-width:0;
    display:flex; align-items:center; justify-content:center; gap:var(--шаг-icon);
    height:36px; padding:0 var(--шаг-inset);
    border:1px solid transparent; border-radius:var(--r-pill);
    background:none; cursor:pointer;
    color:var(--muted); font:500 13px/1 ${ШРИФТЫ.текст};
    transition:background-color .2s, color .2s, border-color .2s;
  }
  .mode:hover{background:var(--sunk); color:var(--ink);}
  .mode[aria-selected="true"]{
    background:var(--raised); color:var(--ink);
    border-color:var(--hair); box-shadow:var(--теньМалая);
  }
  /* Значок ПРЯЧЕТСЯ, пока рельс развёрнут, — и это осознанное отступление.

     Замер на нашей ширине: рельс 208px, кнопка 91px, внутри отступы 24px,
     значок 18px и промежуток 4px. Подписи остаётся 43px, а «Проекты» просит
     57px — слово обрезалось на четверть.

     У них выбор ровно обратный: остаётся значок, а подпись показывается
     только активному режиму и только если рельс шире 280px. Так можно, когда
     режимов три и каждый со своим узнаваемым значком: почта, орб, сетка.
     У нас их два, оба нарисованы одной линией, и два безымянных квадратика
     пришлось бы разгадывать. Слово читается сразу.

     На свёрнутом рельсе всё наоборот: подписи нет места, и значок
     возвращается — там он единственный опознавательный знак. */
  .mode__icon{display:none;}
  .mode__label{overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  /* Список показывается тот, чей режим выбран. Второй не «прячется
     прозрачностью», а не рисуется вовсе: скрытый, но существующий список
     ловил бы клавиатуру. */
  :root[data-mode="menu"] .side__nav[data-mode="projects"],
  :root[data-mode="projects"] .side__nav[data-mode="menu"]{display:none;}

  /* Sidebar.tsx: <nav class="flex-1 px-base py-icon space-y-0 overflow-y-auto
     no-scrollbar min-h-0"> */
  .side__nav{
    flex:1; min-height:0; overflow-y:auto;
    padding:var(--шаг-icon) var(--шаг-base);
    display:flex; flex-direction:column; gap:var(--шаг-hair);
    scrollbar-width:none;
  }
  .side__nav::-webkit-scrollbar{display:none;}

  /* ── СТРОКА МЕНЮ ────────────────────────────────────────────────────
     lib/styles.ts, SIDEBAR_ROW — один канон на все три компонента, которые
     её рисуют. Дословно:
       flex items-center gap-base px-base h-control rounded-inner text-sm
     то есть gap 10px, отступ 10px, высота 32px, радиус 14px, кегль 14px.
     До этой правки было 36px/8px/20px значок — три расхождения в одной строке. */
  .navlink{
    display:flex; align-items:center; gap:var(--шаг-base);
    padding:0 var(--шаг-base); height:var(--h-control);
    border-radius:var(--r-inner);
    color:var(--ink); text-decoration:none;
    font-size:14px; font-weight:400;
    transition:background-color .2s, color .2s;
    min-width:0;
  }
  .navlink:hover{background:var(--sunk); color:var(--ink);}
  /* Активный пункт — вторичная кнопка из макета: заливка акцентом 15%, текст
     акцентом (SidebarAccordionItem.tsx). Белая подложка, стоявшая здесь
     раньше, не отличала активный пункт ничем, кроме яркости фона. */
  .navlink[aria-current="page"]{
    background:var(--accentSoft); color:var(--accent); font-weight:500;
  }
  .navlink > span:first-child{
    display:flex; align-items:center; gap:var(--шаг-base); min-width:0; flex:1;
    overflow:hidden;
  }
  .navlink__label{overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  .navlink__icon{width:16px; height:16px; flex:none;}   /* w-4 h-4 */
  .navlink__tag{
    font-family:${ШРИФТЫ.моно}; font-size:11px;
    color:var(--muted); font-variant-numeric:tabular-nums; flex:none;
  }
  .navlink__dot{width:6px; height:6px; border-radius:var(--r-pill); flex:none;}

  /* Заголовок раздела — САМЫЙ ТИХИЙ элемент рейла (lib/styles.ts прямо так и
     говорит). SIDEBAR_GROUP_LABEL: normal-case tracking-normal font-medium
     text-[11px], цвет --text-muted; обёртка pt-base pb-icon px-base. */
  .side__group{
    padding:var(--шаг-base) var(--шаг-base) var(--шаг-icon);
    font-size:11px; font-weight:500; color:var(--muted);
    text-transform:none; letter-spacing:normal;
    font-family:${ШРИФТЫ.текст};
  }

  /* Раскрывающаяся группа: SidebarNavGroup.tsx — та же строка, что у пункта,
     плюс стрелка справа. Стрелка появляется по наведению (у них
     «opacity-0 group-hover/row:opacity-100»), поэтому в покое ряд чистый. */
  .grp{display:flex; flex-direction:column; gap:var(--шаг-hair);}
  .grp__head{
    display:flex; align-items:center; gap:var(--шаг-base); width:100%;
    padding:0 var(--шаг-base); height:var(--h-control);
    border:0; border-radius:var(--r-inner); background:none; cursor:pointer;
    color:var(--ink); font:400 14px/var(--lh) ${ШРИФТЫ.текст}; text-align:left;
    transition:background-color .2s, color .2s;
  }
  .grp__head:hover{background:var(--sunk);}
  .grp__label{flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  .grp__caret{
    width:16px; height:16px; flex:none; color:var(--muted);
    opacity:0; transition:transform .2s, opacity .2s;
  }
  .grp:hover .grp__caret,
  .grp__head:focus-visible .grp__caret,
  .grp[data-open="1"] .grp__caret{opacity:1;}
  .grp[data-open="0"] .grp__caret{transform:rotate(-90deg);}
  .grp[data-open="0"] .grp__kids{display:none;}
  /* SidebarNavGroup.tsx: <div class="pl-7 pr-base py-tight space-y-0.5"> */
  .grp__kids{
    display:flex; flex-direction:column; gap:var(--шаг-hair);
    padding:var(--шаг-tight) var(--шаг-base) var(--шаг-tight) 28px;
  }
  /* Дети тише родителя: text-secondary, при наведении — text-primary. */
  .grp__kids .navlink{color:var(--neutral);}
  .grp__kids .navlink:hover{color:var(--ink);}
  .grp__kids .navlink[aria-current="page"]{background:var(--accentSoft); color:var(--accent);}

  /* Низ сайдбара. Sidebar.tsx: px-base pb-base pt-icon shrink-0
     border-t border-[color:var(--border-default)] */
  .side__bottom{
    margin-top:auto; flex:none;
    padding:var(--шаг-icon) var(--шаг-base) var(--шаг-base);
    border-top:1px solid var(--hair);
    display:flex; flex-direction:column; gap:var(--шаг-hair);
  }
  .side__bottom .navlink{color:var(--muted);}
  .side__bottom .navlink:hover{color:var(--ink);}
  .rail{
    display:flex; align-items:center; gap:var(--шаг-base); width:100%;
    padding:0 var(--шаг-base); height:var(--h-control);
    border:0; border-radius:var(--r-inner); background:none; cursor:pointer;
    color:var(--muted); font:400 14px/var(--lh) ${ШРИФТЫ.текст};
    transition:background-color .2s, color .2s;
  }
  .rail:hover{background:var(--sunk); color:var(--ink);}
  .rail svg{width:16px; height:16px; flex:none;}

  .side__foot{
    flex:none; padding:0 var(--шаг-base) var(--шаг-base);
    font-size:11px; color:var(--muted);
  }
  .side__foot code{font-size:10.5px;}

  /* Свёрнутая полоса — 52px (SIDEBAR_RAIL_WIDTH). Sidebar.tsx в этом режиме
     ставит строки в justify-center p-tight и прячет подписи. */
  :root[data-rail="1"] .side{width:var(--свёрнутый);}
  :root[data-rail="1"] .navlink__label,
  :root[data-rail="1"] .navlink__tag,
  :root[data-rail="1"] .grp__label,
  :root[data-rail="1"] .grp__caret,
  :root[data-rail="1"] .side__wsp,
  :root[data-rail="1"] .side__foot,
  :root[data-rail="1"] .rail span{display:none;}
  :root[data-rail="1"] .navlink,
  :root[data-rail="1"] .grp__head,
  :root[data-rail="1"] .rail{justify-content:center; padding:0; width:36px; margin:0 auto;}
  :root[data-rail="1"] .navlink > span:first-child{justify-content:center; flex:none; gap:0;}
  :root[data-rail="1"] .grp__kids{padding-left:0; padding-right:0;}
  :root[data-rail="1"] .side__head{justify-content:center; padding:var(--шаг-base) var(--шаг-tight);}
  /* Свёрнутый переключатель — их вариант collapsed: колонка кнопок 32px,
     подписи прячутся, активный красится акцентом 15% (а не поверхностью:
     на рельсе нет рамки, которая отделяла бы выбранное). */
  :root[data-rail="1"] .modes{flex-direction:column; padding:var(--шаг-tight) var(--шаг-icon);}
  :root[data-rail="1"] .mode{
    flex:none; width:32px; height:var(--h-control); padding:0; border-color:transparent;
  }
  :root[data-rail="1"] .mode__icon{display:block; width:18px; height:18px; flex:none;}
  :root[data-rail="1"] .mode__label{display:none;}
  :root[data-rail="1"] .mode[aria-selected="true"]{
    background:var(--accentSoft); color:var(--accent); box-shadow:none;
  }
  /* Вместо подписи раздела — тонкая черта: у них
     «my-base mx-inset h-px bg-[color:var(--surface-secondary)]» */
  :root[data-rail="1"] .side__group{
    font-size:0; padding:0; margin:var(--шаг-base) var(--шаг-inset);
    height:1px; background:var(--sunk);
  }

  /* ── РАБОЧАЯ ОБЛАСТЬ ────────────────────────────────────────────────
     layout.tsx: <main class="flex-1 min-w-0 overflow-hidden relative"> —
     ПЛОСКИЙ холст, без плашки и рамки. Плашка досталась сайдбару и шапке.  */
  .main{
    flex:1; min-width:0; display:flex; flex-direction:column;
    gap:var(--шаг-tight); overflow:hidden;
  }

  /* Полоса рабочей области. DashboardPageHeader.tsx:
       <div class="flex shrink-0 items-stretch gap-icon lg:gap-tight">
         <header class="relative flex flex-1 min-w-0 items-center gap-inset
                        rounded-card border bg-[color:var(--surface)]
                        min-h-[44px] px-tight py-icon">
     Радиус и поверхность у неё те же, что у сайдбара — «чтобы две панели
     читались как одна семья» (их комментарий). */
  .topbar{flex:none; display:flex; align-items:stretch; gap:var(--шаг-tight);}
  .top{
    flex:1; min-width:0; display:flex; align-items:center; gap:var(--шаг-inset);
    min-height:var(--панель); padding:var(--шаг-icon) var(--шаг-tight);
    background:var(--surface); border:1px solid var(--hair);
    border-radius:var(--r-card);
  }
  /* Имя страницы: у них «text-xl font-bold tracking-tight truncate». Это
     указатель места, а не заголовок: свой h1 экран приносит сам. */
  .top__title{
    font:700 20px/1.2 ${ШРИФТЫ.заголовки}; letter-spacing:-.01em;
    padding-left:var(--шаг-icon);
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .top__right{margin-left:auto; display:flex; align-items:center; gap:var(--шаг-tight);}

  /* Островок справа. DashboardPageHeader.tsx: отдельный круг той же
     поверхности и рамки — «часть той же семьи, но отдельным кругом».
     h-11 px-icon rounded-pill border bg-[color:var(--surface)] */
  .top__island{
    flex:none; align-self:flex-start;
    display:flex; align-items:center; justify-content:center; gap:var(--шаг-tight);
    height:var(--панель); padding:0 var(--шаг-inset);
    border:1px solid var(--hair); border-radius:var(--r-pill);
    background:var(--surface);
  }
  .stamp{font-family:${ШРИФТЫ.моно}; font-size:11.5px; color:var(--muted);}

  /* Область прокрутки. layout.tsx: py-card lg:py-section, БОКОВЫХ ОТСТУПОВ
     НЕТ — «ширина должна быть такой же, как верхняя полоса» (владелец Mosco
     2026-08-01). Свои поля карточки задают сами. */
  .work{
    flex:1; min-height:0; overflow-y:auto; overflow-x:hidden;
    padding:var(--шаг-card) 0 64px;
  }
  .screen{max-width:1080px;}
  .screen[hidden]{display:none;}
  .screen__head{margin-bottom:var(--шаг-card);}
  .screen__head p{color:var(--neutral); margin:0; max-width:66ch;}

  /* ── Составные части экранов ────────────────────────────────────────
     Поверхности по правилу Mosco (globals.css, «правило поверхностей»):
     слоёв ровно три — холст --ground, поверхность --surface (карточки, с
     рамкой), вложенный блок --sunk ТОЛЬКО внутри поверхности. Радиусы из
     шкалы кабинета, а не 2px, как было. */
  .summary{
    display:flex; flex-wrap:wrap; gap:var(--шаг-section);
    padding:var(--шаг-card); margin-bottom:var(--шаг-roomy);
    background:var(--surface); border:1px solid var(--hair);
    border-radius:var(--r-card);
  }
  .summary div{display:flex; flex-direction:column;}
  .summary .lbl{font-size:11px; font-weight:500; color:var(--muted);}
  .summary .val{
    font-family:${ШРИФТЫ.заголовки}; font-size:24px; font-weight:700;
    font-variant-numeric:tabular-nums; letter-spacing:-.01em;
  }

  .tablewrap{
    overflow-x:auto; background:var(--surface);
    border:1px solid var(--hair); border-radius:var(--r-card);
  }
  table{border-collapse:collapse; width:100%; font-size:13.5px;}
  table.ask{width:100%;}
  /* Полоса заголовка таблицы: в тёмной теме она ЧУТЬ СВЕТЛЕЕ карточки —
     ступень вверх (globals.css: --surface-header #303030). */
  th{
    text-align:left; font-size:11px; font-weight:500; color:var(--theadInk);
    background:var(--thead); letter-spacing:normal;
    padding:9px var(--шаг-inset); white-space:nowrap;
  }
  th:first-child{border-top-left-radius:var(--r-card);}
  th:last-child{border-top-right-radius:var(--r-card);}
  td{padding:10px var(--шаг-inset); border-top:1px solid var(--hairLight); vertical-align:top;}

  .projbody{display:flex; flex-direction:column;}
  .project__head{
    display:flex; flex-wrap:wrap; gap:var(--шаг-roomy);
    justify-content:space-between; align-items:flex-start;
    padding:var(--шаг-card); background:var(--surface);
    border:1px solid var(--hair); border-radius:var(--r-card);
  }
  .project__meta{margin:4px 0 0; display:flex; gap:var(--шаг-inset); align-items:baseline; font-size:13px; color:var(--muted);}
  .counters{display:flex; gap:var(--шаг-section); margin:0;}
  .counters div{display:flex; flex-direction:column;}
  .counters dt{font-size:11px; font-weight:500; color:var(--muted);}
  .counters dd{margin:0; font-family:${ШРИФТЫ.заголовки}; font-weight:700; font-size:22px; font-variant-numeric:tabular-nums;}
  .counters dd span{font-weight:400; font-size:14px; color:var(--muted);}
  .project__infra{display:flex; flex-wrap:wrap; gap:var(--шаг-section); font-size:13px; color:var(--muted); margin:var(--шаг-card) 0 0;}
  .project__infra b{color:var(--ink); font-weight:500;}
  .alarm{
    background:color-mix(in srgb, var(--no) 12%, transparent);
    border:1px solid color-mix(in srgb, var(--no) 35%, transparent);
    border-radius:var(--r-inner); padding:var(--шаг-base) var(--шаг-inset);
    margin:var(--шаг-card) 0 0; font-size:14px;
  }

  .block{margin-top:var(--шаг-section);}
  .block h3 .sub{font-weight:400; margin-left:var(--шаг-base); color:var(--muted);}

  .stages{
    list-style:none; margin:var(--шаг-inset) 0 0; padding:0;
    display:flex; flex-direction:column;
    background:var(--surface); border:1px solid var(--hair);
    border-radius:var(--r-card); overflow:hidden;
  }
  .stage{
    padding:var(--шаг-inset); display:grid; grid-template-columns:26px 1fr auto;
    gap:var(--шаг-base); align-items:baseline;
    border-left:3px solid transparent; border-top:1px solid var(--hairLight);
  }
  .stage:first-child{border-top:0;}
  .stage__n{font-family:${ШРИФТЫ.моно}; color:var(--muted); font-size:13px;}
  .stage__name{font-weight:500;}
  .stage__state{font-size:11px; font-weight:500;}
  .stage__why{grid-column:2 / -1; margin:2px 0 0; font-size:13px; color:var(--muted);}
  .stage--ok{border-left-color:var(--ok);} .stage--ok .stage__state{color:var(--ok);}
  .stage--ext{border-left-color:var(--accent);} .stage--ext .stage__state{color:var(--accent);}
  .stage--wait{border-left-color:var(--no);} .stage--wait .stage__state{color:var(--no);}
  .stage--human{border-left-color:var(--human);} .stage--human .stage__state{color:var(--human);}

  .accgroups{display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:var(--шаг-card);}
  .accgroup{
    padding:var(--шаг-inset); background:var(--surface);
    border:1px solid var(--hair); border-radius:var(--r-card);
  }
  .chips{list-style:none; margin:0; padding:0; display:flex; flex-wrap:wrap; gap:6px;}
  /* Чип по шкале кабинета: высота 28px (h-chip), радиус 10px (r-element).
     Раньше стоял radius 2px — в макете Mosco таких углов нет вообще. */
  .chip{
    display:inline-flex; align-items:center; gap:6px; font-size:12.5px;
    height:var(--h-chip); padding:0 var(--шаг-base);
    border:1px solid var(--hair); border-radius:var(--r-element);
    background:var(--sunk); cursor:help;
  }
  .chip__dot{width:7px; height:7px; border-radius:var(--r-pill); flex:none;}
  .chip--on{color:var(--ink);} .chip--on .chip__dot{background:var(--ok);}
  .chip--off{color:var(--muted);} .chip--off .chip__dot{background:var(--no); opacity:.65;}

  .svcs{list-style:none; margin:var(--шаг-inset) 0 0; padding:0; display:flex; flex-direction:column; gap:var(--шаг-icon);}
  .svc{
    display:grid; grid-template-columns:1fr auto auto; gap:var(--шаг-card);
    align-items:baseline; padding:var(--шаг-base) var(--шаг-inset);
    background:var(--surface); border:1px solid var(--hair);
    border-left:3px solid var(--hair); border-radius:var(--r-inner); font-size:13.5px;
  }
  .svc--run{border-left-color:var(--ok);}
  .svc--done{border-left-color:var(--human);}
  .svc--talk{border-left-color:var(--wait);}
  .svc__name{font-weight:500;}
  .svc__state{font-size:11px; font-weight:500; color:var(--muted);}
  .svc__note{color:var(--muted); font-size:12.5px;}
  .noexp{
    font-style:normal; font-size:10px; font-weight:500; color:var(--no);
    border:1px solid currentColor; padding:1px 6px;
    border-radius:var(--r-element); margin-left:var(--шаг-tight);
  }

  .catgroup{margin-top:var(--шаг-card);}
  .cat{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:var(--шаг-base);}
  .catitem{
    background:var(--surface); border:1px solid var(--hair);
    border-radius:var(--r-inner); padding:var(--шаг-inset);
    display:flex; flex-direction:column; gap:3px; font-size:13px;
  }
  .catitem b{font-family:${ШРИФТЫ.заголовки}; font-weight:500;}
  .catitem span{color:var(--muted);}
  .catitem .src{font-size:11.5px; font-style:italic;}
  .catitem--noexp{border-style:dashed;}

  .reps{list-style:none; margin:var(--шаг-inset) 0 0; padding:0; display:flex; flex-direction:column; gap:var(--шаг-icon);}
  .rep{
    display:flex; flex-wrap:wrap; gap:var(--шаг-base); justify-content:space-between;
    padding:var(--шаг-base) var(--шаг-inset);
    background:var(--surface); border:1px solid var(--hair);
    border-left:3px solid var(--hair); border-radius:var(--r-inner); font-size:13.5px;
  }
  .rep--on{border-left-color:var(--ok);}
  .rep--off{border-left-color:var(--no);}
  .rep__name{font-weight:500;}
  .rep__name em{font-style:normal; font-weight:400; font-size:11px; color:var(--muted); margin-left:var(--шаг-tight);}
  .rep__note{color:var(--muted);}

  .verdict{
    margin:var(--шаг-inset) 0 0; font-size:14px;
    padding:var(--шаг-base) var(--шаг-inset); border-radius:var(--r-inner);
  }
  .verdict--ok{background:color-mix(in srgb, var(--ok) 12%, transparent); color:var(--ok);}
  .verdict--no{background:color-mix(in srgb, var(--no) 10%, transparent); color:var(--no);}

  /* Узкий экран. Сайдбар встаёт СВЕРХУ во всю ширину и остаётся плашкой, а
     меню — вертикальным списком.

     Первая попытка раскладывала меню в горизонтальный ряд (flex-wrap), и он
     разъезжался: у групп внутри свои колонки с детьми, они не переносятся, а
     пункты обрезались по правому краю плашки. Ряд из вложенных групп — это не
     «то же меню поуже», это другой компонент, которого у нас нет.

     У Mosco ниже lg сайдбар уезжает за край и открывается ящиком по кнопке.
     Ящика у пульта нет, и делать половину чужого поведения хуже, чем не делать:
     кнопка была бы, а поведение — наполовину. Поэтому здесь честный простой
     вариант, который не ломается. */
  @media (max-width:860px){
    .shell{
      height:auto; min-height:100dvh; overflow:visible;
      padding:var(--шаг-tight); gap:var(--шаг-tight);
    }
    .shell__row{flex-direction:column; gap:var(--шаг-tight);}
    .side{width:auto; align-self:stretch;}
    .side__nav{overflow:visible;}
    .main{overflow:visible;}
    .work{overflow:visible; padding:var(--шаг-inset) 0 var(--шаг-section);}
    .top__title{font-size:17px;}
    /* Свёрнутая полоса на узком экране смысла не имеет: места по горизонтали
       она не экономит, а меню превращает в столбик безымянных значков. */
    .rail{display:none;}
    :root[data-rail="1"] .side{width:auto;}
    :root[data-rail="1"] .navlink__label,
    :root[data-rail="1"] .grp__label,
    :root[data-rail="1"] .side__wsp{display:flex;}
    :root[data-rail="1"] .navlink,
    :root[data-rail="1"] .grp__head{
      justify-content:flex-start; width:auto; padding:0 var(--шаг-base);
    }
    :root[data-rail="1"] .side__group{
      font-size:11px; height:auto; background:none;
      padding:var(--шаг-base) var(--шаг-base) var(--шаг-icon); margin:0;
    }
  }
`;

/**
 * Переходы между экранами. Все экраны лежат в странице, показывается один.
 *
 * Отдельно обработано то, что обычно забывают: адрес в строке может
 * указывать на экран, которого больше нет (проект удалили из профилей).
 * Тогда открывается первый, а не пустая страница.
 */
export const СКРИПТ = `
(function () {
  var КЛЮЧ = 'castells-services-screen';

  function экраны() { return Array.prototype.slice.call(document.querySelectorAll('[data-screen]')); }
  /* Имя страницы живёт в ОДНОМ месте — верхней полосе (как у Mosco: полоса и
     есть указатель места, а экран приносит только содержимое). Раньше оно
     стояло и в полосе, и заголовком строкой ниже — один и тот же текст
     дважды подряд. */
  function shapkaSet(узел, текст) { узел.textContent = текст; document.title = текст + ' · Пульт Castells'; }
  function ссылки() { return Array.prototype.slice.call(document.querySelectorAll('.navlink')); }

  function показать(имя, запомнить) {
    var список = экраны();
    var нашёлся = список.some(function (э) { return э.dataset.screen === имя; });
    if (!нашёлся) { имя = список.length ? список[0].dataset.screen : null; }
    if (!имя) return;

    список.forEach(function (э) { э.hidden = э.dataset.screen !== имя; });
    ссылки().forEach(function (с) {
      var своя = с.getAttribute('href') === '#/' + имя;
      if (своя) { с.setAttribute('aria-current', 'page'); } else { с.removeAttribute('aria-current'); }
    });

    var выбор = document.getElementById('proj');
    if (выбор && имя.indexOf('p/') === 0) { выбор.value = имя.slice(2); }

    var шапка = document.getElementById('crumb');
    var текущий = список.filter(function (э) { return !э.hidden; })[0];
    if (шапка && текущий && текущий.dataset.title) {
      shapkaSet(шапка, текущий.dataset.title);
    } else if (шапка) {
      var активная = ссылки().filter(function (с) { return с.getAttribute('aria-current'); })[0];
      if (активная) { shapkaSet(шапка, активная.dataset.title || активная.textContent.trim()); }
    }

    /* Режим подстраивается под открытый экран. Вызов защищён проверкой:
       показать() работает и до того, как переключатель нашёлся в разметке. */
    if (typeof режим === 'function') {
      режим(имя.indexOf('p/') === 0 ? 'projects' : 'menu', true);
    }

    if (запомнить !== false) { try { localStorage.setItem(КЛЮЧ, имя); } catch (e) {} }
    return имя;
  }

  function изАдреса() {
    var h = location.hash || '';
    return h.indexOf('#/') === 0 ? h.slice(2) : null;
  }

  window.addEventListener('hashchange', function () { показать(изАдреса() || '', true); });

  var выбор = document.getElementById('proj');
  if (выбор) {
    выбор.addEventListener('change', function () { location.hash = '#/p/' + выбор.value; });
  }

  /*
    ДВА РЕЖИМА САЙДБАРА: меню и проекты (владелец 29 августа).

    Режим следует за содержимым: открыт экран проекта — показан список
    проектов, открыт общий экран — меню. Это поведение их сайдбара, где
    панель выбирается маршрутом (lib/navigation/sidebarPanelForRoute.ts), а
    не только кнопкой. Причина там описана прямо: у них календарь не
    переключался, потому что требовал И маршрута, И режима сразу.

    Ручной выбор при этом остаётся: нажатие переключает список и
    запоминается. Следующий переход по экранам снова подстроит режим под
    место — так список под рукой всегда тот, что нужен.
  */
  var КЛЮЧ_РЕЖИМА = 'castells-side-mode';
  function режим(имя, запомнить) {
    if (имя !== 'projects') { имя = 'menu'; }
    document.documentElement.setAttribute('data-mode', имя);
    Array.prototype.forEach.call(document.querySelectorAll('.mode'), function (к) {
      к.setAttribute('aria-selected', к.dataset.mode === имя ? 'true' : 'false');
    });
    if (запомнить !== false) { try { localStorage.setItem(КЛЮЧ_РЕЖИМА, имя); } catch (e) {} }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.mode'), function (к) {
    к.addEventListener('click', function () { режим(к.dataset.mode, true); });
  });

  /* Раскрывающиеся группы: состояние помнится, иначе при каждом переходе
     сайдбар схлопывался бы и ходить по нему стало бы неудобно. */
  Array.prototype.forEach.call(document.querySelectorAll('.grp'), function (гр) {
    var ключ = 'castells-grp-' + гр.dataset.group;
    try {
      var было = localStorage.getItem(ключ);
      if (было !== null) {
        гр.dataset.open = было;
        гр.querySelector('.grp__head').setAttribute('aria-expanded', было === '1' ? 'true' : 'false');
      }
    } catch (e) {}
    гр.querySelector('.grp__head').addEventListener('click', function () {
      var стало = гр.dataset.open === '1' ? '0' : '1';
      гр.dataset.open = стало;
      this.setAttribute('aria-expanded', стало === '1' ? 'true' : 'false');
      try { localStorage.setItem(ключ, стало); } catch (e) {}
    });
  });

  /* Свёрнутая полоса — 52px, как SIDEBAR_RAIL_WIDTH у Mosco. */
  var кнопкаПолосы = document.getElementById('rail');
  if (кнопкаПолосы) {
    var КЛЮЧ_ПОЛОСЫ = 'castells-rail';
    function полоса(вкл) {
      document.documentElement.setAttribute('data-rail', вкл ? '1' : '0');
      кнопкаПолосы.setAttribute('aria-label', вкл ? 'Развернуть меню' : 'Свернуть меню');
      try { localStorage.setItem(КЛЮЧ_ПОЛОСЫ, вкл ? '1' : '0'); } catch (e) {}
    }
    try { if (localStorage.getItem(КЛЮЧ_ПОЛОСЫ) === '1') полоса(true); } catch (e) {}
    кнопкаПолосы.addEventListener('click', function () {
      полоса(document.documentElement.getAttribute('data-rail') !== '1');
    });
  }

  try { режим(localStorage.getItem(КЛЮЧ_РЕЖИМА) || 'menu', false); } catch (e) { режим('menu', false); }

  var начальный = изАдреса();
  if (!начальный) { try { начальный = localStorage.getItem(КЛЮЧ); } catch (e) {} }
  показать(начальный || '', false);
})();
`;

/**
 * Собирает страницу целиком.
 *
 * ПОРЯДОК ЧАСТЕЙ ВЗЯТ У НИХ. Логотип и выбор места работы — в ШАПКЕ САЙДБАРА
 * (SidebarHeader.tsx), а не в верхней полосе: у Mosco верхняя полоса
 * принадлежит СТРАНИЦЕ (её имя, её инструменты, её главное действие), а
 * сайдбар — рабочему пространству целиком. Выбор проекта — это выбор
 * пространства, поэтому он переехал влево.
 *
 * @param {object} части — { заголовок, меню, низМеню, выборПроектов, экраны, когда, подвал }
 */
export function оболочка({ заголовок, меню, проекты, низМеню, выборПроектов, экраны, когда, подвал }) {
  return `<title>${экр(заголовок)}</title>
<link rel="stylesheet" href="${ШРИФТЫ.подключение}">
<style>${СТИЛИ}</style>

<div class="shell">
  <div class="shell__row">
    <nav class="side" aria-label="Разделы">
      <div class="side__head">
        <span class="side__mark" aria-hidden="true">C</span>
        <div class="side__wsp">${выборПроектов}</div>
      </div>
      <div class="modes" role="tablist" aria-label="Режим меню">
        <button class="mode" type="button" role="tab" id="mode-menu"
                data-mode="menu" aria-selected="true" title="Меню">
          ${ЗНАЧКИ_РЕЖИМОВ.меню}<span class="mode__label">Меню</span>
        </button>
        <button class="mode" type="button" role="tab" id="mode-projects"
                data-mode="projects" aria-selected="false" title="Проекты">
          ${ЗНАЧКИ_РЕЖИМОВ.проекты}<span class="mode__label">Проекты</span>
        </button>
      </div>
      <div class="side__nav" data-mode="menu">${меню}</div>
      <div class="side__nav" data-mode="projects">${проекты}</div>
      <div class="side__bottom">
        ${низМеню || ''}
        <button class="rail" type="button" id="rail" aria-label="Свернуть меню">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
               stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2.5" width="12" height="11" rx="2"/><path d="M6.5 2.5v11"/>
          </svg>
          <span>Свернуть</span>
        </button>
      </div>
      <div class="side__foot">
        Собрано из профилей<br>в <code>services/clients</code>
      </div>
    </nav>

    <div class="main">
      <div class="topbar">
        <header class="top">
          <h1 class="top__title" id="crumb">Пульт</h1>
        </header>
        <div class="top__island">
          <span class="stamp">${экр(когда)}</span>
        </div>
      </div>
      <div class="work">
        ${экраны}
      </div>
    </div>
  </div>
</div>

<script>${СКРИПТ}</script>
${подвал || ''}`;
}

/** Пункт бокового меню. */
export const пункт = ({ адрес, имя, метка, точка, значок }) =>
  `<a class="navlink" href="#/${экр(адрес)}" data-title="${экр(имя)}" title="${экр(имя)}">
    <span>${значок || ''}${точка ? `<span class="navlink__dot" style="background:${точка}"></span>` : ''}<span class="navlink__label">${экр(имя)}</span></span>
    ${метка ? `<span class="navlink__tag">${экр(метка)}</span>` : ''}
  </a>`;

/**
 * Раскрывающаяся группа — SidebarNavGroup.tsx: заголовок кликабелен, дети
 * прячутся, стрелка проявляется по наведению. Состояние запоминается, иначе
 * при каждом переходе всё схлопывалось бы обратно.
 */
export const группа = ({ ключ, имя, значок, дети, открыта = true }) =>
  `<div class="grp" data-group="${экр(ключ)}" data-open="${открыта ? '1' : '0'}">
    <button class="grp__head" type="button" aria-expanded="${открыта ? 'true' : 'false'}">
      ${значок || ''}<span class="grp__label">${экр(имя)}</span>
      <svg class="grp__caret" viewBox="0 0 16 16" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 6l4 4 4-4"/>
      </svg>
    </button>
    <div class="grp__kids">${дети}</div>
  </div>`;

/** Простой заголовок раздела, без сворачивания. */
export const группаМеню = имя => `<div class="side__group">${экр(имя)}</div>`;

/**
 * Экран: показывается по адресу #/<имя>.
 *
 * Первый экран рисуется ВИДИМЫМ, остальные скрытыми. Это не мелочь: если
 * скрыть все и полагаться на скрипт, то при выключенных скриптах или до их
 * загрузки страница пуста. Пустая страница выглядит как поломка, хотя все
 * данные уже пришли.
 */
export const экран = (имя, заголовок, описание, содержимое, видим = false) =>
  `<section class="screen" data-screen="${экр(имя)}" data-title="${экр(заголовок)}"${видим ? '' : ' hidden'}>
    ${описание ? `<div class="screen__head"><p>${экр(описание)}</p></div>` : ''}
    ${содержимое}
  </section>`;
