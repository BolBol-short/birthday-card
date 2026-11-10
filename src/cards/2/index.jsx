import CardLayout from '../../components/CardLayout'
import Scene from './Scene'
import Message from './Message'
import Activity from './Activity'
import Poster, { useCountUp } from './Poster'
import art, { ACCENT, INK, PAPER } from '../../assets/2'

/** No photo of her exists, and she loves sleep, so the frame says so. */
function Asleep() {
  return (
    <div className="flex h-full flex-col items-center justify-center"
         style={{ background: 'radial-gradient(rgba(42,26,16,.2) 1px, transparent 1.4px) 0 0 / 1.8cqw 1.8cqw, #C7A56B' }}>
      <p aria-hidden="true" className="mt-[6cqw] font-poster text-[24cqw] leading-none" style={{ color: INK }}>
        Z<span className="text-[17cqw]">z</span><span className="text-[11cqw]">z</span>
      </p>
      <p className="mt-[1.6cqw] font-fell-sc text-[4.8cqw] leading-tight">No photo: subject was asleep</p>
    </div>
  )
}

export default function Card({ person }) {
  const bounty = useCountUp(person?.age != null ? person.age * 1_000_000 : null)

  const actions = [
    { label: 'Message', icon: <i className='bi bi-envelope' />,  title: 'A letter for you',  content: <Message person={person} /> },
    { label: 'Play',    icon: <i className='bi bi-controller'/>, title: 'Run, Chopper, run!', content: <Activity /> },
  ]

  return (
    // re-point the shell's cream/ink tokens at poster paper and ink, so buttons, window and game print in this world
    <div className="contents selection:bg-[#B3121B] selection:text-[#DDBF86]"
         style={{ '--color-cream': PAPER, '--color-ink': INK }}>
    <CardLayout accent={ACCENT} scene={<Scene />} actions={actions}>
      <Poster
        name={person?.name ?? 'Friend'}
        bounty={person?.age != null ? bounty.toLocaleString('en-US') : '???'}
        photo={<Asleep />}
        stamp
        className="h-[min(76dvh,680px)]"
      />

      {/* Chopper's real bounty was only 1,000 Berries: the Marines thought he was the pet */}
      <Poster
        name="Tony Tony Chopper"
        bounty="1,000"
        tilt="4deg"
        photo={<img src={art.chopperPortrait} alt="Chopper" className="h-full w-full object-cover object-[50%_30%]" />}
        className="absolute! bottom-[11%] left-[6%] h-[min(40dvh,330px)] [animation-delay:.35s] max-[700px]:hidden"
      />
    </CardLayout>
    </div>
  )
}
