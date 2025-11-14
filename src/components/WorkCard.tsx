'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

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
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          {/* Контейнер модального окна - компактный дизайн */}
            <div 
              className="relative w-full h-full sm:h-auto sm:max-w-3xl sm:max-h-[90vh] bg-white dark:bg-[#1F1F1F] rounded-none sm:rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'scaleIn 0.3s ease-out'
              }}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Изображение на всю модалку */}
              <div className="relative w-full h-full sm:h-[70vh] overflow-hidden">
                <img
                  src={cleanImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                
                {/* Градиент для лучшей читаемости текста */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Контент поверх изображения */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                  {/* Горизонтальное расположение: заголовок слева, кнопка справа */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    {/* Информация о работе - слева */}
                    <div className="flex-1">
                      <h2 
                        className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
                        style={{
                          fontFamily: 'Montserrat, sans-serif'
                        }}
                      >
                        {title}
                      </h2>
                      {category && (
                        <div className="mb-2">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                            {category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Кнопка заказа - справа */}
                    <div className="flex flex-col items-center sm:items-end">
                      <button
                        onClick={() => {
                          // Здесь можно добавить логику заказа
                          console.log(`Заказ: ${category}`);
                        }}
                        className="bg-[#EA3C23] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold group relative"
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
                      <p className="text-xs sm:text-sm text-white/80 text-center sm:text-right mt-2">
                        Бесплатная консультация и расчет стоимости
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}

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

export default WorkCard;