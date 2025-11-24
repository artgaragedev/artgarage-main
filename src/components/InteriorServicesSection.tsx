'use client';

import { FC, useState, useEffect, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import ServiceCard from './ServiceCard';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ServiceDrawer from './ServiceDrawer';
import OrderFormModal from '@/components/OrderFormModal';
import { useWorks, useCategories } from '@/hooks/useSupabaseData';
import WorkCard from './WorkCard';

function InteriorServicesSectionContent() {
  const t = useTranslations('interiorAdvertising');
  const tCases = useTranslations('cases');
  const locale = useLocale() as 'ru' | 'ro';
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Загружаем категории и работы для "Интерьерная реклама"
  const { data: categories } = useCategories(locale);
  const interiorCategoryId = categories?.find((c: any) => c.slug === 'interiernaya-reklama')?.id || '';

  const { data: worksData, isLoading } = useWorks(
    interiorCategoryId
      ? { categoryId: interiorCategoryId, isPublished: true }
      : { isPublished: true, limit: 0 },
    locale
  );
  const isCategoryResolving = !interiorCategoryId;
  const isWorksLoading = isLoading || isCategoryResolving;
  // Услуги интерьерной рекламы
  const interiorServices = [
    {
      title: t('volumetricLetters'),
      image: "/Services/interior-volumetric-letters.jpg",
      description: t('volumetricLettersDesc'),
      key: 'volumetricLetters'
    },
    {
      title: t('lightbox'),
      image: "/Services/interior-lightbox.jpg",
      description: t('lightboxDesc'),
      key: 'lightbox'
    },
    {
      title: t('rollUp'),
      image: "/Services/interior-roll-up.jpg",
      description: t('rollUpDesc'),
      key: 'rollUp'
    },
    {
      title: t('navigation'),
      image: "/Services/interior-navigation.jpg",
      description: t('navigationDesc'),
      key: 'navigation'
    },
    {
      title: t('textileBanner'),
      image: "/Services/interior-textile-banner.jpg",
      description: t('textileBannerDesc'),
      key: 'textileBanner'
    },
    {
      title: t('pseudoVolumetricLetters'),
      image: "/Services/interior-pseudo-volumetric-letters.jpg",
      description: t('pseudoVolumetricLettersDesc'),
      key: 'pseudoVolumetricLetters'
    },
    {
      title: t('officeStickers'),
      image: "/Services/interior-office-stickers.jpg",
      description: t('officeStickersDesc'),
      key: 'officeStickers'
    }
  ];

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedService('');
  };

  // Проверяем URL параметры при загрузке компонента
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
      setIsDrawerOpen(true);
    }
  }, [searchParams]);

  return (
    <section className="w-full bg-[#ffffff] dark:bg-[#0b0b0b] py-24">
      <div className="container-max-width px-2 sm:px-0">
        {/* Заголовок секции */}
        <div className="mb-16 px-2 sm:px-0">
          <div>
            {/* Заголовок */}
            <div className="flex items-stretch gap-2 mb-3">
              {/* Цветная плашка с заголовком */}
              <div
                className="px-4 py-2 md:px-6 md:py-3 flex items-center"
                style={{
                  backgroundColor: '#EA3C23'
                }}
              >
                <h2
                  className="font-bold text-white text-2xl md:text-4xl leading-none tracking-tight m-0"
                  style={{
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {t('servicesTitle')}
                </h2>
              </div>

              {/* SVG элемент справа */}
              <img
                src="/titile.svg"
                alt="Title decoration"
                className="h-8 md:h-12"
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
                {t('servicesSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Сетка с карточками услуг */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row-dense gap-4 mb-16">
          {interiorServices.map((service, index) => (
            <ServiceCard
              key={`interior-service-${index}`}
              title={service.title}
              description={service.description}
              variant="secondary"
              image={service.image}
              onClick={() => handleServiceClick(service.key)}
            />
          ))}
        </div>

        {/* Наши работы */}
        <div className="mb-16">
          <h3
            className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-8"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700
            }}
          >
            {tCases('ourWorks')}
          </h3>

          {isWorksLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#EA3C23]"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{tCases('loading')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {worksData && worksData.length > 0 ? (
                worksData.map((work: any) => (
                  <WorkCard
                    key={work.id}
                    image={work.main_image_url || (work.work_images?.[0]?.image_url ?? '/Services/interior-advertising.jpg')}
                    title={work.title}
                    category={work.category?.name}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-600 dark:text-gray-400 py-8">
                  {tCases('noWorks')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Призыв к действию */}
        <div 
          className="w-full"
          style={{
            padding: '3rem',
            background: 'linear-gradient(135deg, #EA3C23 0%, #FF6B4A 100%)',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(234, 60, 35, 0.2)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Левая колонка - основной текст */}
            <div className="text-white">
              <h3 
                className="mb-4"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '35px',
                  fontWeight: '900',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('ctaTitle')}
              </h3>
              <p 
                className="text-white/90 mb-6"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  lineHeight: '1.5'
                }}
              >
                {t('ctaSubtitle')}
              </p>
            </div>

            {/* Правая колонка - призыв к действию */}
            <div className="text-center md:text-left">
              <h4 
                className="text-white mb-3"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '25.6px',
                  fontWeight: '700',
                  lineHeight: '1.3'
                }}
              >
                {t('ctaContactTitle')}
              </h4>
              <p 
                className="text-white/80 mb-6"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '17.6px',
                  fontWeight: '400',
                  lineHeight: '1.4'
                }}
              >
                {t('ctaContactSubtitle')}
              </p>
              <InteractiveHoverButton
                onClick={() => setIsOrderFormOpen(true)}
                className="bg-white text-black border border-black flex items-center justify-center hover:bg-gray-50 transition-colors"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  fontSize: 'var(--fs-ui)',
                  letterSpacing: '0.8px',
                  lineHeight: '1.219',
                  padding: '16px 40px',
                  borderRadius: '146.24px',
                  minWidth: '180px'
                }}
              >
                {t('getConsultation')}
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer для отображения деталей услуги */}
      <ServiceDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        serviceKey={selectedService}
        serviceCategory="interiorAdvertising"
      />

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={t('title')} />
    </section>
  );
}

const InteriorServicesSection: FC = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
      <InteriorServicesSectionContent />
    </Suspense>
  );
};

export default InteriorServicesSection;
