import Image from 'next/image'
import { ArrowRight, Check, MapPin, Phone, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Site Delivery | Muhoro Steel Hardware, Juja',
  description: 'Plan a building-materials delivery from Muhoro Steel Hardware to your site in Juja and surrounding Kiambu County.',
}

const steps = [
  ['01', 'Share your list', 'Call or WhatsApp with the materials, quantities, and site location you have in mind.'],
  ['02', 'Confirm the details', 'We will discuss stock, pricing, delivery timing, access, and the best way to receive your order.'],
  ['03', 'Get site-ready', 'Prepare a safe, accessible unloading area and a contact person for the delivery.'],
]

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-steel px-5 pb-16 pt-36 text-white lg:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div><p className="eyebrow text-accent">From our yard to your site</p><h1 className="section-title mt-4 max-w-3xl text-white">Reliable delivery.<br /><span className="text-accent">Less downtime.</span></h1></div>
          <p className="max-w-xl text-lg leading-8 text-white/75">For steel, cement, and other building essentials, share your plan with our team and we will help coordinate delivery across Juja and Kiambu County.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-24">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image src="/Muhoro reception3.jpeg" alt="Muhoro Steel Hardware delivery truck" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-steel px-5 py-4 text-white"><Truck className="text-accent" /><span className="font-display text-xl font-bold uppercase">Materials moving with your project</span></div>
        </div>
        <div><p className="eyebrow">A simple process</p><h2 className="section-title mt-3">Plan your delivery <span className="text-accent">with confidence.</span></h2>
          <div className="mt-8 space-y-0">{steps.map(([number, title, text]) => <article key={number} className="flex gap-5 border-t border-border py-5"><span className="font-mono text-sm font-bold text-accent">{number}</span><div><h3 className="font-display text-xl font-bold uppercase text-steel">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div></article>)}</div>
        </div>
      </section>
      <section className="bg-muted px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <article className="bg-background p-7 sm:p-9"><p className="eyebrow">Before the truck arrives</p><h2 className="mt-3 font-display text-3xl font-bold uppercase text-steel">A few site checks help.</h2><ul className="mt-6 space-y-4">{['Confirm the delivery address, site contact, and any gate or road restrictions.', 'Clear a stable unloading area away from active work and busy walkways.', 'Arrange suitable equipment and help for handling heavy or long materials.', 'Check items against your order when they arrive; store cement under cover on a dry surface.'].map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><Check size={17} className="mt-0.5 shrink-0 text-accent" />{item}</li>)}</ul></article>
          <article className="flex flex-col justify-between bg-steel p-7 text-white sm:p-9"><div><p className="eyebrow text-accent">Need to check a route or order?</p><h2 className="mt-3 font-display text-3xl font-bold uppercase">Let&apos;s talk through the details.</h2><p className="mt-4 leading-7 text-white/70">Delivery availability, timing, and charges depend on the order and location. Confirm the details with our team before you plan around an arrival.</p></div>          <div className="mt-8 flex flex-wrap gap-3"><a href="tel:+254713371822" className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-bold text-white"><Phone size={17} /> Call us</a><a href="/contact" className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 font-bold text-white hover:bg-white/10"><MapPin size={17} /> Find us <ArrowRight size={16} /></a></div></article>        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:pb-20">
        <div className="rounded border border-border bg-background p-7 shadow-sm sm:p-9">
          <p className="eyebrow">Delivery models</p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase text-steel">Free and paid delivery options depend on location and quantity.</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Free delivery is available in selected areas and for qualifying retail or wholesale orders depending on route, quantity, and delivery arrangement. Common qualifying locations include Juja &amp; environs, Kiambu County, Thika Road, and Nairobi. Countrywide delivery based on agreement with the team. Paid delivery is also available for smaller orders, longer routes, or out-of-zone deliveries.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-steel">Free delivery</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {['Free delivery (with management agreement we can do free delivery in Juja & environs, Kiambu County, Thika Road, Nairobi and countrywide depending on the quantity of order, location and agreement with management.)'].map((area) => <li key={area} className="flex items-center gap-3 rounded border border-border bg-muted px-4 py-3 font-semibold text-steel"><Check size={15} className="mt-0.5 shrink-0 text-accent" />{area}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-steel">Paid delivery</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {['Retail deliveries: charged according to route and order size', 'Wholesale deliveries: tailored based on volume, vehicle type, and distance', 'Additional services: offloading, staffing, or special vehicle arrangement may add charges', 'Free or paid delivery depends on quantity of pieces ordered and site access'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-accent" />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
