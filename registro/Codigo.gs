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
 * Abas criadas (o professor NÃO precisa digitar nada):
 *  - Resumo: por turma, quantos entraram no app, quantos concluíram cada lista e a média.
 *  - Turma 91, Turma 92, Turma 93: se preenchem sozinhas com os alunos que entraram no app
 *    escolhendo aquela turma (último acesso, dias de acesso, melhor resultado, tempo).
 *  - Chamada (opcional): se colar a lista de e-mails de cada turma, mostra quem ainda NÃO entrou.
 *  - Registros: uma linha por acesso diário e por lista concluída (preenchida pelo app).
 *
 * Pode rodar "configurar" de novo quando quiser: os registros e a chamada colada são mantidos.
 */

const DOMINIO = 'COLOQUE_AQUI_O_DOMINIO'; // ex.: aluno.escola.com.br (sem o @)
const TURMAS = ['91', '92', '93'];
const LISTAS = [
  ['Cinemática', 'Lista 1'],
  ['Cinemática', 'Lista 2']
];
const LINHAS = 80; // linhas preparadas por turma

const CABECALHO = ['Data e hora', 'E-mail', 'Turma', 'Evento', 'Tema', 'Lista', 'Acertos', 'Total',
  'Básico', 'Intermediário', 'Avançado', 'Questões erradas', 'Dicas usadas', 'Tempo ativo (min)', 'Dispositivo'];

const AZUL = '#1D4E89', BRANCO = '#FFFFFF';

function configurar() {
  const ss = SpreadsheetApp.getActive();

  // Registros (o app preenche; não mexer)
  const reg = ss.getSheetByName('Registros') || ss.insertSheet('Registros');
  reg.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO])
    .setFontWeight('bold').setBackground(AZUL).setFontColor(BRANCO);
  reg.setFrozenRows(1);
  reg.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');

  TURMAS.forEach((t, i) => criarAbaTurma(ss, t, i + 1));
  criarChamada(ss, TURMAS.length + 1);
  criarResumo(ss);

  // Remove abas vazias que sobraram (planilha nova ou versão antiga do script)
  ['Página1', 'Sheet1', 'Turma'].forEach(n => {
    const sh = ss.getSheetByName(n);
    if (sh && ss.getSheets().length > 1 && (n === 'Turma' || sh.getLastRow() === 0)) ss.deleteSheet(sh);
  });
}

function nomeAba(t) { return 'Turma ' + t; }

function letra(n) { let s = ''; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }

function cabecalho(sh, titulos) {
  sh.getRange(1, 1, 1, titulos.length).setValues([titulos])
    .setFontWeight('bold').setBackground(AZUL).setFontColor(BRANCO).setWrap(true).setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setRowHeight(1, 48);
}

// Colunas da aba de turma: A e-mail · B último acesso · C dias · D.. listas · depois tempo total
const COL_LISTA1 = 4;

function criarAbaTurma(ss, t, pos) {
  const nome = nomeAba(t);
  const tur = ss.getSheetByName(nome) || ss.insertSheet(nome, pos);
  tur.clear();
  tur.clearConditionalFormatRules();
  const titulos = ['E-mail do aluno (preenche sozinho)', 'Último acesso', 'Dias de acesso']
    .concat(LISTAS.map(l => l[1] + ' (melhor resultado)'), ['Tempo ativo total (min)']);
  cabecalho(tur, titulos);

  tur.getRange('A2').setFormula(
    '=IFERROR(SORT(UNIQUE(FILTER(Registros!B2:B,TO_TEXT(Registros!C2:C)="' + t + '"))),"")');

  const formulas = [];
  for (let r = 2; r <= LINHAS + 1; r++) {
    const a = 'A' + r;
    const linha = [
      '=IF(' + a + '="","",MAXIFS(Registros!A:A,Registros!B:B,' + a + '))',
      '=IF(' + a + '="","",COUNTIFS(Registros!B:B,' + a + ',Registros!D:D,"acesso"))'
    ];
    LISTAS.forEach(l => {
      const cond = 'Registros!B:B,' + a + ',Registros!E:E,"' + l[0] + '",Registros!F:F,"' + l[1] + '",Registros!D:D,"lista concluída"';
      linha.push('=IF(' + a + '="","",IF(COUNTIFS(' + cond + ')=0,"—",MAXIFS(Registros!G:G,' + cond + ')))');
    });
    linha.push('=IF(' + a + '="","",SUMIFS(Registros!N:N,Registros!B:B,' + a + '))');
    formulas.push(linha);
  }
  tur.getRange(2, 2, LINHAS, formulas[0].length).setFormulas(formulas);
  tur.getRange(2, 2, LINHAS, 1).setNumberFormat('dd/MM/yyyy HH:mm');
  tur.getRange(2, COL_LISTA1, LINHAS, LISTAS.length).setNumberFormat('0"/10"');
  tur.getRange(2, 2, LINHAS, formulas[0].length).setHorizontalAlignment('center');

  tur.setColumnWidth(1, 280); tur.setColumnWidths(2, formulas[0].length, 130);
  tur.getRange('A1').setNote('Esta aba se preenche sozinha com quem entrou no app escolhendo a turma ' + t + '. Não precisa digitar nada.');
}

// Chamada opcional: o professor cola de uma vez a coluna de e-mails de cada turma
function criarChamada(ss, pos) {
  const ch = ss.getSheetByName('Chamada') || ss.insertSheet('Chamada', pos);
  const titulos = [];
  TURMAS.forEach((t, i) => {
    titulos.push('Turma ' + t + ': cole os e-mails (opcional)', 'Situação');
    if (i < TURMAS.length - 1) titulos.push('');
  });
  cabecalho(ch, titulos);
  const regras = [];
  TURMAS.forEach((t, i) => {
    const colE = 1 + 3 * i, colS = colE + 1, le = letra(colE);
    const f = [];
    for (let r = 2; r <= LINHAS + 1; r++) {
      const a = le + r;
      f.push(['=IF(' + a + '="","",IF(COUNTIF(Registros!B:B,LOWER(TRIM(' + a + ')))=0,"Não entrou","Entrou"))']);
    }
    ch.getRange(2, colS, LINHAS, 1).setFormulas(f).setHorizontalAlignment('center');
    ch.setColumnWidth(colE, 260); ch.setColumnWidth(colS, 110);
    if (i < TURMAS.length - 1) { ch.setColumnWidth(colS + 1, 24); ch.getRange(1, colS + 1).setBackground(BRANCO); }
    const faixa = ch.getRange(2, colS, LINHAS, 1);
    regras.push(
      SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Não entrou')
        .setBackground('#FAE8E3').setFontColor('#B23A25').setBold(true).setRanges([faixa]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Entrou')
        .setBackground('#E2F2E8').setFontColor('#1B7A45').setRanges([faixa]).build());
  });
  ch.setConditionalFormatRules(regras);
  ch.getRange('A1').setNote('Opcional. Se tiver a lista de e-mails da turma (de outra planilha, do Classroom etc.), selecione a coluna inteira lá, copie e cole aqui de uma vez. A coluna Situação mostra quem ainda não entrou no app.');
}

function criarResumo(ss) {
  const res = ss.getSheetByName('Resumo') || ss.insertSheet('Resumo', 0);
  res.clear();
  const cab = ['Turma', 'Entraram no app', 'Na chamada', 'Ainda não entraram'];
  LISTAS.forEach(l => cab.push(l[1] + ' · concluíram', l[1] + ' · média'));
  cabecalho(res, cab);

  const linhas = TURMAS.map((t, i) => {
    const ab = "'" + nomeAba(t) + "'!";
    const le = letra(1 + 3 * i), ls = letra(2 + 3 * i);
    const l = [t, '=COUNTIF(' + ab + 'A2:A,"*@*")',
      '=COUNTIF(Chamada!' + le + '2:' + le + ',"*@*")',
      '=IF(COUNTIF(Chamada!' + le + '2:' + le + ',"*@*")=0,"cole a chamada",COUNTIF(Chamada!' + ls + '2:' + ls + ',"Não entrou"))'];
    LISTAS.forEach((_, k) => {
      const c = letra(COL_LISTA1 + k);
      l.push('=COUNT(' + ab + c + '2:' + c + ')', '=IFERROR(AVERAGE(' + ab + c + '2:' + c + '),"—")');
    });
    return l;
  });
  res.getRange(2, 1, linhas.length, cab.length).setValues(linhas).setHorizontalAlignment('center');
  LISTAS.forEach((_, k) => res.getRange(2, 6 + 2 * k, linhas.length, 1).setNumberFormat('0.0"/10"'));
  res.setColumnWidths(1, cab.length, 130);
  const r0 = TURMAS.length + 3;
  res.getRange(r0, 1).setValue('Os nomes de quem entrou estão nas abas de cada turma. "Ainda não entraram" só aparece se você colar os e-mails na aba Chamada (opcional).')
    .setFontStyle('italic').setFontColor('#5B6670');
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

    const turma = String(d.turma || '').trim();
    if (TURMAS.indexOf(turma) < 0) return saida({ ok: false, erro: 'turma inválida' });

    let quando = d.quando ? new Date(d.quando) : new Date();
    if (isNaN(quando.getTime()) || quando > new Date(Date.now() + 5 * 60000)) quando = new Date();

    const txt = v => { let s = String(v == null ? '' : v).slice(0, 120); return /^[=+\-@]/.test(s) ? "'" + s : s; };
    const num = v => (typeof v === 'number' && isFinite(v)) ? v : '';

    const reg = SpreadsheetApp.getActive().getSheetByName('Registros');
    reg.appendRow([
      quando, email, turma, evento,
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
