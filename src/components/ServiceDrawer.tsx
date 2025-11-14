'use client';

import { FC, useEffect } from 'react';
import { X, Share2, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerCloseButton,
  DrawerHandle
} from '@/components/ui/drawer';
import DTFPrintingService from './DTFPrintingService';
import ServiceOrderForm from './ServiceOrderForm';
import InstallationsService from './InstallationsService';

interface ServiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  serviceKey: string;
  serviceCategory: string;
}

const ServiceDrawer: FC<ServiceDrawerProps> = ({ isOpen, onClose, serviceKey, serviceCategory }) => {
  const t = useTranslations();
  const router = useRouter();
  // Не используем next/navigation useSearchParams, чтобы избежать лишних перерендеров

  // Получаем данные об услуге из переводов только если есть ключ (во избежание MISSING_MESSAGE)
  // Все категории drawer читаются из вложенного блока services
  const prefix = `services.${serviceCategory}`;

  const serviceData = serviceKey
    ? {
        title: t(`${prefix}.${serviceKey}.title`),
        description: t(`${prefix}.${serviceKey}.description`),
        image: t(`${prefix}.${serviceKey}.image`)
      }
    : null;

  // Текущая локаль и корректный маршрут категории для формирования URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const localeMatch = currentPath.match(/^\/(ru|ro)/);
  const currentLocale = localeMatch ? localeMatch[1] : 'ru';
  const categoryRoutes: Record<string, string> = {
    outdoorAdvertising: 'outdoor-advertising',
    interiorAdvertising: 'interior-advertising',
    posMaterials: 'pos-materials',
    printingMaterials: 'printing-materials',
    additionalServices: ''
  };
  const categoryRoute = categoryRoutes[serviceCategory] || serviceCategory;
  const baseRoute = categoryRoute ? `/${currentLocale}/${categoryRoute}` : `/${currentLocale}`;
  const serviceUrl = categoryRoute
    ? `/${currentLocale}/${categoryRoute}/${serviceKey}`
    : `/${currentLocale}?service=${serviceKey}`;

  // Закрытие drawer при нажатии на Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Обновление URL при открытии/закрытии drawer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Для дополнительных услуг на главной странице полностью избегаем
    // изменения поисковых параметров, чтобы не провоцировать навигацию/перерендер.
    // Состояние Drawer управляется локально, а deep-link (\"?service=...\")
    // обрабатывается при первоначальной загрузке на уровне секции.
    if (!categoryRoute) {
      return;
    }

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const current = params.get('service');

    const updateUrlWithoutReload = (newUrl: string) => {
      // Меняем URL без перезагрузки страницы
      window.history.replaceState(null, '', newUrl);
    };

    if (isOpen && serviceKey) {
      // Обновляем только если значение отличается
      if (current !== serviceKey) {
        params.set('service', serviceKey);
        const query = params.toString();
        const newUrl = `${baseRoute}${query ? '?' + query : ''}`;
        router.replace(newUrl, { scroll: false });
      }
    } else if (!isOpen) {
      if (current) {
        params.delete('service');
        const query = params.toString();
        const newUrl = `${baseRoute}${query ? '?' + query : ''}`;
        router.replace(newUrl, { scroll: false });
      }
    }
  }, [isOpen, serviceKey, currentLocale, categoryRoute, router]);

  if (!isOpen || !serviceData) return null;

  // Специальный компонент для DTF-печати
  if (serviceKey === 'dtfPrinting') {
    return (
      <Drawer
        direction="bottom"
        open={isOpen}
        onOpenChange={(open) => { if (!open) onClose(); }}
      >
        <DrawerContent
          className="w-screen h-[95vh] flex flex-col bg-white dark:bg-[#0b0b0b]"
          showScrollIndicator={true}
        >
          <DrawerHandle className="mx-auto my-3" />
          <DrawerHeader className="sticky top-0 z-10 bg-white dark:bg-[#0b0b0b] border-b border-gray-200 dark:border-gray-800 px-8 max-w-[1280px] w-full mx-auto">
            <DrawerTitle
              className="text-3xl font-bold text-black dark:text-white"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                lineHeight: '1.2'
              }}
            >
              {serviceData.title}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {t('serviceDrawer.detailsTitle')}
            </DrawerDescription>

            {/* Кнопка закрытия */}
            <DrawerCloseButton onClick={onClose}>
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </DrawerCloseButton>

            {/* Кнопка поделиться */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: serviceData.title,
                    text: serviceData.description,
                    url: window.location.origin + serviceUrl,
                  }).catch(err => console.log('Error sharing:', err));
                } else {
                  navigator.clipboard.writeText(window.location.origin + serviceUrl)
                    .then(() => alert(t('serviceDrawer.linkCopied')))
                    .catch(err => console.log('Error copying:', err));
                }
              }}
              className="absolute top-4 right-16 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </DrawerHeader>

          {/* Контент drawer с кастомным компонентом для DTF */}
          <div className="p-8 pt-2 max-w-[1280px] w-full mx-auto flex-1 min-h-0 overflow-y-auto">
            <DTFPrintingService onClose={onClose} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Специальный компонент для Инсталляций
  if (serviceKey === 'installations') {
    return (
      <Drawer
        direction="bottom"
        open={isOpen}
        onOpenChange={(open) => { if (!open) onClose(); }}
      >
        <DrawerContent
          className="w-screen h-[95vh] flex flex-col bg-white dark:bg-[#0b0b0b]"
          showScrollIndicator={true}
        >
          <DrawerHandle className="mx-auto my-3" />
          <DrawerHeader className="sticky top-0 z-10 bg-white dark:bg-[#0b0b0b] border-b border-gray-200 dark:border-gray-800 px-8 max-w-[1280px] w-full mx-auto">
            <DrawerTitle
              className="text-3xl font-bold text-black dark:text-white"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                lineHeight: '1.2'
              }}
            >
              {serviceData.title}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {t('serviceDrawer.detailsTitle')}
            </DrawerDescription>

            {/* Кнопка закрытия */}
            <DrawerCloseButton onClick={onClose}>
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </DrawerCloseButton>

            {/* Кнопка поделиться */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: serviceData.title,
                    text: serviceData.description,
                    url: window.location.origin + serviceUrl,
                  }).catch(err => console.log('Error sharing:', err));
                } else {
                  navigator.clipboard.writeText(window.location.origin + serviceUrl)
                    .then(() => alert(t('serviceDrawer.linkCopied')))
                    .catch(err => console.log('Error copying:', err));
                }
              }}
              className="absolute top-4 right-16 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </DrawerHeader>

          {/* Контент drawer со специальным компонентом для Инсталляций */}
          <div className="p-8 pt-2 max-w-[1280px] w-full mx-auto flex-1 min-h-0 overflow-y-auto">
            <InstallationsService onClose={onClose} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Универсальные преимущества в зависимости от категории (локализованные)
  const getServiceAdvantages = () => {
    const getAdvFrom = (fullPath: string) => [0, 1, 2, 3].map((i) => ({
      title: t(`${fullPath}.${i}.title`),
      description: t(`${fullPath}.${i}.description`)
    }));

    if (serviceCategory === 'outdoorAdvertising') {
      return getAdvFrom('serviceAdvantages.outdoorAdvertising');
    }

    if (serviceCategory === 'interiorAdvertising') {
      return getAdvFrom('serviceAdvantages.interiorAdvertising');
    }

    if (serviceCategory === 'posMaterials') {
      return getAdvFrom('serviceAdvantages.posMaterials');
    }

    if (serviceCategory === 'printingMaterials') {
      return getAdvFrom('serviceAdvantages.printingMaterials');
    }

    if (serviceCategory === 'additionalServices') {
      if (serviceKey === 'corporateGifts') {
        return getAdvFrom('serviceAdvantages.additionalServices.corporateGifts');
      }
      return getAdvFrom('serviceAdvantages.base');
    }

    return getAdvFrom('serviceAdvantages.base');
  };

  const advantages = getServiceAdvantages();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: serviceData.title,
          text: serviceData.description,
          url: window.location.origin + serviceUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Копируем ссылку в буфер обмена
      try {
        await navigator.clipboard.writeText(window.location.origin + serviceUrl);
        alert(t('serviceDrawer.linkCopied'));
        } catch (err) {
          console.log('Error copying:', err);
      }
    }
  };

  return (
    <Drawer
      direction="bottom"
      open={isOpen}
      onOpenChange={(open) => { if (!open) onClose(); }}
    >
      <DrawerContent
        className="w-screen h-[95vh] flex flex-col bg-white dark:bg-[#0b0b0b]"
        showScrollIndicator={true}
      >
        {/* Стандартная ручка в самом верху контента */}
        <DrawerHandle className="mx-auto my-3" />
        <DrawerHeader className="sticky top-0 z-10 bg-white dark:bg-[#0b0b0b] border-b border-gray-200 dark:border-gray-800 px-8 max-w-[1280px] w-full mx-auto">
          <DrawerTitle
            className="text-3xl font-bold text-black dark:text-white"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              lineHeight: '1.2'
            }}
          >
            {serviceData.title}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            {t('serviceDrawer.detailsTitle')}
          </DrawerDescription>

          {/* Кнопка закрытия */}
          <DrawerCloseButton onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </DrawerCloseButton>

          {/* Кнопка поделиться */}
          <button
            onClick={handleShare}
            className="absolute top-4 right-16 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </DrawerHeader>

        {/* Контент drawer */}
        <div className="p-8 pt-2 max-w-[1280px] w-full mx-auto flex-1 min-h-0 overflow-y-auto">
          {/* Изображение услуги */}
          {serviceData.image && (
            <div className="mb-6">
              <img
                src={serviceData.image}
                alt={serviceData.title}
                className="max-w-full h-auto rounded-xl mx-auto"
              />
            </div>
          )}

          {/* Описание услуги */}
          <div
            className="mb-8 text-gray-700 dark:text-gray-300"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}
          >
            {serviceData.description}
          </div>

          {/* Преимущества услуги */}
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
              {advantages.map((adv, index) => (
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
                      {adv.title}
                    </h4>
                    <p
                      className="text-gray-600 dark:text-gray-400 text-sm"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}
                    >
                      {adv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Унифицированная форма заказа */}
          <ServiceOrderForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceDrawer;