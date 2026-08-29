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
import { createHmac, timingSafeEqual } from 'node:crypto';

import { собратьПроекты, страница } from './dashboard.mjs';
import { СТАДИИ } from './lib/stages.mjs';

const ПОРТ = Number(process.env.PORT) || 3000;

/*
  Общий пароль. На пульте видны названия клиентов, их сайты и то, каких
  доступов у нас нет.

  БЕЗ ПАРОЛЯ ПУЛЬТ ЗАКРЫТ. Раньше пустая переменная означала «пускать всех», а
  на странице висела красная полоса «пульт открыт всем». Полоса честная, но
  она предупреждает того, кто УЖЕ вошёл, — то есть ровно не того. Владелец
  29 августа: «закрой всем доступ по ссылке просто, только через пароль».
  Теперь пустая переменная означает «никого не пускать», и это правильная
  сторона ошибки: недоступный пульт заметят и починят за минуту, открытый —
  не заметят вовсе.
*/
const ПАРОЛЬ = process.env.DASHBOARD_TOKEN || '';

/** Имя печенья, в котором держится вход. */
const ПЕЧЕНЬЕ = 'castells_dash';

/** Сколько живёт вход, прежде чем пароль спросят снова. */
const СРОК = 30 * 24 * 60 * 60;   // 30 суток, в секундах

/**
 * Сравнение строк за постоянное время.
 *
 * Обычное `===` на несовпадении выходит на первом же разном символе, и по
 * времени ответа пароль подбирается посимвольно. Разницу длин проверяем
 * отдельно: timingSafeEqual на буферах разной длины бросает исключение.
 */
const равныБезопасно = (а, б) => {
  const А = Buffer.from(String(а), 'utf8');
  const Б = Buffer.from(String(б), 'utf8');
  return А.length === Б.length && timingSafeEqual(А, Б);
};

/*
  БИЛЕТ вместо пароля в печенье.

  Раньше в печенье лежал сам пароль. Он один на всех, не истекает и виден в
  инструментах браузера — то есть достаточно один раз заглянуть в чужой
  открытый ноутбук, чтобы унести общий пароль насовсем.

  Билет — это срок годности и подпись этого срока паролем: `<до>.<подпись>`.
  Пароль из билета не восстанавливается, чужой билет не подделывается без
  пароля, а через тридцать суток он просто перестаёт действовать. Смена
  пароля разом обнуляет все выданные билеты — подписи перестают сходиться.
*/
const подпись = до => createHmac('sha256', ПАРОЛЬ).update(String(до)).digest('hex');
const выдатьБилет = () => {
  const до = Math.floor(Date.now() / 1000) + СРОК;
  return `${до}.${подпись(до)}`;
};
const билетГоден = билет => {
  const [до, подп] = String(билет || '').split('.');
  if (!до || !подп) return false;
  if (!/^\d+$/.test(до)) return false;
  if (Number(до) <= Math.floor(Date.now() / 1000)) return false;
  return равныБезопасно(подп, подпись(до));
};

const разобратьПеченье = строка =>
  Object.fromEntries(
    String(строка || '')
      .split(';')
      .map(кусок => кусок.trim().split('='))
      .filter(пара => пара.length === 2)
      .map(([имя, значение]) => [имя, decodeURIComponent(значение)]),
  );

/**
 * Пускать ли. Способов ДВА, и оба требуют пароль:
 *   билет в печенье — человек, который ввёл пароль в форму;
 *   заголовок       — программа, которая ходит в /api/projects.
 *
 * ВХОДА ПО ССЫЛКЕ БОЛЬШЕ НЕТ. Раньше третьим способом был `?token=` в адресе,
 * и он же был первым входом: ссылку с паролем можно было переслать, и она
 * открывала пульт у кого угодно. Пароль при этом оседал в истории браузера, в
 * журналах посредников и в заголовке Referer при переходе на любой внешний
 * адрес. Убрано целиком по прямому требованию владельца 29 августа.
 *
 * Заголовок оставлен: это не ссылка, переслать его случайно нельзя, а без
 * него агенты не смогут читать /api/projects — ради чего этот адрес и есть.
 */
const пропустить = запрос => {
  if (!ПАРОЛЬ) return false;
  const заголовок = запрос.headers.authorization || '';
  if (заголовок.startsWith('Bearer ') && равныБезопасно(заголовок.slice(7), ПАРОЛЬ)) return true;
  return билетГоден(разобратьПеченье(запрос.headers.cookie)[ПЕЧЕНЬЕ]);
};

/**
 * Страница входа. Форма вместо голого «401»: по голому коду человек не
 * понимает, что делать, и пишет «у меня не открывается».
 *
 * ОТПРАВКА POST, А НЕ GET. Прежняя форма отправляла пароль методом GET, то
 * есть сама же дописывала его в адресную строку — ровно то, от чего мы
 * уходим. POST кладёт пароль в тело запроса: он не попадает ни в адрес, ни в
 * историю, ни в журнал сервера.
 *
 * Оформление — из живого кабинета Mosco (globals.css, блок .dark, и шкала
 * .dashboard-font). Вписано руками намеренно: страница отдаётся до сборки
 * пульта и не должна тянуть его модули. Значения те же, что в lib/theme.mjs;
 * если они разойдутся, это заметит самопроверка.
 */
const страницаВхода = (ошибка = '') => `<!doctype html><meta charset="utf-8">
<title>Пульт Castells</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<style>
  :root{color-scheme:dark;
        --ground:#171717;--surface:#212121;--sunk:#2a2a2a;
        --ink:#ffffff;--muted:#999999;--hair:rgba(255,255,255,.14);
        --accent:#08A2FF;--no:#EF4444;}
  *{box-sizing:border-box;}
  body{margin:0;min-height:100dvh;display:grid;place-items:center;
       background:var(--ground);color:var(--ink);-webkit-font-smoothing:antialiased;
       font:14px/1.3 "DM Sans",system-ui,-apple-system,sans-serif;padding:24px;}
  form{background:var(--surface);border:1px solid var(--hair);border-radius:20px;
       padding:28px;width:100%;max-width:360px;}
  .mark{width:32px;height:32px;border-radius:9999px;background:var(--accent);color:#fff;
        display:flex;align-items:center;justify-content:center;font:700 13px/1 "DM Sans",system-ui,sans-serif;
        margin-bottom:16px;}
  h1{font-size:20px;font-weight:700;letter-spacing:-.01em;margin:0 0 6px;}
  p{color:var(--muted);margin:0 0 18px;font-size:13px;}
  label{display:block;font-size:11px;font-weight:500;color:var(--muted);margin-bottom:6px;}
  input{width:100%;height:40px;padding:0 12px;border:1px solid var(--hair);border-radius:14px;
        background:var(--sunk);color:var(--ink);font:inherit;}
  button{margin-top:14px;width:100%;height:40px;border:0;border-radius:14px;
         background:var(--accent);color:#fff;font:500 14px "DM Sans",system-ui,sans-serif;cursor:pointer;}
  button:hover{background:#0076BF;}
  .err{color:var(--no);font-size:13px;margin:0 0 14px;}
  input:focus-visible,button:focus-visible{outline:none;
        box-shadow:0 0 0 2px var(--surface),0 0 0 4px rgba(8,162,255,.6);}
</style>
<form method="post" action="/login">
  <div class="mark" aria-hidden="true">C</div>
  <h1>Пульт Castells</h1>
  <p>Введите пароль. Вход запомнится в этом браузере на 30 дней.</p>
  ${ошибка ? `<p class="err">${ошибка}</p>` : ''}
  <label for="t">Пароль</label>
  <input id="t" name="password" type="password" autofocus autocomplete="current-password" required>
  <button type="submit">Войти</button>
</form>`;

/*
  Страница «пароль не задан». Отдаётся вместо пульта, когда переменной нет.
  Раньше в этом случае пульт открывался всем и предупреждал полосой сверху —
  предупреждая ровно того, кто уже вошёл.
*/
const ЗАКРЫТО = `<!doctype html><meta charset="utf-8">
<title>Пульт закрыт</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<body style="margin:0;min-height:100dvh;display:grid;place-items:center;background:#171717;color:#fff;
             font:14px/1.4 system-ui,-apple-system,sans-serif;padding:24px;text-align:center">
  <div style="max-width:420px">
    <h1 style="font-size:19px;margin:0 0 8px">Пульт закрыт</h1>
    <p style="color:#999;margin:0">Пароль не задан на сервере. Задайте переменную
    <code>DASHBOARD_TOKEN</code> в настройках сервиса и перезапустите его.</p>
  </div>
</body>`;

/*
  ЗАЩИТА ОТ ПОДБОРА. Пароль здесь один на всех и живёт долго, поэтому без
  ограничителя его можно спокойно перебирать: сервер отвечает быстро и
  бесконечно. Считаем неудачные попытки по адресу обратившегося.

  Счётчик в памяти процесса, и это осознанно: перезапуск его обнуляет, а при
  нескольких экземплярах у каждого свой. Для общего пароля на четыре
  человека этого достаточно, а хранилище ради счётчика — лишняя часть,
  которую придётся чинить. Ограничение названо прямо, а не выдано за полную
  защиту.
*/
const ПОПЫТОК = 10;
const ОКНО = 15 * 60 * 1000;
const попытки = new Map();

const адрес = запрос =>
  String(запрос.headers['x-forwarded-for'] || '').split(',')[0].trim()
  || запрос.socket.remoteAddress || 'неизвестно';

const заблокирован = кто => {
  const запись = попытки.get(кто);
  if (!запись) return false;
  if (Date.now() - запись.когда > ОКНО) { попытки.delete(кто); return false; }
  return запись.сколько >= ПОПЫТОК;
};

const считатьПромах = кто => {
  const запись = попытки.get(кто);
  if (!запись || Date.now() - запись.когда > ОКНО) {
    попытки.set(кто, { сколько: 1, когда: Date.now() });
  } else {
    запись.сколько += 1;
  }
};

/** Тело запроса целиком, с потолком: без него любой может прислать гигабайт. */
const прочитатьТело = запрос =>
  new Promise((готово, сорвалось) => {
    const куски = [];
    let размер = 0;
    запрос.on('data', кусок => {
      размер += кусок.length;
      if (размер > 4096) { сорвалось(new Error('слишком длинное тело запроса')); запрос.destroy(); return; }
      куски.push(кусок);
    });
    запрос.on('end', () => готово(Buffer.concat(куски).toString('utf8')));
    запрос.on('error', сорвалось);
  });

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

  /* Пароля нет на сервере — закрыто для всех, и сказано почему. */
  if (!ПАРОЛЬ) {
    return отдать(ответ, 503, 'text/html; charset=utf-8', ЗАКРЫТО);
  }

  /* Проверка пароля из формы. Отдельный адрес и только POST. */
  if (путь === '/login') {
    if (запрос.method !== 'POST') {
      ответ.writeHead(303, { Location: '/' });
      return ответ.end();
    }
    const кто = адрес(запрос);
    if (заблокирован(кто)) {
      return отдать(ответ, 429, 'text/html; charset=utf-8',
        страницаВхода('Слишком много попыток. Попробуйте через четверть часа.'));
    }
    let тело = '';
    try { тело = await прочитатьТело(запрос); }
    catch { return отдать(ответ, 400, 'text/plain; charset=utf-8', 'Слишком длинный запрос'); }

    const введён = new URLSearchParams(тело).get('password') || '';
    if (!равныБезопасно(введён, ПАРОЛЬ)) {
      считатьПромах(кто);
      /* Задержка на неверном пароле: она не мешает человеку, который ошибся
         раз, и заметно бьёт по перебору. */
      await new Promise(готово => setTimeout(готово, 400));
      return отдать(ответ, 401, 'text/html; charset=utf-8', страницаВхода('Пароль не подошёл.'));
    }

    попытки.delete(кто);
    /* 303, а не 302: после POST браузер обязан перейти на новый адрес именно
       методом GET, иначе обновление страницы повторит отправку формы. */
    ответ.writeHead(303, {
      Location: '/',
      'Set-Cookie': `${ПЕЧЕНЬЕ}=${выдатьБилет()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${СРОК}`,
    });
    return ответ.end();
  }

  /* Выход: гасим билет. Нужен, чтобы уйти с чужого или общего компьютера. */
  if (путь === '/logout') {
    ответ.writeHead(303, {
      Location: '/',
      'Set-Cookie': `${ПЕЧЕНЬЕ}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    });
    return ответ.end();
  }

  if (!пропустить(запрос)) {
    // Для программ — понятный текст, для людей — форма. Различаем по тому,
    // просит ли клиент HTML.
    const этоЧеловек = (запрос.headers.accept || '').includes('text/html');
    return этоЧеловек
      ? отдать(ответ, 401, 'text/html; charset=utf-8', страницаВхода())
      : отдать(ответ, 401, 'text/plain; charset=utf-8', 'Нужен пароль: заголовок Authorization: Bearer …');
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
      const html = страница(проекты, когда);
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
      console.warn('DASHBOARD_TOKEN не задан — пульт ЗАКРЫТ для всех, отдаёт 503. Задайте переменную и перезапустите.');
    }
  });

  // Railway останавливает контейнер сигналом: закрываемся сами, чтобы выкатка
  // не ждала таймаута.
  for (const сигнал of ['SIGTERM', 'SIGINT']) {
    process.on(сигнал, () => { console.log(`Получен ${сигнал}, останавливаюсь`); process.exit(0); });
  }
}
