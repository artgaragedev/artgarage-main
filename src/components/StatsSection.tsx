'use client';

import { useTranslations } from 'next-intl';
import SpotlightCard from './SpotlightCard';
import { Briefcase, Users, Target, Award } from 'lucide-react';

export default function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    {
      number: '10+',
      text: t('experience'),
      icon: Briefcase
    },
    {
      number: '500+',
      text: t('projects'),
      icon: Target
    },
    {
      number: '150+',
      text: t('clients'),
      icon: Users
    },
    {
      number: '100%',
      text: t('approach'),
      icon: Award
    }
  ];

  return (
    <section
      className="w-screen bg-white dark:bg-[#0b0b0b] relative z-10"
      style={{
        padding: '2rem 0'
      }}
    >
      <div className="container-max-width px-2 sm:px-0 grid auto-rows-fr items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <SpotlightCard
            key={index}
            className="text-center h-full min-h-[160px] flex flex-col items-center justify-center"
            spotlightColor="rgba(234, 60, 35, 0.15)"
          >
            <div className="mb-4">
              {stat.icon && (
                <stat.icon
                  className="w-8 h-8 mx-auto mb-2 text-black dark:text-white"
                  strokeWidth={2}
                />
              )}
              <div
                className="font-bold text-black dark:text-white font-montserrat"
                style={{
                  fontSize: 'var(--fs-h2)',
                  lineHeight: '1.1'
                }}
              >
                {stat.number}
              </div>
            </div>
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed font-montserrat"
              style={{
                fontSize: 'var(--fs-ui)',
                lineHeight: '1.5'
              }}
            >
              {stat.text}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
