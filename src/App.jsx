import React, { useState } from 'react';
import Header from './components/Header';
import Resumo from './components/Resumo';
import EditaisGrid from './components/EditaisGrid';
import EditalDetalhes from './components/EditalDetalhes';
import Metodologia from './components/Metodologia';
import Limitacoes from './components/Limitacoes';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Fontes from './components/Fontes';
import PerfilEmpresa from './components/PerfilEmpresa';
import { editais } from './data/editais';

function App() {
  const [activeTab, setActiveTab] = useState('resumo');
  const [selectedEditalId, setSelectedEditalId] = useState(null);
  const [filteredEditais, setFilteredEditais] = useState(editais);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredEditais(editais);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = editais.filter(edital => 
      edital.nome.toLowerCase().includes(term) || 
      edital.areaTemaPrincipal.toLowerCase().includes(term) ||
      edital.orgaoFinanciador.toLowerCase().includes(term) ||
      edital.observacoes.toLowerCase().includes(term)
    );
    
    setFilteredEditais(filtered);
  };
  
  const handleViewEdital = (editalId) => {
    setSelectedEditalId(editalId);
    window.scrollTo(0, 0);
  };
  
  const handleBackToList = () => {
    setSelectedEditalId(null);
  };

  // Preservar a navegação das abas mesmo quando estiver na página de detalhes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Se estiver na página de detalhes, voltar para a lista
    if (selectedEditalId) {
      setSelectedEditalId(null);
    }
  };
  
  const renderContent = () => {
    if (selectedEditalId) {
      return (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {['resumo', 'editais', 'metodologia', 'limitacoes', 'perfil'].map((tabId) => (
              <button
                key={tabId}
                onClick={() => handleTabChange(tabId)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tabId 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {tabId === 'resumo' ? 'Resumo' : 
                 tabId === 'editais' ? 'Editais' : 
                 tabId === 'metodologia' ? 'Metodologia' : 
                 tabId === 'limitacoes' ? 'Limitações' : 'Perfil NowGo'}
              </button>
            ))}
          </div>
          <EditalDetalhes editalId={selectedEditalId} onVoltar={handleBackToList} />
        </>
      );
    }
    
    switch (activeTab) {
      case 'resumo':
        return (
          <>
            <Resumo editais={filteredEditais} />
            <div className="mt-8">
              <EditaisGrid editais={filteredEditais} onViewEdital={handleViewEdital} />
            </div>
          </>
        );
      case 'editais':
        return (
          <>
            <SearchBar onSearch={handleSearch} />
            <EditaisGrid editais={filteredEditais} onViewEdital={handleViewEdital} />
            <div className="mt-12">
              <Fontes />
            </div>
          </>
        );
      case 'metodologia':
        return <Metodologia />;
      case 'limitacoes':
        return <Limitacoes />;
      case 'perfil':
        return <PerfilEmpresa />;
      default:
        return <Resumo editais={filteredEditais} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
