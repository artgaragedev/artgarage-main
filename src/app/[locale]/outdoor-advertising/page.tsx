import OutdoorHeroSection from '@/components/OutdoorHeroSection';
import OutdoorServicesSection from '@/components/OutdoorServicesSection';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function OutdoorAdvertisingPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <OutdoorHeroSection />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <OutdoorServicesSection />
      </Suspense>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}