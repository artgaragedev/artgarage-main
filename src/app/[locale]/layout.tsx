import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { Montserrat } from 'next/font/google'
import fs from 'node:fs/promises'
import path from 'node:path'
import { locales } from '@/i18n/request'
import DevConsoleSilencer from '@/components/DevConsoleSilencer'
import { PageTransition } from '@/components/PageTransition'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Art Garage",
  description: "Creative full-cycle agency",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  console.log('[layout] params.locale =', locale);
  // Fallback to 'ru' if incoming locale is not supported
  const resolvedLocale = locales.includes(locale as (typeof locales)[number]) ? locale : 'ru';
  let messages: Record<string, unknown>;
  try {
    messages = (await import(`../../../messages/${resolvedLocale}.json`)).default;
  } catch (err) {
    console.error('[layout] Failed to import messages JSON, falling back to fs read:', err);
    try {
      const filePath = path.join(process.cwd(), 'messages', `${resolvedLocale}.json`);
      const raw = await fs.readFile(filePath, 'utf8');
      messages = JSON.parse(raw);
      console.log('[layout] Fallback JSON loaded via fs for locale', resolvedLocale);
    } catch (fsErr) {
      console.error('[layout] Fallback fs read failed:', fsErr);
      messages = {};
    }
  }

  return (
    <html lang={resolvedLocale} suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased bg-white dark:bg-[#0b0b0b] text-black dark:text-white transition-colors duration-200`}>
        {/* Dev-only console filter to reduce Fast Refresh noise */}
        <DevConsoleSilencer />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="theme"
          themes={["light","dark"]}
        >
          <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}