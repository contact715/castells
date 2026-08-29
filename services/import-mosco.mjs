#!/usr/bin/env node
/*
  Забирает список компаний из Mosco и раскладывает их в заготовки профилей.

  ЗАЧЕМ ЭТОТ ФАЙЛ СУЩЕСТВУЕТ. Владелец попросил взять проекты из Mosco через
  API. Адрес и способ входа выяснены: `GET /api/admin/companies`, Basic-вход
  парой ADMIN_USERNAME и ADMIN_PASSWORD из настроек сервиса `back`. Но
  выполнить запрос из рабочего окружения нельзя: сеть наружу закрыта целиком,
  проверено на трёх адресах, включая example.com. Агент Railway тоже не умеет
  ни HTTP, ни SQL — спрошен прямо, ответил «нет».

  Поэтому запрос делает тот, у кого есть сеть. Одна команда — и профили
  готовы.

  Запуск:
    MOSCO_API=https://mosco-api-production.up.railway.app \
    MOSCO_USER=<ADMIN_USERNAME> \
    MOSCO_PASS=<ADMIN_PASSWORD> \
    node services/import-mosco.mjs

    Добавить --write, чтобы записать файлы. Без него только показывает, что
    получилось бы: посмотреть глазами дешевле, чем откатывать.

  ЧЕГО ЭТОТ ФАЙЛ НЕ ДЕЛАЕТ НАМЕРЕННО. Он не заполняет ниши, услуги, факты и
  доступы. Он делает ЗАГОТОВКУ: название, сайт, город — то, что пришло из
  Mosco, — и оставляет остальное пустым, чтобы профиль не прошёл проверку,
  пока человек не заполнит. Заготовка, которая молча притворяется готовой,
  хуже её отсутствия: по ней начнут строить страницы клиента.
*/

import { writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { slugify } from './lib/profile.mjs';

const КОРЕНЬ = dirname(fileURLToPath(import.meta.url));
const ПАПКА = join(КОРЕНЬ, 'clients');

/**
 * Достаёт список компаний.
 *
 * Вынесено отдельной функцией, чтобы разбор ответа можно было проверить, не
 * ходя в сеть: самопроверка подсовывает сюда готовый ответ.
 */
export async function забрать({ адрес, пользователь, пароль, доставать = fetch }) {
  const вход = Buffer.from(`${пользователь}:${пароль}`).toString('base64');
  const ответ = await доставать(`${адрес.replace(/\/$/, '')}/api/admin/companies`, {
    headers: { Authorization: `Basic ${вход}`, Accept: 'application/json' },
  });
  if (!ответ.ok) {
    throw new Error(
      `Mosco ответил ${ответ.status}. ` +
      (ответ.status === 401
        ? 'Проверьте ADMIN_USERNAME и ADMIN_PASSWORD в настройках сервиса back на Railway.'
        : 'Проверьте адрес API.'),
    );
  }
  return ответ.json();
}

/**
 * Приводит ответ к списку компаний.
 *
 * Форма ответа заранее неизвестна: это может быть массив, может быть объект с
 * полем companies или items. Поэтому разбираем терпимо, а не падаем — но
 * молча не проглатываем: если не нашли ничего похожего, говорим прямо.
 */
export function вытащитьКомпании(ответ) {
  if (Array.isArray(ответ)) return ответ;
  for (const поле of ['companies', 'items', 'data', 'results']) {
    if (Array.isArray(ответ?.[поле])) return ответ[поле];
  }
  throw new Error(
    'В ответе Mosco не нашлось списка компаний. Полученные поля: ' +
    Object.keys(ответ || {}).join(', ') + '. Покажите ответ — поправлю разбор.',
  );
}

/** Первое непустое из нескольких возможных названий поля. */
const взять = (запись, ...имена) => {
  for (const имя of имена) {
    const значение = запись?.[имя];
    if (typeof значение === 'string' && значение.trim()) return значение.trim();
  }
  return '';
};

/** Заготовка профиля из одной компании Mosco. */
export function вЗаготовку(компания) {
  const имя = взять(компания, 'name', 'company_name', 'title', 'display_name');
  const сайт = взять(компания, 'website', 'site', 'url', 'domain');
  const город = взять(компания, 'city', 'location', 'town');
  const штат = взять(компания, 'state', 'region');
  const id = slugify(имя) || `mosco-${взять(компания, 'id', 'uuid') || 'без-имени'}`;

  return {
    id,
    имя,
    сайт,
    город,
    штат,
    исходный: взять(компания, 'id', 'uuid'),
  };
}

/** Текст файла профиля. Пустые поля оставлены пустыми намеренно. */
export function файлПрофиля(з) {
  const город = з.город
    ? `    { name: '${з.город.replace(/'/g, "\\'")}'${з.штат ? `, state: '${з.штат.replace(/'/g, "\\'")}'` : ''} },`
    : '    // город не пришёл из Mosco — заполнить, иначе профиль не пройдёт проверку';

  return `/*
  ЗАГОТОВКА. Взято из Mosco (GET /api/admin/companies)${з.исходный ? `, их идентификатор ${з.исходный}` : ''}.

  Пришло только то, что ниже заполнено: название, сайт, город. Всё остальное
  оставлено пустым НАМЕРЕННО — профиль не пройдёт проверку, пока человек не
  заполнит нишу, услуги и подключённые нами услуги. Так и задумано: заготовка,
  которая притворяется готовой, хуже её отсутствия — по ней начнут строить
  страницы клиента.

  Что дозаполнить: trade, cms, hosting, services, engaged, access, facts.
*/

export default {
  id: '${з.id}',
  name: '${з.имя.replace(/'/g, "\\'")}',
  site: ${з.сайт ? `'${з.сайт.replace(/'/g, "\\'")}'` : 'null'},

  trade: '',      // hvac | remodeling | roofing | automotive | professional | other
  cms: 'unknown',
  hosting: 'unknown',

  tagline: '',
  about: '',
  differentiator: '',

  services: [
    // услуги САМОГО клиента, из них строятся страницы
  ],

  cities: [
${город}
  ],

  contact: { phone: '', address: '', hours: '' },

  facts: [
    // только с источником
  ],

  engaged: {
    // наши услуги: website | brand | seo | local | googleAds | googleLsa |
    // metaAds | yelpAds | tiktokAds | chatgptAds | crm
  },

  access: {
    siteAdmin: false, hosting: false, domainDns: false,
    searchConsole: false, bingWebmaster: false, googleBusiness: false,
    analytics: false, callTracking: false,
    googleAds: false, metaAds: false,
    emailSending: false, crm: false,
  },
};
`;
}

async function главная() {
  const адрес = process.env.MOSCO_API;
  const пользователь = process.env.MOSCO_USER;
  const пароль = process.env.MOSCO_PASS;
  const писать = process.argv.includes('--write');

  if (!адрес || !пользователь || !пароль) {
    console.error('Нужны переменные MOSCO_API, MOSCO_USER, MOSCO_PASS.');
    console.error('Пользователь и пароль — это ADMIN_USERNAME и ADMIN_PASSWORD');
    console.error('из настроек сервиса back в проекте Mosco на Railway.');
    return 1;
  }

  const ответ = await забрать({ адрес, пользователь, пароль });
  const компании = вытащитьКомпании(ответ);
  const заготовки = компании.map(вЗаготовку).filter(з => з.имя);

  console.log(`Компаний в Mosco: ${компании.length}, с названием: ${заготовки.length}\n`);

  const уже = new Set((await readdir(ПАПКА)).map(ф => ф.replace(/\.mjs$/, '')));

  for (const з of заготовки) {
    const есть = уже.has(з.id);
    console.log(`  ${есть ? 'уже есть' : 'новый   '}  ${з.id.padEnd(24)} ${з.имя}${з.город ? ` · ${з.город}` : ''}`);
    if (писать && !есть) {
      await writeFile(join(ПАПКА, `${з.id}.mjs`), файлПрофиля(з), 'utf8');
    }
  }

  if (!писать) {
    console.log('\nЭто предпросмотр. Добавьте --write, чтобы создать файлы заготовок.');
  } else {
    console.log('\nЗаготовки записаны. Они НЕ пройдут проверку, пока не заполнены');
    console.log('ниша, услуги и подключённые услуги — это защита, а не поломка.');
    console.log('Проверить: node services/run.mjs --list');
  }
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  главная().then(код => process.exit(код)).catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}
