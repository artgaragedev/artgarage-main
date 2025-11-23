import ServicesSection from '@/components/ServicesSection';
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
        title: 'Услуги Art Garage | Полный спектр рекламных услуг',
        description: 'Полный каталог услуг Art Garage: наружная и интерьерная реклама, POS материалы, полиграфия, DTF печать, инсталляции, корпоративные подарки и многое другое.',
      },
      ro: {
        title: 'Servicii Art Garage | Gama completă de servicii publicitare',
        description: 'Catalogul complet al serviciilor Art Garage: publicitate exterioară și interioară, materiale POS, poligrafie, imprimare DTF, instalații, cadouri corporative și multe altele.',
      },
    },
    locale,
    'services'
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <ServicesSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}