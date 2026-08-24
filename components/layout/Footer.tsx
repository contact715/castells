import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Instagram, Threads, Facebook } from '../ui/icons/SocialIcons';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { SECTIONS, LEGAL } from '../../data/navigation';

/*
  Подвал, переписанный 22 августа 2026. Владелец: «подвал тоже почисти».

  Что здесь было: 57 ссылок. Четыре колонки услуг по пять штук, четыре
  колонки ниш по пять штук, и блоки, где надпись не совпадала с адресом:

    «Whitepapers» и «Playbooks»  → вели на блог, таких материалов нет
    «Partner Program»            → вело на страницу компании
    «Free Growth Audit», «Get a Quote», «Schedule a Call» → три разных
                                   названия одной и той же страницы контактов

  Плюс форма подписки на рассылку: она отправляла адрес на /api/contact,
  а такого обработчика в проекте нет и маршрута в vercel.json тоже.
  Проверено на живом сайте — 404. То есть человек оставлял почту в никуда.

  Стало: разделы верхнего уровня, телефон, почта, адрес, три соцсети и три
  юридические страницы. До конкретной услуги или ниши человек доходит через
  хаб, а не через список из двадцати пунктов в подвале.

  Правка 24 августа: список разделов больше не лежит здесь. Он один на весь
  сайт, в data/navigation.ts, и его же читают шапка и генератор статических
  страниц. До этой правки подвал знал о семи разделах, шапка о пяти, а робот
  о восьми — три копии одного факта разъехались за сутки.

  Подвал показывает ВСЕ разделы, включая те, что не влезли в шапку: журнал,
  страницу команды и локальную страницу Roseville. Здесь места сколько угодно,
  и здесь же для робота лежит полный путь к каждому разделу с любой страницы.
*/

interface FooterProps {
  onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const SOCIAL = [
  { label: 'Castells in Instagram', href: 'https://www.instagram.com/castells.media/', Icon: Instagram },
  { label: 'Castells in Threads', href: 'https://www.threads.com/@castells.media', Icon: Threads },
  { label: 'Castells in Facebook', href: 'https://www.facebook.com/castells.media', Icon: Facebook },
];

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: PageView, data?: NavigationData) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, data);
    }
  };

  const linkClass =
    'text-sm text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors';

  return (
    <footer className="relative bg-ivory dark:bg-[#191919] text-black dark:text-white">
      <div className="container mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1fr] gap-10 md:gap-12 pb-10 border-b border-black/10 dark:border-white/10">

          {/* Кто мы */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/castells-logo.webp"
                alt="Castells Logo"
                width="127"
                height="144"
                className="w-9 h-9 object-contain"
                loading="lazy"
              />
              <span className="font-display font-bold text-2xl tracking-tight text-text-primary dark:text-white">
                Castells.
              </span>
            </div>
            <p className="text-sm text-text-secondary dark:text-white/60 max-w-xs leading-relaxed">
              Websites, ads and automation for home service businesses across the US.
            </p>
          </div>

          {/* Разделы */}
          <nav aria-label="Footer">
            <h4 className="text-[11px] font-bold tracking-wide text-accent-text mb-4">
              Sections
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {SECTIONS.map((item) => (
                <a
                  key={item.page}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.page)}
                  className={linkClass}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Как связаться */}
          <div>
            <h4 className="text-[11px] font-bold tracking-wide text-accent-text mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+19166196006" className={`${linkClass} inline-flex items-center gap-2`}>
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                +1 (916) 619-6006
              </a>
              <a href="mailto:contact@castells.media" className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                contact@castells.media
              </a>
              {/* Адрес ведёт на страницу города: для человека это самый
                  естественный вход, для поиска — связь конторы с местом. */}
              <a
                href="/roseville-marketing-agency"
                onClick={(e) => handleNav(e, 'roseville')}
                className={`${linkClass} inline-flex items-start gap-2`}
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                1298 Antelope Creek Drive, Roseville, California
              </a>
            </div>

            <div className="flex gap-1 mt-5 -ml-2.5">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-[11px] text-text-secondary dark:text-white/60 tracking-wide">
            © {new Date().getFullYear()} Castells Media Inc.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-text-secondary dark:text-white/60">
            {LEGAL.map((item) => (
              <a
                key={item.page}
                href={item.href}
                onClick={(e) => handleNav(e, item.page)}
                className="hover:text-text-primary dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
