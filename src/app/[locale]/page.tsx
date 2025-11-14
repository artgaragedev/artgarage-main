import { HeroSection } from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import DesignSection from '@/components/DesignSection';
import CasesSection from '@/components/CasesSection';
import DatabaseFix from '@/components/DatabaseFix';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <DatabaseFix />
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div className="container-max-width py-8">Загружаем услуги...</div>}>
        <ServicesSection />
      </Suspense>
      <DesignSection />
      <CasesSection />
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}
