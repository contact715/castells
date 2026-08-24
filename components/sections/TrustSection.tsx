import React from 'react';
import { m as motion } from 'framer-motion';
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
              {/*
                Здесь стояло «since 2018». Год основания владельцем не
                подтверждён: страницу «о нас» от него вычистили 22 августа с
                прямой записью «пока он не подтверждён, мы его не называем
                вовсе», а на главной ту же дату оставили. Аудит 24 августа это
                поймал. Юрлицо зарегистрировано в феврале 2025, и до
                подтверждения года мы говорим о том, что проверяется.
              */}
              Working with contractors and home service businesses across the US.
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
                  className="w-10 h-10 rounded-full bg-accent-gradient ring-2 ring-ivory dark:ring-[#191919] flex items-center justify-center text-[11px] font-bold text-white select-none"
                >
                  {client.initials}
                </div>
              ))}
            </div>
            {/*
              Здесь стояли пять звёзд и надпись «Trusted by 100+ Owners».
              Ста отзывов не существует, звёзды не опирались ни на один
              собранный отзыв. Осталась подпись к кружкам: кто эти люди.
            */}
            <span className="text-xs font-bold text-text-primary">
              Real clients from our case studies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
