import { Metadata } from 'next';

export const siteConfig = {
  name: 'Art Garage',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://artgarage.md',
  ogImage: '/og-image.jpg',
  links: {
    facebook: 'https://facebook.com/artgarage',
    instagram: 'https://instagram.com/artgarage',
  },
};

type LocaleMetadata = {
  title: string;
  description: string;
  keywords?: string;
};

type PageMetadataConfig = {
  ru: LocaleMetadata;
  ro: LocaleMetadata;
};

export function generatePageMetadata(
  config: PageMetadataConfig,
  locale: string,
  path: string = ''
): Metadata {
  const resolvedLocale = locale === 'ro' ? 'ro' : 'ru';
  const currentMetadata = config[resolvedLocale as keyof PageMetadataConfig];

  const url = `${siteConfig.url}/${resolvedLocale}${path ? `/${path}` : ''}`;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    alternates: {
      canonical: url,
      languages: {
        'ru': `${siteConfig.url}/ru${path ? `/${path}` : ''}`,
        'ro': `${siteConfig.url}/ro${path ? `/${path}` : ''}`,
      },
    },
    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.description,
      url,
      siteName: siteConfig.name,
      locale: resolvedLocale === 'ru' ? 'ru_RU' : 'ro_RO',
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: currentMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  };
}
