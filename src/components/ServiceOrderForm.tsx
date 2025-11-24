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
    <div className="bg-white dark:bg-[#0b0b0b] rounded-3xl p-6 sm:p-10">
      <div className="mb-10">
        <h3
          className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-3 tracking-tight"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
        >
          {resolvedTitle}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
          {resolvedSubtitle}
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-16 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 animate-in zoom-in duration-700">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h4 className="text-2xl font-bold text-black dark:text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {tForm('submittedTitle')}
          </h4>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {tForm('submittedSubtitle')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
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

          <div className="pt-2">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {resolvedFileSectionTitle}
            </h4>
            <FileUpload
              onFilesChange={handleFilesChange}
              maxFiles={5}
              acceptedTypes={['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf']}
              maxSize={10}
            />
          </div>

          <div className="flex flex-col items-center space-y-5 pt-8">
            <InteractiveHoverButton
              type="submit"
              disabled={isSubmitting}
              className="bg-[#EA3C23] text-white flex items-center justify-center hover:bg-[#d63519] hover:shadow-xl hover:shadow-[#EA3C23]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 px-10 py-4 rounded-2xl w-full font-bold text-lg"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {tForm('submitSending')}
                </span>
              ) : (
                tForm('submitLabel')
              )}
            </InteractiveHoverButton>

            <div className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
              <p style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.6' }}>
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