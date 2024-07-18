import React, {useState, useEffect, useCallback} from "react";
import "./App.css";

const Snowfall = () => {
    const [flakes, setFlakes] = useState([]);

    //눈송이 생성 함수
    const createFlake = useCallback((x, y) => {
        const id = Math.random().toString(36).substring(7);
        const newFlake = { id, x, y, fallSpeed: Math.random() * 5 + 2, opacity: Math.random() };
        setFlakes((flakes) => {
            const updatedFlakes = [...flakes, newFlake];
            return updatedFlakes;
          });
        }, []);

    //마우스 이동 이벤트
    const handleMouseMove = (e) => {
        createFlake(e.clientX, e.clientY);
    };

    //눈송이 위치 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setFlakes((flakes) => {
                const updatedFlaked = flakes

                .map((flake) => ({
                    ...flake,
                    y: flake.y + flake.fallSpeed,
                }))
                .filter((flake) => flake.y < window.innerHeight - 20);
                return updatedFlaked;

            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    //이벤트 리스너 document에 바인딩
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return(
        <div className="snowfall" onMouseMove={handleMouseMove}>
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="flake"
                    style={{left: flake.x, top: flake.y, opacity: flake.opacity}}
                ></div>
            ))}
        </div>
    );
};

export default Snowfall;