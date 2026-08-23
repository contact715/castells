import React from 'react';
import OptimizedImage from './OptimizedImage';

/*
  Обложка кейса.

  До 23 августа 2026 на карточках стояли фотографии со стокового банка, причём
  у двух кейсов — одна и та же картинка с синей машиной. Владелец: «фото со
  стока, скриншоты сайтов».

  Настоящий снимок есть там, где мы строили сайт и он даёт себя снять:
  Roman Service. Сайт Five Star Comfort закрыт защитой от ботов, у остальных
  клиентов веб-проекта не было вовсе.

  Поэтому обложка одна на два случая: есть снимок — показываем его, нет —
  рисуем фирменную плашку с именем клиента и нишей. Чужую фотографию,
  выдаваемую за работу, не показываем ни в каком случае.
*/

interface CaseCoverProps {
  image?: string;
  client?: string;
  industry?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const CaseCover: React.FC<CaseCoverProps> = ({
  image,
  client = '',
  industry,
  className = '',
  sizes,
  priority = false,
}) => {
  if (image) {
    return (
      <OptimizedImage
        src={image}
        alt={`${client} — the site we built`}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        width={1600}
        height={1000}
        sizes={sizes}
      />
    );
  }

  const initials = client
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <div
      className={`bg-[#1f1d1c] flex flex-col items-center justify-center text-center px-6 ${className}`}
      aria-label={client}
    >
      <span className="font-display text-5xl md:text-6xl text-white/15 leading-none mb-3 select-none">
        {initials}
      </span>
      <span className="font-display text-xl md:text-2xl text-white/80 leading-tight">{client}</span>
      {industry && (
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mt-2">
          {industry}
        </span>
      )}
    </div>
  );
};

export default CaseCover;
