import React, { useState, useEffect, useRef } from 'react';

const SimpleGame = ({ faceIcon }) => { // Accept the faceIcon prop
  const [score, setScore] = useState(0);
  const [dotPosition, setDotPosition] = useState({ top: '50%', left: '50%' });
  const [gameActive, setGameActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const gameIntervalRef = useRef(null);
  const dotTimeoutRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setTimer(30);
    setGameActive(true);
    moveDot();
    gameIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameActive(false);
    clearInterval(gameIntervalRef.current);
    clearTimeout(dotTimeoutRef.current);
  };

  const moveDot = () => {
    clearTimeout(dotTimeoutRef.current);
    const newTop = Math.random() * 80 + 10;
    const newLeft = Math.random() * 80 + 10;
    setDotPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    dotTimeoutRef.current = setTimeout(moveDot, 1500);
  };

  const handleDotClick = () => {
    if (gameActive) {
      setScore((prev) => prev + 1);
      moveDot();
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(gameIntervalRef.current);
      clearTimeout(dotTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-900/50 rounded-xl p-4 shadow-inner">
      <div className="flex justify-around items-center mb-4">
        <p className="text-xl font-semibold text-blue-300">Score: <span className="text-purple-400">{score}</span></p>
        <p className="text-xl font-semibold text-blue-300">Time: <span className="text-purple-400">{timer}s</span></p>
      </div>
      <div className="relative w-full h-80 bg-gray-700/50 rounded-lg overflow-hidden border-2 border-blue-600">
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg"
            >
              Start Game
            </button>
          </div>
        )}
        {gameActive && (
          <img
            src={faceIcon} // Use the faceIcon prop for the image source
            alt="Face icon"
            className="absolute w-14 h-14 rounded-full cursor-pointer object-cover transition-all duration-75"
            style={{ top: dotPosition.top, left: dotPosition.left }}
            onClick={handleDotClick}
          />
        )}
      </div>
    </div>
  );
};

export default SimpleGame;