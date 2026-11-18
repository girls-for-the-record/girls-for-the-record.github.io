export const otrTabs = [
  { id: 'group-chat', label: 'the group chat' },
  { id: 'drafts', label: 'drafts & doodles' },
  { id: 'rabbit-holes', label: 'research rabbit holes' },
  { id: 'final-reveal', label: 'final reveal' },
] as const
export type OtrTabId = (typeof otrTabs)[number]['id']

export type OtrEntry = {
  id: string
  issueSlug: string
  tab: OtrTabId
  kind: 'chat' | 'note' | 'polaroid' | 'draft' | 'card'
  /** founder slug */
  author?: string
  title?: string
  /**
   * Wrap anything that must be hidden in [[double brackets]] — it renders as a
   * redaction bar and the original text is never sent to the page.
   */
  body: string
  caption?: string
  image?: string | null
  /** Only entries that are approved AND have every founder's consent are published. */
  approved: boolean
  consentConfirmed: boolean
  /** Marks wireframe content so it is labelled on screen. */
  illustrative: boolean
}

const issueSlug = 'issue-001-where-are-the-women'

export const offTheRecord: OtrEntry[] = [
  {
    id: 'chat-1',
    issueSlug,
    tab: 'group-chat',
    kind: 'chat',
    author: 'founder-01',
    body: 'Approved group-chat excerpt placeholder — the real message will appear here.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'chat-2',
    issueSlug,
    tab: 'group-chat',
    kind: 'chat',
    author: 'founder-02',
    body: 'Placeholder reply. Personal details can be redacted like this: [[private detail]].',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'chat-3',
    issueSlug,
    tab: 'group-chat',
    kind: 'chat',
    author: 'founder-03',
    body: 'Placeholder message — a third approved excerpt.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'chat-4',
    issueSlug,
    tab: 'group-chat',
    kind: 'chat',
    author: 'founder-04',
    body: 'Placeholder message — a fourth approved excerpt.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'chat-unapproved',
    issueSlug,
    tab: 'group-chat',
    kind: 'chat',
    author: 'founder-01',
    body: 'This entry is not approved, so it never renders.',
    approved: false,
    consentConfirmed: false,
    illustrative: true,
  },
  {
    id: 'draft-1',
    issueSlug,
    tab: 'drafts',
    kind: 'polaroid',
    title: 'rejected cover idea',
    body: 'Slot for a rejected cover design.',
    caption: 'caption placeholder',
    image: null,
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'draft-2',
    issueSlug,
    tab: 'drafts',
    kind: 'note',
    title: 'brainstorm.txt',
    body: 'Slot for brainstorming notes from an early meeting.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'draft-3',
    issueSlug,
    tab: 'drafts',
    kind: 'draft',
    title: 'early draft — page 1',
    body: 'Slot for a miniature preview of an early draft.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'rabbit-1',
    issueSlug,
    tab: 'rabbit-holes',
    kind: 'card',
    title: 'research discovery',
    author: 'founder-02',
    body: 'Slot for a surprising discovery found while researching the issue.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'rabbit-2',
    issueSlug,
    tab: 'rabbit-holes',
    kind: 'card',
    title: 'editorial decision',
    author: 'founder-03',
    body: 'Slot for a note on why something made the cut (or didn’t).',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'rabbit-3',
    issueSlug,
    tab: 'rabbit-holes',
    kind: 'polaroid',
    title: 'sketch',
    body: 'Slot for a photograph or sketch.',
    caption: 'caption placeholder',
    image: null,
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
  {
    id: 'reveal-1',
    issueSlug,
    tab: 'final-reveal',
    kind: 'note',
    title: 'the evolution of the issue',
    body: 'Slot for the story of how the issue came together, from first idea to final cover.',
    approved: true,
    consentConfirmed: true,
    illustrative: true,
  },
]

export function getPublishableEntries(slug: string) {
  return offTheRecord
    .filter((e) => e.issueSlug === slug && e.approved && e.consentConfirmed)
    .map((e) => ({ ...e, body: redact(e.body) }))
}

/** Replaces [[...]] with a fixed token so redacted text never reaches the client. */
function redact(text: string) {
  return text.replace(/\[\[[^\]]*\]\]/g, '[[REDACTED]]')
}
