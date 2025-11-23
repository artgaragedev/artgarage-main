'use client';

import { FC } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import ServiceOrderForm from './ServiceOrderForm';
import { useWorks, useCategories } from '@/hooks/useSupabaseData';
import WorkCard from './WorkCard';

interface DTFPrintingServiceProps {
  onClose: () => void;
}

const DTFPrintingService: FC<DTFPrintingServiceProps> = ({ onClose }) => {
  const t = useTranslations('dtfPrintingPage');
  const tCases = useTranslations('cases');
  const locale = useLocale() as 'ru' | 'ro';

  // Загружаем категории, чтобы получить ID категории "DTF Печать"
  const { data: categories } = useCategories(locale);
  const dtfCategoryId = categories?.find((c: any) => c.slug === 'dtf-pechat')?.id || '';

  // Загружаем работы для категории "DTF Печать"
  const { data: worksData, isLoading } = useWorks(
    dtfCategoryId
      ? { categoryId: dtfCategoryId, isPublished: true }
      : { isPublished: true, limit: 0 },
    locale
  );
  const isCategoryResolving = !dtfCategoryId;
  const isWorksLoading = isLoading || isCategoryResolving;


  const advantages = [0, 1, 2, 3].map(i => ({
    title: t(`advantages.${i}.title`),
    description: t(`advantages.${i}.description`)
  }));

  const examples = [0, 1, 2, 3].map(i => ({
    title: t(`examples.${i}.title`),
    description: t(`examples.${i}.description`)
  }));

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Заголовок и основное описание */}
      <div className="mb-8">
        <h2
          className="text-3xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            lineHeight: '1.2'
          }}
        >
          {t('title')}
        </h2>

        <div className="mb-6">
          <img
            src="/Services/DTF-pechat.jpg"
            alt={t('gallery.0.alt')}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        <p
          className="text-gray-700 dark:text-gray-300 mb-6"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            lineHeight: '1.6'
          }}
        >
          {t('description')}
        </p>
      </div>

      {/* Преимущества технологии */}
      <div className="mb-8">
        <h3
          className="text-2xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}
        >
          {t('advantagesTitle')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-[#EA3C23] rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 
                  className="font-semibold text-black dark:text-white mb-1"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px'
                  }}
                >
                  {advantage.title}
                </h4>
                <p 
                  className="text-gray-600 dark:text-gray-400 text-sm"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Примеры применения */}
      <div className="mb-8">
        <h3
          className="text-2xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}
        >
          {t('examplesTitle')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {examples.map((example, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 
                className="font-semibold text-black dark:text-white mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px'
                }}
              >
                {example.title}
              </h4>
              <p 
                className="text-gray-600 dark:text-gray-400 text-sm"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Наши работы: вывод карточек из Supabase */}
      <div className="mb-8">
        <h3
          className="text-2xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}
        >
          {tCases('ourWorks')}
        </h3>

        {isWorksLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#EA3C23]"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{tCases('loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {worksData && worksData.length > 0 ? (
              worksData.map((work: any) => (
                <WorkCard
                  key={work.id}
                  image={work.main_image_url || (work.work_images?.[0]?.image_url ?? '/Services/DTF-pechat.jpg')}
                  title={work.title}
                  category={work.category?.name}
                />
              ))
            ) : (
              <div className="col-span-full text-gray-600 dark:text-gray-400">
                {tCases('noWorks')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Форма заказа */}
      <ServiceOrderForm serviceName={t('title')} />
    </div>
  );
};

export default DTFPrintingService;