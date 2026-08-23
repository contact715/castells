import React, { useState, useCallback } from 'react';
import { m as motion } from 'framer-motion';
import AnimatedThemeToggler from '../ui/AnimatedThemeToggler';
import { Button } from '../ui/Button';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import { Navbar, NavBody, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '../ui/ResizableNavbar';
import Search from '../ui/Search';
import { cn } from '../../lib/utils';

/*
  Шапка, переписана 23 августа 2026.

  Что было. Пять пунктов с выпадающими списками: Cases, Services, Industries,
  Company, Prices. Внутри Services раскрывались двадцать услуг, внутри
  Industries двадцать ниш, внутри Company ещё пять ссылок. Файл на 805 строк.

  Три причины переписать:

  1. Названия не совпадали с сайтом. «Cases» вело на /work, «Company» на
     страницу компании, а разделов About и Contact в шапке не было вовсе, хотя
     в подвале они есть. Человек ищет «контакты» и не находит их наверху.

  2. Выпадающие списки раздавали то, чего мы сами не индексируем. Из двадцати
     ниш нашими клиентами обеспечены две, из двадцати услуг в поиск идут восемь.
     Меню предлагало все сорок как равные.

  3. В мобильном меню десятки пунктов вели на якоря #services и #industries,
     которых на странице нет. То есть на телефоне меню выглядело богатым, а
     нажатия не делали ничего. Проверено: таких мёртвых ссылок было больше
     двадцати.

  Стало пять пунктов без вложенности, одинаковых на всех экранах: Work,
  Services, Prices, About, Contact. Ровно те же разделы, что в подвале. До
  конкретной услуги или ниши человек доходит через хаб, как и задумано.
*/

interface NavBarProps {
  onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const РАЗДЕЛЫ: { label: string; page: PageView; href: string }[] = [
  { label: 'Work', page: 'work', href: '/work' },
  { label: 'Services', page: 'services', href: '/services' },
  { label: 'Prices', page: 'pricing', href: '/pricing' },
  { label: 'About', page: 'about', href: '/about' },
  { label: 'Contact', page: 'contact', href: '/contact' },
];

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
      const карта: Record<string, PageView> = {
        '/about': 'about',
        '/work': 'work',
        '/services': 'services',
        '/pricing': 'pricing',
        '/blog': 'blog',
        '/contact': 'contact',
        '/team': 'team',
        '/careers': 'careers',
        '/company': 'company',
        '/industries': 'industries',
      };
      const page = карта[url];
      if (page) onNavigate?.(page);
    },
    [onNavigate]
  );

  const пунктКласс =
    'text-sm font-medium text-text-secondary hover:text-text-primary dark:hover:text-white transition-colors px-3 py-2 cursor-pointer';

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
            {РАЗДЕЛЫ.map((раздел) => (
              <a
                key={раздел.page}
                href={раздел.href}
                onClick={(e) => перейти(e, раздел.page)}
                className={пунктКласс}
              >
                {раздел.label}
              </a>
            ))}
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
          {/* Те же пять разделов, что и на десктопе. Раньше здесь было
              двадцать с лишним пунктов, ведущих на несуществующие якоря. */}
          <nav className="grid gap-1" aria-label="Основные разделы">
            {РАЗДЕЛЫ.map((раздел) => (
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
