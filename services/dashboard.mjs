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
import { оболочка, экран, пункт, группаМеню, экр } from './lib/shell.mjs';

const КОРЕНЬ = dirname(fileURLToPath(import.meta.url));
const ПАПКА_КЛИЕНТОВ = join(КОРЕНЬ, 'clients');


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

  return `<div class="projbody">
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
  </div>`;
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


/** Цвет точки в меню: по самому больному, что есть у проекта. */
const цветПроекта = п => {
  if (!п.проверка.ок) return 'var(--no)';
  if (п.отчёт.можноОтправлять) return 'var(--ok)';
  return 'var(--wait)';
};

function экранОбзора(проекты) {
  const строки = проекты
    .map(п => {
      const ведём = п.услуги.filter(у => у.состояние === 'ведём').length;
      return `<tr>
        <td><a href="#/p/${экр(п.id)}">${экр(п.профиль.name)}</a></td>
        <td>${ведём} из ${п.услуги.length}</td>
        <td>${п.доступы.открыто} из ${п.доступы.всего}</td>
        <td>${п.отчёт.наполнятся} из ${п.отчёт.всего}</td>
        <td>${п.отчёт.можноОтправлять
          ? '<span style="color:var(--ok)">уйдёт</span>'
          : '<span style="color:var(--no)">нет данных</span>'}</td>
      </tr>`;
    })
    .join('');

  const уйдёт = проекты.filter(п => п.отчёт.можноОтправлять).length;

  return `
  <div class="summary">
    <div><span class="lbl">Проектов</span><span class="val">${проекты.length}</span></div>
    <div><span class="lbl">Отчёт уйдёт</span><span class="val">${уйдёт}<span style="font-size:14px;color:var(--neutral)">/${проекты.length}</span></span></div>
    <div><span class="lbl">Ближайший отчёт</span><span class="val" style="font-size:18px">${следующийОтчёт().toISOString().slice(0, 10)}</span></div>
  </div>
  <div class="tablewrap">
    <table>
      <thead><tr><th>Проект</th><th>Услуг ведём</th><th>Доступов</th><th>Разделов отчёта</th><th>Отчёт</th></tr></thead>
      <tbody>${строки}</tbody>
    </table>
  </div>`;
}

function экранКаталога() {
  return Object.entries(ГРУППЫ_УСЛУГ)
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
    .join('');
}

function экранДоступов(проекты) {
  const всего = new Map();
  for (const п of проекты) {
    for (const д of п.нехватка) {
      if (!всего.has(д.имя)) всего.set(д.имя, { ...д, проекты: [] });
      всего.get(д.имя).проекты.push(п.профиль.name);
    }
  }
  const строки = [...всего.values()]
    .sort((а, б) => б.блокируетСтадии.length - а.блокируетСтадии.length || б.проекты.length - а.проекты.length)
    .map(
      д => `<tr>
        <td>${экр(д.имя)}</td>
        <td>${экр(д.выдаёт)}</td>
        <td>${д.блокируетСтадии.length ? `стадии ${д.блокируетСтадии.join(', ')}` : '<span class="muted">не блокирует</span>'}</td>
        <td>${экр(д.проекты.join(', '))}</td>
      </tr>`,
    )
    .join('');

  return `<div class="tablewrap">
    <table>
      <thead><tr><th>Чего нет</th><th>У кого просить</th><th>Что встаёт</th><th>Проекты</th></tr></thead>
      <tbody>${строки || '<tr><td colspan="4">Всё открыто.</td></tr>'}</tbody>
    </table>
  </div>`;
}

function страница(сырые, когда) {
  const проекты = сырые.map(дополнить);

  /*
    Меню тремя группами. Порядок не случайный: сверху то, куда смотрят каждый
    день, в середине проекты, внизу справочники, куда заглядывают изредка.

    У каждого проекта точка состояния и счётчик открытых доступов — список
    сам по себе уже отчёт: видно, где пусто, не открывая проект.
  */
  const нехваткаВсего = new Set(проекты.flatMap(п => п.нехватка.map(д => д.имя))).size;

  const меню =
    группаМеню('Сводка') +
    пункт({ адрес: 'overview', имя: 'Все проекты', метка: String(проекты.length) }) +
    пункт({ адрес: 'access', имя: 'Чего не хватает', метка: нехваткаВсего ? String(нехваткаВсего) : '' }) +
    группаМеню(`Проекты · ${проекты.length}`) +
    проекты
      .map(п =>
        пункт({
          адрес: `p/${п.id}`,
          имя: п.профиль.name,
          метка: `${п.доступы.открыто}/${п.доступы.всего}`,
          точка: цветПроекта(п),
        }),
      )
      .join('') +
    группаМеню('Справочники') +
    пункт({ адрес: 'catalog', имя: 'Каталог услуг', метка: String(Object.keys(УСЛУГИ).length) });

  const выбор = `<label for="proj" class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Проект</label>
    <select id="proj">${проекты
      .map(п => `<option value="${экр(п.id)}">${экр(п.профиль.name)}</option>`)
      .join('')}</select>`;

  const экраны =
    экран('overview', 'Все проекты',
      'Что ведём, каких доступов не хватает и уйдёт ли клиенту отчёт в этом месяце.',
      экранОбзора(проекты), true) +
    экран('access', 'Чего не хватает',
      'Сведено по всем проектам и отсортировано по тому, сколько стадий встаёт без этого доступа.',
      экранДоступов(проекты)) +
    экран('catalog', 'Каталог услуг',
      'Собран по доске «Направления» в Monday. Пунктиром — то, чего мы ещё не делали.',
      экранКаталога()) +
    проекты
      .map(п => экран(`p/${п.id}`, п.профиль.name, null, карточкаПроекта(п)))
      .join('');

  return оболочка({
    заголовок: 'Пульт Castells',
    меню,
    выборПроектов: выбор,
    экраны,
    когда,
  });
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
