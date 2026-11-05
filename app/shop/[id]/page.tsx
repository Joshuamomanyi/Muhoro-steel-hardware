'use client'

import { use, useState } from 'react'
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react'
import { getUnitPrice, getWholesaleMinimum, useCart } from '@/components/cart-context'
import { ProductImage } from '@/components/product-image'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = use(params)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { products, addItem } = useCart()

  const product = products.find(item => item.id === productId && (item.active ?? true))
  if (!product) {
    return <main className="grid min-h-screen place-items-center bg-muted px-5 text-center">
      <div><h1 className="font-display text-4xl font-bold uppercase text-steel">Product not found</h1><a href="/products" className="mt-5 inline-flex items-center gap-2 font-bold text-accent"><ArrowLeft size={17} /> Browse products</a></div>
    </main>
  }

  const minimum = getWholesaleMinimum(product)
  const wholesale = product.wholesalePrice !== null && quantity >= minimum
  const price = getUnitPrice(product, quantity)
  const retailPriceVisible = product.showRetailPrice !== false

  return (
    <main className="min-h-screen bg-muted text-foreground">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-32 lg:grid-cols-2 lg:px-8 lg:pb-20 lg:pt-40">
        <div className="group flex min-h-[320px] items-center justify-center overflow-hidden border border-dashed border-border bg-white transition-colors hover:border-steel/60">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{product.category}</p>
            <p className="mt-3 text-xl font-bold text-accent transition-colors group-hover:text-steel">Product</p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <a href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-accent"><ArrowLeft size={16} /> Back to products</a>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase text-steel sm:text-5xl">{product.name}</h1>
          <p className="mt-5 leading-7 text-muted-foreground">{product.description}</p>
          <p className="mt-7 text-3xl font-bold text-steel">Unit: {product.unit}</p>
          <p className="mt-1 text-lg font-bold text-steel">{retailPriceVisible ? `KES ${price.toLocaleString()}` : 'Price on request'}</p>
          <p className="mt-1 text-sm text-muted-foreground">{retailPriceVisible ? 'Retail rate shown for this product.' : 'Retail pricing changes often and this item is currently quoted on request.'}</p>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p>Category: {product.category}</p>
            <p>Wholesale minimum: {minimum} units</p>
          </div>
          <label className="mt-7 block text-sm font-bold text-steel">Quantity
            <input type="number" min="1" max={product.stock ?? undefined} step="1" value={quantity} onChange={event => setQuantity(Number(event.target.value))} className="mt-2 block w-32 border border-border bg-white px-3 py-2 text-base" />
          </label>
          <button
            disabled={!Number.isInteger(quantity) || quantity < 1 || product.stock === 0 || (product.stock !== null && quantity > product.stock)}
            onClick={() => { addItem(product, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1200) }}
            className="mt-6 inline-flex w-fit items-center gap-2 bg-accent px-6 py-3 font-bold text-white hover:bg-steel disabled:cursor-not-allowed disabled:opacity-40"
          >{added ? <Check size={18} /> : <ShoppingCart size={18} />}{added ? 'Added to quote' : 'Add to quote'}</button>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
