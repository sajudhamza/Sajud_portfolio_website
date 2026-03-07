import React from 'react';
import { Image, Camera, Sparkles, Grid3x3, Layers } from 'lucide-react';
import Navigation from '../components/Navigation';
import Section from '../components/Section';
import PhotoGallery from '../components/PhotoGallery';
import Background from '../components/Background';
import { photos } from '../data/portfolioData';

const PhotosPage = () => {
  const totalPhotos = photos.length;
  const categories = [...new Set(photos.map(p => p.title.split(' ')[0]))];

  return (
    <div className="min-h-screen text-gray-100 font-sans bg-black">
      <Background />
      <div className="relative z-10 scroll-content-layer">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-4">
                <Camera size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Photo Gallery
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A visual journey through conferences, events, workshops, and moments that showcase my passion 
              for technology, learning, and sharing knowledge with the community.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-6 rounded-xl border border-pink-500/30 text-center">
                <Image className="text-pink-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-pink-300 mb-2">{totalPhotos}</div>
                <div className="text-gray-300">Photos</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl border border-purple-500/30 text-center">
                <Grid3x3 className="text-purple-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-purple-300 mb-2">{categories.length}</div>
                <div className="text-gray-300">Categories</div>
              </div>
              <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-6 rounded-xl border border-pink-500/30 text-center">
                <Sparkles className="text-pink-400 mx-auto mb-3" size={32} />
                <div className="text-4xl font-bold text-pink-300 mb-2">Events</div>
                <div className="text-gray-300">Captured</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Gallery Categories</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Conferences',
                'Workshops',
                'Presentations',
                'Networking',
                'Awards',
                'Mentorship'
              ].map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 px-6 py-3 rounded-lg border border-gray-700 hover:border-pink-500 transition-colors"
                >
                  <span className="text-pink-300 font-semibold">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-20">
          <Section
            id="photos"
            title="Gallery Collection"
            icon={<Image size={40} className="text-purple-400" />}
          >
            <div className="mb-8 text-center">
              <p className="text-gray-400 mb-4">
                Browse through moments from conferences, workshops, and events
              </p>
            </div>
            <PhotoGallery photos={photos} />

            {/* Gallery Info */}
            <div className="mt-16 bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-8 rounded-2xl border border-pink-500/20">
              <div className="flex items-center justify-center mb-6">
                <Layers className="text-pink-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-6 text-pink-300">
                Behind the Gallery
              </h3>
              <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed mb-8">
                These photos capture key moments from my journey in technology and academia - from presenting 
                research at conferences to leading workshops, from receiving recognition for contributions to 
                mentoring the next generation of technologists. Each image tells a story of growth, collaboration, 
                and dedication to advancing the field.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Camera className="text-pink-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-pink-300 mb-2">Events & Conferences</h4>
                  <p className="text-gray-300 text-sm">
                    Documenting participation in major technology conferences and academic gatherings
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Sparkles className="text-purple-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-purple-300 mb-2">Workshops & Training</h4>
                  <p className="text-gray-300 text-sm">
                    Leading and participating in educational workshops and technical training sessions
                  </p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                  <Image className="text-pink-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-pink-300 mb-2">Networking & Collaboration</h4>
                  <p className="text-gray-300 text-sm">
                    Connecting with peers, mentors, and industry leaders in technology
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
