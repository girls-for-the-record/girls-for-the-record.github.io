export type IssueStatus = 'draft' | 'scheduled' | 'published'

export type IssueSectionLayout = 'cover' | 'contents' | 'letter' | 'stat-grid' | 'split' | 'full' | 'profiles' | 'references'

export type IssueSection = {
  id: string
  title: string
  kicker: string
  layout: IssueSectionLayout
  /** founder slug, when a section has a byline */
  author?: string
  /** Real article paragraphs. Empty until supplied — the reader shows a labelled placeholder. */
  body: string[]
  references?: { label: string; url?: string }[]
}

export type Issue = {
  slug: string
  number: number
  title: string
  eyebrow: string
  /** ISO 8601 timestamp with explicit offset. Scheduling is in Europe/London. */
  publishAt: string
  timeZone: 'Europe/London'
  status: IssueStatus
  description: string
  /** Supplied cover artwork in /public, or null to show the designed placeholder cover. */
  coverImage: string | null
  /** Real PDF in /public, or null — the download control is disabled until then. */
  pdfUrl: string | null
  sections: IssueSection[]
}

export const issues: Issue[] = [
  {
    slug: 'issue-001-where-are-the-women',
    number: 1,
    title: 'WHERE ARE THE WOMEN?',
    eyebrow: 'OUR DEBUT ISSUE',
    // 12:00 noon UK time. December is GMT, so the offset is +00:00.
    publishAt: '2026-12-03T12:00:00+00:00',
    timeZone: 'Europe/London',
    status: 'scheduled',
    description:
      "A special introductory edition exploring women's representation in technology — from the numbers, to leadership, to the education-to-industry pipeline.",
    coverImage: null,
    pdfUrl: null,
    sections: [
      { id: 'cover', title: 'Cover', kicker: 'issue 001', layout: 'cover', body: [] },
      { id: 'contents', title: 'Contents', kicker: 'in this issue', layout: 'contents', body: [] },
      { id: 'editors-note', title: "Editor's Note", kicker: 'a letter from the girls', layout: 'letter', body: [] },
      {
        id: 'the-numbers',
        title: 'Women in Technology: The Numbers',
        kicker: 'data',
        layout: 'stat-grid',
        author: 'founder-02',
        body: [],
      },
      {
        id: 'leadership',
        title: 'Women in Leadership',
        kicker: 'investigation',
        layout: 'split',
        author: 'founder-01',
        body: [],
      },
      {
        id: 'pipeline',
        title: 'The Education-to-Industry Pipeline',
        kicker: 'research feature',
        layout: 'full',
        author: 'founder-03',
        body: [],
      },
      {
        id: 'bigger-picture',
        title: 'Understanding the Bigger Picture',
        kicker: 'editorial',
        layout: 'split',
        author: 'founder-04',
        body: [],
      },
      { id: 'founders', title: 'Meet the Four Founders', kicker: 'the girls', layout: 'profiles', body: [] },
      { id: 'what-next', title: 'What Comes Next', kicker: 'next time', layout: 'letter', body: [] },
      { id: 'references', title: 'References and Sources', kicker: 'for the record', layout: 'references', body: [], references: [] },
    ],
  },
  // Add future issues here with their own individually chosen publishAt dates.
]

export function getIssue(slug: string) {
  return issues.find((i) => i.slug === slug)
}

export function issueNumberLabel(issue: Pick<Issue, 'number'>) {
  return `ISSUE ${String(issue.number).padStart(3, '0')}`
}
