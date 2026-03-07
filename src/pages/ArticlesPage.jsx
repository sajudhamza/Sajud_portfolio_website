import React from 'react';
import { Feather, TrendingUp, ExternalLink, Calendar, Globe, Award, BookOpen } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import ArticleCarousel from '../components/ArticleCarousel';
import Background from '../components/Background';
import { articles } from '../data/portfolioData';

const ArticlesPage = () => {
  const platforms = [...new Set(articles.map(a => a.platform))];
  const totalArticles = articles.length;
  const latestArticle = articles.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10 scroll-content-layer">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-4">
                <Feather size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Published Articles
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Sharing insights on AI, machine learning, data analytics, and technology trends 
              through articles published on leading platforms and publications.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-6 rounded-xl border border-green-500/30 text-center">
                <BookOpen className="text-green-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-green-300 mb-2">{totalArticles}</div>
                <div className="text-gray-300">Published Articles</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 p-6 rounded-xl border border-emerald-500/30 text-center">
                <Globe className="text-emerald-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-emerald-300 mb-2">{platforms.length}</div>
                <div className="text-gray-300">Platforms</div>
              </div>
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-6 rounded-xl border border-green-500/30 text-center">
                <TrendingUp className="text-green-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-green-300 mb-2">1000+</div>
                <div className="text-gray-300">Readers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {latestArticle && (
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-8 rounded-2xl border border-green-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-yellow-400" size={20} />
                <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wide">Latest Article</span>
              </div>
              <h2 className="text-3xl font-bold mb-3 text-green-300">{latestArticle.title}</h2>
              <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>{latestArticle.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{latestArticle.date}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{latestArticle.summary}</p>
              <a
                href={latestArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Read Article <ExternalLink size={18} />
              </a>
            </div>
          </section>
        )}

        {/* Platforms Showcase */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Featured Platforms</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 px-6 py-3 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
                >
                  <span className="text-green-300 font-semibold">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="articles"
            title="All Articles"
            icon={<Feather size={40} className="text-purple-400" />}
          >
            <div className="mb-8 text-center">
              <p className="text-gray-400 mb-4">
                Browse through my published articles covering AI, data analytics, and technology innovation
              </p>
            </div>
            <ArticleCarousel articles={articles} />

            {/* Writing Topics */}
            <div className="mt-16 bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-8 rounded-2xl border border-green-500/20">
              <h3 className="text-2xl font-bold text-center mb-6 text-green-300">
                Topics & Themes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Machine Learning',
                  'Data Analytics',
                  'Background Verification',
                  'Social Media Screening',
                  'Data Governance',
                  'Predictive Analytics',
                  'Workplace Safety',
                  'Fraud Detection',
                  'Digital Transformation'
                ].map((topic, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg text-center border border-gray-700 hover:border-green-500 transition-colors">
                    <p className="text-green-300 font-semibold text-sm">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <Globe className="text-green-400 mb-3" size={32} />
                <h4 className="text-lg font-bold text-green-300 mb-2">Industry Insights</h4>
                <p className="text-gray-300 text-sm">
                  Articles that provide valuable insights into how AI and data analytics are transforming 
                  industries and solving real-world problems.
                </p>
              </div>
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <TrendingUp className="text-emerald-400 mb-3" size={32} />
                <h4 className="text-lg font-bold text-emerald-300 mb-2">Thought Leadership</h4>
                <p className="text-gray-300 text-sm">
                  Contributing to the broader technology conversation by sharing expertise and perspectives 
                  on emerging trends and best practices.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
