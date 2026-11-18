import { FileText } from 'lucide-react'
import { RetroLinkButton } from '@/components/retro/retro-button'
import { founderDisplayName, getFounder } from '@/lib/data/founders'
import type { Paper } from '@/lib/data/papers'
import { formatIssueDate } from '@/lib/schedule'

export function ResearchPaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="flex h-full flex-col border-[3px] border-burgundy bg-cream hard-shadow">
      <div className="titlebar-pink flex items-center gap-2 border-b-2 border-burgundy px-2 py-1">
        <FileText aria-hidden="true" className="size-4 text-cream" strokeWidth={2.5} />
        <span className="truncate font-pixel text-sm text-cream [text-shadow:1px_1px_0_var(--gftr-burgundy)]">
          {paper.slug}.doc
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5 font-pixel text-xs">
          <span className="border border-burgundy bg-butter px-1.5 py-0.5 text-ink">{paper.type}</span>
          <span className="border border-burgundy bg-pink-mist px-1.5 py-0.5 text-burgundy">{paper.topic}</span>
          {paper.placeholder && <span className="border border-dashed border-burgundy px-1.5 py-0.5 text-burgundy">placeholder</span>}
        </div>
        <h3 className="font-display text-xl leading-tight text-burgundy">{paper.title}</h3>
        <p className="font-pixel text-sm text-ink">
          by {founderDisplayName(getFounder(paper.author))} · {formatIssueDate(paper.publishedAt)}
        </p>
        <p className="flex-1 text-[15px] leading-relaxed text-ink/85">{paper.abstract}</p>
        <RetroLinkButton href={`/the-record/paper/${paper.slug}`} variant="pink" size="sm" className="self-start">
          read <span aria-hidden="true">▸</span>
          <span className="sr-only"> {paper.title}</span>
        </RetroLinkButton>
      </div>
    </article>
  )
}
