import { useState } from 'react'
import Warning from './Warning'
import Background from './Background'
import Button, { ButtonDock } from './Button'
import Interactive from './Interactive'

/**
 * Composes the whole card so each new person's card stays small.
 *
 *   <CardLayout accent scene={<Scene/>} actions={[{label,icon,title,content}]}>
 *     ...greeting...
 *   </CardLayout>
 */
export default function CardLayout({ accent = 'var(--color-hachi)', scene, actions = [], children }) {
  const [openIndex, setOpenIndex] = useState(null)
  const active = openIndex === null ? null : actions[openIndex]

  return (
    <>
      <Warning accent={accent} />

      <main className="relative isolate h-dvh w-screen overflow-hidden
                       portrait:hidden portrait:min-[1000px]:block">
        <Background accent={accent}>{scene}</Background>

        <div className="pointer-events-none relative z-3 grid h-full place-items-center
                        p-[clamp(28px,6vw,80px)] [&>*]:pointer-events-auto">
          {children}
        </div>

        {actions.length > 0 && (
          <ButtonDock>
            {actions.map((a, i) => (
              <Button key={a.label} icon={a.icon} accent={accent} onClick={() => setOpenIndex(i)}>
                {a.label}
              </Button>
            ))}
          </ButtonDock>
        )}
      </main>

      <Interactive
        open={active !== null}
        title={active?.title ?? ''}
        accent={accent}
        onClose={() => setOpenIndex(null)}
      >
        {active?.content}
      </Interactive>
    </>
  )
}
