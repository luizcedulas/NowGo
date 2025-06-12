from flask import Flask, request, send_file, jsonify
from weasyprint import HTML, CSS
from io import BytesIO
import json
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/api/gerar-proposta', methods=['POST'])
def gerar_proposta():
    try:
        # Receber dados do frontend
        data = request.json
        edital = data['edital']
        form_data = data['formData']
        
        # Formatar valores monetários
        try:
            valor_solicitado = float(form_data['valorSolicitado'].replace('.', '').replace(',', '.'))
            valor_solicitado_formatado = f"R$ {valor_solicitado:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        except:
            valor_solicitado_formatado = form_data['valorSolicitado']
            
        try:
            contrapartida = float(form_data['contrapartida'].replace('.', '').replace(',', '.'))
            contrapartida_formatada = f"R$ {contrapartida:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
        except:
            contrapartida_formatada = form_data['contrapartida']
        
        # Formatar data atual
        data_atual = datetime.now().strftime("%d/%m/%Y")
        
        # Gerar HTML para o PDF
        html_content = f"""
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Proposta para {edital['nome']}</title>
            <style>
                @page {{
                    size: A4;
                    margin: 2cm;
                }}
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                    color: #333;
                }}
                .header {{
                    text-align: center;
                    margin-bottom: 30px;
                }}
                .header h1 {{
                    color: #1a73e8;
                    font-size: 24px;
                    margin-bottom: 5px;
                }}
                .header p {{
                    color: #666;
                    font-size: 16px;
                    margin-top: 0;
                }}
                .section {{
                    margin-bottom: 20px;
                }}
                .section h2 {{
                    color: #1a73e8;
                    font-size: 18px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                }}
                .info-block {{
                    margin-bottom: 15px;
                }}
                .info-block h3 {{
                    font-size: 16px;
                    margin-bottom: 5px;
                    color: #555;
                }}
                .info-block p {{
                    margin-top: 0;
                    margin-bottom: 5px;
                }}
                .info-grid {{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }}
                .footer {{
                    margin-top: 50px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }}
                .signature {{
                    margin-top: 60px;
                    text-align: center;
                }}
                .signature-line {{
                    width: 60%;
                    margin: 0 auto;
                    border-top: 1px solid #333;
                    margin-bottom: 5px;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }}
                table, th, td {{
                    border: 1px solid #ddd;
                }}
                th, td {{
                    padding: 10px;
                    text-align: left;
                }}
                th {{
                    background-color: #f2f2f2;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>PROPOSTA DE PROJETO</h1>
                <p>{edital['nome']}</p>
            </div>
            
            <div class="section">
                <h2>1. IDENTIFICAÇÃO</h2>
                <div class="info-grid">
                    <div class="info-block">
                        <h3>Empresa Proponente:</h3>
                        <p>{form_data['nomeEmpresa']}</p>
                    </div>
                    <div class="info-block">
                        <h3>CNPJ:</h3>
                        <p>{form_data['cnpj']}</p>
                    </div>
                    <div class="info-block">
                        <h3>Responsável:</h3>
                        <p>{form_data['responsavel']}</p>
                    </div>
                    <div class="info-block">
                        <h3>Contato:</h3>
                        <p>Email: {form_data['email']}</p>
                        <p>Telefone: {form_data['telefone']}</p>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>2. EDITAL</h2>
                <div class="info-block">
                    <h3>Nome do Edital:</h3>
                    <p>{edital['nome']}</p>
                </div>
                <div class="info-block">
                    <h3>Órgão Financiador:</h3>
                    <p>{edital['orgaoFinanciador']}</p>
                </div>
                <div class="info-block">
                    <h3>Prazo Final para Submissão:</h3>
                    <p>{datetime.strptime(edital['prazoFinal'], '%Y-%m-%d').strftime('%d/%m/%Y')}</p>
                </div>
            </div>
            
            <div class="section">
                <h2>3. PROPOSTA</h2>
                <div class="info-block">
                    <h3>Objetivo:</h3>
                    <p>{form_data['objetivoProposta']}</p>
                </div>
                <div class="info-grid">
                    <div class="info-block">
                        <h3>Valor Solicitado:</h3>
                        <p>{valor_solicitado_formatado}</p>
                    </div>
                    <div class="info-block">
                        <h3>Contrapartida:</h3>
                        <p>{contrapartida_formatada}</p>
                    </div>
                    <div class="info-block">
                        <h3>Prazo de Execução:</h3>
                        <p>{form_data['prazoExecucao']} meses</p>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>4. ANÁLISE DE ADERÊNCIA</h2>
                <table>
                    <tr>
                        <th>Critério</th>
                        <th>Nota</th>
                        <th>Peso</th>
                    </tr>
        """
        
        # Adicionar critérios de avaliação
        for criterio, dados in edital['justificativaScore'].items():
            criterio_formatado = criterio.replace('alinhamentoTematico', 'Alinhamento Temático')\
                                        .replace('adequacaoPublicoAlvo', 'Adequação ao Público-Alvo')\
                                        .replace('criteriosElegibilidade', 'Critérios de Elegibilidade')\
                                        .replace('potencialEstrategicoTerritorial', 'Potencial Estratégico/Territorial')
            
            html_content += f"""
                    <tr>
                        <td>{criterio_formatado}</td>
                        <td>{dados['nota']}/10</td>
                        <td>{dados['peso']}%</td>
                    </tr>
            """
        
        html_content += f"""
                </table>
                <div class="info-block">
                    <h3>Score Final:</h3>
                    <p>{edital['scoreAderencia']}/100 - Prioridade {edital['prioridade']}</p>
                </div>
            </div>
            
            <div class="signature">
                <p>Local e data: ________________________, {data_atual}</p>
                <div class="signature-line"></div>
                <p>{form_data['responsavel']}<br>{form_data['nomeEmpresa']}</p>
            </div>
            
            <div class="footer">
                <p>Documento gerado automaticamente pelo Radar de Editais de Fomento</p>
                <p>Data de geração: {data_atual}</p>
            </div>
        </body>
        </html>
        """
        
        # Gerar PDF
        pdf_buffer = BytesIO()
        HTML(string=html_content).write_pdf(pdf_buffer)
        pdf_buffer.seek(0)
        
        # Retornar o PDF
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f"Proposta_{edital['nome'].replace(' ', '_')}_{form_data['nomeEmpresa'].replace(' ', '_')}.pdf"
        )
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
