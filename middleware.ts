import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'ru',

  // Отключаем автоматические HTTP hreflang headers от next-intl
  // (используем только HTML link tags в metadata)
  alternateLinks: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|ro)/:path*']
};