import type { Issue } from '@/lib/data/issues'

export function isIssuePublished(issue: Issue, now: number) {
  if (issue.status === 'draft') return false
  if (issue.status === 'published') return true
  return Date.parse(issue.publishAt) <= now
}

export function getIssueSchedule(all: Issue[], now: number) {
  const sorted = [...all].sort((a, b) => Date.parse(a.publishAt) - Date.parse(b.publishAt))
  const published = sorted.filter((i) => isIssuePublished(i, now))
  const upcoming = sorted.filter((i) => i.status === 'scheduled' && Date.parse(i.publishAt) > now)
  return {
    published: published.reverse(),
    latestPublished: published[0] ?? null,
    nextUpcoming: upcoming[0] ?? null,
  }
}

export function getTimeRemaining(targetIso: string, now: number) {
  const diff = Math.max(0, Date.parse(targetIso) - now)
  const seconds = Math.floor(diff / 1000)
  return {
    total: diff,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  }
}

export function formatIssueDate(iso: string, opts: { withTime?: boolean } = {}) {
  const date = new Date(iso)
  const day = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/London',
  }).format(date)
  if (!opts.withTime) return day
  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  }).format(date)
  return `${day} · ${time} UK`
}
