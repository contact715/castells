import { PageView } from '../types';

/*
  Разделы сайта. ОДИН источник правды для трёх меню сразу.

  Почему файл появился 24 августа 2026. На сайте было три независимых списка
  разделов, и все три говорили разное:

    шапка (человек)      — 5 пунктов: Work, Services, Prices, About, Contact
    подвал (человек)     — 7 пунктов: те же плюс Industries и Answers
    пререндер (робот)    — 8 пунктов: те же плюс Notes

  То есть поисковый робот видел на сайте восемь разделов, а живой посетитель
  пять. Ровно тот же разъезд между роботом и человеком, который уже чинили
  23 августа в другом месте (коммит e24f516).

  Разошлись они не случайно и не по невнимательности. Копия правды разъезжается
  всегда, вопрос только срока: 23 августа шапку переписали и списки совпадали,
  а 24-го появились /industries, /learn и /blog, и обновили два списка из трёх.

  Поэтому список теперь один. Добавить раздел на сайт можно только здесь, и он
  сразу появится во всех трёх меню. Убрать — так же.

  Поле header отвечает на вопрос «влезает ли в одну строку наверху». Замер при
  ширине окна 1024 (с неё начинается настольное меню): под пункты остаётся
  около 470 точек, семь пунктов занимают 453. Восьмой не влезает, поэтому
  журнал и страницы команды живут в подвале, где места сколько угодно.
*/

export interface Раздел {
  label: string;
  page: PageView;
  href: string;
  /** Показывать в шапке. В подвале и в разметке для робота есть всё. */
  header: boolean;
}

export const SECTIONS: Раздел[] = [
  { label: 'Work', page: 'work', href: '/work', header: true },
  { label: 'Services', page: 'services', href: '/services', header: true },
  { label: 'Industries', page: 'industries', href: '/industries', header: true },
  { label: 'Prices', page: 'pricing', href: '/pricing', header: true },
  { label: 'Learn', page: 'learn', href: '/learn', header: true },
  { label: 'About', page: 'about', href: '/about', header: true },
  { label: 'Contact', page: 'contact', href: '/contact', header: true },

  // Ниже — только подвал и разметка для робота.
  //
  // Академия добавлена 26 августа 2026. В шапку не влезает: там уже семь
  // пунктов и 453 точки из примерно 470 доступных при ширине окна 1024.
  // Восьмой пункт сломал бы строку — это замер, а не осторожность.
  { label: 'Academy', page: 'academy', href: '/academy', header: false },
  { label: 'Notes', page: 'blog', href: '/blog', header: false },
  { label: 'Team', page: 'team', href: '/team', header: false },
  { label: 'Roseville', page: 'roseville', href: '/roseville-marketing-agency', header: false },
];

export const LEGAL: Раздел[] = [
  { label: 'Privacy', page: 'privacy-policy', href: '/privacy-policy', header: false },
  { label: 'Terms', page: 'terms', href: '/terms', header: false },
  { label: 'Cookies', page: 'cookie-policy', href: '/cookie-policy', header: false },
];

/** Пункты шапки. */
export const HEADER_SECTIONS = SECTIONS.filter((р) => р.header);
