import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Library, Newspaper } from 'lucide-react'
import { RetroWindow } from '@/components/retro/retro-window'
import { RetroLinkButton } from '@/components/retro/retro-button'
import { MagazineCover } from '@/components/record/magazine-cover'
import { PaperLibrary } from '@/components/record/paper-library'
import { issues, issueNumberLabel } from '@/lib/data/issues'
import { formatIssueDate, isIssuePublished } from '@/lib/schedule'

export const metadata: Metadata = {
  title: 'The Record',
  description: 'The GFTR magazine and research library — a rather curious collection of things worth investigating.',
}

export default function TheRecordPage() {
  const sorted = [...issues].sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt))
  const latest = sorted[0]
  const now = Date.now()

  return (
    <div className="flex flex-col gap-12">
      <header className="text-center">
        <h1 className="text-outline-pink font-headline text-7xl uppercase leading-none text-burgundy sm:text-8xl">The Record</h1>
        <p className="mt-4 font-display text-xl text-burgundy sm:text-2xl">a rather curious collection of things worth investigating.</p>
      </header>

      <RetroWindow title="issue_000 — the introductory cover" icon={<BookOpen className="size-4" />} aria-label="Issue 000 cover artwork">
        <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,230px)_1fr]">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[230px] overflow-hidden border-[3px] border-burgundy shadow-[5px_5px_0_var(--gftr-ink)]">
            <Image src="/covers/issue-000-fieldnotes.png" alt="Girls, For the Record introductory Issue 000 cover with the four illustrated founders" fill sizes="230px" className="object-cover" />
          </div>
          <div className="border-2 border-burgundy bg-cream p-5">
            <p className="font-pixel text-sm text-cherry">ISSUE 000 · COVER REVEAL</p>
            <h2 className="mt-2 font-headline text-4xl text-burgundy">FIELDNOTES FROM THE GIRLS</h2>
            <p className="mt-3 font-display text-xl text-burgundy">a little barbie told us everything.</p>
            <p className="mt-3 text-sm text-ink">Our introductory artwork. The first full research issue, Issue 001, arrives 3 December.</p>
          </div>
        </div>
      </RetroWindow>

      {latest && (
        <RetroWindow title="latest_issue.mag" icon={<BookOpen className="size-4" />} aria-label="Latest issue" bodyClassName="gingham sm:p-8">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,280px)_1fr]">
            <MagazineCover issue={latest} className="mx-auto max-w-[280px] -rotate-2" />
            <div className="bg-cream/95 p-5 border-2 border-burgundy">
              <p className="font-pixel text-sm text-cherry">
                {isIssuePublished(latest, now) ? 'LATEST ISSUE' : 'COMING SOON'} · {issueNumberLabel(latest)}
              </p>
              <h2 className="mt-1 font-headline text-5xl uppercase leading-[0.9] text-burgundy">{latest.title}</h2>
              <p className="mt-2 font-pixel text-ink">{formatIssueDate(latest.publishAt, { withTime: true })}</p>
              <p className="mt-3 max-w-prose leading-relaxed text-ink">{latest.description}</p>
              <RetroLinkButton href={`/the-record/issue/${latest.slug}`} variant="burgundy" className="mt-5">
                open magazine <span aria-hidden="true">▸</span>
              </RetroLinkButton>
            </div>
          </div>
        </RetroWindow>
      )}

      <RetroWindow title="archive/ — magazine shelf" icon={<Library className="size-4" />} variant="burgundy" aria-label="Magazine archive">
        <div className="border-b-[10px] border-burgundy pb-4">
          <ul className="flex gap-6 overflow-x-auto pb-4 retro-scroll">
            {sorted.map((issue) => (
              <li key={issue.slug} className="w-40 shrink-0 sm:w-48">
                <Link href={`/the-record/issue/${issue.slug}`} className="group block">
                  <MagazineCover issue={issue} size="sm" className="transition-transform group-hover:-translate-y-2 group-hover:-rotate-2" />
                  <p className="mt-3 font-pixel text-sm text-burgundy">{issueNumberLabel(issue)}</p>
                  <p className="font-semibold text-ink group-hover:underline">{issue.title}</p>
                </Link>
              </li>
            ))}
            <li className="flex w-40 shrink-0 items-center justify-center border-2 border-dashed border-burgundy p-4 text-center font-pixel text-sm text-burgundy sm:w-48">
              more issues land here every month ♡
            </li>
          </ul>
        </div>
      </RetroWindow>

      <RetroWindow title="research_papers/" icon={<Newspaper className="size-4" />} aria-label="Research papers">
        <h2 className="mb-4 font-display text-3xl text-burgundy">research papers</h2>
        <PaperLibrary />
      </RetroWindow>
    </div>
  )
}
