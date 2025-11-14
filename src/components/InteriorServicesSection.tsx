'use client';

import { FC, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import ServiceCard from './ServiceCard';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ServiceDrawer from './ServiceDrawer';

const InteriorServicesSection: FC = () => {
  const t = useTranslations('interiorAdvertising');
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  // Услуги интерьерной рекламы
  const interiorServices = [
    {
      title: t('volumetricLetters'),
      image: "/Services/signs.jpg",
      description: t('volumetricLettersDesc'),
      key: 'volumetricLetters'
    },
    {
      title: t('lightbox'),
      image: "/Services/large-format-printing.jpg",
      description: t('lightboxDesc'),
      key: 'lightbox'
    },
    {
      title: t('rollUp'),
      image: "/Services/flags.jpg",
      description: t('rollUpDesc'),
      key: 'rollUp'
    },
    {
      title: t('navigation'),
      image: "/Services/signs.jpg",
      description: t('navigationDesc'),
      key: 'navigation'
    },
    {
      title: t('textileBanner'),
      image: "/Services/flags.jpg",
      description: t('textileBannerDesc'),
      key: 'textileBanner'
    },
    {
      title: t('pseudoVolumetricLetters'),
      image: "/Services/signs.jpg",
      description: t('pseudoVolumetricLettersDesc'),
      key: 'pseudoVolumetricLetters'
    },
    {
      title: t('officeStickers'),
      image: "/Services/interior-advertising.jpg",
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
    <section className="w-full bg-[#F3F3F3] dark:bg-[#0b0b0b] py-24">
      <div className="container-max-width">
        {/* Заголовок секции */}
        <div className="mb-16">
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
                    fontSize: '32px',
                    lineHeight: '1',
                    letterSpacing: '-0.01em',
                    margin: 0
                  }}
                >
                  {t('servicesTitle')}
                </h2>
              </div>
              
              {/* SVG элемент справа */}
              <img 
                src="/titile.svg" 
                alt="Title decoration"
                className="h-full"
                style={{
                  height: '2.5rem'
                }}
              />
            </div>
            
            {/* Подзаголовок справа, выровнен по верхней границе */}
            <div className="self-start max-w-[58rem] flex-1 text-right">
              <p 
                className="text-black dark:text-white font-extrabold"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '24px',
                  lineHeight: '1.219',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                {t('servicesSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Сетка с карточками услуг */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row-dense gap-4 mb-16">
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
    </section>
  );
};

export default InteriorServicesSection;