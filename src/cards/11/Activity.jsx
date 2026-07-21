import CatchGame from '../../games/CatchGame'
import art from '../../assets/11'

/** This person's activity: the catch game, cast with their art. */
export default function Activity() {
  return (
    <CatchGame
      art={{ start: art.cheering, catcher: art.plain, win: art.peace, lose: art.teary }}
      items={['📕', '📗', '📘', '📙', '📖', '🍰', '🍪', '🍩', '🧁', '🍮', '🍡', '🍫']}
      goodScore={10}
    />
  )
}
