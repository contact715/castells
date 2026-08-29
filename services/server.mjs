#!/usr/bin/env node
/*
  HTTP-сервер пульта. То, что выкладывается на Railway.

  Запуск:
    node services/server.mjs            # порт 3000 или из PORT
    PORT=8080 node services/server.mjs

  Адреса:
    GET /              пульт, собранный из профилей
    GET /api/projects  то же данными (JSON) — отсюда его будут читать агенты
    GET /health        для проверки живости на Railway

  ПОЧЕМУ БЕЗ ФРЕЙМВОРКА. Встроенного http хватает с запасом: страница
  собирается из локальных файлов, базы нет, нагрузки нет. Каждая добавленная
  зависимость — это то, что придётся обновлять и чинить, а взамен здесь она не
  даёт ничего. Ноль зависимостей ещё и означает, что сборка на Railway
  занимает секунды.

  ПОЧЕМУ СТРАНИЦА СОБИРАЕТСЯ НА КАЖДЫЙ ЗАПРОС. Сейчас данные лежат в файлах и
  меняются только при выкатке, так что можно было бы собрать один раз. Но
  дальше сюда придут живые данные (Search Console, счётчик), и тогда
  закэшированная страница начнёт врать. Дешевле сразу делать правильно:
  сборка занимает миллисекунды.
*/

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

import { собратьПроекты, страница } from './dashboard.mjs';
import { СТАДИИ } from './lib/stages.mjs';

const ПОРТ = Number(process.env.PORT) || 3000;

/*
  Общий пароль. На пульте видны названия клиентов, их сайты и то, каких
  доступов у нас нет — это не секрет уровня пароля, но и не то, что стоит
  оставлять открытым по адресу, который легко угадать.

  Если переменная не задана, сервер работает, но говорит об этом вслух: и в
  журнал при запуске, и полосой на самой странице. Молча открытый пульт хуже
  открытого с предупреждением — про молчаливый забывают.
*/
const ПАРОЛЬ = process.env.DASHBOARD_TOKEN || '';

/** Имя печенья, в котором держится вход. */
const ПЕЧЕНЬЕ = 'castells_dash';

const разобратьПеченье = строка =>
  Object.fromEntries(
    String(строка || '')
      .split(';')
      .map(кусок => кусок.trim().split('='))
      .filter(пара => пара.length === 2)
      .map(([имя, значение]) => [имя, decodeURIComponent(значение)]),
  );

/**
 * Пускать ли. Три способа, в порядке убывания удобства:
 *   печенье      — обычный человек, уже вошедший;
 *   заголовок    — программа, которая ходит в /api/projects;
 *   ?token=      — первый вход по ссылке, дальше он меняется на печенье.
 *
 * Почему появилось печенье. Сначала вход был только через ?token= в адресе.
 * Так пульт открывался, но пароль оставался в истории браузера и в адресной
 * строке, а при каждом переходе его надо было тащить за собой. Инструментом,
 * которым неудобно пользоваться, не пользуются.
 */
const пропустить = запрос => {
  if (!ПАРОЛЬ) return true;
  if ((запрос.headers.authorization || '') === `Bearer ${ПАРОЛЬ}`) return true;
  if (разобратьПеченье(запрос.headers.cookie)[ПЕЧЕНЬЕ] === ПАРОЛЬ) return true;
  return new URL(запрос.url, 'http://localhost').searchParams.get('token') === ПАРОЛЬ;
};

/** Пришёл ли пароль именно строкой запроса — тогда его надо убрать из адреса. */
const парольИзАдреса = запрос =>
  new URL(запрос.url, 'http://localhost').searchParams.get('token') === ПАРОЛЬ;

/**
 * Страница входа. Простая форма вместо голого «401»: по голому коду человек
 * не понимает, что делать, и пишет «у меня не открывается».
 */
const СТРАНИЦА_ВХОДА = `<!doctype html><meta charset="utf-8">
<title>Пульт Castells</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  /* Значения те же, что в lib/theme.mjs — из Mosco web. Здесь они вписаны
     руками намеренно: страница входа отдаётся до сборки пульта и не должна
     тянуть за собой его модули. */
  :root{color-scheme:light dark;--bg:#EDEAE3;--surface:#fff;--ink:#1A1A1A;--second:#333;--line:rgba(0,0,0,.10);--accent:#2D6B4A;}
  @media (prefers-color-scheme:dark){:root{--bg:#000;--surface:#111;--ink:#fff;--second:rgba(255,255,255,.80);--line:rgba(255,255,255,.06);--accent:#3B82F6;}}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--ink);
       font:15px/1.5 "Plus Jakarta Sans",Inter,system-ui,-apple-system,sans-serif;padding:24px;}
  form{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:28px;width:100%;max-width:360px;}
  h1{font-size:19px;margin:0 0 6px;}
  p{color:var(--second);margin:0 0 18px;font-size:13.5px;}
  label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--second);margin-bottom:6px;}
  input{width:100%;padding:9px 11px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);font:inherit;}
  button{margin-top:14px;width:100%;padding:10px;border:0;border-radius:6px;background:var(--accent);color:#fff;font:600 14px "Plus Jakarta Sans",Inter,system-ui,sans-serif;cursor:pointer;}
  input:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
</style>
<form method="get" action="/">
  <h1>Пульт Castells</h1>
  <p>Введите пароль доступа. Он запомнится в этом браузере.</p>
  <label for="t">Пароль</label>
  <input id="t" name="token" type="password" autofocus autocomplete="current-password">
  <button type="submit">Войти</button>
</form>`;

const ПРЕДУПРЕЖДЕНИЕ = `<div style="background:#B0442E;color:#fff;padding:10px 16px;font:600 13px/1.4 system-ui;">
  Пульт открыт всем, кто знает адрес: пароль не задан.
  Задайте переменную DASHBOARD_TOKEN в настройках сервиса и перезапустите.
</div>`;

/** Данные для страницы и для JSON — один сбор, чтобы они не разошлись. */
async function состояние() {
  const проекты = await собратьПроекты();
  return proekty_вВид(проекты);
}

/** Приводит проекты к виду, пригодному для JSON: без функций и циклов ссылок. */
const proekty_вВид = проекты =>
  проекты.map(п => ({
    id: п.id,
    название: п.профиль.name,
    сайт: п.профиль.site,
    хостинг: п.профиль.hosting,
    cms: п.профиль.cms,
    профильВерен: п.проверка.ок,
    ошибкиПрофиля: п.проверка.ошибки,
    услуги: п.услуги.map(у => ({
      ключ: у.ключ,
      имя: у.имя,
      состояние: у.состояние,
      делали: у.делали,
      нехваткаДоступов: у.нехватка,
    })),
    стадии: п.стадии.map(с => ({ номер: с.стадия.номер, имя: с.стадия.имя, код: с.код, преграды: с.преграды })),
    доступы: п.доступы,
    нехватка: п.нехватка.map(д => ({ имя: д.имя, выдаёт: д.выдаёт, блокируетСтадии: д.блокируетСтадии })),
    отчёт: {
      наполнятся: п.отчёт.наполнятся,
      всего: п.отчёт.всего,
      можноОтправлять: п.отчёт.можноОтправлять,
      почемуНельзя: п.отчёт.почемуНельзя,
    },
  }));

const отдать = (ответ, код, тип, тело) => {
  ответ.writeHead(код, {
    'Content-Type': тип,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  ответ.end(тело);
};

export async function обработать(запрос, ответ) {
  const путь = new URL(запрос.url, 'http://localhost').pathname;

  if (путь === '/health') {
    return отдать(ответ, 200, 'application/json; charset=utf-8',
      JSON.stringify({ статус: 'жив', стадий: СТАДИИ.length, время: new Date().toISOString() }));
  }

  if (!пропустить(запрос)) {
    // Для программ — понятный текст, для людей — форма. Различаем по тому,
    // просит ли клиент HTML.
    const этоЧеловек = (запрос.headers.accept || '').includes('text/html');
    return этоЧеловек
      ? отдать(ответ, 401, 'text/html; charset=utf-8', СТРАНИЦА_ВХОДА)
      : отдать(ответ, 401, 'text/plain; charset=utf-8', 'Нужен пароль: заголовок Authorization: Bearer …');
  }

  /*
    Пароль пришёл строкой запроса — кладём его в печенье и уводим на чистый
    адрес. Так он не остаётся ни в адресной строке, ни в истории, ни в
    журналах посредников, а человеку больше не нужно таскать его за собой.
  */
  if (парольИзАдреса(запрос) && путь === '/') {
    ответ.writeHead(302, {
      Location: '/',
      'Set-Cookie': `${ПЕЧЕНЬЕ}=${encodeURIComponent(ПАРОЛЬ)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
    });
    return ответ.end();
  }

  try {
    if (путь === '/api/projects') {
      const проекты = await собратьПроекты();
      return отдать(ответ, 200, 'application/json; charset=utf-8',
        JSON.stringify({ собрано: new Date().toISOString(), проекты: proekty_вВид(проекты) }, null, 2));
    }

    if (путь === '/' || путь === '/index.html') {
      const проекты = await собратьПроекты();
      const когда = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
      const html = (ПАРОЛЬ ? '' : ПРЕДУПРЕЖДЕНИЕ) + страница(проекты, когда);
      return отдать(ответ, 200, 'text/html; charset=utf-8', html);
    }

    return отдать(ответ, 404, 'text/plain; charset=utf-8', 'Нет такой страницы');
  } catch (e) {
    // Ошибку показываем текстом, а не белым экраном: по белому экрану не
    // видно, что чинить, и человек идёт смотреть журналы вместо страницы.
    console.error('Ошибка при сборке пульта:', e);
    return отдать(ответ, 500, 'text/plain; charset=utf-8', `Пульт не собрался: ${e.message}`);
  }
}

export function поднять(порт = ПОРТ) {
  const сервер = createServer((запрос, ответ) => { обработать(запрос, ответ); });
  return new Promise(готово => {
    сервер.listen(порт, '0.0.0.0', () => готово(сервер));
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  поднять().then(сервер => {
    const { port } = сервер.address();
    console.log(`Пульт слушает порт ${port}`);
    if (!ПАРОЛЬ) {
      console.warn('ВНИМАНИЕ: DASHBOARD_TOKEN не задан — пульт открыт всем, кто знает адрес.');
    }
  });

  // Railway останавливает контейнер сигналом: закрываемся сами, чтобы выкатка
  // не ждала таймаута.
  for (const сигнал of ['SIGTERM', 'SIGINT']) {
    process.on(сигнал, () => { console.log(`Получен ${сигнал}, останавливаюсь`); process.exit(0); });
  }
}
