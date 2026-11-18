import Image from 'next/image'
import { brand } from '@/lib/data/brand'
import { cn } from '@/lib/utils'

/**
 * Renders the supplied GFTR logo artwork untouched. Until the file is added
 * (see `brand.logo.src`), a clearly labelled slot holds its place.
 */
export function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  if (brand.logo.src) {
    return (
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
        width={brand.logo.width}
        height={brand.logo.height}
        priority={priority}
        className={cn('h-auto w-full object-contain', className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label="Logo artwork slot — the official GFTR logo will be placed here"
      className={cn(
        'gingham flex aspect-[2/1] w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-burgundy p-3 text-center',
        className,
      )}
    >
      <span className="font-pixel text-xs uppercase tracking-widest text-burgundy">logo artwork slot</span>
      <span className="font-pixel text-[11px] text-burgundy/80">/public/brand/gftr-logo.png</span>
    </div>
  )
}
