import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/*
  Раскрывающаяся панель верхнего меню. Заведена 27 августа 2026 по спеке
  docs/SPEC_2026-08-27_MEGA_MENU.md.

  ЗАЧЕМ ОНА, кроме навигации. Разбор чужого меню показал три работы, которые
  оно делает одновременно: показывает состав раздела без перехода на хаб,
  продаёт (телефон и кнопка внутри панели, позвонить можно не дойдя ни до одной
  страницы) и доказывает глубину счётчиком, который виден раньше, чем открыта
  хоть одна страница.

  ПОЧЕМУ ЭТО НАМ ПОДОШЛО. Замер шапки: при ширине окна 1024 занято 898 точек из
  1009, восьмой пункт был последним, который влез. Панель НЕ добавляет пунктов
  в строку, она добавляет глубину существующим, поэтому ширина шапки этой
  правкой не затрагивается вовсе.

  КОНТРАСТ ПОСЧИТАН, А НЕ ПРИКИНУТ, как требует спека. Две пары не прошли с
  первого раза и были подобраны расчётом, а не на глаз: подпись категории на
  тёмном фоне давала 3.79 при пороге 4.5 (белый 40%, поднято до 50% — 5.10), и
  счётчик на тёмной полосе давал 4.00 акцентным цветом (заменён на светлый
  оттенок акцента #59C09A — 6.80). Остальные пары прошли сразу: заголовок 16.48,
  ссылки 7.69, на светлой теме 21.00 и 7.46.

  ЗАДЕРЖКИ ВЗЯТЫ НЕ С ПОТОЛКА. Открытие через 150 мс: без задержки панель
  мигает, когда курсор просто идёт вдоль строки меню к другому пункту. Закрытие
  через 300 мс: между пунктом и панелью есть зазор, и мгновенное закрытие не
  даёт до неё дотянуться.

  ПУСТАЯ ПАНЕЛЬ НЕ ПОКАЗЫВАЕТСЯ. Если разделу нечего показать, пункт остаётся
  обычной ссылкой — это решает вызывающая сторона, передавая или не передавая
  содержимое. Панель на одну страницу это дверь в пустую комнату.
*/

export interface MegaPanelProps {
  /** Подпись пункта в строке меню. */
  label: string;
  /** Адрес хаба раздела: по нему идут и по клику на сам пункт. */
  href: string;
  /** Переход на хаб раздела. */
  onOpenHub: () => void;
  /** Левая полоса: одно предложение, счётчик и кнопка. */
  rail: {
    title: string;
    /** Счётчик. Обязан быть посчитан из данных, а не вписан руками. */
    count: string;
    text: string;
    cta: string;
  };
  /** Содержимое правой части. Пусто — панели нет. */
  children?: React.ReactNode;
  className?: string;
}

const MegaPanel: React.FC<MegaPanelProps> = ({
  label,
  href,
  onOpenHub,
  rail,
  children,
  className = '',
}) => {
  const [открыта, setОткрыта] = useState(false);
  /*
    Отступ сверху меряется у САМОГО ПУНКТА в момент открытия, а не задаётся
    числом: шапка плавающая, её нижний край зависит от прокрутки и от ширины
    окна. Число здесь разошлось бы с действительностью в первый же день.
  */
  const [сверху, setСверху] = useState(0);
  const таймер = useRef<number | null>(null);
  const обёртка = useRef<HTMLDivElement>(null);
  const кнопка = useRef<HTMLAnchorElement>(null);
  const id = useId();

  const отменить = () => {
    if (таймер.current) {
      window.clearTimeout(таймер.current);
      таймер.current = null;
    }
  };

  const запомнитьНиз = () => {
    const r = обёртка.current?.getBoundingClientRect();
    if (r) setСверху(Math.round(r.bottom + 12));
  };

  const открытьПозже = useCallback(() => {
    отменить();
    таймер.current = window.setTimeout(() => {
      запомнитьНиз();
      setОткрыта(true);
    }, 150);
  }, []);

  const закрытьПозже = useCallback(() => {
    отменить();
    таймер.current = window.setTimeout(() => setОткрыта(false), 300);
  }, []);

  const закрытьСразу = useCallback(() => {
    отменить();
    setОткрыта(false);
  }, []);

  // Esc закрывает и ВОЗВРАЩАЕТ фокус на пункт: без возврата человек с
  // клавиатурой оказывается в начале страницы и заново идёт по всей шапке.
  useEffect(() => {
    if (!открыта) return;
    const поКлавише = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        закрытьСразу();
        кнопка.current?.focus();
      }
    };
    const поЩелчку = (e: MouseEvent) => {
      if (обёртка.current && !обёртка.current.contains(e.target as Node)) закрытьСразу();
    };
    document.addEventListener('keydown', поКлавише);
    document.addEventListener('mousedown', поЩелчку);
    return () => {
      document.removeEventListener('keydown', поКлавише);
      document.removeEventListener('mousedown', поЩелчку);
    };
  }, [открыта, закрытьСразу]);

  useEffect(() => отменить, []);

  const естьПанель = Boolean(children);

  return (
    <div
      ref={обёртка}
      className="relative"
      onMouseEnter={естьПанель ? открытьПозже : undefined}
      onMouseLeave={естьПанель ? закрытьПозже : undefined}
      onFocusCapture={естьПанель ? () => { запомнитьНиз(); setОткрыта(true); } : undefined}
    >
      <a
        ref={кнопка}
        href={href}
        aria-haspopup={естьПанель ? 'true' : undefined}
        aria-expanded={естьПанель ? открыта : undefined}
        aria-controls={естьПанель ? id : undefined}
        onClick={(e) => {
          e.preventDefault();
          закрытьСразу();
          onOpenHub();
        }}
        className={`text-sm font-medium text-text-secondary hover:text-text-primary dark:hover:text-white transition-colors px-3 py-2 cursor-pointer ${className}`}
      >
        {label}
      </a>

      {естьПанель && открыта && (
        /*
          ПАНЕЛЬ ЦЕНТРИРУЕТСЯ ПО СТРАНИЦЕ, а не открывается от своего пункта.

          Первая версия прижимала её к левому краю пункта, и владелец сразу
          сказал: «криво раскрывается, а не по центру сайта». Он прав — при
          восьми пунктах панель шириной 1100 точек, привязанная к крайнему
          правому пункту, уезжает за край экрана, а привязанная к левому висит
          в стороне от содержимого страницы.

          Позиционирование fixed, а не absolute, выбрано намеренно: шапка
          плавающая и лежит внутри контейнеров с закруглением и обрезкой, и
          absolute-панель обрезалась бы предком. fixed не зависит от предков
          вовсе.

          Появление без анимации намеренно: правило уменьшения движения на сайте
          уже есть (index.css), и панель, которая ему подчиняется, проще той,
          которая анимируется и отключает анимацию условием.
        */
        <div
          id={id}
          style={{ top: сверху }}
          className="fixed left-1/2 -translate-x-1/2 z-50"
          onMouseEnter={отменить}
          onMouseLeave={закрытьПозже}
        >
          <div className="w-[min(92vw,1100px)] bg-white dark:bg-[#1f1f1f] border border-black/10 dark:border-white/10 rounded-card shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
              {/*
                Левая полоса. Здесь живёт то, ради чего панель не просто список:
                одно предложение о разделе, счётчик из данных и кнопка на хаб.
              */}
              <div className="bg-ivory dark:bg-white/[0.03] p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/10">
                <div>
                  <h2 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-1">
                    {rail.title}
                  </h2>
                  <p className="text-xs text-accent-text dark:text-[#59C09A] font-semibold tracking-wide mb-3">
                    {rail.count}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-white/65 leading-relaxed">
                    {rail.text}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    закрытьСразу();
                    onOpenHub();
                  }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text-primary dark:text-white hover:text-accent-text dark:hover:text-accent-text transition-colors"
                >
                  {rail.cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaPanel;
