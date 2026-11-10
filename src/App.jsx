import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useParams } from 'react-router-dom'
import { getCard } from './cards'
import blobs from './Utils/data/Birthday.enc.json'
import './styles/app.css'

/**
 * People data ships encrypted (see Utils/CSV-To-JSON.js). The link is
 * #/<id>/<secret>: <secret> is that person's AES key, so only someone holding
 * the link can read the name, dob, etc. The hash never reaches the server.
 */
const bytes = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))

async function decrypt(id, secret) {
  const raw = bytes(blobs[id])
  const key = await crypto.subtle.importKey('raw', bytes(secret), 'AES-GCM', false, ['decrypt'])
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: raw.slice(0, 12) }, key, raw.slice(12))
  return JSON.parse(new TextDecoder().decode(plain))
}

/** dob is M/D/YYYY. */
function ageOf(dob) {
  if (!dob) return null
  const [m, d, y] = dob.split('/').map(Number)
  const t = new Date()
  const hadBirthday = t.getMonth() + 1 > m || (t.getMonth() + 1 === m && t.getDate() >= d)
  return t.getFullYear() - y - (hadBirthday ? 0 : 1)
}

function CardRoute() {
  const { id, secret } = useParams()
  const [person, setPerson] = useState() // undefined = decrypting, null = failed

  useEffect(() => {
    let live = true
    decrypt(id, secret)
      .then((p) => live && setPerson({ ...p, age: ageOf(p.dob) }))
      .catch(() => live && setPerson(null)) // wrong id/secret, tampered data, or no crypto.subtle
    return () => { live = false }
  }, [id, secret])

  if (person === undefined) return null
  const Card = getCard(person?.id)
  return <Card person={person ?? { name: 'friend', age: null, dob: null }} />
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:id/:secret" element={<CardRoute />} />
        {/* no link secret = nothing personal is shown */}
        <Route path="*" element={<CardRoute />} />
      </Routes>
    </HashRouter>
  )
}
