import React from 'react';

/*
  Схемы к урокам академии. Заведены 26 августа 2026: владелец попросил, чтобы
  уроки не выглядели сухо.

  ПОЧЕМУ ВЕКТОР, А НЕ КАРТИНКИ. Ключа к рисующим моделям на машине нет
  (проверено: Gemini CLI авторизован, но Google отключил поддержку личных
  аккаунтов). Но для такого содержания схема и так полезнее рисунка: она
  резкая на любом экране, весит сотни байт вместо сотен килобайт, сама
  подстраивается под светлую и тёмную тему и не зависит от того, загрузились
  ли картинки.

  ПРАВИЛА, КОТОРЫМ СЛЕДУЮТ ВСЕ СХЕМЫ НИЖЕ.
  Текст рисуется currentColor, то есть цветом окружающего текста, и потому
  читается в обеих темах без второй копии стилей. Акцентом заливаются только
  ФИГУРЫ: на светлом фоне он даёт 3.33 — этого хватает для графики (порог 3.0)
  и НЕ хватает для мелкого текста (порог 4.5).

  Каждая схема несёт <title> и <desc>: для читалки экрана схема без подписи
  это пустое место, а половина смысла урока в ней.

  Схема НЕ повторяет текст. Если она не добавляет к абзацу ничего, её быть не
  должно — украшение, которое надо разглядывать, хуже пустого места.
*/

type Вид =
  | 'six-things'
  | 'three-encounters'
  | 'three-sites'
  | 'two-costs'
  | 'channels'
  | 'follow-up';

const Обёртка: React.FC<{
  title: string;
  desc: string;
  viewBox: string;
  children: React.ReactNode;
}> = ({ title, desc, viewBox, children }) => (
  <figure className="my-10 -mx-2">
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className="w-full h-auto text-text-primary dark:text-white"
      style={{ maxWidth: '100%' }}
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      {children}
    </svg>
  </figure>
);

/** Общие мелочи: рамка карточки и подпись под ней. */
const Плитка: React.FC<{ x: number; y: number; w: number; h: number; сильная?: boolean }> = ({
  x, y, w, h, сильная,
}) => (
  <rect
    x={x} y={y} width={w} height={h} rx="8"
    fill="none"
    stroke="currentColor"
    strokeOpacity={сильная ? 0.5 : 0.2}
    strokeWidth="1.5"
  />
);

const Стрелка: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
  <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
    <line x1={x1} y1={y1} x2={x2} y2={y2} />
    <polyline points={`${x2 - 6},${y2 - 4} ${x2},${y2} ${x2 - 6},${y2 + 4}`} />
  </g>
);

/* ── Урок 1: шесть вещей до первого доллара на рекламу ─────────────────── */
const ШестьВещей = () => {
  const пункты = ['Legal form', 'License', 'Insurance', 'Business phone', 'Business email', 'Bank account'];
  return (
    <Обёртка
      viewBox="0 0 720 190"
      title="Six things that have to exist before advertising"
      desc="Six items in a row: legal form, license, insurance, business phone, business email, bank account. An arrow leads from them to the words: now advertising multiplies something that works."
    >
      {пункты.map((п, i) => {
        const x = 8 + i * 118;
        return (
          <g key={п}>
            <Плитка x={x} y={16} w={104} h={52} />
            <circle cx={x + 16} cy={42} r="5" fill="var(--color-accent)" />
            <text x={x + 30} y={46} fontSize="12" fill="currentColor" fillOpacity="0.85">{п}</text>
          </g>
        );
      })}
      <Стрелка x1={360} y1={82} x2={360} y2={116} />
      <Плитка x={130} y={124} w={460} h={50} сильная />
      <text x={360} y={154} fontSize="13" textAnchor="middle" fill="currentColor">
        Only now does advertising multiply something that works
      </text>
    </Обёртка>
  );
};

/* ── Урок 2: три встречи складываются в одну память ───────────────────── */
const ТриВстречи = () => (
  <Обёртка
    viewBox="0 0 720 170"
    title="Three encounters before a call"
    desc="A truck on the street, a yard sign at a neighbour house, a search result. Each is a separate stranger unless the name, colour and logo match. When they match, the fourth step is a phone call."
  >
    {['Truck on the street', 'Yard sign next door', 'Search result'].map((п, i) => {
      const x = 12 + i * 190;
      return (
        <g key={п}>
          <Плитка x={x} y={20} w={166} h={56} />
          <text x={x + 83} y={44} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.85">{п}</text>
          <text x={x + 83} y={62} fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.45">
            encounter {i + 1}
          </text>
          {i < 2 && <Стрелка x1={x + 172} y1={48} x2={x + 190} y2={48} />}
        </g>
      );
    })}
    <Стрелка x1={584} y1={48} x2={624} y2={48} />
    <circle cx={668} cy={48} r="28" fill="var(--color-accent)" fillOpacity="0.15" stroke="var(--color-accent)" strokeWidth="1.5" />
    <text x={668} y={52} fontSize="11" textAnchor="middle" fill="currentColor">calls</text>
    <text x={360} y={122} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.7">
      Same name, same colour, same logo in all three
    </text>
    <text x={360} y={144} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.45">
      Different in any one of them, and they stay three strangers
    </text>
  </Обёртка>
);

/* ── Урок 3: три вида сайта ────────────────────────────────────────────── */
const ТриСайта = () => {
  const виды = [
    { имя: 'One-page card', для: 'Checking you are real', нет: 'Will not bring strangers', скорость: 'days' },
    { имя: 'Landing page', для: 'Turning paid clicks into calls', нет: 'Hides most of the business', скорость: 'days' },
    { имя: 'Full site', для: 'Being found without paying', нет: 'Nothing next week', скорость: 'months' },
  ];
  return (
    <Обёртка
      viewBox="0 0 720 250"
      title="Three kinds of website compared"
      desc="One-page card: for checking you are real, ready in days, will not bring strangers. Landing page: turns paid clicks into calls, ready in days, hides most of the business. Full site: found without paying, takes months, produces nothing next week."
    >
      {виды.map((в, i) => {
        const x = 8 + i * 238;
        return (
          <g key={в.имя}>
            <Плитка x={x} y={12} w={224} h={196} сильная={i === 2} />
            <rect x={x} y={12} width={224} height={4} rx="2" fill="var(--color-accent)" fillOpacity={0.3 + i * 0.35} />
            <text x={x + 18} y={48} fontSize="14" fill="currentColor">{в.имя}</text>
            <text x={x + 18} y={80} fontSize="10" fill="currentColor" fillOpacity="0.45">GOOD FOR</text>
            <text x={x + 18} y={100} fontSize="12" fill="currentColor" fillOpacity="0.85">{в.для}</text>
            <text x={x + 18} y={132} fontSize="10" fill="currentColor" fillOpacity="0.45">CANNOT DO</text>
            <text x={x + 18} y={152} fontSize="12" fill="currentColor" fillOpacity="0.85">{в.нет}</text>
            <text x={x + 18} y={186} fontSize="10" fill="currentColor" fillOpacity="0.45">
              READY IN {в.скорость.toUpperCase()}
            </text>
          </g>
        );
      })}
      <text x={360} y={236} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.6">
        They cost different amounts because they do different jobs
      </text>
    </Обёртка>
  );
};

/* ── Урок 4: две статьи расхода и три шага ─────────────────────────────── */
const ДваРасхода = () => (
  <Обёртка
    viewBox="0 0 720 230"
    title="Two kinds of marketing cost, and the three steps they pay for"
    desc="The ad budget scales with how much you want to spend and goes to Google, Meta or Yelp. The work is roughly flat whichever budget you pick. Together they pay for three steps: get found, get contacted, get booked. Money spent on the first while the third is broken is money burned."
  >
    <text x={12} y={24} fontSize="10" fill="currentColor" fillOpacity="0.45">AD BUDGET — SCALES</text>
    {[36, 60, 96, 150].map((w, i) => (
      <rect key={w} x={12} y={34 + i * 16} width={w} height={10} rx="3" fill="var(--color-accent)" fillOpacity="0.75" />
    ))}
    <text x={182} y={72} fontSize="11" fill="currentColor" fillOpacity="0.6">to Google, Meta, Yelp</text>

    <text x={392} y={24} fontSize="10" fill="currentColor" fillOpacity="0.45">THE WORK — ROUGHLY FLAT</text>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={392} y={34 + i * 16} width={84} height={10} rx="3" fill="currentColor" fillOpacity="0.3" />
    ))}
    <text x={492} y={72} fontSize="11" fill="currentColor" fillOpacity="0.6">pages, ads, watching, changing</text>

    <line x1={12} y1={120} x2={708} y2={120} stroke="currentColor" strokeOpacity="0.15" />

    {['Get found', 'Get contacted', 'Get booked'].map((ш, i) => {
      const x = 12 + i * 240;
      return (
        <g key={ш}>
          <Плитка x={x} y={140} w={200} h={44} сильная={i === 2} />
          <text x={x + 100} y={167} fontSize="13" textAnchor="middle" fill="currentColor">{ш}</text>
          {i < 2 && <Стрелка x1={x + 206} y1={162} x2={x + 240} y2={162} />}
        </g>
      );
    })}
    <text x={360} y={214} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.6">
      Spending on the first while the third is broken is money burned
    </text>
  </Обёртка>
);

/* ── Урок 5: каналы по скорости и по тому, что остаётся ────────────────── */
const Каналы = () => {
  const точки = [
    { имя: 'Referrals', x: 250, y: 60 },
    { имя: 'Google profile', x: 380, y: 76 },
    { имя: 'Unpaid search', x: 610, y: 52 },
    { имя: 'Paid search', x: 110, y: 150 },
    { имя: 'Paid social', x: 200, y: 170 },
    { имя: 'Marketplaces', x: 130, y: 190 },
  ];
  return (
    <Обёртка
      viewBox="0 0 720 250"
      title="Marketing channels by speed and by what is left when you stop paying"
      desc="Paid search, paid social and lead marketplaces work immediately and stop immediately. Referrals and a Google Business Profile keep working and cost nothing per job. Unpaid search is the slowest to start and the only one that keeps working for free."
    >
      <line x1={60} y1={214} x2={700} y2={214} stroke="currentColor" strokeOpacity="0.2" />
      <line x1={60} y1={20} x2={60} y2={214} stroke="currentColor" strokeOpacity="0.2" />
      <text x={380} y={238} fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.45">
        WORKS IMMEDIATELY ——————————————→ TAKES MONTHS
      </text>
      <text x={22} y={120} fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.45"
        transform="rotate(-90 22 120)">
        KEEPS WORKING ← → STOPS WITH THE MONEY
      </text>
      {точки.map((т) => (
        <g key={т.имя}>
          <circle cx={т.x} cy={т.y} r="7" fill="var(--color-accent)" fillOpacity={т.y < 120 ? 0.9 : 0.35} />
          <text x={т.x + 14} y={т.y + 4} fontSize="12" fill="currentColor" fillOpacity="0.85">{т.имя}</text>
        </g>
      ))}
    </Обёртка>
  );
};

/* ── Урок 6: где теряются заявки ───────────────────────────────────────── */
const Дожим = () => {
  const шаги = [
    { имя: 'Request arrives', под: 'call, text, form' },
    { имя: 'Acknowledged', под: 'within minutes' },
    { имя: 'Real human', под: 'within hours' },
    { имя: 'Quote sent', под: '' },
  ];
  return (
    <Обёртка
      viewBox="0 0 720 240"
      title="From a request to a booked job, and the three follow-ups after the quote"
      desc="A request arrives, is acknowledged within minutes, reaches a real human within hours, and turns into a quote. After the quote: follow up the next day, again after a week, once more after a few weeks, then stop. Most lost work disappears in the gap after the quote."
    >
      {шаги.map((ш, i) => {
        const x = 8 + i * 180;
        return (
          <g key={ш.имя}>
            <Плитка x={x} y={16} w={162} h={56} />
            <text x={x + 81} y={40} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.9">{ш.имя}</text>
            {ш.под && (
              <text x={x + 81} y={58} fontSize="10" textAnchor="middle" fill="currentColor" fillOpacity="0.45">{ш.под}</text>
            )}
            {i < 3 && <Стрелка x1={x + 168} y1={44} x2={x + 180} y2={44} />}
          </g>
        );
      })}

      <line x1={60} y1={120} x2={660} y2={120} stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 4" />
      {[
        { x: 120, п: 'next day' },
        { x: 330, п: 'a week later' },
        { x: 545, п: 'a few weeks later' },
      ].map((т) => (
        <g key={т.п}>
          <circle cx={т.x} cy={120} r="8" fill="var(--color-accent)" />
          <text x={т.x} y={148} fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.85">{т.п}</text>
        </g>
      ))}
      <circle cx={660} cy={120} r="8" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
      <text x={660} y={148} fontSize="11" textAnchor="middle" fill="currentColor" fillOpacity="0.5">then stop</text>

      <text x={360} y={196} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.7">
        Three touches after the quote, politely, and then it is a no
      </text>
      <text x={360} y={220} fontSize="12" textAnchor="middle" fill="currentColor" fillOpacity="0.45">
        A quote nobody mentioned again was forgotten, not rejected
      </text>
    </Обёртка>
  );
};

const СХЕМЫ: Record<Вид, React.FC> = {
  'six-things': ШестьВещей,
  'three-encounters': ТриВстречи,
  'three-sites': ТриСайта,
  'two-costs': ДваРасхода,
  channels: Каналы,
  'follow-up': Дожим,
};

const AcademyDiagram: React.FC<{ kind?: string }> = ({ kind }) => {
  const Схема = kind ? СХЕМЫ[kind as Вид] : undefined;
  return Схема ? <Схема /> : null;
};

export default AcademyDiagram;
