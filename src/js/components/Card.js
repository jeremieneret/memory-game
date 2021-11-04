import React from 'react';
import BackImg from '../../assets/images/BackImg2.jpg';


const Card = ({ card, handleChoice, flipped }) => {
    const handleClick = () => {
        handleChoice(card);
    }

    return (
        <div className="card">
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
