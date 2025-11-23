'use client';

import { FC } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Check } from 'lucide-react';
// Removed ModernServiceSelector as service type selection is no longer used
import { useWorks, useCategories } from '@/hooks/useSupabaseData';
import WorkCard from './WorkCard';
import ServiceOrderForm from './ServiceOrderForm';

interface InstallationsServiceProps {
  onClose: () => void;
}

const InstallationsService: FC<InstallationsServiceProps> = ({ onClose }) => {
  const t = useTranslations('installationsPage');
  const tCases = useTranslations('cases');
  const locale = useLocale() as 'ru' | 'ro';

  // Загружаем категории, чтобы получить ID категории "Инсталляции"
  const { data: categories } = useCategories(locale);
  const installationsCategoryId = categories?.find((c: any) => c.slug === 'installyacii')?.id || '';

  // Загружаем работы только для категории "Инсталляции";
  // пока ID категории не известен — не возвращаем работы (limit: 0)
  const { data: worksData, isLoading } = useWorks(
    installationsCategoryId
      ? { categoryId: installationsCategoryId, isPublished: true }
      : { isPublished: true, limit: 0 },
    locale
  );
  const isCategoryResolving = !installationsCategoryId;
  const isWorksLoading = isLoading || isCategoryResolving;



  // Преимущества услуги инсталляций
  const advantages = [0, 1, 2, 3, 4, 5].map(i => ({
    title: t(`advantages.${i}.title`),
    description: t(`advantages.${i}.description`)
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
            src="/Services/installations.jpg"
            alt={t('title')}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('loadingWorks')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {worksData && worksData.length > 0 ? (
              worksData.map((work: any) => (
                <WorkCard
                  key={work.id}
                  image={work.main_image_url || (work.work_images?.[0]?.image_url ?? '/Services/installations.jpg')}
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
      <ServiceOrderForm
        title={t('orderTitle')}
        subtitle={t('orderSubtitle')}
        messageLabel={t('orderMessageLabel')}
        messagePlaceholder={t('orderMessagePlaceholder')}
        fileSectionTitle={t('orderFilesSectionTitle')}
        serviceName={t('title')}
      />
    </div>
  );
};

export default InstallationsService;