'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const languages = [
  { code: 'ru', name: 'RU', flag: '🇷🇺' },
  { code: 'ro', name: 'RO', flag: '🇷🇴' }
]

interface LanguageToggleProps {
  variant?: 'default' | 'compact'
}

export function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    // Отключаем анимацию при первом рендере
    setIsInitialRender(false)
  }, [])

  // Determine current locale from pathname as source of truth
  const pathLocale = pathname.split('/')[1]
  const currentLocale = pathLocale || locale || 'ru'

  const handleLanguageChange = (newLocale: string) => {
    // If the same locale is selected, do nothing
    if (newLocale === currentLocale) {
      return
    }

    // Get path without locale
    const segments = pathname.split('/').filter(Boolean)
    const pathWithoutLocale = segments.length > 1 ? '/' + segments.slice(1).join('/') : '/'
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

    router.push(newPath)
  }

  const isCompact = variant === 'compact'

  return (
    <div
      className={`inline-flex items-center bg-gray-100 dark:bg-[#1a1a1a] rounded-xl ${isCompact ? 'p-0.5' : 'p-1'} gap-0.5`}
      style={{
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
      }}
    >
      {languages.map((language) => {
        const isActive = currentLocale === language.code

        return (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`
              relative rounded-lg font-semibold transition-all duration-200
              ${isCompact ? 'px-2.5 py-1.5' : 'px-4 py-2'}
              ${isActive
                ? 'text-white dark:text-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
            style={{
              fontSize: isCompact ? '0.8rem' : 'clamp(0.85rem, 2vw, 0.95rem)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              minWidth: isCompact ? '45px' : '70px',
              position: 'relative',
              zIndex: 1
            }}
            aria-label={`Switch to ${language.name}`}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 rounded-lg shadow-lg"
                style={{
                  zIndex: -1
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={
                  isInitialRender
                    ? { duration: 0 }
                    : {
                        duration: 0.2,
                        ease: 'easeInOut'
                      }
                }
              />
            )}

            <span className={`flex items-center justify-center ${isCompact ? 'gap-1' : 'gap-1.5'}`}>
              <span className={isCompact ? 'text-xs' : 'text-base'}>{language.flag}</span>
              <span>{language.name}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}