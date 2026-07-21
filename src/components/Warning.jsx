/**
 * Shown when the phone is held upright. The card is landscape-only.
 * Desktop windows 1000px+ wide are exempt.
 */
export default function Warning({
  title = 'Turn your phone',
  hint = 'this one opens sideways',
  accent = 'var(--color-hachi)',
}) {
  return (
    <div className="fixed inset-0 z-200 hidden place-content-center justify-items-center
                    gap-[1.1rem] bg-[#F3FAFD] p-8 text-center text-ink
                    portrait:grid portrait:min-[1000px]:hidden">
      <div
        className="h-20 w-12 rounded-xl border-4 animate-tip"
        style={{ borderColor: accent }}
      />
      <p className="text-[clamp(20px,6.5vw,30px)] font-extrabold">{title}</p>
      <p className="text-sm font-medium opacity-65">{hint}</p>
    </div>
  )
}
