import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, BookOpen, Feather, Gavel, Linkedin, Github, Mail, ChevronRight, Image, Tv, PlayCircle, Mic, Newspaper } from 'lucide-react';

// Data
import { publications, articles, judgingExperiences, photos, mediaAppearances } from './data/portfolioData';
import MediaCard from './components/MediaCard';

// Components
import IntroScreen from './components/IntroScreen';
import NavItem from './components/NavItem';
import Section from './components/Section';
import TypingEffect from './components/TypingEffect';
import SimpleGame from './components/SimpleGame';
import DisplayImageContainer from './components/DisplayImageContainer';
import SkillBubble from './components/SkillBubble';
import FlipCard from './components/FlipCard';
import ArticleCarousel from './components/ArticleCarousel';
import PhotoGallery from './components/PhotoGallery';
import profileImage from './assets/sajud4.png';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const sectionsRef = useRef([]);
  const canvasRef = useRef(null);

  // Persistent, gentle drifting starfield for the main app
  useEffect(() => {
    if (showIntro) return; // Don't run this animation during the intro
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 400; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const fov = 300;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(star => {
        star.z -= 0.5; // Constant drift
        if (star.z <= 0) {
          star.z = 1000;
        }
        
        const scale = fov / (fov + star.z);
        const x2d = star.x * scale + centerX;
        const y2d = star.y * scale + centerY;
        const radius = star.size * scale;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${scale * 0.7})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener('resize', setup);
    return () => {
      window.removeEventListener('resize', setup);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showIntro]); // Rerun this effect when showIntro changes

  const scrollToSection = (id) => {
    const section = sectionsRef.current.find(sec => sec && sec.id === id);
    if (section) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const offsetTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  };

  if (showIntro) {
    return <IntroScreen onEnter={() => {
        setShowIntro(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
    }} />;
  }

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm shadow-lg p-4 flex justify-center space-x-6 md:space-x-12">
          <NavItem label="Home" onClick={() => scrollToSection('home')} />
          <NavItem label="Qualifications" onClick={() => scrollToSection('qualifications')} />
          <NavItem label="Publications" onClick={() => scrollToSection('publications')} />
          <NavItem label="Articles" onClick={() => scrollToSection('articles')} />
          <NavItem label="Judging" onClick={() => scrollToSection('judging')} />
          <NavItem label="Media" onClick={() => scrollToSection('media')} />
          <NavItem label="Photos" onClick={() => scrollToSection('photos')} />
        </nav>

        <section
          id="home"
          ref={el => sectionsRef.current[0] = el}
          className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-6 pt-28"
        >
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              Hi, I'm <span className="text-purple-400">Sajud Hamza Elinjulliparambil</span>
            </h1>
            <TypingEffect
              phrases={["Data Engineer", "AI Engineer", "Machine Learning Enthusiast", "Problem Solver"]}
              className="text-3xl md:text-5xl font-semibold text-blue-300 mb-8"
            />
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
              Passionate about building robust data pipelines, developing intelligent AI solutions, and transforming complex data into actionable insights.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">Catch Me If You Can!</h3>
                <p className="text-gray-300 mb-6">Test your reflexes! Click my face as fast as you can to score points.</p>
                <SimpleGame faceIcon={profileImage} />
              </div>
              <div className="p-6 rounded-xl text-center w-full md:w-1/2 h-full flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">Sajud Hamza</h3>
                <DisplayImageContainer imageUrl={profileImage} />
              </div>
            </div>
          </div>
        </section>

        <Section id="qualifications" ref={el => sectionsRef.current[1] = el} title="My Qualifications" icon={<GraduationCap size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center"><Briefcase size={24} className="mr-2" /> Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['Python', 'SQL', 'PySpark', 'AWS', 'Azure', 'GCP', 'Machine Learning', 'Deep Learning', 'NLP', 'ETL/ELT', 'Docker', 'Kubernetes', 'Airflow'].map((skill, index) => (
                  <SkillBubble key={index} skill={skill} />
                ))}
              </div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center"><GraduationCap size={24} className="mr-2" /> Education</h3>
              <div className="space-y-4">
              <div>
                  <p className="font-semibold text-lg">Doctor of Philosophy Computer Science </p>
                  <p className="text-gray-400">Pace University, New York, New York</p>
                  <p className="text-sm text-gray-500">2023 - 2026</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">Master of Science in Information Systems </p>
                  <p className="text-gray-400">Pace University, New York, New York</p>
                  <p className="text-sm text-gray-500">2018 - 2020</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">Bachelor of Engineering </p>
                  <p className="text-gray-400">Mumbai University, Mumbai, Maharashtra</p>
                  <p className="text-sm text-gray-500">2010 - 2014</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="publications" ref={el => sectionsRef.current[2] = el} title="Publications" icon={<BookOpen size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <FlipCard key={index} frontContent={<><h4 className="text-xl font-bold text-blue-300 mb-2">{pub.title}</h4><p className="text-gray-400 text-sm mb-2">{pub.journal}</p><p className="text-gray-500 text-xs">{pub.year}</p></>} backContent={<><p className="text-gray-300 text-sm mb-3">{pub.description}</p><a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center text-sm">Read More <ChevronRight size={16} className="ml-1" /></a></>} />
            ))}
          </div>
        </Section>

        <Section id="articles" ref={el => sectionsRef.current[3] = el} title="Articles" icon={<Feather size={40} className="text-purple-400" />}>
          <ArticleCarousel articles={articles} />
        </Section>

        <Section id="media" ref={el => sectionsRef.current[6] = el} title="Media Appearances" icon={<Newspaper size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaAppearances.map((item, index) => (
              <MediaCard key={index} item={item} />
            ))}
          </div>
        </Section>

        <Section id="judging" ref={el => sectionsRef.current[4] = el} title="Judging & Peer Reviews" icon={<Gavel size={40} className="text-purple-400" />}>
          <div className="relative border-l-2 border-purple-600 pl-8 py-4">
            {judgingExperiences.map((experience, index) => (
              <div key={index} className="mb-8 last:mb-0 relative">
                <div className="absolute -left-3.5 top-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center"><Gavel size={16} className="text-white" /></div>
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-blue-300 mb-2">{experience.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{experience.organization} | {experience.date}</p>
                  <p className="text-gray-300 text-sm">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="photos" ref={el => sectionsRef.current[5] = el} title="My Photo Gallery" icon={<Image size={40} className="text-purple-400" />}>
          <PhotoGallery photos={photos} />
        </Section>

        <footer className="bg-black/80 backdrop-blur-sm p-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200"><Linkedin size={28} /></a>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200"><Github size={28} /></a>
            <a href="mailto:your.email@example.com" className="hover:text-purple-400 transition-colors duration-200"><Mail size={28} /></a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;