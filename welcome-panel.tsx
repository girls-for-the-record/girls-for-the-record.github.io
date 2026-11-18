import { FileText, Heart, ImageIcon, NotebookPen } from 'lucide-react'
import { RetroWindow } from '@/components/retro/retro-window'
import { BrandLogo } from '@/components/retro/brand-logo'
import { brand } from '@/lib/data/brand'

function FauxToolbar() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-wrap items-center gap-1.5 border-b-2 border-burgundy bg-pink-pale px-2 py-1.5 font-pixel text-xs text-burgundy"
    >
      <span className="bevel-in flex h-7 items-center gap-6 border border-burgundy/50 bg-white px-2">
        Shrikhand <span>▾</span>
      </span>
      <span className="bevel-in flex h-7 items-center gap-3 border border-burgundy/50 bg-white px-2">
        72 <span>▾</span>
      </span>
      <span className="mx-1 h-6 w-px bg-burgundy/40" />
      <span className="bevel-out flex size-7 items-center justify-center border border-burgundy bg-cream font-bold">B</span>
      <span className="bevel-out flex size-7 items-center justify-center border border-burgundy bg-cream italic">I</span>
      <span className="bevel-out flex size-7 items-center justify-center border border-burgundy bg-cream underline">U</span>
      <span className="mx-1 h-6 w-px bg-burgundy/40" />
      <span className="flex items-center gap-1">
        <span className="size-5 border border-burgundy bg-cherry" />
        <span className="size-5 border border-burgundy bg-bubblegum" />
        <span className="size-5 border border-burgundy bg-butter" />
        <span className="size-5 border border-burgundy bg-burgundy" />
      </span>
      <span className="ml-auto hidden sm:inline">page 1 of ∞</span>
    </div>
  )
}

function Ruler() {
  return (
    <div
      aria-hidden="true"
      className="h-4 border-b border-burgundy/40 bg-cream [background-image:repeating-linear-gradient(90deg,var(--gftr-burgundy)_0_1px,transparent_1px_12px),repeating-linear-gradient(90deg,var(--gftr-burgundy)_0_1px,transparent_1px_60px)] [background-size:12px_5px,60px_10px] [background-repeat:repeat-x] [background-position:0_100%,0_100%] opacity-60"
    />
  )
}

export function WelcomePanel() {
  return (
    <RetroWindow
      title="welcome.doc — fieldnotes"
      icon={<FileText className="size-4" strokeWidth={2.5} />}
      bodyClassName="p-0 sm:p-0"
      aria-labelledby="welcome-heading"
      statusBar={
        <>
          <span>ln 1, col 1</span>
          <span>est. {brand.founded}</span>
          <span className="ml-auto">
            insert ♡
          </span>
        </>
      }
    >
      <FauxToolbar />
      <div className="grid gap-0 lg:grid-cols-12">
        <div className="border-burgundy lg:col-span-7 lg:border-r-2">
          <Ruler />
          <div className="relative overflow-hidden bg-cream px-5 pb-10 pt-8 sm:px-10 sm:pt-10">
            <p className="font-display text-2xl leading-snug text-burgundy sm:text-3xl">
              {brand.intro}
              <span aria-hidden="true" className="animate-caret ml-1 inline-block h-7 w-0.5 translate-y-1 bg-cherry" />
            </p>

            <h1
              id="welcome-heading"
              className="text-outline-pink mt-5 font-headline text-[3.4rem] uppercase leading-[0.88] text-burgundy sm:text-[5.5rem] lg:text-[6.25rem]"
            >
              Girls,
              <br />
              For the
              <br />
              Record<span className="text-cherry">.</span>
            </h1>

            <div className="mt-8 inline-block -rotate-2 border-[3px] border-burgundy bg-cherry px-4 py-2 hard-shadow-ink">
              <p className="font-pixel text-lg text-cream sm:text-xl">
                {brand.tagline} <span aria-hidden="true">♡</span>
              </p>
            </div>

            <Heart
              aria-hidden="true"
              className="absolute right-6 top-8 size-10 rotate-12 fill-bubblegum text-burgundy sm:right-10 sm:size-14"
              strokeWidth={2}
            />
            <Heart
              aria-hidden="true"
              className="absolute bottom-6 right-16 size-6 -rotate-12 fill-butter text-burgundy"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <div className="gingham flex flex-col gap-5 p-4 sm:p-6 lg:col-span-5">
          <RetroWindow
            as="div"
            title="gftr_logo.png"
            icon={<ImageIcon className="size-4" strokeWidth={2.5} />}
            variant="burgundy"
            bodyClassName="p-3 sm:p-3"
            className="rotate-1"
          >
            <BrandLogo priority />
          </RetroWindow>

          <RetroWindow
            as="div"
            title="what_we_do.txt"
            icon={<NotebookPen className="size-4" strokeWidth={2.5} />}
            className="-rotate-1"
            bodyClassName="p-0 sm:p-0"
          >
            <div className="ruled-paper px-4 py-2 pl-12">
              <p className="font-pixel text-sm uppercase tracking-wider text-cherry">fieldnotes index</p>
              <ul className="text-[15px] text-ink">
                {brand.whatWeDo.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Heart aria-hidden="true" className="size-3.5 shrink-0 fill-bubblegum text-burgundy" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="pt-1 text-sm text-muted-foreground">four girls · one new issue a month</p>
            </div>
          </RetroWindow>
        </div>
      </div>
    </RetroWindow>
  )
}
