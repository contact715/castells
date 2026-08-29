#!/usr/bin/env node
/*
  Пульт: одна страница, на которой видно состояние всех проектов цикла SEO.

  Запуск:
    node services/dashboard.mjs                 # в файл по умолчанию
    node services/dashboard.mjs путь/к/файлу.html

  ПОЧЕМУ ЭТО ГЕНЕРАТОР, А НЕ СВЁРСТАННАЯ СТРАНИЦА. Свёрстанная руками
  страница — это вторая копия данных, и она разойдётся с профилями через
  неделю. На сайте мы это уже проходили дважды: три меню с разными разделами,
  цены в девяти файлах. Здесь пульт читает те же профили и тот же расчёт
  состояния стадий, что и оркестратор, — разойтись им негде.

  Что на пульте намеренно НЕ показано: обещания и проценты готовности. Полоска
  «готовность 40%» приятна и бессмысленна, потому что оставшиеся 60% упираются
  в чужие решения. Вместо неё — что именно закрыто, что открыто, и у кого
  просить недостающее.
*/

import { readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { проверитьПрофиль, разобратьПрофиль, CMS } from './lib/profile.mjs';
import { СТАДИИ, состояниеСтадии } from './lib/stages.mjs';
import { ДОСТУПЫ, ГРУППЫ, ХОСТИНГИ, счётДоступов, нехваткаДоступов, ключиГруппы } from './lib/access.mjs';
import { готовностьОтчёта, следующийОтчёт, ДЕНЬ_ОТЧЁТА } from './lib/report.mjs';
import { УСЛУГИ, ГРУППЫ_УСЛУГ, ключиГруппыУслуг, услугиПроекта } from './lib/catalog.mjs';

const КОРЕНЬ = dirname(fileURLToPath(import.meta.url));
const ПАПКА_КЛИЕНТОВ = join(КОРЕНЬ, 'clients');

/** Экранирование: в профиле лежат названия компаний, а не проверенный HTML. */
const экр = значение =>
  String(значение ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

async function собратьПроекты() {
  const файлы = await readdir(ПАПКА_КЛИЕНТОВ);
  const ids = файлы.filter(ф => ф.endsWith('.mjs') && !ф.startsWith('_')).map(ф => ф.replace(/\.mjs$/, ''));

  const проекты = [];
  for (const id of ids) {
    const модуль = await import(join(ПАПКА_КЛИЕНТОВ, `${id}.mjs`));
    const сырой = модуль.default || модуль.профиль;
    const проверка = проверитьПрофиль(сырой);
    const профиль = разобратьПрофиль(сырой);
    проекты.push({
      id,
      профиль,
      проверка,
      стадии: СТАДИИ.map(с => ({ стадия: с, ...состояниеСтадии(с, профиль) })),
      доступы: счётДоступов(профиль),
      нехватка: нехваткаДоступов(профиль),
      отчёт: готовностьОтчёта(профиль),
      услуги: услугиПроекта(профиль),
    });
  }
  return проекты;
}

const КЛАСС_СОСТОЯНИЯ = { сделано: 'ok', снаружи: 'ext', ждёт: 'wait', человек: 'human' };
const ПОДПИСЬ_СОСТОЯНИЯ = {
  сделано: 'делаем сами',
  снаружи: 'отдельным скриптом',
  ждёт: 'ждёт',
  человек: 'человек',
};

function карточкаПроекта(п) {
  const { профиль: пр } = п;
  const хостинг = ХОСТИНГИ[пр.hosting] || ХОСТИНГИ.unknown;
  const публикация = CMS[пр.cms] || CMS.unknown;

  const стадии = п.стадии
    .map(({ стадия: с, код, преграды }) => {
      const причина = преграды.length ? преграды.join(' · ') : с.что;
      return `<li class="stage stage--${КЛАСС_СОСТОЯНИЯ[код]}">
        <span class="stage__n">${с.номер}</span>
        <span class="stage__name">${экр(с.имя)}</span>
        <span class="stage__state">${ПОДПИСЬ_СОСТОЯНИЯ[код]}</span>
        <p class="stage__why">${экр(причина)}</p>
      </li>`;
    })
    .join('');

  const группы = Object.entries(ГРУППЫ)
    .map(([ключГруппы, имяГруппы]) => {
      const чипы = ключиГруппы(ключГруппы)
        .map(к => {
          const д = ДОСТУПЫ[к];
          const открыт = Boolean(пр.access?.[к]);
          const блок = д.стадии.length ? ` · стадии ${д.стадии.join(', ')}` : '';
          const подсказка = `${д.зачем} Выдаёт: ${д.выдаёт}.${блок ? ` Без него встают${блок}.` : ''}`;
          return `<li class="chip chip--${открыт ? 'on' : 'off'}" title="${экр(подсказка)}">
            <span class="chip__dot" aria-hidden="true"></span>${экр(д.имя)}
          </li>`;
        })
        .join('');
      return `<div class="accgroup">
        <h4>${экр(имяГруппы)}</h4>
        <ul class="chips">${чипы}</ul>
      </div>`;
    })
    .join('');

  const разделы = п.отчёт.разделы
    .map(р => {
      const состояние = р.наполнится ? 'on' : 'off';
      const хвост = р.наполнится ? 'наполнится' : `мешает: ${р.мешает.join(', ')}`;
      return `<li class="rep rep--${состояние}">
        <span class="rep__name">${экр(р.имя)}${р.обязателен ? '<em>обязательный</em>' : ''}</span>
        <span class="rep__note">${экр(хвост)}</span>
      </li>`;
    })
    .join('');

  const вердикт = п.отчёт.можноОтправлять
    ? `<p class="verdict verdict--ok">Отчёт можно отправлять. Ближайший — ${следующийОтчёт().toISOString().slice(0, 10)}.</p>`
    : `<p class="verdict verdict--no">Отправлять нечего: ${экр(п.отчёт.почемуНельзя)}</p>`;

  const просить = п.нехватка.length
    ? `<table class="ask">
        <thead><tr><th>Чего нет</th><th>Что встаёт</th><th>У кого просить</th></tr></thead>
        <tbody>${п.нехватка
          .map(
            д => `<tr>
              <td>${экр(д.имя)}</td>
              <td>${д.блокируетСтадии.length ? `стадии ${д.блокируетСтадии.join(', ')}` : '<span class="muted">не блокирует</span>'}</td>
              <td>${экр(д.выдаёт)}</td>
            </tr>`,
          )
          .join('')}</tbody>
      </table>`
    : '<p class="verdict verdict--ok">Все доступы открыты.</p>';

  const тревога = п.проверка.ок
    ? ''
    : `<p class="alarm">Профиль не проходит проверку: ${экр(п.проверка.ошибки.join('; '))}</p>`;

  const услуги = п.услуги.length
    ? `<ul class="svcs">${п.услуги
        .map(у => {
          const хвост = у.нехватка.length ? `не хватает: ${у.нехватка.join(', ')}` : 'доступы есть';
          const опыт = у.делали ? '' : '<em class="noexp">опыта нет</em>';
          return `<li class="svc svc--${у.состояние === 'ведём' ? 'run' : у.состояние === 'завершено' ? 'done' : 'talk'}">
            <span class="svc__name">${экр(у.имя)}${опыт}</span>
            <span class="svc__state">${экр(у.состояние)}</span>
            <span class="svc__note">${экр(хвост)}</span>
          </li>`;
        })
        .join('')}</ul>`
    : '<p class="verdict verdict--no">Ни одна услуга не подключена — непонятно, что мы для клиента делаем.</p>';

  return `<article class="project">
    <header class="project__head">
      <div>
        <h2>${экр(пр.name)}</h2>
        <p class="project__meta">
          <code>${экр(п.id)}</code>
          ${пр.site ? `<a href="${экр(пр.site)}" target="_blank" rel="noopener">${экр(пр.site.replace(/^https?:\/\//, ''))}</a>` : '<span class="muted">сайта ещё нет</span>'}
        </p>
      </div>
      <dl class="counters">
        <div><dt>Услуг ведём</dt><dd>${п.услуги.filter(у => у.состояние === 'ведём').length}<span>/${п.услуги.length}</span></dd></div>
        <div><dt>Стадий SEO</dt><dd>${п.стадии.filter(с => с.код === 'сделано').length}<span>/${СТАДИИ.length}</span></dd></div>
        <div><dt>Доступов</dt><dd>${п.доступы.открыто}<span>/${п.доступы.всего}</span></dd></div>
        <div><dt>Разделов отчёта</dt><dd>${п.отчёт.наполнятся}<span>/${п.отчёт.всего}</span></dd></div>
      </dl>
    </header>

    ${тревога}

    <p class="project__infra">
      <span><b>Хостинг:</b> ${экр(хостинг.имя)} — просить ${экр(хостинг.просить)}</span>
      <span><b>Сайт:</b> ${экр(пр.cms)} — публикация ${экр(публикация.публикация)}</span>
    </p>

    <section class="block">
      <h3>Наши услуги на проекте</h3>
      ${услуги}
    </section>

    <section class="block">
      <h3>Стадии цикла SEO${п.услуги.some(у => у.цикл === 'seo') ? '' : '<span class="sub">услуга не подключена — цикл показан для справки</span>'}</h3>
      <ol class="stages">${стадии}</ol>
    </section>

    <section class="block">
      <h3>Доступы</h3>
      <div class="accgroups">${группы}</div>
    </section>

    <section class="block">
      <h3>Ежемесячный отчёт<span class="sub">уходит ${ДЕНЬ_ОТЧЁТА}-го за прошлый месяц</span></h3>
      <ul class="reps">${разделы}</ul>
      ${вердикт}
    </section>

    <section class="block">
      <h3>Что просить</h3>
      ${просить}
    </section>
  </article>`;
}

/**
 * Приводит проект к полному виду. Один кривой проект не должен ронять пульт
 * целиком: по упавшей странице не видно вообще ничего, а это хуже неполной.
 */
const дополнить = п => ({
  стадии: [],
  услуги: [],
  нехватка: [],
  доступы: { открыто: 0, всего: 0 },
  отчёт: { разделы: [], наполнятся: 0, всего: 0, можноОтправлять: false, почемуНельзя: 'не посчитано' },
  проверка: { ок: true, ошибки: [] },
  ...п,
});

function страница(сырые, когда) {
  const проекты = сырые.map(дополнить);
  const всегоНехватки = new Map();
  for (const п of проекты) {
    for (const д of п.нехватка) {
      if (!всегоНехватки.has(д.имя)) всегоНехватки.set(д.имя, { ...д, проекты: [] });
      всегоНехватки.get(д.имя).проекты.push(п.профиль.name);
    }
  }
  const сводка = [...всегоНехватки.values()]
    .sort((а, б) => б.блокируетСтадии.length - а.блокируетСтадии.length)
    .map(
      д => `<tr>
        <td>${экр(д.имя)}</td>
        <td>${экр(д.выдаёт)}</td>
        <td>${д.блокируетСтадии.length ? `стадии ${д.блокируетСтадии.join(', ')}` : '<span class="muted">не блокирует</span>'}</td>
        <td>${экр(д.проекты.join(', '))}</td>
      </tr>`,
    )
    .join('');

  const готовыхОтчётов = проекты.filter(п => п.отчёт.можноОтправлять).length;

  return `<title>Пульт цикла SEO</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Sans+3:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root{
    --ground:#FBFBFC; --surface:#FFFFFF; --sunk:#F4F6F7;
    --ink:#141A21; --neutral:#5C6672; --hair:#E2E6EA;
    --accent:#0E5E63;
    --ok:#2C7A57; --no:#B0442E; --wait:#9A7223; --human:#4A5568;
    --radius:3px;
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --ground:#0F1418; --surface:#161D23; --sunk:#111820;
      --ink:#E8EDF1; --neutral:#93A0AC; --hair:#242E36;
      --accent:#4FB3B8;
      --ok:#4FA37B; --no:#D9705A; --wait:#C9A14E; --human:#8996A5;
    }
  }
  :root[data-theme="dark"]{
    --ground:#0F1418; --surface:#161D23; --sunk:#111820;
    --ink:#E8EDF1; --neutral:#93A0AC; --hair:#242E36;
    --accent:#4FB3B8;
    --ok:#4FA37B; --no:#D9705A; --wait:#C9A14E; --human:#8996A5;
  }

  *{box-sizing:border-box;}
  body{
    background:var(--ground); color:var(--ink);
    font-family:"Source Sans 3",system-ui,-apple-system,sans-serif;
    font-size:15px; line-height:1.55; margin:0; padding:40px 24px 72px;
  }
  .wrap{max-width:1080px; margin:0 auto;}

  h1,h2,h3,h4{font-family:Archivo,system-ui,sans-serif; text-wrap:balance; margin:0;}
  h1{font-size:30px; font-weight:700; letter-spacing:-0.01em;}
  h2{font-size:21px; font-weight:600;}
  h3{font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.09em; color:var(--neutral);}
  h4{font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:var(--neutral); margin-bottom:8px;}
  code,.mono{font-family:"IBM Plex Mono",ui-monospace,monospace; font-size:.86em;}
  a{color:var(--accent);}
  .muted{color:var(--neutral);}

  header.top{border-bottom:2px solid var(--ink); padding-bottom:16px; margin-bottom:8px;}
  header.top p{color:var(--neutral); margin:6px 0 0; max-width:64ch;}
  .stamp{font-family:"IBM Plex Mono",monospace; font-size:12px; color:var(--neutral);}

  .summary{display:flex; flex-wrap:wrap; gap:28px; padding:16px 0 24px; border-bottom:1px solid var(--hair); margin-bottom:32px;}
  .summary div{display:flex; flex-direction:column;}
  .summary dt,.summary .lbl{font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--neutral);}
  .summary .val{font-family:Archivo,sans-serif; font-size:26px; font-weight:700; font-variant-numeric:tabular-nums;}

  .project{background:var(--surface); border:1px solid var(--hair); border-radius:var(--radius); padding:24px; margin-bottom:28px;}
  .project__head{display:flex; flex-wrap:wrap; gap:20px; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--hair); padding-bottom:16px;}
  .project__meta{margin:4px 0 0; display:flex; gap:12px; align-items:baseline; font-size:13px;}
  .counters{display:flex; gap:22px; margin:0;}
  .counters div{display:flex; flex-direction:column;}
  .counters dt{font-size:10px; text-transform:uppercase; letter-spacing:.08em; color:var(--neutral);}
  .counters dd{margin:0; font-family:Archivo,sans-serif; font-weight:700; font-size:22px; font-variant-numeric:tabular-nums;}
  .counters dd span{font-weight:500; font-size:14px; color:var(--neutral);}

  .project__infra{display:flex; flex-wrap:wrap; gap:24px; font-size:13px; color:var(--neutral); margin:14px 0 0;}
  .project__infra b{color:var(--ink); font-weight:600;}
  .alarm{background:color-mix(in srgb, var(--no) 12%, transparent); border-left:3px solid var(--no); padding:10px 12px; margin:14px 0 0; font-size:14px;}

  .block{margin-top:26px;}
  .block h3 .sub{text-transform:none; letter-spacing:0; font-weight:400; margin-left:10px; color:var(--neutral);}

  .stages{list-style:none; margin:12px 0 0; padding:0; display:grid; gap:1px; background:var(--hair); border:1px solid var(--hair); border-radius:var(--radius); overflow:hidden;}
  .stage{background:var(--surface); padding:10px 12px; display:grid; grid-template-columns:26px 1fr auto; gap:10px; align-items:baseline; border-left:3px solid transparent;}
  .stage__n{font-family:"IBM Plex Mono",monospace; color:var(--neutral); font-size:13px;}
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

  .catgroup{margin-top:16px;}
  .cat{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:10px;}
  .catitem{background:var(--sunk); border:1px solid var(--hair); border-radius:2px; padding:10px 12px; display:flex; flex-direction:column; gap:3px; font-size:13px;}
  .catitem b{font-family:Archivo,sans-serif;}
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

  table{border-collapse:collapse; width:100%; margin-top:12px; font-size:13.5px;}
  .tablewrap{overflow-x:auto;}
  th{text-align:left; font-family:Archivo,sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:.07em; color:var(--neutral); font-weight:600; padding:6px 10px 6px 0; border-bottom:1px solid var(--hair);}
  td{padding:7px 10px 7px 0; border-bottom:1px solid var(--hair); vertical-align:top;}
  tr:last-child td{border-bottom:none;}

  footer{margin-top:40px; padding-top:18px; border-top:1px solid var(--hair); font-size:13px; color:var(--neutral); max-width:70ch;}
  @media (max-width:640px){
    .counters{gap:16px;} .project{padding:16px;}
  }
</style>

<div class="wrap">
  <header class="top">
    <h1>Пульт цикла SEO</h1>
    <p>Состояние проектов: какие стадии идут, каких доступов нет и уйдёт ли в этом месяце отчёт клиенту.</p>
    <p class="stamp">собрано ${экр(когда)} из профилей в services/clients</p>
  </header>

  <div class="summary">
    <div><span class="lbl">Проектов</span><span class="val">${проекты.length}</span></div>
    <div><span class="lbl">Отчёт уйдёт</span><span class="val">${готовыхОтчётов}<span style="font-size:14px;color:var(--neutral)">/${проекты.length}</span></span></div>
    <div><span class="lbl">Ближайший отчёт</span><span class="val" style="font-size:18px">${следующийОтчёт().toISOString().slice(0, 10)}</span></div>
  </div>

  ${проекты.map(карточкаПроекта).join('')}

  <section class="block">
    <h3>Каталог услуг<span class="sub">что мы вообще делаем</span></h3>
    ${Object.entries(ГРУППЫ_УСЛУГ)
      .map(
        ([кг, иг]) => `<div class="catgroup">
          <h4>${экр(иг)}</h4>
          <ul class="cat">${ключиГруппыУслуг(кг)
            .map(к => {
              const у = УСЛУГИ[к];
              return `<li class="catitem${у.делали ? '' : ' catitem--noexp'}">
                <b>${экр(у.имя)}</b>${у.делали ? '' : '<em class="noexp">опыта нет</em>'}
                <span>${экр(у.что)}</span>
                <span class="src">${экр(у.источникОпыта)}</span>
              </li>`;
            })
            .join('')}</ul>
        </div>`,
      )
      .join('')}
  </section>

  <section class="block">
    <h3>Что просить, по всем проектам</h3>
    <div class="tablewrap">
      <table>
        <thead><tr><th>Чего нет</th><th>У кого</th><th>Что встаёт</th><th>Проекты</th></tr></thead>
        <tbody>${сводка || '<tr><td colspan="4">Всё открыто.</td></tr>'}</tbody>
      </table>
    </div>
  </section>

  <footer>
    Пульт собирается из профилей проектов, а не ведётся руками: разойтись с ними
    ему негде. Чтобы обновить — поправить профиль в <code>services/clients</code>
    и запустить <code>node services/dashboard.mjs</code>.
    Полоски «готовность в процентах» здесь намеренно нет: оставшееся упирается
    в чужие решения, и проценты создавали бы ощущение движения там, где его нет.
  </footer>
</div>`;
}

async function главная() {
  const куда = process.argv[2] || join(КОРЕНЬ, 'dashboard.html');
  const проекты = await собратьПроекты();
  const html = страница(проекты, new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC');
  await writeFile(resolve(куда), html, 'utf8');
  console.log(`Пульт собран: ${resolve(куда)}`);
  console.log(`  проектов: ${проекты.length}`);
  for (const п of проекты) {
    console.log(
      `  ${п.id}: стадий делаем ${п.стадии.filter(с => с.код === 'сделано').length}/${СТАДИИ.length}, ` +
      `доступов ${п.доступы.открыто}/${п.доступы.всего}, ` +
      `отчёт ${п.отчёт.можноОтправлять ? 'уйдёт' : 'не уйдёт'}`,
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  главная().catch(e => {
    console.error(e);
    process.exit(1);
  });
}

export { собратьПроекты, страница };
