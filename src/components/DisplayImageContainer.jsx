import React from 'react';

const DisplayImageContainer = ({ imageUrl }) => {
  return (
    // UPDATED: Increased the size for both mobile and larger screens
    <div className="w-80 h-80 md:w-[29rem] md:h-[29rem] rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default DisplayImageContainer;
