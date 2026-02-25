'use client';

import { FC, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useWorks, useCategories } from '@/hooks/useSupabaseData';

interface WorksCarouselProps {
  categorySlug: string;
}

const WorksCarousel: FC<WorksCarouselProps> = ({ categorySlug }) => {
  const locale = useLocale() as 'ru' | 'ro';

  // Resolve category slug → ID, then fetch only that category's works
  const { data: categories } = useCategories(locale);
  const categoryId = useMemo(
    () => categories?.find((c: any) => c.slug === categorySlug)?.id || '',
    [categories, categorySlug]
  );

  const { data: works, isLoading } = useWorks(
    categoryId
      ? { categoryId, isPublished: true }
      : { isPublished: true, limit: 0 },
    locale
  );

  if (isLoading || !works || works.length === 0) {
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
    return null;
  }

  // Duplicate just enough for seamless loop (2x is sufficient)
  const duplicatedWorks = [...works, ...works];
  const animationDuration = Math.max(25, works.length * 3);

  return (
    <div className="relative w-full h-[280px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <div
        className="flex gap-4 py-8 carousel-track"
        style={{
          animationDuration: `${animationDuration}s`,
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {duplicatedWorks.map((work, index) => (
          <div
            key={`${work.id}-${index}`}
            className="relative aspect-[3/4] h-56 flex-shrink-0"
            style={{
              rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
            }}
          >
            <img
              src={work.main_image_url || '/placeholder.jpg'}
              alt={work.title}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes carousel-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .carousel-track {
          animation: carousel-scroll linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WorksCarousel;
