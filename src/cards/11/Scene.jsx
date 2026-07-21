/** Sky, sun, clouds, sparkles and hills. Purely decorative. */
export default function Scene() {
  const spots = [[12,22],[26,14],[40,30],[58,18],[72,26],[84,15],[18,44],[90,40],[66,46]]
  const cloud = 'absolute rounded-full bg-cream before:absolute before:content-[""] before:bg-inherit ' +
                'before:rounded-full before:w-[58%] before:h-[168%] before:left-[12%] before:-top-[76%] ' +
                'after:absolute after:content-[""] after:bg-inherit after:rounded-full ' +
                'after:w-[42%] after:h-[132%] after:right-[12%] after:-top-[46%] animate-drift'

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-linear-to-b from-sky-top from-0% via-sky-mid via-46% to-sky-low to-100%" />

      <div className="absolute top-[8%] left-1/2 aspect-square w-[min(46vw,520px)] -translate-x-1/2
                      rounded-full animate-breathe"
           style={{ background: 'radial-gradient(circle, rgba(255,253,247,.85) 0%, rgba(255,253,247,0) 68%)' }} />

      <div className={`${cloud} h-[54px] w-[190px] top-[15%] -left-[14%] opacity-95 [animation-duration:62s]`} />
      <div className={`${cloud} h-[40px] w-[128px] top-[30%] -left-[10%] opacity-80 [animation-duration:84s] [animation-delay:9s]`} />
      <div className={`${cloud} h-[62px] w-[232px] top-[52%] -left-[18%] opacity-70 [animation-duration:104s] [animation-delay:4s]`} />
      <div className={`${cloud} h-[34px] w-[104px] top-[8%]  -left-[8%]  opacity-85 [animation-duration:74s] [animation-delay:22s]`} />

      {spots.map(([x, y], i) => (
        <svg key={i} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"
             className="absolute opacity-0 animate-twinkle drop-shadow-[0_0_6px_rgba(255,253,247,.9)]"
             style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * .42}s` }}>
          <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#FFFDF7" />
        </svg>
      ))}

      <div className="absolute bottom-0 left-1/2 h-[26%] w-[150%] -translate-x-1/2
                      rounded-t-[50%] bg-hill-back opacity-85" />
      <div className="absolute -bottom-[4%] left-1/2 h-[22%] w-[190%] -translate-x-1/2
                      rounded-t-[50%] bg-hill-front" />
    </div>
  )
}
