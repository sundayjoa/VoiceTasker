import React, { useState, useEffect, useRef } from 'react';
import SantaImage from './images/santa-claus.png';
import fallingGift from './images/gift.png';
import './App.css'

const Santa = () => {
    const [direction, setDirection] = useState('rightToLeft');
    const [fallingGifts, setFallingGifts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(prevDirection => (prevDirection === 'rightToLeft' ? 'leftToRigth' : 'rightToLeft'));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    //화면에 선물 떨어지게 하기
    useEffect(() => {
        const giftInterval = setInterval(() => {
          const newGift = {
            id: Math.random().toString(36).substring(7),
            x: Math.random() * window.innerWidth,
            start: Date.now(),
            animationDuration: Math.random() * 3 + 2 + 's', 
            animationDelay: Math.random() * 2 + 's', 
          };
          setFallingGifts(fallingGifts => [...fallingGifts, newGift]);
        }, 500); 
    
        const cleanupInterval = setInterval(() => {
          setFallingGifts(fallingGifts => fallingGifts.filter(gift => Date.now() - gift.start < 7000));
        }, 1000); 
    
        return () => {
          clearInterval(giftInterval);
          clearInterval(cleanupInterval);
        };
      }, []);
    


    return (
        <>
        <div className="santa-container">
            <img
            src={SantaImage}
            alt="Santa Claus"
            className={`santaImage ${direction === 'rightToLeft' ? 'moveRightToLeft' : 'moveLeftToRight'}`}
            />
        </div>

        <div className="gift-container">
        {fallingGifts.map(gift => (
            <img
            key={gift.id}
            src={fallingGift}
            alt="Falling Gift"
            className="falling-gift"
            style={{
              left: `${gift.x}px`,
              top: `-50px`,
              animationName: 'giftFall',
              animationDuration: gift.animationDuration,
              animationDelay: gift.animationDelay,
            }}
          />
        ))}
        </div>
    </>
     );
};

export default Santa;