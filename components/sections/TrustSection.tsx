import React from 'react';
import { CASE_STUDIES } from '../../constants';

/*
  Полоса фактов под первым экраном.

  История. Сначала здесь стояли пять случайных лиц с чужого сервиса и «Trusted
  by 100+ Owners» со звёздами: лиц таких не было, ста отзывов тоже. Потом
  строка «since June 2017» и кружки с инициалами клиентов.

  14 ноября 2026 полоса стала тёмной и с четырьмя фактами. Каждый из них уже
  опубликован на странице «о нас» со слов владельца (27 августа 2026): июнь
  2017, пять отделов продаж, шесть салонов. Четвёртое число считается из
  списка кейсов, а не вписано руками. Здесь нет ни одного показателя
  результата: ни заявок, ни процентов, ни выручки. Таких замеров у нас нет.

  Юрлицо Castells Media Inc зарегистрировано в феврале 2025. Опыт старше
  компании, поэтому формулировка «работаем с такими бизнесами с 2017», а не
  «мы на рынке с 2017».
*/
const FACTS = [
  { value: '2017', label: 'working with businesses that sell from an estimate, since June' },
  { value: '5', label: 'sales departments built from nothing' },
  { value: '6', label: 'furniture showrooms opened' },
  { value: String(CASE_STUDIES.length), label: 'clients named on this site, with their cities' },
];

const TrustSection: React.FC = React.memo(() => (
  <section className="bg-forest text-white relative overflow-hidden">
    <div className="absolute inset-y-0 right-0 w-1/3 slash-stripes-light opacity-60 pointer-events-none" aria-hidden="true" />
    <div className="container mx-auto px-6 py-10 md:py-12 relative">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        {FACTS.map((fact) => (
          <div key={fact.label} className="lg:border-l lg:border-white/15 lg:pl-8 first:lg:border-l-0 first:lg:pl-0">
            <dt className="sr-only">{fact.label}</dt>
            <dd>
              <span className="block font-display text-4xl md:text-5xl text-lime leading-none mb-3">{fact.value}</span>
              <span className="block text-sm text-white/75 leading-relaxed max-w-[15rem]">{fact.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
));

TrustSection.displayName = 'TrustSection';

export default TrustSection;
