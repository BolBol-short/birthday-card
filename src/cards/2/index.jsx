import CardLayout from '../../components/CardLayout'
import Scene from './Scene'
import Message from './Message'
import Activity from './Activity'
import { HeroLuffy, ACCENT } from '../../assets/2'

export default function Card({ person }) {
  const actions = [
    { label: 'Message', icon: <i className='bi bi-envelope' />,  title: 'A message for you', content: <Message person={person} /> },
    { label: 'Play',    icon: <i className='bi bi-controller'/>, title: 'Run, Chopper, run!', content: <Activity /> },
  ]

  return (
    <CardLayout accent={ACCENT} scene={<Scene />} actions={actions}>
      <div className="flex max-w-275 items-center gap-[clamp(20px,5vw,70px)]">
        <div className="h-[clamp(190px,40vh,380px)] w-[clamp(145px,30vh,290px)] flex-none animate-bob
                        drop-shadow-[0_14px_18px_rgba(20,50,90,.25)]">
          <HeroLuffy />
        </div>
        <div className="min-w-0">
          <p className="text-[clamp(15px,2.4vw,30px)] font-medium tracking-wide text-ink/80">
            Happy Birthday
          </p>
          <h1 className="text-[clamp(44px,9vw,118px)] font-extrabold leading-none text-cream"
              style={{ textShadow: `4px 4px 0 ${ACCENT}, 0 10px 24px rgba(20,50,90,.3)` }}>
            {person?.name ?? 'friend'}
          </h1>
          {person?.age != null && (
            <p className="mt-2 inline-block rounded-full px-4 py-[.34em] text-[clamp(12px,1.4vw,17px)]
                          font-bold text-cream" style={{ background: ACCENT }}>
              {person.age} today
            </p>
          )}
        </div>
      </div>
    </CardLayout>
  )
}
