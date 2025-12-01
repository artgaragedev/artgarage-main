import { Suspense } from 'react'
import ContactsSection from '@/components/ContactsSection'
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
        title: 'Контакты Art Garage | Свяжитесь с нами',
        description: 'Контактная информация Art Garage. Адрес офиса в Кишиневе, телефон, email. Форма обратной связи для заказа услуг.',
      },
      ro: {
        title: 'Contacte Art Garage | Contactați-ne',
        description: 'Informații de contact Art Garage. Adresa biroului în Chișinău, telefon, email. Formular de contact pentru comandarea serviciilor.',
      },
    },
    locale,
    'contacts'
  );
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRu = locale === 'ru';

  return (
    <>
      <h1 className="sr-only">{isRu ? 'Контакты' : 'Contacte'}</h1>
      <Suspense>
        <ContactsSection />
      </Suspense>
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'ro' }]
}