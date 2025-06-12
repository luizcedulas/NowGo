import React from 'react';
import { metodologia } from '../data/editais';

const Metodologia = () => {
  return (
    <section id="metodologia" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Metodologia de Avaliação</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Critérios de Avaliação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metodologia.criterios.map((criterio, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-2">
                    {criterio.peso}%
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">{criterio.nome}</h4>
                </div>
                <p className="text-gray-600">{criterio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Fórmula de Cálculo</h3>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-lg font-mono">{metodologia.formula}</p>
          </div>
          <p className="mt-4 text-gray-600">
            O score final é calculado considerando os pesos de cada critério, resultando em uma pontuação de 0 a 100.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Níveis de Prioridade</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Nível</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Score</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {metodologia.prioridades.map((prioridade, index) => {
                  let bgColor;
                  switch(prioridade.nivel) {
                    case 'Alta': bgColor = 'bg-red-100'; break;
                    case 'Média': bgColor = 'bg-orange-100'; break;
                    case 'Baixa': bgColor = 'bg-blue-100'; break;
                    default: bgColor = '';
                  }
                  
                  return (
                    <tr key={index} className={`border-b ${bgColor}`}>
                      <td className="py-3 px-4 font-medium">{prioridade.nivel}</td>
                      <td className="py-3 px-4">{prioridade.score}</td>
                      <td className="py-3 px-4">{prioridade.descricao}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metodologia;
