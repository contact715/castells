import React from 'react';
import { m as motion } from 'framer-motion';
import SchemaMarkup from '../ui/SchemaMarkup';
import { CASE_STUDIES } from '../../constants';

/*
  Здесь стояли пять случайных лиц с чужого сервиса i.pravatar.cc, выданных за
  клиентов агентства. Две причины убрать: у посетителей с расширениями браузера
  эти картинки не грузились (сервис не отдаёт разрешение на чтение), и главное —
  показывать выдуманные лица как своих клиентов нечестно.

  Теперь это инициалы реальных клиентов из наших же кейсов. Ноль внешних
  запросов, и за каждым кружком стоит настоящая работа.
*/
const CLIENT_INITIALS = CASE_STUDIES.slice(0, 5).map((cs) => ({
  name: cs.client,
  initials: cs.client
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join(''),
}));

const TrustSection: React.FC = React.memo(() => {
  return (
    <section className="bg-ivory dark:bg-[#191919] py-8 md:py-10">
      <SchemaMarkup
        type="AggregateRating"
        data={{
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '100',
          reviewCount: '100'
        }}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 py-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-base text-text-secondary">
              Partnering with contractors & service businesses since 2018.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/*
              Клиенты из кейсов: инициалы вместо фото, ноль внешних запросов.
              Наложение меньше, чем было у фотографий: буквы стоят по центру,
              и при сдвиге в 12px соседний кружок срезал вторую букву.
            */}
            <div className="flex -space-x-1.5">
              {CLIENT_INITIALS.map((client) => (
                <div
                  key={client.name}
                  title={client.name}
                  aria-label={client.name}
                  className="w-10 h-10 rounded-full bg-coral-gradient ring-2 ring-ivory dark:ring-[#191919] flex items-center justify-center text-[11px] font-bold text-white select-none"
                >
                  {client.initials}
                </div>
              ))}
            </div>
            {/* Rating */}
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-coral-text fill-coral" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-text-primary">
                Trusted by 100+ Owners
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
