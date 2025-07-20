import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const PatentCard = ({ patent }) => {
  return (
    // Reverted to a left-aligned layout
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.03]">
      <div>
        <h3 className="text-xl font-bold text-blue-300 mb-2">{patent.title}</h3>
        <p className="text-sm font-semibold text-purple-400 mb-1">{patent.patentNumber}</p>
        <p className="text-xs text-gray-500 mb-4">{patent.date}</p>
        <p className="text-gray-300 text-sm">{patent.description}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <a 
          href={patent.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          View PDF
        </a>
        <a 
          href={patent.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ExternalLink size={18} />
          Official Link
        </a>
      </div>
    </div>
  );
};

export default PatentCard;