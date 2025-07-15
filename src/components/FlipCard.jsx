import React, { useState } from 'react';

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-64 [perspective:1000px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card with solid background */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-center">
          {frontContent}
        </div>

        {/* Back of the card with solid background */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-gray-700 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 text-center [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;