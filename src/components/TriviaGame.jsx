import React, { useState, useMemo } from 'react';
import { triviaQuestions } from '../data/portfolioData';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TriviaGame = () => {
  const [gameStatus, setGameStatus] = useState('start'); // 'start', 'playing', 'finished'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Shuffle questions once per game and take the first 10
  const gameQuestions = useMemo(() => {
    return shuffleArray(triviaQuestions).slice(0, 10);
  }, [gameStatus === 'start']); // Re-shuffle only when a new game starts

  const currentQuestion = gameQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameStatus('finished');
    }
  };

  const handleRestart = () => {
    setGameStatus('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  if (gameStatus === 'start') {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <h3 className="text-xl font-bold text-blue-300 mb-4">Data Science & AI Trivia</h3>
        <p className="text-gray-300 mb-6 text-center">Answer 10 Tech questions!</p>
        <button
          onClick={() => setGameStatus('playing')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg"
        >
          Start Trivia
        </button>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <h3 className="text-xl font-bold text-blue-300 mb-4">Trivia Complete!</h3>
        <p className="text-gray-300 mb-6 text-lg">Your final score is: <span className="font-bold text-purple-400">{score} / {gameQuestions.length}</span></p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-80 flex flex-col justify-between p-2 sm:p-4">
      <div>
        <p className="text-sm text-gray-400 mb-2">Question {currentQuestionIndex + 1} of {gameQuestions.length}</p>
        <h4 className="text-base sm:text-lg font-semibold text-gray-100">{currentQuestion.question}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = 'px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm w-full text-left';
          if (selectedAnswer !== null) {
            if (index === currentQuestion.correctAnswer) {
              buttonClass = 'px-4 py-3 bg-green-600 text-white font-semibold rounded-lg text-sm w-full text-left';
            } else if (index === selectedAnswer) {
              buttonClass = 'px-4 py-3 bg-red-600 text-white font-semibold rounded-lg text-sm w-full text-left';
            } else {
              buttonClass = 'px-4 py-3 bg-gray-800 text-gray-500 font-semibold rounded-lg text-sm w-full text-left cursor-not-allowed';
            }
          }
          return (
            <button key={index} onClick={() => handleAnswerSelect(index)} className={buttonClass} disabled={selectedAnswer !== null}>
              {option}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <div className="mt-4 text-center">
          <button onClick={handleNextQuestion} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">
            {currentQuestionIndex < gameQuestions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;
