import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import SEO from '../ui/SEO';
import { ACADEMY_MODULES, ACADEMY_TRACKS, ACADEMY_LESSONS, lessonsOfTrack } from '../../data/academy';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Хаб академии, /academy. Список РЕМЁСЕЛ, а не список уроков: владелец попросил
  разделить академию по нишам, чтобы в разделе своего ремесла подрядчик находил
  всё, что его касается, от и до.

  КАРТОЧКИ ВО ВСЮ ШИРИНУ, ПО ОБРАЗЦУ КЕЙСОВ С ГЛАВНОЙ (27 августа 2026).
  Владелец: «сделай на всю ширину сайта, как кейсы на главной, только без
  анимации, просто карточка так же красиво».

  Высоты 400/500/600 взяты ОТТУДА ЖЕ, а не назначены своими. Первая версия
  ставила 300/360/420, и обложка при этом обрезалась до 49% по высоте: у дома
  срезало крышу, у документа оставалась одна белая плита. Владелец назвал это
  обрубками и был прав. При 600 точках на широком экране остаётся около 70%
  картинки.

  Форма СКОПИРОВАНА с components/sections/Work.tsx, а не придумана заново:
  картинка фоном, тёмная заливка снизу вверх, значок слева сверху, стрелка
  справа, заголовок и описание внизу. Так карточки академии читаются как часть
  того же сайта, а не как похожий чужой блок.

  Чего из кейсов НЕ взято и почему: анимация появления — владелец просил без
  неё; строка метрик — у курса нет чисел результата, а придумывать их нельзя;
  ссылка на сайт клиента — у курса её нет.

  Оглавление модулей ушло ВНИЗ отдельной секцией. Раньше оно стояло справа
  колонкой, но полной ширины у карточек при этом быть не может, а владелец
  просил именно её. Содержание не потеряно, оно под карточками.

  Разметку для поиска страница не рисует: она уже в готовом HTML.
*/

interface AcademyPageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onNavigate }) => {
  const сУроками = ACADEMY_TRACKS.filter((т) => lessonsOfTrack(т.slug).length > 0);

  return (
    <>
      <SEO
        title="Academy for contractors | Castells Media"
        description="A free course for home service business owners: registering the business, brand, website, marketing budgets, getting found, and following up on the work you already have."
        canonical="/academy"
        summary="Free plain-text course from Castells Media for contractors and home service business owners, covering business setup, brand, websites, marketing budgets, lead sources and follow-up."
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <Breadcrumbs
            className="mb-6"
            items={[{ label: 'Home', action: () => onNavigate('home') }, { label: 'Academy' }]}
          />

          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold tracking-wide text-accent-text">Academy</span>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-text-primary dark:text-white mt-2 mb-4 leading-tight">
              Courses by trade
            </h1>
            <p className="text-text-secondary dark:text-white/70 text-base md:text-[17px] leading-relaxed mb-3">
              Written from the work we do for clients, not from someone else&apos;s textbook. No
              numbers we cannot show you the source of, and nothing here is behind a form.
            </p>
            {/*
              Строка считается, а не пишется под сегодняшнее состояние: пока есть
              ненаписанные курсы, называем их число вслух; когда написаны все —
              говорим, сколько всего. Соврать в обоих случаях нечем.
            */}
            <p className="text-text-secondary dark:text-white/50 text-sm mb-10">
              {сУроками.length < ACADEMY_TRACKS.length ? (
                <>
                  {сУроками.length} of {ACADEMY_TRACKS.length} courses are written so far. The rest
                  are listed below so you can see what is coming.
                </>
              ) : (
                <>
                  {ACADEMY_TRACKS.length} courses, {ACADEMY_LESSONS.length} lessons. Free, no
                  sign-up, nothing behind a form.
                </>
              )}
            </p>
          </div>

          <div className="space-y-6">
            {ACADEMY_TRACKS.map((раздел) => {
              const уроки = lessonsOfTrack(раздел.slug);

              if (уроки.length === 0) {
                /*
                  Ненаписанный курс показывается, но не притворяется карточкой:
                  без обложки, пунктиром, не кликается. Прятать нельзя — человек
                  решит, что для его ремесла курса не будет вовсе.
                */
                return (
                  <div
                    key={раздел.slug}
                    className="w-full border border-dashed border-black/15 dark:border-white/15 rounded-card p-6 md:p-8"
                  >
                    <h2 className="font-display text-xl md:text-2xl font-normal text-text-secondary dark:text-white/55 mb-2">
                      {раздел.name}
                    </h2>
                    <p className="text-text-secondary dark:text-white/50 leading-relaxed mb-3 max-w-2xl">
                      {раздел.about}
                    </p>
                    <span className="text-xs text-text-secondary dark:text-white/40">
                      Not written yet
                    </span>
                  </div>
                );
              }

              return (
                <button
                  key={раздел.slug}
                  type="button"
                  onClick={() => onNavigate('academy-track', { id: раздел.slug })}
                  className="group relative block w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-card overflow-hidden text-left"
                >
                  {/*
                    Картинка позиционируется, а не тянется по высоте. Замер на
                    живом сайте: в контейнере 600 точек она была 688 и вылезала
                    на 88 — обрезка это прятала, но кадр съезжал. Причина общая
                    для сайта: правило img,video { height: auto } в собранном CSS
                    стоит ВНЕ слоя и бьёт любую утилиту из @layer utilities.
                    absolute inset-0 задаёт коробку смещениями, и height:auto её
                    перебить не может.
                  */}
                  <div className="absolute inset-0 bg-black">
                    {раздел.cover && (
                      <img
                        src={раздел.cover}
                        alt=""
                        width={1376}
                        height={768}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                      />
                    )}
                  </div>

                  {/*
                    Заливка снизу вверх, как у кейсов. Замер худшего случая —
                    белый текст ровно над самой светлой фигурой обложки
                    (#EEF1F0): при 90% черноты внизу фон становится
                    rgb(24,24,24), контраст заголовка 17.76 при пороге 3.0.
                  */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />

                  <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="bg-white/15 px-3 py-1.5 rounded-lg text-white text-[10px] sm:text-xs font-semibold tracking-wide">
                        {уроки.length} lessons · {ACADEMY_MODULES.length} modules
                      </span>
                      <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-element bg-white/10 flex items-center justify-center group-hover:bg-white transition-colors">
                        <ArrowUpRight
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-black transition-colors"
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <div>
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3 tracking-tight leading-none">
                        {раздел.name}
                      </h2>
                      <p className="text-white/75 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
                        {раздел.about}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/*
            Модули под карточками. Отвечают на вопрос, которого нет в карточках:
            что именно внутри ЛЮБОГО курса. Карточки говорят, ДЛЯ КОГО курс,
            модули — ИЗ ЧЕГО он состоит.
          */}
          <section className="mt-16 pt-10 border-t border-black/5 dark:border-white/10">
            <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white mb-8">
              What every course covers
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              {ACADEMY_MODULES.map((модуль) => (
                <li key={модуль.number}>
                  <span className="block text-[10px] font-semibold tracking-wide text-accent-text mb-1">
                    MODULE {модуль.number}
                  </span>
                  <span className="block font-medium text-text-primary dark:text-white leading-snug mb-1">
                    {модуль.name}
                  </span>
                  <span className="block text-sm text-text-secondary dark:text-white/55 leading-snug">
                    {модуль.about}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
};

export default AcademyPage;
