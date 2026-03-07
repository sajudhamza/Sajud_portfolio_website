import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Qualifications', path: '/qualifications' },
    { label: 'Patents', path: '/patents' },
    { label: 'Publications', path: '/publications' },
    { label: 'Articles', path: '/articles' },
    { label: 'Judging', path: '/judging' },
    { label: 'Media', path: '/media' },
    { label: 'Photos', path: '/photos' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Memberships', path: '/memberships' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 shadow-lg p-2 flex justify-center flex-wrap gap-x-1 sm:gap-x-2 md:gap-x-4">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
            isActive(link.path)
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-300 hover:text-purple-400'
          }`}
        >
          {link.label}
        </Link>
      ))}
      <button
        onClick={() => navigate('/login')}
        className="text-gray-300 hover:text-purple-400 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <LogIn size={16} /> Login
      </button>
    </nav>
  );
};

export default Navigation;

