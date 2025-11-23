import CasesHeroBounce from '@/components/CasesHeroBounce';
import CasesSection from '@/components/CasesSection';
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
        title: 'Наши работы | Портфолио Art Garage',
        description: 'Портфолио выполненных проектов Art Garage. Наружная реклама, интерьерная реклама, POS материалы, инсталляции. Более 100 успешных кейсов.',
      },
      ro: {
        title: 'Lucrările noastre | Portofoliu Art Garage',
        description: 'Portofoliul proiectelor realizate de Art Garage. Publicitate exterioară, publicitate interioară, materiale POS, instalații. Peste 100 de cazuri de succes.',
      },
    },
    locale,
    'cases'
  );
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <CasesHeroBounce />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем проекты...</div>}>
        <CasesSection showHeader={false} />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}