import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * CookingGame — reusable, person-agnostic kitchen game.
 *
 * Loop: a customer arrives with an order (one of `recipes`). Tap ingredients
 * to stack them on the plate. Drag the finished plate onto the customer.
 * Correct dish (ingredient multiset matches the recipe, tap order ignored) =>
 * +1 and the next customer. Wrong => the plate shakes and clears.
 *
 * Lose pressure: each customer has a patience bar that drains; if it empties
 * they leave unserved (no point). An overall `duration`-second timer runs the
 * whole round. Win = reach `goodScore` before the timer ends. Lose = timer
 * hits 0 first.
 *
 * Nothing here knows about any specific person — all art and data come in as
 * props, exactly like CatchGame is cast from a card's Activity.jsx.
 *
 * Props:
 *   accent       string   per-card accent color (hex)
 *   duration     number   total round seconds (default 60)
 *   goodScore    number   orders to fill to win (default 3)
 *   ingredients  [{ id, label, Svg }]        the tappable palette
 *   recipes      [{ id, label, needs:[ids], Svg }]  the dishes
 *   customerSvgs [Svg]     customer components, cycled for variety
 *   labels       { order, win, lose }
 */
export default function CookingGame({
  accent = '#E8623A',
  duration = 60,
  goodScore = 3,
  ingredients = [],
  recipes = [],
  customerSvgs = [],
  labels = {},
}) {
  const L = {
    order: 'Order up!',
    win: 'Kitchen closed — you nailed it!',
    lose: 'Time! The rush got away from you.',
    ...labels,
  }

  const [phase, setPhase] = useState('start') // start | play | win | lose
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [plate, setPlate] = useState([])       // ingredient ids the player added
  const [order, setOrder] = useState(null)     // current recipe
  const [customerIdx, setCustomerIdx] = useState(0)
  const [patience, setPatience] = useState(100)
  const [shake, setShake] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [served, setServed] = useState(false)  // brief "happy" beat between customers

  const plateRef = useRef(null)
  const customerRef = useRef(null)

  const pickRecipe = useCallback(
    () => recipes[Math.floor(Math.random() * recipes.length)] ?? null,
    [recipes]
  )

  /* ----- start / reset ----- */
  const begin = () => {
    setScore(0)
    setTimeLeft(duration)
    setPlate([])
    setCustomerIdx(0)
    setPatience(100)
    setServed(false)
    setOrder(pickRecipe())
    setPhase('play')
  }

  const nextCustomer = useCallback(() => {
    setPlate([])
    setPatience(100)
    setServed(false)
    setCustomerIdx(i => (customerSvgs.length ? (i + 1) % customerSvgs.length : 0))
    setOrder(pickRecipe())
  }, [customerSvgs.length, pickRecipe])

  /* ----- overall countdown ----- */
  useEffect(() => {
    if (phase !== 'play') return
    if (timeLeft <= 0) { setPhase('lose'); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft])

  /* ----- per-customer patience drain ----- */
  useEffect(() => {
    if (phase !== 'play' || served) return
    if (patience <= 0) { nextCustomer(); return }
    const t = setTimeout(() => setPatience(p => Math.max(0, p - 2)), 120)
    return () => clearTimeout(t)
  }, [phase, patience, served, nextCustomer])

  /* ----- win check ----- */
  useEffect(() => {
    if (phase === 'play' && score >= goodScore) setPhase('win')
  }, [score, goodScore, phase])

  /* ----- interactions ----- */
  const addIngredient = (id) => {
    if (phase !== 'play' || served) return
    setPlate(p => [...p, id])
  }
  const clearPlate = () => setPlate([])

  const multisetEqual = (a, b) => {
    if (a.length !== b.length) return false
    const count = {}
    a.forEach(x => (count[x] = (count[x] || 0) + 1))
    for (const x of b) {
      if (!count[x]) return false
      count[x] -= 1
    }
    return true
  }

  const tryServe = () => {
    if (!order) return
    if (plate.length && multisetEqual(plate, order.needs)) {
      setServed(true)
      setScore(s => s + 1)
      setTimeout(nextCustomer, 650) // let the happy beat show
    } else {
      setShake(true)
      setTimeout(() => { setShake(false); setPlate([]) }, 380)
    }
  }

  /* Drag the plate onto the customer. Pointer events cover mouse + touch. */
  const onPlateDown = (e) => {
    if (phase !== 'play' || served) return
    setDragging(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPlateUp = (e) => {
    if (!dragging) return
    setDragging(false)
    const cust = customerRef.current?.getBoundingClientRect()
    if (cust) {
      const x = e.clientX, y = e.clientY
      const hit = x >= cust.left && x <= cust.right && y >= cust.top && y <= cust.bottom
      if (hit) { tryServe(); return }
    }
    // dropped anywhere else — no-op, plate stays as built
  }

  const Ingredient = ({ id }) => {
    const ing = ingredients.find(i => i.id === id)
    if (!ing?.Svg) return null
    const S = ing.Svg
    return <S />
  }

  const OrderDish = () => {
    if (!order?.Svg) return null
    const S = order.Svg
    return <S />
  }

  const CustomerArt = () => {
    const S = customerSvgs[customerIdx]
    return S ? <S /> : null
  }

  /* ---------- start / end screens ---------- */
  if (phase === 'start' || phase === 'win' || phase === 'lose') {
    const isWin = phase === 'win'
    const isLose = phase === 'lose'
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center">
        <div className="w-[clamp(120px,22vh,190px)]">
          {isWin || isLose ? <OrderDishFallback recipes={recipes} won={isWin} /> : <CustomerArt />}
        </div>
        <h3 className="text-[clamp(16px,3.4vh,26px)] font-extrabold text-ink">
          {isWin ? L.win : isLose ? L.lose : 'Ready to cook?'}
        </h3>
        {(isWin || isLose) && (
          <p className="text-[clamp(12px,2vh,16px)] font-semibold text-ink/70">
            You served {score} {score === 1 ? 'order' : 'orders'}.
          </p>
        )}
        {phase === 'start' && (
          <p className="max-w-md text-[clamp(12px,2vh,15px)] leading-relaxed text-ink/70">
            Read the order, tap the ingredients onto the plate, then drag the plate
            to the customer. Keep them happy before the clock runs out.
          </p>
        )}
        <button
          onClick={begin}
          className="mt-1 rounded-full px-6 py-2 text-[clamp(13px,2vh,17px)] font-bold text-cream shadow-lg
                     transition active:scale-95"
          style={{ background: accent }}
        >
          {phase === 'start' ? 'Start cooking' : 'Cook again'}
        </button>
      </div>
    )
  }

  /* ---------- play screen ---------- */
  return (
    <div className="flex h-full w-full flex-col gap-2 p-2 select-none">
      {/* top bar: timer + score */}
      <div className="flex items-center justify-between px-1 text-[clamp(12px,2vh,16px)] font-bold text-ink">
        <span>⏱ {timeLeft}s</span>
        <span>Served {score}/{goodScore}</span>
      </div>

      {/* main play area: customer (left) + counter (right) */}
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(90px,1fr)_1.4fr] gap-2">
        {/* customer with order + patience */}
        <div className="flex min-h-0 flex-col items-center justify-end gap-2">
          <div className="rounded-2xl border-2 bg-cream/90 px-3 py-1.5 shadow"
               style={{ borderColor: accent }}>
            <span className="text-[clamp(11px,1.8vh,15px)] font-bold text-ink">
              {served ? 'Thank you! 🎉' : `${L.order} ${order?.label ?? ''}`}
            </span>
          </div>
          <div
            ref={customerRef}
            className={`w-[clamp(64px,14vh,120px)] transition ${dragging ? 'scale-105' : ''}`}
          >
            <CustomerArt />
          </div>
          {/* patience bar */}
          <div className="h-2 w-[70%] overflow-hidden rounded-full bg-ink/15">
            <div className="h-full rounded-full transition-[width] duration-100"
                 style={{ width: `${patience}%`, background: patience > 30 ? '#5BA887' : '#E23B34' }} />
          </div>
        </div>

        {/* plate + build zone */}
        <div className="flex min-h-0 flex-col items-center justify-end gap-2">
          {/* the draggable plate */}
          <div
            ref={plateRef}
            onPointerDown={onPlateDown}
            onPointerUp={onPlateUp}
            className={`relative flex min-h-[clamp(70px,16vh,140px)] w-[clamp(120px,90%,240px)]
                        cursor-grab items-center justify-center rounded-full border-2 bg-cream/95
                        shadow-inner active:cursor-grabbing ${shake ? 'animate-[shake_.38s]' : ''}`}
            style={{ borderColor: accent, touchAction: 'none' }}
          >
            {plate.length === 0 ? (
              <span className="text-[clamp(10px,1.8vh,13px)] font-semibold text-ink/40">
                tap ingredients →
              </span>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-1 p-2">
                {plate.map((id, i) => (
                  <span key={i} className="h-[clamp(26px,5vh,40px)] w-[clamp(26px,5vh,40px)]">
                    <Ingredient id={id} />
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={clearPlate}
            className="rounded-full border-2 px-3 py-0.5 text-[clamp(10px,1.7vh,13px)] font-bold text-ink/70
                       transition active:scale-95"
            style={{ borderColor: accent }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* ingredient tray */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-ink/5 p-2">
        {ingredients.map(ing => {
          const S = ing.Svg
          return (
            <button
              key={ing.id}
              onClick={() => addIngredient(ing.id)}
              aria-label={ing.label}
              className="h-[clamp(34px,6.5vh,52px)] w-[clamp(34px,6.5vh,52px)] rounded-xl bg-cream/80 p-1
                         shadow transition active:scale-90"
            >
              {S ? <S /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* Small end-screen flourish: show a winning dish, or a sad empty plate on loss. */
function OrderDishFallback({ recipes, won }) {
  if (won && recipes[0]?.Svg) {
    const S = recipes[0].Svg
    return <S />
  }
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <ellipse cx="32" cy="40" rx="24" ry="8" fill="#EFE7D2" />
      <ellipse cx="32" cy="38" rx="18" ry="5" fill="#E0D6BC" />
    </svg>
  )
}
