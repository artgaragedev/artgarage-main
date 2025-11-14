import PrintingHeroSection from '@/components/PrintingHeroSection';
import PrintingServicesSection from '@/components/PrintingServicesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function PrintingMaterialsPage({ params }: { params: { locale: string } }) {
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