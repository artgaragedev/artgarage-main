import { Suspense } from 'react'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    {
      ru: {
        title: 'О нас | Art Garage',
        description: 'Art Garage — креативное рекламное агентство с многолетним опытом. Наша команда, ценности, достижения. Узнайте больше о нас.',
      },
      ro: {
        title: 'Despre noi | Art Garage',
        description: 'Art Garage — agenție creativă de publicitate cu experiență multă. Echipa noastră, valori, realizări. Aflați mai multe despre noi.',
      },
    },
    locale,
    'about'
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <>
      <Suspense>
        <AboutSection />
      </Suspense>
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }]
}