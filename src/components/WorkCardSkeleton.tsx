'use client';

import { FC } from 'react';

const WorkCardSkeleton: FC = () => {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-200 dark:bg-[#1a1a1a] animate-pulse">
      {/* Изображение скелет */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        {/* Анимированный градиент */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Контент скелет */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        {/* Категория скелет */}
        <div className="mb-2">
          <div className="inline-block w-20 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Заголовок скелет */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default WorkCardSkeleton;
