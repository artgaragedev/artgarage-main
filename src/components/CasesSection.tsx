'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import WorkCard from './WorkCard';
import WorkCardSkeleton from './WorkCardSkeleton';
import { useCategories, useWorks } from '@/hooks/useSupabaseData';
import { LocalizedCategory, LocalizedWork } from '@/types/supabase';

const CasesSection: FC<{ showHeader?: boolean }> = ({ showHeader = true }) => {
  const locale = useLocale() as 'ru' | 'ro';
  const t = useTranslations('cases');
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState(t('all'));

  // Получаем данные из Supabase
  const { data: categories, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories(locale as 'ru' | 'ro')
  // Получаем ВСЕ работы без фильтрации для правильного подсчета
  const { data: allWorks, isLoading: worksLoading, error: worksError, refetch: refetchWorks } = useWorks(
    {
      limit: 200 // Получаем все работы
    },
    locale as 'ru' | 'ro'
  )

  // Устанавливаем первую категорию как активную при загрузке
  useEffect(() => {
    if (categories && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].name);
    }
  }, [categories, activeCategory]);

  // Получить подкатегории для активной категории
  const getActiveSubcategories = () => {
    if (!categories || !allWorks) return [];

    const activeWorks = allWorks.filter(work =>
      work.category?.name === activeCategory
    );

    const subcategories = new Set([t('all')]);
    activeWorks.forEach(work => {
      if (work.subcategory?.name) {
        subcategories.add(work.subcategory.name);
      }
    });

    return Array.from(subcategories);
  };

  // Обработчик смены категории
  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveSubcategory(t('all')); // Сбрасываем подкатегорию при смене категории
  };

  // Функция для подсчета работ в категории
  const getCategoryWorkCount = (categoryName: string) => {
    return allWorks?.filter(work => work.category?.name === categoryName).length || 0;
  };

  // Функция для подсчета работ в подкатегории
  const getSubcategoryWorkCount = (subcategoryName: string) => {
    if (subcategoryName === t('all')) {
      return allWorks?.filter(work => work.category?.name === activeCategory).length || 0;
    }
    return allWorks?.filter(work =>
      work.category?.name === activeCategory &&
      work.subcategory?.name === subcategoryName
    ).length || 0;
  };

  // Фильтрация работ по активной категории и подкатегории
  const filteredWorks = allWorks?.filter(work => {
    // Если категория не выбрана, показываем все работы (защита от пустого экрана)
    if (!activeCategory) return true;

    const categoryMatch = work.category?.name === activeCategory;
    const subcategoryMatch = activeSubcategory === t('all') || work.subcategory?.name === activeSubcategory;
    return categoryMatch && subcategoryMatch;
  }) || [];

  // Показываем загрузку со skeleton loaders только во время первоначальной загрузки данных
  const isInitialLoading = (categoriesLoading || worksLoading) && (!categories || !allWorks);

  if (isInitialLoading) {
    return (
      <section id="cases" className="w-screen bg-white dark:bg-[#0b0b0b] relative z-10">
        {/* Заголовок */}
        {showHeader && (
          <div
            className="container-max-width pt-4 pb-8 px-2 sm:px-0"
            style={{
              padding: '1rem 0 2rem'
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-start justify-start md:justify-between gap-4 md:gap-8 px-2 sm:px-0">
              <div className="flex items-center gap-2">
                <div
                  className="px-4 py-2 md:px-6 md:py-3 flex items-center"
                  style={{
                    backgroundColor: '#EA3C23'
                  }}
                >
                  <h2 className="font-bold text-white text-2xl md:text-4xl leading-none tracking-tight m-0">
                    {t('ourWorks')}
                  </h2>
                </div>
                <img
                  src="/titile.svg"
                  alt="Title decoration"
                  className="h-8 md:h-10"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skeleton для фильтров */}
        <div className="container-max-width px-2 sm:px-0" style={{ padding: '0 0 2rem', boxSizing: 'border-box' }}>
          <div className="flex flex-nowrap md:flex-wrap items-center gap-3 pb-2 overflow-x-auto md:overflow-x-visible pl-2 sm:pl-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 w-32 bg-gray-200 dark:bg-[#1a1a1a] rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Skeleton для карточек */}
        <div
          className="container-max-width pb-16 px-2 sm:px-0"
          style={{ padding: '0 0 4rem', boxSizing: 'border-box' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <WorkCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Обработка ошибок
  if (categoriesError || worksError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('ourWorks')}
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 mb-2">
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-800 font-medium">
                {categoriesError && t('errorLoadingCategories')}
                {worksError && t('errorLoadingWorks')}
              </p>
              <p className="text-red-600 text-sm mt-2">
                {categoriesError || worksError}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="cases" className="w-screen bg-white dark:bg-[#0b0b0b] relative z-10">
      {/* Заголовок */}
      {showHeader && (
        <div
          className="container-max-width pt-4 pb-8 px-2 sm:px-0"
          style={{
            padding: '1rem 0 2rem'
          }}
        >
          <div className="px-2 sm:px-0">
            {/* Заголовок */}
            <div className="flex items-center gap-2 mb-3">
              {/* Цветная плашка с заголовком */}
              <div
                className="px-4 py-2 md:px-6 md:py-3 flex items-center"
                style={{
                  backgroundColor: '#EA3C23'
                }}
              >
                <h2
                  className="font-bold text-white text-2xl md:text-4xl leading-none tracking-tight m-0"
                >
                  {t('ourWorks')}
                </h2>
              </div>

              {/* SVG элемент справа */}
              <img
                src="/titile.svg"
                alt="Title decoration"
                className="h-8 md:h-10"
              />
            </div>

            {/* Подзаголовок под заголовком */}
            <div className="max-w-3xl">
              <p
                className="text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-lg md:text-xl lg:text-2xl m-0 first-letter:uppercase"
                style={{
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Фильтры */}
      <div className="container-max-width px-2 sm:px-0" style={{ padding: '0 0 2rem', boxSizing: 'border-box' }}>
        <div className="flex flex-nowrap md:flex-wrap items-center gap-3 pb-2 overflow-x-auto md:overflow-x-visible pl-2 sm:pl-0">
          {(categories ?? []).map((category) => {
            const workCount = getCategoryWorkCount(category.name);
            const isActive = activeCategory === category.name;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={`group flex items-center gap-2 rounded-full border transition-all duration-300 cursor-pointer hover:-translate-y-[1px] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 ring-offset-2 shrink-0 whitespace-nowrap text-sm sm:text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-black border-black dark:border-white shadow-lg ring-black dark:ring-white scale-105'
                    : 'bg-white text-black dark:bg-[#1a1a1a] dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#222222] hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md hover:scale-102'
                }`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  letterSpacing: '0.01em',
                  padding: '10px 16px 10px 20px'
                }}
                aria-pressed={isActive}
              >
                {category.image_url && (
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-black/10 dark:ring-white/20"
                    style={{ width: '32px', height: '32px' }}
                  />
                )}
                <span className="break-words whitespace-nowrap leading-tight">{category.name}</span>

                {/* Badge со счетчиком */}
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.75rem',
                    minWidth: '24px',
                    textAlign: 'center'
                  }}
                >
                  {workCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Фильтр подкатегорий */}
        <div className="flex flex-nowrap md:flex-wrap items-center gap-3 pb-2 mt-6 overflow-x-auto md:overflow-x-visible pl-2 sm:pl-0">
        {getActiveSubcategories().map((subcategory) => {
          const workCount = getSubcategoryWorkCount(subcategory);
          const isActive = activeSubcategory === subcategory;

          return (
            <button
              key={subcategory}
              onClick={() => setActiveSubcategory(subcategory)}
              className={`group flex items-center gap-2 rounded-full border transition-all duration-300 cursor-pointer hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ring-offset-2 shrink-0 whitespace-nowrap text-xs sm:text-sm ${
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md ring-black dark:ring-white scale-105'
                  : 'bg-white text-black dark:bg-[#1a1a1a] dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#222222] hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '500',
                letterSpacing: '0.01em',
                padding: '8px 12px 8px 16px'
              }}
              aria-pressed={isActive}
            >
              <span className="break-words whitespace-nowrap leading-tight">{subcategory}</span>

              {/* Badge со счетчиком */}
              <span
                className={`px-1.5 py-0.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.7rem',
                  minWidth: '20px',
                  textAlign: 'center'
                }}
              >
                {workCount}
              </span>
            </button>
          );
        })}
      </div>
      </div>

      {/* Сетка карточек работ */}
      <div
        className="container-max-width pb-16 px-2 sm:px-0"
         style={{ padding: '0 0 4rem', boxSizing: 'border-box' }}
      >
        {filteredWorks.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0"
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <WorkCard
                    image={work.main_image_url}
                    title={work.title}
                    category={work.category?.name}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <p
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.1rem'
              }}
            >
              {t('noWorks')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CasesSection;
