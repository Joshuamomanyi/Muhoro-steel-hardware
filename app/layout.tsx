import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { CartDrawer } from '@/components/cart-drawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const barlow = Barlow_Condensed({ subsets: ['latin'], variable: '--font-barlow', weight: ['600', '700', '800'] })
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-plex' })

export const metadata: Metadata = {
  title: 'Juja Hardware, Steel Dealer and Building Materials in Kiambu | Muhoro Steel Hardware',
  description: 'Muhoro Steel Hardware is a trusted Juja hardware store and steel dealer serving Juja, Kiambu County, Nairobi, Mount Kenya, and Kenya with affordable prices on roofing sheets, steel, pipes, cement, and building materials.',
  keywords: [
    'Juja hardware',
    'steel dealer Juja',
    'affordable prices in Juja',
    'affordable prices hardware in Thika Road',
    'hardware store Juja',
    'best hardware in Juja',
    'best hardware in Thika Road',
    'steel supplier Kiambu County',
    'hardware store Nairobi',
    'building materials Juja',
    'roofing sheets Juja',
    'steel supplier Kenya',
    'affordable building materials Kenya',
    'Mount Kenya hardware supplier',
    'Muhoro Steel Hardware',
  ],
  icons: {
    icon: [
      { url: '/favicon%20list/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon%20list/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon%20list/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/favicon%20list/apple-touch-icon.png',
    shortcut: '/favicon%20list/favicon.ico',
    other: [{ rel: 'manifest', url: '/favicon%20list/site.webmanifest' }],
  },
  openGraph: {
    title: 'Juja Hardware, Steel Dealer and Building Materials | Muhoro Steel Hardware',
    description: 'Affordable Juja hardware and steel supplies for homes, contractors, and developers across Juja, Kiambu, Nairobi, Mount Kenya, and Kenya.',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juja Hardware, Steel Dealer and Building Materials | Muhoro Steel Hardware',
    description: 'Affordable roofing sheets, steel, cement, pipes, and hardware in Juja, Kiambu County, and Nairobi.',
  },
  generator: 'v0.app',
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#032E54', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${barlow.variable} ${plex.variable} antialiased`}><CartProvider>{children}<CartDrawer /></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
