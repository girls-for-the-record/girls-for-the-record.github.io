export const brand = {
  name: 'Girls, For the Record',
  abbreviation: 'GFTR',
  founded: 2026,
  tagline: 'a little barbie told us everything.',
  intro: 'a little look into our fieldnotes.',
  description:
    'GFTR is an independent, girl-led research, journalism and digital editorial collective investigating technology, computing, science, mathematics, digital culture, society and other curious questions.',
  /**
   * Official GFTR logo artwork. Drop the supplied file into /public/brand/
   * and set `src` (e.g. '/brand/gftr-logo.png'). While `src` is null the site
   * shows a labelled slot instead of recreating the logo in plain text.
   */
  logo: {
    src: null as string | null,
    alt: 'Girls, For the Record logo',
    width: 480,
    height: 240,
  },
  whatWeDo: [
    'original research & experiments',
    'evidence-based papers & reviews',
    'investigative & editorial articles',
    'a monthly digital magazine',
    'founder-led journalism & interviews',
    'behind-the-scenes from the editorial desk',
  ],
} as const

export type SocialLink = {
  id: 'instagram' | 'linkedin' | 'x'
  label: string
  shortLabel: string
  /** Leave null until the real profile URL is supplied. */
  url: string | null
}

export const socialLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', shortLabel: 'IG', url: null },
  { id: 'linkedin', label: 'LinkedIn', shortLabel: 'in', url: null },
  { id: 'x', label: 'X / Twitter', shortLabel: 'X', url: null },
]

export const navItems = [
  { href: '/', label: 'home' },
  { href: '/the-record', label: 'the record' },
  { href: '/the-girls', label: 'the girls' },
  { href: '/#dear-gftr', label: 'send a note' },
] as const
