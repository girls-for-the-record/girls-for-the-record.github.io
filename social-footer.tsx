import { socialLinks, type SocialLink } from '@/lib/data/brand'

function SocialBadge({ link }: { link: SocialLink }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="bevel-out flex size-9 items-center justify-center border-2 border-burgundy bg-bubblegum font-pixel text-base font-bold text-cream [text-shadow:1px_1px_0_var(--gftr-burgundy)]"
      >
        {link.shortLabel}
      </span>
      <span className="flex flex-col text-left leading-tight">
        <span className="font-pixel text-sm text-burgundy">{link.label}</span>
        <span className="font-pixel text-[11px] text-burgundy/75">
          {link.url ? 'opens in a new tab' : 'awaiting link ♡'}
        </span>
      </span>
    </>
  )

  const base = 'flex min-h-12 items-center gap-2 border-2 border-burgundy bg-cream px-2 py-1 pr-3'

  if (!link.url) {
    return (
      <span
        className={`${base} border-dashed opacity-80`}
        title={`${link.label} link awaiting configuration`}
      >
        {inner}
        <span className="sr-only"> — link not configured yet</span>
      </span>
    )
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bevel-out hover:-translate-y-0.5 hover:bg-pink-mist transition-transform`}
    >
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function SocialFooter() {
  return (
    <footer className="border-t-[3px] border-burgundy bg-pink-mist px-4 py-6 sm:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-display text-xl text-burgundy sm:text-2xl">
          find us elsewhere on the internet <span aria-hidden="true">♡</span>
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <SocialBadge link={link} />
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-0.5 font-pixel text-xs text-burgundy sm:flex-row sm:gap-3">
          <p>© 2026 GIRLS, FOR THE RECORD</p>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <p>
            made with curiosity <span aria-hidden="true">♡</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
