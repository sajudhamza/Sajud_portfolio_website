import React from 'react';
import { Newspaper, TrendingUp, Globe, Calendar, ExternalLink, Award, Quote } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import MediaCard from '../components/MediaCard';
import Background from '../components/Background';
import { mediaAppearances } from '../data/portfolioData';

const MediaPage = () => {
  const totalFeatures = mediaAppearances.length;
  const platforms = [...new Set(mediaAppearances.map(m => m.platform))];
  const latestFeature = mediaAppearances.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full p-4">
                <Newspaper size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Media Appearances
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Featured in leading technology and business publications, sharing insights on AI, 
              data analytics, and innovation that's shaping the future of technology.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30 text-center">
                <Newspaper className="text-cyan-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-cyan-300 mb-2">{totalFeatures}</div>
                <div className="text-gray-300">Media Features</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 text-center">
                <Globe className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-blue-300 mb-2">{platforms.length}</div>
                <div className="text-gray-300">Publications</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30 text-center">
                <TrendingUp className="text-cyan-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-cyan-300 mb-2">100K+</div>
                <div className="text-gray-300">Reach</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Publication */}
        {latestFeature && (
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-yellow-400" size={20} />
                <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wide">Latest Feature</span>
              </div>
              <h2 className="text-3xl font-bold mb-3 text-cyan-300">{latestFeature.title}</h2>
              <div className="flex items-center gap-4 mb-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>{latestFeature.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{latestFeature.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Newspaper size={16} />
                  <span>{latestFeature.type}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">{latestFeature.description}</p>
              {latestFeature.link && latestFeature.link !== '#' && (
                <a
                  href={latestFeature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Read Article <ExternalLink size={18} />
                </a>
              )}
            </div>
          </section>
        )}

        {/* Platforms Showcase */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Featured Publications</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors"
                >
                  <span className="text-cyan-300 font-semibold">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="media"
            title="All Media Features"
            icon={<Newspaper size={40} className="text-purple-400" />}
          >
            <div className="mb-8 text-center">
              <p className="text-gray-400 mb-4">
                Explore coverage of my work and insights in major technology and business publications
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaAppearances.map((item, index) => (
                <div key={index} className="transform transition-all duration-300 hover:scale-105">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>

            {/* Impact Section */}
            <div className="mt-16 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
              <div className="flex items-center justify-center mb-6">
                <Quote className="text-cyan-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-6 text-cyan-300">
                Media Impact & Recognition
              </h3>
              <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed mb-8">
                Through media appearances, I've had the opportunity to share insights on how AI and data analytics 
                are transforming industries, improving safety, and creating innovative solutions for real-world challenges. 
                These features help bring attention to important technological advancements and their practical applications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Globe className="text-cyan-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-cyan-300 mb-2">Global Reach</h4>
                  <p className="text-gray-300 text-sm">
                    Stories reaching audiences worldwide through major publications
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <TrendingUp className="text-blue-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Thought Leadership</h4>
                  <p className="text-gray-300 text-sm">
                    Contributing to public discourse on technology and innovation
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Award className="text-cyan-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-cyan-300 mb-2">Industry Recognition</h4>
                  <p className="text-gray-300 text-sm">
                    Recognized for expertise in AI, data analytics, and innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Topics Covered */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-300">Topics Covered</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'AI & Machine Learning',
                  'Data Analytics',
                  'Social Media Screening',
                  'Background Verification',
                  'Fraud Detection',
                  'Workplace Safety',
                  'Urban Planning',
                  'Real-Time Systems'
                ].map((topic, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700 hover:border-cyan-500 transition-colors">
                    <p className="text-cyan-300 font-semibold text-sm">{topic}</p>
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

export default MediaPage;
