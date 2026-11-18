export const noteTopics = [
  { value: 'research-topic', label: 'a research topic' },
  { value: 'question', label: 'a question' },
  { value: 'feedback', label: 'magazine feedback' },
  { value: 'other', label: 'something else' },
] as const

export const NOTE_LIMITS = { noteMin: 10, noteMax: 1500, nameMax: 60, emailMax: 254 }

export type NoteInput = { topic: string; note: string; name: string; email: string }
export type NoteErrors = Partial<Record<keyof NoteInput, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateNote(input: NoteInput): NoteErrors {
  const errors: NoteErrors = {}
  if (!noteTopics.some((t) => t.value === input.topic)) {
    errors.topic = 'pick what your note is about.'
  }
  const note = input.note.trim()
  if (!note) errors.note = 'your note is empty — tell us what you’re wondering!'
  else if (note.length < NOTE_LIMITS.noteMin) errors.note = `a little more, please (at least ${NOTE_LIMITS.noteMin} characters).`
  else if (note.length > NOTE_LIMITS.noteMax) errors.note = `that’s a long one! keep it under ${NOTE_LIMITS.noteMax} characters.`
  if (input.name.trim().length > NOTE_LIMITS.nameMax) errors.name = `keep your name under ${NOTE_LIMITS.nameMax} characters.`
  const email = input.email.trim()
  if (email && (email.length > NOTE_LIMITS.emailMax || !emailPattern.test(email))) {
    errors.email = 'that email doesn’t look quite right.'
  }
  return errors
}

export type NoteResponse =
  | { ok: true; delivered: true }
  | { ok: true; delivered: false; mode: 'demo' }
  | { ok: false; errors?: NoteErrors; message: string }
