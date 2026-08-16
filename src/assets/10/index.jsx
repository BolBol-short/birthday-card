/**
 * assets/10 — all art for this person, drawn as inline SVG (no photo files).
 *
 * Everything here is a small self-contained React component that renders an
 * <svg>. Ingredients and dishes are sized to sit on a 64x64 tile; the hero,
 * scene chef and customers are larger set-pieces. Colors are literal here
 * (not theme tokens) so the art reads the same wherever it's mounted — the
 * per-card ACCENT below is the one knob the card passes around.
 *
 * Palette kept deliberately small and food-real: warm plate cream, leaf green,
 * tomato red, toasted bun, noodle wheat, nori charcoal.
 */

export const ACCENT = '#E8623A' // warm tomato-clay — this card's accent

/* ---------- tiny helpers ---------- */
const Tile = ({ children, label }) => (
  <svg viewBox="0 0 64 64" role="img" aria-label={label}
       xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    {children}
  </svg>
)

/* ---------- 8 ingredients ---------- */

export const BunSvg = () => (
  <Tile label="Bun">
    <ellipse cx="32" cy="42" rx="24" ry="9" fill="#E7A15A" />
    <path d="M8 40 C8 20 56 20 56 40 Z" fill="#F1B96E" />
    <path d="M8 40 C8 22 56 22 56 40" fill="#F6C983" />
    <circle cx="24" cy="30" r="1.6" fill="#D98A3E" />
    <circle cx="33" cy="27" r="1.6" fill="#D98A3E" />
    <circle cx="41" cy="31" r="1.6" fill="#D98A3E" />
  </Tile>
)

export const PattySvg = () => (
  <Tile label="Patty">
    <ellipse cx="32" cy="36" rx="24" ry="11" fill="#5A3620" />
    <ellipse cx="32" cy="33" rx="24" ry="10" fill="#6E4429" />
    <ellipse cx="26" cy="30" rx="3" ry="1.6" fill="#7E5233" />
    <ellipse cx="38" cy="33" rx="3" ry="1.6" fill="#7E5233" />
  </Tile>
)

export const LettuceSvg = () => (
  <Tile label="Lettuce">
    <path d="M8 38 Q14 24 22 34 Q28 22 34 34 Q40 22 46 34 Q54 26 56 38 Q40 46 32 44 Q20 46 8 38 Z"
          fill="#7CB342" />
    <path d="M12 37 Q20 30 28 37 Q36 30 44 37 Q50 34 52 38"
          fill="none" stroke="#A5D66A" strokeWidth="2.4" strokeLinecap="round" />
  </Tile>
)

export const TomatoSvg = () => (
  <Tile label="Tomato slice">
    <circle cx="32" cy="34" r="20" fill="#E23B34" />
    <circle cx="32" cy="34" r="15" fill="#F26A5E" />
    <g fill="#F9A79B">
      <ellipse cx="32" cy="24" rx="3" ry="6" />
      <ellipse cx="41" cy="34" rx="6" ry="3" />
      <ellipse cx="23" cy="34" rx="6" ry="3" />
      <ellipse cx="32" cy="44" rx="3" ry="6" />
    </g>
  </Tile>
)

export const CucumberSvg = () => (
  <Tile label="Cucumber slice">
    <circle cx="32" cy="34" r="19" fill="#3F7A34" />
    <circle cx="32" cy="34" r="15" fill="#B9DD8E" />
    <g fill="#E7F3CF">
      <ellipse cx="32" cy="30" rx="1.6" ry="3" />
      <ellipse cx="28" cy="36" rx="1.6" ry="3" />
      <ellipse cx="36" cy="36" rx="1.6" ry="3" />
    </g>
  </Tile>
)

export const NoodlesSvg = () => (
  <Tile label="Noodles">
    <path d="M12 30 Q18 20 24 30 Q30 40 36 30 Q42 20 48 30 Q54 40 52 44 Q32 50 12 44 Z"
          fill="#F0CE7A" />
    <g fill="none" stroke="#E0B458" strokeWidth="2" strokeLinecap="round">
      <path d="M16 32 Q22 24 28 32" />
      <path d="M30 32 Q36 24 42 32" />
      <path d="M20 40 Q30 34 44 40" />
    </g>
  </Tile>
)

export const EggSvg = () => (
  <Tile label="Egg">
    <ellipse cx="32" cy="36" rx="22" ry="15" fill="#FCFCF4" />
    <ellipse cx="34" cy="34" rx="9" ry="8" fill="#FFC53D" />
    <ellipse cx="31" cy="31" rx="3" ry="2.4" fill="#FFDC80" />
  </Tile>
)

export const NoriSvg = () => (
  <Tile label="Nori">
    <rect x="16" y="14" width="32" height="36" rx="3" fill="#1F3026" />
    <rect x="16" y="14" width="32" height="36" rx="3" fill="none"
          stroke="#335040" strokeWidth="1" opacity=".5" />
    <g fill="#2C4636">
      <rect x="21" y="20" width="7" height="7" rx="1" />
      <rect x="36" y="20" width="7" height="7" rx="1" />
      <rect x="28" y="33" width="7" height="7" rx="1" />
    </g>
  </Tile>
)

/* ---------- 3 finished dishes ---------- */

export const BurgerSvg = () => (
  <Tile label="Burger">
    <path d="M12 26 C12 12 52 12 52 26 Z" fill="#F6C983" />
    <circle cx="26" cy="20" r="1.4" fill="#D98A3E" />
    <circle cx="36" cy="18" r="1.4" fill="#D98A3E" />
    <rect x="11" y="26" width="42" height="5" rx="2.5" fill="#7CB342" />
    <ellipse cx="32" cy="35" rx="21" ry="6" fill="#6E4429" />
    <rect x="12" y="40" width="40" height="7" rx="3.5" fill="#E7A15A" />
  </Tile>
)

export const SaladSvg = () => (
  <Tile label="Salad">
    <path d="M8 34 Q32 20 56 34 Q56 48 32 50 Q8 48 8 34 Z" fill="#EFE7D2" />
    <path d="M14 34 Q20 26 26 34 Q32 26 38 34 Q44 26 50 34 Q44 44 32 44 Q20 44 14 34 Z"
          fill="#7CB342" />
    <circle cx="24" cy="36" r="3.4" fill="#E23B34" />
    <circle cx="40" cy="37" r="3" fill="#B9DD8E" stroke="#3F7A34" strokeWidth="1" />
    <circle cx="32" cy="40" r="2.6" fill="#E23B34" />
  </Tile>
)

export const RamenSvg = () => (
  <Tile label="Ramen">
    <path d="M10 32 Q32 22 54 32 Q52 50 32 52 Q12 50 10 32 Z" fill="#C0392B" />
    <path d="M14 33 Q32 26 50 33 Q48 46 32 47 Q16 46 14 33 Z" fill="#E8A34A" />
    <path d="M18 34 Q26 30 34 34 Q42 30 48 34" fill="none"
          stroke="#F0CE7A" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="24" cy="35" rx="5" ry="4.4" fill="#FCFCF4" />
    <ellipse cx="24" cy="35" rx="2.2" ry="2" fill="#FFC53D" />
    <rect x="34" y="29" width="6" height="9" rx="1" fill="#1F3026" />
  </Tile>
)

/* ---------- customers (set-pieces) ---------- */

const Customer = ({ skin, hair, shirt, label }) => (
  <svg viewBox="0 0 80 100" role="img" aria-label={label}
       xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M20 100 Q20 66 40 66 Q60 66 60 100 Z" fill={shirt} />
    <rect x="30" y="56" width="20" height="16" rx="7" fill={skin} />
    <circle cx="40" cy="42" r="18" fill={skin} />
    <path d="M22 40 Q22 20 40 20 Q58 20 58 40 Q58 30 40 28 Q22 30 22 40 Z" fill={hair} />
    <circle cx="33" cy="43" r="2.4" fill="#2B2B2B" />
    <circle cx="47" cy="43" r="2.4" fill="#2B2B2B" />
    <path d="M34 51 Q40 55 46 51" fill="none" stroke="#B5533E"
          strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="30" cy="49" r="3" fill="#F3A9A0" opacity=".6" />
    <circle cx="50" cy="49" r="3" fill="#F3A9A0" opacity=".6" />
  </svg>
)

export const Customer1 = () => <Customer skin="#F2C9A0" hair="#3A2A20" shirt="#4C7FB0" label="Customer" />
export const Customer2 = () => <Customer skin="#E7B48A" hair="#6B4A2A" shirt="#C0693F" label="Customer" />
export const Customer3 = () => <Customer skin="#F4D2B0" hair="#25201C" shirt="#5BA887" label="Customer" />

/* ---------- hero (used on the card front) ---------- */

export const HeroChef = () => (
  <svg viewBox="0 0 120 140" role="img" aria-label="Chef"
       xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M34 140 Q34 84 60 84 Q86 84 86 140 Z" fill="#FCFCF4" />
    <path d="M46 96 L60 108 L74 96 L74 120 L46 120 Z" fill={ACCENT} opacity=".9" />
    <rect x="48" y="72" width="24" height="20" rx="9" fill="#F2C9A0" />
    <circle cx="60" cy="56" r="24" fill="#F2C9A0" />
    <circle cx="51" cy="55" r="3" fill="#2B2B2B" />
    <circle cx="69" cy="55" r="3" fill="#2B2B2B" />
    <path d="M52 64 Q60 70 68 64" fill="none" stroke="#B5533E"
          strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="47" cy="61" r="4" fill="#F3A9A0" opacity=".6" />
    <circle cx="73" cy="61" r="4" fill="#F3A9A0" opacity=".6" />
    <path d="M36 40 Q36 30 48 30 Q52 22 60 22 Q68 22 72 30 Q84 30 84 40 Q84 46 78 46 L42 46 Q36 46 36 40 Z"
          fill="#FFFFFF" />
    <rect x="42" y="44" width="36" height="6" rx="3" fill="#EFEFE7" />
  </svg>
)

/**
 * Named exports collected so `import art from '../../assets/10'` gives one
 * object, matching id 11's `art.hero` style access.
 */
const art = {
  accent: ACCENT,
  hero: HeroChef,
  ingredients: {
    bun: BunSvg, patty: PattySvg, lettuce: LettuceSvg, tomato: TomatoSvg,
    cucumber: CucumberSvg, noodles: NoodlesSvg, egg: EggSvg, nori: NoriSvg,
  },
  dishes: { burger: BurgerSvg, salad: SaladSvg, ramen: RamenSvg },
  customers: [Customer1, Customer2, Customer3],
}

export default art
