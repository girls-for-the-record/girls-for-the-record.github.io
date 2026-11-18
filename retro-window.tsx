'use client'

import { Minus, X } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RetroWindowProps = {
  title: string
  icon?: ReactNode
  children: ReactNode
  variant?: 'pink' | 'burgundy'
  className?: string
  bodyClassName?: string
  statusBar?: ReactNode
  /** Adds a functional minimise control that collapses the window body. */
  collapsible?: boolean
  as?: 'section' | 'div' | 'article' | 'aside'
  id?: string
  'aria-labelledby'?: string
  'aria-label'?: string
}

export function RetroWindow({
  title,
  icon,
  children,
  variant = 'pink',
  className,
  bodyClassName,
  statusBar,
  collapsible = true,
  as: Tag = 'section',
  ...rest
}: RetroWindowProps) {
  const bodyId = useId()
  const [collapsed, setCollapsed] = useState(false)
  const [wiggle, setWiggle] = useState(false)
  const [note, setNote] = useState('')

  return (
    <Tag
      {...rest}
      className={cn(
        'animate-window-pop relative border-[3px] border-burgundy bg-cream hard-shadow',
        className,
      )}
    >
      <div
        onAnimationEnd={() => setWiggle(false)}
        className={cn(
          'flex items-center gap-2 border-b-[3px] border-burgundy px-2 py-1',
          variant === 'pink' ? 'titlebar-pink' : 'titlebar-burgundy',
          wiggle && 'animate-wiggle',
        )}
      >
        {icon && (
          <span aria-hidden="true" className="flex size-5 items-center justify-center text-cream">
            {icon}
          </span>
        )}
        <p className="min-w-0 flex-1 truncate font-pixel text-sm tracking-wide text-cream [text-shadow:1px_1px_0_var(--gftr-burgundy)] sm:text-base">
          {title}
        </p>
        {collapsible && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label={collapsed ? `Restore ${title}` : `Minimise ${title}`}
              aria-expanded={!collapsed}
              aria-controls={bodyId}
              onClick={() => setCollapsed((c) => !c)}
              className="bevel-out flex size-6 cursor-pointer items-center justify-center border-2 border-burgundy bg-pink-pale text-burgundy hover:bg-cream active:[box-shadow:inset_2px_2px_0_var(--gftr-pink-deep)]"
            >
              <Minus className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Close ${title}`}
              onClick={() => {
                setWiggle(true)
                setNote('this window stays open — it’s for the record ♡')
                window.setTimeout(() => setNote(''), 2400)
              }}
              className="bevel-out flex size-6 cursor-pointer items-center justify-center border-2 border-burgundy bg-cherry text-cream hover:brightness-110"
            >
              <X className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <p aria-live="polite" className={cn('font-pixel text-xs text-burgundy', note ? 'bg-butter px-2 py-1' : 'sr-only')}>
        {note}
      </p>
      <div id={bodyId} hidden={collapsed} className={cn('p-4 sm:p-5', bodyClassName)}>
        {children}
      </div>
      {statusBar && !collapsed && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t-2 border-burgundy bg-pink-pale px-3 py-1 font-pixel text-xs text-burgundy">
          {statusBar}
        </div>
      )}
    </Tag>
  )
}
