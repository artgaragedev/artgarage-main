import { Suspense } from 'react'
import ContactsSection from '@/components/ContactsSection'
import Footer from '@/components/Footer'

export default function ContactsPage({ params }: { params: { locale: string } }) {
  return (
    <>
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