'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import SplitText from '@/components/SplitText';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export function HeroSection() {
  const t = useTranslations('hero');
  const s = useTranslations('stats');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const timer = setTimeout(() => setIsLoaded(true), 100);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative w-screen overflow-hidden bg-white dark:bg-[#0b0b0b]" style={{ paddingBottom: '80px' }}>
      
      {/* Основной контент */}
      <div className="container-max-width relative z-10 flex items-center px-6 py-20" style={{ minHeight: '600px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Левая колонка - контент с заголовком */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Заголовок */}
            <div className={`transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms', ['--fs-h1']: '70px' } as React.CSSProperties}>
              <div className="space-y-1">
                <SplitText
                  text={t('title').split(' ')[0]}
                  tag="h1"
                  className="font-bold leading-[1.05] text-black dark:text-white"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: '1.05',
                    textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                  }}
                  delay={30}
                  duration={0.8}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.2}
                  textAlign="left"
                />
                <SplitText
                  text={t('title').split(' ').slice(1).join(' ')}
                  tag="h1"
                  className="font-bold leading-[1.05] text-black dark:text-white"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: '1.05',
                    textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                  }}
                  delay={30}
                  duration={0.8}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.2}
                  textAlign="left"
                />
              </div>
            </div>


            {/* Подзаголовок с акцентом */}
            <div className={`space-y-6 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="space-y-2 max-w-lg">
                <p className="text-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('subtitleIntro')}
                </p>
                <p className="font-bold text-2xl italic" style={{ color: '#ea3c23' }}>
                  {t('subtitleAccent')}
                </p>
              </div>
            </div>

            {/* Кнопки */}
            <div className={`flex flex-col sm:flex-row gap-5 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '600ms' }}>
              <InteractiveHoverButton
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
                {t('callButton')}
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
                {t('servicesButton')}
              </InteractiveHoverButton>
            </div>

          </div>

          {/* Правая колонка - анимированный контент */}
          <div className={`relative order-1 lg:order-2 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} style={{ transitionDelay: '600ms' }}>
            {/* Основной контейнер с анимацией */}
            <div className="relative">
              {/* Декоративный фон */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-2xl animate-pulse" />
              
              {/* Основной блок с GIF */}
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden">
                  <Image
                    src="/Comp-1.gif"
                    alt="Animation"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  
                  {/* Оверлей с градиентом */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Плавающие элементы */}
              <div 
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: '0.5s', animationDuration: '3s' }}
              />
              <div 
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: '1s', animationDuration: '3s' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Скролл индикатор */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}