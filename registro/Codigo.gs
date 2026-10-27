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
 *  - Resumo: por turma, quantos acessaram, quantos não, quantos concluíram cada lista e a média.
 *  - Turma 91, Turma 92, Turma 93: cole os e-mails dos alunos de cada turma na coluna A;
 *    o resto se calcula sozinho (laranja = o aluno escolheu outra turma no app).
 *  - Registros: uma linha por acesso diário e por lista concluída (preenchida pelo app).
 */

const DOMINIO = 'COLOQUE_AQUI_O_DOMINIO'; // ex.: aluno.escola.com.br (sem o @)
const TURMAS = ['91', '92', '93'];
const LISTAS = [
  ['Cinemática', 'Lista 1'],
  ['Cinemática', 'Lista 2']
];
const LINHAS_TURMA = 60; // quantos alunos cabem em cada aba de turma

const CABECALHO = ['Data e hora', 'E-mail', 'Turma', 'Evento', 'Tema', 'Lista', 'Acertos', 'Total',
  'Básico', 'Intermediário', 'Avançado', 'Questões erradas', 'Dicas usadas', 'Tempo ativo (min)', 'Dispositivo'];

function configurar() {
  const ss = SpreadsheetApp.getActive();

  // Aba Registros (o app preenche; não precisa mexer)
  const reg = ss.getSheetByName('Registros') || ss.insertSheet('Registros');
  reg.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO])
    .setFontWeight('bold').setBackground('#1D4E89').setFontColor('#FFFFFF');
  reg.setFrozenRows(1);
  reg.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');

  // Uma aba por turma: o professor cola os e-mails na coluna A
  TURMAS.forEach((t, i) => criarAbaTurma(ss, t, i + 1));

  // Aba Resumo (primeira aba)
  criarResumo(ss);

  // Remove a aba vazia que vem com a planilha nova
  ['Página1', 'Sheet1'].forEach(n => {
    const sh = ss.getSheetByName(n);
    if (sh && sh.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sh);
  });
}

function nomeAba(t) { return 'Turma ' + t; }

function letra(n) { let s = ''; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }

const COL_LISTA1 = 7; // coluna G: primeira lista

function criarAbaTurma(ss, t, pos) {
  const nome = nomeAba(t);
  const tur = ss.getSheetByName(nome) || ss.insertSheet(nome, pos);
  const titulos = ['E-mail do aluno', 'Nome (opcional)', 'Situação', 'Turma que o aluno escolheu no app', 'Último acesso', 'Dias de acesso']
    .concat(LISTAS.map(l => l[0] + ' · ' + l[1] + ' (melhor resultado)'));
  tur.getRange(1, 1, 1, titulos.length).setValues([titulos])
    .setFontWeight('bold').setBackground('#1D4E89').setFontColor('#FFFFFF').setWrap(true);
  tur.setFrozenRows(1);

  const formulas = [];
  for (let r = 2; r <= LINHAS_TURMA + 1; r++) {
    const a = 'A' + r, e = 'LOWER(TRIM(' + a + '))';
    const linha = [
      '=IF(' + a + '="","",IF(COUNTIF(Registros!B:B,' + e + ')=0,"Não acessou","Acessou"))',
      '=IF(' + a + '="","",IFERROR(INDEX(FILTER(Registros!C:C,Registros!B:B=' + e + '),COUNTIF(Registros!B:B,' + e + ')),""))',
      '=IF(' + a + '="","",IF(COUNTIF(Registros!B:B,' + e + ')=0,"",MAXIFS(Registros!A:A,Registros!B:B,' + e + ')))',
      '=IF(' + a + '="","",COUNTIFS(Registros!B:B,' + e + ',Registros!D:D,"acesso"))'
    ];
    LISTAS.forEach(l => {
      const cond = 'Registros!B:B,' + e + ',Registros!E:E,"' + l[0] + '",Registros!F:F,"' + l[1] + '",Registros!D:D,"lista concluída"';
      linha.push('=IF(' + a + '="","",IF(COUNTIFS(' + cond + ')=0,"—",MAXIFS(Registros!G:G,' + cond + ')))');
    });
    formulas.push(linha);
  }
  tur.getRange(2, 3, LINHAS_TURMA, formulas[0].length).setFormulas(formulas);
  tur.getRange(2, 5, LINHAS_TURMA, 1).setNumberFormat('dd/MM/yyyy HH:mm');
  tur.getRange(2, COL_LISTA1, LINHAS_TURMA, LISTAS.length).setNumberFormat('0"/10"').setHorizontalAlignment('center');
  tur.getRange(2, 4, LINHAS_TURMA, 1).setHorizontalAlignment('center');

  // Cores: quem não acessou (vermelho), quem acessou (verde), turma diferente da aba (laranja)
  const sit = tur.getRange(2, 3, LINHAS_TURMA, 1), inf = tur.getRange(2, 4, LINHAS_TURMA, 1);
  tur.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Não acessou')
      .setBackground('#FAE8E3').setFontColor('#B23A25').setRanges([sit]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo('Acessou')
      .setBackground('#E2F2E8').setFontColor('#1B7A45').setRanges([sit]).build(),
    SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=AND($D2<>"",TO_TEXT($D2)<>"' + t + '")')
      .setBackground('#FDF0D5').setFontColor('#9A5B00').setBold(true).setRanges([inf]).build()
  ]);

  tur.setColumnWidth(1, 260); tur.setColumnWidth(2, 180); tur.setColumnWidth(4, 130);
  tur.getRange('A1').setNote('Cole aqui os e-mails dos alunos da turma ' + t + ' (um por linha). As outras colunas se calculam sozinhas.');
  tur.getRange('D1').setNote('Turma que o aluno escolheu ao entrar no app. Em laranja: escolheu uma turma diferente desta aba (confira com ele).');
}

function criarResumo(ss) {
  const res = ss.getSheetByName('Resumo') || ss.insertSheet('Resumo', 0);
  res.clear();
  const cab = ['Turma', 'Alunos na lista', 'Acessaram', 'Não acessaram'];
  LISTAS.forEach(l => cab.push(l[1] + ' · concluíram', l[1] + ' · média'));
  res.getRange(1, 1, 1, cab.length).setValues([cab])
    .setFontWeight('bold').setBackground('#1D4E89').setFontColor('#FFFFFF').setWrap(true);
  res.setFrozenRows(1);

  const linhas = TURMAS.map(t => {
    const ab = "'" + nomeAba(t) + "'!";
    const l = [t, '=COUNTA(' + ab + 'A2:A)', '=COUNTIF(' + ab + 'C2:C,"Acessou")', '=COUNTIF(' + ab + 'C2:C,"Não acessou")'];
    LISTAS.forEach((_, k) => {
      const c = letra(COL_LISTA1 + k);
      l.push('=COUNT(' + ab + c + '2:' + c + ')', '=IFERROR(AVERAGE(' + ab + c + '2:' + c + '),"—")');
    });
    return l;
  });
  res.getRange(2, 1, linhas.length, cab.length).setValues(linhas);
  LISTAS.forEach((_, k) => res.getRange(2, 6 + 2 * k, linhas.length, 1).setNumberFormat('0.0"/10"'));
  res.getRange(2, 1, linhas.length, cab.length).setHorizontalAlignment('center');

  // Quem entrou no app mas não está em nenhuma aba de turma
  const r0 = TURMAS.length + 4;
  res.getRange(r0, 1, 1, 2).setValues([['E-mails que entraram no app e não estão em nenhuma aba de turma', 'Turma escolhida no app']])
    .setFontWeight('bold').setBackground('#F2B705').setFontColor('#1A1A1A').setWrap(true);
  const soma = TURMAS.map(t => "COUNTIF('" + nomeAba(t) + "'!A2:A,e)").join('+');
  res.getRange(r0 + 1, 1).setFormula(
    '=IFERROR(LET(u,UNIQUE(FILTER(Registros!B2:B,Registros!B2:B<>"")),' +
    'f,FILTER(u,MAP(u,LAMBDA(e,' + soma + '))=0),' +
    'HSTACK(f,MAP(f,LAMBDA(e,INDEX(FILTER(Registros!C2:C,Registros!B2:B=e),COUNTIF(Registros!B2:B,e)))))),"Nenhum")');
  res.setColumnWidth(1, 300);
  for (let c = 2; c <= cab.length; c++) res.setColumnWidth(c, 120);
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
