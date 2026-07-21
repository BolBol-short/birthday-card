import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { getCard } from './cards'
import people from './Utils/data/Birthday.json'
import './styles/app.css'

/** Resolve a route param against the data: accepts the numeric id OR the slug. */
function resolve(key) {
  if (!key) return null
  if (people[key]) return people[key]
  return Object.values(people).find((p) => String(p.id) === String(key)) ?? null
}

function CardRoute() {
  const { key } = useParams()
  const person = resolve(key)
  const Card = getCard(person?.id)
  return <Card person={person ?? { name: 'friend', age: null, dob: null }} />
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* whoever the card is for right now */}
        <Route path="/" element={<Navigate to="/11" replace />} />
        <Route path="/:key" element={<CardRoute />} />
      </Routes>
    </HashRouter>
  )
}
