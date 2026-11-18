import type { Metadata } from 'next'
import { Users } from 'lucide-react'
import { RetroWindow } from '@/components/retro/retro-window'
import { FounderCard } from '@/components/girls/founder-card'
import { founders } from '@/lib/data/founders'

export const metadata: Metadata = {
  title: 'The Girls',
  description: 'Meet the four co-founders of Girls, For the Record.',
}

export default function TheGirlsPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="text-center">
        <h1 className="text-outline-pink font-headline text-7xl uppercase leading-none text-burgundy sm:text-8xl">Meet the Girls</h1>
        <p className="mt-4 font-display text-xl text-burgundy sm:text-2xl">four girls, countless questions, one record.</p>
      </header>
      <RetroWindow title="select_your_girl.exe" icon={<Users className="size-4" />} variant="burgundy" aria-label="Founders" bodyClassName="gingham sm:p-8">
        <p className="mb-6 text-center font-pixel text-burgundy">
          <span className="bg-cream px-2 py-0.5">choose a player to view her profile ♡</span>
        </p>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 retro-scroll sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {founders.map((f) => (
            <li key={f.slug} className="w-[78%] shrink-0 snap-center sm:w-auto">
              <FounderCard founder={f} />
            </li>
          ))}
        </ul>
      </RetroWindow>
    </div>
  )
}
