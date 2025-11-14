import { Suspense } from 'react'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'

export default function AboutPage({ params }: { params: { locale: string } }) {
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