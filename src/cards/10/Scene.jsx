/** A chef's kitchen: warm wall, tiled backsplash, shelf, counter and gentle
 *  steam. Purely decorative, full-bleed behind the card. */
export default function Scene() {
  const steam = [18, 42, 66]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* warm wall wash */}
      <div className="absolute inset-0 bg-linear-to-b from-[#F6E7CE] from-0% via-[#F0D9B8] via-55% to-[#E8C79A] to-100%" />

      {/* hanging pendant glow */}
      <div className="absolute left-1/2 top-[6%] aspect-square w-[min(40vw,440px)] -translate-x-1/2 rounded-full animate-breathe"
           style={{ background: 'radial-gradient(circle, rgba(255,244,220,.9) 0%, rgba(255,244,220,0) 66%)' }} />

      {/* tiled backsplash across the upper-mid wall */}
      <svg className="absolute inset-x-0 top-[26%] h-[22%] w-full opacity-70" preserveAspectRatio="none"
           viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="tiles10" width="10" height="6.6" patternUnits="userSpaceOnUse">
            <rect width="10" height="6.6" fill="#F3E4CC" />
            <rect width="9.2" height="5.8" x=".4" y=".4" rx=".6" fill="#FBF1DE" />
          </pattern>
        </defs>
        <rect width="100" height="20" fill="url(#tiles10)" />
      </svg>

      {/* floating utensil shelf */}
      <div className="absolute left-[8%] right-[8%] top-[22%] h-[3px] rounded-full bg-[#B98A52]/70 shadow" />
      <svg className="absolute left-[14%] top-[13%] h-[9%] w-auto opacity-80" viewBox="0 0 60 40"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* pan */}
        <circle cx="16" cy="20" r="11" fill="none" stroke="#6E5638" strokeWidth="3" />
        <rect x="26" y="18" width="24" height="4" rx="2" fill="#6E5638" />
      </svg>
      <svg className="absolute right-[16%] top-[12%] h-[10%] w-auto opacity-80" viewBox="0 0 40 44"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* whisk */}
        <rect x="18" y="4" width="4" height="16" rx="2" fill="#6E5638" />
        <path d="M20 18 Q10 30 14 42 M20 18 Q20 32 20 42 M20 18 Q30 30 26 42"
              fill="none" stroke="#6E5638" strokeWidth="2.4" strokeLinecap="round" />
      </svg>

      {/* rising steam wisps */}
      {steam.map((x, i) => (
        <svg key={i} className="absolute bottom-[30%] h-[16%] w-auto animate-float opacity-0"
             style={{ left: `${x}%`, animationDelay: `${i * 1.3}s` }}
             viewBox="0 0 20 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10 60 Q2 46 10 34 Q18 22 10 8 Q6 2 10 0"
                fill="none" stroke="#FFFDF7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ))}

      {/* counter across the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[#C99A63]" />
      <div className="absolute inset-x-0 bottom-[24%] h-[4%] bg-[#8A5A34]" />
      <div className="absolute inset-x-0 bottom-[24%] h-[4%] opacity-30"
           style={{ background: 'repeating-linear-gradient(90deg,#6E4522 0 2px,transparent 2px 26px)' }} />
    </div>
  )
}
