import React, { useState, useCallback } from 'react';
import { m as motion } from 'framer-motion';
import AnimatedThemeToggler from '../ui/AnimatedThemeToggler';
import { Button } from '../ui/Button';
import { PageView } from '../../App';
import {
  ServicesPanel,
  IndustriesPanel,
  AcademyPanel,
  WorkPanel,
  LearnPanel,
} from './HeaderPanels';
import { NavigationData } from '../../types';
import { Navbar, NavBody, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '../ui/ResizableNavbar';
import Search from '../ui/Search';
import { HEADER_SECTIONS } from '../../data/navigation';
import { cn } from '../../lib/utils';

/*
  Шапка.

  23 августа 2026 её переписали с пяти выпадающих списков на плоский ряд.
  Причина была верной: списки раздавали сорок страниц услуг и ниш как равные,
  а в мобильной версии два десятка пунктов вели на якоря #services и
  #industries, которых на странице нет.

  Но перевес получился в другую сторону. За следующий день на сайте появились
  /industries, /learn и /blog, их добавили в подвал и в разметку для робота, а
  шапку не тронули. Робот видел восемь разделов, человек пять. Три раздела
  нельзя было найти сверху ни на одной странице.

  Поэтому список пунктов больше не живёт здесь. Он один на весь сайт и лежит в
  data/navigation.ts, откуда его читают шапка, подвал и генератор статических
  страниц. Разъехаться им теперь нечем.
*/

interface NavBarProps {
  onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const NavBar: React.FC<NavBarProps> = React.memo(({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const перейти = useCallback(
    (event: React.MouseEvent, page: PageView) => {
      event.preventDefault();
      onNavigate?.(page);
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  const домой = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      onNavigate?.('home');
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  /* Поиск умеет открывать любую страницу, включая те, которых нет в меню. */
  const изПоиска = useCallback(
    (url: string) => {
      if (url === '/') return onNavigate?.('home');
      if (url.startsWith('/services/')) return onNavigate?.('service', { id: url.replace('/services/', '') });
      if (url.startsWith('/industries/')) return onNavigate?.('industry', { id: url.replace('/industries/', '') });
      if (url.startsWith('/blog/')) return onNavigate?.('blog-post', { id: url.replace('/blog/', '') });
      if (url.startsWith('/case-studies/')) return onNavigate?.('case-study', { id: url.replace('/case-studies/', '') });
      if (url.startsWith('/learn/')) return onNavigate?.('answer', { id: url.replace('/learn/', '') });
      const карта: Record<string, PageView> = {
        '/about': 'about',
        '/work': 'work',
        '/services': 'services',
        '/pricing': 'pricing',
        '/blog': 'blog',
        '/contact': 'contact',
        '/team': 'team',
        '/industries': 'industries',
        '/learn': 'learn',
        '/roseville-marketing-agency': 'roseville',
      };
      const page = карта[url];
      if (page) onNavigate?.(page);
    },
    [onNavigate]
  );

  const пунктКласс =
    'text-sm font-medium text-text-secondary hover:text-text-primary dark:hover:text-white transition-colors px-2.5 py-2 cursor-pointer';

  return (
    <Navbar>
      {/* ── Десктоп ── */}
      <NavBody>
        <motion.div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={домой}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <motion.img
            src="/castells-logo.webp"
            alt="Castells Logo"
            width={127}
            height={144}
            className="w-12 h-12 object-contain brightness-0 dark:brightness-0 dark:invert"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            loading="eager"
            fetchPriority="high"
          />
          <span className="font-display text-4xl font-bold text-black dark:text-white tracking-tight leading-none flex items-center">
            Caste//s
          </span>
        </motion.div>

        <div className="flex items-center gap-6">
          <nav className="flex items-center" aria-label="Основные разделы">
            {/*
              ПАНЕЛИ ПОЛУЧАЮТ НЕ ВСЕ ПУНКТЫ, а только те, за которыми стоит
              больше одной страницы. Панель на одну страницу — дверь в пустую
              комнату, поэтому цены, о нас и контакты остаются ссылками.

              Список пунктов по-прежнему один (data/navigation.ts): панель
              добавляет пункту глубину, а не заменяет его. Ширина строки не
              меняется — это главная причина, по которой такое меню подошло при
              898 занятых точках из 1009.
            */}
            {HEADER_SECTIONS.map((раздел) => {
              const общее = { onNavigate: (p: PageView, d?: NavigationData) => onNavigate?.(p, d), itemClass: пунктКласс };
              if (раздел.page === 'work') return <WorkPanel key={раздел.page} {...общее} />;
              if (раздел.page === 'services') return <ServicesPanel key={раздел.page} {...общее} />;
              if (раздел.page === 'industries') return <IndustriesPanel key={раздел.page} {...общее} />;
              if (раздел.page === 'learn') return <LearnPanel key={раздел.page} {...общее} />;
              if (раздел.page === 'academy') return <AcademyPanel key={раздел.page} {...общее} />;
              return (
                <a
                  key={раздел.page}
                  href={раздел.href}
                  onClick={(e) => перейти(e, раздел.page)}
                  className={пунктКласс}
                >
                  {раздел.label}
                </a>
              );
            })}
          </nav>

          <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-1" />

          <div className="flex items-center gap-3">
            <Search onNavigate={изПоиска} />
            <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 rounded-full" />
            <Button
              href="/contact"
              size="sm"
              className="hidden lg:flex"
              onClick={(e) => перейти(e, 'contact')}
            >
              Talk to us
            </Button>
          </div>
        </div>
      </NavBody>

      {/* ── Телефон ── */}
      <MobileNav>
        <MobileNavHeader>
          <div className="flex items-center gap-2 cursor-pointer" onClick={домой}>
            <img
              src="/castells-logo.webp"
              alt="Castells Logo"
              width="127"
              height="144"
              className="w-8 h-8 object-contain"
              loading="eager"
              fetchPriority="high"
            />
            <span className="font-display text-2xl font-bold text-text-primary tracking-tight">Caste//s</span>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center" />
            <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          {/* Те же разделы, что и на настольной версии: один список на всех. */}
          <nav className="grid gap-1" aria-label="Основные разделы">
            {HEADER_SECTIONS.map((раздел) => (
              <a
                key={раздел.page}
                href={раздел.href}
                onClick={(e) => перейти(e, раздел.page)}
                className={cn(
                  'block p-3 rounded-inner font-display text-xl text-text-primary',
                  'hover:bg-black/5 dark:hover:bg-white/5 transition-colors'
                )}
              >
                {раздел.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 mt-2 border-t border-black/5 dark:border-white/10">
            <Button href="/contact" size="sm" className="w-full" onClick={(e) => перейти(e, 'contact')}>
              Talk to us
            </Button>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
