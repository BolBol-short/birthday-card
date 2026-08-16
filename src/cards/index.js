import Card10 from './10'
import Card11 from './11'
import DefaultCard from './DefaultCard'

/**
 * person id -> card component.
 *
 * To add a friend:
 *   1. src/assets/<id>/   their images + an index.js
 *   2. src/cards/<id>/    index.jsx, Scene.jsx, Message.jsx, Activity.jsx
 *   3. register the id below
 *
 * Anyone not registered still gets a working DefaultCard.
 */
export const cardRegistry = {
  10: Card10,
  11: Card11,
}

export const getCard = (id) => cardRegistry[id] ?? DefaultCard