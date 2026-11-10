import RunnerGame from '../../games/RunnerGame'
import art, { ACCENT } from '../../assets/2'

/** This person's activity: Chopper runs from a hungry Luffy. */
export default function Activity() {
  return (
    <RunnerGame
      art={{ runner: art.runner, chaser: art.chaser }}
      obstacles={art.obstacles}
      accent={ACCENT}
      goodScore={300}
      labels={{
        hud: 'Run, Chopper, run!',
        intro: 'Luffy is starving and Chopper looks like a snack. Jump over the barrels and rocks!',
        start: 'Run!',
        win: 'Chopper made it to the ship! Luffy settles for meat.',
        lose: 'Luffy caught Chopper. MEEEAT!!!',
      }}
    />
  )
}
