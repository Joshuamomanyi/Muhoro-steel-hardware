'use client'

import Image from 'next/image'
import { ArrowRight, Check, MapPin, Phone, Truck, Wrench, Hammer } from 'lucide-react'
import { HeroSlider } from '@/components/hero-slider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const whatsapp = 'https://wa.me/254721270670?text=Hi%2C%20I%27m%20interested%20in%20your%20steel%20and%20hardware%20products.'

const products = [
  { title: 'Structural Steel & Fabrication', icon: Hammer, image: '/Muhoro columns and pillars steel.jpeg', text: 'Reinforcement bars, hollow sections, welding supplies, and fabrication essentials for strong, lasting builds.', items: ['High-strength reinforcement steel', 'Square & rectangular hollow sections', 'Materials for gates, grills & frameworks'] },
  { title: 'Masonry & Construction', icon: Truck, image: '/Muhoro binding wire.jpeg', text: 'The dependable essentials that keep your foundation, walls, and roofing work moving without delays.', items: ['Bamburi, Simba & Savannah cement', 'Binding wire and timber nails', 'Roofing nails in varied configurations'] },
  { title: 'General Hardware Supplies', icon: Wrench, image: '/Muhoro receptiona.jpeg', text: 'Practical tools, fasteners, plumbing, and electrical basics for every site, workshop, and home project.', items: ['Hand tools and fasteners', 'PVC piping and conduit pipes', 'Conduit accessories & maintenance hardware'] },
]

const reasons = ['Wide product range', 'Competitive pricing', 'Local Juja presence', 'Trusted by contractors']

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <section id="home" className="relative flex min-h-[680px] items-center bg-steel pt-24 text-steel-foreground">
        <HeroSlider />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 pb-[245px] sm:px-5 sm:pb-16 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-accent sm:text-sm"><span className="h-px w-8 bg-accent sm:w-10" /> Juja · Thika Road · Kiambu County</p>
            <h1 className="font-display text-4xl font-black uppercase leading-[.94] tracking-tight text-balance sm:text-5xl lg:text-7xl">Best hardware in Juja.<br /><span className="text-accent">Quality steel & building materials.</span><br />Built to last.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-steel-foreground/80 sm:text-lg sm:leading-8">Your trusted source for the best hardware in Juja and Thika Road, with steel, roofing sheets, cement, pipes, and construction supplies for contractors, fundis, and homeowners.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={whatsapp} className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-white shadow-xl shadow-whatsapp/20 transition hover:brightness-110 sm:px-6">Chat on WhatsApp <ArrowRight size={18} /></a>
              <a href="/products" className="inline-flex items-center justify-center rounded-sm border border-white/40 px-5 py-3.5 font-bold text-white transition hover:border-white hover:bg-white/10 sm:px-6">View Products</a>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-accent text-white" aria-label="Store information">
        <div className="marquee-track flex w-max items-center py-4 text-sm font-semibold">
          {[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1} className="flex items-center gap-12 px-6">
            <span className="flex items-center gap-2"><MapPin size={17} /> Gatundu–Juja Road, Juja</span>
            <span className="flex items-center gap-2"><Phone size={17} /> +254 721 270 670</span>
            <span>Retail and wholesale pricing available</span>
            <span>Mon–Fri, 9AM–5PM</span><span aria-hidden="true">◆</span>
          </div>)}
        </div>
      </div>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-32">
        <div><p className="eyebrow">The Muhoro standard</p><h2 className="section-title mt-3">Your local partner for <span className="text-accent">serious builds.</span></h2></div>
        <div>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Muhoro Steel Hardware Limited is a localized building materials supplier serving Juja and surrounding Kiambu County. We help contractors, fundis, and homeowners get the quality structural and hardware supplies they need — without the runaround.</p>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-7 sm:grid-cols-4">{[['Local', 'Juja presence'], ['Wide', 'Product range'], ['Fast', 'Site delivery'], ['Fair', 'Pricing']].map(([title, text]) => <div key={title}><p className="font-display text-3xl font-bold text-steel">{title}</p><p className="mt-1 text-sm text-muted-foreground">{text}</p></div>)}</div>
          <a href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-accent">About Muhoro <ArrowRight size={16} /></a>
        </div>
      </section>

      <section id="products" className="bg-muted px-4 py-16 sm:px-5 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="eyebrow">What we stock</p><h2 className="section-title mt-3">Materials for every <span className="text-accent">stage of the build.</span></h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map(({ title, icon: Icon, image, text, items }) => <article key={title} className="group relative isolate flex flex-col overflow-hidden bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-7">
              <Image src={image} alt="" fill unoptimized className="pointer-events-none absolute inset-0 z-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
              <div className="pointer-events-none absolute inset-0 z-0 bg-accent/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-8 flex items-center justify-between"><div className="grid h-12 w-12 place-items-center bg-steel text-white transition-colors group-hover:bg-white group-hover:text-accent group-focus-within:bg-white group-focus-within:text-accent"><Icon size={24} /></div><span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent transition-colors group-hover:text-white group-focus-within:text-white sm:text-xs">Stocked</span></div>
                <h3 className="font-display text-2xl font-bold uppercase text-steel transition-colors group-hover:text-white group-focus-within:text-white">{title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground transition-colors group-hover:text-white/90 group-focus-within:text-white/90">{text}</p>
                <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm">{items.map(item => <li key={item} className="flex gap-3 transition-colors group-hover:text-white group-focus-within:text-white"><Check size={17} className="mt-0.5 shrink-0 text-accent group-hover:text-white group-focus-within:text-white" />{item}</li>)}</ul>
                <a href="/products" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-steel transition-colors group-hover:text-white group-focus-within:text-white">Shop this category <ArrowRight size={16} /></a>
              </div>
            </article>)}
          </div>
          <a href="/products" className="mt-8 inline-flex items-center gap-2 font-bold text-steel hover:text-accent">Browse all products <ArrowRight size={16} /></a>
        </div>
      </section>

      <section id="delivery" className="bg-steel px-4 py-16 text-steel-foreground sm:px-5 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="eyebrow text-accent">From our yard to your site</p><h2 className="section-title mt-3 text-white">Reliable delivery. <span className="text-accent">Less downtime.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-steel-foreground/70 sm:text-lg sm:leading-8">For bulk cement, steel bars, and hollow sections, we coordinate dependable delivery across Juja and Kiambu County.</p></div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">{[['01', 'Order via WhatsApp or call'], ['02', 'We confirm stock & price'], ['03', 'Delivered to your site']].map(([number, text], index) => <div key={number} className="relative border-t border-white/20 pt-6"><span className="font-mono text-sm font-bold text-accent">{number}</span><h3 className="mt-4 font-display text-2xl font-bold uppercase">{text}</h3>{index < 2 && <ArrowRight className="absolute right-4 top-6 hidden text-white/30 md:block" size={24} />}</div>)}</div>
          <a href="/delivery" className="mt-8 inline-flex items-center gap-2 font-bold text-white hover:text-accent">See delivery details <ArrowRight size={16} /></a>
        </div>
      </section>

      <section id="why-muhoro" className="mx-auto max-w-7xl px-4 py-16 sm:px-5 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow">Why Muhoro</p><h2 className="section-title mt-3">Good materials.<br /><span className="text-accent">Good business.</span></h2><a href="/why-muhoro" className="mt-8 inline-flex items-center gap-2 font-bold text-steel hover:text-accent">Why choose Muhoro <ArrowRight size={16} /></a></div>
          <div className="grid gap-0 sm:grid-cols-2">{reasons.map((reason, index) => <div key={reason} className="flex gap-4 border-b border-border py-6 sm:odd:mr-8"><span className="font-mono text-sm font-bold text-accent">0{index + 1}</span><div><h3 className="font-display text-xl font-bold uppercase text-steel">{reason}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Practical service and dependable supply from a team that knows the local building trade.</p></div></div>)}</div>
        </div>
      </section>

      <section id="contact" className="bg-muted px-4 py-16 sm:px-5 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Start your next project</p><h2 className="section-title mt-3">Let&apos;s get your <span className="text-accent">materials moving.</span></h2>
            <div className="mt-10 space-y-5">
              <a href="tel:+254721270670" className="flex items-start gap-4"><Phone className="mt-1 text-accent" size={20} /><span><strong className="block text-steel">+254 721 270 670</strong><span className="text-sm text-muted-foreground">Call or WhatsApp for a quick quote</span></span></a>
              <div className="flex items-start gap-4"><MapPin className="mt-1 text-accent" size={20} /><span><strong className="block text-steel">Gatundu–Juja Road, Juja</strong><span className="text-sm text-muted-foreground">Kiambu County, Kenya</span></span></div>
              <p className="pl-9 text-sm text-muted-foreground">Open Monday to Friday, 9AM–5PM</p>
            </div>
            <a href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-4 font-bold text-white shadow-lg shadow-whatsapp/20 transition hover:brightness-110">Contact Muhoro <ArrowRight size={18} /></a>
          </div>
          <div className="relative aspect-[3/2] min-h-[260px] overflow-hidden bg-steel sm:min-h-[320px]">
            <Image src="/Muhoro reception2.jpeg" alt="Muhoro Steel Hardware delivery truck" fill unoptimized className="object-cover object-[center_44%]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,46,84,.94)_0%,rgba(3,46,84,.05)_78%)]" />
            <div className="relative flex h-full min-h-[260px] flex-col justify-end p-6 text-white sm:min-h-[320px] sm:p-8"><p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Find us in Juja</p><p className="mt-2 max-w-xs font-display text-3xl font-bold uppercase leading-none">Gatundu–Juja Road</p><a href="https://maps.google.com/?q=Juja%20Kenya" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Open in Google Maps <ArrowRight size={16} /></a></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
