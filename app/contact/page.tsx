import Image from 'next/image'
import { ArrowRight, Clock3, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { INQUIRY_PHONE_NUMBER, INQUIRY_WHATSAPP_LINK, OPENING_HOURS } from '@/lib/contact-info'

const whatsapp = INQUIRY_WHATSAPP_LINK
const locationDirectionsLink = 'https://www.google.com/maps?q=MUHORO%20STEEL%20DEALER%20HARDWARE%20LTD&z=14'

export const metadata: Metadata = {
  title: 'Contact Muhoro Steel Hardware | Juja Hardware Store and Steel Dealer',
  description: 'Call, WhatsApp, or visit Muhoro Steel Hardware on Gatundu Juja Road for Juja hardware, steel supplies, building materials, and affordable pricing in Kiambu, Nairobi, and Kenya.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-steel px-5 pb-16 pt-36 text-white lg:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl"><p className="eyebrow text-accent">We are here to help</p><h1 className="section-title mt-4 max-w-4xl text-white">Let&apos;s get your <span className="text-accent">materials moving.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Ask about a product, talk through a materials list, or confirm delivery options with our team in Juja.</p></div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
        <div>
          <p className="eyebrow">Talk to Muhoro</p><h2 className="section-title mt-3">Real help, <span className="text-accent">close by.</span></h2>
          <div className="mt-8 space-y-6">
            <a href="tel:+254721270670" className="flex items-start gap-4"><Phone className="mt-1 shrink-0 text-accent" size={21} /><span><strong className="block text-steel">{INQUIRY_PHONE_NUMBER}</strong><span className="mt-1 block text-sm text-muted-foreground">Call for product enquiries and quotes</span></span></a>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4"><MessageCircle className="mt-1 shrink-0 text-accent" size={21} /><span><strong className="block text-steel">Chat on WhatsApp</strong><span className="mt-1 block text-sm text-muted-foreground">Share your materials list or question</span></span></a>
            <div className="flex items-start gap-4"><MapPin className="mt-1 shrink-0 text-accent" size={21} /><span><strong className="block text-steel">Gatundu Juja Road, Juja</strong><span className="mt-1 block text-sm text-muted-foreground">Kiambu County, Kenya</span></span></div>
            <div className="flex items-start gap-4"><Clock3 className="mt-1 shrink-0 text-accent" size={21} /><span><strong className="block text-steel">{OPENING_HOURS}</strong><span className="mt-1 block text-sm text-muted-foreground">Please confirm holiday hours by phone.</span></span></div>
          </div>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white shadow-lg shadow-whatsapp/20 transition hover:brightness-110">Send us a WhatsApp <ArrowRight size={17} /></a>
        </div>
        <div className="relative min-h-[350px] overflow-hidden bg-muted sm:min-h-[480px]">
          <Image src="/Muhoro receptiona.jpeg" alt="Muhoro Steel Hardware storefront" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-steel/90 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Come by and say hello</p><h2 className="mt-2 font-display text-3xl font-bold uppercase">Gatundu Juja Road, Juja</h2><a href={locationDirectionsLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold hover:text-accent">Open in Google Maps <ArrowRight size={16} /></a></div>
        </div>
      </section>
      <section className="bg-muted px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <MapPin className="text-accent" size={22} />
            <h2 className="font-display text-3xl font-bold uppercase text-steel">Muhoro steel hardware</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <iframe
              title="Muhoro Steel Hardware location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d66318.82152214846!2d36.96161269906517!3d-1.0856932312450152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f47a3e3c3aa15%3A0xf3518c15c4e87741!2sMUHORO%20STEEL%20DEALER%20HARDWARE%20LTD!5e1!3m2!1sen!2ske!4v1793892774032!5m2!1sen!2ske"
              className="h-[420px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
      <section className="bg-muted px-5 py-12 lg:px-8"><div className="mx-auto max-w-7xl border-l-4 border-accent bg-background p-6 sm:p-8"><p className="font-bold text-steel">For a faster quote</p><p className="mt-2 max-w-3xl leading-7 text-muted-foreground">Include product names or specifications, quantities, and your delivery location when you contact us. We can then check the details and advise on availability.</p></div></section>
      <SiteFooter />
    </main>
  )
}
