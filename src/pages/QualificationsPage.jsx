import React from 'react';
import { GraduationCap, Briefcase, Award, TrendingUp, Code, Database, Cloud, Zap, Brain, Rocket } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import SkillBubble from '../components/SkillBubble';
import Background from '../components/Background';

const QualificationsPage = () => {
  const skills = [
    'Python', 'SQL', 'PySpark', 'AWS', 'Azure', 'GCP',
    'Machine Learning', 'Deep Learning', 'NLP', 'ETL/ELT',
    'Docker', 'Kubernetes', 'Airflow', 'TensorFlow', 'PyTorch',
    'Pandas', 'NumPy', 'Scikit-learn', 'Apache Spark', 'Hadoop',
    'MongoDB', 'PostgreSQL', 'Redis', 'Git', 'CI/CD'
  ];

  const skillCategories = [
    {
      icon: <Code size={32} className="text-purple-400" />,
      title: 'Programming Languages',
      skills: ['Python', 'SQL', 'JavaScript', 'Java', 'Scala']
    },
    {
      icon: <Brain size={32} className="text-blue-400" />,
      title: 'AI & Machine Learning',
      skills: ['Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow', 'PyTorch', 'Scikit-learn']
    },
    {
      icon: <Database size={32} className="text-purple-400" />,
      title: 'Data Engineering',
      skills: ['PySpark', 'ETL/ELT', 'Apache Spark', 'Hadoop', 'MongoDB', 'PostgreSQL', 'Redis']
    },
    {
      icon: <Cloud size={32} className="text-blue-400" />,
      title: 'Cloud Platforms',
      skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Airflow']
    }
  ];

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10 scroll-content-layer">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-4">
                <GraduationCap size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Qualifications & Expertise
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my educational background, technical skills, and professional expertise 
              spanning data engineering, AI, machine learning, and cloud computing.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30 text-center">
                <Award className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">15+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-500/30 text-center">
                <GraduationCap className="text-blue-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-blue-300 mb-2">3</div>
                <div className="text-gray-300">Degrees</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30 text-center">
                <Code className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">25+</div>
                <div className="text-gray-300">Technologies</div>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="qualifications"
            title="Education Timeline"
            icon={<GraduationCap size={40} className="text-purple-400" />}
          >
            <div className="relative border-l-4 border-purple-600 pl-8 space-y-12 mb-12">
              <div className="relative">
                <div className="absolute -left-[34px] top-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-4 border-black">
                  <Rocket size={16} className="text-white" />
                </div>
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-300 mb-2">Doctor of Philosophy in Computer Science</h3>
                      <p className="text-purple-400 font-semibold mb-1">Pace University</p>
                      <p className="text-gray-400 mb-2">New York, New York</p>
                      <p className="text-sm text-gray-500">2023 - 2026 (Expected)</p>
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                      In Progress
                    </span>
                  </div>
                  <p className="text-gray-300 mt-4">
                    Advanced research in artificial intelligence, machine learning algorithms, and data engineering systems.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[34px] top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-black">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-blue-300 mb-2">Master of Science in Information Systems</h3>
                  <p className="text-purple-400 font-semibold mb-1">Pace University</p>
                  <p className="text-gray-400 mb-2">New York, New York</p>
                  <p className="text-sm text-gray-500 mb-4">2018 - 2020</p>
                  <p className="text-gray-300">
                    Specialized in data engineering, database systems, and information technology management.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[34px] top-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-4 border-black">
                  <Zap size={16} className="text-white" />
                </div>
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="text-2xl font-bold text-blue-300 mb-2">Bachelor of Engineering</h3>
                  <p className="text-purple-400 font-semibold mb-1">Mumbai University</p>
                  <p className="text-gray-400 mb-2">Mumbai, Maharashtra, India</p>
                  <p className="text-sm text-gray-500 mb-4">2010 - 2014</p>
                  <p className="text-gray-300">
                    Foundation in computer science, software engineering, and systems design.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="skills"
            title="Technical Skills"
            icon={<Briefcase size={40} className="text-purple-400" />}
          >
            <div className="space-y-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="bg-gray-800/80 p-6 rounded-xl shadow-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h3 className="text-2xl font-bold text-blue-300">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBubble key={skillIndex} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold text-blue-300 mb-4">Additional Skills & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {skills.filter(skill => 
                  !skillCategories.some(cat => cat.skills.includes(skill))
                ).map((skill, index) => (
                  <SkillBubble key={index} skill={skill} />
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default QualificationsPage;
