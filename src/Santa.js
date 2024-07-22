import React, { useState, useEffect, useRef } from 'react';
import SantaImage from './images/santa-claus.png';
import fallingGift from './images/gift.png';
import axios from 'axios';
import './App.css'

const Santa = () => {
    const [direction, setDirection] = useState('rightToLeft');
    const [fallingGifts, setFallingGifts] = useState([]);
    const [selectedGift, setSelectedGift] = useState(null);
    const [fortune, setFortune] = useState('');

    //산타 애니메이션
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

    //선물 클릭하면 운세 팝업창 뜨게 하기
    const handleGiftClick = (gift) => {
        setSelectedGift(gift);
    };

    const handleClosePopup = () => {
        setSelectedGift(false);
    };

    //open api를 이용해 운세 가져오기
    useEffect(() => {
      const fetchFortune = async () => {
        try{
          const response = await axios.get('https://quotes.rest/qod?language=en');
          const fortuneText = response.data.contents.quotes[0].quote;
          setFortune(fortuneText);
        } catch(error) {
          console.error('Error fetching the fortune:', error);
        }
      };

      fetchFortune();
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
            onClick = {() => handleGiftClick(gift)}
          />
        ))}

        {selectedGift &&(
            <>
            <div className="popup-overlay" onClick={handleClosePopup}>
                <button className = "ClosePopup">x</button>
            </div>
            <div className="popup">
                <div className="fortune-title">
                  <p>오늘의 운세</p>
                </div>
                <div className="fortune-content">
                  <p>{fortune}</p>
                </div>
            </div>

            </>
        )}
        </div>
    </>
     );
};

export default Santa;