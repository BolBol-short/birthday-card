import CookingGame from '../../games/CookingGame'
import {
  ACCENT,
  BunSvg, PattySvg, LettuceSvg, TomatoSvg, CucumberSvg, NoodlesSvg, EggSvg, NoriSvg,
  BurgerSvg, SaladSvg, RamenSvg,
  Customer1, Customer2, Customer3,
} from '../../assets/10'

/** This person's activity: the cooking game, cast with their SVG art. */
export default function Activity() {
  const ingredients = [
    { id: 'bun',      label: 'Bun',      Svg: BunSvg },
    { id: 'patty',    label: 'Patty',    Svg: PattySvg },
    { id: 'lettuce',  label: 'Lettuce',  Svg: LettuceSvg },
    { id: 'tomato',   label: 'Tomato',   Svg: TomatoSvg },
    { id: 'cucumber', label: 'Cucumber', Svg: CucumberSvg },
    { id: 'noodles',  label: 'Noodles',  Svg: NoodlesSvg },
    { id: 'egg',      label: 'Egg',      Svg: EggSvg },
    { id: 'nori',     label: 'Nori',     Svg: NoriSvg },
  ]

  const recipes = [
    { id: 'burger', label: 'Burger', needs: ['bun', 'patty', 'lettuce'],       Svg: BurgerSvg },
    { id: 'salad',  label: 'Salad',  needs: ['lettuce', 'tomato', 'cucumber'], Svg: SaladSvg },
    { id: 'ramen',  label: 'Ramen',  needs: ['noodles', 'egg', 'nori'],        Svg: RamenSvg },
  ]

  return (
    <CookingGame
      accent={ACCENT}
      duration={90}
      goodScore={3}
      ingredients={ingredients}
      recipes={recipes}
      customerSvgs={[Customer1, Customer2, Customer3]}
      labels={{
        order: 'One',
        win: 'Kitchen closed — you smashed the rush!',
        lose: 'Time! The orders piled up.',
      }}
    />
  )
}