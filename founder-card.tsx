import Image from 'next/image'
import Link from 'next/link'
import { founderDisplayName, type Founder } from '@/lib/data/founders'
import { cn } from '@/lib/utils'

const accents = {
  pink: 'bg-pink',
  bubblegum: 'bg-bubblegum',
  butter: 'bg-butter',
  cherry: 'bg-cherry',
} as const

export function FounderAvatar({ founder, className }: { founder: Founder; className?: string }) {
  return (
    <div className={cn('relative aspect-square overflow-hidden border-[3px] border-burgundy', accents[founder.accent], className)}>
      {founder.avatar.src ? (
        <Image src={founder.avatar.src} alt={founder.avatar.alt} fill sizes="300px" className="object-contain" />
      ) : (
        <div className="gingham flex h-full flex-col items-center justify-center gap-1 bg-cream/40 p-2 text-center" role="img" aria-label={`Avatar slot for ${founderDisplayName(founder)}`}>
          <span className="font-headline text-5xl text-cream [text-shadow:3px_3px_0_var(--gftr-burgundy)]">P{founder.player}</span>
          <span className="bg-cream/90 px-1 font-pixel text-[10px] text-burgundy">cartoon avatar slot</span>
        </div>
      )}
    </div>
  )
}

export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <Link
      href={`/the-girls/${founder.slug}`}
      className="group flex h-full flex-col border-[3px] border-burgundy bg-cream transition-transform duration-150 hard-shadow hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
    >
      <div className="flex items-center justify-between border-b-[3px] border-burgundy bg-burgundy px-2 py-1 font-pixel text-sm text-cream">
        <span>PLAYER {founder.player}</span>
        <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
          ▸ SELECT
        </span>
      </div>
      <div className="p-3">
        <FounderAvatar founder={founder} className="transition-[filter] group-hover:brightness-110" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-3 pb-4">
        <h2 className="font-display text-xl text-burgundy">{founderDisplayName(founder)}</h2>
        <p className="font-pixel text-sm leading-tight text-cherry">{founder.role}</p>
        <p className="text-xs uppercase tracking-wide text-ink/70">{founder.designation}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/80">{founder.bio ?? 'Biography placeholder — in her own words, coming soon.'}</p>
        <p className="mt-auto pt-2 font-pixel text-xs text-burgundy">
          interests: {founder.researchInterests.length ? founder.researchInterests.join(', ') : 'to be added'}
        </p>
      </div>
    </Link>
  )
}
