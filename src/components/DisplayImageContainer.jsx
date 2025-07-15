import React from 'react';

const DisplayImageContainer = ({ imageUrl }) => {
  return (
    // Classes updated for a larger, square shape with rounded corners
    <div className="w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default DisplayImageContainer;