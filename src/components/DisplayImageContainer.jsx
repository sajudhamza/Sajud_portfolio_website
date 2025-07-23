import React from 'react';

const DisplayImageContainer = ({ imageUrl }) => {
  return (
    // UPDATED: Made smaller on mobile, larger on bigger screens
    <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default DisplayImageContainer;
