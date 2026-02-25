'use client';

import { FC, useEffect, useState, Suspense, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, usePathname } from 'next/navigation';
import ServiceCard from './ServiceCard';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ServiceDrawer from './ServiceDrawer';
import OrderFormModal from '@/components/OrderFormModal';

// Изолированный компонент для обработки searchParams
function ServiceParamsHandler({
  onServiceSelect
}: {
  onServiceSelect: (service: string) => void
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      onServiceSelect(serviceParam);
    }
  }, [searchParams, onServiceSelect]);

  return null;
}

// Основной контент с useSearchParams обернутый в Suspense
function ServicesSectionContent() {
  const tSection = useTranslations('servicesSection');
  const tOutdoor = useTranslations('outdoorAdvertising');
  const tInterior = useTranslations('interiorAdvertising');
  const tPos = useTranslations('posMaterials');
  const tPrint = useTranslations('printingMaterials');
  const tAdditional = useTranslations('services.additionalServices');

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Создание нового query string с обновленным параметром
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Удаление параметра из query string
  const removeQueryParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  // Обработчик для открытия сервиса из URL параметра
  const handleServiceFromUrl = useCallback((service: string) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  }, []);

  // Основные категории (большие карточки) с подкатегориями
  const primaryServices = [
    {
      title: tOutdoor('title'),
      image: "/Services/outdoor-advertising.jpg",
      href: "/outdoor-advertising",
      description: undefined,
      subcategories: [
        tOutdoor('volumetricLetters'),
        tOutdoor('pseudoVolumetricLetters'),
        tOutdoor('lightbox'),
        tOutdoor('advertisingSteles'),
        tOutdoor('carBranding'),
        tOutdoor('glassStickers')
      ]
    },
    {
      title: tInterior('title'),
      image: "/Services/interior-advertising.jpg",
      href: "/interior-advertising",
      description: undefined,
      subcategories: [
        tInterior('volumetricLetters'),
        tInterior('pseudoVolumetricLetters'),
        tInterior('lightbox'),
        tInterior('officeStickers'),
        tInterior('navigation'),
        tInterior('textileBanner')
      ]
    },
    {
      title: tPos('title'),
      image: "/Services/POSM-materialy.jpg",
      href: "/pos-materials",
      description: undefined,
      subcategories: [
        tPos('brandedAccessories'),
        tPos('infoPanels'),
        tPos('lifeSizeFigures'),
        tPos('stands')
      ]
    },
    {
      title: tPrint('title'),
      image: "/Services/printing-materials.jpg",
      href: "/printing-materials",
      description: undefined,
      subcategories: [
        tPrint('magazines'),
        tPrint('stickers')
      ]
    }
  ];

  // Дополнительные категории (маленькие карточки)
  const secondaryServices = [
    { title: tAdditional('dtfPrinting.title'), image: "/Services/DTF-pechat.jpg", key: 'dtfPrinting' },
    { title: tAdditional('installations.title'), image: "/Services/installations.jpg", key: 'installations' },
    { title: tAdditional('corporateGifts.title'), image: "/Services/corporate-gifts.jpg", key: 'corporateGifts' },
    { title: tAdditional('trophies.title'), image: "/Services/trophies.jpg", key: 'trophies' },
    { title: tAdditional('signs.title'), image: "/Services/signs.jpg", key: 'signs' },
    { title: tAdditional('flags.title'), image: "/Services/flags.jpg", key: 'flags' },
    { title: tAdditional('photoZone.title'), image: "/Services/photo-zone.jpg", key: 'photoZone' },
    { title: tAdditional('millingOrLaser.title'), image: "/Services/milling-or-laser.jpg", key: 'millingOrLaser' },
    { title: tAdditional('largeFormatPrinting.title'), image: "/Services/large-format-printing.jpg", key: 'largeFormatPrinting' },
    { title: tAdditional('expoStands.title'), image: "/Services/expo-stands.jpg", key: 'expoStands' }
  ];

  const handleServiceClick = useCallback((serviceKey: string) => {
    setSelectedService(serviceKey);
    setIsDrawerOpen(true);
    const newQueryString = createQueryString('service', serviceKey);
    window.history.replaceState(null, '', `${pathname}?${newQueryString}`);
  }, [createQueryString, pathname]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setSelectedService('');
    const newQueryString = removeQueryParam('service');
    window.history.replaceState(null, '', `${pathname}${newQueryString ? '?' + newQueryString : ''}`);
  }, [removeQueryParam, pathname]);


  return (
    <section className="w-full bg-[#ffffff] dark:bg-[#0b0b0b] relative overflow-visible">
      {/* Обработчик URL параметров */}
      <Suspense fallback={null}>
        <ServiceParamsHandler onServiceSelect={handleServiceFromUrl} />
      </Suspense>

      {/* Заголовок услуг */}
      <div
        className="container-max-width pt-16 pb-8 px-2 sm:px-0"
        style={{
          padding: '4rem 0 2rem'
        }}
      >
        <div className="px-2 sm:px-0">
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
              >
                {tSection('title')}
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
              {tSection('subtitle')}
            </p>
          </div>
        </div>


      </div>

      {/* Полноширинный Masonry Grid */}
      <div
          className="container-max-width pb-24 px-2 sm:px-0"
          style={{
            padding: '0 0 6rem'
          }}
        >
        {/* Основные услуги — 2 колонки, full-width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row-dense gap-6 mb-8 px-2 sm:px-0">
          {primaryServices.map((service, index) => (
            <ServiceCard
              key={`primary-${index}`}
              title={service.title}
              description={service.description}
              variant="primary"
              image={service.image}
              href={service.href}
              subcategories={service.subcategories}
            />
          ))}
        </div>

        {/* Дополнительные услуги — 3 колонки, full-width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row-dense gap-4 px-2 sm:px-0">
          {secondaryServices.map((service, index) => (
            <ServiceCard
              key={`secondary-${index}`}
              title={service.title}
              variant="secondary"
              image={service.image}
              onClick={() => handleServiceClick(service.key)}
            />
          ))}
          
          {/* Блок с призывом к действию - занимает 2 колонки */}
          <div 
            className="col-span-1 md:col-span-2"
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #EA3C23 0%, #FF6B4A 100%)',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(234, 60, 35, 0.2)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
              {/* Левая колонка - основной текст */}
              <div className="text-white">
                <h3 
                  className="mb-3"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '28.8px',
                    fontWeight: '900',
                    lineHeight: '1.2',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {tSection('ctaTitle')}
                </h3>
                <p 
                  className="text-white/90 mb-4"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}
                >
                  {tSection('ctaSubtitle')}
                </p>
              </div>

              {/* Правая колонка - призыв к действию */}
              <div className="text-center md:text-left">
                <h4 
                  className="text-white mb-2"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                    fontWeight: '700',
                    lineHeight: '1.3'
                  }}
                >
                  {tSection('ctaContactTitle')}
                </h4>
                <p 
                  className="text-white/80 mb-4"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                    fontWeight: '400',
                    lineHeight: '1.4'
                  }}
                >
                  {tSection('ctaContactSubtitle')}
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
                  {tSection('getConsultation')}
                </InteractiveHoverButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer для дополнительных услуг с главной страницы */}
      <ServiceDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        serviceKey={selectedService}
        serviceCategory="additionalServices"
      />

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={tSection('title')} />
    </section>
  );
}

// Главный компонент с Suspense boundary
const ServicesSection: FC = () => {
  return (
    <Suspense fallback={
      <section className="w-full bg-[#ffffff] dark:bg-[#0b0b0b] relative overflow-visible">
        <div className="container-max-width pt-16 pb-8 px-2 sm:px-0" style={{ padding: '4rem 0 2rem' }}>
          <div className="px-2 sm:px-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-4 py-2 md:px-6 md:py-3 flex items-center" style={{ backgroundColor: '#EA3C23' }}>
                <h2 className="font-bold text-white text-2xl md:text-4xl leading-none tracking-tight m-0">
                  Загрузка...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    }>
      <ServicesSectionContent />
    </Suspense>
  );
};

export default ServicesSection;
