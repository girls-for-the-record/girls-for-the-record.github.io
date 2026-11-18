export const paperTypes = [
  'Original research',
  'Evidence-based review',
  'Data analysis',
  'Investigative feature',
  'Editorial article',
] as const
export type PaperType = (typeof paperTypes)[number]

export const topics = ['technology', 'computing', 'science', 'mathematics', 'digital culture', 'society'] as const
export type Topic = (typeof topics)[number]

export type Paper = {
  slug: string
  /** True while this entry is a wireframe placeholder awaiting real content. */
  placeholder: boolean
  title: string
  author: string
  issueSlug: string | null
  publishedAt: string
  topic: Topic
  type: PaperType
  abstract: string
  body: { heading: string; paragraphs: string[] }[]
  figures: { id: string; caption: string; src: string | null }[]
  references: { label: string; url?: string }[]
}

const placeholderAbstract =
  'Abstract placeholder. The author will supply a short summary of the question, method and findings here.'

const placeholderBody = [
  { heading: 'Introduction', paragraphs: [] },
  { heading: 'Method', paragraphs: [] },
  { heading: 'Findings', paragraphs: [] },
  { heading: 'Discussion', paragraphs: [] },
]

export const papers: Paper[] = [
  {
    slug: 'placeholder-paper-01',
    placeholder: true,
    title: 'Paper Title Placeholder 01',
    author: 'founder-01',
    issueSlug: 'issue-001-where-are-the-women',
    publishedAt: '2026-12-03T12:00:00+00:00',
    topic: 'technology',
    type: 'Investigative feature',
    abstract: placeholderAbstract,
    body: placeholderBody,
    figures: [{ id: 'fig-1', caption: 'Figure 1 — caption to be supplied', src: null }],
    references: [],
  },
  {
    slug: 'placeholder-paper-02',
    placeholder: true,
    title: 'Paper Title Placeholder 02',
    author: 'founder-02',
    issueSlug: 'issue-001-where-are-the-women',
    publishedAt: '2026-12-03T12:00:00+00:00',
    topic: 'computing',
    type: 'Data analysis',
    abstract: placeholderAbstract,
    body: placeholderBody,
    figures: [{ id: 'fig-1', caption: 'Figure 1 — chart to be supplied', src: null }],
    references: [],
  },
  {
    slug: 'placeholder-paper-03',
    placeholder: true,
    title: 'Paper Title Placeholder 03',
    author: 'founder-03',
    issueSlug: 'issue-001-where-are-the-women',
    publishedAt: '2026-12-03T12:00:00+00:00',
    topic: 'society',
    type: 'Evidence-based review',
    abstract: placeholderAbstract,
    body: placeholderBody,
    figures: [],
    references: [],
  },
  {
    slug: 'placeholder-paper-04',
    placeholder: true,
    title: 'Paper Title Placeholder 04',
    author: 'founder-04',
    issueSlug: 'issue-001-where-are-the-women',
    publishedAt: '2026-12-03T12:00:00+00:00',
    topic: 'digital culture',
    type: 'Editorial article',
    abstract: placeholderAbstract,
    body: placeholderBody,
    figures: [{ id: 'fig-1', caption: 'Figure 1 — illustration to be supplied', src: null }],
    references: [],
  },
]

export function getPaper(slug: string) {
  return papers.find((p) => p.slug === slug)
}
