/**
 * The inner frame drawn over the background:
 * a hairline inset rule plus four corner brackets.
 */
export default function Border({ accent = 'var(--color-hachi)', inset = 22, corners = true }) {
  const corner = 'absolute w-[clamp(30px,5vw,62px)] h-[clamp(30px,5vw,62px)] border-4 opacity-0 animate-settle'
  const pad = `${inset}px`

  return (
    <div className="pointer-events-none absolute inset-0 z-2" style={{ color: accent }}>
      <span
        className="absolute rounded-[20px] border-2 border-current opacity-0 animate-fadein"
        style={{ inset: pad }}
      />
      {corners && (
        <>
          <span className={`${corner} rounded-tl-[18px] border-r-0 border-b-0 border-current`}
                style={{ top: pad, left: pad, '--dx': '-14px', '--dy': '-14px' }} />
          <span className={`${corner} rounded-tr-[18px] border-l-0 border-b-0 border-current`}
                style={{ top: pad, right: pad, '--dx': '14px', '--dy': '-14px' }} />
          <span className={`${corner} rounded-bl-[18px] border-r-0 border-t-0 border-current`}
                style={{ bottom: pad, left: pad, '--dx': '-14px', '--dy': '14px' }} />
          <span className={`${corner} rounded-br-[18px] border-l-0 border-t-0 border-current`}
                style={{ bottom: pad, right: pad, '--dx': '14px', '--dy': '14px' }} />
        </>
      )}
    </div>
  )
}
