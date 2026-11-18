import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, DM_Sans, Pixelify_Sans, Shrikhand } from 'next/font/google'
import { RetroAppShell } from '@/components/retro/retro-app-shell'
import { brand } from '@/lib/data/brand'
import './globals.css'

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const pixelify = Pixelify_Sans({ subsets: ['latin'], variable: '--font-pixelify', display: 'swap' })
const shrikhand = Shrikhand({ subsets: ['latin'], weight: '400', variable: '--font-shrikhand', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: `${brand.name} (${brand.abbreviation}) — ${brand.tagline}`,
    template: `%s — ${brand.abbreviation}`,
  },
  description: brand.description,
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#E9A3BA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={`${anton.variable} ${dmSans.variable} ${pixelify.variable} ${shrikhand.variable} bg-pink`}
    >
      <body className="antialiased">
        <RetroAppShell>{children}</RetroAppShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
