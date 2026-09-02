/*
  Набор вопросов для замера видимости Castells в ответах ИИ.
  Заведён 1 сентября 2026.

  ПРАВИЛО НАБОРА: вопрос формулируется так, как его задал бы ПОКУПАТЕЛЬ, а не
  так, как удобно нам. «Кто делает маркетинг для HVAC в Розвилле» — вопрос
  покупателя. «Лучшее агентство Castells Media» — подсказка, и замер по ней
  ничего не стоит.

  Ни в одном вопросе не встречается наше имя, наш домен и наши услуги в той
  формулировке, в какой они написаны у нас на сайте. Это проверяется
  самопроверкой ниже, а не обещанием.

  ПОЧЕМУ ВОПРОСЫ ПО-АНГЛИЙСКИ. Клиенты в США, спрашивают по-английски, и движок
  на английский и русский отвечает разными списками. Мерить надо на языке
  покупателя.

  ЧЕТЫРЕ ГРУППЫ, и они не случайны:
    прямой поиск исполнителя — где нас должны называть в первую очередь;
    поиск по нише — HVAC, кухни, автоуслуги: наш заявленный первый круг;
    поиск по задаче — человек не знает слова «агентство», он знает свою беду;
    сравнение и цена — где называют тех, у кого цены опубликованы.
*/

export const ВОПРОСЫ = [
  // ── прямой поиск исполнителя ──
  'Who are the best marketing agencies for home service businesses in the US?',
  'Which marketing agency should I hire for my HVAC company?',
  'Best digital marketing agency for contractors in Sacramento California',
  'Who does marketing for small home service businesses in Roseville CA?',
  'Recommend a marketing agency for a plumbing and HVAC company',

  // ── поиск по нише ──
  'Which agencies specialize in HVAC marketing?',
  'Who does marketing for kitchen and cabinet companies?',
  'Best marketing agency for auto detailing and ceramic coating shops',
  'Which marketing companies work with remodeling contractors?',

  // ── поиск по задаче ──
  'My HVAC company phone stopped ringing. Who can help me get more calls?',
  'I need a website and Google Ads for my contracting business. Who should I hire?',
  'Who can set up lead follow-up and CRM for a home service business?',
  'I am starting a new HVAC brand in California and need first customers. Who helps with that?',

  // ── сравнение и цена ──
  'Which marketing agencies for contractors publish their prices publicly?',
  'How much does marketing cost for a home service business and who offers it cheapest?',
  'Marketing agencies for contractors that do not require long contracts',
];

/** Кого ищем в ответе. Домены и имена во всех формах, какими нас могут назвать. */
export const МЫ = {
  id: 'castells',
  имена: ['Castells Media', 'Castells Agency', 'Castells'],
  домены: ['castells.media', 'castells.studio'],
};

/* Самопроверка набора: подсказки в вопросах — это подделка замера. */
export function самопроверкаНабора() {
  const п = [];
  const t = (имя, у) => п.push([имя, Boolean(у)]);
  const весь = ВОПРОСЫ.join(' ').toLowerCase();

  t('вопросов не меньше десяти', ВОПРОСЫ.length >= 10);
  t('в вопросах нет нашего имени', !/castells/.test(весь));
  t('в вопросах нет нашего домена', !/castells\.(media|studio)/.test(весь));
  t('нет дубликатов', new Set(ВОПРОСЫ).size === ВОПРОСЫ.length);
  t('все вопросы на английском', ВОПРОСЫ.every((в) => !/[а-яё]/i.test(в)));
  t('каждый вопрос — вопрос покупателя, а не запрос по бренду',
    ВОПРОСЫ.every((в) => в.length > 30));
  t('у нас названы и имена, и домены', МЫ.имена.length > 0 && МЫ.домены.length > 0);

  return п;
}
