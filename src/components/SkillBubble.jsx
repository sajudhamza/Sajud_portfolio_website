import React from 'react';

const SkillBubble = ({ skill }) => {
  return (
    <span
      className="inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
      bg-blue-800 text-blue-200
      hover:bg-blue-600 hover:text-white hover:shadow-lg hover:scale-105"
    >
      {skill}
    </span>
  );
};

export default SkillBubble;