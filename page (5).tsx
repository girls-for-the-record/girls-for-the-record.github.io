import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { UserRound } from 'lucide-react'
import { RetroWindow } from '@/components/retro/retro-window'
import { FounderAvatar } from '@/components/girls/founder-card'
import { ResearchPaperCard } from '@/components/record/research-paper-card'
import { founderDisplayName, founders, getFounder } from '@/lib/data/founders'
import { issues, issueNumberLabel } from '@/lib/data/issues'
import { papers } from '@/lib/data/papers'

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const f = getFounder((await params).slug)
  return f ? { title: founderDisplayName(f), description: f.role } : {}
}

export default async function FounderProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const founder = getFounder((await params).slug)
  if (!founder) notFound()
  const theirPapers = papers.filter((p) => p.author === founder.slug)
  const contributions = issues.flatMap((i) =>
    i.sections.filter((s) => s.author === founder.slug).map((s) => ({ issue: i, section: s })),
  )

  return (
    <div className="flex flex-col gap-10">
      <Link href="/the-girls" className="self-start font-pixel text-burgundy underline underline-offset-4 hover:text-cherry">
        ◂ back to the girls
      </Link>

      <RetroWindow title={`player_${founder.player}.profile`} icon={<UserRound className="size-4" />} aria-labelledby="founder-name">
        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          <FounderAvatar founder={founder} className="mx-auto w-full max-w-[260px] rotate-[-2deg] hard-shadow" />
          <div>
            <p className="font-pixel text-cherry">PLAYER {founder.player}</p>
            <h1 id="founder-name" className="font-headline text-5xl uppercase leading-none text-burgundy sm:text-6xl">
              {founderDisplayName(founder)}
            </h1>
            <p className="mt-2 font-display text-xl text-burgundy">{founder.role}</p>
            <p className="mt-1 inline-block border-2 border-burgundy bg-butter px-2 py-0.5 font-pixel text-sm text-ink">{founder.designation}</p>
            <div className="ruled-paper mt-5 border-2 border-burgundy p-4 pl-12">
              <h2 className="font-pixel text-sm uppercase text-cherry">biography</h2>
              <p className="leading-[28px] text-ink">{founder.bio ?? 'Biography placeholder — to be written by the founder herself.'}</p>
            </div>
            <div className="mt-4">
              <h2 className="font-pixel text-sm uppercase text-cherry">research interests</h2>
              {founder.researchInterests.length ? (
                <ul className="mt-1 flex flex-wrap gap-2">
                  {founder.researchInterests.map((r) => (
                    <li key={r} className="border-2 border-burgundy bg-pink-mist px-2 py-0.5 font-pixel text-sm text-burgundy">{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 italic text-ink/70">To be added.</p>
              )}
            </div>
          </div>
        </div>
      </RetroWindow>

      <section aria-labelledby="contrib">
        <h2 id="contrib" className="mb-3 font-display text-3xl text-burgundy">magazine contributions</h2>
        {contributions.length ? (
          <ul className="space-y-2">
            {contributions.map(({ issue, section }) => (
              <li key={`${issue.slug}-${section.id}`}>
                <Link href={`/the-record/issue/${issue.slug}`} className="flex flex-wrap items-baseline gap-2 border-2 border-burgundy bg-cream px-3 py-2 hover:bg-pink-pale">
                  <span className="font-pixel text-sm text-cherry">{issueNumberLabel(issue)}</span>
                  <span className="font-semibold text-ink">{section.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-ink/70">No contributions listed yet.</p>
        )}
      </section>

      <section aria-labelledby="papers">
        <h2 id="papers" className="mb-3 font-display text-3xl text-burgundy">published papers</h2>
        {theirPapers.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {theirPapers.map((p) => (
              <li key={p.slug}>
                <ResearchPaperCard paper={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-ink/70">No papers yet.</p>
        )}
      </section>
    </div>
  )
}
