'use client';

import { FC, useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import WorkCard from './WorkCard';
import { useCategories, useWorks } from '@/hooks/useSupabaseData';
import { LocalizedCategory, LocalizedWork } from '@/types/supabase';

const CasesSection: FC<{ showHeader?: boolean }> = ({ showHeader = true }) => {
  const locale = useLocale() as 'ru' | 'ro';
  const t = useTranslations('cases');
  
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState(t('all'));
  
  // Получаем данные из Supabase
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories(locale as 'ru' | 'ro')
  // Вычисляем ID активной категории по её локализованному имени
  const activeCategoryId = categories?.find((c) => c.name === activeCategory)?.id
  const { data: works, isLoading: worksLoading, error: worksError } = useWorks(
    {
      // Фильтруем по ID категории (если выбранная категория найдена)
      categoryId: activeCategoryId,
      limit: 50
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
    if (!categories || !works) return [];
    
    const activeWorks = works.filter(work => 
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

  // Фильтрация работ по активной категории и подкатегории
  const filteredWorks = works?.filter(work => {
    const categoryMatch = work.category?.name === activeCategory;
    const subcategoryMatch = activeSubcategory === t('all') || work.subcategory?.name === activeSubcategory;
    return categoryMatch && subcategoryMatch;
  }) || [];

  // Показываем загрузку
  if (categoriesLoading || worksLoading) {
    return (
      <section id="cases" className="w-screen bg-white dark:bg-[#0b0b0b] relative z-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA3C23] mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {t('loading')}
            </p>
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
          className="container-max-width pt-4 pb-8"
          style={{
            padding: '1rem 0 2rem'
          }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex items-center gap-2">
              {/* Цветная плашка с заголовком */}
              <div 
                className="px-6 py-3 flex items-center"
                style={{
                  backgroundColor: '#EA3C23'
                }}
              >
                <h2 
                  className="font-bold text-white"
                  style={{
                    fontSize: '1.8rem',
                    lineHeight: '1',
                    letterSpacing: '-0.01em',
                    margin: 0
                  }}
                >
                  {t('ourWorks')}
                </h2>
              </div>
              
              {/* SVG элемент справа */}
              <img 
                src="/titile.svg" 
                alt="Title decoration"
                className="h-full"
                style={{
                  height: '3rem'
                }}
              />
            </div>
            
            {/* Подзаголовок справа, выровнен по верхней границе */}
            <div className="self-start max-w-[58rem] flex-1 text-right">
              <p 
                className="text-black/90 dark:text-white/90"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.2rem',
                  lineHeight: '1.3',
                  letterSpacing: '0.01em'
                }}
              >
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Фильтры */}
      <div className="container-max-width" style={{ padding: '0 0 2rem', boxSizing: 'border-box' }}>
        <div className="flex flex-wrap gap-3 pb-2" style={{ gap: '0.8vw' }}>
          {(categories ?? []).map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`group flex items-center gap-2 rounded-full border transition-all duration-200 cursor-pointer hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ${
                activeCategory === category.name
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm ring-black dark:ring-white'
                  : 'bg-white text-black dark:bg-transparent dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-black dark:hover:border-white hover:shadow-sm'
              }`}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '0.01em',
                padding: '10px 20px'
              }}
              aria-pressed={activeCategory === category.name}
            >
              {category.image_url && (
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-black/10 dark:ring-white/20"
                  style={{ width: '32px', height: '32px' }}
                />
              )}
              <span className="break-words whitespace-normal leading-tight">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Фильтр подкатегорий */}
        <div className="flex flex-wrap gap-3 pb-2 mt-6" style={{ gap: '0.8vw' }}>
        {getActiveSubcategories().map((subcategory) => (
          <button
            key={subcategory}
            onClick={() => setActiveSubcategory(subcategory)}
            className={`group rounded-full border transition-all duration-200 cursor-pointer hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ${
               activeSubcategory === subcategory
                 ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm ring-black dark:ring-white'
                 : 'bg-white text-black dark:bg-transparent dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-black dark:hover:border-white hover:shadow-sm'
             }`}
             style={{
               fontFamily: 'Montserrat, sans-serif',
               fontSize: '16px',
               fontWeight: '500',
               letterSpacing: '0.01em',
               padding: '8px 16px'
             }}
            aria-pressed={activeSubcategory === subcategory}
          >
            <span className="break-words whitespace-normal leading-tight">{subcategory}</span>
          </button>
        ))}
      </div>
      </div>

      {/* Сетка карточек работ */}
      <div
        className="container-max-width pb-16"
         style={{ padding: '0 0 4rem', boxSizing: 'border-box' }}
      >
        {filteredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work) => (
              <WorkCard
                key={work.id}
                image={work.main_image_url}
                title={work.title}
                category={work.category?.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p 
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1.1rem'
              }}
            >
              {t('noWorks')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CasesSection;