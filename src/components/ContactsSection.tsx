'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, Clock, MapPin, Copy, Check, Send, MessageCircle } from 'lucide-react'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'

const ContactsSection = () => {
  const t = useTranslations('contacts')
  const tNav = useTranslations('navbar')
  const tFooter = useTranslations('footer')
  const [sent, setSent] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('API Error:', result)
        throw new Error(result.error || 'Failed to submit contact form')
      }

      console.log('Contact form submitted:', result)
      setSent(true)

      // Сбрасываем форму через 5 секунд
      setTimeout(() => {
        setSent(false)
      }, 5000)

    } catch (error) {
      console.error('Error submitting form:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Произошла ошибка при отправке сообщения: ${errorMessage}\n\nПожалуйста, попробуйте снова или свяжитесь с нами напрямую.`)
    }
  }

  const handleCopy = async (text: string, item: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const phone = tNav('phone')
  const emailAddress = tFooter('email')
  const sanitizedTel = phone.replace(/\s+/g, '')

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b0b0b]">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 mb-8">
              <MessageCircle className="w-4 h-4 text-[#EA3C23]" />
              <span
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {t('badge')}
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black dark:text-white mb-8 max-w-5xl leading-[1.1]"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info & Form - Bento Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Contact Cards - Left Column */}
          <div className="space-y-4">
            {/* Phone Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#EA3C23]/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#EA3C23]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                      {t('phoneLabel')}
                    </div>
                    <a
                      href={`tel:${sanitizedTel}`}
                      className="text-lg font-semibold text-black dark:text-white hover:text-[#EA3C23] transition-colors block truncate"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(sanitizedTel, 'phone')}
                  className="flex-shrink-0 w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  aria-label={t('copy')}
                >
                  {copiedItem === 'phone' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#EA3C23]/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#EA3C23]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                      {t('emailLabel')}
                    </div>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-lg font-semibold text-black dark:text-white hover:text-[#EA3C23] transition-colors block break-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(emailAddress, 'email')}
                  className="flex-shrink-0 w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  aria-label={t('copy')}
                >
                  {copiedItem === 'email' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Work Hours Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#EA3C23]/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#EA3C23]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                    {t('workHoursLabel')}
                  </div>
                  <div
                    className="text-lg font-semibold text-black dark:text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('workHours')}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#EA3C23]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#EA3C23]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                    {t('addressLabel')}
                  </div>
                  <div
                    className="text-lg font-semibold text-black dark:text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {tFooter('address')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right 2 Columns */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-8 sm:p-12">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-6 py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <h3
                    className="text-2xl font-bold text-black dark:text-white mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('success')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('successMessage')}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('formTitle')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('formSubtitle')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {t('name')}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('namePlaceholder')}
                    required
                    className="h-12 rounded-xl border border-gray-200 dark:border-gray-800 focus:border-[#EA3C23] focus:ring-1 focus:ring-[#EA3C23] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {t('email')}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    required
                    className="h-12 rounded-xl border border-gray-200 dark:border-gray-800 focus:border-[#EA3C23] focus:ring-1 focus:ring-[#EA3C23] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {t('message')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('messagePlaceholder')}
                    rows={6}
                    required
                    className="rounded-xl border border-gray-200 dark:border-gray-800 focus:border-[#EA3C23] focus:ring-1 focus:ring-[#EA3C23] transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <InteractiveHoverButton
                    type="submit"
                    className="w-full bg-[#EA3C23] text-white hover:bg-[#D63419] transition-colors px-8 py-4 rounded-xl font-semibold"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {t('send')}
                    </span>
                  </InteractiveHoverButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-32">
        <div
          className={`transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800">
            <iframe
              title="Art Garage SRL Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2718.8034408228973!2d28.830856999999998!3d47.04408769999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dda28465015%3A0x34786823e9a66c44!2sArt%20Garage%20SRL!5e0!3m2!1sru!2s!4v1762768001551!5m2!1sru!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] sm:h-[500px] grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactsSection
