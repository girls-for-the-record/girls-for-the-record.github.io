export type Founder = {
  slug: string
  /** Display order on the character-select screen (P1–P4). */
  player: number
  /** null until the real name is supplied. */
  name: string | null
  role: string
  designation: string
  /** null until the founder supplies her own biography. */
  bio: string | null
  researchInterests: string[]
  /** Path to the supplied cartoon avatar in /public. */
  avatar: { src: string | null; alt: string }
  /** Theme colour for this founder's card. */
  accent: 'pink' | 'bubblegum' | 'butter' | 'cherry'
  favouriteTopics?: string[]
  editorialNote?: string
  quotes?: string[]
}

const designation = 'Co-Founder, Researcher & Writer'

export const founders: Founder[] = [
  {
    slug: 'founder-01',
    player: 1,
    name: 'Vidhula',
    role: 'Head of Strategy & Research Direction',
    designation,
    bio: null,
    researchInterests: [],
    avatar: { src: '/founders/vidhula.png', alt: 'Illustrated avatar of Vidhula' },
    accent: 'bubblegum',
  },
  {
    slug: 'founder-02',
    player: 2,
    name: 'Iniya',
    role: 'Head of Research & Publications',
    designation,
    bio: null,
    researchInterests: [],
    avatar: { src: '/founders/iniya.png', alt: 'Illustrated avatar of Iniya' },
    accent: 'butter',
  },
  {
    slug: 'founder-03',
    player: 3,
    name: 'Dheepthi',
    role: 'Head of Editorial & Journalism',
    designation,
    bio: null,
    researchInterests: [],
    avatar: { src: '/founders/dheepthi.png', alt: 'Illustrated avatar of Dheepthi' },
    accent: 'cherry',
  },
  {
    slug: 'founder-04',
    player: 4,
    name: 'Sanjana',
    role: 'Head of Creative & Digital Media',
    designation,
    bio: null,
    researchInterests: [],
    avatar: { src: '/founders/sanjana.png', alt: 'Illustrated avatar of Sanjana' },
    accent: 'pink',
  },
]

export function getFounder(slug: string) {
  return founders.find((f) => f.slug === slug)
}

export function founderDisplayName(founder: Founder | undefined) {
  if (!founder) return 'unknown author'
  return founder.name ?? `[Founder ${String(founder.player).padStart(2, '0')} name]`
}
