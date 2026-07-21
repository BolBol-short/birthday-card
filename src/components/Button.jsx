/** A card action button. Icon only — the label becomes its accessible name. */
export default function Button({ icon, label, accent = 'var(--color-hachi)', ...rest }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-[clamp(38px,4.4vw,52px)] w-[clamp(38px,4.4vw,52px)] place-items-center
                 rounded-full border-[3px] bg-cream text-[clamp(15px,1.8vw,21px)] text-ink
                 transition-transform duration-150 hover:-translate-y-0.75 active:translate-y-px"
      style={{
        borderColor: accent,
        boxShadow: `0 5px 0 -1px ${accent}, 0 12px 22px -10px rgba(20,50,70,.5)`,
      }}
      {...rest}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}

/** The column the buttons sit in — top right, stacked. */
export function ButtonDock({ children, inset = 22 }) {
  return (
    <nav
      className="absolute z-4 flex flex-col gap-[.6rem] opacity-0 animate-rise [animation-delay:.75s]"
      style={{
        right: `calc(${inset}px + 10px)`,
        top: `calc(${inset}px + clamp(30px,5vw,62px) + 14px)`,
      }}
    >
      {children}
    </nav>
  )
}