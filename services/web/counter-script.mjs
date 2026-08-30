/*
  Скрипт счётчика — то, что вставляется на сайт клиента одной строкой:

      <script defer src="https://<пульт>/c.js"></script>

  ТРИ ОГРАНИЧЕНИЯ, КОТОРЫЕ ОПРЕДЕЛИЛИ ВЕСЬ ВИД ЭТОГО КОДА.

  1. Он выполняется на ЧУЖОМ сайте. Любая его ошибка — ошибка в консоли
     клиента и, возможно, сломанная страница. Поэтому всё тело обёрнуто в
     try/catch, и ни одна ветка не бросает наружу.

  2. Он не должен требовать баннера про cookie. Значит: ни cookie, ни
     localStorage, ни идентификаторов. Кто такой посетитель, решает сервер по
     суточному отпечатку, который нельзя связать со вчерашним.

  3. Запрос обязан быть ПРОСТЫМ по правилам браузера, иначе перед каждым
     событием полетит лишний предварительный запрос. Поэтому тип содержимого
     text/plain, хотя внутри JSON: с application/json браузер потребовал бы
     preflight на каждый просмотр страницы.

  Отдельно про sendBeacon: он переживает уход со страницы, а обычный запрос в
  этот момент браузер отменяет. Для счётчика это принципиально — самый
  частый сценарий как раз «посмотрел и ушёл».
*/

export const СКРИПТ_СЧЁТЧИКА = `(function () {
  try {
    var адрес = new URL('/collect', document.currentScript && document.currentScript.src
      ? document.currentScript.src : location.href).href;
    var последний = '';

    function послать() {
      try {
        if (location.href === последний) return;   // один просмотр — одно событие
        последний = location.href;
        var тело = JSON.stringify({ u: location.href, r: document.referrer || '' });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(адрес, new Blob([тело], { type: 'text/plain;charset=UTF-8' }));
        } else {
          fetch(адрес, {
            method: 'POST',
            body: тело,
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            keepalive: true,
            mode: 'cors',
          }).catch(function () {});
        }
      } catch (e) {}
    }

    послать();

    /* Сайты на одной странице меняют адрес без перезагрузки. Без этих трёх
       строк такой сайт дал бы один просмотр за весь визит. */
    var было = history.pushState;
    history.pushState = function () { было.apply(this, arguments); послать(); };
    window.addEventListener('popstate', послать);
  } catch (e) {}
})();`;
