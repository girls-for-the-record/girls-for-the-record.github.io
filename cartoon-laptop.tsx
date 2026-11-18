'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CartoonLaptopProps = {
  href: string
  title: string
  description: string
  casing: 'pink' | 'burgundy'
  screen: ReactNode
  tilt?: 'left' | 'right'
}

const casingStyles = {
  pink: {
    lid: 'bg-bubblegum',
    base: 'bg-pink',
    key: 'bg-cream',
    trim: 'bg-burgundy',
  },
  burgundy: {
    lid: 'bg-burgundy',
    base: 'bg-burgundy-soft',
    key: 'bg-pink-pale',
    trim: 'bg-bubblegum',
  },
} as const

const KEY_COUNT = 33

export function CartoonLaptop({ href, title, description, casing, screen, tilt = 'left' }: CartoonLaptopProps) {
  const router = useRouter()
  const [booting, setBooting] = useState(false)
  const styles = casingStyles[casing]

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    if (booting) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      router.push(href)
      return
    }
    setBooting(true)
    window.setTimeout(() => router.push(href), 420)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label={`${title} — ${description}`}
      className="group relative block cursor-pointer rounded-sm outline-offset-8"
    >
      <div
        className={cn(
          'relative mx-auto w-full max-w-md transition-transform duration-300 ease-out group-hover:-translate-y-2 group-focus-visible:-translate-y-2 group-active:translate-y-0',
          tilt === 'left'
            ? 'group-hover:-rotate-2 group-focus-visible:-rotate-2'
            : 'group-hover:rotate-2 group-focus-visible:rotate-2',
        )}
      >
        {/* lid */}
        <div className={cn('relative rounded-[28px] border-4 border-ink p-3 pb-5 sm:p-4 sm:pb-6 hard-shadow-ink', styles.lid)}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-2 h-3 w-1/3 rounded-full bg-white/45"
          />
          <span aria-hidden="true" className="absolute left-1/2 top-1.5 size-2 -translate-x-1/2 rounded-full border-2 border-ink bg-cream" />

          <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-[14px] border-4 border-ink bg-cream transition-[filter] duration-300 group-hover:brightness-110 group-focus-visible:brightness-110">
            <div className={cn('h-full transition-opacity duration-150', booting && 'opacity-0')}>{screen}</div>

            {booting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-burgundy font-pixel text-cream">
                <span className="text-sm">opening {title.toLowerCase()}...</span>
                <span className="h-3 w-2/3 border-2 border-cream p-px">
                  <span className="animate-boot block h-full bg-bubblegum" />
                </span>
              </div>
            )}

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(33_20_28/0.05)_0_1px,transparent_1px_3px)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-32 rotate-12 bg-white/25"
            />
          </div>

          <div aria-hidden="true" className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-butter ring-1 ring-ink" />
            <span className="size-1.5 rounded-full bg-cherry ring-1 ring-ink" />
            <span className="font-pixel text-[9px] leading-none text-cream">GFTR</span>
          </div>
        </div>

        {/* hinge */}
        <div aria-hidden="true" className={cn('mx-10 h-2.5 border-x-4 border-ink', styles.trim)} />

        {/* base */}
        <div
          aria-hidden="true"
          className={cn(
            '-mx-3 rounded-b-[26px] rounded-t-lg border-4 border-ink px-5 pb-3 pt-3 [box-shadow:inset_0_4px_0_rgb(255_255_255/0.35),5px_5px_0_var(--gftr-ink)] sm:-mx-5 sm:px-8',
            styles.base,
          )}
        >
          <div className="grid grid-cols-11 gap-1">
            {Array.from({ length: KEY_COUNT }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-2 rounded-[3px] border-[1.5px] border-ink shadow-[0_2px_0_var(--gftr-ink)] sm:h-2.5',
                  i === 5 || i === 17 ? 'bg-butter' : styles.key,
                )}
              />
            ))}
            <span className="col-span-2 h-2 rounded-[3px] border-[1.5px] border-ink bg-cherry shadow-[0_2px_0_var(--gftr-ink)] sm:h-2.5" />
            <span className={cn('col-span-7 h-2 rounded-[3px] border-[1.5px] border-ink shadow-[0_2px_0_var(--gftr-ink)] sm:h-2.5', styles.key)} />
            <span className="col-span-2 h-2 rounded-[3px] border-[1.5px] border-ink bg-bubblegum shadow-[0_2px_0_var(--gftr-ink)] sm:h-2.5" />
          </div>
          <div className="mx-auto mt-2.5 h-5 w-1/3 rounded-md border-2 border-ink bg-white/40" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 font-pixel text-sm text-burgundy">
        <span className="bevel-out border-2 border-burgundy bg-cream px-3 py-1 transition-colors group-hover:bg-butter group-focus-visible:bg-butter">
          click to open <span aria-hidden="true">▸</span>
        </span>
      </div>
    </Link>
  )
}
