import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ResearchPaperCard } from '@/components/record/research-paper-card'
import { founderDisplayName, getFounder } from '@/lib/data/founders'
import { getPaper, papers } from '@/lib/data/papers'
import { formatIssueDate } from '@/lib/schedule'

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const paper = getPaper((await params).slug)
  return paper ? { title: paper.title, description: paper.abstract } : {}
}

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const paper = getPaper((await params).slug)
  if (!paper) notFound()
  const author = getFounder(paper.author)
  const related = papers.filter((p) => p.slug !== paper.slug && (p.topic === paper.topic || p.issueSlug === paper.issueSlug)).slice(0, 3)

  return (
    <div className="flex flex-col gap-10">
      <Link href="/the-record" className="self-start font-pixel text-burgundy underline underline-offset-4 hover:text-cherry">
        ◂ back to the archive
      </Link>

      <article className="mx-auto w-full max-w-3xl border-[3px] border-burgundy bg-cream hard-shadow">
        <div className="titlebar-pink border-b-[3px] border-burgundy px-3 py-1 font-pixel text-cream [text-shadow:1px_1px_0_var(--gftr-burgundy)]">
          {paper.slug}.doc
        </div>
        <div className="px-5 py-8 sm:px-12">
          <header className="border-b-2 border-burgundy pb-6">
            <div className="flex flex-wrap gap-2 font-pixel text-xs">
              <span className="border border-burgundy bg-butter px-1.5 py-0.5">{paper.type}</span>
              <span className="border border-burgundy bg-pink-mist px-1.5 py-0.5 text-burgundy">{paper.topic}</span>
              {paper.placeholder && <span className="border border-dashed border-burgundy px-1.5 py-0.5 text-burgundy">placeholder content</span>}
            </div>
            <h1 className="mt-3 font-display text-4xl leading-tight text-burgundy sm:text-5xl">{paper.title}</h1>
            <p className="mt-3 text-ink">
              by{' '}
              {author ? (
                <Link href={`/the-girls/${author.slug}`} className="font-semibold underline decoration-pink decoration-2 underline-offset-2">
                  {founderDisplayName(author)}
                </Link>
              ) : (
                'unknown author'
              )}{' '}
              · <time dateTime={paper.publishedAt}>{formatIssueDate(paper.publishedAt)}</time>
            </p>
          </header>

          <section aria-labelledby="abstract" className="mt-6 border-l-4 border-cherry bg-pink-pale p-4">
            <h2 id="abstract" className="font-pixel text-sm uppercase text-cherry">abstract</h2>
            <p className="mt-1 leading-relaxed text-ink">{paper.abstract}</p>
          </section>

          {paper.body.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2 className="font-headline text-3xl uppercase text-burgundy">{s.heading}</h2>
              {s.paragraphs.length > 0 ? (
                s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-[17px] leading-relaxed text-ink">
                    {p}
                  </p>
                ))
              ) : (
                <p className="mt-2 italic text-ink/70">Section text to be supplied by the author.</p>
              )}
            </section>
          ))}

          {paper.figures.map((f) => (
            <figure key={f.id} className="mt-8">
              <div className="flex aspect-video items-center justify-center border-2 border-dashed border-burgundy bg-pink-mist font-pixel text-sm text-burgundy">
                figure / chart slot
              </div>
              <figcaption className="mt-2 text-sm text-ink/80">{f.caption}</figcaption>
            </figure>
          ))}

          <section className="mt-10 border-t-2 border-burgundy pt-6">
            <h2 className="font-headline text-3xl uppercase text-burgundy">References</h2>
            {paper.references.length > 0 ? (
              <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink">
                {paper.references.map((r) => (
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
              <p className="mt-2 italic text-ink/70">References will be listed here.</p>
            )}
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related">
          <h2 id="related" className="mb-4 font-display text-3xl text-burgundy">related papers</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <ResearchPaperCard paper={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
