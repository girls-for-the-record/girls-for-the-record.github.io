'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/data/brand'
import { cn } from '@/lib/utils'

export function RetroMenu() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="border-b-2 border-burgundy bg-pink">
      <ul className="grid grid-cols-2 gap-1 p-1 sm:flex sm:flex-wrap sm:items-center">
        {navItems.map((item) => {
          const active =
            item.href === '/' ? pathname === '/' : !item.href.includes('#') && pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-10 items-center justify-center border-2 px-3 font-pixel text-base lowercase text-burgundy transition-colors duration-100 sm:min-h-8 sm:justify-start sm:py-0.5',
                  active
                    ? 'bevel-in border-burgundy bg-cream'
                    : 'border-transparent hover:border-burgundy hover:bg-pink-pale active:bg-cream',
                )}
              >
                <span className="underline decoration-2 underline-offset-2">{item.label.charAt(0)}</span>
                {item.label.slice(1)}
              </Link>
            </li>
          )
        })}
        <li className="col-span-2 hidden items-center justify-end pr-2 font-pixel text-xs text-burgundy/80 sm:ml-auto sm:flex">
          <span aria-hidden="true">♡ ♡ ♡</span>
        </li>
      </ul>
    </nav>
  )
}
