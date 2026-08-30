#!/usr/bin/env node
/*
  Снять снимок публичной карточки Yelp и отправить его в пульт.

    node services/tools/yelp-snapshot.mjs --файл снимок.json
    cat снимок.json | node services/tools/yelp-snapshot.mjs
    node services/tools/yelp-snapshot.mjs --файл с.json --куда http://localhost:3187

  ПОЧЕМУ ДАННЫЕ ПРИХОДЯТ ИЗВНЕ, А НЕ СОБИРАЮТСЯ ЗДЕСЬ. Публичного ключа к
  Yelp Fusion у нас НЕТ — проверено 30 августа: ключи в бэкенде Mosco
  (YELP_CLIENT_ID / YELP_CLIENT_SECRET) относятся к Partner API про ЛИДЫ, их
  OAuth принимает только authorization_code, а Fusion требует отдельный
  Bearer-ключ на 128 символов. Ответ Yelp дословно:
  «'client_credentials' is not one of ['authorization_code', 'refresh_token']».

  Скрести страницу с сервера тоже нельзя: Yelp отдаёт 403 всему, что не похоже
  на браузер. Поэтому снимок снимается браузером (код разбора ниже), а этот
  инструмент его принимает и отправляет. Как только появится ключ Fusion,
  сюда добавляется один запрос — остальное уже готово: и приём, и хранение,
  и показ.

  РАЗБОР СТРАНИЦЫ ДЛЯ БРАУЗЕРА. Открыть карточку Yelp и выполнить в консоли:

    (() => {
      const t = document.body.innerText;
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map(s => { try { return JSON.parse(s.textContent) } catch { return null } })
        .filter(Boolean);
      const b = ld.find(o => String(o['@type']).match(/LocalBusiness/i));
      const агр = ld.map(o => o.aggregateRating).filter(Boolean)[0];
      const заг = document.title;
      return JSON.stringify({
        проект: 'ЗАПОЛНИТЬ-СЛАГ-КЛИЕНТА',
        адресYelp: location.href.split('?')[0],
        рейтинг: агр ? Number(агр.ratingValue) : null,
        отзывов: агр ? Number(агр.reviewCount) : 0,
        скрытых: Number((t.match(/(\d+) reviews? that (?:is|are) not currently recommended/i) || [])[1]) || null,
        фото: Number((заг.match(/(\d+)\s+Photos?/i) || [])[1]) || null,
        заявлен: t.includes('Claimed'),
        лицензия: t.includes('Verified License'),
        гарантия: t.includes('Yelp Guaranteed'),
        откликВремя: (t.match(/Response time\s*([^\n]{1,20})/) || [])[1] || null,
        откликСтавка: (t.match(/Response rate\s*([^\n]{1,10})/) || [])[1] || null,
        категории: (t.match(/Heating & Air Conditioning[^\n]{0,60}/) || [])[0] || null,
        адрес: b?.address ? `${b.address.streetAddress}, ${b.address.addressLocality}, ${b.address.addressRegion} ${b.address.postalCode}` : null,
        телефон: b?.telephone || null,
        источник: 'страница',
      }, null, 2);
    })()

  ВАЖНО ПРО «ОТЗЫВОВ 0». У карточки без рекомендованных отзывов рейтинга не
  существует вовсе — это НЕ ноль. Поэтому рейтинг здесь null, а отзывов 0:
  пульт различает эти два состояния и рисует их по-разному.
*/

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ПУЛЬТ_ПО_УМОЛЧАНИЮ = 'https://services-dashboard-production.up.railway.app';

const довод = имя => {
  const i = process.argv.indexOf(имя);
  return i > -1 ? process.argv[i + 1] : null;
};

/** Тело со стандартного входа — чтобы можно было передать конвейером. */
const соВхода = () =>
  new Promise((готово, сорвалось) => {
    let буфер = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', к => { буфер += к; });
    process.stdin.on('end', () => готово(буфер));
    process.stdin.on('error', сорвалось);
  });

export async function отправить(снимок, куда, пароль) {
  const ответ = await fetch(`${куда}/api/yelp-snapshot`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${пароль}` },
    body: JSON.stringify(снимок),
  });
  return { код: ответ.status, тело: await ответ.text() };
}

async function главная() {
  const путь = довод('--файл');
  const куда = довод('--куда') || ПУЛЬТ_ПО_УМОЛЧАНИЮ;
  const пароль = process.env.DASHBOARD_TOKEN || '';

  if (!пароль) {
    console.error('Нужен пароль пульта: DASHBOARD_TOKEN=... node services/tools/yelp-snapshot.mjs …');
    process.exit(2);
  }

  const сырое = путь ? await readFile(путь, 'utf8') : await соВхода();
  let снимки;
  try {
    const разобрано = JSON.parse(сырое);
    снимки = Array.isArray(разобрано) ? разобрано : [разобрано];
  } catch (e) {
    console.error('Не разобрал JSON:', e.message);
    process.exit(1);
  }

  let принято = 0;
  for (const снимок of снимки) {
    if (!снимок?.проект || !снимок?.адресYelp) {
      console.error(`Пропущен снимок без «проект» или «адресYelp»: ${JSON.stringify(снимок).slice(0, 80)}`);
      continue;
    }
    const { код, тело } = await отправить(снимок, куда, пароль);
    const ок = код === 201;
    if (ок) принято += 1;
    console.log(`${ок ? '✓' : '✗'} ${снимок.проект}: ${код} ${ок ? '' : тело.slice(0, 120)}`);
  }

  console.log(`\nПринято ${принято} из ${снимки.length}.`);
  /* Ненулевой код возврата на неполную отправку: инструмент, который в любом
     случае говорит «готово», нельзя поставить в расписание. */
  process.exit(принято === снимки.length ? 0 : 1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  главная().catch(e => { console.error(e); process.exit(1); });
}
