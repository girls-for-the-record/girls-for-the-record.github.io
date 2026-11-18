import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, Lock } from 'lucide-react'
import { RetroWindow } from '@/components/retro/retro-window'
import { MagazineReader } from '@/components/record/magazine-reader'
import { OffTheRecordTabs } from '@/components/record/off-the-record-tabs'
import { getIssue, issueNumberLabel, issues } from '@/lib/data/issues'
import { getPublishableEntries } from '@/lib/data/off-the-record'
import { formatIssueDate } from '@/lib/schedule'

export function generateStaticParams() {
  return issues.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const issue = getIssue((await params).slug)
  if (!issue) return {}
  return { title: `${issueNumberLabel(issue)}: ${issue.title}`, description: issue.description }
}

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const issue = getIssue((await params).slug)
  if (!issue) notFound()
  const entries = getPublishableEntries(issue.slug)

  return (
    <div className="flex flex-col gap-10">
      <Link href="/the-record" className="self-start font-pixel text-burgundy underline underline-offset-4 hover:text-cherry">
        ◂ back to the record
      </Link>

      <header>
        <p className="font-pixel text-cherry">
          {issueNumberLabel(issue)} · {formatIssueDate(issue.publishAt)}
        </p>
        <h1 className="text-outline-pink font-headline text-6xl uppercase leading-[0.9] text-burgundy sm:text-7xl">{issue.title}</h1>
        <p className="mt-3 max-w-prose leading-relaxed text-ink">{issue.description}</p>
        <p className="mt-2 inline-block border-2 border-dashed border-burgundy bg-butter/60 px-2 py-0.5 font-pixel text-xs text-ink">
          wireframe: page layouts ready, articles to be supplied
        </p>
      </header>

      <RetroWindow title={`${issue.slug}.mag — reader`} icon={<BookOpen className="size-4" />} aria-label="Magazine reader" collapsible={false}>
        <MagazineReader issue={issue} />
      </RetroWindow>

      <RetroWindow title="off_the_record — private.scrapbook" icon={<Lock className="size-4" />} variant="burgundy" aria-labelledby="otr-heading">
        <h2 id="otr-heading" className="font-headline text-5xl uppercase text-burgundy">Off the Record</h2>
        <p className="mb-6 font-display text-lg text-burgundy">the making of the issue, in our own words.</p>
        <OffTheRecordTabs entries={entries} />
      </RetroWindow>
    </div>
  )
}
