import PrintingHeroSection from '@/components/PrintingHeroSection';
import PrintingServicesSection from '@/components/PrintingServicesSection';
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
        title: 'Полиграфия | Art Garage',
        description: 'Полиграфические услуги: журналы, флаеры, брошюры, наклейки, стикеры. Качественная печать в Кишиневе.',
      },
      ro: {
        title: 'Poligrafie | Art Garage',
        description: 'Servicii poligrafice: reviste, flyere, broșuri, autocolante, stickere. Imprimare de calitate în Chișinău.',
      },
    },
    locale,
    'printing-materials'
  );
}

export default async function PrintingMaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <PrintingHeroSection />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <PrintingServicesSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}