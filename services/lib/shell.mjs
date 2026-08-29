/*
  Оболочка пульта: сайдбар слева, верхняя панель сверху, экран в середине.

  ПОЧЕМУ ИМЕННО ТАК. Владелец попросил взять устройство из нашей же консоли
  Mosco — сайдбар и верхняя панель, — чтобы не выдумывать своё. Прочитать
  консоль из рабочего окружения не удалось (репозиторий Mosco-corp этой
  сессии недоступен, сеть к живой консоли закрыта), поэтому взято описанное
  устройство, а всё оформление вынесено в lib/theme.mjs — подменить на
  московское можно правкой одного файла.

  РАЗДЕЛЕНИЕ ОБЯЗАННОСТЕЙ. Здесь только оболочка и переходы между экранами.
  Что показывать внутри — дело dashboard.mjs. Иначе через месяц оболочка
  начнёт знать про доступы и отчёты, и её нельзя будет переодеть, не
  задев данные.

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
  они работают в обеих темах и в свёрнутом сайдбаре без второго набора.

  Взять значки Mosco не удалось: агент отдаёт текст исходника, а их значки —
  это библиотека компонентов, которую так не вытащишь. Поэтому здесь НАШИ
  значки в их размере (16px, линия 1.5). Это помечено, а не выдано за чужое.
*/
const зн = путь =>
  `<svg class="navlink__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" ` +
  `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${путь}</svg>`;

export const ЗНАЧКИ = {
  сводка: зн('<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>'),
  доступы: зн('<circle cx="5.5" cy="8" r="2.5"/><path d="M8 8h6M12 8v2.5"/>'),
  каталог: зн('<path d="M2 4h12M2 8h12M2 12h8"/>'),
  проект: зн('<path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.2l1.2 1.6h5.6A1.5 1.5 0 0 1 14 6.1v5.4A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5z"/>'),
  настройки: зн('<circle cx="8" cy="8" r="2"/><path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4"/>'),
};

export const СТИЛИ = `
  ${темы()}

  *{box-sizing:border-box;}
  body{
    background:var(--ground); color:var(--ink);
    font-family:${ШРИФТЫ.текст}; font-size:15px; line-height:1.55; margin:0;
  }
  h1,h2,h3,h4{font-family:${ШРИФТЫ.заголовки}; text-wrap:balance; margin:0;}
  h1{font-size:24px; font-weight:700; letter-spacing:-0.01em;}
  h2{font-size:19px; font-weight:600;}
  h3{font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.09em; color:var(--neutral);}
  h4{font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:var(--neutral); margin-bottom:8px;}
  code,.mono{font-family:${ШРИФТЫ.моно}; font-size:.86em;}
  a{color:var(--accent);}
  .muted{color:var(--neutral);}
  :focus-visible{outline:2px solid var(--accent); outline-offset:2px;}

  /* --- Оболочка --- */
  .shell{display:grid; grid-template-columns:var(--сайдбар) 1fr; min-height:100vh;}

  .side{
    background:var(--surface); border-right:1px solid var(--hair);
    display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto;
  }
  .side__brand{
    height:var(--панель); display:flex; align-items:center; gap:10px;
    padding:0 18px; border-bottom:1px solid var(--hair); flex:none;
  }
  .side__mark{
    width:22px; height:22px; border-radius:3px; background:var(--accent); flex:none;
    display:flex; align-items:center; justify-content:center;
    color:#fff; font:700 11px/1 ${ШРИФТЫ.заголовки};
  }
  .side__name{font:700 14px/1.2 ${ШРИФТЫ.заголовки}; letter-spacing:-0.01em;}
  .side__nav{padding:10px 8px; display:flex; flex-direction:column; gap:1px; flex:1;}
  .side__bottom{padding:8px; border-top:1px solid var(--hair); display:flex; flex-direction:column; gap:1px;}
  .side__group{
    font-size:10px; text-transform:uppercase; letter-spacing:.09em; color:var(--neutral);
    padding:14px 8px 6px; font-family:${ШРИФТЫ.заголовки}; font-weight:600;
  }
  .navlink{
    display:flex; align-items:center; justify-content:space-between; gap:8px;
    padding:7px 10px; border-radius:var(--радиус); color:var(--ink);
    text-decoration:none; font-size:14px; border-left:2px solid transparent;
    min-width:0;
  }
  /* Названия клиентов бывают длинными («AAA Brothers Heating & Air
     Conditioning»). Без обрезки они распирают меню и ломают сетку. */
  .navlink > span:first-child{
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
    display:flex; align-items:center; gap:7px; min-width:0;
  }
  .navlink:hover{background:var(--sunk);}
  .navlink[aria-current="page"]{background:var(--sunk); border-left-color:var(--accent); font-weight:600;}
  .navlink__tag{
    font-family:${ШРИФТЫ.моно}; font-size:11px; color:var(--neutral);
    font-variant-numeric:tabular-nums;
  }
  .navlink__dot{width:6px; height:6px; border-radius:50%; flex:none;}
  .navlink__icon{width:16px; height:16px; flex:none; opacity:.75;}
  .navlink[aria-current="page"] .navlink__icon{opacity:1;}

  /* Раскрывающаяся группа — как у них: заголовок кликабелен, дети с отступом. */
  .grp{display:flex; flex-direction:column;}
  .grp__head{
    display:flex; align-items:center; gap:7px; width:100%;
    padding:7px 10px; border:0; background:none; cursor:pointer;
    font:600 10px/1 ${ШРИФТЫ.заголовки}; letter-spacing:.09em; text-transform:uppercase;
    color:var(--neutral); border-radius:var(--радиус);
  }
  .grp__head:hover{background:var(--sunk);}
  .grp__caret{margin-left:auto; transition:transform .15s; opacity:.6;}
  .grp[data-open="0"] .grp__caret{transform:rotate(-90deg);}
  .grp[data-open="0"] .grp__kids{display:none;}
  .grp__kids{display:flex; flex-direction:column; gap:1px; padding-left:6px;}

  /* Свёрнутая полоса: остаются только значки. Ширина и поведение — из Mosco. */
  :root[data-rail="1"] .shell{grid-template-columns:var(--свёрнутый) 1fr;}
  :root[data-rail="1"] .side__name,
  :root[data-rail="1"] .navlink__tag,
  :root[data-rail="1"] .navlink__label,
  :root[data-rail="1"] .grp__head span,
  :root[data-rail="1"] .grp__caret,
  :root[data-rail="1"] .side__foot{display:none;}
  :root[data-rail="1"] .side__brand{justify-content:center; padding:0;}
  :root[data-rail="1"] .navlink{justify-content:center; padding:9px 0;}
  :root[data-rail="1"] .grp__head{justify-content:center; padding:6px 0;}
  :root[data-rail="1"] .grp__kids{padding-left:0;}
  :root[data-rail="1"] .navlink__dot{position:absolute; margin-left:18px; margin-top:-12px;}
  :root[data-rail="1"] .navlink > span:first-child{justify-content:center;}

  .rail{
    display:flex; align-items:center; gap:8px; width:100%;
    padding:7px 10px; border:0; background:none; cursor:pointer;
    color:var(--neutral); font:400 12px/1 ${ШРИФТЫ.текст}; border-radius:var(--радиус);
  }
  .rail:hover{background:var(--sunk); color:var(--ink);}
  .side__foot{margin-top:auto; padding:14px 18px; border-top:1px solid var(--hair); font-size:11.5px; color:var(--neutral);}

  .main{display:flex; flex-direction:column; min-width:0;}
  .top{
    height:var(--панель); flex:none; position:sticky; top:0; z-index:5;
    background:var(--surface); border-bottom:1px solid var(--hair);
    display:flex; align-items:center; gap:16px; padding:0 24px;
  }
  .top__title{font:600 15px/1 ${ШРИФТЫ.заголовки};}
  .top__crumb{font-size:12.5px; color:var(--neutral);}
  .top__right{margin-left:auto; display:flex; align-items:center; gap:14px;}
  .top select{
    font-family:${ШРИФТЫ.заголовки}; font-size:13px; font-weight:600;
    color:var(--ink); background:var(--ground);
    border:1px solid var(--hair); border-radius:var(--радиус);
    padding:6px 28px 6px 10px; cursor:pointer; appearance:none;
    background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);
    background-position:calc(100% - 14px) calc(50% + 2px),calc(100% - 9px) calc(50% + 2px);
    background-size:5px 5px,5px 5px; background-repeat:no-repeat;
  }
  .stamp{font-family:${ШРИФТЫ.моно}; font-size:11.5px; color:var(--neutral);}

  .screen{padding:26px 24px 64px; max-width:1080px;}
  .screen[hidden]{display:none;}
  .screen__head{margin-bottom:20px;}
  .screen__head p{color:var(--neutral); margin:6px 0 0; max-width:66ch;}

  /* --- Составные части экранов --- */
  .summary{display:flex; flex-wrap:wrap; gap:28px; padding:0 0 22px; border-bottom:1px solid var(--hair); margin-bottom:22px;}
  .summary div{display:flex; flex-direction:column;}
  .summary .lbl{font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--neutral);}
  .summary .val{font-family:${ШРИФТЫ.заголовки}; font-size:26px; font-weight:700; font-variant-numeric:tabular-nums;}

  table{border-collapse:collapse; width:100%; font-size:13.5px;}
  .tablewrap{overflow-x:auto;}
  th{text-align:left; font-family:${ШРИФТЫ.заголовки}; font-size:11px; text-transform:uppercase; letter-spacing:.07em; color:var(--neutral); font-weight:600; padding:6px 12px 6px 0; border-bottom:1px solid var(--hair); white-space:nowrap;}
  td{padding:8px 12px 8px 0; border-bottom:1px solid var(--hair); vertical-align:top;}
  tr:last-child td{border-bottom:none;}

  .project__head{display:flex; flex-wrap:wrap; gap:20px; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--hair); padding-bottom:16px;}
  .project__meta{margin:4px 0 0; display:flex; gap:12px; align-items:baseline; font-size:13px;}
  .counters{display:flex; gap:22px; margin:0;}
  .counters div{display:flex; flex-direction:column;}
  .counters dt{font-size:10px; text-transform:uppercase; letter-spacing:.08em; color:var(--neutral);}
  .counters dd{margin:0; font-family:${ШРИФТЫ.заголовки}; font-weight:700; font-size:22px; font-variant-numeric:tabular-nums;}
  .counters dd span{font-weight:500; font-size:14px; color:var(--neutral);}
  .project__infra{display:flex; flex-wrap:wrap; gap:24px; font-size:13px; color:var(--neutral); margin:14px 0 0;}
  .project__infra b{color:var(--ink); font-weight:600;}
  .alarm{background:color-mix(in srgb, var(--no) 12%, transparent); border-left:3px solid var(--no); padding:10px 12px; margin:14px 0 0; font-size:14px;}

  .block{margin-top:26px;}
  .block h3 .sub{text-transform:none; letter-spacing:0; font-weight:400; margin-left:10px; color:var(--neutral);}

  .stages{list-style:none; margin:12px 0 0; padding:0; display:grid; gap:1px; background:var(--hair); border:1px solid var(--hair); border-radius:var(--радиус); overflow:hidden;}
  .stage{background:var(--surface); padding:10px 12px; display:grid; grid-template-columns:26px 1fr auto; gap:10px; align-items:baseline; border-left:3px solid transparent;}
  .stage__n{font-family:${ШРИФТЫ.моно}; color:var(--neutral); font-size:13px;}
  .stage__name{font-weight:600;}
  .stage__state{font-size:11px; text-transform:uppercase; letter-spacing:.07em;}
  .stage__why{grid-column:2 / -1; margin:2px 0 0; font-size:13px; color:var(--neutral);}
  .stage--ok{border-left-color:var(--ok);} .stage--ok .stage__state{color:var(--ok);}
  .stage--ext{border-left-color:var(--accent);} .stage--ext .stage__state{color:var(--accent);}
  .stage--wait{border-left-color:var(--no);} .stage--wait .stage__state{color:var(--no);}
  .stage--human{border-left-color:var(--human);} .stage--human .stage__state{color:var(--human);}

  .accgroups{display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:18px; margin-top:12px;}
  .chips{list-style:none; margin:0; padding:0; display:flex; flex-wrap:wrap; gap:6px;}
  .chip{display:inline-flex; align-items:center; gap:6px; font-size:12.5px; padding:3px 9px; border:1px solid var(--hair); border-radius:2px; background:var(--sunk); cursor:help;}
  .chip__dot{width:7px; height:7px; border-radius:50%; flex:none;}
  .chip--on{color:var(--ink);} .chip--on .chip__dot{background:var(--ok);}
  .chip--off{color:var(--neutral);} .chip--off .chip__dot{background:var(--no); opacity:.65;}

  .svcs{list-style:none; margin:12px 0 0; padding:0; display:grid; gap:4px;}
  .svc{display:grid; grid-template-columns:1fr auto auto; gap:14px; align-items:baseline; padding:8px 10px; background:var(--sunk); border-left:3px solid var(--hair); font-size:13.5px;}
  .svc--run{border-left-color:var(--ok);}
  .svc--done{border-left-color:var(--human);}
  .svc--talk{border-left-color:var(--wait);}
  .svc__name{font-weight:600;}
  .svc__state{font-size:11px; text-transform:uppercase; letter-spacing:.07em; color:var(--neutral);}
  .svc__note{color:var(--neutral); font-size:12.5px;}
  .noexp{font-style:normal; font-size:10px; text-transform:uppercase; letter-spacing:.06em; color:var(--no); border:1px solid currentColor; padding:1px 5px; border-radius:2px; margin-left:8px;}

  .catgroup{margin-top:18px;}
  .cat{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:10px;}
  .catitem{background:var(--sunk); border:1px solid var(--hair); border-radius:2px; padding:10px 12px; display:flex; flex-direction:column; gap:3px; font-size:13px;}
  .catitem b{font-family:${ШРИФТЫ.заголовки};}
  .catitem span{color:var(--neutral);}
  .catitem .src{font-size:11.5px; font-style:italic;}
  .catitem--noexp{border-style:dashed;}

  .reps{list-style:none; margin:12px 0 0; padding:0; display:grid; gap:4px;}
  .rep{display:flex; flex-wrap:wrap; gap:10px; justify-content:space-between; padding:7px 10px; background:var(--sunk); border-left:3px solid var(--hair); font-size:13.5px;}
  .rep--on{border-left-color:var(--ok);}
  .rep--off{border-left-color:var(--no);}
  .rep__name{font-weight:600;}
  .rep__name em{font-style:normal; font-weight:400; font-size:11px; text-transform:uppercase; letter-spacing:.07em; color:var(--neutral); margin-left:8px;}
  .rep__note{color:var(--neutral);}

  .verdict{margin:12px 0 0; font-size:14px; padding:9px 12px; border-radius:2px;}
  .verdict--ok{background:color-mix(in srgb, var(--ok) 12%, transparent); color:var(--ok);}
  .verdict--no{background:color-mix(in srgb, var(--no) 10%, transparent); color:var(--no);}

  @media (max-width:860px){
    .shell{grid-template-columns:1fr;}
    .side{position:static; height:auto; border-right:none; border-bottom:1px solid var(--hair);}
    .side__nav{flex-direction:row; flex-wrap:wrap; padding:10px;}
    .side__group{display:none;}
    .side__foot{display:none;}
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
    var активная = ссылки().filter(function (с) { return с.getAttribute('aria-current'); })[0];
    if (шапка && активная) { шапка.textContent = активная.dataset.title || активная.textContent.trim(); }

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

  /* Свёрнутая полоса. Ширина и само поведение взяты из Project X. */
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

  var начальный = изАдреса();
  if (!начальный) { try { начальный = localStorage.getItem(КЛЮЧ); } catch (e) {} }
  показать(начальный || '', false);
})();
`;

/**
 * Собирает страницу целиком.
 *
 * @param {object} части — { заголовок, разделыМеню, проекты, экраны, когда, подвал }
 */
export function оболочка({ заголовок, меню, низМеню, выборПроектов, экраны, когда, подвал }) {
  return `<title>${экр(заголовок)}</title>
<link rel="stylesheet" href="${ШРИФТЫ.подключение}">
<style>${СТИЛИ}</style>

<div class="shell">
  <nav class="side" aria-label="Разделы">
    <div class="side__brand">
      <span class="side__mark" aria-hidden="true">C</span>
      <span class="side__name">Castells</span>
    </div>
    <div class="side__nav">${меню}</div>
    <div class="side__bottom">
      ${низМеню || ''}
      <button class="rail" type="button" id="rail" aria-label="Свернуть меню">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M6.5 3v10"/>
        </svg>
        <span class="navlink__label">Свернуть</span>
      </button>
    </div>
    <div class="side__foot">
      Собрано из профилей<br>в <code>services/clients</code>
    </div>
  </nav>

  <div class="main">
    <header class="top">
      <span class="top__title">Пульт</span>
      <span class="top__crumb" id="crumb"></span>
      <div class="top__right">
        ${выборПроектов}
        <span class="stamp">${экр(когда)}</span>
      </div>
    </header>
    ${экраны}
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
 * Раскрывающаяся группа — как в сайдбаре Project X: заголовок кликабелен,
 * дети прячутся. Состояние запоминается, иначе при каждом переходе всё
 * схлопывалось бы обратно и по сайдбару стало бы неудобно ходить.
 */
export const группа = ({ ключ, имя, значок, дети, открыта = true }) =>
  `<div class="grp" data-group="${экр(ключ)}" data-open="${открыта ? '1' : '0'}">
    <button class="grp__head" type="button" aria-expanded="${открыта ? 'true' : 'false'}">
      ${значок || ''}<span>${экр(имя)}</span>
      <svg class="grp__caret" width="10" height="10" viewBox="0 0 10 10" fill="none"
           stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
        <path d="M2.5 4l2.5 2.5L7.5 4"/>
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
  `<section class="screen" data-screen="${экр(имя)}"${видим ? '' : ' hidden'}>
    <div class="screen__head">
      <h1>${экр(заголовок)}</h1>
      ${описание ? `<p>${экр(описание)}</p>` : ''}
    </div>
    ${содержимое}
  </section>`;
