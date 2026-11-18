'use client'

import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, ChevronLeft, ChevronRight, Download, Expand, FileText, Shrink } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { MagazinePage } from '@/components/record/magazine-page'
import { RetroButton, retroButtonClass } from '@/components/retro/retro-button'
import { founderDisplayName, getFounder } from '@/lib/data/founders'
import type { Issue } from '@/lib/data/issues'
import { cn } from '@/lib/utils'

export function MagazineReader({ issue }: { issue: Issue }) {
  const pages = issue.sections
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [mode, setMode] = useState<'magazine' | 'article'>('magazine')
  const [fsSupported, setFsSupported] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const swipeStart = useRef<number | null>(null)

  useEffect(() => {
    setFsSupported(!!document.fullscreenEnabled)
    const onChange = () => setIsFullscreen(document.fullscreenElement === frameRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const go = (delta: number) => {
    const next = Math.min(pages.length - 1, Math.max(0, index + delta))
    if (next === index) return
    setDirection(delta)
    setIndex(next)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeStart.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  const toggleFullscreen = async () => {
    if (!frameRef.current) return
    if (document.fullscreenElement) await document.exitFullscreen()
    else await frameRef.current.requestFullscreen()
  }

  const current = pages[index]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 border-2 border-burgundy bg-pink p-2" role="toolbar" aria-label="Reader controls">
        <div className="flex" role="group" aria-label="Reading mode">
          <RetroButton size="sm" variant={mode === 'magazine' ? 'burgundy' : 'cream'} aria-pressed={mode === 'magazine'} onClick={() => setMode('magazine')}>
            <BookOpen className="size-4" aria-hidden="true" /> magazine
          </RetroButton>
          <RetroButton size="sm" variant={mode === 'article' ? 'burgundy' : 'cream'} aria-pressed={mode === 'article'} onClick={() => setMode('article')}>
            <FileText className="size-4" aria-hidden="true" /> READ AS ARTICLE
          </RetroButton>
        </div>
        {mode === 'magazine' && (
          <RetroButton size="sm" variant="cream" onClick={toggleFullscreen} disabled={!fsSupported}>
            {isFullscreen ? <Shrink className="size-4" aria-hidden="true" /> : <Expand className="size-4" aria-hidden="true" />}
            {isFullscreen ? 'exit fullscreen' : 'fullscreen'}
          </RetroButton>
        )}
        <div className="ml-auto flex items-center gap-2">
          {issue.pdfUrl ? (
            <a href={issue.pdfUrl} download className={retroButtonClass({ size: 'sm', variant: 'butter' })}>
              <Download className="size-4" aria-hidden="true" /> download pdf
            </a>
          ) : (
            <>
              <RetroButton size="sm" variant="butter" disabled aria-describedby="pdf-note">
                <Download className="size-4" aria-hidden="true" /> pdf
              </RetroButton>
              <span id="pdf-note" className="font-pixel text-xs text-burgundy">
                pdf available once the issue is published
              </span>
            </>
          )}
        </div>
      </div>

      {mode === 'magazine' ? (
        <div
          ref={frameRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-roledescription="magazine reader"
          aria-label={`${issue.title} — use left and right arrow keys to turn pages`}
          className={cn(
            'gingham relative flex touch-pan-y flex-col items-center gap-4 border-[3px] border-burgundy p-4 sm:p-8',
            isFullscreen && 'justify-center overflow-auto',
          )}
        >
          <div className="relative w-full max-w-md [perspective:1600px]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ rotateY: d > 0 ? 70 : -70, opacity: 0 }),
                  center: { rotateY: 0, opacity: 1 },
                  exit: (d: number) => ({ rotateY: d > 0 ? -70 : 70, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.45, 0.05, 0.3, 1] }}
                style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}
                className="aspect-[3/4] w-full overflow-hidden border-[3px] border-ink bg-cream shadow-[8px_8px_0_var(--gftr-ink)]"
              >
                <MagazinePage issue={issue} section={current} pageNumber={index + 1} />
              </motion.div>
            </AnimatePresence>

            {index < pages.length - 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Turn page forward"
                className="group absolute bottom-0 right-0 hidden size-16 cursor-pointer sm:block"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[3px] right-[3px] size-0 bg-[linear-gradient(135deg,var(--gftr-pink-pale)_50%,transparent_50%)] shadow-[-2px_-2px_4px_rgb(0_0_0/0.25)] transition-all duration-200 group-hover:size-12 group-focus-visible:size-12"
                />
              </button>
            )}
          </div>

          <div className="flex w-full max-w-md items-center justify-between gap-3">
            <RetroButton size="lg" variant="pink" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page">
              <ChevronLeft className="size-5" aria-hidden="true" /> prev
            </RetroButton>
            <p className="font-pixel text-burgundy" aria-live="polite">
              page {index + 1} / {pages.length}
            </p>
            <RetroButton size="lg" variant="pink" onClick={() => go(1)} disabled={index === pages.length - 1} aria-label="Next page">
              next <ChevronRight className="size-5" aria-hidden="true" />
            </RetroButton>
          </div>

          <label className="flex w-full max-w-md items-center gap-2 font-pixel text-sm text-burgundy">
            <span className="shrink-0">jump to</span>
            <select
              value={index}
              onChange={(e) => {
                const n = Number(e.target.value)
                setDirection(n > index ? 1 : -1)
                setIndex(n)
              }}
              className="bevel-in min-h-10 w-full cursor-pointer border-2 border-burgundy bg-white px-2 text-ink"
            >
              {pages.map((p, i) => (
                <option key={p.id} value={i}>
                  {i + 1}. {p.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <article className="mx-auto w-full max-w-prose border-[3px] border-burgundy bg-cream p-6 sm:p-10">
          <p className="font-pixel text-sm text-cherry">{issue.eyebrow}</p>
          <h2 className="font-headline text-5xl uppercase leading-[0.9] text-burgundy">{issue.title}</h2>
          <p className="mt-3 leading-relaxed text-ink">{issue.description}</p>
          <nav aria-label="Issue contents" className="mt-6 border-y-2 border-burgundy py-3">
            <ol className="list-decimal space-y-1 pl-6 text-ink">
              {pages.slice(1).map((s) => (
                <li key={s.id}>
                  <a href={`#article-${s.id}`} className="underline decoration-pink decoration-2 underline-offset-2 hover:text-cherry">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {pages.slice(1).map((s) => (
            <section key={s.id} id={`article-${s.id}`} className="mt-8 scroll-mt-6">
              <h3 className="font-display text-2xl text-burgundy">{s.title}</h3>
              {s.author && <p className="font-pixel text-sm text-cherry">by {founderDisplayName(getFounder(s.author))}</p>}
              {s.body.length > 0 ? (
                s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-ink">
                    {p}
                  </p>
                ))
              ) : (
                <p className="mt-2 border-l-4 border-pink pl-3 italic text-ink/70">Content placeholder — text will be supplied before publication.</p>
              )}
              {s.references?.map((r) => (
                <p key={r.label} className="mt-1 text-sm">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {r.label}
                    </a>
                  ) : (
                    r.label
                  )}
                </p>
              ))}
            </section>
          ))}
        </article>
      )}
    </div>
  )
}
