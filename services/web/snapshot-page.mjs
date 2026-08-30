/*
  Страница-помощник для снятия снимков Yelp: инструкция и сама закладка.

  ПОЧЕМУ ЗАКЛАДКА, А НЕ РОБОТ. Yelp отвечает 403 и headless-браузеру, и обычному
  браузеру под управлением Playwright — проверено 30 августа. Обходить их защиту
  от ботов мы не станем: это чужой сервис и его правила. Поэтому карточку
  открывает человек, а закладка только снимает уже открытую страницу и
  отправляет цифры в пульт. Одно нажатие вместо переписывания руками.

  Закладка несёт УЗКИЙ ключ (YELP_SNAPSHOT_TOKEN), а не пароль пульта: она живёт
  в браузере, и однажды её кто-нибудь скопирует. Этот ключ умеет ровно одно —
  прислать снимок.
*/

import { экр } from './view/shell.mjs';
import { ШРИФТЫ } from './view/theme.mjs';

/**
 * Код закладки. Собирается в одну строку: браузеры не любят переносы в
 * javascript-ссылках, а некоторые панели закладок их просто обрезают.
 */
const кодЗакладки = (адресПульта, ключ) => `javascript:(function(){
  try{
    if(!/yelp\\./i.test(location.host)){alert('Откройте карточку клиента на Yelp и нажмите закладку там.');return;}
    var t=document.body.innerText;
    var ld=[].slice.call(document.querySelectorAll('script[type="application/ld+json"]')).map(function(s){try{return JSON.parse(s.textContent)}catch(e){return null}}).filter(Boolean);
    var b=ld.filter(function(o){return /LocalBusiness/i.test(String(o['@type']))})[0]||null;
    var agg=ld.map(function(o){return o.aggregateRating}).filter(Boolean)[0]||null;
    var z=document.title;
    var num=function(re,s){var m=(s||z).match(re);return m?Number(m[1]):null;};
    var снимок={
      адресYelp:location.href.split('?')[0],
      рейтинг:agg?Number(agg.ratingValue):null,
      отзывов:agg?Number(agg.reviewCount):0,
      скрытых:num(/(\\d+) reviews? that (?:is|are) not currently recommended/i,t),
      фото:num(/(\\d+)\\s+Photos?/i),
      заявлен:t.indexOf('Claimed')>-1,
      лицензия:t.indexOf('Verified License')>-1,
      гарантия:t.indexOf('Yelp Guaranteed')>-1,
      откликВремя:(t.match(/Response time\\s*([^\\n]{1,20})/)||[])[1]||null,
      откликСтавка:(t.match(/Response rate\\s*([^\\n]{1,10})/)||[])[1]||null,
      категории:(t.match(/Heating & Air Conditioning[^\\n]{0,60}/)||[])[0]||null,
      адрес:b&&b.address?[b.address.streetAddress,b.address.addressLocality,b.address.addressRegion,b.address.postalCode].filter(Boolean).join(', '):null,
      телефон:b?b.telephone||null:null,
      источник:'закладка'
    };
    fetch('${адресПульта}/api/yelp-snapshot',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer ${ключ}'},body:JSON.stringify(снимок)})
      .then(function(r){return r.json().then(function(j){return{s:r.status,j:j}})})
      .then(function(o){
        if(o.s===201){alert('Снимок принят: '+o.j.проект+'\\nРейтинг: '+(снимок.рейтинг===null?'нет':снимок.рейтинг)+', отзывов: '+снимок.отзывов);}
        else{alert('Не принято ('+o.s+'): '+(o.j&&o.j.причина?o.j.причина:''));}
      })
      .catch(function(e){alert('Не отправилось: '+e.message);});
  }catch(e){alert('Ошибка закладки: '+e.message);}
})();`.replace(/\n\s*/g, '');

/*
  Экранирование кода закладки для HTML-атрибута.

  Обычного `экр` мало и он тут не подходит: он превращает < и >, а ломает
  атрибут именно ДВОЙНАЯ КАВЫЧКА. В коде закладки она есть — например, в
  `querySelectorAll('script[type="application/ld+json"]')`. Без замены href
  закрывался на первой же такой кавычке, остаток кода вываливался на страницу
  текстом, а кнопка переставала работать. Поймано глазами на проде.

  Амперсанд заменяется ПЕРВЫМ: иначе он испортит уже вставленные `&quot;`.
*/
const вАтрибут = код => код
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

export const страницаСнимков = ({ адресПульта, ключ, проекты }) => {
  const строки = проекты
    .filter(п => п.профиль.yelp)
    .map(п => `<li><a href="${экр(п.профиль.yelp)}" target="_blank" rel="noopener">${экр(п.профиль.name)}</a>
      <span class="муть">${экр(п.профиль.yelp.replace(/^https?:\/\/(www\.)?/, ''))}</span></li>`)
    .join('');

  const безКарточки = проекты.filter(п => !п.профиль.yelp).map(п => экр(п.профиль.name)).join(', ');

  return `<!doctype html><meta charset="utf-8">
<title>Снять данные Yelp · Пульт Castells</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root{color-scheme:dark;--ground:#171717;--surface:#212121;--sunk:#2a2a2a;--ink:#fff;
        --muted:#999;--hair:rgba(255,255,255,.14);--accent:#08A2FF;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);padding:24px;
       font:15px/1.5 ${ШРИФТЫ.текст};-webkit-font-smoothing:antialiased;}
  main{max-width:760px;margin:0 auto}
  h1{font-size:24px;font-weight:700;letter-spacing:-.01em;margin:0 0 8px}
  h2{font-size:17px;font-weight:600;margin:28px 0 8px}
  p,li{color:#d6d6d6}
  .муть{color:var(--muted);font-size:13px}
  .карта{background:var(--surface);border:1px solid var(--hair);border-radius:20px;padding:20px;margin:16px 0}
  ol{padding-left:20px} ol li{margin:6px 0}
  ul{list-style:none;padding:0} ul li{padding:8px 0;border-top:1px solid rgba(255,255,255,.05)}
  a{color:var(--accent)}
  .кнопка{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;
          padding:12px 20px;border-radius:14px;font-weight:500;cursor:grab}
  code{background:var(--sunk);padding:2px 6px;border-radius:8px;font-size:13px}
</style>
<main>
  <h1>Снять данные Yelp</h1>
  <p>Yelp закрыт для роботов: он отвечает отказом и обычному, и «безголовому»
     браузеру. Обходить эту защиту мы не будем, поэтому карточку открываете вы,
     а закладка снимает уже открытую страницу и отправляет цифры в пульт.</p>

  <div class="карта">
    <h2>Один раз: поставить закладку</h2>
    <ol>
      <li>Включите панель закладок: <code>⌘⇧B</code> в Chrome.</li>
      <li>Перетащите синюю кнопку на панель закладок.</li>
    </ol>
    <p><a class="кнопка" href="${вАтрибут(кодЗакладки(адресПульта, ключ))}">Снять Yelp → пульт</a></p>
    <p class="муть">Нажатие прямо здесь ничего не сделает: закладка работает
       только на странице Yelp.</p>
  </div>

  <div class="карта">
    <h2>Каждый раз: снять снимок</h2>
    <ol>
      <li>Откройте карточку клиента (ссылки ниже).</li>
      <li>Нажмите закладку на панели.</li>
      <li>Появится окошко: принято, чей это клиент и какие цифры.</li>
    </ol>
    <h2>Карточки клиентов</h2>
    <ul>${строки || '<li class="муть">Ни у одного клиента не указан адрес карточки Yelp.</li>'}</ul>
    ${безКарточки ? `<p class="муть">Без карточки Yelp в профиле: ${безКарточки}.
      Чтобы снимок нашёл клиента, впишите адрес в поле <code>yelp</code> его профиля.</p>` : ''}
  </div>

  <p class="муть">Снимки копятся: пульт показывает последний и разницу с
     предыдущим. Снимать раз в месяц перед отчётом достаточно.</p>
</main>`;
};
