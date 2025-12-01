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
        title: 'Политика конфиденциальности | Art Garage',
        description: 'Политика конфиденциальности Art Garage. Информация о сборе, использовании и защите персональных данных.',
      },
      ro: {
        title: 'Politica de confidențialitate | Art Garage',
        description: 'Politica de confidențialitate Art Garage. Informații despre colectarea, utilizarea și protecția datelor personale.',
      },
    },
    locale,
    'privacy'
  );
}

export default async function PrivacyPage({
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
          {isRu ? 'Политика конфиденциальности' : 'Politica de confidențialitate'}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* TODO: Добавить текст политики конфиденциальности */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }];
}
