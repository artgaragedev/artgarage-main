import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['ru', 'ro'],
  defaultLocale: 'ru',
  localeDetection: true
});

export default function middleware(request: Request & { nextUrl: URL & { pathname: string } }) {
  const pathname = (request as any).nextUrl.pathname as string;

  // Явный редирект с корня на локаль по умолчанию
  if (pathname === '/') {
    const url = (request as any).nextUrl.clone();
    url.pathname = '/ru';
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request as any);
}

export const config = {
  // Apply to all routes except API, Next assets, and files
  matcher: ['/', '/((?!api|_next|.*\\..*).*)']
};