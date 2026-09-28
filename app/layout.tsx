import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { CartDrawer } from '@/components/cart-drawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const barlow = Barlow_Condensed({ subsets: ['latin'], variable: '--font-barlow', weight: ['600', '700', '800'] })
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-plex' })

export const metadata: Metadata = { title: 'Muhoro Steel Hardware | Quality Steel. Reliable Hardware.', description: 'Structural steel, cement, fabrication materials, and hardware supplies in Juja and Kiambu County, Kenya.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#032E54', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${barlow.variable} ${plex.variable} antialiased`}><CartProvider>{children}<CartDrawer /></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
