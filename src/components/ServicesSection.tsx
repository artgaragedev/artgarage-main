'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import CurvedLoop from './CurvedLoop';
import ServiceCard from './ServiceCard';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ServiceDrawer from './ServiceDrawer';

const ServicesSection: FC = () => {
  const tSection = useTranslations('servicesSection');
  const tOutdoor = useTranslations('outdoorAdvertising');
  const tInterior = useTranslations('interiorAdvertising');
  const tPos = useTranslations('posMaterials');
  const tPrint = useTranslations('printingMaterials');
  const tAdditional = useTranslations('services.additionalServices');
  const sectionCurveAmount = -200;
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [viewportWidth, setViewportWidth] = useState(0);
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const viewBoxWidth = Math.max(1440, viewportWidth);
  const baselineY = 40 + Math.max(0, -sectionCurveAmount);
  const svgHeight = Math.max(120, baselineY);
  const startX = -0.07 * viewBoxWidth;
  const endX = viewBoxWidth + 0.07 * viewBoxWidth;
  const controlX = viewBoxWidth / 2;

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

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey);
    setIsDrawerOpen(true);

    // Обновляем URL без перезагрузки страницы для deep-link
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('service', serviceKey);
      const query = params.toString();
      const newUrl = `${url.pathname}${query ? '?' + query : ''}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedService('');

    // Удаляем параметр из URL без навигации
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      if (params.has('service')) {
        params.delete('service');
        const query = params.toString();
        const newUrl = `${url.pathname}${query ? '?' + query : ''}`;
        window.history.replaceState(null, '', newUrl);
      }
    }
  };

  // Авто-открытие Drawer при наличии `?service=` на главной
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
      setIsDrawerOpen(true);
    }
  }, [searchParams]);

  return (
    <section className="w-full bg-[#F3F3F3] dark:bg-[#0b0b0b] relative overflow-visible">
      {/* Верхняя кривая фона для совпадения с CurvedLoop (-200) */}
      <svg
        className="absolute inset-x-0 top-0 w-full z-0"
        viewBox={`0 0 ${viewBoxWidth} ${svgHeight}`}
        preserveAspectRatio="none"
        aria-hidden
        style={{ height: svgHeight }}
      >
        {/* Маска верхней части: вырезает дугу из фона секции (совпадает с CurvedLoop) */}
        <path
          className="block dark:hidden"
          d={`M${startX},${baselineY} Q${controlX},${baselineY + sectionCurveAmount} ${endX},${baselineY} L${endX},0 L${startX},0 Z`}
          fill="#FFFFFF"
        />
        <path
          className="hidden dark:block"
          d={`M${startX},${baselineY} Q${controlX},${baselineY + sectionCurveAmount} ${endX},${baselineY} L${endX},0 L${startX},0 Z`}
          fill="#0b0b0b"
        />
      </svg>

      {/* CurvedLoop с анимированным текстом */}
      <div className="relative z-10">
        <CurvedLoop 
          marqueeText={tSection('marquee')}
          curveAmount={-200}
          speed={1.5}
        />
      </div>
      
      {/* Заголовок услуг под CurvedLoop */}
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
                  fontSize: '32px',
                  lineHeight: '1',
                  letterSpacing: '-0.01em',
                  margin: 0
                }}
              >
                {tSection('title')}
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
              {tSection('subtitle')}
            </p>
          </div>
        </div>


      </div>

      {/* Полноширинный Masonry Grid */}
      <div
          className="container-max-width pb-24"
          style={{
            padding: '0 0 6rem'
          }}
        >
        {/* Основные услуги — 2 колонки, full-width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-flow-row-dense gap-6 mb-8">
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
        <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row-dense gap-4">
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
            className="col-span-2 md:col-span-2"
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
    </section>
  );
};

export default ServicesSection;