'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import ModernInput from './ModernInput';
import ModernTextarea from './ModernTextarea';
import FileUpload from './FileUpload';

interface ServiceOrderFormProps {
  title?: string;
  subtitle?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  fileSectionTitle?: string;
  serviceName?: string;
  onSubmitted?: () => void;
}

const ServiceOrderForm: FC<ServiceOrderFormProps> = ({
  title,
  subtitle,
  messageLabel,
  messagePlaceholder,
  fileSectionTitle,
  serviceName,
  onSubmitted
}) => {
  const tForm = useTranslations('serviceOrderForm');
  const resolvedTitle = title ?? tForm('title');
  const resolvedSubtitle = subtitle ?? tForm('subtitle');
  const resolvedMessageLabel = messageLabel ?? tForm('messageLabel');
  const resolvedMessagePlaceholder = messagePlaceholder ?? tForm('messagePlaceholder');
  const resolvedFileSectionTitle = fileSectionTitle ?? tForm('filesTitle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    files: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Создаем FormData для отправки
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('phone', formData.phone);
      if (formData.email) submitData.append('email', formData.email);
      if (formData.message) submitData.append('message', formData.message);
      if (serviceName) submitData.append('service_name', serviceName);

      // Добавляем файлы
      formData.files.forEach(file => {
        submitData.append('files', file);
      });

      // Отправляем данные на API
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('API Error:', result);
        throw new Error(result.error || 'Failed to submit order');
      }

      console.log('Order created:', result);

      setIsSubmitted(true);
      onSubmitted?.();

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', message: '', files: [] });
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Произошла ошибка при отправке заявки: ${errorMessage}\n\nПожалуйста, попробуйте снова или свяжитесь с нами по телефону.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="mb-8">
        <h3
          className="text-3xl font-bold text-black dark:text-white mb-2"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
        >
          {resolvedTitle}
        </h3>
        <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {resolvedSubtitle}
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-xl font-semibold text-black dark:text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {tForm('submittedTitle')}
          </h4>
          <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {tForm('submittedSubtitle')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernInput
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              label={tForm('nameLabel')}
              placeholder={tForm('namePlaceholder')}
              icon={<User className="w-5 h-5" />}
            />

            <ModernInput
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              label={tForm('phoneLabel')}
              placeholder={tForm('phonePlaceholder')}
              icon={<Phone className="w-5 h-5" />}
            />
          </div>

          <ModernInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            label={tForm('emailLabel')}
            placeholder={tForm('emailPlaceholder')}
            icon={<Mail className="w-5 h-5" />}
          />

          <ModernTextarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            label={resolvedMessageLabel}
            placeholder={resolvedMessagePlaceholder}
            icon={<MessageSquare className="w-5 h-5" />}
            rows={4}
          />

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {resolvedFileSectionTitle}
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
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '16px' }}
            >
              {isSubmitting ? tForm('submitSending') : tForm('submitLabel')}
            </InteractiveHoverButton>

            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              <p style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {tForm('privacyConsent')}
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ServiceOrderForm;