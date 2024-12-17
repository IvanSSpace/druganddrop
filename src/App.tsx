import React, { useState } from 'react'

type Card = {
  id: number
  order: number
  title: string
}

function App() {
  const [cardsList, setCardList] = useState<Card[]>([
    { id: 1, order: 3, title: 'Карточка 1' },
    { id: 2, order: 1, title: 'Карточка 2' },
    { id: 3, order: 2, title: 'Карточка 3' },
    { id: 4, order: 4, title: 'Карточка 4' },
  ])

  const [currentCard, setCurrentCard] = useState<Card | null>(null)

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    // e.preventDefault()
    console.log('drag', card)
    setCurrentCard(card)
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    console.log('dragLeaveHandler', card)
    e.currentTarget.classList.remove('bg-red-400')
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    console.log('dragEndHandler', card)
  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-red-400')
    console.log(card)

    // e.target.style.backgroundColor = 'red'
    // console.log('dragOverHandler', card)
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.preventDefault()
    setCardList(
      cardsList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard?.order ?? 0 }
        }
        if (c.id === currentCard?.id) {
          return { ...c, order: card.order }
        }
        return c
      }),
    )
    e.currentTarget.classList.remove('bg-red-400')
  }

  const sortCards = (a: Card, b: Card) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="flex h-screen bg-black items-center justify-center flex-row gap-4">
      {cardsList.sort(sortCards).map((card) => {
        return (
          <div
            key={card.id}
            className="w-48 h-80 bg-red-500 grid place-items-center rounded-lg cli:bg-blue-500 cursor-grab"
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, card)}
            onDragLeave={(e) => dragLeaveHandler(e, card)}
            onDragEnd={(e) => dragEndHandler(e, card)}
            onDragOver={(e) => dragOverHandler(e, card)}
            onDrop={(e) => dropHandler(e, card)}
          >
            <p>{card.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
