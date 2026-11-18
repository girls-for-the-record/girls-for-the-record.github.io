import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  pink: 'bg-pink text-burgundy hover:bg-bubblegum hover:text-ink',
  burgundy: 'bg-burgundy text-cream hover:bg-burgundy-soft [box-shadow:inset_2px_2px_0_#a44d71,inset_-2px_-2px_0_#3a0f20]',
  cream: 'bg-cream text-burgundy hover:bg-pink-pale',
  cherry: 'bg-cherry text-cream hover:brightness-110 [box-shadow:inset_2px_2px_0_#ff8a90,inset_-2px_-2px_0_#9c1219]',
  butter: 'bg-butter text-ink hover:brightness-105',
} as const

const sizes = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-base',
  lg: 'min-h-13 px-6 text-lg',
} as const

type Common = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
}

export function retroButtonClass({ variant = 'pink', size = 'md', className }: Omit<Common, 'children'> = {}) {
  return cn(
    'bevel-out inline-flex cursor-pointer select-none items-center justify-center gap-2 border-2 border-burgundy font-pixel uppercase tracking-wide transition-[transform,background-color,filter] duration-100',
    'active:translate-x-px active:translate-y-px active:[box-shadow:inset_2px_2px_0_rgb(0_0_0/0.25)]',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-none aria-disabled:cursor-not-allowed aria-disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )
}

export function RetroButton({ variant, size, className, children, ...props }: Common & ComponentProps<'button'>) {
  return (
    <button type="button" className={retroButtonClass({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}

export function RetroLinkButton({
  variant,
  size,
  className,
  children,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={retroButtonClass({ variant, size, className })} {...props}>
      {children}
    </Link>
  )
}
