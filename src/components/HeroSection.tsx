'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-float-up rounded-2xl"
                style={{ animationDelay: '0s' }}
              >
                <Image
                  src={serviceImages[0]}
                  alt="Main feature"
                  width={300}
                  height={300}
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 250px, 300px"
                  className="h-auto w-[300px] rounded-2xl shadow-2xl"
                />
              </div>
            )}
            {/* Top-Left */}
            {serviceImages[1] && (
              <div
                className="absolute left-[22%] top-[15%] z-10 animate-float-up rounded-xl"
                style={{ animationDelay: '-1.2s' }}
              >
                <Image
                  src={serviceImages[1]}
                  alt="Feature 2"
                  width={208}
                  height={208}
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 150px, 208px"
                  className="h-auto w-52 rounded-xl shadow-lg"
                />
              </div>
            )}
            {/* Top-Right */}
            {serviceImages[2] && (
              <div
                className="absolute right-[24%] top-[10%] z-10 animate-float-up rounded-xl"
                style={{ animationDelay: '-2.5s' }}
              >
                <Image
                  src={serviceImages[2]}
                  alt="Feature 3"
                  width={192}
                  height={192}
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 120px, 192px"
                  className="h-auto w-48 rounded-xl shadow-lg"
                />
              </div>
            )}
            {/* Bottom-Right */}
            {serviceImages[3] && (
              <div
                className="absolute right-[20%] bottom-[12%] z-30 animate-float-up rounded-xl"
                style={{ animationDelay: '-3.5s' }}
              >
                <Image
                  src={serviceImages[3]}
                  alt="Feature 4"
                  width={240}
                  height={240}
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 180px, 240px"
                  className="h-auto w-60 rounded-xl shadow-lg"
                />
              </div>
            )}
            {/* Far-Right */}
            {serviceImages[4] && (
              <div
                className="absolute right-[5%] top-1/2 -translate-y-[60%] z-10 animate-float-up rounded-xl"
                style={{ animationDelay: '-4.8s' }}
              >
                <Image
                  src={serviceImages[4]}
                  alt="Feature 5"
                  width={208}
                  height={208}
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 150px, 208px"
                  className="h-auto w-52 rounded-xl shadow-lg"
                />
              </div>
            )}
            {/* Bottom-Left */}
            {serviceImages[5] && (
              <div
                className="absolute left-[18%] bottom-[8%] z-30 animate-float-up rounded-xl"
                style={{ animationDelay: '-5.2s' }}
              >
                <Image
                  src={serviceImages[5]}
                  alt="Feature 6"
                  width={224}
                  height={224}
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 160px, 224px"
                  className="h-auto w-56 rounded-xl shadow-lg"
                />
              </div>
            )}
            {/* Far-Left */}
            {serviceImages[6] && (
              <div
                className="absolute left-[5%] top-[25%] z-10 animate-float-up rounded-xl"
                style={{ animationDelay: '-6s' }}
              >
                <Image
                  src={serviceImages[6]}
                  alt="Feature 7"
                  width={192}
                  height={192}
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 768px) 120px, 192px"
                  className="h-auto w-48 rounded-xl shadow-lg"
                />
              </div>
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
