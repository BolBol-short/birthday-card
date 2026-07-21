import Border from './Border'

/**
 * The card's background layer.
 * `children` are the themed scene elements; the border is drawn on top.
 */
export default function Background({ accent, border = true, inset = 22, children }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">{children}</div>
      {border && <Border accent={accent} inset={inset} />}
    </div>
  )
}
