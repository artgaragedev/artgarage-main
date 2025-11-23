import InteriorHeroSection from '@/components/InteriorHeroSection';
import InteriorServicesSection from '@/components/InteriorServicesSection';
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
        title: 'Интерьерная реклама | Art Garage',
        description: 'Интерьерная реклама в Кишиневе: объемные буквы, лайтбоксы, Roll-up стенды, навигация, текстильные баннеры, оклейка офисов.',
      },
      ro: {
        title: 'Publicitate interioară | Art Garage',
        description: 'Publicitate interioară în Chișinău: litere volumetrice, lightbox-uri, standuri Roll-up, navigare, bannere textile, aplicare birouri.',
      },
    },
    locale,
    'interior-advertising'
  );
}

export default async function InteriorAdvertisingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <InteriorHeroSection />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <InteriorServicesSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}