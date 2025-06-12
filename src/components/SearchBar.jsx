import React, { useState } from 'react';
import { editais } from '../data/editais';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Pesquisar por área (ex: educação, saúde, tecnologia, inovação...)"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Pesquisar
          </div>
        </button>
      </form>
      
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Sugestões:</span>
        {['Educação', 'Saúde', 'Tecnologia', 'Inovação', 'Impacto Social', 'Energia', 'Blockchain'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchTerm(tag);
              onSearch(tag);
            }}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
