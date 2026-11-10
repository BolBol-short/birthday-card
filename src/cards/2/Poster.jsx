import { useEffect, useState } from 'react'
import art, { INK, STAMP } from '../../assets/2'

/**
 * A Marine WANTED poster. Every size inside is in cqw (the poster's own width),
 * so the big poster and the small Chopper one share one layout at any scale.
 */

// real foxed paper scan with a deckled alpha edge; drop-shadow follows that edge, box-shadow would not
const paper = (sheet) => ({
  color: INK,
  background: `url(${sheet}) center / 100% 100% no-repeat`,
  filter: 'drop-shadow(0 14px 14px rgba(0,0,0,.55)) drop-shadow(0 2px 3px rgba(0,0,0,.45))',
})

/** The Berry sign: a B with two strokes through it, drawn in the poster's own face. */
export function Berry() {
  return (
    <span aria-hidden="true" className="relative mr-[.08em] inline-block">
      B
      <span className="absolute top-[-.1em] bottom-[-.08em] left-[.27em] w-[.07em] bg-current" />
      <span className="absolute top-[-.1em] bottom-[-.08em] left-[.43em] w-[.07em] bg-current" />
    </span>
  )
}

/** Rolls a number up to `target` like a cash register; lands at once for reduced motion. */
export function useCountUp(target, { ms = 1500, delay = 700 } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target == null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return }
    let raf, t0
    const tick = (now) => {
      t0 ??= now
      const p = Math.min(1, Math.max(0, (now - t0 - delay) / ms))
      setValue(Math.round(target * (1 - (1 - p) ** 4)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms, delay])
  return value
}

export default function Poster({ name, bounty, photo, stamp = false, tilt = '-1.5deg', className = '', style }) {
  const fit = `${Math.min(11, 104 / Math.max(name.length, 1))}cqw` // long names shrink to fit the width
  const Name = stamp ? 'h1' : 'p' // only the birthday poster is the page heading

  return (
    <article
      className={`@container relative aspect-[5/7] opacity-0 animate-hang ${className}`}
      style={{ ...paper(stamp ? art.paperMain : art.paperSmall), '--tilt': tilt, ...style }}
    >
      {/* nail, with a shadow so the paper sits on it rather than in it */}
      <span aria-hidden="true" className="absolute top-[2.2cqw] left-1/2 z-2 h-[3.6cqw] w-[3.6cqw] -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 30%, #9C8F80, #3B332B 60%, #1A1511)', boxShadow: '1px 3px 3px rgba(0,0,0,.55), 0 0 0 .5cqw rgba(60,30,8,.25)' }} />

      <div className="flex h-full flex-col items-center px-[7cqw] pt-[6cqw] pb-[4cqw] text-center">
        <h2 className="font-poster text-[21cqw] leading-[.92] tracking-[.01em]">WANTED</h2>

        <figure className="relative mt-[2.6cqw] aspect-[4/3] w-full overflow-hidden border-[.9cqw]"
                style={{ borderColor: INK, background: '#C7A56B' }}>
          {photo}
        </figure>

        <p className="mt-[2.4cqw] font-fell-sc text-[8.6cqw] leading-none tracking-[.1em]">DEAD OR ALIVE</p>
        <Name className="mt-[2.2cqw] font-poster leading-none uppercase" style={{ fontSize: fit }}>{name}</Name>
        <p className="mt-[1.6cqw] font-poster text-[11.5cqw] leading-none tabular-nums"
           aria-label={`${bounty} Berries`}>
          <Berry />{bounty}-
        </p>
        <p className="mt-auto font-fell-sc text-[6.2cqw] leading-none tracking-[.32em]">MARINE</p>
      </div>

      {stamp && (
        <p className="absolute top-[21%] right-[5cqw] z-3 border-[1.1cqw] border-double px-[2.6cqw] py-[1.2cqw]
                      font-fell-sc text-[7.4cqw] leading-[1.05] tracking-[.06em] opacity-0 mix-blend-multiply
                      animate-stamp [animation-delay:2.1s]"
           style={{ color: STAMP, borderColor: STAMP }}>
          Happy<br />Birthday
        </p>
      )}
    </article>
  )
}
