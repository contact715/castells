import { PAGES, TITLE, DESCRIPTION, SITE, NOT_FOUND, HUBS } from '../scripts/page-meta.mjs';
import { findServiceBySlug } from '../data/services';
import { findIndustryBySlug } from '../data/industries';
import { findPostById } from '../data/blog';
import { findAnswer } from '../data/answers';
import { findLesson, findTrack } from '../data/academy';
import { CASE_STUDIES } from '../constants';

/*
  Заголовок, описание и канонический адрес по пути страницы.

  ЗАЧЕМ ЭТО ПОЯВИЛОСЬ 24 августа 2026. Сайт отдаёт готовый HTML на каждый из
  75 адресов, и в нём теги верные. Но при переходе ВНУТРИ сайта — по меню, без
  перезагрузки — страница менялась, а голова документа оставалась прежней.
  Замер на живом сайте: с главной прошёл Services → Prices → Learn → Contact,
  и на контактах название вкладки, описание и canonical всё ещё были от
  главной. То есть страница контактов объявляла себя главной.

  Для поиска это менее опасно, чем выглядит: робот, приходя на /contact,
  получает готовый HTML с верными тегами и по меню обычно не ходит. Опасно это
  для человека: закладка сохранится с чужим именем, а в истории браузера все
  страницы называются одинаково.

  ПОЧЕМУ НЕ ВЕРНУЛИ СТАРЫЙ КОМПОНЕНТ SEO. Его отключили в тот же день ровно
  потому, что он перебивал верные теги своими устаревшими и с выдуманными
  цифрами. Возврат второй копии заголовков дал бы тот же разъезд, что днём
  раньше дал три разных меню на одном сайте.

  ПОЭТОМУ ИСТОЧНИК ОДИН. Статические страницы берут заголовок из списка PAGES,
  динамические — из тех же шаблонов TITLE и DESCRIPTION, которыми пользуется
  генератор статических страниц. Данные тоже общие: услуги, ниши, статьи,
  ответы и кейсы читаются из тех же файлов. Разойтись двум сторонам нечем,
  кроме ошибки в самих шаблонах, а она сломает обе одинаково.
*/

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

interface СтатическаяСтраница {
  path: string;
  title: string;
  description: string;
}

const СТАТИЧЕСКИЕ = new Map<string, СтатическаяСтраница>(
  (PAGES as СтатическаяСтраница[]).map((p) => [p.path, p])
);

/*
  Хабы генератор собирает на лету, поэтому в PAGES их нет. Заголовки берём из
  того же общего источника, что и генератор: 26 августа они были вписаны здесь
  вручную, и сверка поймала расхождение на академии.
*/
const ХАБЫ = new Map<string, СтатическаяСтраница>(
  Object.values(HUBS as Record<string, СтатическаяСтраница>).map((h) => [h.path, h])
);

/*
  Неизвестный адрес. Первая версия возвращала здесь данные ГЛАВНОЙ, и проверка
  на живом сайте это поймала: по несуществующему адресу сервер отдавал «Page
  not found», а браузер писал во вкладку название главной. То есть при
  клиентском переходе на битую ссылку человек видел бы, что попал на главную,
  хотя не попал никуда.

  Правильный ответ — то же, что говорит сервер. Молчать о ненайденной странице
  хуже, чем показать её честно.
*/
const НЕ_НАЙДЕНО: СтатическаяСтраница = {
  path: NOT_FOUND.path,
  title: NOT_FOUND.title,
  description: NOT_FOUND.description,
};

/**
 * Отрезает завершающую косую черту, кроме корня: /work/ и /work — один адрес.
 */
const нормализовать = (pathname: string): string => {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
};

/**
 * Заголовок и описание для пути. Неизвестный путь возвращает «страница не
 * найдена» — то же, что отдаёт по нему сервер.
 */
export function metaForPath(pathname: string): PageMeta {
  const путь = нормализовать(pathname);
  const адрес = `${SITE.origin}${путь === '/' ? '/' : путь}`;

  const готовая = ХАБЫ.get(путь) ?? СТАТИЧЕСКИЕ.get(путь);
  if (готовая) {
    return { title: готовая.title, description: готовая.description, canonical: адрес };
  }

  if (путь.startsWith('/services/')) {
    // Искалка отдаёт пару «категория и элемент», нам нужен элемент.
    const найдено = findServiceBySlug(путь.slice('/services/'.length));
    if (найдено?.item) {
      return {
        title: TITLE.service(найдено.item.name),
        description: DESCRIPTION.service(найдено.item.description),
        canonical: адрес,
      };
    }
  }

  if (путь.startsWith('/industries/')) {
    const найдено = findIndustryBySlug(путь.slice('/industries/'.length));
    if (найдено?.item) {
      return {
        title: TITLE.industry(найдено.item.name),
        description: DESCRIPTION.industry(найдено.item.description),
        canonical: адрес,
      };
    }
  }

  if (путь.startsWith('/blog/')) {
    const статья = findPostById(Number(путь.slice('/blog/'.length)));
    if (статья) {
      return {
        title: TITLE.post(статья.title),
        description: DESCRIPTION.post(статья.excerpt),
        canonical: адрес,
      };
    }
  }

  if (путь.startsWith('/learn/')) {
    const ответ = findAnswer(путь.slice('/learn/'.length));
    if (ответ) {
      return {
        title: TITLE.answer(ответ.question),
        description: DESCRIPTION.answer(ответ.short),
        canonical: адрес,
      };
    }
  }

  if (путь.startsWith('/academy/')) {
    // /academy/<раздел> и /academy/<раздел>/<урок>
    const [ремесло, урокСлаг] = путь.slice('/academy/'.length).split('/').filter(Boolean);
    if (ремесло && урокСлаг) {
      const урок = findLesson(урокСлаг);
      if (урок) {
        return {
          title: TITLE.academyLesson(урок.title),
          description: DESCRIPTION.academyLesson(урок.summary),
          canonical: адрес,
        };
      }
    } else if (ремесло) {
      const раздел = findTrack(ремесло);
      if (раздел) {
        return {
          title: TITLE.academyTrack(раздел.name),
          description: DESCRIPTION.academyTrack(раздел.about),
          canonical: адрес,
        };
      }
    }
  }

  if (путь.startsWith('/case-studies/')) {
    const id = путь.slice('/case-studies/'.length);
    const кейс = CASE_STUDIES.find((c) => String(c.id) === id);
    if (кейс) {
      const где = [кейс.industry, кейс.location].filter(Boolean).join(', ');
      return {
        title: TITLE.caseStudy(кейс.client, кейс.industry),
        description: DESCRIPTION.caseStudy(кейс.description, кейс.client, где),
        canonical: адрес,
      };
    }
  }

  return { title: НЕ_НАЙДЕНО.title, description: НЕ_НАЙДЕНО.description, canonical: адрес };
}

/**
 * Записывает голову документа. Трогает ровно три тега — те, что расходились.
 * Остальные теги готового HTML не переписываются намеренно: чем меньше эта
 * сторона умеет менять, тем меньше ей есть чем соврать.
 */
export function applyPageMeta(pathname: string): void {
  if (typeof document === 'undefined') return;
  const мета = metaForPath(pathname);

  if (document.title !== мета.title) document.title = мета.title;

  const описание = document.querySelector('meta[name="description"]');
  if (описание && описание.getAttribute('content') !== мета.description) {
    описание.setAttribute('content', мета.description);
  }

  const канон = document.querySelector('link[rel="canonical"]');
  if (канон && канон.getAttribute('href') !== мета.canonical) {
    канон.setAttribute('href', мета.canonical);
  }
}
