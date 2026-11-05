import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Construction Guides & Building Tips | Muhoro Steel Hardware',
  description: 'Helpful building-materials advice and practical site-planning guides from Muhoro Steel Hardware in Juja, Kiambu County.',
  keywords: ['construction guides Kenya', 'building supplies Juja', 'steel hardware advice', 'material buying tips Kenya'],
  alternates: { canonical: 'https://muhorosteelhardware.co.ke/blog' },
  openGraph: {
    title: 'Construction Guides & Building Tips | Muhoro Steel Hardware',
    description: 'Helpful building-materials advice and practical site-planning guides from Muhoro Steel Hardware in Juja, Kiambu County.',
    url: 'https://muhorosteelhardware.co.ke/blog',
    siteName: 'Muhoro Steel Hardware',
    locale: 'en_KE',
    type: 'website',
  },
}

export default function BlogPage() {
  const [featured, ...moreArticles] = articles

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="bg-muted px-5 pb-14 pt-36 lg:px-8 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Muhoro field notes</p>
          <h1 className="section-title mt-3 max-w-4xl">Useful guidance for <span className="text-accent">the work ahead.</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Straightforward ideas for ordering materials, planning site deliveries, and keeping your next building task moving.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16" aria-label="Featured guide">
        <article className="grid overflow-hidden border border-border md:grid-cols-2">
          <a href={`/blog/${featured.slug}`} className="relative block min-h-[280px] bg-muted md:min-h-[420px]" aria-label={`Read ${featured.title}`}>
            <Image src={featured.image} alt={featured.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 hover:scale-[1.02]" />
          </a>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-accent"><BookOpen size={15} /> Featured guide · {featured.category}</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight text-steel">{featured.title}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{featured.excerpt}</p>
            <a href={`/blog/${featured.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-accent">Read the guide <ArrowRight size={16} /></a>
          </div>
        </article>
      </section>
      <section className="bg-muted px-5 py-14 lg:px-8 lg:py-20" aria-label="All guides">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">On the ground</p><h2 className="mt-2 font-display text-3xl font-bold uppercase text-steel">More field guides</h2></div><p className="text-sm text-muted-foreground">Practical notes for contractors, fundis, and homeowners.</p></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {moreArticles.map((article) => <article key={article.slug} className="flex flex-col bg-background">
              <a href={`/blog/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-white" aria-label={`Read ${article.title}`}>
                <Image src={article.image} alt={article.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 hover:scale-105" />
              </a>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">{article.category}</p>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-steel">{article.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
                <a href={`/blog/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-accent">Read guide <ArrowRight size={15} /></a>
              </div>
            </article>)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
