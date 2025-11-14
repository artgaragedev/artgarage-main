import PosHeroSection from '@/components/PosHeroSection';
import PosServicesSection from '@/components/PosServicesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function PosMaterialsPage({ params }: { params: { locale: string } }) {
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