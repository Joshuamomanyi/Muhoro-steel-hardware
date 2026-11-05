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
  title: 'Best Hardware in Juja & Thika Road | Muhoro Steel Hardware',
  description: 'Best hardware in Juja and Thika Road, Kiambu County. Shop steel, roofing sheets, cement, pipes, hardware, and building materials from Muhoro Steel Hardware.',
  keywords: [
    'best hardware in Juja',
    'best hardware in Thika Road',
    'best hardwares in Juja',
    'hardware store Juja',
    'steel hardware Juja',
    'building materials Juja',
    'roofing sheets Juja',
    'steel suppliers Kiambu County',
    'hardware Kenya',
    'best hardware in Kenya',
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
    title: 'Best Hardware in Juja & Thika Road | Muhoro Steel Hardware',
    description: 'Your local source for steel, roofing, cement, pipes, and hardware in Juja and along Thika Road.',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Hardware in Juja & Thika Road | Muhoro Steel Hardware',
    description: 'Steel, roofing, cement, pipes, and hardware supplies in Juja and Kiambu County.',
  },
  generator: 'v0.app',
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#032E54', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${barlow.variable} ${plex.variable} antialiased`}><CartProvider>{children}<CartDrawer /></CartProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
