import React from 'react';
import { editais } from '../data/editais';

const EditaisGrid = ({ editais, onViewEdital }) => {
  // Ordenar editais por prioridade e prazo
  const editaisOrdenados = [...editais].sort((a, b) => {
    // Primeiro por prioridade
    const prioridadeOrder = { 'Alta': 1, 'Média': 2, 'Baixa': 3 };
    const prioridadeComp = prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade];
    
    if (prioridadeComp !== 0) return prioridadeComp;
    
    // Depois por prazo (mais próximo primeiro)
    return new Date(a.prazoFinal) - new Date(b.prazoFinal);
  });
  
  const getPrioridadeClass = (prioridade) => {
    switch(prioridade) {
      case 'Alta': return 'bg-red-500';
      case 'Média': return 'bg-orange-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getDiasRestantes = (prazoFinal) => {
    const hoje = new Date();
    const prazo = new Date(prazoFinal);
    const diffTime = prazo - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editais Disponíveis</h2>
      
      {editaisOrdenados.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-700">Nenhum edital encontrado com os critérios atuais.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editaisOrdenados.map((edital) => {
            const diasRestantes = getDiasRestantes(edital.prazoFinal);
            const prazoFormatado = new Date(edital.prazoFinal).toLocaleDateString('pt-BR');
            
            return (
              <div key={edital.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{edital.nome}</h3>
                    <span className={`${getPrioridadeClass(edital.prioridade)} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                      {edital.prioridade}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{edital.orgaoFinanciador}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Prazo Final</div>
                      <div className="flex items-center">
                        {diasRestantes <= 14 && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                            {diasRestantes} dias
                          </span>
                        )}
                        <span className="text-gray-700">{prazoFormatado}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Score</div>
                      <div className="font-bold text-gray-700">{edital.scoreAderencia}/100</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${edital.scoreAderencia}%` }}
                    ></div>
                  </div>
                  
                  <button
                    onClick={() => onViewEdital(edital.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditaisGrid;
