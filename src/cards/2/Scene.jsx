/** Dark ship planks the posters are nailed to. Purely decorative, full-bleed. */

// fractal noise stretched along x reads as wood grain running down each plank
const grain = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.004 .22' numOctaves='3' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 .08  0 0 0 0 .04  0 0 0 0 .01  0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")"

export default function Scene() {
  return (
    <div className="absolute inset-0 bg-[#3B2416]">
      {/* six planks, each a slightly different tone, dark seam between */}
      <div className="absolute inset-0"
           style={{
             background:
               'linear-gradient(180deg, #4A2E1B 0 16.6%, #3F2617 16.6% 33.3%, #4D301C 33.3% 50%, #3A2315 50% 66.6%, #462B19 66.6% 83.3%, #3E2516 83.3%)',
           }} />
      <div className="absolute inset-0 opacity-90" style={{ backgroundImage: grain, backgroundSize: '600px 300px' }} />
      <div className="absolute inset-0"
           style={{ background: 'repeating-linear-gradient(180deg, transparent 0 calc(16.66% - 3px), rgba(15,8,4,.85) calc(16.66% - 3px) 16.66%)' }} />
      {/* a lamp somewhere above: warm in the middle, dark at the corners */}
      <div className="absolute inset-0"
           style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 35%, rgba(255,190,110,.18), transparent 60%), radial-gradient(ellipse at center, transparent 45%, rgba(8,4,2,.65) 100%)' }} />
    </div>
  )
}
