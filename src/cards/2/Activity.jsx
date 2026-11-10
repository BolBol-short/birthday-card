import RunnerGame from '../../games/RunnerGame'
import art, { ACCENT } from '../../assets/2'

const sprite = 'h-full w-full object-contain object-bottom select-none'
const Chopper = () => <img src={art.chopperRun} alt="" draggable="false" className={sprite} />
const Luffy = () => <img src={art.luffyChase} alt="" draggable="false" className={`${sprite} -scale-x-100`} /> // figure faces left; flip to chase right
const Barrel = () => <img src={art.barrel} alt="" draggable="false" className={sprite} />
const Escaped = () => <img src={art.chopperPortrait} alt="" className="h-full w-full rounded-lg object-cover object-top" />
const Caught = () => <img src={art.luffyMeat} alt="" className="h-full w-full rounded-lg object-cover" />

/** This person's activity: Chopper runs from a hungry Luffy, printed on poster paper. */
export default function Activity() {
  return (
    // IM Fell has no bold: keep its text unbolded, and set numerals and buttons in the poster face (lining figures)
    <div className="font-fell [font-synthesis:none] [&_b]:font-poster [&_button]:font-poster [&_p.font-extrabold]:font-poster">

      <RunnerGame
        art={{ runner: Chopper, chaser: Luffy, win: Escaped, lose: Caught }}
        obstacles={[Barrel]}
        accent={ACCENT}
        stage="radial-gradient(ellipse at 50% 30%, #EAD7AA, #D6B67C)"
        ground="repeating-linear-gradient(90deg, rgba(42,26,16,.5) 0 12px, transparent 12px 28px), #B48D55"
        goodScore={300}
        labels={{
          hud: '',
          intro: 'Luffy is starving, and Chopper looks a lot like a snack. Jump the barrels.',
          hint: 'Tap the game to jump. On a keyboard, Space works too.',
          start: 'Run!',
          win: 'Chopper got away. Luffy will have to settle for actual meat.',
          lose: 'Luffy caught Chopper. MEEEAT!!!',
        }}
      />
    </div>
  )
}
