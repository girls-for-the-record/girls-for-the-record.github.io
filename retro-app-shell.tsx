'use client'

import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { RetroTitleBar } from '@/components/retro/retro-title-bar'
import { RetroMenu } from '@/components/retro/retro-menu'
import { SocialFooter } from '@/components/home/social-footer'
import { cn } from '@/lib/utils'

export function RetroAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [infoOpen, setInfoOpen] = useState(true)
  const [maximised, setMaximised] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const location = `gftr://fieldnotes${pathname === '/' ? '/home' : pathname}`

  return (
    <MotionConfig reducedMotion="user">
      <div className="desktop-bg min-h-dvh px-0 py-0 sm:px-4 sm:py-6 lg:px-8">
        <a
          href="#main"
          className="sr-only z-50 bg-butter px-3 py-2 font-pixel text-ink focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
        >
          skip to content
        </a>
        <div
          className={cn(
            'mx-auto flex min-h-dvh flex-col border-burgundy bg-pink-pale sm:min-h-0 sm:border-[3px] sm:[box-shadow:8px_8px_0_var(--gftr-burgundy)]',
            maximised ? 'max-w-none' : 'max-w-6xl',
          )}
        >
          <header className="sticky top-0 z-40 sm:static">
            <RetroTitleBar
              infoOpen={infoOpen}
              maximised={maximised}
              onToggleInfo={() => setInfoOpen((v) => !v)}
              onToggleMaximise={() => setMaximised((v) => !v)}
              onClose={() => {
                setStatusMessage('you can’t close the record ♡ it’s permanent.')
                window.setTimeout(() => setStatusMessage(null), 2600)
              }}
            />
            <RetroMenu />
          </header>

          {infoOpen && (
            <div
              id="gftr-info-strip"
              className="flex flex-wrap items-center gap-2 border-b-2 border-burgundy bg-cream px-3 py-1.5 font-pixel text-xs text-burgundy sm:text-sm"
            >
              <span className="bevel-in border border-burgundy/40 bg-pink-mist px-2 py-0.5">address</span>
              <span className="bevel-in min-w-0 flex-1 truncate border border-burgundy/40 bg-white px-2 py-0.5 text-ink">
                {location}
              </span>
              <span className="hidden md:inline">est. 2026 · girl-led · independent</span>
            </div>
          )}

          <main id="main" className="flex-1 px-3 py-6 sm:px-6 sm:py-8 lg:px-10">
            {children}
          </main>

          <SocialFooter />

          <div
            aria-live="polite"
            className="flex items-center justify-between gap-3 border-t-2 border-burgundy bg-pink px-3 py-1 font-pixel text-xs text-burgundy"
          >
            <span>{statusMessage ?? 'ready ♡'}</span>
            <span aria-hidden="true" className="hidden sm:inline">
              {pathname === '/' ? 'home' : pathname.split('/').filter(Boolean).join(' › ')}
            </span>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
