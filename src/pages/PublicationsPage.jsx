import React from 'react';
import { BookOpen, ChevronRight, TrendingUp, Award, Users, Calendar, ExternalLink, Quote } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import FlipCard from '../components/FlipCard';
import Background from '../components/Background';
import { publications } from '../data/portfolioData';

const PublicationsPage = () => {
  const latestYear = Math.max(...publications.map(p => parseInt(p.year) || 0));
  const totalPublications = publications.length;

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4">
                <BookOpen size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Research Publications
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Contributing to the advancement of knowledge in AI, machine learning, and data engineering 
              through peer-reviewed research published in leading academic journals and conferences.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-500/30 text-center">
                <BookOpen className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-blue-300 mb-2">{totalPublications}</div>
                <div className="text-gray-300">Publications</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30 text-center">
                <Award className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">100%</div>
                <div className="text-gray-300">Peer-Reviewed</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-500/30 text-center">
                <Calendar className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-blue-300 mb-2">{latestYear}</div>
                <div className="text-gray-300">Latest Year</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30 text-center">
                <TrendingUp className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">AI/ML</div>
                <div className="text-gray-300">Focus Area</div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Impact Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-blue-500/20">
            <div className="flex items-center justify-center mb-6">
              <Quote className="text-blue-400" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-300">
              Research Philosophy
            </h2>
            <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed text-lg">
              My research bridges the gap between theoretical advancements and practical applications, 
              focusing on solving real-world problems through innovative AI and machine learning solutions. 
              Each publication represents a step forward in understanding how intelligent systems can 
              transform industries and improve lives.
            </p>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="publications"
            title="Published Research"
            icon={<BookOpen size={40} className="text-purple-400" />}
          >
            <div className="mb-8 text-center">
              <p className="text-gray-400 mb-4">
                Click on any publication card to learn more about the research
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publications.map((pub, index) => (
                <div key={index} className="group">
                  <FlipCard
                    frontContent={
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
                              {pub.year}
                            </span>
                            <ExternalLink className="text-gray-400 group-hover:text-purple-400 transition-colors" size={18} />
                          </div>
                          <h4 className="text-xl font-bold text-blue-300 mb-2 line-clamp-3">{pub.title}</h4>
                          <p className="text-gray-400 text-sm mb-2 font-semibold">{pub.journal}</p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-700">
                          <p className="text-gray-500 text-xs">Click to explore →</p>
                        </div>
                      </div>
                    }
                    backContent={
                      <div className="h-full flex flex-col">
                        <h4 className="text-lg font-bold text-blue-300 mb-3">{pub.title}</h4>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow">{pub.description}</p>
                        <div className="mt-auto pt-4 border-t border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">{pub.journal} • {pub.year}</span>
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center text-sm font-semibold"
                            >
                              Read Paper <ChevronRight size={16} className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>

            {/* Research Topics */}
            <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-center mb-6 text-purple-300">
                Research Topics & Domains
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  'Urban Planning & AI',
                  'Risk Management',
                  'Real-Time Systems',
                  'Data Engineering',
                  'Traffic Monitoring',
                  'Computer Vision',
                  'YOLO & OpenCV',
                  'Delta Lake'
                ].map((topic, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700 hover:border-purple-500 transition-colors">
                    <p className="text-purple-300 font-semibold text-sm">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Citations & Impact */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <Users className="text-blue-400 mb-3" size={32} />
                <h4 className="text-lg font-bold text-blue-300 mb-2">Academic Impact</h4>
                <p className="text-gray-300 text-sm">
                  Contributing to the global research community through high-quality peer-reviewed publications.
                </p>
              </div>
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <TrendingUp className="text-purple-400 mb-3" size={32} />
                <h4 className="text-lg font-bold text-purple-300 mb-2">Industry Application</h4>
                <p className="text-gray-300 text-sm">
                  Research that translates directly into practical solutions for real-world challenges.
                </p>
              </div>
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <Award className="text-yellow-400 mb-3" size={32} />
                <h4 className="text-lg font-bold text-yellow-300 mb-2">Peer Recognition</h4>
                <p className="text-gray-300 text-sm">
                  Validated by expert peer review in prestigious journals and conferences.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
