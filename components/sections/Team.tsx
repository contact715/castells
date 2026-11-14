import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { NavigateFn } from '../../types';
import { SectionMark } from '../ui/SectionMark';

/*
  Команда на главной.

  История. Здесь стояли выдуманные сотрудники со стоковыми фотографиями, их
  убрали 22 августа 2026, и блок на главной был выключен.

  14 ноября 2026 владелец попросил вернуть команду: «ставь, пусть будет
  доказательство команды». Фотографии настоящие, лежали в public без
  использования: три снимка из одной съёмки. Имена взяты из названий файлов.

  ДОЛЖНОСТЕЙ У ДВОИХ НЕТ НАМЕРЕННО. Владелец их не называл, а придумывать
  роль человеку — та же выдумка, которую отсюда уже вычищали. Поле role
  пустое, карточка его просто не рисует. Впишите роли, когда владелец их
  назовёт.
*/
const TEAM: { name: string; role: string; image: string }[] = [
  { name: 'Dmitrii Z.', role: 'Founder', image: '/team/dmitrii-z.webp' },
  { name: 'Anastasia K.', role: '', image: '/team/anastasia-k.webp' },
  { name: 'Mike Y.', role: '', image: '/team/mike-y.webp' },
];

interface TeamProps {
  onNavigate?: NavigateFn;
}

const Team: React.FC<TeamProps> = ({ onNavigate }) => {
  const goToAbout = (event: React.MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('about');
  };

  return (
    <section id="team" className="py-16 md:py-24 bg-ivory dark:bg-[#191919] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div>
            <SectionMark>Who does the work</SectionMark>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white mb-5">
              A small team,
              <br />
              <span className="text-accent-text italic font-semibold">and you know every face</span>
            </h2>
            <p className="text-lg text-text-secondary dark:text-white/60 leading-relaxed mb-4">
              No sales rep, no account manager passing messages along. You talk to the people who
              build your site, run your ads and read your report.
            </p>
            <p className="text-text-secondary dark:text-white/60 leading-relaxed mb-8">
              We have worked with businesses that sell from an estimate since June 2017: kitchens and
              furniture first, then HVAC. Along the way we built five sales departments from nothing,
              which is why we look past the ad and at what happens to the request after it.
            </p>
            <a
              href="/about"
              onClick={goToAbout}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-button border border-black/15 dark:border-white/20 text-text-primary dark:text-white font-medium text-[15px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              More about us
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative">
            <div className="absolute -bottom-5 -left-5 w-1/2 h-1/2 rounded-card slash-stripes" aria-hidden="true" />
            <div className="relative grid grid-cols-3 gap-3 md:gap-4">
              {TEAM.map((member, index) => (
                <figure
                  key={member.name}
                  className={`relative rounded-card overflow-hidden bg-forest aspect-[3/4] ${index === 1 ? 'mt-8 md:mt-12' : ''}`}
                >
                  <img
                    src={member.image}
                    alt={member.role ? `${member.name}, ${member.role}` : member.name}
                    width={720}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 pt-10 bg-linear-to-t from-forest-deep via-forest-deep/70 to-transparent">
                    <span className="block font-display text-base md:text-lg font-semibold text-white leading-tight">
                      {member.name}
                    </span>
                    {member.role && <span className="block text-xs text-white/70">{member.role}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Team);
