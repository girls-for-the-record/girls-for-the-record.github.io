'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { founderDisplayName, getFounder } from '@/lib/data/founders'
import { otrTabs, type OtrEntry, type OtrTabId } from '@/lib/data/off-the-record'
import { cn } from '@/lib/utils'

function RedactedText({ text }: { text: string }) {
  const parts = text.split('[[REDACTED]]')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="mx-0.5 inline-block h-[1em] w-20 translate-y-0.5 bg-ink align-baseline" role="img" aria-label="redacted" />
          )}
        </span>
      ))}
    </>
  )
}

export function RetroChatBubble({ entry, side }: { entry: OtrEntry; side: 'left' | 'right' }) {
  return (
    <li className={cn('flex flex-col gap-1', side === 'right' ? 'items-end' : 'items-start')}>
      <span className="font-pixel text-xs text-burgundy">{founderDisplayName(getFounder(entry.author ?? ''))}</span>
      <p
        className={cn(
          'max-w-[85%] border-2 border-burgundy px-3 py-2 text-[15px] leading-relaxed text-ink shadow-[3px_3px_0_var(--gftr-burgundy)]',
          side === 'right' ? 'rounded-l-2xl rounded-tr-2xl bg-bubblegum/40' : 'rounded-r-2xl rounded-tl-2xl bg-cream',
        )}
      >
        <RedactedText text={entry.body} />
      </p>
    </li>
  )
}

function EntryCard({ entry, i }: { entry: OtrEntry; i: number }) {
  const tilt = i % 2 === 0 ? '-rotate-1' : 'rotate-1'
  if (entry.kind === 'polaroid') {
    return (
      <figure className={cn('bg-white p-3 pb-4 shadow-[4px_4px_0_var(--gftr-burgundy)] border-2 border-burgundy', tilt)}>
        <div className="flex aspect-square items-center justify-center border border-burgundy/40 bg-pink-pale font-pixel text-xs text-burgundy">
          {entry.body}
        </div>
        <figcaption className="mt-2 text-center font-display text-burgundy">{entry.caption ?? entry.title}</figcaption>
      </figure>
    )
  }
  return (
    <div className={cn('border-2 border-burgundy bg-cream shadow-[4px_4px_0_var(--gftr-burgundy)]', tilt)}>
      <p className="titlebar-pink border-b-2 border-burgundy px-2 py-0.5 font-pixel text-xs text-cream">{entry.title}</p>
      <div className={cn('p-3 text-[15px] leading-relaxed text-ink', entry.kind === 'note' && 'ruled-paper pl-10')}>
        <RedactedText text={entry.body} />
        {entry.author && <p className="mt-2 font-pixel text-xs text-burgundy">— {founderDisplayName(getFounder(entry.author))}</p>}
      </div>
    </div>
  )
}

export function OffTheRecordTabs({ entries }: { entries: OtrEntry[] }) {
  const [active, setActive] = useState<OtrTabId>('group-chat')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % otrTabs.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + otrTabs.length) % otrTabs.length
    else return
    e.preventDefault()
    setActive(otrTabs[next].id)
    tabRefs.current[next]?.focus()
  }

  const visible = entries.filter((e) => e.tab === active)
  const anyIllustrative = visible.some((e) => e.illustrative)

  return (
    <div>
      <div role="tablist" aria-label="Off the Record" className="flex flex-wrap gap-1 border-b-[3px] border-burgundy">
        {otrTabs.map((tab, i) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`otr-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`otr-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                '-mb-[3px] min-h-11 cursor-pointer border-[3px] border-burgundy px-3 font-pixel text-sm',
                selected ? 'border-b-cream bg-cream text-burgundy' : 'bg-pink text-burgundy hover:bg-pink-pale',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`otr-panel-${active}`}
        aria-labelledby={`otr-tab-${active}`}
        tabIndex={0}
        className="border-[3px] border-t-0 border-burgundy bg-cream p-4 sm:p-6"
      >
        {anyIllustrative && (
          <p className="mb-4 inline-block border-2 border-dashed border-burgundy bg-butter/70 px-2 py-0.5 font-pixel text-xs text-ink">
            illustrative placeholders — approved real excerpts will replace these
          </p>
        )}
        {visible.length === 0 ? (
          <p className="font-pixel text-burgundy">nothing shared here yet ♡</p>
        ) : active === 'group-chat' ? (
          <div className="mx-auto max-w-xl border-2 border-burgundy">
            <p className="titlebar-burgundy px-2 py-1 font-pixel text-sm text-cream">gftr_groupchat — 4 online</p>
            <ul className="space-y-3 bg-pink-pale p-4">
              {visible.map((e, i) => (
                <RetroChatBubble key={e.id} entry={e} side={i % 2 === 0 ? 'left' : 'right'} />
              ))}
            </ul>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((e, i) => (
              <li key={e.id}>
                <EntryCard entry={e} i={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
