/**
 * Registro das listas interativas — Física 9º ano · LDV (Prof. Ricieri)
 *
 * Como usar (uma única vez):
 *  1. Cole este código no editor do Apps Script da planilha e salve.
 *  2. Preencha DOMINIO abaixo (a parte depois do @ do e-mail dos alunos).
 *  3. No menu de funções, escolha "configurar" e clique em Executar (autorize quando pedir).
 *  4. Implantar → Nova implantação → Tipo: App da Web
 *       Executar como: Eu  ·  Quem pode acessar: Qualquer pessoa
 *     Copie a URL do App da Web e mande para o Claude.
 *
 * Abas criadas:
 *  - Registros: uma linha por acesso diário e por lista concluída (preenchida pelo app).
 *  - Turma: cole os e-mails dos alunos na coluna A; o resto se calcula sozinho.
 */

const DOMINIO = 'COLOQUE_AQUI_O_DOMINIO'; // ex.: aluno.escola.com.br (sem o @)
const TURMAS = ['91', '92', '93'];
const LISTAS = [
  ['Cinemática', 'Lista 1'],
  ['Cinemática', 'Lista 2']
];
const LINHAS_TURMA = 150; // quantos alunos cabem na aba Turma

const CABECALHO = ['Data e hora', 'E-mail', 'Turma', 'Evento', 'Tema', 'Lista', 'Acertos', 'Total',
  'Básico', 'Intermediário', 'Avançado', 'Questões erradas', 'Dicas usadas', 'Tempo ativo (min)', 'Dispositivo'];

function configurar() {
  const ss = SpreadsheetApp.getActive();

  // Aba Registros
  const reg = ss.getSheetByName('Registros') || ss.insertSheet('Registros');
  reg.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO])
    .setFontWeight('bold').setBackground('#1D4E89').setFontColor('#FFFFFF');
  reg.setFrozenRows(1);
  reg.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');

  // Aba Turma
  const tur = ss.getSheetByName('Turma') || ss.insertSheet('Turma', 0);
  const titulos = ['E-mail do aluno', 'Nome (opcional)', 'Turma (opcional)', 'Situação', 'Último acesso', 'Dias de acesso']
    .concat(LISTAS.map(l => l[0] + ' · ' + l[1] + ' (melhor resultado)'));
  tur.getRange(1, 1, 1, titulos.length).setValues([titulos])
    .setFontWeight('bold').setBackground('#1D4E89').setFontColor('#FFFFFF').setWrap(true);
  tur.setFrozenRows(1);

  const formulas = [];
  for (let r = 2; r <= LINHAS_TURMA + 1; r++) {
    const a = 'A' + r, e = 'LOWER(TRIM(' + a + '))';
    const linha = [
      '=IF(' + a + '="","",IF(COUNTIF(Registros!B:B,' + e + ')=0,"Não acessou","Acessou"))',
      '=IF(' + a + '="","",IF(COUNTIF(Registros!B:B,' + e + ')=0,"",MAXIFS(Registros!A:A,Registros!B:B,' + e + ')))',
      '=IF(' + a + '="","",COUNTIFS(Registros!B:B,' + e + ',Registros!D:D,"acesso"))'
    ];
    LISTAS.forEach(l => {
      const cond = 'Registros!B:B,' + e + ',Registros!E:E,"' + l[0] + '",Registros!F:F,"' + l[1] + '",Registros!D:D,"lista concluída"';
      linha.push('=IF(' + a + '="","",IF(COUNTIFS(' + cond + ')=0,"—",MAXIFS(Registros!G:G,' + cond + ')&"/10"))');
    });
    formulas.push(linha);
  }
  tur.getRange(2, 4, LINHAS_TURMA, formulas[0].length).setFormulas(formulas);
  tur.getRange(2, 5, LINHAS_TURMA, 1).setNumberFormat('dd/MM/yyyy HH:mm');

  // Destaque de quem não acessou
  const faixa = tur.getRange(2, 4, LINHAS_TURMA, 1);
  const regras = tur.getConditionalFormatRules().filter(rg => !rg.getRanges().some(x => x.getA1Notation() === faixa.getA1Notation()));
  regras.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Não acessou')
    .setBackground('#FAE8E3').setFontColor('#B23A25').setRanges([faixa]).build());
  regras.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Acessou')
    .setBackground('#E2F2E8').setFontColor('#1B7A45').setRanges([faixa]).build());
  tur.setConditionalFormatRules(regras);

  tur.setColumnWidth(1, 260); tur.setColumnWidth(2, 180);
  tur.getRange('A1').setNote('Cole aqui os e-mails dos alunos (um por linha). As colunas D em diante se calculam sozinhas.');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const email = String(d.email || '').trim().toLowerCase();
    const padrao = new RegExp('^[a-z0-9._%+-]+@' + DOMINIO.toLowerCase().replace(/\./g, '\\.') + '$');
    if (!padrao.test(email)) return saida({ ok: false, erro: 'e-mail fora do domínio' });

    const evento = ['acesso', 'lista concluída'].indexOf(d.evento) >= 0 ? d.evento : null;
    if (!evento) return saida({ ok: false, erro: 'evento inválido' });

    let quando = d.quando ? new Date(d.quando) : new Date();
    if (isNaN(quando.getTime()) || quando > new Date(Date.now() + 5 * 60000)) quando = new Date();

    const txt = v => { let s = String(v == null ? '' : v).slice(0, 120); return /^[=+\-@]/.test(s) ? "'" + s : s; };
    const num = v => (typeof v === 'number' && isFinite(v)) ? v : '';

    const reg = SpreadsheetApp.getActive().getSheetByName('Registros');
    reg.appendRow([
      quando, email, TURMAS.indexOf(String(d.turma)) >= 0 ? String(d.turma) : '', evento,
      txt(d.tema), txt(d.lista), num(d.acertos), num(d.total),
      txt(d.basico), txt(d.intermediario), txt(d.avancado), txt(d.erradas),
      num(d.dicas), num(d.tempoMin), txt(d.dispositivo)
    ]);
    return saida({ ok: true });
  } catch (err) {
    return saida({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return saida({ ok: true, app: 'Registro · Física 9º ano · LDV' });
}

function saida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
