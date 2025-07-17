import React from 'react';
import { PlayCircle, Mic, Paperclip } from 'lucide-react';

const MediaCard = ({ item }) => {
  const icon = item.type === 'Media' 
    ? <Paperclip size={20} className="mr-2" /> 
    : <Paperclip size={20} className="mr-2" />;

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.03] flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center text-sm text-purple-400 mb-2">
          {icon}
          <span>{item.type}</span>
        </div>
        <h3 className="text-xl font-bold text-blue-300 mb-2">{item.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{item.platform} | {item.date}</p>
        <p className="text-gray-300 text-sm">{item.description}</p>
      </div>
      <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-4 text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 self-start"
      >
        Watch / Listen &rarr;
      </a>
    </div>
  );
};

export default MediaCard;