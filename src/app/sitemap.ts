import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://artgarage.md'

// Supported locales
const locales = ['ru', 'ro'] as const

// All routes in the app
const routes = [
  '',  // home page
  '/about',
  '/services',
  '/outdoor-advertising',
  '/interior-advertising',
  '/pos-materials',
  '/printing-materials',
  '/cases',
  '/contacts',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Get current date for lastModified
  const currentDate = new Date()

  // Generate URLs for each locale and route combination
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route}`

      // Determine priority based on route
      let priority = 0.5
      let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'

      if (route === '') {
        // Home page - highest priority
        priority = 1.0
        changeFrequency = 'weekly'
      } else if (route === '/services') {
        // Services page - high priority
        priority = 0.9
        changeFrequency = 'weekly'
      } else if (route.includes('advertising') || route.includes('materials')) {
        // Service detail pages - high priority
        priority = 0.8
        changeFrequency = 'weekly'
      } else if (route === '/cases') {
        // Cases/portfolio - updated frequently
        priority = 0.8
        changeFrequency = 'weekly'
      } else if (route === '/contacts' || route === '/about') {
        // Static pages - lower priority
        priority = 0.7
        changeFrequency = 'monthly'
      }

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ru: `${baseUrl}/ru${route}`,
            ro: `${baseUrl}/ro${route}`,
          },
        },
      })
    })
  })

  return sitemap
}
