'use client';

import { FC, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import OrderFormModal from '@/components/OrderFormModal';

const PrintingHeroSection: FC = () => {
  const t = useTranslations('printingMaterials');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  return (
    <section className="relative w-full h-[70vh] min-h-[600px] overflow-hidden bg-black">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img
          src="/Services/printing-materials.jpg"
          alt="Полиграфические материалы"
          className="w-full h-full object-cover"
        />
        {/* Затемнение фона */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Контент */}
      <div className="relative z-10 container-max-width h-full flex items-center px-2 sm:px-0">
        <div className="max-w-3xl">
          <h1
            className="text-white font-bold mb-6 text-3xl sm:text-5xl md:text-6xl"
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
            className="text-white/90 mb-8 max-w-2xl"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '1.5'
            }}
          >
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <InteractiveHoverButton
              onClick={() => setIsOrderFormOpen(true)}
              className="bg-[#EA3C23] text-white flex items-center justify-center hover:bg-[#D63419] transition-colors"
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
              className="bg-white text-black border border-black flex items-center justify-center hover:bg-gray-50 transition-colors"
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

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={t('title')} />
    </section>
  );
};

export default PrintingHeroSection;
