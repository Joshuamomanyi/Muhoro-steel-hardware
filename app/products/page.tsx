'use client'

import { Search, ShoppingCart, Check, MessageCircle, Phone } from 'lucide-react'
import { useMemo, useState } from 'react'
import { getUnitPrice, getWholesaleMinimum, useCart, type OrderMode } from '@/components/cart-context'
import { ProductImage } from '@/components/product-image'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const whatsappLink = 'https://wa.me/254721270670?text=Hi%2C%20I%27m%20interested%20in%20your%20wholesale%20steel%20and%20hardware%20pricing.'
const phoneLink = 'tel:+254721270670'

export default function ProductsPage() {
	const [category, setCategory] = useState('All products')
	const [query, setQuery] = useState('')
	const [orderMode, setOrderMode] = useState<OrderMode>('retail')
	const [quantities, setQuantities] = useState<Record<string, string>>({})
	const { addItem, products } = useCart()
	const [added, setAdded] = useState<string | null>(null)
	const visibleProducts = useMemo(() => products.filter(item => item.active ?? true), [products])
	const categoryCounts = useMemo(() => {
		const counts = new Map<string, number>()
		visibleProducts.forEach(product => {
			counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
		})
		return counts
	}, [visibleProducts])
	const categories = useMemo(() => ['All products', ...Array.from(new Set(visibleProducts.map(product => product.category)))], [visibleProducts])
	const categoryList = useMemo(() => [
		{ name: 'All products', count: visibleProducts.length },
		...categories.filter(item => item !== 'All products').map(item => ({ name: item, count: categoryCounts.get(item) ?? 0 })),
	], [categories, categoryCounts, visibleProducts.length])
	const filtered = useMemo(() => {
		const search = query.trim().toLowerCase()
		return visibleProducts.filter(item =>
			(category === 'All products' || item.category === category) &&
			(!search || item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search) || item.description?.toLowerCase().includes(search))
		)
	}, [category, query, visibleProducts])

	return (
		<main className="min-h-screen bg-muted text-foreground">
			<SiteHeader />
			<section className="bg-background px-4 pb-14 pt-36 sm:px-5 lg:px-8 lg:pb-14 lg:pt-44">
				<div className="mx-auto max-w-7xl">
					<p className="eyebrow">Best hardware in Juja & Thika Road</p>
					<h1 className="section-title mt-3 max-w-3xl">Best hardware supplies.<br /><span className="text-accent">Quality steel and building materials.</span></h1>
					<p className="mt-5 max-w-xl leading-7 text-muted-foreground">Find the best hardware in Juja, Thika Road, and Kiambu County for roofing sheets, steel, cement, pipes, and general building materials. Shop by category and get a quick quote from Muhoro Steel Hardware.</p>
					<div className="mt-7 inline-flex w-full max-w-xs rounded-full border border-border bg-muted p-1 sm:w-auto" aria-label="Choose order type">
						{(['retail', 'wholesale'] as OrderMode[]).map(mode => (
							<button key={mode} type="button" aria-pressed={orderMode === mode} onClick={() => setOrderMode(mode)} className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold capitalize transition-colors sm:flex-none sm:px-5 ${orderMode === mode ? 'bg-steel text-white' : 'text-steel hover:bg-white'}`}>{mode}</button>
						))}
					</div>
					{orderMode === 'retail' && (
						<p className="mt-3 max-w-2xl rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
							Retail prices change more often. Consistent, market-priced items are displayed on the retail tab. For products with updated or negotiated pricing, our team will confirm the final quote before dispatch.
						</p>
					)}
					{orderMode === 'wholesale' && (
						<div className="mt-3 max-w-2xl rounded border border-steel/20 bg-steel/5 p-4 text-sm leading-6 text-steel">
							<p className="font-bold text-steel">Wholesale quotations & pricing change frequently and depend on product quantities ordered, site location, delivery arrangements (free or paid), and the type of vehicle required, including pickups, small lorries, and big lorries.</p>
							<p className="mt-2">For tailored wholesale rates, call or WhatsApp us directly for a quote.</p>
							<div className="mt-3 flex flex-wrap gap-3">
								<a href={whatsappLink} className="inline-flex items-center gap-2 bg-whatsapp px-3 py-2 font-bold text-white"><MessageCircle size={16} /> WhatsApp</a>
								<a href={phoneLink} className="inline-flex items-center gap-2 bg-steel px-3 py-2 font-bold text-white"><Phone size={16} /> Call +254 721 270 670</a>
							</div>
						</div>
					)}
					<div className="mt-8 flex max-w-xl items-center gap-3 border-b-2 border-steel py-3">
						<Search size={20} className="text-steel" />
						<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
					</div>
				</div>
			</section>
			<div className="border-y border-border bg-background">
				<div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-5 lg:px-8">
					{categoryList.map(item => (
						<button key={item.name} onClick={() => setCategory(item.name)} className={`whitespace-nowrap px-4 py-2 text-sm font-bold ${category === item.name ? 'bg-steel text-white' : 'text-steel hover:bg-muted'}`}>
							{item.name} ({item.count})
						</button>
					))}
				</div>
			</div>
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 lg:px-8">
				<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">{filtered.length} products</p>
					<a href={phoneLink} className="text-sm font-bold text-accent">Need help? Call us</a>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{filtered.map(item => {
						const minimum = getWholesaleMinimum(item)
						const quantity = Number(quantities[item.id] ?? 1)
						const orderQuantity = orderMode === 'wholesale' ? Math.max(quantity, minimum) : quantity
						const validQuantity = Number.isInteger(quantity) && quantity > 0
						const unitPrice = getUnitPrice(item, orderQuantity)
						const showRetailPrice = orderMode === 'retail' ? item.showRetailPrice !== false : true
						const priceLabel = orderMode === 'retail' && !showRetailPrice ? 'Price on request' : `KES ${unitPrice.toLocaleString()}`
						const priceHint = orderMode === 'retail' && !showRetailPrice ? 'Ask our team for current market pricing.' : `${item.unit} • ${orderMode === 'wholesale' ? 'Wholesale rate' : 'Retail rate'}`
						return (
						<article key={item.id} className="flex flex-col bg-background p-5 shadow-sm">
							<div className="group mb-4 flex min-h-20 items-center justify-center rounded-xl border border-border/80 bg-muted/50 px-3 py-3 text-center transition-all duration-200 hover:border-steel/60 hover:bg-white">
								<div className="flex flex-col items-center gap-1">
									<p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{item.category}</p>
									<p className="text-xs font-semibold text-accent transition-colors group-hover:text-steel">Product</p>
								</div>
							</div>
							<div className="flex flex-1 flex-col">
								<p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{item.category}</p>
								<h2 className="mt-2 font-display text-lg font-bold uppercase leading-tight text-steel"><a href={`/shop/${item.id}`} className="hover:text-accent">{item.name}</a></h2>
								<p className="mt-2 text-xs leading-5 text-muted-foreground">{item.description}</p>
								<div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-end sm:justify-between">
									<div className="min-w-0">
										<p className="text-sm font-bold text-steel">Unit: {item.unit}</p>
										{orderMode === 'wholesale' ? (
											<p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-steel">Wholesale quote</p>
										) : (
											<p className="mt-1 text-base font-bold text-steel">{showRetailPrice ? `KES ${unitPrice.toLocaleString()}` : 'Price on request'}</p>
										)}
										{orderMode !== 'wholesale' && <p className="text-[11px] text-muted-foreground">{priceHint}</p>}
									</div>
									<div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
										<button
											onClick={() => { addItem(item, orderMode === 'wholesale' ? orderQuantity : 1, orderMode); setAdded(item.id); setTimeout(() => setAdded(null), 1200) }}
											className="flex h-9 w-full items-center justify-center gap-2 bg-accent px-3 text-white hover:bg-steel disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
											aria-label={`Add ${item.name} to quote`}
										>{added === item.id ? <Check size={16} /> : <ShoppingCart size={15} />}<span className="text-[11px] font-bold">Add to Quote</span></button>
									</div>
								</div>
							</div>
						</article>
					)})}
				</div>
			</section>
			<SiteFooter />
		</main>
	)
}
