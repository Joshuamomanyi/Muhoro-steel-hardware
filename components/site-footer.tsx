export function SiteFooter() {
  return (
    <footer className="bg-charcoal px-5 py-10 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="flex items-center gap-3" aria-label="Muhoro Steel Hardware home">
          <img src="/sh log.jpeg" alt="Muhoro Steel Hardware" className="h-16 w-auto object-contain" />
          <span className="font-display text-lg font-bold">MUHORO <span className="text-accent">STEEL HARDWARE</span></span>
        </a>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/65">
          <a href="/" className="transition hover:text-white">Home</a>
          <a href="/about" className="transition hover:text-white">About</a>
          <a href="/products" className="transition hover:text-white">Shop</a>
          <a href="/delivery" className="transition hover:text-white">Delivery</a>
          <a href="/why-muhoro" className="transition hover:text-white">Why Muhoro</a>
          <a href="/contact" className="transition hover:text-white">Contact</a>
          <a href="/blog" className="transition hover:text-white">News & Guides</a>
          <a href="tel:+254721270670" className="transition hover:text-white">+254 721 270 670</a>
        </nav>
      </div>
      <div className="mx-auto mt-7 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/40">
        © 2026 Muhoro Steel Hardware Limited. All rights reserved.
      </div>
    </footer>
  )
}