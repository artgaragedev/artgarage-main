'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' }
]

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Determine current locale from pathname as source of truth
  const pathLocale = pathname.split('/')[1]
  const currentLocale = pathLocale || locale || 'ru'
  
  const currentLanguage = languages.find(lang => lang.code === currentLocale)

  const handleLanguageChange = (newLocale: string) => {
    // If the same locale is selected, do nothing
    if (newLocale === currentLocale) {
      setIsOpen(false)
      return
    }
    
    // Get path without locale
    const segments = pathname.split('/').filter(Boolean)
    const pathWithoutLocale = segments.length > 1 ? '/' + segments.slice(1).join('/') : '/'
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    
    router.push(newPath)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        <span 
          className="font-medium text-gray-700 dark:text-gray-300"
          style={{
            fontSize: 'var(--fs-ui)'
          }}
        >
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-md last:rounded-b-md cursor-pointer ${
                currentLocale === language.code 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              style={{
                fontSize: 'var(--fs-ui)'
              }}
            >
              <span className="flex items-center space-x-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}