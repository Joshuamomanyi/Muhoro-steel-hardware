'use client'

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import Image from 'next/image'
import { ArrowLeft, Boxes, Check, CircleAlert, ImagePlus, LayoutDashboard, LogOut, PackagePlus, Search, ShieldAlert, Trash2 } from 'lucide-react'
import { useCart, type Product } from '@/components/cart-context'

const demoSessionKey = 'muhoro-admin-demo'
const categoryStorageKey = 'muhoro-product-categories'
const defaultCategoryTypes = [
  'Roofing & Translucent Sheets',
  'Cement',
  'Angle Lines & Bars (Structural Steel)',
  'Wire, Mesh & Fencing',
  'Pipes (Black Pipes & CHS)',
  'Plates & Sheets',
  'Deformed Bars & Round/Square Bars',
  'RHS & SHS (Hollow Sections)',
  'Hardware, Fasteners & Miscellaneous',
]
type StockFilter = 'All products' | 'In stock' | 'Low stock' | 'Out of stock' | 'Not tracked'

const normalizeCategoryValue = (value: string) => value.trim() || 'Uncategorized'
const normalizeCategoryList = (values: string[]) => Array.from(new Set(values.map(value => normalizeCategoryValue(value)).filter(Boolean))).sort((left, right) => left.localeCompare(right))

async function readProductImage(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Choose a JPEG, PNG, or WebP image.')
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Choose an image smaller than 15 MB.')
  }

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error('The image could not be prepared. Try another file.')
  }

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return canvas.toDataURL('image/jpeg', 0.78)
}

function InventoryRow({ product, onSave, onDelete, onImageError }: { product: Product; onSave: (product: Product) => void; onDelete: (id: string) => void; onImageError: (message: string) => void }) {
  const [name, setName] = useState(product.name)
  const [category, setCategory] = useState(product.category)
  const [price, setPrice] = useState(String(product.price))
  const [wholesalePrice, setWholesalePrice] = useState(product.wholesalePrice === null ? '' : String(product.wholesalePrice))
  const [wholesaleMinimum, setWholesaleMinimum] = useState(String(product.wholesaleMinimum ?? 15))
  const [unit, setUnit] = useState(product.unit)
  const [stock, setStock] = useState(product.stock === null ? '' : String(product.stock))
  const [imageBusy, setImageBusy] = useState(false)
  const priceDisplayOn = product.showRetailPrice !== false

  useEffect(() => {
    setName(product.name)
    setCategory(product.category)
    setPrice(String(product.price))
    setWholesalePrice(product.wholesalePrice === null ? '' : String(product.wholesalePrice))
    setWholesaleMinimum(String(product.wholesaleMinimum ?? 15))
    setUnit(product.unit)
    setStock(product.stock === null ? '' : String(product.stock))
  }, [product])

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const priceValue = Number(price)
    const wholesalePriceValue = wholesalePrice.trim() === '' ? null : Number(wholesalePrice)
    const wholesaleMinimumValue = Number(wholesaleMinimum)
    const stockValue = stock.trim() === '' ? null : Number(stock)
    if (!name.trim()) return
    if (wholesalePriceValue !== null && (!Number.isFinite(wholesalePriceValue) || wholesalePriceValue <= 0)) return
    if (!Number.isFinite(wholesaleMinimumValue) || wholesaleMinimumValue < 1) return
    if (stockValue !== null && (!Number.isInteger(stockValue) || stockValue < 0)) return
    onSave({
      ...product,
      name: name.trim(),
      category: normalizeCategoryValue(category),
      price: Number.isFinite(priceValue) && priceValue >= 0 ? priceValue : 0,
      wholesalePrice: wholesalePriceValue,
      wholesaleMinimum: Math.round(wholesaleMinimumValue),
      unit: unit.trim() || 'per item',
      stock: stockValue,
      accent: normalizeCategoryValue(category),
      active: product.active ?? true,
      showRetailPrice: product.showRetailPrice ?? true,
    })
  }

  const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setImageBusy(true)
    try {
      onSave({ ...product, image: await readProductImage(file) })
    } catch (error) {
      onImageError(error instanceof Error ? error.message : 'The image could not be processed.')
    } finally {
      setImageBusy(false)
    }
  }

  const removeImage = () => {
    onSave({ ...product, image: undefined })
  }

  const inputClass = 'w-full min-w-24 border border-border bg-white px-2.5 py-2 text-sm text-steel'

  return (
    <tr className="border-b border-border align-top transition-colors hover:bg-slate-50/80">
      <td className="px-3 py-3">
        <div className="flex min-w-40 items-center gap-3">
          <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-slate-100 shadow-sm">
            {product.image && <Image src={product.image} alt={product.name} fill unoptimized className="object-contain" />}
            {product.image && (
              <button type="button" onClick={removeImage} aria-label={`Remove ${product.name} image`} className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-md hover:bg-red-700">
                ×
              </button>
            )}
          </div>
          <label className="cursor-pointer rounded-md border border-dashed border-border bg-slate-50 px-2 py-1.5 text-[11px] font-bold text-steel transition-colors hover:border-steel hover:text-accent">
            <span className="inline-flex items-center gap-1"><ImagePlus size={12} /> {imageBusy ? 'Processing…' : product.image ? 'Replace' : 'Add image'}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" disabled={imageBusy} onChange={updateImage} className="sr-only" aria-label={`${product.name} image`} />
          </label>
        </div>
      </td>
      <td className="px-3 py-3"><form id={`product-${product.id}`} onSubmit={save}><input aria-label={`${product.name} name`} className={`${inputClass} text-sm font-medium`} required value={name} onChange={event => setName(event.target.value)} /></form></td>
      <td className="px-3 py-3"><input aria-label={`${product.name} category`} className={`${inputClass} text-sm`} value={category} onChange={event => setCategory(event.target.value)} /></td>
      <td className="px-3 py-3"><div className="flex items-center gap-1"><span className="text-xs text-muted-foreground">KES</span><input aria-label={`${product.name} price`} className={`${inputClass} min-w-20 text-sm`} type="number" min="0" step="0.01" value={price} onChange={event => setPrice(event.target.value)} /></div></td>
      <td className="px-3 py-3"><div className="flex items-center gap-1"><span className="text-xs text-muted-foreground">KES</span><input aria-label={`${product.name} wholesale price`} className={`${inputClass} min-w-20 text-sm`} type="number" min="0" step="0.01" placeholder="Set price" value={wholesalePrice} onChange={event => setWholesalePrice(event.target.value)} /></div></td>
      <td className="px-3 py-3"><input aria-label={`${product.name} wholesale minimum quantity`} className={`${inputClass} min-w-16 text-sm`} type="number" min="1" step="1" value={wholesaleMinimum} onChange={event => setWholesaleMinimum(event.target.value)} /></td>
      <td className="px-3 py-3"><input aria-label={`${product.name} unit`} className={`${inputClass} text-sm`} value={unit} onChange={event => setUnit(event.target.value)} /></td>
      <td className="px-3 py-3"><input aria-label={`${product.name} stock quantity`} className={`${inputClass} min-w-16 text-sm`} type="number" min="0" step="1" placeholder="Not set" value={stock} onChange={event => setStock(event.target.value)} /></td>
      <td className="px-3 py-3">
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => onSave({ ...product, active: !(product.active ?? true), name: product.name, category: product.category, price: product.price, wholesalePrice: product.wholesalePrice, unit: product.unit, stock: product.stock, accent: product.accent, showRetailPrice: product.showRetailPrice ?? true })} className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[10px] font-bold ${product.active ?? true ? 'border-green-200 bg-green-50 text-green-900' : 'border-red-200 bg-red-50 text-red-900'}`}>
            <span className={`h-2 w-2 rounded-full ${product.active ?? true ? 'bg-green-500' : 'bg-red-500'}`} />
            {product.active ?? true ? 'Visible' : 'Hidden'}
          </button>
          <button type="button" onClick={() => onSave({ ...product, showRetailPrice: !(product.showRetailPrice ?? true), active: product.active ?? true, name: product.name, category: product.category, price: product.price, wholesalePrice: product.wholesalePrice, wholesaleMinimum: product.wholesaleMinimum ?? 15, unit: product.unit, stock: product.stock, accent: product.accent })} className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[10px] font-bold ${priceDisplayOn ? 'border-blue-200 bg-blue-50 text-blue-900' : 'border-slate-200 bg-slate-100 text-slate-700'}`}>
            <span className={`h-2 w-2 rounded-full ${priceDisplayOn ? 'bg-blue-500' : 'bg-slate-400'}`} />
            {priceDisplayOn ? 'Price: On' : 'Price: Off'}
          </button>
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <button form={`product-${product.id}`} type="submit" className="inline-flex items-center gap-1 rounded bg-steel px-3 py-2 text-[11px] font-bold text-white hover:bg-accent"><Check size={13} /> Save</button>
          <button type="button" onClick={() => onDelete(product.id)} aria-label={`Delete ${product.name}`} className="rounded border border-border p-2 text-muted-foreground hover:border-red-300 hover:text-red-600"><Trash2 size={14} /></button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminPage() {
  const { products, updateProduct, addProduct, removeProduct } = useCart()
  const [signedIn, setSignedIn] = useState(false)
  const [ready, setReady] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<StockFilter>('All products')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    setSignedIn(window.sessionStorage.getItem(demoSessionKey) === 'true')
    setReady(true)
  }, [])

  const [categoryTypes, setCategoryTypes] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    const savedCategories = window.localStorage.getItem(categoryStorageKey)
    const parsed = savedCategories ? JSON.parse(savedCategories) as string[] : []
    const merged = normalizeCategoryList([
      ...defaultCategoryTypes,
      ...products.map(product => product.category),
      ...parsed,
    ])
    setCategoryTypes(merged)
  }, [products])

  useEffect(() => {
    window.localStorage.setItem(categoryStorageKey, JSON.stringify(categoryTypes))
  }, [categoryTypes])

  const trackedUnits = products.reduce((sum, product) => sum + (product.stock ?? 0), 0)
  const lowStockCount = products.filter(product => product.stock !== null && product.stock > 0 && product.stock <= 5).length
  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All products'
      || (filter === 'In stock' && product.stock !== null && product.stock > 0)
      || (filter === 'Low stock' && product.stock !== null && product.stock > 0 && product.stock <= 5)
      || (filter === 'Out of stock' && product.stock === 0)
      || (filter === 'Not tracked' && product.stock === null)
    return matchesSearch && matchesFilter
  }), [filter, products, search])

  const renameCategory = (current: string, nextValue: string) => {
    const safeValue = normalizeCategoryValue(nextValue)
    if (!safeValue || safeValue === current) return
    setCategoryTypes(previous => normalizeCategoryList(previous.map(value => value === current ? safeValue : value)))
    products.forEach(product => {
      if (product.category === current) {
        updateProduct(product.id, { ...product, category: safeValue, accent: safeValue })
      }
    })
    setNotice(`Category updated from ${current} to ${safeValue}.`)
  }

  const addCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = newCategory.trim()
    if (!trimmed) return
    setCategoryTypes(previous => normalizeCategoryList([...previous, trimmed]))
    setNewCategory('')
    setNotice(`${trimmed} added to category types.`)
  }

  const setAllRetailPriceDisplay = (show: boolean) => {
    products.forEach(product => updateProduct(product.id, { ...product, showRetailPrice: show }))
    setNotice(show ? 'All product retail prices are now visible.' : 'All product retail prices are now hidden.')
  }

  const setAllProductVisibility = (visible: boolean) => {
    products.forEach(product => updateProduct(product.id, { ...product, active: visible }))
    setNotice(visible ? 'All products are now visible on the website.' : 'All products are now hidden from the website.')
  }

  const deleteAllProducts = () => {
    products.forEach(product => removeProduct(product.id))
    setNotice('All catalogue products were removed. Add new products to rebuild the list.')
  }

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.sessionStorage.setItem(demoSessionKey, 'true')
    setSignedIn(true)
  }

  const addNewProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const name = String(form.get('name') ?? '').trim()
    const category = normalizeCategoryValue(String(form.get('category') ?? ''))
    const unit = String(form.get('unit') ?? '').trim() || 'per item'
    const price = Number(form.get('price'))
    const rawWholesalePrice = String(form.get('wholesalePrice') ?? '').trim()
    const wholesalePrice = rawWholesalePrice === '' ? null : Number(rawWholesalePrice)
    const rawWholesaleMinimum = String(form.get('wholesaleMinimum') ?? '').trim()
    const wholesaleMinimum = rawWholesaleMinimum === '' ? 15 : Number(rawWholesaleMinimum)
    const rawStock = String(form.get('stock') ?? '').trim()
    const stock = rawStock === '' ? null : Number(rawStock)
    const imageFile = form.get('image')
    if (!name) return
    if (!Number.isFinite(wholesaleMinimum) || wholesaleMinimum < 1) return
    if (wholesalePrice !== null && (!Number.isFinite(wholesalePrice) || wholesalePrice <= 0)) return
    if (stock !== null && (!Number.isInteger(stock) || stock < 0)) return

    try {
      const image = imageFile instanceof File && imageFile.size > 0 ? await readProductImage(imageFile) : undefined
      const nextProduct: Product = {
        id: `product-${crypto.randomUUID()}`,
        name,
        category,
        price: Number.isFinite(price) && price >= 0 ? price : 0,
        wholesalePrice,
        wholesaleMinimum: Math.round(wholesaleMinimum),
        unit,
        stock,
        accent: category,
        image,
        active: true,
        showRetailPrice: true,
      }
      addProduct(nextProduct)
      setCategoryTypes(previous => normalizeCategoryList([...previous, category]))
      formElement.reset()
      setNotice(`${name} added to the catalogue${image ? ' with its image' : ''}. You can update the remaining details from the table below.`)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The product image could not be processed.')
    }
  }

  const signOut = () => {
    window.sessionStorage.removeItem(demoSessionKey)
    setSignedIn(false)
  }

  if (!ready) return <main className="min-h-screen bg-muted" aria-busy="true" />

  if (!signedIn) {
    return (
      <main className="grid min-h-screen place-items-center bg-muted px-5 py-12">
        <section className="w-full max-w-md bg-white p-7 shadow-lg sm:p-10">
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-steel"><ArrowLeft size={16} /> Back to website</a>
          <p className="eyebrow">Muhoro Steel Hardware</p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase text-steel">Admin sign in</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Enter any email and password to preview the dashboard. This prototype does not verify credentials.</p>
          <div className="mt-6 flex gap-3 border border-amber-300 bg-amber-50 p-4 text-sm leading-5 text-amber-950">
            <ShieldAlert className="mt-0.5 shrink-0" size={18} />
            <p><strong>Demo only.</strong> This sign-in is not authentication. Do not use it to protect a live admin dashboard.</p>
          </div>
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <label className="block text-sm font-bold text-steel">Email
              <input type="email" autoComplete="username" required className="mt-1 w-full border border-border px-3 py-3 font-normal" />
            </label>
            <label className="block text-sm font-bold text-steel">Password
              <input type="password" autoComplete="current-password" required className="mt-1 w-full border border-border px-3 py-3 font-normal" />
            </label>
            <button type="submit" className="w-full bg-steel px-5 py-3 font-bold text-white hover:bg-accent">Open demo dashboard</button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-muted">
      <header className="bg-steel text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <img src="/sh log.jpeg" alt="Muhoro Steel Hardware" className="h-12 w-auto object-contain" />
            <span className="font-display text-lg font-bold">MUHORO <span className="text-accent">ADMIN</span></span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="hidden items-center gap-2 text-sm font-bold text-white/80 hover:text-white sm:flex"><ArrowLeft size={16} /> View website</a>
            <button onClick={signOut} className="flex items-center gap-2 border border-white/25 px-3 py-2 text-sm font-bold hover:border-accent"><LogOut size={16} /> Sign out</button>
          </div>
        </div>
      </header>
      <div className="border-b border-amber-300 bg-amber-50 px-5 py-3 text-sm text-amber-950">
        <div className="mx-auto flex max-w-7xl items-start gap-2"><ShieldAlert className="mt-0.5 shrink-0" size={17} /><p><strong>Frontend demo:</strong> changes are saved in this browser only. Sign-in is simulated. Connect a real authentication service and shared database before deployment.</p></div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-7 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-steel text-white shadow-sm"><LayoutDashboard size={20} /></div>
          <div><p className="eyebrow">Administration</p><h1 className="font-display text-4xl font-bold uppercase text-steel">Resource management</h1><p className="mt-1 text-sm text-muted-foreground">Manage product pricing and stock availability.</p></div>
        </div>

        <section aria-label="Inventory summary" className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Catalogue products" value={products.length.toLocaleString()} detail="Products listed on the website" icon={<Boxes size={18} />} />
          <SummaryCard label="Tracked stock" value={trackedUnits.toLocaleString()} detail="Units across products with stock entered" icon={<PackagePlus size={18} />} />
          <SummaryCard label="Low stock" value={lowStockCount.toLocaleString()} detail="Products with 1-5 units remaining" icon={<CircleAlert size={18} />} />
          <SummaryCard label="Stock not tracked" value={products.filter(product => product.stock === null).length.toLocaleString()} detail="Enter quantities to show availability" icon={<ShieldAlert size={18} />} />
        </section>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Categories</p>
              <h2 className="font-display text-3xl font-bold uppercase text-steel">Category types</h2>
            </div>
            <form onSubmit={addCategory} className="flex w-full max-w-md gap-2">
              <input value={newCategory} onChange={event => setNewCategory(event.target.value)} placeholder="Add category type" aria-label="Add new category type" className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <button type="submit" className="rounded-lg bg-steel px-4 py-2 text-sm font-bold text-white hover:bg-accent">Add</button>
            </form>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categoryTypes.map(category => (
              <label key={category} className="flex items-center gap-2 rounded-full border border-border bg-slate-50 px-3 py-2 text-sm text-steel shadow-sm">
                <span className="font-semibold">{category}</span>
                <input
                  value={category}
                  onChange={event => renameCategory(category, event.target.value)}
                  aria-label={`Edit category ${category}`}
                  className="rounded border border-border bg-white px-2 py-1 text-sm"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <div className="mb-4">
            <p className="eyebrow">Global controls</p>
            <h2 className="font-display text-3xl font-bold uppercase text-steel">Bulk product actions</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setAllRetailPriceDisplay(true)} className="rounded-lg bg-steel px-4 py-2 text-sm font-bold text-white hover:bg-accent">Show all retail prices</button>
            <button type="button" onClick={() => setAllRetailPriceDisplay(false)} className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-bold text-steel hover:bg-border">Hide all retail prices</button>
            <button type="button" onClick={() => setAllProductVisibility(true)} className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-bold text-green-900 hover:bg-green-100">Mark all products visible</button>
            <button type="button" onClick={() => setAllProductVisibility(false)} className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-bold text-red-900 hover:bg-red-100">Hide all products</button>
            <button type="button" onClick={deleteAllProducts} className="rounded-lg border border-red-300 bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">Delete all products</button>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow">Inventory</p><h2 className="font-display text-3xl font-bold uppercase text-steel">Products & stock</h2></div>
            <label className="relative block w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} />
              <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products" className="w-full rounded-lg border border-border py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-accent" />
            </label>
          </div>

          <div className="my-4 flex gap-2 overflow-x-auto">
            {(['All products', 'In stock', 'Low stock', 'Out of stock', 'Not tracked'] as StockFilter[]).map(option => (
              <button key={option} onClick={() => setFilter(option)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold ${filter === option ? 'bg-steel text-white' : 'bg-muted text-steel hover:bg-border'}`}>{option}</button>
            ))}
          </div>

          {notice && <p role="status" className="mb-4 border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-900">{notice}</p>}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1160px] border-collapse text-left">
              <thead><tr className="bg-slate-50 text-[11px] uppercase tracking-wide text-muted-foreground"><th className="px-3 py-3">Image</th><th className="px-3 py-3">Product</th><th className="px-3 py-3">Category</th><th className="px-3 py-3">Retail price</th><th className="px-3 py-3">Wholesale price</th><th className="px-3 py-3">Wholesale min</th><th className="px-3 py-3">Sold as</th><th className="px-3 py-3">Available units</th><th className="px-3 py-3">View</th><th className="px-3 py-3">Actions</th></tr></thead>
              <tbody>
                {filteredProducts.map(product => <InventoryRow key={product.id} product={product} onSave={updated => { updateProduct(product.id, updated); setNotice(`${updated.name} updated.`) }} onImageError={setNotice} onDelete={id => { removeProduct(id); setNotice(`${product.name} removed from the catalogue.`) }} />)}
                {filteredProducts.length === 0 && <tr><td colSpan={10} className="px-3 py-10 text-center text-sm text-muted-foreground">No products match this filter.</td></tr>}
              </tbody>
            </table>
          </div>

          <details className="mt-6 border-t border-border pt-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-bold text-accent"><PackagePlus size={18} /> Add a product</summary>
            <form onSubmit={addNewProduct} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <input name="name" required placeholder="Product name" aria-label="New product name" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <input name="category" list="admin-category-options" placeholder="Category" aria-label="New product category" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <input name="price" type="number" min="0" step="0.01" placeholder="Price (KES)" aria-label="New product price in KES" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <input name="wholesalePrice" type="number" min="0" step="0.01" placeholder="Wholesale price" aria-label="New product wholesale price in KES" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <input name="wholesaleMinimum" type="number" min="1" step="1" defaultValue={15} placeholder="Wholesale min" aria-label="New product wholesale minimum quantity" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <input name="unit" placeholder="Unit" aria-label="New product unit" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent" />
              <input name="stock" type="number" min="0" step="1" placeholder="Stock quantity" aria-label="New product stock quantity" className="rounded-lg border border-border px-3 py-2 text-sm outline-none transition focus:border-accent sm:col-span-2 lg:col-span-2" />
              <datalist id="admin-category-options">
                {categoryTypes.map(category => <option key={category} value={category} />)}
              </datalist>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-steel sm:col-span-2 lg:col-span-4">
                <ImagePlus size={17} /> Choose product image (JPEG, PNG, or WebP)
                <input name="image" type="file" accept="image/jpeg,image/png,image/webp" aria-label="New product image" className="min-w-0 flex-1 text-xs" />
              </label>
              <button type="submit" className="rounded-lg bg-steel px-4 py-2 text-sm font-bold text-white hover:bg-accent lg:col-span-6">Add product to website</button>
            </form>
          </details>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Uploaded product images are resized and saved in this browser. They update the shop cards, product detail pages, and cart. This demo dashboard does not publish uploads to a shared server or the public folder.</p>
        </section>
        <p className="mt-5 text-xs leading-5 text-muted-foreground">A blank stock quantity means stock has not been entered. A quantity of zero marks a product out of stock and prevents it from being added to the cart.</p>
      </div>
    </main>
  )
}

function SummaryCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) {
  return <article className="bg-white p-5 shadow-sm"><div className="flex items-center justify-between text-muted-foreground"><p className="text-sm font-semibold">{label}</p>{icon}</div><p className="mt-3 font-display text-4xl font-bold text-steel">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></article>
}
