import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, ArrowRight, Award, BookOpen, TrendingUp, Users, Sparkles, Brain, Zap, Code, Database, Cpu, Network } from 'lucide-react';
import IntroScreen from './components/IntroScreen';
import Navigation from './components/Navigation';
import Background from './components/Background';
import DisplayImageContainer from './components/DisplayImageContainer';
import TypingEffect from './components/TypingEffect';
import TriviaGame from './components/TriviaGame';
import ContactForm from './components/ContactForm';
import profileImage from './assets/sajud5.png';
import MembershipSlider from './components/MembershipSlider';
import { publications, judgingExperiences, mediaAppearances } from './data/portfolioData';

// Animated Technology Icon Component
const TechnologyIcon = ({ icon, delay }) => {
  return (
    <div
      className="text-purple-400/60 hover:text-purple-400 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {icon}
    </div>
  );
};

// Tech Stack Showcase Component
const TechStackShowcase = () => {
  const technologies = [
    { name: 'Python', icon: '🐍' },
    { name: 'TensorFlow', icon: '🤖' },
    { name: 'PySpark', icon: '⚡' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'Docker', icon: '🐳' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'ML', icon: '🧠' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-wrap justify-center gap-3 items-center">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 px-4 py-2 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <span className="text-2xl mr-2">{tech.icon}</span>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-purple-300 transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);

  if (showIntro) {
    return (
      <IntroScreen
        onEnter={() => {
          setShowIntro(false);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  // Calculate stats
  const publicationCount = publications.length;
  const judgingCount = judgingExperiences.length;
  const mediaCount = mediaAppearances.length;

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-4 pt-32 sm:p-6 sm:pt-28">
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">
            {/* Animated Technology Icons */}
            <div className="mb-8 flex items-center justify-center gap-4 flex-wrap">
              <TechnologyIcon icon={<Brain size={40} />} delay={0} />
              <TechnologyIcon icon={<Code size={40} />} delay={200} />
              <TechnologyIcon icon={<Database size={40} />} delay={400} />
              <TechnologyIcon icon={<Cpu size={40} />} delay={600} />
              <TechnologyIcon icon={<Network size={40} />} delay={800} />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600">
                Sajud Hamza Elinjulliparambil
              </span>
            </h1>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-blue-300 h-16 sm:h-20 flex items-center justify-center">
              <TypingEffect
                phrases={[
                  "Senior Data Engineer",
                  "AI & ML Researcher",
                  "Ph.D. Candidate in Computer Science",
                  "Award Judge & Peer Reviewer",
                  "Published Author",
                  "Technology Innovator"
                ]}
                className="text-purple-400"
              />
            </div>

            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300 leading-relaxed">
              Building intelligent systems at the intersection of data engineering, machine learning, and AI innovation.
              Transforming complex data into actionable insights and contributing to the future of technology.
            </p>

            {/* Profile Image */}
            <div className="mb-12">
              <DisplayImageContainer imageUrl={profileImage} />
            </div>

            {/* Tech Stack Visualization */}
            <TechStackShowcase />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 mt-12">
              <Link
                to="/publications"
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
              >
                <BookOpen size={24} />
                Explore My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 border-2 border-purple-500/50 hover:border-purple-400"
              >
                <Mail size={24} />
                Get in Touch
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                <BookOpen className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">{publicationCount}+</div>
                <div className="text-gray-300">Research Publications</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-500/30">
                <Award className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-blue-300 mb-2">{judgingCount}+</div>
                <div className="text-gray-300">Award Judging Panels</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                <TrendingUp className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">{mediaCount}+</div>
                <div className="text-gray-300">Media Features</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trivia Game Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10 bg-black/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Test Your AI & Data Knowledge
              </span>
            </h2>
            <div className="bg-gray-900/95 p-8 rounded-2xl shadow-2xl border border-purple-500/20">
              <TriviaGame />
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Areas of Expertise
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Brain size={32} className="text-purple-400" />,
                  title: 'AI & Machine Learning',
                  description: 'Deep dives into modern AI architectures, neural networks, and practical ML applications transforming industries.',
                },
                {
                  icon: <Zap size={32} className="text-blue-400" />,
                  title: 'Data Engineering & Big Data',
                  description: 'Building scalable data pipelines, real-time processing systems, and cloud-native data architectures.',
                },
                {
                  icon: <TrendingUp size={32} className="text-purple-400" />,
                  title: 'AI-Powered Risk Management',
                  description: 'How AI is revolutionizing fraud detection, background screening, and enterprise risk management.',
                },
                {
                  icon: <Users size={32} className="text-blue-400" />,
                  title: 'AI in Urban Planning',
                  description: 'Real-time traffic monitoring, smart city initiatives, and AI-driven solutions for sustainable urban development.',
                },
                {
                  icon: <Sparkles size={32} className="text-purple-400" />,
                  title: 'Innovation & Startups',
                  description: 'Building AI-first products, navigating the startup landscape, and scaling technical teams.',
                },
                {
                  icon: <BookOpen size={32} className="text-blue-400" />,
                  title: 'Research & Academia',
                  description: 'Bridging the gap between research and industry, peer review insights, and academic excellence.',
                },
              ].map((topic, index) => (
                <div
                  key={index}
                  className="bg-gray-800/90 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] border border-gray-700 hover:border-purple-500/50"
                >
                  <div className="mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold text-blue-300 mb-3">{topic.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me / Credentials */}
        <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10 bg-black/40">
          <div className="max-w-6xl mx-auto bg-gray-900/95 p-8 md:p-12 rounded-2xl shadow-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Research & Contributions
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 rounded-full p-3 flex-shrink-0">
                    <Award className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">Award-Winning Expertise</h3>
                    <p className="text-gray-300">
                      Recognized judge for prestigious awards including QS Reimagine, Titan Awards, Globee Awards, 
                      and Business Intelligence Awards. Peer reviewer for international conferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">Published Researcher</h3>
                    <p className="text-gray-300">
                      Multiple peer-reviewed publications in AI, data engineering, and machine learning. 
                      Contributing to the advancement of knowledge in the field.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 rounded-full p-3 flex-shrink-0">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">Industry Practitioner</h3>
                    <p className="text-gray-300">
                      Hands-on experience building production AI systems. Currently pursuing a Ph.D. in Computer Science 
                      while working as a Senior Data Engineer on real-world applications.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">Media Presence</h3>
                    <p className="text-gray-300">
                      Featured in Tech Times, Benzinga, Latestly, and IBT Times. Experienced in communicating 
                      complex technical concepts to diverse audiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 rounded-full p-3 flex-shrink-0">
                    <Brain className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">Practical Insights</h3>
                    <p className="text-gray-300">
                      Real-world case studies from working with organizations like City of London Police, 
                      Fama Technologies, and leading enterprises. Not just theory—proven results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-300 mb-2">Continuous Innovation</h3>
                    <p className="text-gray-300">
                      Actively contributing to the field through research, publications, and peer review. 
                      Passionate about advancing the state of AI and data engineering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Memberships */}
        <div className="w-full flex justify-center items-center pt-12 pb-4">
          <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-widest">
            Active Member at:
          </h3>
        </div>
        <MembershipSlider />

        {/* Contact Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Let's Connect
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
              Open to collaborations, research discussions, and select speaking opportunities that align with my expertise.
            </p>
            <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto italic">
              For speaking engagements, please reach out to discuss your event and how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
              >
                <Mail size={24} />
                Open Contact Form
              </button>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <a
                href="https://www.linkedin.com/in/sajud-hamza/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors duration-200"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://github.com/sajudhamza"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors duration-200"
              >
                <Github size={32} />
              </a>
              <a
                href="mailto:sajudhamza@gmail.com"
                className="hover:text-purple-400 transition-colors duration-200"
              >
                <Mail size={32} />
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-black/90 p-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sajud Hamza Elinjulliparambil. All rights reserved.</p>
        </footer>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </div>
  );
};

export default App;
