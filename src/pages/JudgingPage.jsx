import React, { useState } from 'react';
import { Gavel, Award, Star, Users, Calendar, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import Background from '../components/Background';
import { judgingExperiences } from '../data/portfolioData';

const JudgingPage = () => {
  const [selectedCertificateImage, setSelectedCertificateImage] = useState(null);
  
  const totalJudgingRoles = judgingExperiences.length;
  const featuredOrganizations = [...new Set(judgingExperiences.map(j => j.organization))];
  const totalEntriesJudged = judgingExperiences.reduce((sum, j) => {
    const matches = j.description.match(/(\d+)\s+entr/i);
    return sum + (matches ? parseInt(matches[1]) : 0);
  }, 0);

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-full p-4">
                <Gavel size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Judging & Peer Review
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Contributing to the recognition of excellence and innovation by serving as a judge and peer reviewer 
              for prestigious awards, competitions, and academic conferences worldwide.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 p-6 rounded-xl border border-orange-500/30 text-center">
                <Gavel className="text-orange-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-orange-300 mb-2">{totalJudgingRoles}</div>
                <div className="text-gray-300">Judging Roles</div>
              </div>
              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 p-6 rounded-xl border border-red-500/30 text-center">
                <Users className="text-red-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-red-300 mb-2">{totalEntriesJudged}+</div>
                <div className="text-gray-300">Entries Judged</div>
              </div>
              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 p-6 rounded-xl border border-orange-500/30 text-center">
                <Award className="text-orange-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-orange-300 mb-2">{featuredOrganizations.length}</div>
                <div className="text-gray-300">Organizations</div>
              </div>
              <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 p-6 rounded-xl border border-red-500/30 text-center">
                <CheckCircle className="text-red-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-red-300 mb-2">100%</div>
                <div className="text-gray-300">Commitment</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Organizations */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Prestigious Organizations</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {featuredOrganizations.slice(0, 8).map((org, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 px-6 py-3 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors"
                >
                  <span className="text-orange-300 font-semibold text-sm">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="judging"
            title="Judging Experiences & Peer Reviews"
            icon={<Gavel size={40} className="text-purple-400" />}
          >
            <div className="relative border-l-4 border-orange-600 pl-8 py-4">
              {judgingExperiences.map((experience, index) => (
                <div key={index} className="mb-12 last:mb-0 relative">
                  <div className="absolute -left-[42px] top-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center z-10 border-4 border-black shadow-lg">
                    <Gavel size={20} className="text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-xl border border-orange-500/30 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-orange-300 mb-2">{experience.title}</h3>
                        <div className="flex items-center gap-4 flex-wrap mb-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Award size={16} />
                            <span className="font-semibold">{experience.organization}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar size={16} />
                            <span>{experience.date}</span>
                          </div>
                        </div>
                      </div>
                      {experience.judgeFeature && (
                        <a
                          href={experience.judgeFeature.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 self-start flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 font-semibold px-4 py-2 rounded-full transition-colors"
                        >
                          <Star size={16} />
                          {experience.judgeFeature.text}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{experience.description}</p>

                    {experience.certificateLinks && experience.certificateLinks.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Certificates & Documentation</h4>
                        <div className="flex flex-wrap gap-3">
                          {experience.certificateLinks.map((link, linkIndex) => {
                            const isExternal = link.url.startsWith('http');
                            const isPdf = link.url.endsWith('.pdf');
                            const commonClasses =
                              'inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 rounded-lg';

                            if (isExternal || isPdf) {
                              return (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={commonClasses}
                                >
                                  <Award size={16} />
                                  {link.name}
                                  <ExternalLink size={14} />
                                </a>
                              );
                            } else {
                              return (
                                <button
                                  key={linkIndex}
                                  onClick={() => setSelectedCertificateImage(link.url)}
                                  className={commonClasses}
                                >
                                  <Award size={16} />
                                  {link.name}
                                </button>
                              );
                            }
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Section */}
            <div className="mt-16 bg-gradient-to-r from-orange-900/30 to-red-900/30 p-8 rounded-2xl border border-orange-500/20">
              <h3 className="text-2xl font-bold text-center mb-6 text-orange-300">
                Impact & Contribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Users className="text-orange-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-orange-300 mb-2">Mentoring</h4>
                  <p className="text-gray-300 text-sm">
                    Guiding aspiring students and innovators in developing their ideas and prototypes
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <TrendingUp className="text-red-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-red-300 mb-2">Innovation Recognition</h4>
                  <p className="text-gray-300 text-sm">
                    Identifying and recognizing breakthrough technologies and business ideas
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <CheckCircle className="text-orange-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-orange-300 mb-2">Quality Assurance</h4>
                  <p className="text-gray-300 text-sm">
                    Ensuring high standards through rigorous peer review and evaluation processes
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {selectedCertificateImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedCertificateImage(null)}
        >
          <div
            className="relative bg-gray-800 rounded-xl p-4 max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold p-2 rounded-full bg-gray-700 hover:bg-gray-600 z-10"
              onClick={() => setSelectedCertificateImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedCertificateImage}
              alt="Certificate"
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://placehold.co/800x600/333333/FFFFFF?text=Image+Not+Found';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgingPage;
