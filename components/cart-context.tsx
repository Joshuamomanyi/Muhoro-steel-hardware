'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Product = { id: string; name: string; category: string; price: number; unit: string; accent: string }
type CartLine = Product & { quantity: number }
type CartContextValue = { items: CartLine[]; addItem: (product: Product) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void; count: number; total: number }
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  useEffect(() => { const saved = window.localStorage.getItem('muhoro-cart'); if (saved) setItems(JSON.parse(saved)) }, [])
  useEffect(() => { window.localStorage.setItem('muhoro-cart', JSON.stringify(items)) }, [items])
  const value = useMemo(() => ({ items, addItem: (product: Product) => setItems(current => { const found = current.find(item => item.id === product.id); return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }] }), updateQuantity: (id: string, quantity: number) => setItems(current => quantity > 0 ? current.map(item => item.id === id ? { ...item, quantity } : item) : current.filter(item => item.id !== id)), removeItem: (id: string) => setItems(current => current.filter(item => item.id !== id)), count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.quantity * item.price, 0) }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used inside CartProvider'); return context }

export const catalog: Product[] = [
  { id: 'rebars', name: 'High-strength rebars', category: 'Steel & fabrication', price: 850, unit: 'per bar', accent: 'Reinforcement' },
  { id: 'hollow', name: 'Square hollow sections', category: 'Steel & fabrication', price: 2400, unit: 'per length', accent: 'Fabrication' },
  { id: 'cement', name: 'Cement 50kg', category: 'Masonry & construction', price: 780, unit: 'per bag', accent: 'Building essential' },
  { id: 'binding', name: 'Binding wire', category: 'Masonry & construction', price: 420, unit: 'per roll', accent: 'Site essential' },
  { id: 'roofing', name: 'Roofing nails', category: 'Roofing', price: 320, unit: 'per box', accent: 'Roofing' },
  { id: 'pvc', name: 'PVC conduit pipe', category: 'Plumbing & electrical', price: 260, unit: 'per length', accent: 'Electrical' },
  { id: 'tools', name: 'General hand tools', category: 'Tools & hardware', price: 650, unit: 'from', accent: 'Workshop' },
  { id: 'fasteners', name: 'Fasteners & bolts', category: 'Tools & hardware', price: 180, unit: 'from', accent: 'Hardware' },
]
export const categories = ['All products', ...Array.from(new Set(catalog.map(product => product.category)))]
