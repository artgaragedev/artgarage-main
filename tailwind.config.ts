import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/i18n/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './messages/**/*.{json}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

export default config