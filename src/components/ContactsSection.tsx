'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Phone, Mail, Clock, MapPin, Copy, Check } from 'lucide-react'

const ContactsSection = () => {
  const t = useTranslations('contacts')
  const tNav = useTranslations('navbar')
  const tFooter = useTranslations('footer')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  const phone = tNav('phone')
  const emailAddress = tFooter('email')
  const sanitizedTel = phone.replace(/\s+/g, '')

  return (
    <section className="w-screen bg-white dark:bg-[#0b0b0b] transition-colors">
      <div className="container-max-width" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="text-center mb-10">
          <h2 className="font-bold text-black dark:text-white" style={{ fontSize: '40px', lineHeight: '1', letterSpacing: '-0.01em' }}>{t('title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3" style={{ fontSize: '18px' }}>{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left: contact info */}
          <Card className="md:col-span-2 p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-black dark:text-white" style={{ fontSize: '22px' }}>{t('contactInfoTitle')}</h3>
              <Separator />

              {/* Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('phoneLabel')}</div>
                    <a href={`tel:${sanitizedTel}`} className="font-medium text-black dark:text-white hover:underline">{phone}</a>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={t('copy')}
                        onClick={() => navigator.clipboard.writeText(sanitizedTel)}
                        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Copy className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('copy')}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('emailLabel')}</div>
                    <a href={`mailto:${emailAddress}`} className="font-medium text-black dark:text-white hover:underline">{emailAddress}</a>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={t('copy')}
                        onClick={() => navigator.clipboard.writeText(emailAddress)}
                        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Copy className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{t('copy')}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Work hours */}
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('workHoursLabel')}</div>
                  <div className="font-medium text-black dark:text-white">{t('workHours')}</div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('addressLabel')}</div>
                  <div className="font-medium text-black dark:text-white">{tFooter('address')}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Right: form */}
          <Card className="md:col-span-3 p-6">
            {sent ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Check className="h-5 w-5" />
                <p style={{ fontSize: '18px' }}>{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea id="message" name="message" placeholder="" rows={5} required />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="bg-black text-white dark:bg-white dark:text-black hover:opacity-90">
                    {t('send')}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>

        {/* Map embed below */}
        <Card className="mt-8 overflow-hidden">
          <iframe
            title="Art Garage SRL Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2718.8034408228973!2d28.830856999999998!3d47.04408769999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dda28465015%3A0x34786823e9a66c44!2sArt%20Garage%20SRL!5e0!3m2!1sru!2s!4v1762768001551!5m2!1sru!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[450px]"
          />
        </Card>
      </div>
    </section>
  )
}

export default ContactsSection