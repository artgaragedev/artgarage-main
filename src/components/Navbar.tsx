'use client'

import Image from 'next/image'
import { Phone } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { LanguageToggle } from './LanguageToggle'

const Navbar = () => {
  const t = useTranslations('navbar')
  const locale = useLocale()
  const resolvedLocale = (locale === 'ru' || locale === 'ro') ? locale : 'ru'
  const pathname = usePathname()
  const isHome = pathname === `/${resolvedLocale}` || pathname === '/'
  const serviceSegments = ['services', 'outdoor-advertising', 'interior-advertising', 'pos-materials', 'printing-materials']
  const isServicesPage = serviceSegments.some(seg => pathname.startsWith(`/${resolvedLocale}/${seg}`))
  const isCasesPage = pathname.startsWith(`/${resolvedLocale}/cases`)
  const isContactsPage = pathname.startsWith(`/${resolvedLocale}/contacts`)
  const isAboutPage = pathname.startsWith(`/${resolvedLocale}/about`)
  
  const menuItems = [
    { key: 'home', name: t('home'), href: '#home' },
    { key: 'services', name: t('services'), href: `/${resolvedLocale}/services` },
    { key: 'about', name: t('about'), href: `/${resolvedLocale}/about` },
    { key: 'cases', name: t('cases'), href: `/${resolvedLocale}/cases` },
    { key: 'contacts', name: t('contacts'), href: `/${resolvedLocale}/contacts` }
  ]

  return (
    <nav
      className="sticky top-0 z-50 bg-white dark:bg-[#0b0b0b] transition-colors duration-200 w-screen"
      style={{
        padding: '0.5rem 1rem',
        minHeight: '3rem 5rem'
      }}
    >
      <div className="container-max-width">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href={`/${locale === 'ru' || locale === 'ro' ? '' : locale}`}>
              <Image
                src="/logo_art.svg"
                alt="Art Garage"
                width={144}
                height={48}
                className="w-auto"
                style={{
                  height: '48px'
                }}
              />
            </a>
          </div>

          {/* Navigation menu in Figma style */}
          <div className="hidden md:block">
            <div 
              className="flex items-center bg-[#F3F3F3] dark:bg-[#1F1F1F] rounded-xl p-0.5"
              style={{
                gap: '2px'
              }}
            >
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-6 py-2.5 rounded-xl font-medium transition-all duration-200
                    ${(item.key === 'home' && isHome) || (item.key === 'services' && isServicesPage) || (item.key === 'cases' && isCasesPage) || (item.key === 'contacts' && isContactsPage) || (item.key === 'about' && isAboutPage)
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'text-black dark:text-white hover:bg-white/50 dark:hover:bg-white/10'
                    }
                  `}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    fontSize: 'var(--fs-ui)',
                    lineHeight: '1.219'
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Phone number and toggles */}
          <div 
            className="flex items-center"
            style={{
              gap: '0.5rem 1rem'
            }}
          >
            {/* Номер телефона */}
            <div className="flex items-center space-x-2">
              <Phone 
                className="text-gray-600 dark:text-gray-300"
                style={{
                  width: '1rem 1.25rem',
                  height: '1rem 1.25rem'
                }}
              />
              <a
                href="tel:078886033"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors duration-200"
                style={{
                  fontSize: 'var(--fs-ui)'
                }}
              >
                {t('phone')}
              </a>
            </div>

            {/* Переключатель языка */}
            <LanguageToggle />

          </div>

          {/* Мобильное меню (кнопка) */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:text-gray-900 transition-colors duration-200"
              aria-label="Открыть меню"
              style={{
                padding: '0.25rem 0.5rem'
              }}
            >
              <svg 
                className="fill-none stroke-current" 
                viewBox="0 0 24 24"
                style={{
                  width: '1.25rem 1.5rem',
                  height: '1.25rem 1.5rem'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar