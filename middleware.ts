import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale: 'ru'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|ro)/:path*']
};