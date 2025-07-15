import React, { useState } from 'react';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.03]"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/333333/FFFFFF?text=Image+Error`; }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative bg-gray-800 rounded-xl p-4 max-w-3xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              onClick={() => setSelectedPhoto(null)}
            >
              &times;
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[70vh] object-contain mx-auto rounded-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/333333/FFFFFF?text=Image+Error`; }}
            />
            <p className="text-gray-300 text-center mt-4 text-lg">{selectedPhoto.title}</p>
            <p className="text-gray-400 text-center text-sm">{selectedPhoto.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;