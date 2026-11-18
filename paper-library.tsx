'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ResearchPaperCard } from '@/components/record/research-paper-card'
import { RetroButton } from '@/components/retro/retro-button'
import { founderDisplayName, founders } from '@/lib/data/founders'
import { paperTypes, papers, topics } from '@/lib/data/papers'

const selectClass =
  'bevel-in min-h-11 w-full cursor-pointer border-2 border-burgundy bg-white px-2 font-pixel text-sm text-ink'

export function PaperLibrary() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('all')
  const [author, setAuthor] = useState('all')
  const [type, setType] = useState('all')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return papers.filter((p) => {
      if (topic !== 'all' && p.topic !== topic) return false
      if (author !== 'all' && p.author !== author) return false
      if (type !== 'all' && p.type !== type) return false
      if (!q) return true
      return [p.title, p.abstract, p.topic, p.type].some((s) => s.toLowerCase().includes(q))
    })
  }, [query, topic, author, type])

  const filtered = query || topic !== 'all' || author !== 'all' || type !== 'all'

  return (
    <div className="flex flex-col gap-5">
      <div role="search" className="grid gap-3 border-2 border-burgundy bg-pink-mist p-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="paper-search" className="mb-1 block font-pixel text-xs uppercase text-burgundy">
            search
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-burgundy" />
            <input
              id="paper-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="find a paper..."
              className="bevel-in min-h-11 w-full border-2 border-burgundy bg-white pl-8 pr-2 text-ink placeholder:text-ink/50"
            />
          </div>
        </div>
        <div>
          <label htmlFor="paper-topic" className="mb-1 block font-pixel text-xs uppercase text-burgundy">
            topic
          </label>
          <select id="paper-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={selectClass}>
            <option value="all">all topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="paper-author" className="mb-1 block font-pixel text-xs uppercase text-burgundy">
            author
          </label>
          <select id="paper-author" value={author} onChange={(e) => setAuthor(e.target.value)} className={selectClass}>
            <option value="all">all authors</option>
            {founders.map((f) => (
              <option key={f.slug} value={f.slug}>
                {founderDisplayName(f)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="paper-type" className="mb-1 block font-pixel text-xs uppercase text-burgundy">
            type
          </label>
          <select id="paper-type" value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="all">all types</option>
            {paperTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <RetroButton
          variant="cream"
          disabled={!filtered}
          onClick={() => {
            setQuery('')
            setTopic('all')
            setAuthor('all')
            setType('all')
          }}
        >
          reset
        </RetroButton>
      </div>

      <p aria-live="polite" className="font-pixel text-sm text-burgundy">
        {results.length} {results.length === 1 ? 'paper' : 'papers'} found
      </p>

      {results.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <ResearchPaperCard paper={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-2 border-dashed border-burgundy bg-cream p-6 text-center font-pixel text-burgundy">
          nothing on the record matches that yet ♡
        </p>
      )}
    </div>
  )
}
