import React from 'react';
import BackImg from '../../assets/images/BackImg2.jpg';


const Card = ({ card, handleChoice, flipped }) => {
    const handleClick = () => {
        handleChoice(card);
    }


    // let random = Math.floor(Math.random() * 10000) + 1;
    // const hue = `hue-rotate(${random}deg)`;



    return (
        <div className="card"
            // style={{ 'filter': hue }}
        >
            <div className={flipped ? "flipped" : ""}>
                <img
                    className='front'
                    src={card.src}
                    alt="card front"
                />
                <img
                    className='back'
                    src={BackImg}
                    alt="card back"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default Card
