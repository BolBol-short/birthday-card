import CardLayout from '../../components/CardLayout'
import Scene from './Scene'
import Message from './Message'
import Activity from './Activity'
import { HeroChef, ACCENT } from '../../assets/10'

export default function Card({ person }) {
  const actions = [
    { label: 'Message', icon: <i className='bi bi-envelope' />,   title: 'A message for you', content: <Message person={person} /> },
    { label: 'Play',    icon: <i className='bi bi-controller'/>,  title: 'Run the kitchen',   content: <Activity /> },
  ]

  return (
    <CardLayout accent={ACCENT} scene={<Scene />} actions={actions}>
      <div className="flex max-w-275 items-center gap-[clamp(20px,5vw,70px)]">
        <div className="w-[clamp(150px,26vw,320px)] flex-none animate-bob
                        drop-shadow-[0_14px_18px_rgba(120,70,30,.22)]">
          <HeroChef />
        </div>
        <div className="min-w-0">
          <p className="text-[clamp(15px,2.4vw,30px)] font-medium tracking-wide text-ink/80">
            Happy Birthday
          </p>
          <h1 className="text-[clamp(44px,9vw,118px)] font-extrabold leading-none text-cream"
              style={{ textShadow: `4px 4px 0 ${ACCENT}, 0 10px 24px rgba(120,66,24,.3)` }}>
            {person?.name ?? 'friend'}
          </h1>
          {person?.age != null && (
            <p className="mt-2 inline-block rounded-full bg-blush px-4 py-[.34em]
                          text-[clamp(12px,1.4vw,17px)] font-bold text-cream">
              {person.age} today
            </p>
          )}
        </div>
      </div>
    </CardLayout>
  )
}