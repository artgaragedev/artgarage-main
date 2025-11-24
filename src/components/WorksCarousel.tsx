'use client';

import { FC } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useWorks } from '@/hooks/useSupabaseData';

interface WorksCarouselProps {
  categorySlug: string;
}

const WorksCarousel: FC<WorksCarouselProps> = ({ categorySlug }) => {
  const locale = useLocale() as 'ru' | 'ro';

  // Получаем работы из Supabase
  const { data: allWorks, isLoading } = useWorks({ limit: 100 }, locale);

  // Фильтруем работы по slug категории
  const works = allWorks?.filter(work => work.category?.slug === categorySlug) || [];

  // Дублируем изображения для бесшовной анимации (минимум 4 раза)
  const minRepeat = Math.max(4, Math.ceil(20 / (works.length || 1)));
  const duplicatedWorks = Array(minRepeat).fill(works).flat();

  if (isLoading) {
    return (
      <div className="relative w-full h-[280px] overflow-hidden">
        <div className="flex gap-4 animate-pulse py-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative aspect-[3/4] h-56 flex-shrink-0 bg-gray-200 dark:bg-gray-800 rounded-2xl"
              style={{ rotate: `${(i % 2 === 0 ? -2 : 5)}deg` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!works || works.length === 0) {
    return null;
  }

  // Рассчитываем длительность анимации на основе количества работ
  const animationDuration = Math.max(30, works.length * 3);

  return (
    <div className="relative w-full h-[280px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <motion.div
        className="flex gap-4 py-8"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          ease: "linear",
          duration: animationDuration,
          repeat: Infinity,
        }}
      >
        {duplicatedWorks.map((work, index) => (
          <div
            key={`${work.id}-${index}`}
            className="relative aspect-[3/4] h-56 flex-shrink-0 group"
            style={{
              rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
            }}
          >
            <img
              src={work.main_image_url || '/placeholder.jpg'}
              alt={work.title}
              className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default WorksCarousel;
