import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    {
      ru: {
        title: 'Условия использования | Art Garage',
        description: 'Условия использования сайта Art Garage. Правила пользования услугами рекламного агентства.',
      },
      ro: {
        title: 'Termeni și condiții | Art Garage',
        description: 'Termenii și condițiile de utilizare a site-ului Art Garage. Regulile de utilizare a serviciilor agenției de publicitate.',
      },
    },
    locale,
    'terms'
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRu = locale === 'ru';

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container-max-width py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          {isRu ? 'Условия использования' : 'Termeni și condiții'}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* TODO: Добавить текст условий использования */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}
