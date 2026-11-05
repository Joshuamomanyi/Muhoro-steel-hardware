'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { CartButton } from '@/components/cart-drawer'

const whatsapp = 'https://wa.me/254721270670?text=Hi%2C%20I%27m%20interested%20in%20your%20steel%20and%20hardware%20products.'
const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Products', '/products'],
  ['Delivery', '/delivery'],
  ['Why Muhoro', '/why-muhoro'],
  ['Contact', '/contact'],
  ['News & Guides', '/blog'],
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-steel/95 text-steel-foreground backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="Muhoro Steel Hardware home">
          <img src="/sh log.jpeg" alt="Muhoro Steel Hardware" className="h-12 w-auto object-contain sm:h-14" />
          <span className="hidden font-display text-base font-bold tracking-tight sm:block lg:text-lg">MUHORO <span className="text-accent">STEEL HARDWARE</span></span>
        </a>
        <nav aria-label="Main" className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-5 border-b border-white/10 bg-steel px-5 py-6 shadow-lg xl:static xl:flex xl:flex-row xl:items-center xl:justify-center xl:gap-4 xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none`}>
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="whitespace-nowrap text-sm font-semibold text-steel-foreground/80 transition hover:text-white">{label}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a href={whatsapp} className="hidden rounded-full bg-whatsapp px-3 py-2 text-xs font-bold text-white shadow-lg shadow-whatsapp/20 transition hover:brightness-110 sm:inline-flex lg:px-4 lg:py-2.5 lg:text-sm">WhatsApp</a>
          <CartButton />
          <a href={whatsapp} className="hidden rounded-sm bg-accent px-3 py-2 text-xs font-bold text-white transition hover:bg-accent/90 sm:inline-flex lg:px-4 lg:py-2.5 lg:text-sm">Request quote</a>
          <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="rounded-md p-2 text-steel-foreground xl:hidden">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
    </header>
  )
}
