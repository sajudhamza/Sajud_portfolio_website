import React from 'react';
import { memberships } from '../data/portfolioData';
import Background from './Background';
import Navigation from './Navigation';
import { ExternalLink } from 'lucide-react';
import Section from './Section';

const MembershipsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Background />
      <div className="relative z-10">
        <Navigation />
        <div className="pt-20">
          <Section
            id="memberships"
            title="Memberships & Certifications"
            icon={<ExternalLink size={40} className="text-purple-400" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memberships.map((membership, index) => (
                <a 
                  href={membership.certificateUrl} 
                  key={index} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800/80 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:scale-105"
                >
                  <img src={membership.logoUrl} alt={membership.name} className="h-24 w-auto mb-4" />
                  <p className="font-semibold text-blue-300 mb-4">{membership.name}</p>
                  <span className="inline-flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Certificate <ExternalLink size={16} />
                  </span>
                </a>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default MembershipsPage;