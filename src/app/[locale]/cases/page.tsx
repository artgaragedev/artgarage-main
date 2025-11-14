import CasesHeroBounce from '@/components/CasesHeroBounce';
import CasesSection from '@/components/CasesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function CasesPage({ params }: { params: { locale: string } }) {
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