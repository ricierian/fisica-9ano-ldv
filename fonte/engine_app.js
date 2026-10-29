/* ===== Estrutura do site: temas e listas. Para adicionar material, inclua um item em "listas" ou um novo tema. ===== */
const SITE = {
  escola: 'Colégio Leonardo da Vinci Alfa',
  turma: '9º ano',
  turmas: 'Turmas 91, 92 e 93',
  prof: 'Prof. Ricieri',
  temas: [
    {
      id: 'cinematica', ico: 'Δs', nome: 'Cinemática',
      resumo: 'Como descrever movimentos: posição, deslocamento, tempo e velocidade.',
      listas: [
        { id: 'mu-vm', key: 'cinematica-9ano-mu-v2', num: 1,
          titulo: 'Movimento uniforme e velocidade média',
          resumo: '10 questões de vestibular do básico ao avançado, com dica e resolução passo a passo.',
          intro: 'Esse conteúdo é base para o próximo teste.',
          tools: TOOLS, Q: Q },
        { id: 'mu-funcoes', key: 'cinematica-9ano-mu-funcoes-v1', num: 2,
          titulo: 'Funções horárias, gráficos e encontro',
          resumo: '10 questões do básico ao avançado: funções horárias, gráficos s×t e v×t e problemas de encontro.',
          intro: 'As questões vão do nível básico ao avançado, e as duas últimas são problemas de encontro.',
          tools: TOOLS2, Q: Q2 },
        { id: 'muv-aceleracao', key: 'cinematica-9ano-muv-aceleracao-v1', num: 3,
          titulo: 'MUV: aceleração e velocidade',
          resumo: '10 questões do básico ao avançado: aceleração média, função horária da velocidade e movimento acelerado ou retardado.',
          intro: 'Primeira parte do capítulo de MUV. As questões vão do nível básico ao avançado.',
          tools: TOOLS3, Q: Q3 },
        { id: 'muv-torricelli', key: 'cinematica-9ano-muv-torricelli-v1', num: 4,
          titulo: 'MUV: posição e Torricelli',
          resumo: '10 questões do básico ao avançado: função horária do espaço, equação de Torricelli, frenagem e tempo de reação.',
          intro: 'Segunda parte do capítulo de MUV. Faça antes a Lista 3. As últimas questões trazem situações de trânsito.',
          tools: TOOLS4, Q: Q4 }
      ]
    }
  ]
};

/* ===== Configuração do registro (preencher ao publicar) ===== */
const CONFIG = {
  dominio: 'alunos.colegioleonardodavinci.com.br',      // domínio do e-mail dos alunos, ex.: 'aluno.escola.com.br'. Vazio = não pede identificação
  registro: 'https://script.google.com/macros/s/AKfycbwchNdMJaLwebZIql97HMBSbruQYHSS86SP70j8JdNxs-Zkf9z1gELo4Wgrsm31UkbI/exec',     // URL do App da Web do Google Apps Script. Vazio = não envia resultados
  turmas: ['91', '92', '93']
};
const $ = id => document.getElementById(id);
const ID_KEY = 'fis9ldv-aluno', FILA_KEY = 'fis9ldv-fila', DIA_KEY = 'fis9ldv-ultimo-acesso';
const getAluno = () => { try { const a = JSON.parse(localStorage.getItem(ID_KEY) || 'null'); return a && a.email ? a : null; } catch(e){ return null; } };
const setAluno = a => { try { if (a) localStorage.setItem(ID_KEY, JSON.stringify(a)); else localStorage.removeItem(ID_KEY); } catch(e){} };
const precisaLogin = () => !!CONFIG.dominio && !getAluno();
function emailValido(e){ const d = CONFIG.dominio.toLowerCase().replace(/^@/, ''); return new RegExp('^[a-z0-9._%+-]+@' + d.replace(/[.]/g, '\\.') + '$').test(e); }
function enviar(ev){
  const a = getAluno(); if (!CONFIG.registro || !a) return;
  const item = Object.assign({ email: a.email, turma: a.turma, quando: new Date().toISOString(), dispositivo: /mobi|android|iphone|ipad/i.test(navigator.userAgent) ? 'celular/tablet' : 'computador' }, ev);
  let fila = []; try { fila = JSON.parse(localStorage.getItem(FILA_KEY) || '[]'); } catch(e){}
  fila.push(item); try { localStorage.setItem(FILA_KEY, JSON.stringify(fila.slice(-60))); } catch(e){}
  enviarFila();
}
let enviando = false;
async function enviarFila(){
  if (!CONFIG.registro || enviando || navigator.onLine === false) return;
  enviando = true;
  try {
    let fila = []; try { fila = JSON.parse(localStorage.getItem(FILA_KEY) || '[]'); } catch(e){}
    while (fila.length){
      await fetch(CONFIG.registro, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(fila[0]) });
      fila.shift(); try { localStorage.setItem(FILA_KEY, JSON.stringify(fila)); } catch(e){}
    }
  } catch(e){} finally { enviando = false; }
}
window.addEventListener('online', enviarFila);
function registrarAcessoDoDia(){
  const a = getAluno(); if (!CONFIG.registro || !a) return;
  const marca = a.email + '|' + new Date().toLocaleDateString('sv-SE');
  let ult = null; try { ult = localStorage.getItem(DIA_KEY); } catch(e){}
  if (ult !== marca){ enviar({ evento: 'acesso' }); try { localStorage.setItem(DIA_KEY, marca); } catch(e){} }
}
/* Tempo ativo: conta só com a lista aberta, a tela visível e o aluno interagindo (pausa após 3 min parado) */
let tMarca = null, tInter = Date.now();
['click','keydown','scroll','touchstart'].forEach(ev => window.addEventListener(ev, () => { if (LI && tMarca === null && document.visibilityState === 'visible') tMarca = Date.now(); tInter = Date.now(); }, { passive: true }));
function contarTempo(){
  if (!LI || !st || tMarca === null) return;
  const fim = Math.min(Date.now(), tInter + 180000);
  if (fim > tMarca) st.tempo = (st.tempo || 0) + (fim - tMarca) / 1000;
  tMarca = Date.now() <= tInter + 180000 ? Date.now() : null;
  store(LI.key, st);
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden'){ contarTempo(); tMarca = null; } else if (LI){ tMarca = Date.now(); tInter = Date.now(); } });
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
const load = k => { try { const s = JSON.parse(localStorage.getItem(k) || 'null'); if (s && typeof s === 'object') return Object.assign({ answers:{}, hints:{}, cur:-1 }, s); } catch(e){} return { answers:{}, hints:{}, cur:-1 }; };
const store = (k, s) => { try { localStorage.setItem(k, JSON.stringify(s)); } catch(e){} };

let T = null, LI = null, st = null; // tema, lista e progresso atuais

function stats(l){ const s = load(l.key); let n = 0, c = 0; l.Q.forEach((q,i)=>{ const a = s.answers[i]; if (a !== undefined){ n++; if (a === q.ans) c++; } }); return { n, c, total: l.Q.length }; }

function plate(eyebrow, title, sub){
  $('eyebrow').textContent = eyebrow; $('ptitle').textContent = title; $('psub').textContent = sub;
}
function crumbs(items){
  const c = $('crumbs');
  if (!items){ c.hidden = true; c.innerHTML = ''; return; }
  c.hidden = false;
  c.innerHTML = items.map((it, i) => {
    const last = i === items.length - 1;
    return (i ? '<span class="sep">›</span>' : '') + (last ? `<span class="here">${it.label}</span>` : `<button data-nav="${it.nav}">${it.label}</button>`);
  }).join('');
}

/* ===== Nível 1: início da turma ===== */
function openHome(){
  contarTempo(); tMarca = null;
  T = LI = null;
  plate(`Física · ${SITE.escola}`, SITE.turma, `${SITE.turmas} · ${SITE.prof}`);
  crumbs(null);
  $('view').innerHTML = `
    <section class="card intro">
      <p class="sect-label">Como usar</p>
      <p>Aqui ficam as listas e práticas de Física da turma. Escolha um tema e depois a lista. Cada lista mostra uma questão por vez, com dica e resolução detalhada logo depois de responder.</p>
    </section>
    <p class="sect-label">Temas</p>
    <div class="cards">
      ${SITE.temas.map((t, i) => {
        const nl = t.listas.length;
        return `<button class="tile" data-tema="${i}">
          <span class="ico">${t.ico}</span>
          <span><span class="tt">${t.nome}</span><span class="ds">${t.resumo}</span>
            <span class="meta"><span class="chip">${nl} ${nl === 1 ? 'lista' : 'listas'}</span></span></span>
          <span class="go">→</span></button>`;
      }).join('')}
    </div>
    <p class="note">Novos temas e listas entram aqui ao longo do trimestre.</p>
    <section class="card install" id="installCard" hidden></section>
    ${getAluno() ? `<p class="note">Entrou como <b>${getAluno().email}</b>${getAluno().turma ? ' · Turma ' + getAluno().turma : ''}. <button class="btn ghost" data-act="sair" style="padding:0">Não é você? Trocar</button></p>` : ''}`;
  showInstall();
  toTop();
}

/* ===== Nível 2: tema ===== */
function openTema(ti){
  contarTempo(); tMarca = null;
  T = SITE.temas[ti]; LI = null;
  plate(`Física · ${SITE.turma}`, T.nome, T.resumo);
  crumbs([{ label:'Início', nav:'home' }, { label:T.nome }]);
  $('view').innerHTML = `
    <p class="sect-label">Listas e práticas</p>
    <div class="cards">
      ${T.listas.map((l, i) => {
        const s = stats(l);
        const prog = s.n ? `<span class="chip ${s.n === s.total ? 'ok' : ''}">${s.n === s.total ? `Feita · ${s.c}/${s.total} certas` : `${s.n}/${s.total} respondidas`}</span>` : '';
        return `<button class="tile" data-lista="${i}">
          <span class="ico lane">L${l.num}</span>
          <span><span class="tt">Lista ${l.num} · ${l.titulo}</span><span class="ds">${l.resumo}</span>
            <span class="meta"><span class="chip">${s.total} questões</span><span class="chip">com resolução</span>${prog}</span></span>
          <span class="go">→</span></button>`;
      }).join('')}
    </div>`;
  toTop();
}

/* ===== Nível 3: lista interativa ===== */
function openLista(li){
  contarTempo();
  LI = T.listas[li]; st = load(LI.key); st.cur = -1; tMarca = Date.now(); tInter = Date.now();
  plate(`Física · ${SITE.turma} · ${T.nome}`, `Lista ${LI.num}`, LI.titulo);
  crumbs([{ label:'Início', nav:'home' }, { label:T.nome, nav:'tema' }, { label:`Lista ${LI.num}` }]);
  $('view').innerHTML = `
    <nav class="road" aria-label="Progresso nas questões">
      <div class="road-top"><span id="roadLabel"></span><span id="roadScore"></span></div>
      <div class="lane">
        <svg class="car" id="car" viewBox="0 0 34 20" aria-hidden="true">
          <path d="M3 13 L5 8 Q6 6 9 6 L21 6 Q23 6 25 8 L29 11 Q32 11.5 32 14 L32 15 L2 15 L2 14 Q2 13 3 13 Z" fill="var(--lane)"/>
          <path d="M8 8 L12 8 L12 11 L6.5 11 Z M14 8 L20 8 Q21.5 8 23 9.5 L24.5 11 L14 11 Z" fill="var(--road)"/>
          <circle cx="9" cy="15.5" r="3" fill="var(--road-ink)"/><circle cx="25" cy="15.5" r="3" fill="var(--road-ink)"/>
        </svg>
      </div>
      <div class="marks" id="marks" style="grid-template-columns:repeat(${LI.Q.length},1fr)"></div>${levelRow()}
    </nav>
    <details class="tools">
      <summary><span>Caixa de ferramentas: fórmulas e conversões</span><span class="chev">›</span></summary>
      <div class="tools-grid">${LI.tools.map(([t,h])=>`<div class="tool"><h4>${t}</h4><div>${h}</div></div>`).join('')}</div>
    </details>
    <div id="qa"></div>`;
  renderRoad(); renderIntro(); toTop();
}


const lvKey = n => ({'básico':'b','intermediário':'i','avançado':'a'})[n] || 'b';
function levelGroups(){
  const g = [];
  LI.Q.forEach((q, i) => { if (!q.nivel) return; const last = g[g.length-1]; if (last && last.n === q.nivel && last.end === i) last.end = i + 1; else g.push({ n: q.nivel, start: i, end: i + 1 }); });
  return g;
}
function levelRow(){
  const g = levelGroups(); if (!g.length) return '';
  return `<div class="lvrow" style="grid-template-columns:repeat(${LI.Q.length},1fr)">${g.map(x => `<span class="lv-${lvKey(x.n)}" style="grid-column:${x.start+1} / ${x.end+1}">${x.n}</span>`).join('')}</div>`;
}
function levelSummary(){
  const g = levelGroups(); if (!g.length) return '';
  const c = {}; g.forEach(x => c[x.n] = (c[x.n] || 0) + (x.end - x.start));
  return `<div class="row" style="gap:6px">${Object.keys(c).map(n => `<span class="lvl lvl-${lvKey(n)}">${c[n]} ${n === 'básico' ? (c[n]>1?'básicas':'básica') : n === 'intermediário' ? (c[n]>1?'intermediárias':'intermediária') : (c[n]>1?'avançadas':'avançada')}</span>`).join('')}</div>`;
}
const save = () => store(LI.key, st);
function resumoLista(){
  const porNivel = n => { const idx = LI.Q.map((q,i) => i).filter(i => LI.Q[i].nivel === n); return idx.length ? idx.filter(i => status(i) === 'ok').length + '/' + idx.length : ''; };
  return {
    evento: 'lista concluída', tema: T.nome, lista: 'Lista ' + LI.num,
    acertos: correctCount(), total: LI.Q.length,
    basico: porNivel('básico'), intermediario: porNivel('intermediário'), avancado: porNivel('avançado'),
    erradas: LI.Q.map((q,i) => i).filter(i => status(i) !== 'ok').map(i => i + 1).join(', '),
    dicas: Object.keys(st.hints || {}).filter(k => st.hints[k]).length,
    tempoMin: Math.round((st.tempo || 0) / 6) / 10
  };
}
function status(i){ const a = st.answers[i]; if (a === undefined) return 'none'; return a === LI.Q[i].ans ? 'ok' : 'bad'; }
function correctCount(){ return LI.Q.reduce((n,_,i)=> n + (status(i)==='ok'?1:0), 0); }
function answeredCount(){ return LI.Q.reduce((n,_,i)=> n + (status(i)!=='none'?1:0), 0); }

function renderRoad(){
  const Q = LI.Q;
  $('marks').innerHTML = Q.map((_,i)=>{
    const s = status(i);
    const cls = ['mk', s==='ok'?'ok':s==='bad'?'bad':'', st.cur===i?'cur':''].join(' ');
    const lab = s==='ok'?'certa':s==='bad'?'errada':'não respondida';
    return `<button class="${cls}" data-go="${i}" aria-label="Questão ${i+1}, ${lab}">${i+1}</button>`;
  }).join('');
  const pos = st.cur < 0 ? 0 : st.cur >= Q.length ? Q.length - 0.5 : st.cur + 0.5;
  $('car').style.left = `calc(${(pos/Q.length)*100}% + ${st.cur<0?17:0}px)`;
  const n = answeredCount();
  $('roadLabel').textContent = st.cur>=0 && st.cur<Q.length ? `Questão ${st.cur+1} de ${Q.length}` : `Percurso: ${Q.length} questões`;
  $('roadScore').textContent = n ? `${correctCount()} de ${n} certas` : '';
}

function renderIntro(){
  const Q = LI.Q, n = answeredCount();
  $('qa').innerHTML = `
  <section class="card intro">
    <div class="qnum">Antes de começar</div>
    <p>São <b>${Q.length} questões</b> sobre ${LI.titulo.toLowerCase()}. ${LI.intro || ''}</p>${levelSummary()}
    <ul>
      <li>Responda uma questão por vez. Logo depois, aparece a <b>resolução detalhada</b>, passo a passo.</li>
      <li>Travou? Use o botão <b>Ver dica</b> antes de responder.</li>
      <li>A <b>caixa de ferramentas</b> acima tem as fórmulas e conversões que você vai usar.</li>
      <li>Tenha papel e lápis à mão e tente resolver antes de clicar na alternativa.</li>
    </ul>
    <div class="row">
      <button class="btn primary" id="startBtn">${n && n < Q.length ? 'Continuar de onde parei' : n === Q.length ? 'Ver meu resultado' : 'Começar a questão 1'}</button>
      ${n ? `<span class="small">${n} de ${Q.length} questões respondidas neste aparelho.</span>` : ''}
    </div>
  </section>`;
  $('startBtn').onclick = () => {
    if (n === Q.length) goQ(Q.length);
    else { const next = Q.findIndex((_,i)=>status(i)==='none'); goQ(next < 0 ? 0 : next); }
  };
}

function renderQuestion(i){
  const Q = LI.Q, q = Q[i], a = st.answers[i], done = a !== undefined, skipped = a === -1;
  const opts = q.opts.map((o,k)=>{
    let cls = 'opt', tag = '';
    if (done){
      if (k === q.ans){ cls += ' is-correct'; tag = '<span class="tag">✓ correta</span>'; }
      else if (k === a){ cls += ' is-wrong'; tag = '<span class="tag">✗ sua resposta</span>'; }
      else cls += ' is-dim';
    }
    return `<li><button class="${cls}" data-pick="${k}" ${done?'disabled':''}><span class="letter">${L[k]}</span><span>${o}</span>${tag}</button></li>`;
  }).join('');
  let fb = '';
  if (done){
    fb = a === q.ans
      ? `<div class="feedback good" role="status"><span class="ico">✓</span>Correto! Confira a resolução para ver se o seu raciocínio bate.</div>`
      : skipped
        ? `<div class="feedback bad" role="status"><span class="ico">→</span>Sem problema. Acompanhe a resolução com calma e tente refazer no papel.</div>`
        : `<div class="feedback bad" role="status"><span class="ico">✗</span>Não foi dessa vez. A resposta certa é a ${L[q.ans]}. Veja onde o raciocínio muda.</div>`;
  }
  const sol = done ? `
    <section class="sol" aria-label="Resolução detalhada">
      <h3>Resolução detalhada</h3>
      <ol class="steps">
        ${q.steps.map(([lab,html])=>`<li class="step"><div class="step-body"><div class="step-label">${lab}</div>${html}</div></li>`).join('')}
      </ol>
      <div class="answer"><span class="letter">${L[q.ans]}</span><span>Resposta: alternativa ${L[q.ans]} (${q.opts[q.ans]})</span></div>
      ${q.alt ? `<div class="alt"><b class="lbl">Outro jeito de pensar</b>${q.alt}</div>` : ''}
      ${q.warn ? `<div class="warn"><b class="lbl">Cuidado com a pegadinha</b>${q.warn}</div>` : ''}
    </section>` : '';
  const showHint = st.hints[i] && !done;
  const last = i === Q.length - 1;
  $('qa').innerHTML = `
  <article class="card">
    <div class="qhead">
      <div class="qnum">Questão ${i+1} <span>/ ${Q.length}</span></div>
      <span class="row" style="gap:6px">${q.nivel ? `<span class="lvl lvl-${lvKey(q.nivel)}">Nível ${q.nivel}</span>` : ''}<span class="src">${q.src}</span></span>
    </div>
    <div class="stmt">${q.text}</div>
    <ul class="opts">${opts}</ul>
    ${!done ? `<div class="row">
        ${showHint ? '' : `<button class="btn" id="hintBtn">Ver dica</button>`}
        <span class="spacer"></span>
        <button class="btn ghost" id="skipBtn">Não sei, mostrar a resolução</button>
      </div>` : ''}
    ${showHint ? `<div class="tip"><b>Dica</b>${q.hint}</div>` : ''}
    ${fb}
    ${sol}
    <div class="row">
      ${i > 0 ? `<button class="btn" id="prevBtn">← Anterior</button>` : ''}
      <span class="spacer"></span>
      ${done ? `<button class="btn primary" id="nextBtn">${last ? 'Ver meu resultado' : 'Próxima questão →'}</button>`
             : (!last ? `<button class="btn ghost" id="jumpBtn">Pular por enquanto</button>` : '')}
    </div>
  </article>`;
  $('qa').querySelectorAll('[data-pick]').forEach(b => b.onclick = () => answer(i, +b.dataset.pick));
  const h = $('hintBtn'); if (h) h.onclick = () => { st.hints[i] = true; save(); renderQuestion(i); };
  const s = $('skipBtn'); if (s) s.onclick = () => answer(i, -1);
  const p = $('prevBtn'); if (p) p.onclick = () => goQ(i - 1);
  const n = $('nextBtn'); if (n) n.onclick = () => goQ(i + 1);
  const j = $('jumpBtn'); if (j) j.onclick = () => goQ(i + 1);
}

function answer(i, k){
  if (st.answers[i] !== undefined) return;
  st.answers[i] = k; save();
  if (answeredCount() === LI.Q.length && !st.enviado){ contarTempo(); st.enviado = true; save(); enviar(resumoLista()); }
  renderRoad(); renderQuestion(i);
  const fb = $('qa').querySelector('.feedback');
  if (fb) fb.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

function renderEnd(){
  const Q = LI.Q, c = correctCount(), n = answeredCount();
  const msg = n < Q.length
    ? `Você ainda tem ${Q.length - n} questão(ões) sem responder. Toque nelas abaixo para terminar.`
    : c >= Math.ceil(Q.length * 0.9) ? 'Excelente! Você domina este conteúdo. Releia as pegadinhas para chegar ao teste ainda mais seguro.'
    : c >= Math.ceil(Q.length * 0.6) ? 'Bom trabalho. Revise as questões que errou, com atenção especial às conversões de unidades: é onde mais se perde ponto.'
    : 'Vale revisar a caixa de ferramentas e refazer as questões com calma, acompanhando cada passo da resolução, antes do teste.';
  $('qa').innerHTML = `
  <section class="card">
    <div class="qnum">Resultado</div>
    <div class="score">${c}<span> / ${Q.length}</span></div>
    <p style="margin:0">${msg}</p>
    <ul class="reslist">
      ${Q.map((q,i)=>{ const s = status(i); const t = s==='ok'?'✓ certa':s==='bad'?(st.answers[i]===-1?'→ vista':'✗ errada'):'— pendente';
        return `<li><button class="res ${s}" data-go="${i}"><b>Questão ${i+1}</b><span class="st">${t}</span></button></li>`; }).join('')}
    </ul>
    <div class="row">
      <button class="btn" id="resetBtn">Refazer a lista do zero</button>
      <button class="btn primary" data-nav="tema">Voltar para ${T.nome}</button>
      <span class="small" id="resetNote"></span>
    </div>
  </section>`;
  const r = $('resetBtn'); let armed = false;
  r.onclick = () => {
    if (!armed){ armed = true; r.textContent = 'Confirmar: apagar minhas respostas'; $('resetNote').textContent = 'Toque de novo para confirmar.'; return; }
    st = { answers:{}, hints:{}, cur:-1, tempo:0 }; save(); goQ(-1);
  };
}

function goQ(i){
  st.cur = i; save();
  renderRoad();
  if (i < 0) renderIntro();
  else if (i >= LI.Q.length) renderEnd();
  else renderQuestion(i);
  toTop();
}

/* ===== Navegação com endereço próprio (#/tema/lista) e botão Voltar do celular ===== */
function go(h){ if (location.hash === h) route(); else location.hash = h; }
function openLogin(){
  contarTempo(); tMarca = null; T = LI = null;
  plate(`Física · ${SITE.escola}`, SITE.turma, `${SITE.turmas} · ${SITE.prof}`);
  crumbs(null);
  $('view').innerHTML = `
    <form class="card intro" id="loginForm" novalidate>
      <p class="sect-label">Identificação</p>
      <p>Para usar as listas, informe o seu <b>e-mail do colégio</b> e a sua turma. Você só faz isso uma vez neste aparelho.</p>
      <label class="fld"><span>E-mail do colégio <small class="fld-dica">(só a parte antes do @)</small></span>
        <span class="emailbox">
          <input id="loginEmail" type="text" inputmode="email" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="nome.sobrenome" required>
          <span class="dom" aria-hidden="true">@${CONFIG.dominio.replace('.', '.<wbr>')}</span>
        </span></label>
      <label class="fld"><span>Turma</span>
        <select id="loginTurma" required><option value="">Escolha</option>${CONFIG.turmas.map(t => `<option value="${t}">${t}</option>`).join('')}</select></label>
      <p class="small" id="loginErro" role="alert"></p>
      <div class="row"><button class="btn primary" type="submit">Entrar</button></div>
      <p class="note">O professor recebe o seu e-mail, a turma, a data de acesso e os resultados das listas (acertos, tempo e dicas usadas), só para acompanhar os estudos da turma.</p>
    </form>`;
  $('loginForm').onsubmit = e => {
    e.preventDefault();
    let usuario = $('loginEmail').value.trim().toLowerCase().replace(/\s+/g, '');
    const dom = '@' + CONFIG.dominio.toLowerCase().replace(/^@/, '');
    if (usuario.endsWith(dom)) usuario = usuario.slice(0, -dom.length);   // se digitou o e-mail inteiro, aproveita
    const email = usuario + dom, turma = $('loginTurma').value;
    if (!usuario){ $('loginErro').textContent = 'Escreva a parte do seu e-mail antes do @.'; $('loginEmail').focus(); return; }
    if (usuario.includes('@') || !emailValido(email)){ $('loginErro').textContent = `Escreva só a parte antes do @. O resto (${dom}) já está preenchido.`; $('loginEmail').focus(); return; }
    if (!turma){ $('loginErro').textContent = 'Escolha a sua turma.'; $('loginTurma').focus(); return; }
    setAluno({ email, turma }); registrarAcessoDoDia(); route();
  };
  toTop();
}
function route(){
  if (precisaLogin()){ openLogin(); return; }
  registrarAcessoDoDia(); enviarFila();
  const p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const ti = SITE.temas.findIndex(t => t.id === p[0]);
  if (ti < 0){ openHome(); return; }
  if (!p[1]){ openTema(ti); return; }
  const li = SITE.temas[ti].listas.findIndex(l => l.id === p[1]);
  if (li < 0){ openTema(ti); return; }
  T = SITE.temas[ti]; openLista(li);
}
window.addEventListener('hashchange', route);
document.addEventListener('click', e => {
  const act = e.target.closest('[data-act="sair"]'); if (act){ setAluno(null); try { localStorage.removeItem(DIA_KEY); } catch(err){} go('#/'); route(); return; }
  const nav = e.target.closest('[data-nav]');
  if (nav){ go(nav.dataset.nav === 'tema' && T ? '#/' + T.id : '#/'); return; }
  const t = e.target.closest('[data-tema]'); if (t){ go('#/' + SITE.temas[+t.dataset.tema].id); return; }
  const l = e.target.closest('[data-lista]'); if (l){ go('#/' + T.id + '/' + T.listas[+l.dataset.lista].id); return; }
  const g = e.target.closest('[data-go]'); if (g && LI){ goQ(+g.dataset.go); }
});

/* ===== Instalação como aplicativo ===== */
let installEvt = null;
const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; showInstall(); });
window.addEventListener('appinstalled', () => { installEvt = null; const c = $('installCard'); if (c) c.hidden = true; });
function showInstall(){
  const c = $('installCard'); if (!c || standalone()) return;
  if (installEvt){
    c.hidden = false;
    c.innerHTML = `<p class="sect-label">Instale no celular</p><p>Tenha as listas como um aplicativo: ícone na tela inicial e funcionando mesmo sem internet.</p><div class="row"><button class="btn primary" id="instBtn">Instalar o app</button></div>`;
    $('instBtn').onclick = async () => { installEvt.prompt(); try { await installEvt.userChoice; } catch(e){} installEvt = null; c.hidden = true; };
  } else if (isIOS){
    c.hidden = false;
    c.innerHTML = `<p class="sect-label">Instale no iPhone</p><p>No Safari, toque em <b>Compartilhar</b> (o quadrado com a seta para cima) e depois em <b>Adicionar à Tela de Início</b>.</p>`;
  }
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
route();
