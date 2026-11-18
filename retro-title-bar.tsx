'use client'

import { Heart, Minus, Square, Copy, X } from 'lucide-react'

type Props = {
  infoOpen: boolean
  maximised: boolean
  onToggleInfo: () => void
  onToggleMaximise: () => void
  onClose: () => void
}

const controlClass =
  'bevel-out flex size-7 cursor-pointer items-center justify-center border-2 border-burgundy bg-pink-pale text-burgundy hover:bg-cream active:[box-shadow:inset_2px_2px_0_var(--gftr-pink-deep)]'

export function RetroTitleBar({ infoOpen, maximised, onToggleInfo, onToggleMaximise, onClose }: Props) {
  return (
    <div className="titlebar-pink flex items-center gap-2 border-b-[3px] border-burgundy px-2 py-1.5">
      <span
        aria-hidden="true"
        className="bevel-out flex size-7 items-center justify-center border-2 border-burgundy bg-cream text-cherry"
      >
        <Heart className="size-4 fill-cherry" strokeWidth={2.5} />
      </span>
      <p className="min-w-0 flex-1 truncate font-pixel text-base tracking-wider text-cream [text-shadow:2px_2px_0_var(--gftr-burgundy)] sm:text-lg">
        <span aria-hidden="true">♡ </span>GFTR — FIELDNOTES.EXE
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleInfo}
          aria-pressed={!infoOpen}
          aria-controls="gftr-info-strip"
          aria-label={infoOpen ? 'Minimise address bar' : 'Restore address bar'}
          className={controlClass}
        >
          <Minus className="size-4" strokeWidth={3} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onToggleMaximise}
          aria-pressed={maximised}
          aria-label={maximised ? 'Restore window size' : 'Maximise window'}
          className={`${controlClass} hidden sm:flex`}
        >
          {maximised ? (
            <Copy className="size-3.5" strokeWidth={3} aria-hidden="true" />
          ) : (
            <Square className="size-3.5" strokeWidth={3} aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close (the record stays open)"
          className={`${controlClass} bg-cherry text-cream hover:bg-cherry hover:brightness-110`}
        >
          <X className="size-4" strokeWidth={3} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
