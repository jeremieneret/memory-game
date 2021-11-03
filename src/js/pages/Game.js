import React, { useEffect, useState } from 'react'
import '../../style/CSS/style.css';
import Card from '../components/Card';

//we create an array with all six images of the front of the cards
const cardImages = [
  { "src": '/images/memory-game-card7.jpg', "matched": false },
  { "src": '/images/memory-game-card8.jpg', "matched": false },
  { "src": '/images/memory-game-card9.jpg', "matched": false },
  { "src": '/images/memory-game-card10.jpg', "matched": false },
  { "src": '/images/memory-game-card11.jpg', "matched": false },
  { "src": '/images/memory-game-card12.jpg', "matched": false },

]

const Game = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [matches, setMatches] = useState(0);

  //we create a function that will shuffle the cards
  const shuffle = () => {
    //first, let's create an array with the content of the first one, doubled, since we need some matchedes
    const shuffledCards = [...cardImages, ...cardImages]
      //then we use the sort() method to sort the 12 cards randomly, thanks to Math.random() - 0.5
      .sort(() => Math.random() - 0.5)
      //finally we put all this in a new array, using map() method. This new array will return an array of objects with 2 keys : the src of the image, and 
      //an id for each. To create these ids, we use a Math.random again.
      .map((card) => ({ ...card, id: Math.random() }));

    //we handle the state of the cards by updating setCards (useState())
    setCards(shuffledCards);
    //and we need to reinitiate the number of turns to 0 each time the "new game" button is clicked.
    setTurns(0);
    setMatches(0);
  }

  //handle a choice
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
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        })
        resetChoicesAndIncreaseTurn()
        setMatches(prevMatches => prevMatches + 1)
      }
      else {
        setTimeout(() => resetChoicesAndIncreaseTurn(), 2500);
      }
    }
  }, [choice1, choice2])

  if (matches >= 6) {
    console.log('caca');
  }

  return (
    <main>
      <div className="logo">
        <h1><span>The AMAZING</span><br />Memory</h1>
        <h1>GAME</h1>

      </div>
      <button
        onClick={shuffle}
        className={
        matches >= 6 ? "elastic" : ""
      }
      >Wanna play?</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
          />
        ))}
      </div>
      <div className={
        matches >= 6 ? "turns-and-matches all-six-matches" : "turns-and-matches"
      }

      >
        <p>Turns: {turns}</p>
        <p>Matches: <span>{matches}</span></p>
      </div>
    </main>
  )
}

export default Game
