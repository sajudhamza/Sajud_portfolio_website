// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Briefcase, GraduationCap, BookOpen, Feather, Gavel, Lightbulb, Linkedin, Github, Mail, ChevronRight, Image, Tv, Newspaper, Award, Star, MessageSquare, LogIn } from 'lucide-react';

// // Data
// import { publications, articles, judgingExperiences, photos, mediaAppearances, patents, testimonials } from './data/portfolioData';

// // Components
// import IntroScreen from './components/IntroScreen';
// import NavItem from './components/NavItem';
// import Section from './components/Section';
// import TypingEffect from './components/TypingEffect';
// import SimpleGame from './components/SimpleGame';
// import DisplayImageContainer from './components/DisplayImageContainer';
// import SkillBubble from './components/SkillBubble';
// import FlipCard from './components/FlipCard';
// import ArticleCarousel from './components/ArticleCarousel';
// import PhotoGallery from './components/PhotoGallery';
// import profileImage from './assets/sajud5.png';
// import PatentCard from './components/PatentCard';
// import MediaCard from './components/MediaCard';
// import Background from './components/Background';
// import MembershipSlider from './components/MembershipSlider';

// const App = () => {
//   const [showIntro, setShowIntro] = useState(true);
//   const sectionsRef = useRef([]);
//   const navigate = useNavigate();
  
//   const [selectedCertificateImage, setSelectedCertificateImage] = useState(null);

//   const scrollToSection = (id) => {
//     const section = sectionsRef.current.find(sec => sec && sec.id === id);
//     if (section) {
//       const navHeight = document.querySelector('nav').offsetHeight;
//       const offsetTop = section.getBoundingClientRect().top + window.scrollY;
//       window.scrollTo({
//         top: offsetTop - navHeight,
//         behavior: 'smooth'
//       });
//     }
//   };

//   if (showIntro) {
//     return <IntroScreen onEnter={() => {
//         setShowIntro(false);
//         window.scrollTo({ top: 0, behavior: 'instant' });
//     }} />;
//   }

//   return (
//     <div className="min-h-screen text-gray-100 font-sans bg-black">
//       <Background />
//       <div className="relative z-10">
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm shadow-lg p-2 flex justify-center flex-wrap gap-x-1 sm:gap-x-2 md:gap-x-4">
//           <NavItem label="Home" onClick={() => scrollToSection('home')} />
//           <NavItem label="Qualifications" onClick={() => scrollToSection('qualifications')} />
//           <NavItem label="Patents" onClick={() => scrollToSection('patents')} />
//           <NavItem label="Publications" onClick={() => scrollToSection('publications')} />
//           <NavItem label="Articles" onClick={() => scrollToSection('articles')} />
//           <NavItem label="Judging" onClick={() => scrollToSection('judging')} />
//           <NavItem label="Media" onClick={() => scrollToSection('media')} />
//           <NavItem label="Photos" onClick={() => scrollToSection('photos')} />
//           <NavItem label="Testimonials" onClick={() => scrollToSection('testimonials')} />
//           <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-purple-400 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-2">
//             <LogIn size={16} /> Login
//           </button>
//         </nav>

//         <section
//           id="home"
//           ref={el => sectionsRef.current[0] = el}
//           className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-4 pt-32 sm:p-6 sm:pt-28"
//         >
//           <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">
//             <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
//               Hi, I'm <span className="text-purple-400">Sajud Hamza Elinjulliparambil</span>
//             </h1>
//             <TypingEffect
//               phrases={["Data Engineer", "AI Engineer", "Machine Learning Enthusiast", "Problem Solver"]}
//               className="text-2xl sm:text-3xl md:text-5xl font-semibold text-blue-300 mb-8 h-16 sm:h-auto"
//             />
//             <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
//               Passionate about building robust data pipelines, developing intelligent AI solutions, and transforming complex data into actionable insights.
//             </p>
//             <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full">
//               <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full lg:w-1/2">
//                 <h3 className="text-2xl font-bold text-blue-300 mb-4">Catch Me If You Can!</h3>
//                 <p className="text-gray-300 mb-6">Test your reflexes! Click my face as fast as you can to score points.</p>
//                 <SimpleGame faceIcon={profileImage} />
//               </div>
//               <div className="p-6 rounded-xl text-center w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
//                 <h3 className="text-2xl font-bold text-blue-300 mb-4">Sajud Hamza</h3>
//                 <DisplayImageContainer imageUrl={profileImage} />
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="w-full flex justify-center items-center pt-12 pb-4">
//           <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-widest">
//             Active Member at:
//           </h3>
//         </div>
//         <MembershipSlider />

//         <Section id="qualifications" ref={el => sectionsRef.current[1] = el} title="My Qualifications" icon={<GraduationCap size={40} className="text-purple-400" />}>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
//               <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center"><Briefcase size={24} className="mr-2" /> Skills</h3>
//               <div className="flex flex-wrap gap-3">
//                 {['Python', 'SQL', 'PySpark', 'AWS', 'Azure', 'GCP', 'Machine Learning', 'Deep Learning', 'NLP', 'ETL/ELT', 'Docker', 'Kubernetes', 'Airflow'].map((skill, index) => (
//                   <SkillBubble key={index} skill={skill} />
//                 ))}
//               </div>
//             </div>
//             <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
//               <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center"><GraduationCap size={24} className="mr-2" /> Education</h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="font-semibold text-lg">Doctor of Philosophy Computer Science</p>
//                   <p className="text-gray-400">Pace University, New York, New York</p>
//                   <p className="text-sm text-gray-500">2023 - 2026</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-lg">Master of Science in Information Systems</p>
//                   <p className="text-gray-400">Pace University, New York, New York</p>
//                   <p className="text-sm text-gray-500">2018 - 2020</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-lg">Bachelor of Engineering</p>
//                   <p className="text-gray-400">Mumbai University, Mumbai, Maharashtra</p>
//                   <p className="text-sm text-gray-500">2010 - 2014</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Section>

//         <Section id="patents" ref={el => sectionsRef.current[2] = el} title="Patents" icon={<Lightbulb size={40} className="text-purple-400" />}>
//           <div className="relative border-l-2 border-purple-600 pl-8 py-4">
//             {patents.map((patent, index) => (
//               <div key={index} className="mb-8 last:mb-0 relative">
//                 <div className="absolute -left-3.5 top-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center z-10">
//                   <Lightbulb size={16} className="text-white" />
//                 </div>
//                 <PatentCard patent={patent} />
//               </div>
//             ))}
//           </div>
//         </Section>
        
//         <Section id="publications" ref={el => sectionsRef.current[3] = el} title="Publications" icon={<BookOpen size={40} className="text-purple-400" />}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {publications.map((pub, index) => (
//               <FlipCard key={index} frontContent={<><h4 className="text-xl font-bold text-blue-300 mb-2">{pub.title}</h4><p className="text-gray-400 text-sm mb-2">{pub.journal}</p><p className="text-gray-500 text-xs">{pub.year}</p></>} backContent={<><p className="text-gray-300 text-sm mb-3">{pub.description}</p><a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center text-sm">Read More <ChevronRight size={16} className="ml-1" /></a></>} />
//             ))}
//           </div>
//         </Section>

//         <Section id="articles" ref={el => sectionsRef.current[4] = el} title="Articles" icon={<Feather size={40} className="text-purple-400" />}>
//           <ArticleCarousel articles={articles} />
//         </Section>
        
//         <Section id="judging" ref={el => sectionsRef.current[5] = el} title="Judging & Peer Reviews" icon={<Gavel size={40} className="text-purple-400" />}>
//           <div className="relative border-l-2 border-purple-600 pl-8 py-4">
//             {judgingExperiences.map((experience, index) => (
//               <div key={index} className="mb-8 last:mb-0 relative">
//                 <div className="absolute -left-3.5 top-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center z-10"><Gavel size={16} className="text-white" /></div>
//                 <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
//                   {/* UPDATED: This container is now responsive */}
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
//                     <div>
//                       <h3 className="text-xl font-bold text-blue-300 mb-2">{experience.title}</h3>
//                       <p className="text-gray-400 text-sm mb-2">{experience.organization} | {experience.date}</p>
//                     </div>
//                     {experience.judgeFeature && (
//                       <a 
//                         href={experience.judgeFeature.url} 
//                         target="_blank" 
//                         rel="noopener noreferrer" 
//                         className="flex-shrink-0 self-start mt-2 sm:mt-1 sm:ml-4 text-xs bg-yellow-500/20 text-yellow-300 font-semibold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-yellow-500/30 transition-colors"
//                       >
//                         <Star size={14} />
//                         {experience.judgeFeature.text}
//                       </a>
//                     )}
//                   </div>
//                   <p className="text-gray-300 text-sm mt-2">{experience.description}</p>
                  
//                   <div className="flex flex-wrap gap-4 mt-4">
//                     {experience.certificateLinks && experience.certificateLinks.map((link, linkIndex) => {
//                         const isExternal = link.url.startsWith('http');
//                         const isPdf = link.url.endsWith('.pdf');
//                         const commonClasses = "inline-flex items-center text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors";
                        
//                         if (isExternal || isPdf) {
//                           return (
//                             <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className={commonClasses}>
//                               <Award size={16} className="mr-2" />
//                               {link.name}
//                             </a>
//                           );
//                         } else {
//                           return (
//                             <button key={linkIndex} onClick={() => setSelectedCertificateImage(link.url)} className={commonClasses}>
//                               <Award size={16} className="mr-2" />
//                               {link.name}
//                             </button>
//                           );
//                         }
//                     })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Section>

//         <Section id="media" ref={el => sectionsRef.current[6] = el} title="Media Appearances" icon={<Newspaper size={40} className="text-purple-400" />}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {mediaAppearances.map((item, index) => (
//               <MediaCard key={index} item={item} />
//             ))}
//           </div>
//         </Section>

//         <Section id="photos" ref={el => sectionsRef.current[7] = el} title="My Photo Gallery" icon={<Image size={40} className="text-purple-400" />}>
//           <PhotoGallery photos={photos} />
//         </Section>

//         <Section id="testimonials" ref={el => sectionsRef.current[8] = el} title="Testimonials" icon={<MessageSquare size={40} className="text-purple-400" />}>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {testimonials.map((testimonial) => (
//               <Link key={testimonial.id} to={`/testimonial/${testimonial.id}`} className="text-center group">
//                 <img 
//                   src={testimonial.imageUrl} 
//                   alt={testimonial.name}
//                   className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700 group-hover:border-purple-500 transition-colors duration-300"
//                 />
//                 <p className="mt-4 font-semibold text-blue-300">{testimonial.name}</p>
//               </Link>
//             ))}
//           </div>
//         </Section>

//         <footer className="bg-black/80 backdrop-blur-sm p-8 text-center text-gray-400">
//           <p>&copy; {new Date().getFullYear()} Sajud Hamza Elinjulliparambil. All rights reserved.</p>
//           <div className="flex justify-center space-x-6 mt-4">
//             <a href="https://www.linkedin.com/in/sajud-hamza/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200"><Linkedin size={28} /></a>
//             <a href="https://github.com/sajudhamza" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200"><Github size={28} /></a>
//             <a href="mailto:sajudhamza@gmail.com" className="hover:text-purple-400 transition-colors duration-200"><Mail size={28} /></a>
//           </div>
//         </footer>
//       </div>
      
//       {selectedCertificateImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedCertificateImage(null)}>
//           <div className="relative bg-gray-800 rounded-xl p-4 max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="absolute top-2 right-2 text-white text-3xl font-bold p-2 rounded-full bg-gray-700 hover:bg-gray-600 z-10"
//               onClick={() => setSelectedCertificateImage(null)}
//             >
//               &times;
//             </button>
//             <img
//               src={selectedCertificateImage}
//               alt="Certificate"
//               className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
//               onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/333333/FFFFFF?text=Image+Not+Found'; }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, BookOpen, Feather, Gavel, Lightbulb, Linkedin, Github, Mail, ChevronRight, Image, Tv, Newspaper, Award, Star, MessageSquare, LogIn } from 'lucide-react';

// Data
import { publications, articles, judgingExperiences, photos, mediaAppearances, patents, testimonials, triviaQuestions } from './data/portfolioData';

// Components
import IntroScreen from './components/IntroScreen';
import NavItem from './components/NavItem';
import Section from './components/Section';
import TypingEffect from './components/TypingEffect';
import TriviaGame from './components/TriviaGame';
import DisplayImageContainer from './components/DisplayImageContainer';
import SkillBubble from './components/SkillBubble';
import FlipCard from './components/FlipCard';
import ArticleCarousel from './components/ArticleCarousel';
import PhotoGallery from './components/PhotoGallery';
import profileImage from './assets/sajud5.png';
import PatentCard from './components/PatentCard';
import MediaCard from './components/MediaCard';
import Background from './components/Background';
import MembershipSlider from './components/MembershipSlider';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const sectionsRef = useRef([]);
  const navigate = useNavigate();
  
  const [selectedCertificateImage, setSelectedCertificateImage] = useState(null);

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
      <Background />
      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm shadow-lg p-2 flex justify-center flex-wrap gap-x-1 sm:gap-x-2 md:gap-x-4">
          <NavItem label="Home" onClick={() => scrollToSection('home')} />
          <NavItem label="Qualifications" onClick={() => scrollToSection('qualifications')} />
          <NavItem label="Patents" onClick={() => scrollToSection('patents')} />
          <NavItem label="Publications" onClick={() => scrollToSection('publications')} />
          <NavItem label="Articles" onClick={() => scrollToSection('articles')} />
          <NavItem label="Judging" onClick={() => scrollToSection('judging')} />
          <NavItem label="Media" onClick={() => scrollToSection('media')} />
          <NavItem label="Photos" onClick={() => scrollToSection('photos')} />
          <NavItem label="Testimonials" onClick={() => scrollToSection('testimonials')} />
          <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-purple-400 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-2">
            <LogIn size={16} /> Login
          </button>
        </nav>

        <section
          id="home"
          ref={el => sectionsRef.current[0] = el}
          className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden p-4 pt-32 sm:p-6 sm:pt-28"
        >
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              Hi, I'm <span className="text-purple-400">Sajud Hamza Elinjulliparambil</span>
            </h1>
            <TypingEffect
              phrases={["Data Engineer", "AI Engineer", "Machine Learning Enthusiast", "Problem Solver"]}
              className="text-2xl sm:text-3xl md:text-5xl font-semibold text-blue-300 mb-8 h-16 sm:h-auto"
            />
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
              Passionate about building robust data pipelines, developing intelligent AI solutions, and transforming complex data into actionable insights.
            </p>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full">
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">AI & Data Trivia</h3>
                <p className="text-gray-300 mb-6">How well do you know the world of data? Test your knowledge!</p>
                <TriviaGame />
              </div>
              <div className="p-6 rounded-xl text-center w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">Sajud Hamza</h3>
                <DisplayImageContainer imageUrl={profileImage} />
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex justify-center items-center pt-12 pb-4">
          <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-widest">
            Active Member at:
          </h3>
        </div>
        <MembershipSlider />

        <Section id="qualifications" ref={el => sectionsRef.current[1] = el} title="My Qualifications" icon={<GraduationCap size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <p className="font-semibold text-lg">Doctor of Philosophy Computer Science</p>
                  <p className="text-gray-400">Pace University, New York, New York</p>
                  <p className="text-sm text-gray-500">2023 - 2026</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">Master of Science in Information Systems</p>
                  <p className="text-gray-400">Pace University, New York, New York</p>
                  <p className="text-sm text-gray-500">2018 - 2020</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">Bachelor of Engineering</p>
                  <p className="text-gray-400">Mumbai University, Mumbai, Maharashtra</p>
                  <p className="text-sm text-gray-500">2010 - 2014</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="patents" ref={el => sectionsRef.current[2] = el} title="Patents" icon={<Lightbulb size={40} className="text-purple-400" />}>
          <div className="relative border-l-2 border-purple-600 pl-8 py-4">
            {patents.map((patent, index) => (
              <div key={index} className="mb-8 last:mb-0 relative">
                <div className="absolute -left-3.5 top-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center z-10">
                  <Lightbulb size={16} className="text-white" />
                </div>
                <PatentCard patent={patent} />
              </div>
            ))}
          </div>
        </Section>
        
        <Section id="publications" ref={el => sectionsRef.current[3] = el} title="Publications" icon={<BookOpen size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <FlipCard key={index} frontContent={<><h4 className="text-xl font-bold text-blue-300 mb-2">{pub.title}</h4><p className="text-gray-400 text-sm mb-2">{pub.journal}</p><p className="text-gray-500 text-xs">{pub.year}</p></>} backContent={<><p className="text-gray-300 text-sm mb-3">{pub.description}</p><a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center text-sm">Read More <ChevronRight size={16} className="ml-1" /></a></>} />
            ))}
          </div>
        </Section>

        <Section id="articles" ref={el => sectionsRef.current[4] = el} title="Articles" icon={<Feather size={40} className="text-purple-400" />}>
          <ArticleCarousel articles={articles} />
        </Section>
        
        <Section id="judging" ref={el => sectionsRef.current[5] = el} title="Judging & Peer Reviews" icon={<Gavel size={40} className="text-purple-400" />}>
          <div className="relative border-l-2 border-purple-600 pl-8 py-4">
            {judgingExperiences.map((experience, index) => (
              <div key={index} className="mb-8 last:mb-0 relative">
                <div className="absolute -left-3.5 top-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center z-10"><Gavel size={16} className="text-white" /></div>
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="text-xl font-bold text-blue-300 mb-2">{experience.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{experience.organization} | {experience.date}</p>
                    </div>
                    {experience.judgeFeature && (
                      <a 
                        href={experience.judgeFeature.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-shrink-0 self-start mt-2 sm:mt-1 sm:ml-4 text-xs bg-yellow-500/20 text-yellow-300 font-semibold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-yellow-500/30 transition-colors"
                      >
                        <Star size={14} />
                        {experience.judgeFeature.text}
                      </a>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{experience.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    {experience.certificateLinks && experience.certificateLinks.map((link, linkIndex) => {
                        const isExternal = link.url.startsWith('http');
                        const isPdf = link.url.endsWith('.pdf');
                        const commonClasses = "inline-flex items-center text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors";
                        
                        if (isExternal || isPdf) {
                          return (
                            <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                              <Award size={16} className="mr-2" />
                              {link.name}
                            </a>
                          );
                        } else {
                          return (
                            <button key={linkIndex} onClick={() => setSelectedCertificateImage(link.url)} className={commonClasses}>
                              <Award size={16} className="mr-2" />
                              {link.name}
                            </button>
                          );
                        }
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="media" ref={el => sectionsRef.current[6] = el} title="Media Appearances" icon={<Newspaper size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaAppearances.map((item, index) => (
              <MediaCard key={index} item={item} />
            ))}
          </div>
        </Section>

        <Section id="photos" ref={el => sectionsRef.current[7] = el} title="My Photo Gallery" icon={<Image size={40} className="text-purple-400" />}>
          <PhotoGallery photos={photos} />
        </Section>

        <Section id="testimonials" ref={el => sectionsRef.current[8] = el} title="Testimonials" icon={<MessageSquare size={40} className="text-purple-400" />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <Link key={testimonial.id} to={`/testimonial/${testimonial.id}`} className="text-center group">
                <img 
                  src={testimonial.imageUrl} 
                  alt={testimonial.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700 group-hover:border-purple-500 transition-colors duration-300"
                />
                <p className="mt-4 font-semibold text-blue-300">{testimonial.name}</p>
              </Link>
            ))}
          </div>
        </Section>

        <footer className="bg-black/80 backdrop-blur-sm p-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sajud Hamza Elinjulliparambil. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.linkedin.com/in/sajud-hamza/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200"><Linkedin size={28} /></a>
            <a href="https://github.com/sajudhamza" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200"><Github size={28} /></a>
            <a href="mailto:sajudhamza@gmail.com" className="hover:text-purple-400 transition-colors duration-200"><Mail size={28} /></a>
          </div>
        </footer>
      </div>
      
      {selectedCertificateImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedCertificateImage(null)}>
          <div className="relative bg-gray-800 rounded-xl p-4 max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
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
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/333333/FFFFFF?text=Image+Not+Found'; }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
