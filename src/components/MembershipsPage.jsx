import React from 'react';
import { Link } from 'react-router-dom';
import { memberships } from '../data/portfolioData';
import Background from './Background'; // Use the background
import { ArrowLeft, ExternalLink } from 'lucide-react';

const MembershipsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Background />
      <div className="relative z-10 max-w-6xl mx-auto p-8 pt-16">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
        <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Memberships & Certifications
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memberships.map((membership, index) => (
            <a 
              href={membership.certificateUrl} 
              key={index} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:scale-105"
            >
              <img src={membership.logoUrl} alt={membership.name} className="h-24 w-auto mb-4" />
              <p className="font-semibold text-blue-300 mb-4">{membership.name}</p>
              <span className="inline-flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                View Certificate <ExternalLink size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipsPage;