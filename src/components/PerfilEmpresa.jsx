import React from 'react';
import { perfilNowGo } from '../data/perfilNowGo';

const PerfilEmpresa = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{perfilNowGo.nome}</h2>
        <p className="text-xl text-gray-600 italic">{perfilNowGo.slogan}</p>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-700 text-lg mb-4">{perfilNowGo.descricao}</p>
        <p className="text-gray-700 mb-4">{perfilNowGo.sobre}</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Verticais Estratégicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {perfilNowGo.verticais.map((vertical, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">{vertical.nome}</h4>
              <p className="text-gray-700">{vertical.descricao}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Parcerias Estratégicas</h3>
        <div className="flex flex-wrap gap-2">
          {perfilNowGo.parcerias.map((parceria, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
              {parceria}
            </span>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Contato</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">CNPJ: {perfilNowGo.cnpj}</p>
            <p className="text-gray-600">Email: {perfilNowGo.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Telefone: {perfilNowGo.telefone}</p>
            <p className="text-gray-600">Site: <a href={`https://${perfilNowGo.site}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{perfilNowGo.site}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilEmpresa;
