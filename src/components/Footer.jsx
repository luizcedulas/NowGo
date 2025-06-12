import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              EditalGo
            </h2>
            <p className="text-gray-600 mt-2">Plataforma de monitoramento e análise de editais de fomento para empresas de educação, tecnologia e inovação.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.finep.gov.br/chamadas-publicas" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                  FINEP - Chamadas Públicas
                </a>
              </li>
              <li>
                <a href="https://www.bndes.gov.br/wps/portal/site/home/onde-atuamos/educacao" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                  BNDES - Educação
                </a>
              </li>
              <li>
                <a href="https://capta.org.br/oportunidades" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                  Capta - Oportunidades
                </a>
              </li>
              <li>
                <a href="https://prosas.com.br/editais" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                  Prosas - Editais
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Informações</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Dados verificados e validados
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} EditalGo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
