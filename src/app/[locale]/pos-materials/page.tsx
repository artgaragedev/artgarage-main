import PosHeroSection from '@/components/PosHeroSection';
import PosServicesSection from '@/components/PosServicesSection';
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
        title: 'POS материалы | Art Garage',
        description: 'Производство POS материалов: брендированные аксессуары, информативные панно, ростовые фигуры, подставки и холдеры.',
      },
      ro: {
        title: 'Materiale POS | Art Garage',
        description: 'Producția de materiale POS: accesorii branduite, panouri informative, figuri în mărime naturală, suporturi și holdere.',
      },
    },
    locale,
    'pos-materials'
  );
}

export default async function PosMaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <PosHeroSection />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <PosServicesSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}