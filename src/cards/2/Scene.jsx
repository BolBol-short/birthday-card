/** Open sea: sky, sun glow, drifting clouds, waves and a small sailing ship.
 *  Purely decorative, full-bleed behind the card. */
export default function Scene() {
  const cloud = 'absolute rounded-full bg-cream before:absolute before:content-[""] before:bg-inherit ' +
                'before:rounded-full before:w-[58%] before:h-[168%] before:left-[12%] before:-top-[76%] ' +
                'after:absolute after:content-[""] after:bg-inherit after:rounded-full ' +
                'after:w-[42%] after:h-[132%] after:right-[12%] after:-top-[46%] animate-drift'

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-b from-[#4FBDEB] from-0% via-[#A9E3F8] via-55% to-[#FFF1D0] to-100%" />

      <div className="absolute top-[6%] left-1/2 aspect-square w-[min(44vw,500px)] -translate-x-1/2
                      rounded-full animate-breathe"
           style={{ background: 'radial-gradient(circle, rgba(255,247,214,.9) 0%, rgba(255,247,214,0) 66%)' }} />

      <div className={`${cloud} h-13.5 w-47.5 top-[14%] left-[-14%] opacity-95 [animation-duration:62s]`} />
      <div className={`${cloud} h-10 w-32 top-[30%] left-[-10%] opacity-80 [animation-duration:84s] [animation-delay:9s]`} />
      <div className={`${cloud} h-15.5 w-58 top-[48%] left-[-18%] opacity-70 [animation-duration:104s] [animation-delay:4s]`} />

      {/* Straw Hat ship on the horizon */}
      <svg className="absolute right-[9%] bottom-[7%] z-1 h-[22%] w-auto animate-bob" viewBox="0 0 120 100"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 70 L110 70 Q100 92 70 94 L30 94 Q16 90 10 70 Z" fill="#8A5A34" />
        <rect x="58" y="12" width="4" height="60" fill="#5E3B1E" />
        <path d="M62 16 Q104 30 100 62 L62 62 Z" fill="#FFFDF7" />
        <ellipse cx="84" cy="44" rx="12" ry="3.5" fill="#F0CB62" />
        <path d="M76 44 Q76 32 84 32 Q92 32 92 44 Z" fill="#F8DC84" />
        <path d="M76.5 40 Q84 43 91.5 40 L92 44 Q84 47 76 44 Z" fill="#D93A2B" />
        <path d="M62 12 L82 17 L62 22 Z" fill="#1E1A1A" />
      </svg>

      {/* sea */}
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-linear-to-b from-[#2A9BD8] to-[#0F5E9E]" />
      <div className="absolute inset-x-0 bottom-[28%] h-[1.2%] bg-white/60" />
      <div className="absolute inset-x-0 bottom-0 h-[28%]"
           style={{ background: 'repeating-linear-gradient(180deg, rgba(255,255,255,.2) 0 2px, transparent 2px 24px)' }} />
    </div>
  )
}
