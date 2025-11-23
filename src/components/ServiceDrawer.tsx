'use client';

import { FC, useEffect } from 'react';
import { X, Share2, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
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
import { useWorks, useCategories } from '@/hooks/useSupabaseData';
import WorkCard from './WorkCard';

interface ServiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  serviceKey: string;
  serviceCategory: string;
}

const ServiceDrawer: FC<ServiceDrawerProps> = ({ isOpen, onClose, serviceKey, serviceCategory }) => {
  const t = useTranslations();
  const tCases = useTranslations('cases');
  const locale = useLocale() as 'ru' | 'ro';
  // Не используем next/navigation useSearchParams, чтобы избежать лишних перерендеров

  // Маппинг категорий услуг на slug'и категорий работ
  const categoryToWorkSlug: Record<string, string> = {
    'outdoorAdvertising': 'naruzhnaya-reklama',
    'interiorAdvertising': 'interiernaya-reklama',
    'posMaterials': 'pos-materialy',
    'printingMaterials': 'poligraficheskie-materialy',
  };

  // Маппинг дополнительных услуг (serviceKey → category slug)
  const additionalServiceToCategorySlug: Record<string, string> = {
    'dtfPrinting': '', // DTF имеет свой компонент DTFPrintingService
    'installations': 'installyacii',
    'corporateGifts': 'korporativnye-podarki',
    'trophies': 'trofei',
    'signs': 'ukazateli',
    'flags': 'flagi',
    'photoZone': 'fotozona',
    'millingOrLaser': 'dizain-2d-3d',
    'largeFormatPrinting': '', // Нет отдельной категории работ
    'expoStands': 'ekspo-stendy',
  };

  // Маппинг serviceKey на НАЗВАНИЕ подкатегории (как в CasesSection)
  const serviceKeyToSubcategoryName: Record<string, string> = {
    // Наружная реклама
    'volumetricLetters': locale === 'ru' ? 'Объемные буквы' : 'Litere volumetrice',
    'pseudoVolumetricLetters': locale === 'ru' ? 'Псевдообъемные буквы' : 'Litere pseudo-volumetrice',
    'lightbox': 'Lightbox',
    'advertisingSteles': locale === 'ru' ? 'Тотем' : 'Totem',
    'carBranding': locale === 'ru' ? 'Брендинг авто' : 'Branding auto',
    'glassStickers': locale === 'ru' ? 'Оклейка окон' : 'Aplicare ferestre',
    // Интерьерная реклама
    'navigation': locale === 'ru' ? 'Таблички' : 'Plăcuțe',
    'textileBanner': locale === 'ru' ? 'Текстильный баннер' : 'Banner textil',
    'officeStickers': locale === 'ru' ? 'Оклейка окон' : 'Aplicare ferestre',
    'rollUp': 'Roll-up',
    // POS материалы
    'brandedAccessories': locale === 'ru' ? 'Брендированные аксессуары' : 'Accesorii branduite',
    'infoPanels': locale === 'ru' ? 'Информативные панно' : 'Panouri informative',
    'lifeSizeFigures': locale === 'ru' ? 'Ростовая фигура' : 'Figură în mărime naturală',
    'stands': locale === 'ru' ? 'Подставки / Холдеры' : 'Suporturi / Holdere',
    // Полиграфические материалы
    'magazines': locale === 'ru' ? 'Журналы, флаеры, брошюры' : 'Reviste, flyere, broșuri',
    'stickers': locale === 'ru' ? 'Наклейки и стикеры' : 'Autocolante și stickere',
  };

  // Загружаем категории
  const { data: categories } = useCategories(locale);

  // Определяем slug категории работ
  let workCategorySlug = categoryToWorkSlug[serviceCategory];

  // Для дополнительных услуг используем отдельный маппинг
  if (serviceCategory === 'additionalServices') {
    workCategorySlug = additionalServiceToCategorySlug[serviceKey] || '';
  }

  const workCategoryId = workCategorySlug
    ? categories?.find((c: any) => c.slug === workCategorySlug)?.id || ''
    : '';

  // Загружаем ВСЕ работы категории (как в CasesSection)
  const { data: allWorksData, isLoading } = useWorks(
    workCategoryId
      ? { categoryId: workCategoryId, isPublished: true }
      : { isPublished: true, limit: 0 },
    locale
  );
  const isCategoryResolving = !workCategoryId;
  const isWorksLoading = isLoading || isCategoryResolving;

  // Фильтруем работы по подкатегории (как в CasesSection - по имени!)
  const subcategoryName = serviceKeyToSubcategoryName[serviceKey];
  const worksData = subcategoryName && allWorksData
    ? allWorksData.filter((work: any) => work.subcategory?.name === subcategoryName).slice(0, 4)
    : allWorksData?.slice(0, 4) || [];

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


  if (!serviceData) return null;

  // Специальный компонент для DTF-печати
  if (serviceKey === 'dtfPrinting') {
    return (
      <Drawer
        direction="bottom"
        open={isOpen}
        onOpenChange={(open) => { if (!open) onClose(); }}
      >
        <DrawerContent
          className="w-full h-[90vh] sm:h-[95vh] flex flex-col bg-white dark:bg-[#0b0b0b]"
          showScrollIndicator={true}
        >
          <DrawerHandle className="mx-auto my-3" />
          <DrawerHeader className="sticky top-0 z-10 bg-white dark:bg-[#0b0b0b] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 max-w-[1280px] w-full mx-auto">
            <DrawerTitle
              className="text-2xl sm:text-3xl font-bold text-black dark:text-white"
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
                    url: window.location.origin + serviceUrl,
                  }).catch(err => console.log('Error sharing:', err));
                } else {
                  navigator.clipboard.writeText(window.location.origin + serviceUrl)
                    .then(() => alert(t('serviceDrawer.linkCopied')))
                    .catch(err => console.log('Error copying:', err));
                }
              }}
              className="absolute top-4 right-16 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden sm:block"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </DrawerHeader>

          {/* Контент drawer с кастомным компонентом для DTF */}
          <div className="px-4 sm:px-8 pt-2 pb-6 sm:pb-8 max-w-[1280px] w-full mx-auto flex-1 min-h-0 overflow-y-auto">
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
          className="w-full h-[90vh] sm:h-[95vh] flex flex-col bg-white dark:bg-[#0b0b0b]"
          showScrollIndicator={true}
        >
          <DrawerHandle className="mx-auto my-3" />
          <DrawerHeader className="sticky top-0 z-10 bg-white dark:bg-[#0b0b0b] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 max-w-[1280px] w-full mx-auto">
            <DrawerTitle
              className="text-2xl sm:text-3xl font-bold text-black dark:text-white"
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
                    url: window.location.origin + serviceUrl,
                  }).catch(err => console.log('Error sharing:', err));
                } else {
                  navigator.clipboard.writeText(window.location.origin + serviceUrl)
                    .then(() => alert(t('serviceDrawer.linkCopied')))
                    .catch(err => console.log('Error copying:', err));
                }
              }}
              className="absolute top-4 right-16 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden sm:block"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </DrawerHeader>

          {/* Контент drawer со специальным компонентом для Инсталляций */}
          <div className="px-4 sm:px-8 pt-2 pb-6 sm:pb-8 max-w-[1280px] w-full mx-auto flex-1 min-h-0 overflow-y-auto">
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
        className="w-full h-[90vh] sm:h-[95vh] flex flex-col bg-white dark:bg-[#0b0b0b]"
        showScrollIndicator={true}
      >
        {/* Стандартная ручка в самом верху контента */}
        <DrawerHandle className="mx-auto my-2 sm:my-3" />
        <DrawerHeader className="sticky top-0 z-10 bg-white dark:bg-[#0b0b0b] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 max-w-[1280px] w-full mx-auto">
          <DrawerTitle
            className="text-2xl sm:text-3xl font-bold text-black dark:text-white"
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
            className="absolute top-4 right-16 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden sm:block"
          >
            <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </DrawerHeader>

        {/* Контент drawer */}
        <div className="px-4 sm:px-8 pt-2 pb-6 sm:pb-8 max-w-[1280px] w-full mx-auto flex-1 min-h-0 overflow-y-auto">
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
            className="mb-6 sm:mb-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              lineHeight: '1.6',
              whiteSpace: 'pre-line'
            }}
          >
            {serviceData.description}
          </div>

          {/* Преимущества услуги */}
          <div className="mb-6 sm:mb-8">
            <h3
              className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600
              }}
            >
              {t('serviceAdvantages.heading')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {advantages.map((adv, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#EA3C23] rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-black dark:text-white mb-1 text-sm sm:text-base"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        
                      }}
                    >
                      {adv.title}
                    </h4>
                    <p
                      className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
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

          {/* Наши работы */}
          {workCategoryId && (
            <div className="mb-6 sm:mb-8">
              <h3
                className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-3 sm:mb-4"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600
                }}
              >
                {tCases('ourWorks')}
              </h3>

              {isWorksLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#EA3C23]"></div>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">{tCases('loading')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {worksData && worksData.length > 0 ? (
                    worksData.map((work: any) => (
                      <WorkCard
                        key={work.id}
                        image={work.main_image_url || (work.work_images?.[0]?.image_url ?? serviceData.image)}
                        title={work.title}
                        category={work.category?.name}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-600 dark:text-gray-400 py-6 text-sm">
                      {tCases('noWorks')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Унифицированная форма заказа */}
          <ServiceOrderForm serviceName={serviceData.title} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceDrawer;