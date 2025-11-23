'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNavbar = useTranslations('navbar');
  const locale = useLocale();
  const resolvedLocale = (locale === 'ru' || locale === 'ro') ? locale : 'ru';

  const services = [
    { name: t('outdoorAdvertising'), href: `/${resolvedLocale}/outdoor-advertising` },
    { name: t('interiorAdvertising'), href: `/${resolvedLocale}/interior-advertising` },
    { name: t('posMaterials'), href: `/${resolvedLocale}/pos-materials` },
    { name: t('printingMaterials'), href: `/${resolvedLocale}/printing-materials` }
  ];

  const navigation = [
    { name: tNavbar('home'), href: `/${resolvedLocale}` },
    { name: tNavbar('services'), href: `/${resolvedLocale}/services` },
    { name: tNavbar('cases'), href: `/${resolvedLocale}/cases` },
    { name: tNavbar('about'), href: `/${resolvedLocale}/about` },
    { name: tNavbar('contacts'), href: `/${resolvedLocale}/contacts` }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: '#1877F2' },
    { name: 'Instagram', icon: Instagram, href: '#', color: '#E4405F' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: '#0A66C2' }
  ];

  return (
    <footer className="relative w-screen bg-white dark:bg-[#0b0b0b] border-t border-gray-200 dark:border-gray-800">
      {/* Серая полоса сверху */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800" />

      <div className="container-max-width px-4 sm:px-2 lg:px-0">
        {/* Основной контент футера */}
        <div className="py-12">

          {/* Мобильная версия */}
          <div className="lg:hidden space-y-8">
            {/* О компании */}
            <div className="space-y-4 text-center">
              <Link href={`/${resolvedLocale}`} className="inline-block">
                {/* Логотип для светлой темы */}
                <Image
                  src="/logo_white.png"
                  alt="Art Garage"
                  width={120}
                  height={40}
                  className="w-auto h-10 dark:hidden"
                />
                {/* Логотип для темной темы */}
                <Image
                  src="/logo_black.png"
                  alt="Art Garage"
                  width={120}
                  height={40}
                  className="w-auto h-10 hidden dark:block"
                />
              </Link>
              <p
                className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('description')}
              </p>

              {/* Социальные сети */}
              <div className="flex gap-3 pt-2 justify-center">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                      aria-label={social.name}
                      style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Icon
                        className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-[#EA3C23] transition-colors"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Навигация и Услуги - две колонки */}
            <div className="grid grid-cols-2 gap-6">
              {/* Навигация */}
              <div>
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-4 text-base"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {t('navigation')}
                </h3>
                <ul className="space-y-3">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-[#EA3C23] dark:hover:text-[#EA3C23] transition-colors text-sm"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Услуги */}
              <div>
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-4 text-base"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {t('services')}
                </h3>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service.name}>
                      <Link
                        href={service.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-[#EA3C23] dark:hover:text-[#EA3C23] transition-colors text-sm"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Десктопная версия - 4 колонки как было */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {/* Колонка 1: О компании */}
            <div className="space-y-4">
              <Link href={`/${resolvedLocale}`}>
                {/* Логотип для светлой темы */}
                <Image
                  src="/logo_white.png"
                  alt="Art Garage"
                  width={120}
                  height={40}
                  className="w-auto h-10 dark:hidden"
                />
                {/* Логотип для темной темы */}
                <Image
                  src="/logo_black.png"
                  alt="Art Garage"
                  width={120}
                  height={40}
                  className="w-auto h-10 hidden dark:block"
                />
              </Link>
              <p
                className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('description')}
              </p>

              {/* Социальные сети */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                      aria-label={social.name}
                      style={{
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Icon
                        className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-[#EA3C23] transition-colors"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Колонка 2: Навигация */}
            <div>
              <h3
                className="font-bold text-gray-900 dark:text-white mb-4 text-base"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('navigation')}
              </h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#EA3C23] dark:hover:text-[#EA3C23] transition-colors text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Колонка 3: Услуги */}
            <div>
              <h3
                className="font-bold text-gray-900 dark:text-white mb-4 text-base"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('services')}
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#EA3C23] dark:hover:text-[#EA3C23] transition-colors text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Колонка 4: Контакты */}
            <div>
              <h3
                className="font-bold text-gray-900 dark:text-white mb-4 text-base"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('contacts')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#EA3C23] flex-shrink-0 mt-0.5" />
                  <a
                    href={`tel:${t('phone')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#EA3C23] transition-colors text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('phone')}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#EA3C23] flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${t('email')}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#EA3C23] transition-colors text-sm break-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('email')}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#EA3C23] flex-shrink-0 mt-0.5" />
                  <span
                    className="text-gray-600 dark:text-gray-400 text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('address')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              © {new Date().getFullYear()} Art Garage. {t('rights')}
            </p>

            <div className="flex gap-6 text-sm">
              <Link
                href={`/${resolvedLocale}/privacy`}
                className="text-gray-500 dark:text-gray-500 hover:text-[#EA3C23] transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${resolvedLocale}/terms`}
                className="text-gray-500 dark:text-gray-500 hover:text-[#EA3C23] transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}