'use client';

import { FC, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import OrderFormModal from '@/components/OrderFormModal';

const DesignSection: FC = () => {
  const t = useTranslations('design');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b0b0b] py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-2 sm:px-6 space-y-12">

        {/* Header */}
        <div className={`transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '100ms' }}>
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
                  {t('title')}
                </h2>
              </div>

              {/* SVG элемент справа */}
              <Image
                src="/titile.svg"
                alt="Title decoration"
                width={48}
                height={48}
                className="h-8 md:h-12 w-auto"
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

        {/* Content Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>

          {/* Left column - Image */}
          <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] dark:bg-slate-800 p-6 flex items-center justify-center">
            <div className="relative w-full max-h-[350px] md:max-h-[450px] flex items-center justify-center">
              <Image
                src="/Services/tree.webp"
                alt="Design tree illustration"
                width={535}
                height={936}
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-auto h-auto object-contain max-h-[350px] md:max-h-[450px]"
              />
            </div>
          </div>

          {/* Right column - Content */}
          <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] dark:bg-slate-800 p-6 md:p-8">
            <div className="flex flex-col justify-center space-y-6 h-full">

              {/* 2D & 3D badge */}
              <div className="inline-block self-start">
                <div
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl border-2 border-[#EA3C23] bg-white dark:bg-[#0b0b0b]"
                >
                  <span
                    className="text-black dark:text-white font-extrabold text-2xl sm:text-3xl md:text-5xl"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {t('twoDThreeD')}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-4">
                <h3
                  className="text-black dark:text-white font-bold text-xl sm:text-2xl"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    lineHeight: '1.3',
                  }}
                >
                  {t('designComplexityTitle')}
                </h3>

                <div className="space-y-3">
                  <p
                    className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {t('designComplexityDesc1')}
                  </p>

                  <p
                    className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {t('designComplexityDesc2')}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <InteractiveHoverButton
                onClick={() => setIsOrderFormOpen(true)}
                className="bg-[#EA3C23] text-white hover:bg-[#D63419] transition-colors self-start"
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
                {t('orderProject')}
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </div>

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={t('title')} />
    </section>
  );
};

export default DesignSection;
