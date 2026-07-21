import CardLayout from '../components/CardLayout'

/** Fallback so every id in the data has a working card, themed or not. */
export default function DefaultCard({ person }) {
  const actions = [{
    label: 'Message', icon: '✉', title: 'A message for you',
    content: <p className="leading-[1.8]">Placeholder — write your message here.</p>,
  }]

  return (
    <CardLayout
      accent="#E9A93C"
      scene={<div className="absolute inset-0 bg-linear-to-b from-[#12313A] to-[#0B2529]" />}
      actions={actions}
    >
      <div className="text-center text-cream">
        <p className="text-[clamp(14px,2vw,22px)] opacity-75">Happy Birthday</p>
        <h1 className="text-[clamp(40px,8vw,96px)] font-extrabold">{person?.name ?? 'friend'}</h1>
      </div>
    </CardLayout>
  )
}
