import React from 'react';

const NavItem = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-300 hover:text-purple-400 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
  >
    {label}
  </button>
);

export default NavItem;
