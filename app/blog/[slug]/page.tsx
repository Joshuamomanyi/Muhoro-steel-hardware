import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articles } from '@/lib/articles'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) return { title: 'Guide not found | Muhoro Steel Hardware' }

  return {
    title: `${article.title} | Muhoro Steel Hardware`,
    description: article.excerpt,
    keywords: article.keywords ?? ['building materials', 'Juja steel hardware'],
    alternates: { canonical: `https://muhorosteelhardware.co.ke/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://muhorosteelhardware.co.ke/blog/${article.slug}`,
      siteName: 'Muhoro Steel Hardware',
      locale: 'en_KE',
      type: 'article',
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()

  const relatedArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <article>
        <header className="bg-steel px-5 pb-12 pt-36 text-white lg:px-8 lg:pb-16 lg:pt-44">
          <div className="mx-auto max-w-4xl">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"><ArrowLeft size={16} /> All field guides</a>
            <p className="mt-8 font-mono text-xs font-bold uppercase tracking-widest text-accent">{article.category} · Muhoro field notes</p>
            <h1 className="mt-4 font-display text-4xl font-black uppercase leading-[.98] sm:text-6xl">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{article.excerpt}</p>
          </div>
        </header>
        <div className="relative mx-auto -mt-1 aspect-[16/8] max-h-[560px] max-w-7xl overflow-hidden bg-muted px-0">
          <Image src={article.image} alt={article.imageAlt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8 lg:py-16">
          <div className="mx-auto w-full max-w-3xl space-y-9">
            {article.sections.map((section, index) => <section key={section.title} className="border-b border-border pb-8 last:border-0">
              <p className="font-mono text-xs font-bold text-accent">0{index + 1}</p>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase text-steel">{section.title}</h2>
              <p className="mt-3 text-base leading-8 text-muted-foreground">{section.text}</p>
            </section>)}
            <aside className="border-l-4 border-accent bg-muted p-6">
              <p className="font-display text-xl font-bold uppercase text-steel">Have a materials question?</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Talk with our team about current availability, specifications, and delivery options for your project.</p>
              <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-accent">Contact Muhoro <ArrowRight size={15} /></a>
            </aside>
          </div>
          <aside className="h-fit border border-border p-6">
            <p className="eyebrow">Keep exploring</p>
            <h2 className="mt-2 font-display text-xl font-bold uppercase text-steel">Related field guides</h2>
            <div className="mt-4 divide-y divide-border">
              {relatedArticles.map((related) => <a key={related.slug} href={`/blog/${related.slug}`} className="block py-4 first:pt-0 last:pb-0">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">{related.category}</p>
                <p className="mt-2 font-display text-lg font-bold uppercase leading-tight text-steel hover:text-accent">{related.title}</p>
              </a>)}
            </div>
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  )
}
