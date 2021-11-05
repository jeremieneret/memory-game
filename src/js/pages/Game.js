import React, { useEffect, useState } from 'react'
import '../../style/CSS/style.css';
import Card from '../components/Card';
import { cardImages } from '../utils/cardImages';


const Game = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [matches, setMatches] = useState(0);
  const [cardsSet, setCardsSet] = useState(0);
  const [style, setStyle] = useState('');

  const shuffle = () => {
    const shuffledCards = [...cardImages[cardsSet], ...cardImages[cardsSet]]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setMatches(0);

    let random = Math.floor(Math.random() * 1000) + 1;
    setStyle(`hue-rotate(${random}deg)`);

    setCardsSet(prevCardsSet => prevCardsSet + 1)
    if (cardsSet === 5) {
      setCardsSet(0)
    }
  }

  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  const resetChoicesAndIncreaseTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prevTurns => prevTurns + 1)
  }

  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1.src === choice2.src) {
        resetChoicesAndIncreaseTurn()
        setMatches(prevMatches => prevMatches + 1)

        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        })
      }
      else {
        setTimeout(() => resetChoicesAndIncreaseTurn(), 1000);
      }
    }
  }, [choice1, choice2])


  return (
    <main>
      <div className="logo">
        <h1 className='opacity_2'><span className='rightToLeft'>The AMAZING</span><br />Memory</h1>
        <h1 className='leftToRight'>GAME</h1>
      </div>

      <button
        onClick={shuffle}
        className={
          matches >= 6 ? "elastic win-background" : "opacity"
        }
      >Wanna play?</button>

      <div
        className="card-grid"
        style={{ 'filter': style, }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
          />
        ))}
      </div>

      <div
        className={matches >= 6 ? "turns-and-matches all-six-matches" : "turns-and-matches opacity"}
      >
        {matches >= 6 &&
          <p>Yeah! You succeeded in</p>
        }
        {matches < 6 &&
          <p>Turns: {turns}</p>
        }
        {matches >= 6 &&
          <p><span>{turns}</span> turns!</p>
        }
      </div>

    </main>
  )
}

export default Game
