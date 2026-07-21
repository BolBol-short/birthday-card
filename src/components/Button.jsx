/** A card action button. Opens an Interactive window. */
export default function Button({ icon, children, accent = 'var(--color-hachi)', ...rest }) {
  return (
    <button
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-[3px]
                 bg-cream px-[1.35em] py-[.78em] text-[clamp(12px,1.25vw,15px)] font-bold text-ink
                 transition-transform duration-150 hover:-translate-y-[3px] active:translate-y-px"
      style={{
        borderColor: accent,
        boxShadow: `0 5px 0 -1px ${accent}, 0 12px 22px -10px rgba(20,50,70,.5)`,
      }}
      {...rest}
    >
      {icon && <span aria-hidden="true" className="text-[1.15em] leading-none">{icon}</span>}
      {children}
    </button>
  )
}

/** The row the buttons sit in — bottom right, side by side. */
export function ButtonDock({ children, inset = 22 }) {
  return (
    <nav
      className="absolute z-4 flex flex-row gap-[.6rem] opacity-0 animate-rise [animation-delay:.75s]"
      style={{
        right: `calc(${inset}px + clamp(30px,5vw,62px) + 14px)`,
        bottom: `calc(${inset}px + 10px)`,
      }}
    >
      {children}
    </nav>
  )
}
