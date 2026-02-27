import React from 'react';
import { Lightbulb, Award, TrendingUp, FileText, ExternalLink, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import PatentCard from '../components/PatentCard';
import Background from '../components/Background';
import { patents } from '../data/portfolioData';

const PatentsPage = () => {
  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full p-4 animate-pulse">
                <Lightbulb size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Patents & Innovations
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transforming groundbreaking ideas into protected intellectual property. 
              My innovations in AI, financial technology, and precision optical measurement systems are making a tangible impact across finance and industry.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 text-center">
                <Award className="text-yellow-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-yellow-300 mb-2">{patents.length}</div>
                <div className="text-gray-300">Granted Patents</div>
              </div>
              <div className="bg-gradient-to-br from-orange-900/50 to-yellow-900/50 backdrop-blur-sm p-6 rounded-xl border border-orange-500/30 text-center">
                <TrendingUp className="text-orange-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-orange-300 mb-2">100%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 text-center">
                <FileText className="text-yellow-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-yellow-300 mb-2">UK</div>
                <div className="text-gray-300">International</div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Impact Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20">
            <h2 className="text-3xl font-bold text-center mb-6 text-yellow-300">
              Innovation Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <Lightbulb className="text-yellow-400" size={24} />
                  Financial Technology & Risk Intelligence
                </h3>
                <p className="text-gray-300">
                  Revolutionary real-time financial risk prediction systems that transform how organizations 
                  manage and mitigate financial risks in dynamic markets.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <TrendingUp className="text-yellow-400" size={24} />
                  Stereo Optical Measurement & Inspection
                </h3>
                <p className="text-gray-300">
                  High-precision stereo optical measurement devices for inspecting unknown-scale objects using only two vision cameras, 
                  enhancing dimensional accuracy, quality control, and safety in industrial and engineering environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="patents"
            title="Granted Patents"
            icon={<Award size={40} className="text-purple-400" />}
          >
            <div className="relative border-l-4 border-yellow-600 pl-8 py-4">
              {patents.map((patent, index) => (
                <div key={index} className="mb-12 last:mb-0 relative">
                  <div className="absolute -left-[42px] top-0 w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center z-10 border-4 border-black shadow-lg">
                    <Award size={20} className="text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-yellow-300 mb-2">{patent.title}</h3>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FileText size={16} />
                            <span className="font-semibold">Patent No: {patent.patentNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar size={16} />
                            <span>{patent.date}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={patent.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 px-4 py-2 rounded-lg transition-colors"
                      >
                        <ExternalLink size={18} />
                        View Patent
                      </a>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{patent.description}</p>
                    <PatentCard patent={patent} />
                  </div>
                </div>
              ))}
            </div>

            {/* Future Innovations */}
            <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold text-center mb-6 text-purple-300">
                Ongoing Research & Future Innovations
              </h3>
              <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                Currently working on several innovative projects in AI-driven systems, machine learning algorithms, 
                and advanced data processing technologies. These innovations aim to push the boundaries of what's 
                possible in real-time intelligent systems and financial technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {['AI-Powered Analytics', 'Edge Computing', 'Quantum ML Applications'].map((topic, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700">
                    <p className="text-purple-300 font-semibold">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PatentsPage;
