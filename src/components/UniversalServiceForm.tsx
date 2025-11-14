'use client';

import { FC, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Upload, Phone, Mail, User, MessageSquare, Package, Wrench, Clock, Shield, Zap } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ModernInput from './ModernInput';
import ModernTextarea from './ModernTextarea';
import FileUpload from './FileUpload';
import DTFImageGallery from './DTFImageGallery';
import { useWorksByCategory } from '@/hooks/useSupabaseData';

interface UniversalServiceFormProps {
  serviceKey: string;
  serviceCategory: string;
  serviceTitle: string;
  serviceDescription: string;
  serviceImage: string;
  onClose: () => void;
}

const UniversalServiceForm: FC<UniversalServiceFormProps> = ({ 
  serviceKey, 
  serviceCategory, 
  serviceTitle, 
  serviceDescription, 
  serviceImage,
  onClose 
}) => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    files: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Загружаем примеры работ из базы данных
  const { data: worksData, isLoading } = useWorksByCategory(serviceCategory);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilesChange = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      files
    }));
  };

  // Селектор типа услуги удалён

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Сброс формы через 3 секунды
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        files: []
      });
    }, 3000);
  };

  // Опции селектора типа услуги удалены

  // Получаем преимущества для конкретной услуги
  const getServiceAdvantages = () => {
    const getAdvFrom = (fullPath: string) => [0, 1, 2, 3].map((i) => ({
      title: t(`${fullPath}.${i}.title`),
      description: t(`${fullPath}.${i}.description`)
    }));

    if (serviceCategory === 'outdoorAdvertising') return getAdvFrom('serviceAdvantages.outdoorAdvertising');
    if (serviceCategory === 'interiorAdvertising') return getAdvFrom('serviceAdvantages.interiorAdvertising');
    if (serviceCategory === 'posMaterials') return getAdvFrom('serviceAdvantages.posMaterials');
    if (serviceCategory === 'printingMaterials') return getAdvFrom('serviceAdvantages.printingMaterials');
    if (serviceCategory === 'additionalServices' && serviceKey === 'corporateGifts') return getAdvFrom('serviceAdvantages.additionalServices.corporateGifts');
    return getAdvFrom('serviceAdvantages.base');
  };

  const advantages = getServiceAdvantages();

  // Подготовка изображений для галереи
  const galleryImages = worksData && worksData.length > 0
    ? worksData.map((work: any) => ({
        src: work.image_url || '/Services/placeholder.jpg',
        alt: work.title,
        title: work.title,
        description: work.description
      }))
    : [
        {
          src: serviceImage,
          alt: serviceTitle,
          title: serviceTitle,
          description: serviceDescription
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
          {serviceTitle}
        </h2>
        
        <div className="mb-6">
          <img
            src={serviceImage}
            alt={serviceTitle}
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
          {serviceDescription}
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
          {t('serviceAdvantages.heading')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {advantages.map((advantage: any, index: number) => (
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
          {t('cases.ourWorks')}
        </h3>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#EA3C23]"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('cases.loading')}</p>
          </div>
        ) : (
          <DTFImageGallery images={galleryImages} />
        )}
      </div>

      {/* Форма заказа */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="mb-8">
          <h3 
            className="text-3xl font-bold text-black dark:text-white mb-2"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700
            }}
          >
            {t('serviceOrderForm.title')}
          </h3>
          <p 
            className="text-gray-600 dark:text-gray-400"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {t('serviceOrderForm.subtitle')}
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 
              className="text-xl font-semibold text-black dark:text-white mb-2"
              style={{
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {t('serviceOrderForm.submittedTitle')}
            </h4>
            <p 
              className="text-gray-600 dark:text-gray-400"
              style={{
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {t('serviceOrderForm.submittedSubtitle')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Селектор типа услуги убран по требованию */}

            {/* Поля формы */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInput
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                label={t('serviceOrderForm.nameLabel')}
                placeholder={t('serviceOrderForm.namePlaceholder')}
                icon={<User className="w-5 h-5" />}
              />
              
              <ModernInput
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                label={t('serviceOrderForm.phoneLabel')}
                placeholder={t('serviceOrderForm.phonePlaceholder')}
                icon={<Phone className="w-5 h-5" />}
              />
            </div>
            
            <ModernInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              label={t('serviceOrderForm.emailLabel')}
              placeholder={t('serviceOrderForm.emailPlaceholder')}
              icon={<Mail className="w-5 h-5" />}
            />
            
            <ModernTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              label={t('serviceOrderForm.messageLabel')}
              placeholder={t('serviceOrderForm.messagePlaceholder')}
              icon={<MessageSquare className="w-5 h-5" />}
              rows={4}
            />

            {/* Загрузка файлов */}
            <div>
              <h4 
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                style={{
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                {t('serviceOrderForm.filesTitle')}
              </h4>
              <FileUpload 
                onFilesChange={handleFilesChange}
                maxFiles={5}
                acceptedTypes={['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf']}
                maxSize={10}
              />
            </div>

            <div className="flex flex-col items-center space-y-4 pt-6">
              <InteractiveHoverButton
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#EA3C23] to-[#FF6B4A] text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#EA3C23]/25 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl w-full max-w-xs"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                {isSubmitting ? t('serviceOrderForm.submitSending') : t('serviceOrderForm.submitLabel')}
              </InteractiveHoverButton>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                <p style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {t('serviceOrderForm.privacyConsent')}
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UniversalServiceForm;