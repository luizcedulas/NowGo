import React from 'react';
import { editais } from '../data/editais';

const Resumo = () => {
  // Calcular estatísticas
  const totalEditais = editais.length;
  const editaisUrgentes = editais.filter(e => {
    const prazo = new Date(e.prazoFinal);
    const hoje = new Date();
    const diffDias = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24));
    return diffDias <= 14;
  }).length;
  
  const editaisPorPrioridade = {
    Alta: editais.filter(e => e.prioridade === 'Alta').length,
    Média: editais.filter(e => e.prioridade === 'Média').length,
    Baixa: editais.filter(e => e.prioridade === 'Baixa').length
  };
  
  const scoresMedios = Math.round(
    editais.reduce((acc, edital) => acc + edital.scoreAderencia, 0) / totalEditais
  );

  return (
    <section id="resumo" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Resumo dos Editais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card Total de Editais */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total de Editais</h3>
                <p className="text-3xl font-bold text-blue-600">{totalEditais}</p>
              </div>
            </div>
          </div>
          
          {/* Card Editais Urgentes */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Editais Urgentes</h3>
                <p className="text-3xl font-bold text-red-600">{editaisUrgentes}</p>
                <p className="text-sm text-gray-600">Prazo menor que 14 dias</p>
              </div>
            </div>
          </div>
          
          {/* Card Score Médio */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Score Médio</h3>
                <p className="text-3xl font-bold text-green-600">{scoresMedios}/100</p>
              </div>
            </div>
          </div>
          
          {/* Card Distribuição por Prioridade */}
          <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg shadow-md p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Distribuição por Prioridade</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Alta</span>
                    <span>{editaisPorPrioridade.Alta}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(editaisPorPrioridade.Alta / totalEditais) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Média</span>
                    <span>{editaisPorPrioridade.Média}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(editaisPorPrioridade.Média / totalEditais) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Baixa</span>
                    <span>{editaisPorPrioridade.Baixa}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(editaisPorPrioridade.Baixa / totalEditais) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Editais com Maior Prioridade</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Nome do Edital</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Prazo Final</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Score</th>
                  <th className="py-3 px-4 bg-gray-100 text-left text-gray-800 font-semibold">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {editais
                  .sort((a, b) => {
                    // Ordenar por prioridade e depois por score
                    const prioridadeOrder = { 'Alta': 0, 'Média': 1, 'Baixa': 2 };
                    if (prioridadeOrder[a.prioridade] !== prioridadeOrder[b.prioridade]) {
                      return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
                    }
                    return b.scoreAderencia - a.scoreAderencia;
                  })
                  .slice(0, 3) // Mostrar apenas os 3 principais
                  .map((edital, index) => {
                    const prazoFormatado = new Date(edital.prazoFinal).toLocaleDateString('pt-BR');
                    let prioridadeClass;
                    switch(edital.prioridade) {
                      case 'Alta': prioridadeClass = 'bg-red-100 text-red-800'; break;
                      case 'Média': prioridadeClass = 'bg-orange-100 text-orange-800'; break;
                      case 'Baixa': prioridadeClass = 'bg-blue-100 text-blue-800'; break;
                      default: prioridadeClass = 'bg-gray-100 text-gray-800';
                    }
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{edital.nome}</td>
                        <td className="py-3 px-4">{prazoFormatado}</td>
                        <td className="py-3 px-4">{edital.scoreAderencia}/100</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeClass}`}>
                            {edital.prioridade}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center">
            <a href="#editais" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              Ver todos os editais
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resumo;
