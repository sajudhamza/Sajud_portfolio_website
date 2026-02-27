import React, { useState } from 'react';

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (event) => {
    // Don't toggle the card when clicking on links or buttons inside it
    const target = event.target;
    if (target.closest && (target.closest('a') || target.closest('button'))) {
      return;
    }
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className="relative w-full cursor-pointer group"
      onClick={handleClick}
    >
      <div className="w-full rounded-xl shadow-lg bg-gray-800/90 border border-gray-700 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="p-6 text-left">
          {!isFlipped && (
            <div className="flex flex-col h-full">
              {frontContent}
            </div>
          )}
          {isFlipped && (
            <div className="flex flex-col h-full">
              {backContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;