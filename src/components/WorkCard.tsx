'use client';

import { FC, useState, memo } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import OrderFormModal from '@/components/OrderFormModal';

// Sanitize incoming image URLs from Supabase to avoid invalid src
const sanitizeImageUrl = (url: string): string => {
  if (!url) return '';
  const s = url.trim().replace(/^['"]+|['"]+$/g, '');
  // Prefer extracting the actual URL if the string contains extra chars
  const match = s.match(/https?:\/\/[^\s'"<>)]+/);
  if (match) return match[0];
  // Fallback: remove trailing parenthesis/spaces that sometimes leak from CMS
  return s.replace(/[)\s]+$/, '');
};

interface WorkCardProps {
  image: string;
  title: string;
  category?: string;
}

const WorkCard: FC<WorkCardProps> = ({ image, title, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cleanImage = sanitizeImageUrl(image);

  return (
    <>
      {/* Карточка работы */}
      <div 
        className="group cursor-pointer relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
        onClick={openModal}
      >
        {/* Изображение на весь блок */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={cleanImage}
            alt={title}
            fill
            loading="lazy"
            priority={false}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Темный оверлей для лучшей читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
        </div>
        
        {/* Контент поверх изображения */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Категория в полупрозрачной плашке */}
          {category && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                {category}
              </span>
            </div>
          )}
          
          {/* Заголовок */}
          <h3 
            className="text-white font-semibold group-hover:text-[#EA3C23] transition-colors duration-300"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.1rem',
              lineHeight: '1.3'
            }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
          onClick={closeModal}
        >
          {/* Контейнер модального окна - адаптивный под размер фото */}
            <div
              className="relative w-full max-w-[95vw] max-h-[95vh] sm:w-auto sm:max-w-[90vw] sm:max-h-[90vh] flex flex-col bg-white dark:bg-[#1F1F1F] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'scaleIn 0.3s ease-out'
              }}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 sm:p-2 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Контейнер изображения - подгоняется под размер фото */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black/5 dark:bg-black/20">
                <img
                  src={cleanImage}
                  alt={title}
                  loading="lazy"
                  className="max-w-full max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-180px)] w-auto h-auto object-contain"
                />
              </div>

              {/* Информация под изображением */}
              <div className="relative bg-white dark:bg-[#1F1F1F] p-4 sm:p-6 border-t border-gray-200 dark:border-gray-800">
                {/* Горизонтальное расположение: заголовок слева, кнопка справа */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Информация о работе - слева */}
                  <div className="flex-1">
                    <h2
                      className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white"
                      style={{
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      {title}
                    </h2>
                    {category && (
                      <div>
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 text-sm rounded-full">
                          {category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Кнопка заказа - справа */}
                  <div className="flex flex-col items-center sm:items-end">
                    <button
                      onClick={() => {
                        setIsOrderFormOpen(true);
                      }}
                      className="bg-[#EA3C23] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold group relative w-full sm:w-auto"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: 'var(--fs-ui)',
                        letterSpacing: '0.8px',
                        lineHeight: '1.219',
                        padding: '12px 30px',
                        borderRadius: '146.24px',
                        minWidth: '160px',
                        maxWidth: '280px'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-white h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
                        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                           Оставить заявку
                         </span>
                       </div>
                       <div className="text-white group-hover:text-black absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                         <span>Оставить заявку</span>
                        <svg className="w-4 h-4 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>

                    {/* Дополнительная информация */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right mt-2">
                      Бесплатная консультация и расчет стоимости
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}

      {/* Модалка с формой заказа */}
      <OrderFormModal open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen} serviceName={category || title} />

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

// Мемоизируем компонент для предотвращения ненужных ре-рендеров
export default memo(WorkCard);