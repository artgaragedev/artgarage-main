'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const DesignSection: FC = () => {
  const t = useTranslations('design');
  return (
    <section className="relative w-screen bg-white dark:bg-[#0b0b0b] transition-colors duration-300">
      {/* Content */}
      <div>{/* Design section title */}
      <div
        className="container-max-width pb-8"
        style={{
          paddingTop: '100px',
          paddingBottom: '2rem'
        }}
      >
        <div className="flex items-start justify-between gap-8">
          <div className="flex items-center gap-2">
            {/* Colored banner with title */}
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
                {t('title')}
              </h2>
            </div>
            
            {/* SVG element on the right */}
            <img 
              src="/titile.svg" 
              alt="Title decoration"
              className="h-full"
              style={{
                height: '2.5rem'
              }}
            />
          </div>
          
          {/* Subtitle on the right, aligned to top border */}
          <div className="self-start max-w-[58rem] flex-1 text-right">
            <p 
              className="text-black dark:text-white font-extrabold"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '24px',
                lineHeight: '1.219',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: 0,
                whiteSpace: 'pre-line'
              }}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Контент секции дизайн */}
      <div
        className="container-max-width pb-24"
        style={{
          padding: '0 0 6rem'
        }}
      >
        <div className="mx-auto">
          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              
              <div 
                className="relative flex items-center justify-center overflow-hidden"
                style={{ height: '80vh' }}
              >


                <img 
                  src="/Services/tree.png" 
                  alt="Design tree illustration"
                  className="max-w-full max-h-full object-contain relative z-10"
                />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div 
                className="flex flex-col justify-center items-start space-y-8 px-4"
                style={{ height: '80vh' }}
              >
                {/* 2D & 3D banner */}
                <div 
                  className="inline-block px-8 py-4 self-start"
                  style={{
                    border: '2px solid #EA3C23',
                    backgroundColor: 'transparent',
                    borderRadius: '12px'
                  }}
                >
                  <span 
                    className="text-black dark:text-white"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 900,
                      fontSize: "3rem",
                      letterSpacing: "0.02em"
                    }}
                  >
                    {t('twoDThreeD')}
                  </span>
                </div>

                {/* Structured text */}
                <div className="space-y-4 max-w-lg text-left">
                  <p 
                    className="text-black dark:text-white font-semibold"
                    style={{ 
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1.25rem", 
                      fontWeight: 600,
                      lineHeight: "1.4"
                    }}
                  >
                    {t('designComplexityTitle')}
                  </p>
                  
                  <p 
                    className="text-black dark:text-white"
                    style={{ 
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem", 
                      fontWeight: 400,
                      lineHeight: "1.6"
                    }}
                  >
                    {t('designComplexityDesc1')}
                  </p>
                  
                  <p 
                    className="text-black dark:text-white"
                    style={{ 
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem", 
                      fontWeight: 400,
                      lineHeight: "1.6"
                    }}
                  >
                    {t('designComplexityDesc2')}
                  </p>
                </div>
                
                <InteractiveHoverButton 
                  className="bg-[#EA3C23] text-white flex items-center justify-center hover:bg-[#d63419] transition-colors self-start"
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
      </div>
      </div>
    </section>
  );
};

export default DesignSection;