import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'

const articles = [
  {
    id: 'steel-order',
    category: 'Materials guide',
    title: 'What to check before ordering structural steel',
    excerpt: 'A clear materials list helps your supplier quote accurately and keeps the order aligned with the build drawings.',
    image: '/Structural Steel.png',
    imageAlt: 'Structural steel sections',
    sections: [
      { title: 'Start with the drawings', text: 'Use the latest approved drawings or materials schedule as the source for sizes, quantities, and lengths. Keep items grouped by type so it is easier to compare the quote with the plan.' },
      { title: 'Confirm details before substitution', text: 'Steel dimensions and grades affect how a structure performs. If a listed item is unavailable, check with the project designer or engineer before accepting a substitute.' },
      { title: 'Plan delivery and storage', text: 'Share the site location, access constraints, and preferred delivery time when requesting a quote. Prepare a level, secure place to receive and store the steel before it arrives.' },
    ],
  },
  {
    id: 'site-delivery',
    category: 'Site planning',
    title: 'Get your site ready for a materials delivery',
    excerpt: 'A few checks before the truck leaves the yard can make receiving materials safer and less disruptive.',
    image: '/Muhoro new Isuzu.jpg',
    imageAlt: 'Muhoro Steel Hardware delivery truck',
    sections: [
      { title: 'Make access clear', text: 'Confirm the delivery address, a contact person, and any gate or road restrictions. Make sure the route and unloading area are clear for the vehicle expected.' },
      { title: 'Prepare the receiving area', text: 'Choose a stable place away from busy walkways and active work. Arrange suitable help and equipment for unloading heavy or long materials; do not improvise a lift.' },
      { title: 'Check the order as it arrives', text: 'Compare delivered items with the agreed order and note any shortage or damage before signing off. Store cement and other moisture-sensitive supplies under cover on a dry surface.' },
    ],
  },
  {
    id: 'material-list',
    category: 'Project planning',
    title: 'Build a practical materials list for your project',
    excerpt: 'Organize purchases by work stage, confirm quantities, and keep small fittings from getting missed.',
    image: '/Hardware 6.jpg',
    imageAlt: 'Hardware supplies arranged on shop shelves',
    sections: [
      { title: 'Break the job into stages', text: 'List the materials needed for each stage of work, then compare the list with the drawings or instructions from your fundi or contractor. This makes it easier to spot gaps before ordering.' },
      { title: 'Include the supporting items', text: 'Alongside the main materials, check for the fasteners, fittings, tools, and accessories needed to install them. Confirm sizes and compatibility rather than relying on appearance alone.' },
      { title: 'Compare complete quotes', text: 'Check units, quantities, delivery charges, and quote validity when comparing suppliers. Ask questions about availability and delivery timing before confirming the order.' },
    ],
  },
]

export const metadata: Metadata = {
  title: 'Building Guides | Muhoro Steel Hardware',
  description: 'Practical steel, hardware, and site-planning guides from Muhoro Steel Hardware in Juja.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-steel text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Muhoro Steel Hardware home">
            <img src="/msh-logo.jpg" alt="Muhoro Steel Hardware" className="h-16 w-auto object-contain" />
            <span className="hidden font-display text-lg font-bold sm:block">MUHORO <span className="text-accent">STEEL HARDWARE</span></span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-5 text-sm font-semibold">
            <a href="/" className="text-white/70 transition hover:text-white">Home</a>
            <a href="/products" className="transition hover:text-white">Shop</a>
          </nav>
        </div>
      </header>

      <section className="border-b border-border bg-muted px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Muhoro field notes</p>
          <h1 className="section-title mt-3 max-w-4xl">Useful guidance for <span className="text-accent">the work ahead.</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Straightforward notes on materials, site planning, and getting supplies where they need to be.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20" aria-label="Articles">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="flex flex-col border border-border bg-background">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image src={article.image} alt={article.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs font-bold uppercase text-accent">{article.category}</p>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase text-steel">{article.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{article.excerpt}</p>
                <a href={`#${article.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-accent">
                  Read guide <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted px-5 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-14">
          {articles.map((article) => (
            <article key={article.id} id={article.id} className="scroll-mt-8 border-b border-border pb-12 last:border-0">
              <p className="font-mono text-xs font-bold uppercase text-accent">{article.category}</p>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase text-steel">{article.title}</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
              <div className="mt-8 space-y-7">
                {article.sections.map((section) => (
                  <section key={section.title}>
                    <h3 className="font-display text-xl font-bold uppercase text-steel">{section.title}</h3>
                    <p className="mt-2 leading-7 text-muted-foreground">{section.text}</p>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}