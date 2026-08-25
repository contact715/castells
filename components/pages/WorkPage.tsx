import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { PageHeader } from '../ui/PageHeader';
import CaseCover from '../ui/CaseCover';
import { CASE_STUDIES, WORK_CATEGORIES, CaseStudy } from '../../constants';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Страница работ, переписана 23 августа 2026. Владелец: «оформи кейсы нормально».

  Что было. Одиннадцать кейсов и вокруг них: поиск по названию, сортировка,
  пять галочек категорий, шесть галочек ниш, переключатель сетка/список и
  постраничная навигация. Инструментов для поиска больше, чем самих работ.
  Колонка фильтров занимала четверть ширины, кейсам оставалось три четверти.

  Плюс на карточках стояли числа без источника ($850K, $620K, 14x ROAS) и
  фотографии со стокового банка, причём у двух кейсов — одна и та же картинка.

  Что стало. Кейсы во всю ширину, над ними один ряд кнопок по типу работы.
  На карточке то, что можно проверить: клиент, ниша и город, год, что мы
  делали, и ссылка на живой сайт там, где мы его построили. Числа убраны по
  решению владельца: подтверждать их было нечем.
*/

interface WorkPageProps {
    onBack: () => void;
    onNavigate: (page: PageView, data?: NavigationData) => void;
}

const WorkCard: React.FC<{
    project: CaseStudy;
    index: number;
    onOpen: () => void;
}> = ({ project, index, onOpen }) => (
    <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.05 }}
        className="group flex flex-col bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card overflow-hidden hover:border-black/20 dark:hover:border-white/30 transition-colors duration-300"
    >
        <button
            type="button"
            onClick={onOpen}
            className="block text-left cursor-pointer"
            aria-label={`Open case study: ${project.client}`}
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <CaseCover
                    image={project.image}
                    client={project.client}
                    industry={project.industry}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/70 text-white text-[10px] font-semibold tracking-wide">
                    {project.year} · {project.industry}
                </span>
            </div>
        </button>

        <div className="flex flex-col grow p-6 md:p-7">
            <button
                type="button"
                onClick={onOpen}
                className="text-left cursor-pointer"
            >
                <h3 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-1 group-hover:text-accent-text transition-colors">
                    {project.client}
                </h3>
            </button>
            {project.location && (
                <p className="text-xs font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-4">
                    {project.location}
                </p>
            )}

            <p className="text-text-secondary dark:text-white/60 leading-relaxed mb-5 grow">
                {project.description}
            </p>

            {/* Что делали: услуги вместо чисел, которые нечем подтвердить */}
            <div className="flex flex-wrap gap-2 mb-5">
                {project.services.map((service) => (
                    <span
                        key={service}
                        className="px-3 py-1.5 rounded-button bg-black/5 dark:bg-white/10 text-[11px] font-medium text-[15px] text-text-secondary dark:text-white/60"
                    >
                        {service}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-black/5 dark:border-white/10">
                <button
                    type="button"
                    onClick={onOpen}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-text-primary dark:text-white hover:text-accent-text transition-colors cursor-pointer"
                >
                    Read case
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>

                {/* Живой сайт — самое проверяемое, что есть у кейса */}
                {project.website && (
                    <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-white/60 hover:text-accent-text transition-colors"
                    >
                        {project.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                )}
            </div>
        </div>
    </motion.article>
);

const WorkPage: React.FC<WorkPageProps> = React.memo(({ onNavigate }) => {
    const [category, setCategory] = useState<string>('all');

    const projects = useMemo(
        () => (category === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === category)),
        [category]
    );

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

    return (
        <>
            <SEO
                title="Our work | Castells Media"
                description="Real clients with names and live sites: HVAC, automotive, remodeling and dental businesses across the US. Work done by Castells Media, Roseville, California."
                canonical="/work"
                keywords="marketing case studies, home service marketing portfolio, HVAC marketing case study, Roseville marketing agency"
                geoRegion="US-CA"
                geoPlacename="1298 Antelope Creek Drive, Roseville, California"
                summary="Work by Castells Media: websites, branding and paid media for home service and automotive businesses across the US. Every client is a real company you can look up."
                mainEntity="Marketing Case Studies"
            />
            <SchemaMarkup
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        { name: 'Home', item: `${siteUrl}/` },
                        { name: 'Our Work', item: `${siteUrl}/work` },
                    ],
                }}
            />

            <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
                <div className="container mx-auto px-6 pt-4 md:pt-6">
                    <PageHeader
                        breadcrumbs={[
                            { label: 'Home', action: () => onNavigate('home') },
                            { label: 'Work', active: true },
                        ]}
                        badge="Our work"
                        title="Clients you can look up"
                        description="Every company here is real. Where we built the site, the link opens it — check it yourself before you talk to us."
                        onNavigate={onNavigate}
                    />

                    {/*
                        Один ряд кнопок вместо колонки фильтров с поиском,
                        сортировкой и одиннадцатью галочками на одиннадцать работ.
                    */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {WORK_CATEGORIES.map((cat) => {
                            const active = category === cat.id || (cat.id === 'all' && category === 'all');
                            const count =
                                cat.id === 'all'
                                    ? CASE_STUDIES.length
                                    : CASE_STUDIES.filter((c) => c.category === cat.id).length;
                            if (count === 0) return null;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setCategory(cat.id)}
                                    className={`px-4 py-2.5 rounded-pill text-xs font-medium text-[15px] transition-colors cursor-pointer ${
                                        active
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : 'bg-black/5 dark:bg-white/10 text-text-secondary dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20'
                                    }`}
                                >
                                    {cat.label}
                                    {/* Без opacity: приглушение вторым цветом уже есть, а прозрачность
    сверху опускала контраст до 2.57 при норме 4.5. Замер 24.08. */}
                                    <span className="ml-2 text-text-secondary dark:text-white/60">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <WorkCard
                                key={project.id}
                                project={project}
                                index={index}
                                onOpen={() => onNavigate('case-study', { id: project.id, name: project.client })}
                            />
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <p className="text-text-secondary dark:text-white/60 py-16 text-center">
                            No work in this category yet.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
});

WorkPage.displayName = 'WorkPage';

export default WorkPage;
