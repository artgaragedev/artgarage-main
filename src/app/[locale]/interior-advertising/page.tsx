import InteriorHeroSection from '@/components/InteriorHeroSection';
import InteriorServicesSection from '@/components/InteriorServicesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function InteriorAdvertisingPage({ params }: { params: { locale: string } }) {
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