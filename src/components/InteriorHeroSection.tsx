'use client';

import { FC, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import OrderFormModal from '@/components/OrderFormModal';
import WorksCarousel from '@/components/WorksCarousel';

const InteriorHeroSection: FC = () => {
  const t = useTranslations('interiorAdvertising');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  return (
    <section className="relative w-full bg-white dark:bg-[#0b0b0b]">
      {/* Контент Hero */}
      <div className="relative z-10 container-max-width min-h-[500px] flex items-center px-2 sm:px-0 py-16">
        <div className="w-full flex flex-col items-center text-center">
          <h1
            className="text-black dark:text-white font-bold mb-6 text-3xl sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            {t('title')}
          </h1>

          <p
            className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '1.5'
            }}
          >
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <InteractiveHoverButton
              onClick={() => setIsOrderFormOpen(true)}
              className="bg-[#EA3C23] text-white flex items-center justify-center hover:bg-[#D63419] transition-colors text-center"
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
              {t('consultation')}
            </InteractiveHoverButton>

            <InteractiveHoverButton
              className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white border border-black dark:border-white flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#222222] transition-colors text-center"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: 'var(--fs-ui)',
                letterSpacing: '0.8px',
                lineHeight: '1.219',
                padding: '16px 40px',
                borderRadius: '146.24px',
                minWidth: '140px'
              }}
            >
              {t('ourWorks')}
            </InteractiveHoverButton>
          </div>
        </div>
      </div>

      {/* Карусель работ */}
      <WorksCarousel categorySlug="interiernaya-reklama" />

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={t('title')} />
    </section>
  );
};

export default InteriorHeroSection;
