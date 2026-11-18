import Image from 'next/image'
import { issueNumberLabel, type Issue } from '@/lib/data/issues'
import { formatIssueDate } from '@/lib/schedule'
import { cn } from '@/lib/utils'

export function MagazineCover({ issue, size = 'md', className }: { issue: Issue; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const big = size !== 'sm'
  return (
    <div
      className={cn(
        'relative aspect-[3/4] w-full overflow-hidden border-[3px] border-ink bg-bubblegum shadow-[6px_6px_0_var(--gftr-ink)]',
        className,
      )}
    >
      {issue.coverImage ? (
        <Image
          src={issue.coverImage}
          alt={`Cover of ${issueNumberLabel(issue)}: ${issue.title}`}
          fill
          sizes="(min-width: 1024px) 30vw, 80vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full flex-col p-[6%]">
          <div className="flex items-start justify-between">
            <p className={cn('font-headline leading-none text-cream [text-shadow:3px_3px_0_var(--gftr-burgundy)]', big ? 'text-5xl sm:text-6xl' : 'text-3xl')}>
              GFTR
            </p>
            <p className={cn('text-right font-pixel text-burgundy', big ? 'text-sm' : 'text-[10px]')}>
              {issueNumberLabel(issue)}
              <br />
              {formatIssueDate(issue.publishAt)}
            </p>
          </div>
          <p className={cn('mt-1 font-pixel text-burgundy', big ? 'text-xs' : 'text-[8px]')}>girls, for the record</p>

          <div className="relative my-[6%] flex flex-1 items-center justify-center border-2 border-dashed border-burgundy bg-pink-pale/70">
            <span className={cn('px-2 text-center font-pixel text-burgundy', big ? 'text-xs' : 'text-[8px]')}>
              cover artwork
              <br />
              coming soon
            </span>
          </div>

          <p className={cn('inline-block self-start bg-cherry px-1.5 font-pixel text-cream', big ? 'text-xs' : 'text-[8px]')}>
            {issue.eyebrow}
          </p>
          <p className={cn('mt-1 font-headline uppercase leading-[0.88] text-burgundy', big ? 'text-5xl sm:text-6xl' : 'text-2xl')}>
            {issue.title}
          </p>
        </div>
      )}
    </div>
  )
}
