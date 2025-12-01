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
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-montserrat'
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locales.includes(locale as (typeof locales)[number]) ? locale : 'ru';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://artgarage.md';

  const metadata = {
    ru: {
      title: 'Art Garage | Рекламное агентство полного цикла в Молдове',
      description: 'Art Garage — креативное рекламное агентство полного цикла в Кишиневе. Наружная реклама, интерьерная реклама, POS материалы, полиграфия, DTF печать, инсталляции.',
      keywords: 'рекламное агентство, наружная реклама, интерьерная реклама, POS материалы, полиграфия, DTF печать, объемные буквы, световые короба, Кишинев, Молдова',
    },
    ro: {
      title: 'Art Garage | Agenție de publicitate full-cycle în Moldova',
      description: 'Art Garage — agenție creativă de publicitate full-cycle în Chișinău. Publicitate exterioară, publicitate interioară, materiale POS, poligrafie, imprimare DTF, instalații.',
      keywords: 'agenție de publicitate, publicitate exterioară, publicitate interioară, materiale POS, poligrafie, imprimare DTF, litere volumetrice, cutii luminoase, Chișinău, Moldova',
    }
  };

  const currentMetadata = metadata[resolvedLocale as keyof typeof metadata] || metadata.ru;

  return {
    title: {
      default: currentMetadata.title,
      template: `%s | Art Garage`
    },
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    authors: [{ name: 'Art Garage' }],
    creator: 'Art Garage',
    publisher: 'Art Garage',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${resolvedLocale}`,
      languages: {
        'ru': `${siteUrl}/ru`,
        'ro': `${siteUrl}/ro`,
      },
    },
    openGraph: {
      type: 'website',
      locale: resolvedLocale === 'ru' ? 'ru_RU' : 'ro_RO',
      url: `${siteUrl}/${resolvedLocale}`,
      siteName: 'Art Garage',
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Art Garage - Creative Studio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
    icons: {
      icon: [
        { url: '/icon.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/icon.png',
        },
      ],
    },
  };
}

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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PPZFDSM');`,
          }}
        />
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://rlcpynwvpgubxvsuvkew.supabase.co" />
        <link rel="dns-prefetch" href="https://rlcpynwvpgubxvsuvkew.supabase.co" />
      </head>
      <body className={`${montserrat.className} antialiased bg-white dark:bg-[#0b0b0b] text-black dark:text-white transition-colors duration-200`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PPZFDSM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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