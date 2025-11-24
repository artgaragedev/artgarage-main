'use client'

import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

export function ThemeToggle() {
  return (
    <AnimatedThemeToggler
      className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#ffffff] dark:bg-[#1F1F1F] text-gray-700 dark:text-gray-300"
    />
  )
}