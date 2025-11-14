'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import DTFImageGallery from './DTFImageGallery';
import ServiceOrderForm from './ServiceOrderForm';
// Иконки для селектора больше не используются

interface DTFPrintingServiceProps {
  onClose: () => void;
}

const DTFPrintingService: FC<DTFPrintingServiceProps> = ({ onClose }) => {
  const t = useTranslations();
  

  const advantages = [
    {
      title: "Яркие цвета",
      description: "Насыщенные и стойкие цвета, которые не выцветают со временем"
    },
    {
      title: "Универсальность",
      description: "Подходит для различных типов тканей и твердых поверхностей"
    },
    {
      title: "Долговечность",
      description: "Изображения выдерживают многочисленные стирки и воздействия"
    },
    {
      title: "Быстрое производство",
      description: "Оперативное выполнение заказов без потери качества"
    }
  ];

  const examples = [
    {
      title: "Футболки с принтом",
      description: "Яркие принты на текстиле для корпоративного стиля или мерча"
    },
    {
      title: "Кружки и сувениры",
      description: "Персонализированные подарки с качественной печатью"
    },
    {
      title: "Наклейки на одежду",
      description: "Уникальные дизайны для самостоятельного нанесения"
    },
    {
      title: "Брендирование предметов",
      description: "Нанесение логотипов на любые твердые поверхности"
    }
  ];

  // Опции селектора удалены

  // Примеры работ для галереи
  const galleryImages = [
    {
      src: "/Services/DTF-pechat.jpg",
      alt: "DTF-печать на футболке",
      title: "Футболки с принтом",
      description: "Яркие и долговечные принты на текстиле для корпоративного стиля или мерча"
    },
    {
      src: "/Services/corporate-gifts.jpg",
      alt: "Корпоративные подарки",
      title: "Брендированные кружки",
      description: "Качественная печать на сувенирной продукции для продвижения вашего бренда"
    },
    {
      src: "/Services/flags.jpg",
      alt: "Наклейки на одежду",
      title: "Наклейки на текстиль",
      description: "Уникальные дизайны для самостоятельного нанесения на одежду"
    },
    {
      src: "/Services/photo-zone.jpg",
      alt: "Брендирование предметов",
      title: "Фотозоны с DTF-печатью",
      description: "Эффектные фотозоны с качественной печатью для мероприятий"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Заголовок и основное описание */}
      <div className="mb-8">
        <h2 
          className="text-3xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            lineHeight: '1.2'
          }}
        >
          DTF-печать: Яркие решения для вашего бизнеса
        </h2>
        
        <div className="mb-6">
          <img
            src="/Services/DTF-pechat.jpg"
            alt="DTF-печать"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        <p 
          className="text-gray-700 dark:text-gray-300 mb-6"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            lineHeight: '1.6'
          }}
        >
          DTF печать (Direct-to-Film) — это инновационный метод печати, идеально подходящий для создания ярких и качественных наклеек на одежду. 
          DTF UV — это усовершенствованная технология печати, предназначенная для нанесения изображений на твердые поверхности, такие как стекло, пластик, металл, дерево, сувенирная продукция и другие.
        </p>
      </div>

      {/* Преимущества технологии */}
      <div className="mb-8">
        <h3 
          className="text-2xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}
        >
          Преимущества DTF-печати
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-[#EA3C23] rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 
                  className="font-semibold text-black dark:text-white mb-1"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px'
                  }}
                >
                  {advantage.title}
                </h4>
                <p 
                  className="text-gray-600 dark:text-gray-400 text-sm"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Галерея примеров работ */}
      <div className="mb-8">
        <h3
          className="text-2xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}
        >
          Примеры наших работ
        </h3>
        
        <DTFImageGallery images={galleryImages} />
      </div>

      {/* Примеры применения */}
      <div className="mb-8">
        <h3 
          className="text-2xl font-bold text-black dark:text-white mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600
          }}
        >
          Примеры применения
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {examples.map((example, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 
                className="font-semibold text-black dark:text-white mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px'
                }}
              >
                {example.title}
              </h4>
              <p 
                className="text-gray-600 dark:text-gray-400 text-sm"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Форма заказа */}
      <ServiceOrderForm
        title="Заказать услугу"
        subtitle="Заполните форму и мы свяжемся с вами в течение рабочего дня"
        messageLabel="Опишите ваш заказ"
        messagePlaceholder="Расскажите подробнее о вашем заказе: количество, размеры, особенности дизайна, сроки и т.д."
        fileSectionTitle="Файлы с дизайном"
      />
    </div>
  );
};

export default DTFPrintingService;