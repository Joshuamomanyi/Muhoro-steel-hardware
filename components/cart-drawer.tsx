'use client'

import { jsPDF } from 'jspdf'
import { Download, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUnitPrice, getWholesaleMinimum, useCart, WHOLESALE_MINIMUM_QUANTITY } from './cart-context'
import { ProductImage } from './product-image'

const money = (amount: number) => `KES ${amount.toLocaleString('en-KE')}`

export function CartButton() {
  const { count } = useCart()

  return (
    <a
      href="#cart"
      onClick={event => {
        event.preventDefault()
        window.dispatchEvent(new Event('muhoro:open-cart'))
      }}
      className="relative grid h-10 w-10 place-items-center border border-white/20 text-white hover:border-accent"
      aria-label={`Cart with ${count} items`}
    >
      <ShoppingCart size={18} />
      {count > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">{count}</span>}
    </a>
  )
}

export function CartDrawer() {
  const { items, total, updateQuantity, updateQuality, removeItem } = useCart()
  const [open, setOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const hasUnpricedWholesaleItems = items.some(item => item.orderMode === 'wholesale' && item.wholesalePrice === null)
  const linePrice = (item: (typeof items)[number]) => getUnitPrice(item, item.quantity)

  useEffect(() => {
    const openCart = () => setOpen(true)
    window.addEventListener('muhoro:open-cart', openCart)
    return () => window.removeEventListener('muhoro:open-cart', openCart)
  }, [])

  const downloadQuote = () => {
    const pdf = new jsPDF()
    const quoteNumber = `MSH-${Date.now().toString().slice(-8)}`
    let y = 20

    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('MUHORO STEEL HARDWARE', 14, y)
    y += 9
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    pdf.text('QUOTATION', 14, y)
    pdf.text(`Quote: ${quoteNumber}`, 196, y, { align: 'right' })
    y += 7
    pdf.text(`Date: ${new Date().toLocaleDateString('en-KE')}`, 14, y)
    y += 7
    pdf.text(`Customer: ${customerName.trim()}`, 14, y)
    y += 7
    pdf.text(`Phone: ${customerPhone.trim()}`, 14, y)
    y += 12

    const addPageIfNeeded = (height: number) => {
      if (y + height > 280) {
        pdf.addPage()
        y = 20
      }
    }

    for (const item of items) {
      const description = pdf.splitTextToSize(`${item.name} — ${item.orderMode} (${item.quality.trim() || 'As listed'})`, 95)
      addPageIfNeeded(Math.max(20, description.length * 5) + 5)
      pdf.setFont('helvetica', 'bold')
      pdf.text(description, 14, y)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`${item.quantity} x ${money(linePrice(item))}`, 115, y)
      pdf.text(money(item.quantity * linePrice(item)), 196, y, { align: 'right' })
      y += Math.max(10, description.length * 5 + 3)
    }

    addPageIfNeeded(32)
    pdf.line(14, y, 196, y)
    y += 9
    pdf.setFont('helvetica', 'bold')
    pdf.text('Estimated total', 14, y)
    pdf.text(money(total), 196, y, { align: 'right' })
    y += 9
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    const pricingNote = hasUnpricedWholesaleItems
      ? 'Some wholesale prices are not set. Those lines use retail prices as estimates. Confirm final pricing and availability with Muhoro Steel Hardware.'
      : 'Product quality/specifications, availability, and final pricing must be confirmed with Muhoro Steel Hardware.'
    const note = pdf.splitTextToSize(pricingNote, 180)
    pdf.text(note, 14, y)
    y += note.length * 4 + 6
    pdf.text('Contact: +254 721 270 670', 14, y)
    pdf.save(`${quoteNumber.toLowerCase()}-quotation.pdf`)
  }

  const whatsappMessage = [
    `Hi Muhoro, I would like to order:`,
    ...items.map(item => `${item.quantity}x ${item.name} — ${item.orderMode} — ${item.quality.trim() || 'As listed'} (${money(linePrice(item))} each${item.wholesalePrice !== null && item.quantity >= getWholesaleMinimum(item) ? ', wholesale price applied' : ''}${item.orderMode === 'wholesale' && item.wholesalePrice === null ? ', estimated wholesale price' : ''})`),
    `Estimated total: ${money(total)}`,
    customerName.trim() ? `Name: ${customerName.trim()}` : '',
    customerPhone.trim() ? `Phone: ${customerPhone.trim()}` : '',
    'Please confirm availability, quality specifications, and final pricing.',
  ].filter(Boolean).join('\n')

  return (
    <>
      <button onClick={() => setOpen(true)} className="sr-only" aria-hidden="true">Open cart</button>
      <div id="cart" className={`fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button className={`absolute inset-0 bg-charcoal/60 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} aria-label="Close cart" />
        <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <div><p className="eyebrow">Your order</p><h2 className="font-display text-2xl font-bold uppercase text-steel">Cart</h2></div>
            <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2 text-steel"><X /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingCart className="mx-auto text-muted-foreground" size={36} />
                <p className="mt-4 font-bold text-steel">Your cart is empty</p>
                <a href="/products" onClick={() => setOpen(false)} className="mt-4 inline-block text-sm font-bold text-accent">Browse products</a>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={`${item.id}-${item.orderMode}`} className="border-b border-border pb-4">
                    <div className="flex justify-between gap-3">
                      <div className="flex gap-3">
                        <a href={`/shop/${item.id}`} onClick={() => setOpen(false)} className="relative h-16 w-16 shrink-0 overflow-hidden bg-muted">
                          <ProductImage src={item.image} alt={item.name} className="object-contain p-1" />
                        </a>
                        <div><a href={`/shop/${item.id}`} onClick={() => setOpen(false)} className="font-bold text-steel hover:text-accent">{item.name}</a><p className="text-xs capitalize text-muted-foreground">{item.orderMode} · {money(linePrice(item))} / {item.unit}{item.wholesalePrice !== null && item.quantity >= getWholesaleMinimum(item) ? ' · wholesale price' : ''}{item.orderMode === 'wholesale' && item.wholesalePrice === null ? ' · estimated' : ''}</p></div>
                      </div>
                      <button onClick={() => removeItem(item.id, item.orderMode)} aria-label={`Remove ${item.name} ${item.orderMode} order`} className="text-muted-foreground hover:text-accent"><Trash2 size={16} /></button>
                    </div>
                    <label className="mt-3 block text-xs font-bold text-steel" htmlFor={`quality-${item.id}-${item.orderMode}`}>Quality / specification</label>
                    <input
                      id={`quality-${item.id}-${item.orderMode}`}
                      value={item.quality}
                      onChange={event => updateQuality(item.id, event.target.value, item.orderMode)}
                      placeholder="e.g. grade, thickness, or brand"
                      className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                    />
                    <div className="mt-3 flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.orderMode)} aria-label={`Decrease ${item.name} quantity`} className="grid h-8 w-8 place-items-center border border-border"><Minus size={14} /></button>
                      <span className="w-5 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.orderMode)} aria-label={`Increase ${item.name} quantity`} className="grid h-8 w-8 place-items-center border border-border"><Plus size={14} /></button>
                      <span className="ml-auto font-bold text-steel">{money(linePrice(item) * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t border-border p-5">
              <div className="flex justify-between text-lg font-bold text-steel"><span>Estimated total</span><span>{money(total)}</span></div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold text-steel">Name
                  <input value={customerName} onChange={event => setCustomerName(event.target.value)} autoComplete="name" className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-normal" />
                </label>
                <label className="text-xs font-bold text-steel">Phone
                  <input value={customerPhone} onChange={event => setCustomerPhone(event.target.value)} type="tel" autoComplete="tel" className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm font-normal" />
                </label>
              </div>
              <button onClick={downloadQuote} disabled={!customerName.trim() || !customerPhone.trim()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-steel px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
                <Download size={18} /> Download quote PDF
              </button>
              <a href={`https://wa.me/254721270670?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer" className="mt-3 flex justify-center rounded-full bg-whatsapp px-5 py-3 font-bold text-white">Order via WhatsApp</a>
              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">{hasUnpricedWholesaleItems ? `Unpriced wholesale lines use listed prices as estimates; minimum ${WHOLESALE_MINIMUM_QUANTITY} units per product. ` : ''}Pricing automatically applies at each product&apos;s minimum order quantity. Price, quality specifications, availability, and delivery are confirmed by our team.</p>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
