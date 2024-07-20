import React, { useState, useEffect, useRef } from 'react';
import SantaImage from './images/santa-claus.png';
import fallingGift from './images/gift.png';
import './App.css'

const Santa = () => {
    const [direction, setDirection] = useState('rightToLeft');
    const [fallingGifts, setFallingGifts] = useState([]);
    const [selectedGift, setSelectedGift] = useState(null);

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
            <div className="popup-overlay" onClick={handleClosePopup}></div>
            <div className="popup">
                <div className="fortune-title">
                  <p>오늘의 운세</p>
                </div>
                <div className="fortune-content">
                  <p>하고자 하는 일이 뜻대로 되지 않으니 마음이 초조해질 수 있습니다. 마음을 다스리고, 꾸준히 하고자 하는 일에 정진하세요.</p>
                </div>
            </div>

            </>
        )}
        </div>
    </>
     );
};

export default Santa;