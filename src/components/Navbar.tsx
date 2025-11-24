'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import { BurgerIcon } from './BurgerIcon'
import { AnimatedMenuItem } from './AnimatedMenuItem'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

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
    { key: 'home', name: t('home'), href: `/${resolvedLocale}` },
    { key: 'services', name: t('services'), href: `/${resolvedLocale}/services` },
    { key: 'about', name: t('about'), href: `/${resolvedLocale}/about` },
    { key: 'cases', name: t('cases'), href: `/${resolvedLocale}/cases` },
    { key: 'contacts', name: t('contacts'), href: `/${resolvedLocale}/contacts` }
  ]
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-200 isolate"
      style={{
        padding: '0.75rem 0',
        minHeight: '4rem',
        width: '100vw'
      }}
    >
      <div className="container-max-width">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${resolvedLocale}`} style={{ cursor: 'pointer' }}>
              {/* Логотип для светлой темы */}
              <Image
                src="/logo_white.png"
                alt="Art Garage"
                width={144}
                height={48}
                className="w-auto dark:hidden"
                style={{
                  height: '48px'
                }}
              />
              {/* Логотип для темной темы */}
              <Image
                src="/logo_black.png"
                alt="Art Garage"
                width={144}
                height={48}
                className="w-auto hidden dark:block"
                style={{
                  height: '48px'
                }}
              />
            </Link>
          </div>

          {/* Navigation menu - Modern style */}
          <div className="hidden md:block">
            <div
              className="flex items-center bg-gray-100/80 dark:bg-[#1a1a1a]/80 rounded-2xl p-1 shadow-sm"
              style={{
                gap: '4px',
                backdropFilter: 'blur(8px)'
              }}
            >
              {menuItems.map((item) => {
                const isActive = (item.key === 'home' && isHome) ||
                                (item.key === 'services' && isServicesPage) ||
                                (item.key === 'cases' && isCasesPage) ||
                                (item.key === 'contacts' && isContactsPage) ||
                                (item.key === 'about' && isAboutPage)

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300
                      ${isActive
                        ? 'text-white dark:text-black scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-[#222222] hover:scale-102 hover:shadow-sm'
                      }
                    `}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      fontSize: 'var(--fs-ui)',
                      lineHeight: '1.219',
                      letterSpacing: '-0.01em',
                      cursor: 'pointer'
                    }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-xl shadow-lg shadow-gray-900/20 dark:shadow-gray-100/20"
                        style={{ zIndex: -1 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.2,
                          ease: 'easeInOut'
                        }}
                      />
                    )}
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Phone number and Language toggle - hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222222] transition-all duration-200" style={{ cursor: 'pointer' }}>
              <Phone
                className="text-[#ea3c23]"
                style={{
                  width: '1.125rem',
                  height: '1.125rem'
                }}
              />
              <a
                href="tel:078886033"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-semibold transition-colors duration-200"
                style={{
                  fontSize: 'var(--fs-ui)',
                  fontFamily: 'Montserrat, sans-serif',
                  cursor: 'pointer'
                }}
              >
                {t('phone')}
              </a>
            </div>

            {/* Переключатель темы */}
            <ThemeToggle />

            {/* Переключатель языка */}
            <LanguageToggle variant="compact" />
          </div>

          {/* Мобильное меню (кнопки) */}
          <div className="md:hidden flex items-center gap-2">
            {/* Кнопка телефона */}
            <a
              href="tel:078886033"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#ea3c23] hover:bg-[#d63620] active:scale-95 transition-all duration-200 shadow-md"
              style={{ cursor: 'pointer' }}
            >
              <Phone className="w-5 h-5 text-white" />
            </a>

            {/* Переключатель темы */}
            <ThemeToggle />

            {/* Кнопка меню */}
            <BurgerIcon
              isOpen={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#222222] active:scale-95 transition-all duration-200 text-gray-700 dark:text-gray-300"
            >
              <span
                className="font-semibold text-sm"
                style={{
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                {t('menu')}
              </span>
            </BurgerIcon>
          </div>
        </div>
      </div>
      
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[85vw] sm:w-[85vw] p-0 overflow-hidden"
        >
          {/* Modern Header */}
          <div className="relative px-6 pt-8 pb-6">
            <SheetHeader className="relative">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1 h-8 bg-[#EA3C23] rounded-full" />
                <SheetTitle
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {t('menu')}
                </SheetTitle>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Навигация
              </p>
            </SheetHeader>
          </div>

          <div className="flex flex-col h-[calc(100%-140px)] px-6 py-4">
            {/* Меню навигации */}
            <nav className="flex flex-col space-y-3 flex-1">
              {menuItems.map((item, index) => {
                const active = (item.key === 'home' && isHome) ||
                             (item.key === 'services' && isServicesPage) ||
                             (item.key === 'cases' && isCasesPage) ||
                             (item.key === 'contacts' && isContactsPage) ||
                             (item.key === 'about' && isAboutPage)

                return (
                  <AnimatedMenuItem key={item.key} delay={index * 0.05}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        group relative block px-5 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden
                        ${active
                          ? 'bg-[#EA3C23] text-white shadow-lg shadow-[#EA3C23]/25'
                          : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] active:scale-[0.98]'
                        }
                      `}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        cursor: 'pointer'
                      }}
                    >
                      {/* Левая полоска для активного элемента */}
                      {active && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white/80 rounded-r-full"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center justify-between">
                        {item.name}
                        {active && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white/60"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                          />
                        )}
                      </span>
                    </Link>
                  </AnimatedMenuItem>
                )
              })}
            </nav>

            {/* Нижняя часть с контактами */}
            <div className="mt-auto pt-6 space-y-3 border-t border-gray-200 dark:border-gray-800">
              <AnimatedMenuItem delay={menuItems.length * 0.05}>
                <a
                  href="tel:078886033"
                  className="group relative flex items-center justify-center gap-3 w-full rounded-2xl px-6 py-4 bg-[#EA3C23] text-white font-bold transition-all duration-300 shadow-lg shadow-[#EA3C23]/30 hover:shadow-xl hover:shadow-[#EA3C23]/40 hover:bg-[#D63419] active:scale-[0.98] overflow-hidden"
                  style={{
                    fontSize: 'var(--fs-ui)',
                    fontFamily: 'Montserrat, sans-serif',
                    cursor: 'pointer'
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{t('phone')}</span>
                </a>
              </AnimatedMenuItem>

              <AnimatedMenuItem delay={(menuItems.length + 1) * 0.05}>
                <div className="flex justify-center gap-3 p-2 rounded-xl bg-gray-100 dark:bg-[#1a1a1a]">
                  <LanguageToggle />
                </div>
              </AnimatedMenuItem>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default Navbar