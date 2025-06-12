import React, { useState } from 'react';
import { editais } from '../data/editais';
import { generateProposalHTML } from '../utils/proposalTemplate';
import { perfilNowGo } from '../data/perfilNowGo';

const EditalDetalhes = ({ editalId, onVoltar }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const edital = editais.find(e => e.id === editalId);
  
  if (!edital) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <p className="text-red-600 font-bold">Edital não encontrado</p>
          <button 
            onClick={onVoltar}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }
  
  const prazoFormatado = new Date(edital.prazoFinal).toLocaleDateString('pt-BR');
  const diasRestantes = Math.ceil((new Date(edital.prazoFinal) - new Date()) / (1000 * 60 * 60 * 24));
  
  const getPrioridadeClass = (prioridade) => {
    switch(prioridade) {
      case 'Alta': return 'bg-red-600';
      case 'Média': return 'bg-orange-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getUrgenciaClass = (dias) => {
    if (dias <= 7) return 'bg-red-600';
    if (dias <= 14) return 'bg-orange-500';
    if (dias <= 30) return 'bg-yellow-500';
    return 'bg-green-600';
  };

  const handleGerarProposta = () => {
    try {
      setIsGeneratingPDF(true);
      
      // Gerar HTML da proposta com dados atualizados da NowGo
      const htmlContent = generateProposalHTML(edital, perfilNowGo);
      
      // Abrir em nova aba
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
      } else {
        alert('Por favor, permita pop-ups para este site para visualizar a proposta.');
      }
    } catch (error) {
      console.error('Erro ao gerar proposta:', error);
      alert('Ocorreu um erro ao gerar a proposta. Por favor, tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <button 
            onClick={onVoltar}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar para a lista
          </button>
          
          <div className={`${getPrioridadeClass(edital.prioridade)} text-white text-sm font-bold px-3 py-1 rounded-full`}>
            {edital.prioridade}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{edital.nome}</h2>
        <p className="text-gray-600 mb-6">{edital.orgaoFinanciador}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Prazo Final</h3>
            <div className="flex items-center">
              <div className={`${getUrgenciaClass(diasRestantes)} text-white text-sm font-bold px-3 py-1 rounded-full mr-2`}>
                {diasRestantes > 0 ? `${diasRestantes} dias` : 'Encerrado'}
              </div>
              <span className="text-gray-700">{prazoFormatado}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Score de Aderência</h3>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full" 
                  style={{ width: `${edital.scoreAderencia}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right text-gray-700 font-bold">{edital.scoreAderencia}/100</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Área Temática Principal</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{edital.areaTemaPrincipal}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Links Diretos</h3>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <a 
              href={edital.linkDireto} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Acessar Página do Edital
            </a>
            
            {edital.linkDownload && (
              <a 
                href={edital.linkDownload} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download do Edital
              </a>
            )}
            
            {edital.linkFormulario && (
              <a 
                href={edital.linkFormulario} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Acessar Formulário de Inscrição
              </a>
            )}
          </div>
          
          {/* Arquivo do Edital */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3">Arquivo do Edital</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium">{edital.nome}.pdf</p>
                  <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                </div>
              </div>
              <a 
                href={edital.linkDownload || edital.linkDireto} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Justificativa do Score</h3>
          
          <div className="space-y-4">
            {Object.entries(edital.justificativaScore).map(([criterio, dados]) => {
              const criterioFormatado = criterio
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
              
              let barColor;
              if (dados.nota >= 8) barColor = 'bg-green-500';
              else if (dados.nota >= 5) barColor = 'bg-yellow-500';
              else barColor = 'bg-red-500';
              
              return (
                <div key={criterio} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold mr-2">
                        {dados.peso}%
                      </div>
                      <h4 className="font-semibold text-gray-800">{criterioFormatado}</h4>
                    </div>
                    <span className="font-bold">{dados.nota}/10</span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${barColor} h-2 rounded-full`} 
                        style={{ width: `${dados.nota * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm">{dados.justificativa}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Observações</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{edital.observacoes}</p>
        </div>
        
        {/* Botão Gerar Proposta */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGerarProposta}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Gerando Proposta...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                </svg>
                Visualizar Proposta da NowGo para este Edital
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditalDetalhes;
