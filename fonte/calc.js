/* ===== Mini calculadora (quatro operações), flutuante, só nas telas das listas ===== */
(function(){
  const fab = document.createElement('button');
  fab.className = 'calc-fab'; fab.type = 'button'; fab.hidden = true;
  fab.setAttribute('aria-label', 'Abrir a calculadora'); fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="2.5" width="15" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="7.5" y="5.5" width="9" height="4" rx="1" fill="currentColor"/><g fill="currentColor"><circle cx="8.8" cy="13.2" r="1.15"/><circle cx="12" cy="13.2" r="1.15"/><circle cx="15.2" cy="13.2" r="1.15"/><circle cx="8.8" cy="17.2" r="1.15"/><circle cx="12" cy="17.2" r="1.15"/><circle cx="15.2" cy="17.2" r="1.15"/></g></svg>`;

  const pn = document.createElement('div');
  pn.className = 'calc'; pn.hidden = true;
  pn.setAttribute('role', 'dialog'); pn.setAttribute('aria-label', 'Calculadora');
  const K = [['C','limpar','fn'],['⌫','apagar','fn'],['÷','dividir','op'],['×','multiplicar','op'],
             ['7'],['8'],['9'],['−','subtrair','op'],
             ['4'],['5'],['6'],['+','somar','op'],
             ['1'],['2'],['3'],['=','igual','eq'],
             ['0',null,'zero'],[',','vírgula']];
  pn.innerHTML = `<div class="calc-top"><span class="calc-tit">Calculadora</span><button type="button" class="calc-x" aria-label="Fechar a calculadora">×</button></div>
    <div class="calc-tela"><div class="calc-exp" aria-live="polite"></div><div class="calc-res"></div></div>
    <div class="calc-teclas">${K.map(([t, nome, c]) => `<button type="button" data-k="${t}"${c ? ` class="k-${c}"` : ''}${nome ? ` aria-label="${nome}"` : ''}>${t}</button>`).join('')}</div>`;
  document.body.append(pn, fab);
  const $exp = pn.querySelector('.calc-exp'), $res = pn.querySelector('.calc-res');

  /* Expressão como lista de fichas: números (texto com ponto decimal) e operadores */
  let tk = [], acabou = false;
  const OPS = '+−×÷', ehOp = t => OPS.includes(t) && t.length === 1;

  function fmt(s){
    if (s === '-' ) return '−';
    const neg = s.startsWith('-'), b = neg ? s.slice(1) : s;
    let [i, d] = b.split('.');
    const m = i.match(/e([+-]?\d+)$/);
    if (m) return (neg ? '−' : '') + num(Number(b));
    i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '−' : '') + i + (d !== undefined ? ',' + d : '');
  }
  function num(v){
    if (!isFinite(v)) return 'Erro';
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 1e12 || a < 1e-6){
      const [m, e] = v.toExponential(6).split('e');
      return m.replace(/\.?0+$/, '').replace('.', ',').replace('-', '−') + ' × 10' + sup(+e);
    }
    const r = +v.toPrecision(10);
    const [i, d] = String(Math.abs(r)).split('.');
    return (r < 0 ? '−' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (d ? ',' + d : '');
  }
  const sup = n => String(n).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || (c === '-' ? '⁻' : '')).join('');

  function calcular(){
    const t = tk.slice();
    if (!t.length) return null;
    while (t.length && (ehOp(t[t.length - 1]) || t[t.length - 1] === '-')) t.pop();
    if (!t.length) return null;
    const vals = [], ops = [];
    t.forEach(x => ehOp(x) ? ops.push(x) : vals.push(Number(x)));
    if (vals.some(v => isNaN(v))) return null;
    // primeiro × e ÷, depois + e −
    const v2 = [vals[0]], o2 = [];
    ops.forEach((o, k) => {
      const b = vals[k + 1];
      if (o === '×') v2[v2.length - 1] *= b;
      else if (o === '÷') v2[v2.length - 1] /= b;
      else { o2.push(o); v2.push(b); }
    });
    return o2.reduce((acc, o, k) => o === '+' ? acc + v2[k + 1] : acc - v2[k + 1], v2[0]);
  }

  function mostrar(){
    $exp.textContent = acabou && tk.length === 1 ? num(Number(tk[0])) : tk.length ? tk.map(x => ehOp(x) ? ` ${x} ` : fmt(x)).join('') : '0';
    const r = calcular();
    $res.textContent = acabou ? '' : (r === null || tk.length < 2 ? '' : '= ' + num(r));
    $exp.classList.toggle('calc-final', acabou);
  }

  function tecla(k){
    const ult = tk[tk.length - 1];
    if (k === 'C'){ tk = []; acabou = false; }
    else if (k === '⌫'){
      if (acabou){ tk = []; acabou = false; }
      else if (ult !== undefined){
        if (ehOp(ult) || ult.length === 1 || /e/.test(ult)) tk.pop();
        else tk[tk.length - 1] = ult.slice(0, -1);
        if (tk[tk.length - 1] === '') tk.pop();
      }
    }
    else if (k === '='){
      const r = calcular();
      if (r === null) return;
      tk = isFinite(r) ? [String(+r.toPrecision(12))] : []; acabou = true;
      if (!isFinite(r)){ $exp.textContent = 'Erro'; $res.textContent = 'divisão por zero'; return; }
    }
    else if (ehOp(k)){
      acabou = false;
      if (ult === undefined){ if (k === '−') tk.push('-'); }
      else if (ult === '-'){ /* só o sinal: ignora */ }
      else if (ehOp(ult)){
        if (k === '−' && (ult === '×' || ult === '÷')) tk.push('-');
        else tk[tk.length - 1] = k;
      }
      else tk.push(k);
    }
    else { // dígito ou vírgula
      if (acabou){ tk = []; acabou = false; }
      const u = tk[tk.length - 1];
      const ehNum = u !== undefined && !ehOp(u);
      if (k === ','){
        if (!ehNum) tk.push('0.');
        else if (u === '-') tk[tk.length - 1] = '-0.';
        else if (!u.includes('.') && !/e/.test(u)) tk[tk.length - 1] = u + '.';
      } else {
        if (!ehNum) tk.push(k);
        else if (/e/.test(u)) return;
        else if (u.replace(/[-.]/g, '').length >= 12) return;
        else if (u === '0') tk[tk.length - 1] = k;
        else if (u === '-0') tk[tk.length - 1] = '-' + k;
        else tk[tk.length - 1] = u + k;
      }
    }
    mostrar();
  }

  function abrir(sim){
    pn.hidden = !sim; fab.setAttribute('aria-expanded', String(sim));
    fab.classList.toggle('on', sim);
    fab.setAttribute('aria-label', sim ? 'Fechar a calculadora' : 'Abrir a calculadora');
    if (sim) mostrar();
  }
  fab.onclick = () => abrir(pn.hidden);
  pn.querySelector('.calc-x').onclick = () => { abrir(false); fab.focus(); };
  pn.querySelector('.calc-teclas').addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) tecla(b.dataset.k); });
  document.addEventListener('keydown', e => {
    if (pn.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''))) return;
    const m = { '*':'×', 'x':'×', '/':'÷', '-':'−', '+':'+', '.':',', ',':',', 'Enter':'=', '=':'=', 'Backspace':'⌫', 'Delete':'C' }[e.key] || (/^\d$/.test(e.key) ? e.key : null);
    if (e.key === 'Escape'){ abrir(false); fab.focus(); e.preventDefault(); return; }
    if (m){ tecla(m); e.preventDefault(); }
  });

  /* Mostra o botão só dentro de uma lista */
  function naLista(){
    const p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const t = SITE.temas.find(x => x.id === p[0]);
    return !!(t && p[1] && t.listas.some(l => l.id === p[1])) && !precisaLogin();
  }
  function atualizar(){
    const ok = naLista();
    fab.hidden = !ok; document.body.classList.toggle('com-calc', ok);
    if (!ok) abrir(false);
  }
  window.addEventListener('hashchange', atualizar);
  document.addEventListener('click', () => setTimeout(atualizar, 0));
  atualizar();
})();
