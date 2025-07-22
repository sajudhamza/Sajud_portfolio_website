import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { protectedFiles } from '../data/portfolioData';
import Background from './Background';
import { ArrowLeft, FileText, FileImage, File, Folder } from 'lucide-react';

const getFileIcon = (type) => {
  switch (type.toUpperCase()) {
    case 'PDF':
      return <FileText className="w-12 h-12 text-red-400" />;
    case 'PNG':
    case 'JPG':
      return <FileImage className="w-12 h-12 text-green-400" />;
    case 'DOCX':
      return <File className="w-12 h-12 text-blue-400" />;
    default:
      return <File className="w-12 h-12 text-gray-400" />;
  }
};

const FilesPage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  // FOLDER VIEW: Show the list of folders
  if (!selectedFolder) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Background />
        <div className="relative z-10 max-w-6xl mx-auto p-8 pt-16">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
          <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Protected Files
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {protectedFiles.map((folder, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedFolder(folder)}
                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:scale-105"
              >
                <Folder className="w-16 h-16 text-yellow-400" />
                <p className="font-semibold text-blue-300 mt-4 break-words">{folder.folderName}</p>
                <span className="text-xs text-gray-500 mt-1">{folder.files.length} file(s)</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // FILE VIEW: Show the files inside the selected folder
  return (
    <div className="min-h-screen bg-black text-white">
      <Background />
      <div className="relative z-10 max-w-6xl mx-auto p-8 pt-16">
        <button onClick={() => setSelectedFolder(null)} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft size={20} />
          Back to Folders
        </button>
        <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {selectedFolder.folderName}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {selectedFolder.files.map((file, index) => (
            <a 
              href={file.url} 
              key={index} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center group transform transition-all duration-300 hover:scale-105"
            >
              {getFileIcon(file.type)}
              <p className="font-semibold text-blue-300 mt-4 break-words">{file.name}</p>
              <span className="text-xs text-gray-500 mt-1">{file.type}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesPage;
