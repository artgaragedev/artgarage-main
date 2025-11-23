import OutdoorHeroSection from '@/components/OutdoorHeroSection';
import OutdoorServicesSection from '@/components/OutdoorServicesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    {
      ru: {
        title: 'Наружная реклама | Art Garage',
        description: 'Производство наружной рекламы в Кишиневе: объемные буквы, световые короба, лайтбоксы, рекламные стелы, брендирование автомобилей, оклейка окон.',
      },
      ro: {
        title: 'Publicitate exterioară | Art Garage',
        description: 'Producția de publicitate exterioară în Chișinău: litere volumetrice, cutii luminoase, lightbox-uri, toteme publicitare, branding auto, aplicare ferestre.',
      },
    },
    locale,
    'outdoor-advertising'
  );
}

export default async function OutdoorAdvertisingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <OutdoorHeroSection />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <OutdoorServicesSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}