import art, { INK, PAPER } from '../../assets/2'

/** The letter. [ text | photo ] when there is room; the photo drops below on small screens. */
export default function Message({ person }) {
  const first = person?.name?.split(' ')[0] ?? 'friend'
  const bounty = person?.age != null ? (person.age * 1_000_000).toLocaleString('en-US') : '20,000,000'
  // sized off viewport height so the whole letter, sign-off included, fits a phone held sideways
  const para = 'mb-[.6em] font-fell text-[clamp(14px,2.6vh,19px)] leading-[1.45]'

  return (
    <div className="grid items-center gap-[clamp(14px,3vw,30px)] min-[620px]:grid-cols-[minmax(0,1fr)_minmax(0,250px)]" style={{ color: INK }}>
      <div className="min-w-0 max-w-[60ch]">
        <h3 className="mb-[.4em] font-poster text-[clamp(20px,4.4vh,36px)] leading-none">Happy birthday, {first}!</h3>
        <p className={para}>
          The Marines finally put a price on your head: {bounty} Berries, one million for each
          year you've been alive. If you ask me, they're underpaying.
        </p>
        <p className={para}>
          I hope you sleep in today and nobody dares to wake you before noon. When you do get up,
          eat like Luffy at a feast. It's your birthday, so it counts as training.
        </p>
        <p className={para}>
          Go find your own One Piece this year, and if you need a crew, you know where to find me.
        </p>
        <p className="font-fell text-[clamp(15px,2.6vh,20px)] leading-none italic">From - BolBol</p>
      </div>

      <figure className="mx-auto w-full max-w-[300px] rotate-2 p-2.5 pb-2 shadow-[0_10px_20px_-8px_rgba(42,26,16,.55)]"
              style={{ background: PAPER }}>
        <img src={art.cakeWall} alt="Chopper and Luffy eating their way through a cake wall"
             className="aspect-[16/10] w-full object-cover" />
        <figcaption className="mt-1.5 font-fell text-[15px] leading-snug italic">
          Your birthday cake, as Chopper and Luffy would eat it.
        </figcaption>
      </figure>
    </div>
  )
}
