import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported languages
export const locales = ['ru', 'ro'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Fallback to ru if locale was not determined
  const resolvedLocale = (locale || 'ru') as Locale;
  console.log('[next-intl] getRequestConfig', { locale, resolvedLocale });

  // Check that the incoming language is supported
  if (!locales.includes(resolvedLocale)) notFound();

  try {
    const messages = (await import(`../../messages/${resolvedLocale}.json`)).default
    return {
      locale: resolvedLocale as string,
      messages
    };
  } catch (err) {
    console.error('[next-intl] Failed to import messages JSON in request config:', err);
    // Edge Runtime cannot use Node APIs; return empty messages as a safe fallback
    return {
      locale: resolvedLocale as string,
      messages: {}
    };
  }
});