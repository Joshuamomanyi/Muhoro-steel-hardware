import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'About Muhoro Steel Hardware | Juja Hardware Store and Steel Supplier',
  description: 'Meet Muhoro Steel Hardware, a trusted Juja hardware store and steel supplier offering building materials, affordable pricing, and support across Juja, Kiambu, Nairobi, and Kenya.',
}

const values = [
  ['Local knowledge', 'Based on Gatundu Juja Road, we understand the pace and practical needs of building in our community.'],
  ['A useful range', 'From structural steel and cement to plumbing and everyday hardware, find key supplies in one place.'],
  ['Straightforward service', 'Talk with our team about stock, specifications, quantities, pricing, and delivery before you order.'],
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-steel px-5 pb-16 pt-36 text-white lg:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div><p className="eyebrow text-accent">About Muhoro</p><h1 className="section-title mt-4 max-w-3xl text-white">A local partner for <span className="text-accent">serious builds.</span></h1></div>
          <p className="max-w-xl text-lg leading-8 text-white/75">Muhoro Steel Hardware Limited helps contractors, fundis, and homeowners across Juja and Kiambu County source the materials their projects need, without the runaround.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="relative min-h-[340px] overflow-hidden bg-muted sm:min-h-[480px]">
          <Image src="/Muhoro General stores1.jpeg" alt="Muhoro Steel Hardware shop" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel/90 to-transparent p-7 pt-20 text-white"><p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Gatundu Juja Road</p><p className="mt-2 font-display text-3xl font-bold uppercase">Rooted in Juja. Ready for your next build.</p></div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">The Muhoro standard</p>
          <h2 className="section-title mt-3">Supply you can <span className="text-accent">build on.</span></h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">A building project has enough moving parts already. We make it easier to source dependable steel, construction materials, and hardware with a local team you can call, message, or visit.</p>
          <p className="mt-4 leading-7 text-muted-foreground">Whether you are planning a home improvement, coordinating a site, or working through a contractor’s materials list, we are here to help you check what is available and plan the next step.</p>
          <a href="/products" className="mt-8 inline-flex items-center gap-2 font-bold text-steel hover:text-accent">Explore our products <ArrowRight size={17} /></a>
        </div>
      </section>
      <section className="bg-muted px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl"><p className="eyebrow">What matters to us</p><h2 className="section-title mt-3 max-w-3xl">Good materials. <span className="text-accent">Good business.</span></h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{values.map(([title, text], index) => <article key={title} className="bg-background p-7"><span className="font-mono text-xs font-bold text-accent">0{index + 1}</span><h3 className="mt-5 font-display text-2xl font-bold uppercase text-steel">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}</div>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-steel"><Check size={18} className="text-accent" /> Serving Juja and surrounding Kiambu County</div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
