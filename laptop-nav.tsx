import Image from 'next/image'
import { founders } from '@/lib/data/founders'
import { CartoonLaptop } from '@/components/home/cartoon-laptop'

function ScreenChrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="titlebar-pink flex items-center justify-between border-b-2 border-ink px-2 py-0.5">
        <span className="font-pixel text-[10px] text-cream sm:text-xs">{label}</span>
        <span className="flex gap-0.5">
          <span className="size-2 border border-ink bg-pink-pale" />
          <span className="size-2 border border-ink bg-cherry" />
        </span>
      </div>
      <div className="flex flex-1 items-center gap-3 px-3 sm:gap-4 sm:px-4">{children}</div>
    </div>
  )
}

function RecordScreen() {
  return (
    <ScreenChrome label="the_record.exe">
      <div className="relative aspect-[3/4] w-[30%] shrink-0 -rotate-3 overflow-hidden border-2 border-ink shadow-[3px_3px_0_var(--gftr-ink)]">
        <Image src="/covers/issue-000-fieldnotes.png" alt="GFTR Issue 000 introductory cover" fill sizes="180px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="font-headline text-2xl leading-none text-burgundy sm:text-4xl">THE RECORD</p>
        <p className="mt-1.5 font-pixel text-[11px] leading-tight text-ink sm:text-sm">
          research, magazines &amp; everything worth reading
        </p>
      </div>
    </ScreenChrome>
  )
}

function GirlsScreen() {
  return (
    <ScreenChrome label="the_girls.exe">
      <div className="min-w-0 flex-1">
        <p className="font-headline text-2xl leading-none text-cream [text-shadow:2px_2px_0_var(--gftr-burgundy)] sm:text-4xl">
          <span className="text-burgundy [text-shadow:none]">THE GIRLS</span>
        </p>
        <p className="mt-1.5 font-pixel text-[11px] leading-tight text-ink sm:text-sm">four girls, countless questions</p>
        <div className="mt-2 flex items-end gap-1.5 sm:gap-2">
          {founders.map((founder) => (
            <span key={founder.slug} className="flex min-w-0 flex-col items-center gap-0.5">
              <span className="relative block size-9 overflow-hidden rounded-md border-2 border-burgundy bg-pink-pale sm:size-12">
                <Image src={founder.avatar.src!} alt={founder.avatar.alt} fill sizes="48px" className="object-cover object-top" />
              </span>
              <span className="font-pixel text-[8px] text-burgundy">{founder.name}</span>
            </span>
          ))}
        </div>
      </div>
    </ScreenChrome>
  )
}

export function LaptopNav() {
  return (
    <section aria-labelledby="laptop-nav-heading" className="py-4">
      <h2 id="laptop-nav-heading" className="sr-only">
        Explore GFTR
      </h2>
      <p className="mb-8 text-center font-pixel text-base text-burgundy sm:text-lg">
        <span aria-hidden="true">♡ </span>pick a computer, any computer<span aria-hidden="true"> ♡</span>
      </p>
      <div className="grid gap-14 px-4 md:grid-cols-2 md:gap-10 lg:gap-16">
        <CartoonLaptop
          href="/the-record"
          title="THE RECORD"
          description="research, magazines & everything worth reading"
          casing="pink"
          tilt="left"
          screen={<RecordScreen />}
        />
        <CartoonLaptop
          href="/the-girls"
          title="THE GIRLS"
          description="four girls, countless questions"
          casing="burgundy"
          tilt="right"
          screen={<GirlsScreen />}
        />
      </div>
    </section>
  )
}
