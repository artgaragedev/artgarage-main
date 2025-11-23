'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { HeroCollage } from '@/components/ui/modern-hero-section';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import OrderFormModal from '@/components/OrderFormModal';

export function HeroSection() {
  const t = useTranslations('hero');
  const s = useTranslations('stats');
  const locale = useLocale();
  const router = useRouter();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Изображения услуг из папки public
  const serviceImages = [
    '/Services/outdoor-advertising.jpg',
    '/Services/interior-advertising.jpg',
    '/Services/POSM-materialy.jpg',
    '/Services/printing-materials.jpg',
    '/Services/DTF-pechat.jpg',
    '/Services/installations.jpg',
    '/Services/corporate-gifts.jpg',
  ];

  // Пустой массив статистики (не показываем)
  const stats: { value: string; label: string }[] = [];

  return (
    <>
      <section className="relative w-full bg-white dark:bg-[#0b0b0b] py-20 sm:py-32">
        {/* Заголовок */}
        <div className="container-max-width relative z-10 mx-auto px-2 sm:px-6 text-center">
          <h1
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-black dark:text-white mb-6 leading-tight sm:whitespace-nowrap"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          >
            {t('title')}
          </h1>

          {/* Подзаголовок сразу под заголовком */}
          <p
            className="mx-auto max-w-3xl text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {t('subtitleIntro')} <span className="font-bold italic" style={{ color: '#ea3c23' }}>{t('subtitleAccent')}</span>
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <InteractiveHoverButton
              onClick={() => setIsOrderFormOpen(true)}
              className="bg-[#EA3C23] text-white hover:bg-[#D63419] transition-colors whitespace-nowrap"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                padding: '16px 40px',
                borderRadius: '146.24px',
                fontSize: '16px',
              }}
            >
              {t('orderButton')}
            </InteractiveHoverButton>

            <InteractiveHoverButton
              onClick={() => router.push(`/${locale}/services`)}
              className="bg-white dark:bg-[#0b0b0b] text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors whitespace-nowrap"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                padding: '16px 40px',
                borderRadius: '146.24px',
                fontSize: '16px',
              }}
            >
              {t('servicesButton')}
            </InteractiveHoverButton>
          </div>
        </div>

        {/* Коллаж изображений */}
        <div className="relative z-0 mt-12 h-[600px] flex items-center justify-center">
          <div className="relative h-full w-full max-w-6xl">
            {/* Центральное изображение */}
            {serviceImages[0] && (
              <img
                src={serviceImages[0]}
                alt="Main feature"
                className="absolute left-1/2 top-1/2 h-auto w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-20 animate-float-up"
                style={{ animationDelay: '0s' }}
              />
            )}
            {/* Top-Left */}
            {serviceImages[1] && (
              <img
                src={serviceImages[1]}
                alt="Feature 2"
                className="absolute left-[22%] top-[15%] h-auto w-52 rounded-xl shadow-lg z-10 animate-float-up"
                style={{ animationDelay: '-1.2s' }}
              />
            )}
            {/* Top-Right */}
            {serviceImages[2] && (
              <img
                src={serviceImages[2]}
                alt="Feature 3"
                className="absolute right-[24%] top-[10%] h-auto w-48 rounded-xl shadow-lg z-10 animate-float-up"
                style={{ animationDelay: '-2.5s' }}
              />
            )}
            {/* Bottom-Right */}
            {serviceImages[3] && (
              <img
                src={serviceImages[3]}
                alt="Feature 4"
                className="absolute right-[20%] bottom-[12%] h-auto w-60 rounded-xl shadow-lg z-30 animate-float-up"
                style={{ animationDelay: '-3.5s' }}
              />
            )}
            {/* Far-Right */}
            {serviceImages[4] && (
              <img
                src={serviceImages[4]}
                alt="Feature 5"
                className="absolute right-[5%] top-1/2 -translate-y-[60%] h-auto w-52 rounded-xl shadow-lg z-10 animate-float-up"
                style={{ animationDelay: '-4.8s' }}
              />
            )}
            {/* Bottom-Left */}
            {serviceImages[5] && (
              <img
                src={serviceImages[5]}
                alt="Feature 6"
                className="absolute left-[18%] bottom-[8%] h-auto w-56 rounded-xl shadow-lg z-30 animate-float-up"
                style={{ animationDelay: '-5.2s' }}
              />
            )}
            {/* Far-Left */}
            {serviceImages[6] && (
              <img
                src={serviceImages[6]}
                alt="Feature 7"
                className="absolute left-[5%] top-[25%] h-auto w-48 rounded-xl shadow-lg z-10 animate-float-up"
                style={{ animationDelay: '-6s' }}
              />
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes float-up {
            0% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
            50% { transform: translateY(-15px); box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3); }
            100% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
          }
          .animate-float-up {
            animation: float-up 6s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={t('title')} />
    </>
  );
}
