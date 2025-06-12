export const generateProposalHTML = (edital, perfilNowGo) => {
  // Formatar data atual
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  
  // Formatar prazo do edital
  const prazoFormatado = new Date(edital.prazoFinal).toLocaleDateString('pt-BR');
  
  // Identificar verticais relevantes para o edital
  const verticaisRelevantes = identificarVerticaisRelevantes(edital, perfilNowGo.verticais);
  
  // Criar tabela de critérios
  let criteriosHTML = '';
  for (const [criterio, dados] of Object.entries(edital.justificativaScore)) {
    const criterioFormatado = criterio
      .replace('alinhamentoTematico', 'Alinhamento Temático')
      .replace('adequacaoPublicoAlvo', 'Adequação ao Público-Alvo')
      .replace('criteriosElegibilidade', 'Critérios de Elegibilidade')
      .replace('potencialEstrategicoTerritorial', 'Potencial Estratégico/Territorial');
    
    criteriosHTML += `
      <tr>
        <td>${criterioFormatado}</td>
        <td>${dados.nota}/10</td>
        <td>${dados.peso}%</td>
      </tr>
    `;
  }
  
  // Gerar HTML completo
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Proposta NowGo - ${edital.nome}</title>
      <style>
        @media print {
          @page {
            size: A4;
            margin: 2cm;
          }
          
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .no-print {
            display: none !important;
          }
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.5;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .print-instructions {
          background-color: #f0f8ff;
          border: 1px solid #b0d8ff;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 5px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .header h1 {
          color: #1a73e8;
          font-size: 24px;
          margin-bottom: 5px;
        }
        
        .header p {
          color: #666;
          font-size: 16px;
          margin-top: 0;
        }
        
        .section {
          margin-bottom: 20px;
        }
        
        .section h2 {
          color: #1a73e8;
          font-size: 18px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .info-block {
          margin-bottom: 15px;
        }
        
        .info-block h3 {
          font-size: 16px;
          margin-bottom: 5px;
          color: #555;
        }
        
        .info-block p {
          margin-top: 0;
          margin-bottom: 5px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        table, th, td {
          border: 1px solid #ddd;
        }
        
        th, td {
          padding: 10px;
          text-align: left;
        }
        
        th {
          background-color: #f2f2f2;
        }
        
        .signature {
          margin-top: 60px;
          text-align: center;
        }
        
        .signature-line {
          width: 60%;
          margin: 0 auto;
          border-top: 1px solid #333;
          margin-bottom: 5px;
        }
        
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        
        .print-button {
          background-color: #1a73e8;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        
        .print-button:hover {
          background-color: #0d5bcd;
        }
        
        .verticais {
          margin: 15px 0;
        }
        
        .vertical-item {
          background-color: #f5f5f5;
          padding: 10px;
          margin-bottom: 10px;
          border-left: 4px solid #1a73e8;
        }
        
        .vertical-item h4 {
          margin-top: 0;
          margin-bottom: 5px;
          color: #1a73e8;
        }
        
        .vertical-item p {
          margin: 0;
        }
        
        .slogan {
          font-style: italic;
          color: #666;
          text-align: center;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="print-instructions no-print">
        <h2>Proposta gerada com sucesso!</h2>
        <p>Para salvar como PDF ou imprimir esta proposta:</p>
        <ol>
          <li>Clique no botão "Imprimir Proposta" abaixo ou use o atalho <strong>Ctrl+P</strong> (Windows/Linux) ou <strong>Cmd+P</strong> (Mac)</li>
          <li>Na janela de impressão, selecione "Salvar como PDF" como destino</li>
          <li>Clique em "Salvar" ou "Imprimir"</li>
        </ol>
        <button class="print-button" onclick="window.print()">Imprimir Proposta</button>
      </div>
      
      <div class="header">
        <h1>PROPOSTA DE PROJETO</h1>
        <p>${edital.nome}</p>
        <div class="slogan">${perfilNowGo.slogan}</div>
      </div>
      
      <div class="section">
        <h2>1. IDENTIFICAÇÃO</h2>
        <div class="info-grid">
          <div class="info-block">
            <h3>Empresa Proponente:</h3>
            <p>${perfilNowGo.nome}</p>
          </div>
          <div class="info-block">
            <h3>CNPJ:</h3>
            <p>${perfilNowGo.cnpj}</p>
          </div>
          <div class="info-block">
            <h3>Responsável:</h3>
            <p>Diretor de Projetos</p>
          </div>
          <div class="info-block">
            <h3>Contato:</h3>
            <p>Email: ${perfilNowGo.email}</p>
            <p>Telefone: ${perfilNowGo.telefone}</p>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>2. EDITAL</h2>
        <div class="info-block">
          <h3>Nome do Edital:</h3>
          <p>${edital.nome}</p>
        </div>
        <div class="info-block">
          <h3>Órgão Financiador:</h3>
          <p>${edital.orgaoFinanciador}</p>
        </div>
        <div class="info-block">
          <h3>Prazo Final para Submissão:</h3>
          <p>${prazoFormatado}</p>
        </div>
      </div>
      
      <div class="section">
        <h2>3. PROPOSTA</h2>
        <div class="info-block">
          <h3>Sobre a NowGo:</h3>
          <p>${perfilNowGo.descricao}</p>
        </div>
        
        <div class="info-block">
          <h3>Verticais Estratégicas Relevantes para este Edital:</h3>
          <div class="verticais">
            ${verticaisRelevantes.map(vertical => `
              <div class="vertical-item">
                <h4>${vertical.nome}</h4>
                <p>${vertical.descricao}</p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="info-block">
          <h3>Objetivo da Proposta:</h3>
          <p>Implementação de soluções inovadoras alinhadas às verticais estratégicas da NowGo, com foco em transformação digital, sustentabilidade e impacto social positivo. O projeto visa atender às demandas específicas do edital ${edital.nome}, contribuindo para o desenvolvimento tecnológico e social nas áreas contempladas.</p>
        </div>
        
        <div class="info-grid">
          <div class="info-block">
            <h3>Valor Solicitado:</h3>
            <p>R$ 250.000,00</p>
          </div>
          <div class="info-block">
            <h3>Contrapartida:</h3>
            <p>R$ 50.000,00</p>
          </div>
          <div class="info-block">
            <h3>Prazo de Execução:</h3>
            <p>12 meses</p>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>4. ANÁLISE DE ADERÊNCIA</h2>
        <table>
          <thead>
            <tr>
              <th>Critério</th>
              <th>Nota</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            ${criteriosHTML}
          </tbody>
        </table>
        <div class="info-block">
          <h3>Score Final:</h3>
          <p>${edital.scoreAderencia}/100 - Prioridade ${edital.prioridade}</p>
        </div>
      </div>
      
      <div class="section">
        <h2>5. PARCERIAS ESTRATÉGICAS</h2>
        <p>A NowGo conta com parcerias estratégicas que potencializam a execução deste projeto:</p>
        <ul>
          ${perfilNowGo.parcerias.map(parceria => `<li>${parceria}</li>`).join('')}
        </ul>
      </div>
      
      <div class="signature">
        <p>Local e data: ________________________, ${dataAtual}</p>
        <div class="signature-line"></div>
        <p>Diretor de Projetos<br>${perfilNowGo.nome}</p>
      </div>
      
      <div class="footer">
        <p>Documento gerado automaticamente pelo Radar de Editais de Fomento</p>
        <p>Data de geração: ${dataAtual}</p>
        <p>${perfilNowGo.site} | Transformando realidades com inovação, capital e espiritualidade.</p>
      </div>
    </body>
    </html>
  `;
  
  return html;
};

// Função para identificar verticais relevantes para o edital
function identificarVerticaisRelevantes(edital, verticais) {
  // Palavras-chave para cada vertical
  const palavrasChave = {
    'Saúde': ['saúde', 'hospital', 'médico', 'diagnóstico', 'paciente', 'tratamento'],
    'Educação': ['educação', 'ensino', 'aprendizagem', 'escola', 'estudante', 'professor', 'capacitação'],
    'Energia': ['energia', 'renovável', 'sustentável', 'elétrica', 'hidrogênio', 'verde'],
    'Infraestrutura e IA': ['infraestrutura', 'inteligência artificial', 'ia', 'automação', 'llm'],
    'Blockchain': ['blockchain', 'rastreabilidade', 'contrato inteligente', 'criptomoeda'],
    'Capital': ['capital', 'investimento', 'fusão', 'aquisição', 'financeiro'],
    'Cultura e Produções': ['cultura', 'música', 'filme', 'storytelling', 'arte', 'produção'],
    'Impacto Social': ['impacto social', 'comunidade', 'vulnerável', 'regeneração', 'social'],
    'Startups': ['startup', 'empreendedorismo', 'aceleração', 'inovação', 'tecnologia']
  };
  
  // Texto para análise (combinando título, área temática e observações)
  const textoAnalise = `${edital.nome} ${edital.areaTemaPrincipal} ${edital.observacoes}`.toLowerCase();
  
  // Pontuação para cada vertical
  const pontuacao = {};
  
  // Calcular pontuação para cada vertical
  for (const [vertical, palavras] of Object.entries(palavrasChave)) {
    pontuacao[vertical] = 0;
    for (const palavra of palavras) {
      if (textoAnalise.includes(palavra.toLowerCase())) {
        pontuacao[vertical] += 1;
      }
    }
  }
  
  // Ordenar verticais por pontuação
  const verticaisOrdenadas = Object.entries(pontuacao)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, pontos]) => pontos > 0)
    .map(([nome]) => nome);
  
  // Se nenhuma vertical for identificada, incluir Educação e Impacto Social como padrão
  if (verticaisOrdenadas.length === 0) {
    verticaisOrdenadas.push('Educação', 'Impacto Social');
  }
  
  // Limitar a 3 verticais mais relevantes
  const verticaisSelecionadas = verticaisOrdenadas.slice(0, 3);
  
  // Retornar objetos completos das verticais selecionadas
  return verticais.filter(v => verticaisSelecionadas.includes(v.nome));
}
