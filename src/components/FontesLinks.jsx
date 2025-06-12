import React from 'react';
import { fontes } from '../data/fontes';

const FontesLinks = () => {
  return (
    <div className="mt-8">
      {fontes.map((categoria, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Fontes {categoria.categoria}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoria.links.map((link, linkIndex) => (
              <a 
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {link.nome}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FontesLinks;
