import React from 'react';
import { limitacoesBusca } from '../data/editais';

const Limitacoes = () => {
  return (
    <section id="limitacoes" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Limitações da Busca</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800">Importante Considerar</h3>
          </div>
          
          <ul className="space-y-4">
            {limitacoesBusca.map((limitacao, index) => (
              <li key={index} className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">{limitacao}</p>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-800">
              Para uma análise mais completa, recomenda-se a verificação interna da elegibilidade da empresa para cada edital e a consulta às fontes adicionais mencionadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Limitacoes;
