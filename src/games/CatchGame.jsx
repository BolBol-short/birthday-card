import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Reusable catch-the-falling-things game.
 * Nothing here is person-specific — pass art and items in as props.
 *
 *   <CatchGame art={{ start, catcher, win, lose }} items={['📕','🍰']} />
 */
export default function CatchGame({
  art,
  items: ITEMS = ['📕', '📗', '📘', '📙', '📖', '🍰', '🍪', '🍩', '🧁', '🍮', '🍡', '🍫'],
  goodScore = 10,
  accent = 'var(--color-hachi)',
  basketColor = 'var(--color-basket)',
  labels = {},
}) {
  const t = {
    hud: 'Catch the books and snacks',
    intro: 'Books and snacks are falling. Catch them all.',
    hint: 'Drag the bar to move. Drop one and the round ends.',
    start: 'Start', retry: 'Try again',
    win: 'Not a single crumb wasted. Elite.',
    lose: 'One got past you. Another go?',
    ...labels,
  }

  const [phase, setPhase] = useState('intro')
  const [score, setScore] = useState(0)
  const [knob, setKnob] = useState(0.5)

  const stageRef = useRef(null)
  const catcherRef = useRef(null)
  const mouthRef = useRef(null)
  const barRef = useRef(null)
  const rafRef = useRef(null)
  const draggingRef = useRef(false)
  const s = useRef({ items: [], x: .5, spawn: 0, last: 0, score: 0, elapsed: 0 })

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])
  useEffect(() => stop, [stop])

  const setX = useCallback((v) => {
    const c = Math.max(.05, Math.min(.95, v))
    s.current.x = c
    setKnob(c)
  }, [])

  const start = () => {
    const stage = stageRef.current
    if (!stage) return
    stage.querySelectorAll('[data-fx]').forEach((n) => n.remove())
    s.current = { items: [], x: .5, spawn: 0, last: performance.now(), score: 0, elapsed: 0 }
    setScore(0); setKnob(.5); setPhase('playing')

    const loop = (now) => {
      const g = s.current
      const dt = Math.min((now - g.last) / 1000, .05)
      g.last = now; g.elapsed += dt

      const rect = stage.getBoundingClientRect()
      const w = rect.width, h = rect.height

      let mouthTop = h - 120, mouthBottom = h - 78
      if (mouthRef.current) {
        const m = mouthRef.current.getBoundingClientRect()
        mouthTop = m.top - rect.top
        mouthBottom = mouthTop + m.height * .7
      }
      const groundY = h - 16

      g.spawn -= dt
      if (g.spawn <= 0) {
        g.spawn = Math.max(.4, 1.05 - g.elapsed * .014)
        const el = document.createElement('div')
        el.dataset.fx = 'item'
        el.className = 'absolute top-0 left-0 will-change-transform pointer-events-none select-none'
        const inner = document.createElement('span')
        inner.textContent = ITEMS[(Math.random() * ITEMS.length) | 0]
        inner.className = 'block text-[clamp(23px,3.2vw,32px)] leading-none animate-float'
        inner.style.animationDuration = `${1.2 + Math.random() * 1.1}s`
        inner.style.animationDelay = `${-Math.random() * 2}s`
        el.appendChild(inner)
        stage.appendChild(el)
        g.items.push({ el, x: .08 + Math.random() * .84, y: -.08, v: .26 + Math.random() * .18 + g.elapsed * .0035 })
      }

      const cw = catcherRef.current?.offsetWidth ?? 110
      if (catcherRef.current) catcherRef.current.style.transform = `translateX(${g.x * w - cw / 2}px)`

      for (let i = g.items.length - 1; i >= 0; i--) {
        const it = g.items[i]
        it.y += it.v * dt
        const px = it.x * w, py = it.y * h
        it.el.style.transform = `translate(${px}px, ${py}px)`

        if (py > mouthTop && py < mouthBottom && Math.abs(px - g.x * w) < cw * .42) {
          it.el.remove(); g.items.splice(i, 1)
          g.score += 1; setScore(g.score)
          const plus = document.createElement('div')
          plus.dataset.fx = 'plus'
          plus.textContent = '+1'
          plus.className = 'absolute top-0 left-0 pointer-events-none font-extrabold ' +
                           'text-[clamp(15px,1.9vw,20px)] text-hachi animate-plus'
          plus.style.textShadow = '0 2px 0 #FFFDF7'
          plus.style.transform = `translate(${px}px, ${py}px)`
          stage.appendChild(plus)
          setTimeout(() => plus.remove(), 750)
          continue
        }

        if (py >= groundY) {
          it.el.style.transition = 'opacity .26s ease-out'
          it.el.style.opacity = '0'
          const dead = it.el
          setTimeout(() => dead.remove(), 280)
          g.items.splice(i, 1)
          stop(); setPhase('over'); return
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  const barTo = (clientX) => {
    const bar = barRef.current
    if (!bar) return
    const r = bar.getBoundingClientRect()
    setX((clientX - r.left) / r.width)
  }
  const onBarDown = (e) => { draggingRef.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); barTo(e.clientX) }
  const onBarMove = (e) => { if (draggingRef.current) barTo(e.clientX) }
  const onBarUp = () => { draggingRef.current = false }
  const onKey = (e) => {
    if (e.key === 'ArrowLeft')  { setX(s.current.x - .06); e.preventDefault() }
    if (e.key === 'ArrowRight') { setX(s.current.x + .06); e.preventDefault() }
  }

  const won = score >= goodScore
  const panel = 'absolute inset-0 z-5 grid place-content-center justify-items-center gap-2 ' +
                'bg-cream/90 p-4 text-center backdrop-blur-[3px]'
  const btn = 'mt-1 rounded-full px-[1.6em] py-[.68em] text-[clamp(12px,1.3vw,15px)] ' +
              'font-bold text-cream transition hover:-translate-y-0.5 hover:brightness-110'

  return (
    <div className="flex h-[min(58vh,400px)] flex-col gap-[.55rem]">
      <div className="flex flex-none items-center justify-between text-[clamp(11px,1.2vw,13px)] font-bold text-ink/75">
        <span>{t.hud}</span>
        <span className="tabular-nums">caught <b className="text-hachi">{score}</b></span>
      </div>

      <div
        ref={stageRef}
        className="relative min-h-0 flex-1 touch-none overflow-hidden rounded-2xl border-2
                   border-hachi/35 bg-linear-to-b from-[#DCF1FB] to-[#F3FBE6]"
      >
        {phase === 'playing' && (
          <div
            ref={catcherRef}
            className="pointer-events-none absolute bottom-6.5 left-0 w-[clamp(90px,14vw,128px)]
                       will-change-transform select-none"
          >
            <svg ref={mouthRef} viewBox="0 0 100 44" aria-hidden="true"
                 className="relative z-2 block h-auto w-full"
                 style={{ color: basketColor, filter: 'drop-shadow(0 2px 0 rgba(255,253,247,.8))' }}>
              <path d="M5 4 L21 39 L79 39 L95 4" fill="none" stroke="currentColor"
                    strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <img src={art.catcher} alt="" draggable="false"
                 className="absolute top-[62%] left-1/2 z-1 h-auto w-[82%] -translate-x-1/2"
                 style={{ filter: 'drop-shadow(0 5px 7px rgba(30,70,95,.22))' }} />
          </div>
        )}

        {/* ground line */}
        <div aria-hidden="true" className="absolute right-2.5 bottom-3.5 left-2.5 h-1 rounded-full"
             style={{ background: 'repeating-linear-gradient(90deg, rgba(107,74,50,.55) 0 12px, transparent 12px 22px)' }} />

        {phase === 'intro' && (
          <div className={panel}>
            <img src={art.start} alt="" className="h-auto w-[clamp(88px,15vw,132px)] animate-bob" />
            <p className="max-w-[26ch] text-[clamp(13px,1.5vw,16px)] font-bold text-ink">{t.intro}</p>
            <p className="text-[clamp(11px,1.2vw,13px)] font-medium text-ink/60">{t.hint}</p>
            <button className={btn} style={{ background: accent }} onClick={start}>{t.start}</button>
          </div>
        )}

        {phase === 'over' && (
          <div className={panel}>
            <img src={won ? art.win : art.lose} alt="" className="h-auto w-[clamp(88px,15vw,132px)] animate-bob" />
            <p className="text-[clamp(22px,3.4vw,34px)] font-extrabold text-hachi">{score} caught</p>
            <p className="max-w-[26ch] text-[clamp(13px,1.5vw,16px)] font-bold text-ink">{won ? t.win : t.lose}</p>
            <button className={btn} style={{ background: accent }} onClick={start}>{t.retry}</button>
          </div>
        )}
      </div>

      <div
        ref={barRef}
        role="slider" tabIndex={0}
        aria-label="Move left and right"
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(knob * 100)}
        onPointerDown={onBarDown} onPointerMove={onBarMove}
        onPointerUp={onBarUp} onPointerCancel={onBarUp} onKeyDown={onKey}
        className="relative flex h-8.5 flex-none cursor-grab touch-none items-center
                   px-4.25 select-none active:cursor-grabbing"
      >
        <div className="h-2.5 w-full rounded-full border-2 border-hachi/35 bg-hachi/15" />
        <div className="pointer-events-none absolute top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
             style={{ left: `${knob * 100}%` }}>
          <span className="absolute top-1/2 left-1/2 h-5.5 w-11 -translate-x-1/2 -translate-y-1/2
                           rounded-full border-[3px] border-cream shadow-md"
                style={{ background: accent }} />
        </div>
      </div>
    </div>
  )
}
