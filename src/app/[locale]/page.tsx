import { HeroSection } from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import DesignSection from '@/components/DesignSection';
import CasesSection from '@/components/CasesSection';
import DatabaseFix from '@/components/DatabaseFix';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata(
    {
      ru: {
        title: 'Art Garage | Креативное рекламное агентство полного цикла в Молдове',
        description: 'Art Garage — ведущее рекламное агентство в Кишиневе. Создаем наружную и интерьерную рекламу, POS материалы, полиграфию. DTF печать и инсталляции под ключ. Более 100 успешных проектов.',
        keywords: 'рекламное агентство Кишинев, наружная реклама Молдова, интерьерная реклама, объемные буквы, световые короба, DTF печать, POS материалы, полиграфия, креативное агентство'
      },
      ro: {
        title: 'Art Garage | Agenție creativă de publicitate full-cycle în Moldova',
        description: 'Art Garage — agenție lider de publicitate în Chișinău. Creăm publicitate exterioară și interioară, materiale POS, poligrafie. Imprimare DTF și instalații la cheie. Peste 100 de proiecte de succes.',
        keywords: 'agenție de publicitate Chișinău, publicitate exterioară Moldova, publicitate interioară, litere volumetrice, cutii luminoase, imprimare DTF, materiale POS, poligrafie, agenție creativă'
      }
    },
    locale,
    ''
  );
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <DatabaseFix />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <DesignSection />
      <CasesSection key={`home-cases-${locale}`} />
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}
