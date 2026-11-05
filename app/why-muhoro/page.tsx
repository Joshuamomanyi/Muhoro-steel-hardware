import { ArrowRight, BadgeCheck, Boxes, MapPin, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Why Muhoro | Steel and Hardware in Juja',
  description: 'Discover the practical reasons contractors, fundis, and homeowners choose Muhoro Steel Hardware in Juja.',
}

const reasons = [
  { icon: Boxes, title: 'A broad, practical range', text: 'Find structural steel, cement, roofing, plumbing, fabrication supplies, and everyday hardware for different stages of the job.' },
  { icon: MapPin, title: 'A nearby team', text: 'We are based on Gatundu–Juja Road and serve customers across Juja and surrounding Kiambu County.' },
  { icon: MessageCircle, title: 'Straight answers', text: 'Check availability, compare quantities, and discuss delivery directly with our team before placing an order.' },
  { icon: BadgeCheck, title: 'Built around real projects', text: 'Whether you are a contractor, fundi, or homeowner, we aim to make sourcing and ordering more straightforward.' },
]

export default function WhyMuhoroPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-steel px-5 pb-16 pt-36 text-white lg:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-accent">Why Muhoro</p>
          <h1 className="section-title mt-4 max-w-4xl text-white">Good materials.<br /><span className="text-accent">Good business.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">The right supplier helps keep the small details from becoming big delays. We bring local service and a useful range together for the people doing the work.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }, index) => <article key={title} className="bg-background p-7 sm:p-10">
            <div className="flex items-center justify-between"><div className="grid h-12 w-12 place-items-center bg-steel text-white"><Icon size={22} /></div><span className="font-mono text-xs font-bold tracking-widest text-accent">0{index + 1}</span></div>
            <h2 className="mt-7 font-display text-2xl font-bold uppercase text-steel">{title}</h2><p className="mt-3 max-w-lg leading-7 text-muted-foreground">{text}</p>
          </article>)}
        </div>
      </section>
      <section className="bg-muted px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 bg-background p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div><p className="eyebrow">Have a materials list?</p><h2 className="mt-2 font-display text-3xl font-bold uppercase text-steel">Let&apos;s make a plan.</h2><p className="mt-3 max-w-xl leading-7 text-muted-foreground">Get in touch to check current stock, pricing, and delivery options for your project.</p></div>
          <a href="/contact" className="inline-flex shrink-0 items-center gap-2 bg-accent px-5 py-3 font-bold text-white hover:bg-steel">Talk to our team <ArrowRight size={17} /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
