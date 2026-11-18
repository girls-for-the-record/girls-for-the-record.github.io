import { NextResponse } from 'next/server'
import { validateNote, type NoteResponse } from '@/lib/notes'

/**
 * Prototype endpoint for "Dear GFTR..." notes.
 *
 * It validates and rate-limits exactly as production would, but there is no
 * inbox connected yet, so it reports `delivered: false` in demo mode. To go
 * live, replace `deliverNote` with a call to a database or form service using
 * server-only credentials, and swap the in-memory limiter for a durable one
 * (e.g. Upstash Redis) — instance memory resets between serverless invocations.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > MAX_PER_WINDOW
}

async function deliverNote(): Promise<boolean> {
  return false
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json<NoteResponse>({ ok: false, message: 'that note got scrambled — please try again.' }, { status: 400 })
  }

  const str = (v: unknown) => (typeof v === 'string' ? v : '')

  // Honeypot: real visitors never see or fill this field.
  if (str(payload.website)) {
    return NextResponse.json<NoteResponse>({ ok: false, message: 'something went wrong.' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json<NoteResponse>(
      { ok: false, message: 'that’s a lot of notes! please wait a few minutes before sending another.' },
      { status: 429 },
    )
  }

  const input = { topic: str(payload.topic), note: str(payload.note), name: str(payload.name), email: str(payload.email) }
  const errors = validateNote(input)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json<NoteResponse>({ ok: false, errors, message: 'please fix the highlighted fields.' }, { status: 422 })
  }

  const delivered = await deliverNote()
  if (delivered) return NextResponse.json<NoteResponse>({ ok: true, delivered: true })
  return NextResponse.json<NoteResponse>({ ok: true, delivered: false, mode: 'demo' })
}
