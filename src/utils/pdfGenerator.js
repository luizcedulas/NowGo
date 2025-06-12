import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Função para gerar PDF da proposta diretamente no frontend
export const generateProposal = (edital) => {
  // Criar nova instância do PDF
  const doc = new jsPDF();
  
  // Dados fixos da NowGo Education
  const nowgoData = {
    nomeEmpresa: "NowGo Education",
    cnpj: "12.345.678/0001-90",
    responsavel: "Diretor de Projetos",
    email: "projetos@nowgoeducation.com",
    telefone: "(11) 98765-4321",
    objetivoProposta: "Implementação de soluções educacionais tecnológicas inovadoras para melhoria do processo de ensino-aprendizagem, com foco em desenvolvimento de competências digitais e metodologias ativas.",
    valorSolicitado: "250.000,00",
    prazoExecucao: "12",
    contrapartida: "50.000,00"
  };
  
  // Formatar data atual
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  
  // Configurações de estilo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(25, 115, 232); // Azul
  
  // Cabeçalho
  doc.text('PROPOSTA DE PROJETO', 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text(edital.nome, 105, 30, { align: 'center' });
  
  // Linha separadora
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 35, 190, 35);
  
  // Estilo para seções
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  // Seção 1: Identificação
  doc.text('1. IDENTIFICAÇÃO', 20, 45);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  doc.text('Empresa Proponente:', 20, 55);
  doc.text(nowgoData.nomeEmpresa, 70, 55);
  
  doc.text('CNPJ:', 20, 62);
  doc.text(nowgoData.cnpj, 70, 62);
  
  doc.text('Responsável:', 20, 69);
  doc.text(nowgoData.responsavel, 70, 69);
  
  doc.text('Email:', 20, 76);
  doc.text(nowgoData.email, 70, 76);
  
  doc.text('Telefone:', 20, 83);
  doc.text(nowgoData.telefone, 70, 83);
  
  // Seção 2: Edital
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. EDITAL', 20, 95);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  doc.text('Nome do Edital:', 20, 105);
  doc.text(edital.nome, 70, 105);
  
  doc.text('Órgão Financiador:', 20, 112);
  doc.text(edital.orgaoFinanciador, 70, 112);
  
  doc.text('Prazo Final para Submissão:', 20, 119);
  const prazoFormatado = new Date(edital.prazoFinal).toLocaleDateString('pt-BR');
  doc.text(prazoFormatado, 70, 119);
  
  // Seção 3: Proposta
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('3. PROPOSTA', 20, 131);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // Objetivo com quebra de texto
  doc.text('Objetivo:', 20, 141);
  const textLines = doc.splitTextToSize(nowgoData.objetivoProposta, 170);
  doc.text(textLines, 20, 148);
  
  const yPosAfterObjective = 148 + (textLines.length * 7);
  
  doc.text('Valor Solicitado:', 20, yPosAfterObjective);
  doc.text(`R$ ${nowgoData.valorSolicitado}`, 70, yPosAfterObjective);
  
  doc.text('Contrapartida:', 20, yPosAfterObjective + 7);
  doc.text(`R$ ${nowgoData.contrapartida}`, 70, yPosAfterObjective + 7);
  
  doc.text('Prazo de Execução:', 20, yPosAfterObjective + 14);
  doc.text(`${nowgoData.prazoExecucao} meses`, 70, yPosAfterObjective + 14);
  
  // Seção 4: Análise de Aderência
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('4. ANÁLISE DE ADERÊNCIA', 20, yPosAfterObjective + 26);
  
  // Tabela de critérios
  const tableColumn = ['Critério', 'Nota', 'Peso'];
  const tableRows = [];
  
  // Adicionar critérios à tabela
  for (const [criterio, dados] of Object.entries(edital.justificativaScore)) {
    const criterioFormatado = criterio
      .replace('alinhamentoTematico', 'Alinhamento Temático')
      .replace('adequacaoPublicoAlvo', 'Adequação ao Público-Alvo')
      .replace('criteriosElegibilidade', 'Critérios de Elegibilidade')
      .replace('potencialEstrategicoTerritorial', 'Potencial Estratégico/Territorial');
    
    tableRows.push([criterioFormatado, `${dados.nota}/10`, `${dados.peso}%`]);
  }
  
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: yPosAfterObjective + 36,
    theme: 'striped',
    headStyles: {
      fillColor: [25, 115, 232],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    }
  });
  
  // Score final
  const finalTableY = doc.lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Score Final:', 20, finalTableY);
  doc.text(`${edital.scoreAderencia}/100 - Prioridade ${edital.prioridade}`, 70, finalTableY);
  
  // Assinatura
  const signatureY = finalTableY + 30;
  doc.text('Local e data: ________________________, ' + dataAtual, 105, signatureY, { align: 'center' });
  
  // Linha para assinatura
  doc.line(60, signatureY + 10, 150, signatureY + 10);
  
  // Nome do responsável
  doc.text(`${nowgoData.responsavel}`, 105, signatureY + 20, { align: 'center' });
  doc.text(`${nowgoData.nomeEmpresa}`, 105, signatureY + 27, { align: 'center' });
  
  // Rodapé
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Documento gerado automaticamente pelo Radar de Editais de Fomento', 105, 280, { align: 'center' });
  doc.text('Data de geração: ' + dataAtual, 105, 285, { align: 'center' });
  
  // Salvar o PDF
  return doc.save(`Proposta_NowGo_${edital.nome.replace(/\s+/g, '_')}.pdf`, { returnPromise: true });
};
