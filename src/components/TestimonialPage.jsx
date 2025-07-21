import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { testimonials } from '../data/portfolioData';
import Background from './Background';
import { ArrowLeft, Linkedin, FileText } from 'lucide-react';

const TestimonialPage = () => {
  const { id } = useParams();
  const testimonial = testimonials.find(t => t.id === id);

  if (!testimonial) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Background />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Testimonial Not Found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            &larr; Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Background />
      <div className="relative z-10 max-w-4xl mx-auto p-8 pt-16">
        <Link to="/#testimonials" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft size={20} />
          Back to Portfolio
        </Link>
        
        <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img 
              src={testimonial.imageUrl} 
              alt={testimonial.name} 
              className="w-48 h-48 rounded-full object-cover border-4 border-purple-500"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                {testimonial.name}
              </h1>
              <p className="text-lg text-gray-400 mt-1">{testimonial.title}</p>
              <div className="flex justify-center md:justify-start gap-6 mt-4">
                <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <Linkedin size={20} /> LinkedIn
                </a>
                <a href={testimonial.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                  <FileText size={20} /> View PDF
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mt-8 text-lg leading-relaxed italic">
            &ldquo;{testimonial.description}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;