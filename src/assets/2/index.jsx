/**
 * assets/2 — One Piece art, drawn as inline SVG (my own simple chibi drawings,
 * not official artwork). Luffy chases Chopper in the runner game.
 */

export const ACCENT = '#E0452F' // Luffy's vest red — this card's accent

const SKIN = '#F3C79A'
const HAIR = '#1E1A1A'
const Svg = ({ viewBox, label, children }) => (
  <svg viewBox={viewBox} role="img" aria-label={label}
       xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    {children}
  </svg>
)

/* ---------- Luffy ---------- */

// Head + straw hat in a 100x100 box. `hungry` swaps the grin for a drooling open mouth.
const LuffyHead = ({ hungry }) => (
  <g>
    <circle cx="50" cy="44" r="27" fill={HAIR} />
    <circle cx="26" cy="52" r="4.5" fill={SKIN} />
    <circle cx="74" cy="52" r="4.5" fill={SKIN} />
    <circle cx="50" cy="50" r="24" fill={SKIN} />
    <ellipse cx="41" cy="50" rx="2.6" ry="3.6" fill="#2B2B2B" />
    <ellipse cx="59" cy="50" rx="2.6" ry="3.6" fill="#2B2B2B" />
    <path d="M58 54 L58.5 60 M56 56.5 L61 57.5" stroke="#B5533E" strokeWidth="1.4"
          strokeLinecap="round" fill="none" />
    {hungry ? (
      <>
        <ellipse cx="50" cy="68" rx="11" ry="9" fill="#6B1F1F" />
        <ellipse cx="50" cy="73" rx="6.5" ry="3.4" fill="#F08A8A" />
        <path d="M62 70 Q65 77 61 79 Q58 76 62 70 Z" fill="#9AD8F5" />
      </>
    ) : (
      <>
        <path d="M35 60 Q50 80 65 60 Z" fill="#6B1F1F" />
        <ellipse cx="50" cy="70" rx="6" ry="3" fill="#F08A8A" />
        <rect x="38" y="60" width="24" height="3.4" rx="1.4" fill="#FFFFFF" />
      </>
    )}
    <ellipse cx="50" cy="34" rx="37" ry="9" fill="#F0CB62" />
    <path d="M30 34 Q30 9 50 9 Q70 9 70 34 Z" fill="#F8DC84" />
    <path d="M30.5 29 Q50 37 69.5 29 L70 34 Q50 42 30 34 Z" fill="#D93A2B" />
  </g>
)

/** Card front: Luffy cheering, big grin. */
export const HeroLuffy = () => (
  <Svg viewBox="0 0 100 132" label="Luffy">
    <path d="M22 98 Q8 82 12 62 M78 98 Q92 82 88 62" stroke={SKIN} strokeWidth="9"
          strokeLinecap="round" fill="none" />
    <circle cx="12" cy="58" r="6.5" fill={SKIN} />
    <circle cx="88" cy="58" r="6.5" fill={SKIN} />
    <path d="M26 132 Q26 78 50 78 Q74 78 74 132 Z" fill="#D6372B" />
    <path d="M41 80 L50 112 L59 80 Z" fill={SKIN} />
    <LuffyHead />
  </Svg>
)

/** Game chaser: hungry Luffy, arms stretched out. */
export const LuffyChaser = () => (
  <Svg viewBox="0 0 120 132" label="Hungry Luffy">
    <path d="M56 98 L38 124 M68 98 L86 120" stroke="#2C5FA8" strokeWidth="13" strokeLinecap="round" />
    <circle cx="36" cy="126" r="6" fill="#7A4B24" />
    <circle cx="88" cy="122" r="6" fill="#7A4B24" />
    <rect x="50" y="94" width="26" height="12" rx="4" fill="#2C5FA8" />
    <path d="M74 74 L112 68 M72 82 L108 90" stroke={SKIN} strokeWidth="9" strokeLinecap="round" />
    <circle cx="112" cy="68" r="6.5" fill={SKIN} />
    <circle cx="108" cy="90" r="6.5" fill={SKIN} />
    <path d="M46 66 Q60 58 78 70 L74 100 L50 100 Z" fill="#D6372B" />
    <g transform="translate(24 4) scale(.8)"><LuffyHead hungry /></g>
  </Svg>
)

/* ---------- Chopper ---------- */

export const Chopper = () => (
  <Svg viewBox="0 0 100 100" label="Chopper">
    <path d="M40 84 L34 97 M60 84 L68 97" stroke="#8A5A2B" strokeWidth="9" strokeLinecap="round" />
    <ellipse cx="50" cy="78" rx="19" ry="14" fill="#B5753F" />
    <path d="M34 34 Q22 28 20 12 M28 26 Q18 24 12 24 M66 34 Q78 28 80 12 M72 26 Q82 24 88 24"
          stroke="#8A5A2B" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="29" cy="46" rx="6" ry="9" fill="#B5753F" transform="rotate(-25 29 46)" />
    <ellipse cx="71" cy="46" rx="6" ry="9" fill="#B5753F" transform="rotate(25 71 46)" />
    <circle cx="50" cy="52" r="22" fill="#B5753F" />
    <ellipse cx="50" cy="61" rx="13" ry="10" fill="#F0D2A8" />
    <circle cx="50" cy="57" r="4" fill="#2D7DD2" />
    <circle cx="40" cy="50" r="3.2" fill="#2B2B2B" />
    <circle cx="60" cy="50" r="3.2" fill="#2B2B2B" />
    <circle cx="41" cy="49" r="1" fill="#FFFFFF" />
    <circle cx="61" cy="49" r="1" fill="#FFFFFF" />
    <path d="M44 65 Q50 70 56 65" stroke="#7A3F2A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M30 40 Q50 4 70 40 Z" fill="#F28DB5" />
    <ellipse cx="50" cy="40" rx="22" ry="4.5" fill="#E36B9A" />
    <rect x="47" y="17" width="6" height="15" rx="1.5" fill="#FFFFFF" />
    <rect x="42.5" y="21.5" width="15" height="6" rx="1.5" fill="#FFFFFF" />
  </Svg>
)

/* ---------- obstacles ---------- */

export const Barrel = () => (
  <Svg viewBox="0 0 64 64" label="Barrel">
    <path d="M14 8 Q8 35 14 62 H50 Q56 35 50 8 Z" fill="#A66B3A" />
    <path d="M26 8 V62 M38 8 V62" stroke="#7E4F28" strokeWidth="1.5" />
    <rect x="10" y="18" width="44" height="5" rx="2" fill="#5E3B1E" />
    <rect x="10" y="46" width="44" height="5" rx="2" fill="#5E3B1E" />
  </Svg>
)

export const Rock = () => (
  <Svg viewBox="0 0 64 64" label="Rock">
    <path d="M6 62 Q4 40 18 33 Q22 14 38 16 Q56 16 58 40 Q62 52 58 62 Z" fill="#8E9AA6" />
    <path d="M20 36 Q26 26 36 26" stroke="#B8C2CC" strokeWidth="3" fill="none" strokeLinecap="round" />
  </Svg>
)

export default {
  accent: ACCENT,
  hero: HeroLuffy,
  chaser: LuffyChaser,
  runner: Chopper,
  obstacles: [Barrel, Rock],
}
