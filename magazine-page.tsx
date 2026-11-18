import { MagazineCover } from '@/components/record/magazine-cover'
import { founderDisplayName, founders, getFounder } from '@/lib/data/founders'
import type { Issue, IssueSection } from '@/lib/data/issues'

function Placeholder({ label, lines = 4 }: { label: string; lines?: number }) {
  return (
    <div className="border-2 border-dashed border-burgundy/60 bg-pink-pale/60 p-3">
      <p className="font-pixel text-xs uppercase text-burgundy">{label}</p>
      <div aria-hidden="true" className="mt-2 space-y-1.5">
        {Array.from({ length: lines }).map((_, i) => (
          <span key={i} className="block h-2 bg-burgundy/15" style={{ width: `${92 - ((i * 13) % 30)}%` }} />
        ))}
      </div>
    </div>
  )
}

function Body({ section }: { section: IssueSection }) {
  if (section.body.length === 0) return <Placeholder label="article text to be supplied" lines={6} />
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-ink">
      {section.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

export function MagazinePage({ issue, section, pageNumber }: { issue: Issue; section: IssueSection; pageNumber: number }) {
  if (section.layout === 'cover') {
    return <MagazineCover issue={issue} size="lg" className="h-full shadow-none border-0" />
  }

  const byline = section.author ? founderDisplayName(getFounder(section.author)) : null

  return (
    <div className="flex h-full flex-col bg-cream p-5 sm:p-7">
      <div className="flex items-center justify-between border-b-2 border-burgundy pb-1 font-pixel text-[11px] text-burgundy">
        <span>GFTR · {section.kicker}</span>
        <span>p.{pageNumber}</span>
      </div>
      <h2 className="mt-4 font-headline text-4xl uppercase leading-[0.9] text-burgundy sm:text-5xl">{section.title}</h2>
      {byline && <p className="mt-2 font-pixel text-sm text-cherry">words by {byline}</p>}

      <div className="mt-5 flex-1 overflow-y-auto retro-scroll">
        {section.layout === 'contents' && (
          <ol className="space-y-1.5">
            {issue.sections.slice(2).map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-2 border-b border-dotted border-burgundy/40 pb-1">
                <span className="font-headline text-lg text-cherry">{String(i + 3).padStart(2, '0')}</span>
                <span className="font-semibold text-ink">{s.title}</span>
              </li>
            ))}
          </ol>
        )}

        {section.layout === 'letter' && (
          <div className="ruled-paper border-2 border-burgundy p-4 pl-12">
            <Body section={section} />
          </div>
        )}

        {section.layout === 'stat-grid' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex aspect-[4/3] flex-col items-center justify-center border-2 border-burgundy bg-pink-mist text-center">
                  <span className="font-headline text-4xl text-burgundy">—</span>
                  <span className="font-pixel text-[10px] text-burgundy">statistic {i + 1} · to be sourced</span>
                </div>
              ))}
            </div>
            <Body section={section} />
          </div>
        )}

        {(section.layout === 'split' || section.layout === 'full') && (
          <div className={section.layout === 'split' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}>
            <div className="flex aspect-[4/3] items-center justify-center border-2 border-dashed border-burgundy bg-bubblegum/30 font-pixel text-xs text-burgundy">
              image / illustration slot
            </div>
            <Body section={section} />
          </div>
        )}

        {section.layout === 'profiles' && (
          <ul className="grid grid-cols-2 gap-3">
            {founders.map((f) => (
              <li key={f.slug} className="border-2 border-burgundy bg-pink-pale p-2 text-center">
                <span aria-hidden="true" className="mx-auto block size-12 rounded-full border-2 border-burgundy bg-bubblegum" />
                <p className="mt-1 text-sm font-semibold text-ink">{founderDisplayName(f)}</p>
                <p className="font-pixel text-[10px] leading-tight text-burgundy">{f.role}</p>
              </li>
            ))}
          </ul>
        )}

        {section.layout === 'references' &&
          (section.references && section.references.length > 0 ? (
            <ol className="list-decimal space-y-1 pl-5 text-sm text-ink">
              {section.references.map((r) => (
                <li key={r.label}>
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {r.label}
                    </a>
                  ) : (
                    r.label
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <Placeholder label="references & sources to be supplied" lines={5} />
          ))}
      </div>
    </div>
  )
}
