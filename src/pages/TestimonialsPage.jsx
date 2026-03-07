import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Quote, Award, Star, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import Background from '../components/Background';
import { testimonials } from '../data/portfolioData';

const TestimonialsPage = () => {
  const totalTestimonials = testimonials.length;
  const featuredTestimonial = testimonials[0];

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10 scroll-content-layer">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-4">
                <MessageSquare size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Testimonials & Recommendations
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Words from colleagues, supervisors, and collaborators who have worked with me on various 
              projects and witnessed my contributions firsthand.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-xl border border-indigo-500/30 text-center">
                <Users className="text-indigo-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-indigo-300 mb-2">{totalTestimonials}</div>
                <div className="text-gray-300">Recommendations</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-xl border border-purple-500/30 text-center">
                <Star className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">5/5</div>
                <div className="text-gray-300">Average Rating</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-xl border border-indigo-500/30 text-center">
                <Award className="text-indigo-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-indigo-300 mb-2">100%</div>
                <div className="text-gray-300">Positive</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-8 rounded-2xl border border-indigo-500/20">
              <div className="flex items-center justify-center mb-6">
                <Quote className="text-indigo-400" size={48} />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                <img 
                  src={featuredTestimonial.imageUrl} 
                  alt={featuredTestimonial.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-indigo-300 mb-2">{featuredTestimonial.name}</h2>
                  <p className="text-purple-400 font-semibold mb-4">{featuredTestimonial.title}</p>
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-300 text-lg leading-relaxed italic text-center mb-6">
                &ldquo;{featuredTestimonial.description.substring(0, 200)}...&rdquo;
              </blockquote>
              <div className="text-center">
                <Link
                  to={`/testimonial/${featuredTestimonial.id}`}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Read Full Testimonial <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <div className="pt-20">
          <Section
            id="testimonials"
            title="All Recommendations"
            icon={<MessageSquare size={40} className="text-purple-400" />}
          >
            <div className="mb-8 text-center">
              <p className="text-gray-400 mb-4">
                Click on any profile to read their complete recommendation
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial) => (
                <Link
                  key={testimonial.id}
                  to={`/testimonial/${testimonial.id}`}
                  className="text-center group transform transition-all duration-300 hover:scale-110"
                >
                  <div className="relative mb-4">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700 group-hover:border-indigo-500 transition-all duration-300 shadow-lg group-hover:shadow-indigo-500/50"
                    />
                    <div className="absolute bottom-0 right-1/4 bg-indigo-600 rounded-full p-1 border-2 border-black">
                      <Quote size={16} className="text-white" />
                    </div>
                  </div>
                  <p className="mt-2 font-semibold text-blue-300 group-hover:text-indigo-400 transition-colors">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{testimonial.title.split(' at ')[0]}</p>
                  <div className="flex justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={12} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            {/* Impact Section */}
            <div className="mt-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-8 rounded-2xl border border-indigo-500/20">
              <h3 className="text-2xl font-bold text-center mb-6 text-indigo-300">
                Recognition & Trust
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Award className="text-indigo-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-indigo-300 mb-2">Professional Excellence</h4>
                  <p className="text-gray-300 text-sm">
                    Recognized by industry leaders and academic professionals for outstanding work
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <TrendingUp className="text-purple-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-purple-300 mb-2">Impact & Results</h4>
                  <p className="text-gray-300 text-sm">
                    Testimonials highlight measurable impact and successful project outcomes
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Users className="text-indigo-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-indigo-300 mb-2">Collaboration</h4>
                  <p className="text-gray-300 text-sm">
                    Valued as a team player and collaborative partner in complex projects
                  </p>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-300">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Critical role in high-stakes client projects',
                  'Expertise in AI and data engineering',
                  'Innovative approach to problem-solving',
                  'Dedicated and brilliant engineer',
                  'Instrumental in product development',
                  'Trusted with substantial responsibilities'
                ].map((highlight, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors flex items-center gap-3">
                    <Star className="text-yellow-400 flex-shrink-0" size={20} />
                    <p className="text-gray-300 text-sm">{highlight}</p>
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

export default TestimonialsPage;
