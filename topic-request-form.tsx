'use client'

import { Mail } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { RetroWindow } from '@/components/retro/retro-window'
import { RetroButton } from '@/components/retro/retro-button'
import { NOTE_LIMITS, noteTopics, validateNote, type NoteErrors, type NoteInput, type NoteResponse } from '@/lib/notes'
import { cn } from '@/lib/utils'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'delivered' } | { kind: 'demo' } | { kind: 'error'; message: string }

const emptyNote: NoteInput = { topic: '', note: '', name: '', email: '' }

const fieldClass =
  'bevel-in w-full border-2 border-burgundy bg-white px-3 py-2 text-base text-ink placeholder:text-ink/50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-cherry'

export function TopicRequestForm() {
  const id = useId()
  const [values, setValues] = useState<NoteInput>(emptyNote)
  const [errors, setErrors] = useState<NoteErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const update = (field: keyof NoteInput) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const clientErrors = validateNote(values)
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) {
      const first = Object.keys(clientErrors)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const honeypot = (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? ''
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypot }),
      })
      const data = (await res.json()) as NoteResponse
      if (!data.ok) {
        if (data.errors) setErrors(data.errors)
        setStatus({ kind: 'error', message: data.message })
        return
      }
      if (data.delivered) {
        setStatus({ kind: 'delivered' })
        setValues(emptyNote)
      } else {
        setStatus({ kind: 'demo' })
      }
    } catch {
      setStatus({ kind: 'error', message: 'we couldn’t reach the mailbox. please try again in a moment.' })
    }
  }

  const noteLength = values.note.trim().length
  const errorId = (f: keyof NoteInput) => `${id}-${f}-error`

  return (
    <RetroWindow
      id="dear-gftr"
      title="dear_gftr.txt — notepad"
      icon={<Mail className="size-4" strokeWidth={2.5} />}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-6"
      bodyClassName="p-0 sm:p-0"
      statusBar={
        <>
          <span className="bg-butter px-1.5 text-ink">DEMO MODE</span>
          <span>no inbox connected yet — notes are checked, not stored</span>
        </>
      }
    >
      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="gingham flex flex-col justify-center gap-3 border-b-2 border-burgundy p-6 lg:border-b-0 lg:border-r-2 sm:p-8">
          <h2 id={`${id}-heading`} className="font-headline text-5xl uppercase leading-none text-burgundy sm:text-6xl">
            Dear GFTR...
          </h2>
          <p className="font-display text-xl text-burgundy">got something on your mind? tell the girls.</p>
          <ul className="mt-2 space-y-1 font-pixel text-sm text-ink">
            <li>♡ research topic suggestions</li>
            <li>♡ questions</li>
            <li>♡ magazine feedback</li>
            <li>♡ general ideas</li>
          </ul>
        </div>

        <form noValidate onSubmit={handleSubmit} className="ruled-paper space-y-5 p-5 pl-12 sm:p-8 sm:pl-14">
          <div>
            <label htmlFor={`${id}-topic`} className="mb-1.5 block font-semibold text-burgundy">
              What are you writing about? <span className="text-cherry">*</span>
            </label>
            <select
              id={`${id}-topic`}
              name="topic"
              required
              value={values.topic}
              onChange={(e) => update('topic')(e.target.value)}
              aria-invalid={!!errors.topic}
              aria-describedby={errors.topic ? errorId('topic') : undefined}
              className={cn(fieldClass, 'cursor-pointer font-pixel')}
            >
              <option value="" disabled>
                choose one...
              </option>
              {noteTopics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.topic && <FieldError id={errorId('topic')}>{errors.topic}</FieldError>}
          </div>

          <div>
            <label htmlFor={`${id}-note`} className="mb-1.5 block font-semibold text-burgundy">
              Your note <span className="text-cherry">*</span>
            </label>
            <textarea
              id={`${id}-note`}
              name="note"
              rows={5}
              required
              maxLength={NOTE_LIMITS.noteMax}
              value={values.note}
              onChange={(e) => update('note')(e.target.value)}
              placeholder="dear girls, i've been wondering..."
              aria-invalid={!!errors.note}
              aria-describedby={`${id}-note-count${errors.note ? ` ${errorId('note')}` : ''}`}
              className={cn(fieldClass, 'resize-y leading-relaxed')}
            />
            <div className="mt-1 flex items-start justify-between gap-3">
              {errors.note ? <FieldError id={errorId('note')}>{errors.note}</FieldError> : <span />}
              <span id={`${id}-note-count`} className="shrink-0 font-pixel text-xs text-burgundy">
                {noteLength}/{NOTE_LIMITS.noteMax}
              </span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className="mb-1.5 block font-semibold text-burgundy">
                Name or nickname <span className="font-normal text-ink/70">(optional)</span>
              </label>
              <input
                id={`${id}-name`}
                name="name"
                autoComplete="nickname"
                maxLength={NOTE_LIMITS.nameMax}
                value={values.name}
                onChange={(e) => update('name')(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? errorId('name') : undefined}
                className={fieldClass}
              />
              {errors.name && <FieldError id={errorId('name')}>{errors.name}</FieldError>}
            </div>
            <div>
              <label htmlFor={`${id}-email`} className="mb-1.5 block font-semibold text-burgundy">
                Email <span className="font-normal text-ink/70">(optional)</span>
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={(e) => update('email')(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={`${id}-email-hint${errors.email ? ` ${errorId('email')}` : ''}`}
                className={fieldClass}
              />
              <p id={`${id}-email-hint`} className="mt-1 text-sm text-ink/75">
                only if you’d like a reply.
              </p>
              {errors.email && <FieldError id={errorId('email')}>{errors.email}</FieldError>}
            </div>
          </div>

          {/* honeypot: hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={`${id}-website`}>Leave this empty</label>
            <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <RetroButton type="submit" variant="burgundy" size="lg" disabled={status.kind === 'sending'}>
              {status.kind === 'sending' ? 'sending...' : 'SEND TO THE GIRLS ♡'}
            </RetroButton>
          </div>

          <div aria-live="polite" role="status">
            {status.kind === 'delivered' && (
              <p className="border-2 border-burgundy bg-pink-mist px-3 py-2 font-pixel text-burgundy">
                your little note has been delivered. ♡
              </p>
            )}
            {status.kind === 'demo' && (
              <div className="border-2 border-dashed border-burgundy bg-butter/60 px-3 py-2 text-ink">
                <p className="font-pixel text-burgundy">demo mode: your note passed every check ♡</p>
                <p className="mt-1 text-sm">
                  It has <strong>not</strong> been delivered — the girls haven’t connected their mailbox yet. Nothing was
                  saved or sent.
                </p>
              </div>
            )}
            {status.kind === 'error' && (
              <p className="border-2 border-cherry bg-cream px-3 py-2 font-pixel text-cherry">{status.message}</p>
            )}
          </div>
        </form>
      </div>
    </RetroWindow>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 font-pixel text-sm text-cherry">
      <span aria-hidden="true">✕ </span>
      {children}
    </p>
  )
}
