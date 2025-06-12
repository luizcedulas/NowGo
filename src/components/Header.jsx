import React from 'react';

const Header = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'editais', label: 'Editais' },
    { id: 'metodologia', label: 'Metodologia' },
    { id: 'limitacoes', label: 'Limitações' },
    { id: 'perfil', label: 'Perfil NowGo' }
  ];
  
  // Obter a data atual formatada
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  
  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-xl md:text-2xl font-bold">EditalGo</h1>
          </div>
          
          <div className="flex items-center justify-end">
            <p className="text-sm mr-4">Atualizado em: {dataAtual}</p>
          </div>
        </div>
        
        <nav className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-green-600 font-medium'
                      : 'bg-green-700 text-white hover:bg-green-800'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
