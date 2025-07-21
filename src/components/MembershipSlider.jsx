import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { memberships } from '../data/portfolioData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MembershipSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemsToShift = () => {
    if (window.innerWidth >= 1024) return 5;
    if (window.innerWidth >= 768) return 4;
    return 3;
  };

  const nextSlide = () => {
    const itemsToShift = getItemsToShift();
    const newIndex = currentIndex + itemsToShift;
    if (newIndex >= memberships.length) return; 
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const itemsToShift = getItemsToShift();
    const newIndex = currentIndex - itemsToShift;
    if (newIndex < 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(newIndex);
  };

  return (
    // UPDATE: Reduced vertical padding on the main container
    <div className="w-full bg-gray-900/80 backdrop-blur-sm py-2 relative">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div 
            className="flex items-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / getItemsToShift())}%)` }}
          >
            {memberships.map((membership, index) => (
              <Link 
                to="/memberships" 
                key={index} 
                // UPDATE: Reduced vertical padding to py-0.5 (2px)
                className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 flex flex-col items-center justify-center py-0.5"
              >
                <img src={membership.logoUrl} alt={membership.name} className="h-20 w-auto" />
                <p className="text-xs text-center text-gray-300 mt-2 px-1">
                  {membership.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        disabled={currentIndex >= memberships.length - getItemsToShift()}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default MembershipSlider;