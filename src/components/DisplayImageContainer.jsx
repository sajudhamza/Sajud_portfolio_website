import React from 'react';

const DisplayImageContainer = ({ imageUrl }) => {
  return (
    // Classes updated for a larger, square shape with rounded corners
    <div className="w-150 h-150 md:w-[40rem] md:h-[40rem] rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default DisplayImageContainer;