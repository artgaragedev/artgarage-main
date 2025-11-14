import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function ServicesPage({ params }: { params: { locale: string } }) {
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