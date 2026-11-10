import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Reusable endless runner (Chrome offline-dino style). Nothing here is
 * person-specific — pass the art in as props.
 *
 *   <RunnerGame art={{ runner: Chopper, chaser: Luffy }} obstacles={[Barrel, Rock]} />
 *
 * Jump with tap/click, Space, ↑ or W. Hit an obstacle and the chaser catches you.
 * Score = distance; reaching `goodScore` earns the win message.
 * All sizes scale with the stage height, so the physics feel the same on any screen.
 */
const GRAVITY = 8     // stage-heights / s²
const JUMP = 2.83     // stage-heights / s  (apex about half the stage height)

export default function RunnerGame({
  art,
  obstacles = [],
  goodScore = 500,
  accent = 'var(--color-hachi)',
  labels = {},
}) {
  const t = {
    hud: 'Run!',
    intro: 'Something hungry is right behind you. Jump over everything.',
    hint: 'Tap, or press Space / ↑ to jump.',
    start: 'Run', retry: 'Try again',
    win: 'You got away!',
    lose: 'Caught!',
    ...labels,
  }
  const Runner = art.runner
  const Chaser = art.chaser

  const [phase, setPhase] = useState('intro')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [dims, setDims] = useState(null)
  const [obs, setObs] = useState([])

  const stageRef = useRef(null)
  const runnerRef = useRef(null)
  const chaserRef = useRef(null)
  const groundRef = useRef(null)
  const rafRef = useRef(null)
  const s = useRef({})

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])
  useEffect(() => stop, [stop])

  const jump = () => {
    const g = s.current
    if (g.y === 0) g.vy = JUMP * g.H
  }

  useEffect(() => {
    if (phase !== 'playing') return
    const onKey = (e) => {
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); jump() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  const start = () => {
    const stage = stageRef.current
    if (!stage || !obstacles.length) return
    document.activeElement?.blur() // else Space (jump) would "click" the modal's focused close button
    const { width: W, height: H } = stage.getBoundingClientRect()
    const d = { W, H, ground: Math.round(H * .16), cw: Math.round(H * .3), cx: Math.round(W * .26), lh: Math.round(H * .5) }
    s.current = { ...d, y: 0, vy: 0, t: 0, dist: 0, shown: 0, nextIn: W * .9, id: 0, obs: [], last: performance.now() }
    setDims(d); setObs([]); setScore(0); setPhase('playing')

    const loop = (now) => {
      const g = s.current
      const dt = Math.min((now - g.last) / 1000, .05)
      g.last = now; g.t += dt

      const sp = g.W * (.5 + Math.min(.5, g.t * .012)) // px/s, ramps up over ~40s
      g.dist += sp * dt

      g.vy -= GRAVITY * g.H * dt
      g.y = Math.max(0, g.y + g.vy * dt)
      if (g.y === 0) g.vy = 0

      const bob = g.y === 0 ? Math.abs(Math.sin(g.t * 14)) * g.H * .02 : 0
      if (runnerRef.current) runnerRef.current.style.transform = `translateY(${-(g.y + bob)}px)`
      if (chaserRef.current) chaserRef.current.style.transform = `translateY(${-Math.abs(Math.sin(g.t * 14 + 1)) * g.H * .025}px)`
      if (groundRef.current) groundRef.current.style.backgroundPositionX = `${-g.dist}px`

      const sc = Math.floor(g.dist / g.H * 12)
      if (sc !== g.shown) { g.shown = sc; setScore(sc) }

      g.nextIn -= sp * dt
      let changed = false
      if (g.nextIn <= 0) {
        const Obstacle = obstacles[(Math.random() * obstacles.length) | 0]
        const h = Math.round(g.H * (.16 + Math.random() * .08))
        g.obs.push({ id: ++g.id, Obstacle, x: g.W, w: h, h, el: null })
        g.nextIn = sp * (.85 + Math.random() * .9) // always leaves time to land and jump again
        changed = true
      }

      const x0 = g.cx + g.cw * .35, x1 = g.cx + g.cw * .65 // runner hitbox, trimmed (forgiving on purpose)
      for (let i = g.obs.length - 1; i >= 0; i--) {
        const o = g.obs[i]
        o.x -= sp * dt
        if (o.x + o.w < -10) { g.obs.splice(i, 1); changed = true; continue }
        if (o.el) o.el.style.transform = `translateX(${o.x}px)`
        if (x1 > o.x + o.w * .2 && x0 < o.x + o.w * .8 && g.y < o.h * .85) {
          stop(); setBest((b) => Math.max(b, g.shown)); setPhase('over'); return
        }
      }
      if (changed) setObs(g.obs.slice())
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  const won = score >= goodScore
  const panel = 'absolute inset-0 z-5 flex flex-col items-center justify-center ' +
                'gap-[clamp(1px,.8vh,10px)] overflow-auto bg-cream/90 ' +
                'px-3 py-[clamp(4px,1.5vh,16px)] text-center backdrop-blur-[3px]'
  const face = 'h-[clamp(44px,12vh,110px)] w-[clamp(44px,12vh,110px)] shrink-0 animate-bob'
  const lead = 'max-w-[34ch] text-[clamp(10px,2vh,16px)] font-bold text-ink'
  const btn = 'mt-[clamp(1px,.8vh,6px)] shrink-0 rounded-full px-[1.4em] py-[.5em] ' +
              'text-[clamp(11px,1.9vh,15px)] font-bold text-cream transition ' +
              'hover:-translate-y-0.5 hover:brightness-110'

  return (
    <div className="flex h-[clamp(180px,54vh,380px)] flex-col gap-[.4rem]">
      <div className="flex flex-none items-center justify-between text-[clamp(11px,1.2vw,13px)] font-bold text-ink/75">
        <span>{t.hud}</span>
        <span className="tabular-nums">
          distance <b style={{ color: accent }}>{score}</b> · best <b>{best}</b>
        </span>
      </div>

      <div
        ref={stageRef}
        onPointerDown={jump}
        className="relative min-h-0 flex-1 touch-none overflow-hidden rounded-2xl border-2 select-none
                   bg-linear-to-b from-[#BFEAFF] to-[#FFF4D6]"
        style={{ borderColor: accent }}
      >
        {dims && (
          <>
            <div
              ref={groundRef}
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0"
              style={{
                height: dims.ground,
                background: 'repeating-linear-gradient(90deg, rgba(107,74,50,.45) 0 12px, transparent 12px 28px), #E9C98E',
                backgroundSize: '28px 100%', // after `background`, which would reset it; 28px = pattern period, so the scroll loops seamlessly
              }}
            />
            <div ref={chaserRef} className="absolute will-change-transform"
                 style={{ left: dims.W * .01, bottom: dims.ground, width: dims.lh * .9, height: dims.lh }}>
              <Chaser />
            </div>
            <div ref={runnerRef} className="absolute will-change-transform"
                 style={{ left: dims.cx, bottom: dims.ground, width: dims.cw, height: dims.cw }}>
              <Runner />
            </div>
            {obs.map((o) => (
              <div key={o.id} ref={(el) => { o.el = el }} className="absolute left-0 will-change-transform"
                   style={{ bottom: dims.ground, width: o.w, height: o.h, transform: `translateX(${o.x}px)` }}>
                <o.Obstacle />
              </div>
            ))}
          </>
        )}

        {phase === 'intro' && (
          <div className={panel}>
            <div className={face}><Runner /></div>
            <p className={lead}>{t.intro}</p>
            <p className="max-w-[34ch] text-[clamp(9px,1.6vh,13px)] font-medium text-ink/60">{t.hint}</p>
            <button className={btn} style={{ background: accent }} onClick={start}>{t.start}</button>
          </div>
        )}

        {phase === 'over' && (
          <div className={panel}>
            <div className={face}>{won ? <Runner /> : <Chaser />}</div>
            <p className="text-[clamp(15px,3.4vh,34px)] font-extrabold" style={{ color: accent }}>{score} run</p>
            <p className={lead}>{won ? t.win : t.lose}</p>
            <button className={btn} style={{ background: accent }} onClick={start}>{t.retry}</button>
          </div>
        )}
      </div>
    </div>
  )
}
