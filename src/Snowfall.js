import React, {useState, useEffect, useCallback} from "react";
import "./App.css";

const Snowfall = () => {
    const [flakes, setFlakes] = useState([]);

    //눈송이 생성 함수
    const createFlake = useCallback((x, y) => {
        const id = Math.random().toString(36).substring(7);
        const newFlake = { id, x, y, fallSpeed: Math.random() * 5 + 2, opacity: Math.random() };
        console.log('Creating flake:', newFlake);
        setFlakes((flakes) => [...flakes, newFlake]);
      }, []);

    const handleMouseMove = (e) => {
        console.log(`Mouse moved: (${e.clientX}, ${e.clientY})`);
        createFlake(e.clientX, e.clientY);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFlakes((flakes) => {
                const updatedFlaked = flakes

                .map((flake) => ({
                    ...flake,
                    y: flake.y + flake.fallSpeed,
                }))
                .filter((flake) => flake.y < window.innerHeight);
                return updatedFlaked;

            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

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