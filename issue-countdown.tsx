'use client'

import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RetroWindow } from '@/components/retro/retro-window'
import { RetroLinkButton } from '@/components/retro/retro-button'
import { issues, issueNumberLabel, type Issue } from '@/lib/data/issues'
import { getIssueSchedule, getTimeRemaining } from '@/lib/schedule'

function useNow() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function Digit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="bevel-in border-[3px] border-burgundy bg-pink p-1">
        <span className="lcd block min-w-[2.6ch] px-2 py-1 text-center font-pixel text-4xl tabular-nums text-bubblegum [text-shadow:0_0_8px_rgb(255_120_178/0.6)] sm:text-6xl">
          {value}
        </span>
      </div>
      <span className="font-pixel text-xs uppercase tracking-widest text-burgundy sm:text-sm">{label}</span>
    </div>
  )
}

function LocalReleaseClock({ publishAt, timeZone, label }: { publishAt: string; timeZone: string; label: string }) {
  const date = new Date(publishAt)
  const localTime = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone, hourCycle: 'h23',
  }).format(date)
  return (
    <div className="border-[3px] border-burgundy bg-pink-pale p-3 text-center shadow-[3px_3px_0_var(--gftr-ink)]">
      <p className="font-headline text-2xl uppercase text-burgundy">{label}</p>
      <p className="mt-1 font-pixel text-sm text-ink">{localTime}</p>
    </div>
  )
}

function UpcomingIssue({ issue, now }: { issue: Issue; now: number | null }) {
  const remaining = now === null ? null : getTimeRemaining(issue.publishAt, now)
  const pad = (n: number | undefined, len = 2) => (n === undefined ? '--' : String(n).padStart(len, '0'))

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
      <div>
        <p className="inline-block border-2 border-burgundy bg-cherry px-2 py-0.5 font-pixel text-sm text-cream">
          {issue.eyebrow}
        </p>
        <p className="mt-3 font-pixel text-lg text-burgundy">{issueNumberLabel(issue)}</p>
        <h2 id="countdown-heading" className="font-headline text-5xl uppercase leading-[0.9] text-burgundy sm:text-6xl">
          {issue.title}
        </h2>
        <p className="mt-3 font-pixel text-base text-ink">
          releasing simultaneously in England and India
        </p>
      </div>

      <div>
        <p className="mb-3 text-center font-pixel text-sm text-burgundy">TIME UNTIL RELEASE · BOTH COUNTRIES</p>
        <div
          role="timer"
          aria-label={`Time until ${issueNumberLabel(issue)} is released`}
          className="flex items-start gap-1.5 sm:gap-3"
        >
          <Digit value={pad(remaining?.days)} label="days" />
          <span aria-hidden="true" className="pt-3 font-pixel text-4xl text-burgundy sm:text-5xl">
            :
          </span>
          <Digit value={pad(remaining?.hours)} label="hrs" />
          <span aria-hidden="true" className="pt-3 font-pixel text-4xl text-burgundy sm:text-5xl">
            :
          </span>
          <Digit value={pad(remaining?.minutes)} label="min" />
          <span aria-hidden="true" className="hidden pt-3 font-pixel text-4xl text-burgundy sm:inline sm:text-5xl">
            :
          </span>
          <div className="hidden sm:block">
            <Digit value={pad(remaining?.seconds)} label="sec" />
          </div>
        </div>
        <p className="mt-2 text-center font-pixel text-xs text-burgundy sm:hidden">
          {pad(remaining?.seconds)} seconds
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <LocalReleaseClock publishAt={issue.publishAt} timeZone="Europe/London" label="ENGLAND ♡" />
          <LocalReleaseClock publishAt={issue.publishAt} timeZone="Asia/Kolkata" label="INDIA ♡" />
        </div>
        <p className="sr-only" aria-live="off">
          {remaining
            ? `${remaining.days} days, ${remaining.hours} hours and ${remaining.minutes} minutes remaining`
            : 'calculating'}
        </p>
      </div>
    </div>
  )
}

export function IssueCountdown() {
  const now = useNow()
  // Before mount, schedule against the publish data alone so server and client agree.
  const schedule = getIssueSchedule(issues, now ?? 0)
  const { latestPublished, nextUpcoming } = schedule

  return (
    <RetroWindow
      title="next_issue.clock"
      icon={<Clock className="size-4" strokeWidth={2.5} />}
      variant="burgundy"
      aria-labelledby="countdown-heading"
      className="gingham"
      bodyClassName="bg-cream/95 sm:p-8"
      statusBar={
        <>
          <span>England (London) + India (IST) release clocks</span>
          <span className="ml-auto">one new issue a month ♡</span>
        </>
      }
    >
      {latestPublished && now !== null && (
        <div className="mb-6 flex flex-wrap items-center gap-3 border-2 border-dashed border-burgundy bg-pink-mist p-3">
          <p className="font-pixel text-sm text-burgundy">
            just out: {issueNumberLabel(latestPublished)} — {latestPublished.title}
          </p>
          <RetroLinkButton href={`/the-record/issue/${latestPublished.slug}`} variant="cherry" size="sm" className="ml-auto">
            READ THE ISSUE
          </RetroLinkButton>
        </div>
      )}

      {nextUpcoming ? (
        <UpcomingIssue issue={nextUpcoming} now={now} />
      ) : (
        <div className="py-6 text-center">
          <h2 id="countdown-heading" className="font-display text-3xl text-burgundy">
            the next issue is being written...
          </h2>
          <p className="mt-2 font-pixel text-base text-ink">check back soon ♡</p>
        </div>
      )}
    </RetroWindow>
  )
}
