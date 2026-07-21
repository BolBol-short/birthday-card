import { useEffect, useRef } from 'react'

/**
 * The window that opens over a dimmed card.  [-]  not  [_]
 * Holds whatever the button points at — a message, a game, anything.
 */
export default function Interactive({ open, title, accent = 'var(--color-hachi)', onClose, children }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-[rgba(18,34,46,.58)]
                 p-[clamp(8px,3vw,40px)] backdrop-blur-md animate-fade"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex max-h-[min(90vh,580px)] w-[min(680px,100%)] flex-col overflow-hidden
                   rounded-[22px] border-[3px] bg-cream animate-pop"
        style={{
          borderColor: accent,
          boxShadow: '0 24px 60px -12px rgba(16,42,58,.45), 0 0 0 6px rgba(255,255,255,.35)',
        }}
      >
        <header
          className="flex flex-none items-center gap-3 py-[clamp(.35rem,1.2vh,.6rem)] pr-[.7rem] pl-4 text-cream"
          style={{ background: accent }}
        >
          <span aria-hidden="true" className="flex flex-none gap-[5px]">
            <i className="h-[9px] w-[9px] rounded-full bg-white/55" />
            <i className="h-[9px] w-[9px] rounded-full bg-white/55" />
            <i className="h-[9px] w-[9px] rounded-full bg-white/55" />
          </span>
          <h2 className="flex-1 text-center text-[clamp(13px,1.5vw,16px)] font-bold">{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full
                       text-cream transition hover:rotate-90 hover:bg-white/25"
          >
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-auto p-[clamp(12px,2.6vw,30px)] text-ink">
          {children}
        </div>
      </div>
    </div>
  )
}
