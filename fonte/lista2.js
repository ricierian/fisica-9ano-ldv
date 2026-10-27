/* ===== Gráficos e esquemas (SVG gerado, segue as cores do tema) ===== */
const nf = v => String(v).replace('.', ',');
function plot(o){
  const W = 340, H = 236, l = 46, r = 18, t = 28, b = 40;
  const x0 = o.xmin || 0, y0 = o.ymin || 0;
  const sx = x => +(l + (x - x0) / (o.xmax - x0) * (W - l - r)).toFixed(1);
  const sy = y => +(H - b - (y - y0) / (o.ymax - y0) * (H - t - b)).toFixed(1);
  let s = `<svg viewBox="0 0 ${W} ${H}" class="plot" role="img" aria-label="${o.aria}">`;
  if (o.area){ const [xa, xb, yv] = o.area; s += `<rect x="${sx(xa)}" y="${sy(yv)}" width="${sx(xb)-sx(xa)}" height="${sy(0)-sy(yv)}" fill="var(--sign)" opacity=".16"/>`; }
  o.xt.forEach(x => { s += `<line x1="${sx(x)}" y1="${sy(y0)}" x2="${sx(x)}" y2="${sy(o.ymax)}" stroke="var(--line)"/><text x="${sx(x)}" y="${sy(y0)+16}" text-anchor="middle" class="pt">${nf(x)}</text>`; });
  o.yt.forEach(y => { s += `<line x1="${sx(x0)}" y1="${sy(y)}" x2="${sx(o.xmax)}" y2="${sy(y)}" stroke="var(--line)"/><text x="${sx(x0)-7}" y="${sy(y)+4}" text-anchor="end" class="pt">${nf(y)}</text>`; });
  (o.g || []).forEach(([x, y, lab]) => {
    s += `<path d="M${sx(x0)} ${sy(y)} H${sx(x)} V${sy(y0)}" fill="none" stroke="var(--muted)" stroke-dasharray="4 3"/>`;
    if (lab) s += `<text x="${sx(x0)-7}" y="${sy(y)+4}" text-anchor="end" class="pt pt-strong">${nf(y)}</text>`;
  });
  s += `<line x1="${sx(x0)}" y1="${sy(y0)}" x2="${sx(o.xmax)}" y2="${sy(y0)}" stroke="var(--muted)" stroke-width="1.5"/><line x1="${sx(x0)}" y1="${sy(y0)}" x2="${sx(x0)}" y2="${sy(o.ymax)}" stroke="var(--muted)" stroke-width="1.5"/>`;
  s += `<text x="${W-r}" y="${H-6}" text-anchor="end" class="pt">${o.xl}</text><text x="${sx(x0)}" y="16" text-anchor="middle" class="pt">${o.yl}</text>`;
  o.L.forEach(ln => {
    s += `<polyline points="${ln.p.map(([x,y]) => sx(x)+','+sy(y)).join(' ')}" fill="none" stroke="${ln.c}" stroke-width="3" stroke-linecap="round"/>`;
    if (ln.lab){ const [x, y] = ln.lp || ln.p[ln.p.length-1]; s += `<text x="${sx(x)+(ln.lp?0:6)}" y="${sy(y)+(ln.dy||4)}" class="pt pt-lab" fill="${ln.c}">${ln.lab}</text>`; }
  });
  (o.pts || []).forEach(([x, y]) => { s += `<circle cx="${sx(x)}" cy="${sy(y)}" r="5" fill="var(--ink)" stroke="var(--surface)" stroke-width="2"/>`; });
  return `<figure class="fig">${s}</svg></figure>`;
}

const ESQ_ENCONTRO = `<figure class="fig"><svg viewBox="0 0 340 124" class="plot" role="img" aria-label="Estrada reta: carro A no marco 0 indo para a direita a 20 metros por segundo; carro B no marco 300 metros indo para a esquerda a 10 metros por segundo.">
  <rect x="8" y="52" width="324" height="34" rx="5" fill="var(--road)"/>
  <line x1="14" y1="69" x2="326" y2="69" stroke="var(--lane)" stroke-width="3" stroke-dasharray="12 10"/>
  <line x1="34" y1="86" x2="34" y2="96" stroke="var(--muted)" stroke-width="1.5"/><line x1="306" y1="86" x2="306" y2="96" stroke="var(--muted)" stroke-width="1.5"/>
  <text x="34" y="112" text-anchor="middle" class="pt">0</text><text x="306" y="112" text-anchor="middle" class="pt">300 m</text>
  <circle cx="34" cy="69" r="12" fill="var(--sign)" stroke="var(--road-ink)" stroke-width="2"/><text x="34" y="74" text-anchor="middle" class="pt pt-car">A</text>
  <circle cx="306" cy="69" r="12" fill="var(--plot2)" stroke="var(--road-ink)" stroke-width="2"/><text x="306" y="74" text-anchor="middle" class="pt pt-car">B</text>
  <path d="M30 34 H92" stroke="var(--ink)" stroke-width="2"/><path d="M92 29 L102 34 L92 39 Z" fill="var(--ink)"/><text x="30" y="22" class="pt pt-strong">20 m/s</text>
  <path d="M310 34 H248" stroke="var(--ink)" stroke-width="2"/><path d="M248 29 L238 34 L248 39 Z" fill="var(--ink)"/><text x="310" y="22" text-anchor="end" class="pt pt-strong">10 m/s</text>
</svg></figure>`;

const TAB_CARRINHO = `<div class="tblwrap"><table>
<tr><th>t (s)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
<tr><th>s (cm)</th><td>2</td><td>5</td><td>8</td><td>11</td><td>14</td></tr>
</table></div>`;

const TOOLS2 = [
  ['Função horária do MU', `s = s<sub>0</sub> + v · t`],
  ['Velocidade', `v = ${f('Δs','Δt')}<br>No gráfico s×t, é a inclinação da reta`],
  ['Gráfico v×t', `Deslocamento = área sob a reta<br>Δs = v · Δt`],
  ['Sinal da velocidade', `v &gt; 0: progressivo (posição aumenta)<br>v &lt; 0: retrógrado (posição diminui)`],
  ['Encontro', `Escreva s<sub>A</sub> e s<sub>B</sub> e iguale:<br>s<sub>A</sub> = s<sub>B</sub>`],
  ['km/h ⇄ m/s', `km/h <b>÷ 3,6</b> → m/s<br>m/s <b>× 3,6</b> → km/h`],
];

const Q2 = [
{
  src:'Inédita', nivel:'básico',
  text:'Um ciclista se desloca em movimento uniforme numa ciclovia reta, e sua posição é dada pela função horária s = 20 + 5t, com s em metros e t em segundos. A posição inicial e a velocidade do ciclista são, respectivamente:',
  opts:['5 m e 20 m/s','20 m e 5 m/s','25 m e 5 m/s','20 m e 25 m/s','0 m e 5 m/s'], ans:1,
  hint:'Compare termo a termo com a função horária geral do movimento uniforme: s = s₀ + v·t.',
  steps:[
    ['A função geral', `<div class="eq">s = s<sub>0</sub> + v · t</div><p>O termo sozinho é a posição inicial. O número que multiplica o t é a velocidade.</p>`],
    ['Comparando', `<div class="eq">s = <span class="hl">20</span> + <span class="hl">5</span> · t</div><ul><li>Posição inicial: s<sub>0</sub> = 20 m</li><li>Velocidade: v = 5 m/s</li></ul>`],
  ],
  alt:'Teste a função: em t = 0, s = 20 + 5·0 = 20 m, que é onde o ciclista estava no começo. Em t = 1 s, s = 25 m. Ele andou 5 m em 1 s, ou seja, 5 m/s.',
  warn:'O número que acompanha o t é a velocidade, não a posição. Quem troca os papéis marca a alternativa a.'
},
{
  src:'Inédita', nivel:'básico',
  text:`Um carrinho de brinquedo anda em linha reta sobre uma régua. Um aluno anotou a posição do carrinho a cada segundo:${TAB_CARRINHO}Qual função horária descreve esse movimento, com s em centímetros e t em segundos?`,
  opts:['s = 2 + 3t','s = 3 + 2t','s = 14 − 3t','s = 2 + 14t','s = 3t'], ans:0,
  hint:'Olhe primeiro a coluna t = 0: ela dá a posição inicial. Depois veja quanto a posição aumenta a cada segundo.',
  steps:[
    ['Posição inicial', `<p>Em t = 0, o carrinho está em 2 cm. Então s<sub>0</sub> = 2 cm.</p>`],
    ['Velocidade', `<p>A cada 1 s, a posição aumenta 3 cm (2 → 5 → 8 → 11 → 14).</p><div class="eq">v = ${f('14 − 2','4 − 0')} = ${f('12 cm','4 s')} = 3 cm/s</div>`],
    ['Função horária', `<div class="eq">s = s<sub>0</sub> + v · t = <span class="hl">2 + 3t</span></div><p>Conferindo com a tabela: em t = 3 s, s = 2 + 3·3 = 11 cm ✓</p>`],
  ],
  alt:'Pense em uma escada: o carrinho começa no degrau 2 e sobe 3 degraus por segundo. Isso é exatamente o que s = 2 + 3t diz.',
  warn:'A alternativa e (s = 3t) esquece que o carrinho não começou no zero da régua: em t = 0 ele já estava em 2 cm.'
},
{
  src:'Inédita', nivel:'básico',
  text:`O gráfico mostra a posição de um corredor em função do tempo, num trecho em que ele corre em movimento uniforme. Qual é a velocidade do corredor?${plot({aria:'Gráfico posição por tempo: reta que sai de 10 metros em t igual a zero e chega a 40 metros em t igual a 5 segundos.', xmax:6, ymax:50, xt:[0,1,2,3,4,5,6], yt:[0,10,20,30,40,50], xl:'t (s)', yl:'s (m)', L:[{p:[[0,10],[5,40]], c:'var(--sign)'}], g:[[5,40]], pts:[[0,10],[5,40]]})}`,
  opts:['2 m/s','6 m/s','8 m/s','10 m/s','30 m/s'], ans:1,
  hint:'Velocidade é deslocamento dividido pelo tempo. Quanto o corredor andou de verdade entre t = 0 e t = 5 s?',
  steps:[
    ['Lendo o gráfico', `<ul><li>Em t = 0: s = 10 m</li><li>Em t = 5 s: s = 40 m</li></ul>`],
    ['Deslocamento e tempo', `<div class="eq">Δs = 40 − 10 = 30 m</div><div class="eq">Δt = 5 − 0 = 5 s</div>`],
    ['Velocidade', `<div class="eq">v = ${f('Δs','Δt')} = ${f('30 m','5 s')} = <span class="hl">6 m/s</span></div>`],
  ],
  alt:'No gráfico s×t do movimento uniforme, a velocidade é a inclinação da reta: quanto a posição sobe a cada segundo. Aqui ela sobe 30 m em 5 s, ou 6 m a cada segundo.',
  warn:'40 ÷ 5 = 8 m/s (alternativa c) usa a posição final no lugar do deslocamento. O corredor não saiu do zero: ele andou 40 − 10 = 30 m.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:'Uma pessoa caminha numa calçada reta em direção a um ponto de ônibus, que fica na origem das posições (s = 0). A posição dela é dada por s = 100 − 4t, com s em metros e t em segundos. Depois de quanto tempo ela chega ao ponto de ônibus?',
  opts:['4 s','25 s','96 s','100 s','400 s'], ans:1,
  hint:'Chegar ao ponto de ônibus significa estar na posição s = 0. Substitua isso na função e descubra o t.',
  steps:[
    ['Interpretando a função', `<ul><li>s<sub>0</sub> = 100 m: ela começa a 100 m do ponto</li><li>v = −4 m/s: a posição diminui, o movimento é retrógrado</li></ul>`],
    ['Condição de chegada', `<div class="eq">s = 0 &nbsp;⇒&nbsp; 0 = 100 − 4t</div>`],
    ['Resolvendo', `<div class="eq">4t = 100 &nbsp;⇒&nbsp; t = ${f('100','4')} = <span class="hl">25 s</span></div>`],
  ],
  alt:'Ela está a 100 m do ponto e se aproxima 4 m a cada segundo. Para cobrir 100 m: 100 ÷ 4 = 25 s.',
  warn:'Não multiplique 100 × 4 (alternativa e). Se ela anda 4 m a cada segundo, para percorrer 100 m são 100 ÷ 4 segundos.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:`O gráfico mostra a velocidade de um ciclista em função do tempo durante 8 s de movimento uniforme. Qual foi o deslocamento do ciclista nesse intervalo?${plot({aria:'Gráfico velocidade por tempo: linha horizontal em 15 metros por segundo, de t igual a zero até t igual a 8 segundos.', xmax:10, ymax:20, xt:[0,2,4,6,8,10], yt:[0,5,10,15,20], xl:'t (s)', yl:'v (m/s)', L:[{p:[[0,15],[8,15]], c:'var(--sign)'}], g:[[8,15]]})}`,
  opts:['1,9 m','15 m','60 m','120 m','240 m'], ans:3,
  hint:'Atenção ao eixo vertical: ele mostra velocidade, não posição. Com a velocidade e o tempo, como se calcula o deslocamento?',
  steps:[
    ['Lendo o gráfico', `<p>A linha é horizontal: a velocidade é constante, v = 15 m/s, de t = 0 até t = 8 s.</p>`],
    ['Deslocamento', `<div class="eq">Δs = v · Δt = 15 m/s × 8 s = <span class="hl">120 m</span></div>`],
    ['Vendo no gráfico', `<p>No gráfico v×t, o deslocamento é a área entre a linha e o eixo do tempo: um retângulo de base 8 s e altura 15 m/s.</p>${plot({aria:'Mesmo gráfico com o retângulo sob a linha destacado, área igual a 120 metros.', xmax:10, ymax:20, xt:[0,2,4,6,8,10], yt:[0,5,10,15,20], xl:'t (s)', yl:'v (m/s)', area:[0,8,15], L:[{p:[[0,15],[8,15]], c:'var(--sign)'}]})}`],
  ],
  alt:'Pense em cada segundo: o ciclista anda 15 m no primeiro, mais 15 m no segundo, e assim por diante. Em 8 segundos: 8 × 15 = 120 m.',
  warn:'O 15 do eixo vertical é velocidade (m/s), não deslocamento. Quem lê "15 m" no gráfico marca a alternativa b. E 60 m (c) é a metade da área, como se o gráfico fosse um triângulo.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:`O gráfico representa a posição de um carrinho de controle remoto que se move em linha reta. Qual função horária descreve esse movimento, no SI?${plot({aria:'Gráfico posição por tempo: reta que desce de 60 metros em t igual a zero até zero em t igual a 12 segundos.', xmax:14, ymax:70, xt:[0,4,8,12], yt:[0,20,40,60], xl:'t (s)', yl:'s (m)', L:[{p:[[0,60],[12,0]], c:'var(--sign)'}], pts:[[0,60],[12,0]]})}`,
  opts:['s = 60 + 5t','s = 60 − 5t','s = 12 − 5t','s = 5 − 60t','s = 60 − 12t'], ans:1,
  hint:'Leia a posição em t = 0 e o instante em que a reta toca o eixo do tempo. A posição está aumentando ou diminuindo?',
  steps:[
    ['Posição inicial', `<p>Em t = 0, s = 60 m. Então s<sub>0</sub> = 60 m.</p>`],
    ['Velocidade', `<p>Em t = 12 s o carrinho chega à origem (s = 0).</p><div class="eq">v = ${f('0 − 60','12 − 0')} = ${f('−60 m','12 s')} = −5 m/s</div><p>O sinal negativo indica movimento retrógrado: a posição diminui.</p>`],
    ['Função horária', `<div class="eq">s = <span class="hl">60 − 5t</span></div><p>Conferindo: em t = 12 s, s = 60 − 5·12 = 0 ✓</p>`],
  ],
  alt:'A reta desce 60 m em 12 s, ou seja, 5 m a cada segundo. Começar em 60 e perder 5 m por segundo é exatamente s = 60 − 5t.',
  warn:'O sinal importa. Com a posição diminuindo, a velocidade é negativa. A função s = 60 + 5t (alternativa a) descreveria o carrinho se afastando da origem.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:'Um trem em movimento uniforme passa pelo km 30 de uma ferrovia reta no instante t = 0, com velocidade de 90 km/h, no sentido em que os marcos quilométricos aumentam. Em qual marco o trem estará 20 minutos depois?',
  opts:['km 50','km 60','km 90','km 120','km 1 830'], ans:1,
  hint:'Monte a função horária com s₀ = 30 km e v = 90 km/h. Com velocidade em km/h, o tempo precisa estar em horas.',
  steps:[
    ['Função horária', `<div class="eq">s = 30 + 90t</div><p>Com s em km e t em horas.</p>`],
    ['Converter o tempo', `<div class="eq">20 min = ${f('20','60')} h = ${f('1','3')} h</div>`],
    ['Calculando a posição', `<div class="eq">s = 30 + 90 × ${f('1','3')} = 30 + 30 = <span class="hl">km 60</span></div>`],
  ],
  alt:'A 90 km/h, o trem anda 90 km em 60 min, ou seja, 30 km a cada 20 min. Ele sai do km 30 e anda mais 30 km: chega ao km 60.',
  warn:'Usar t = 20 direto dá 30 + 90 × 20 = 1 830 (alternativa e), um marco absurdo para 20 minutos de viagem. Velocidade em km/h pede tempo em horas.'
},
{
  src:'Inédita', nivel:'avançado',
  text:'Um objeto se move ao longo de um eixo segundo a função horária s = −12 + 3t, no SI. Assinale a alternativa correta.',
  opts:['O movimento é retrógrado, porque a posição inicial é negativa.','O objeto passa pela origem (s = 0) no instante t = 4 s.','No instante t = 2 s, o objeto está na posição s = 6 m.','A velocidade do objeto é 12 m/s.','A posição inicial do objeto é +12 m.'], ans:1,
  hint:'Identifique s₀ e v, com os sinais. Depois teste cada afirmação substituindo valores na função.',
  steps:[
    ['Identificando', `<div class="eq">s = <span class="hl">−12</span> + <span class="hl">3</span>t</div><p>Então s<sub>0</sub> = −12 m e v = +3 m/s.</p>`],
    ['Testando cada alternativa', `<ul>
      <li><b>a)</b> Falsa. v é positiva, então o movimento é <b>progressivo</b>. O sinal da posição não decide isso.</li>
      <li><b>b)</b> Verdadeira. 0 = −12 + 3t ⇒ 3t = 12 ⇒ t = 4 s.</li>
      <li><b>c)</b> Falsa. s = −12 + 3·2 = −6 m (e não +6 m).</li>
      <li><b>d)</b> Falsa. A velocidade é 3 m/s; o 12 é a posição inicial.</li>
      <li><b>e)</b> Falsa. A posição inicial é −12 m.</li></ul>`],
  ],
  alt:'Imagine uma reta numerada: o objeto começa 12 m à esquerda da origem e anda 3 m para a direita a cada segundo. Para cobrir os 12 m até a origem, leva 12 ÷ 3 = 4 s.',
  warn:'Quem decide se o movimento é progressivo ou retrógrado é o sinal da velocidade, não o da posição. Aqui v = +3 m/s: o objeto anda no sentido positivo, mesmo começando em −12 m.'
},
{
  src:'Inédita', nivel:'avançado',
  text:`Dois carros, A e B, estão em uma estrada reta, separados por 300 m, e andam um em direção ao outro, como mostra o esquema. A parte do marco 0 com velocidade constante de 20 m/s, e B parte do marco 300 m com velocidade constante de 10 m/s. Os dois partem no mesmo instante. Em que instante e em que posição eles se encontram?${ESQ_ENCONTRO}`,
  opts:['t = 10 s, no marco 200 m','t = 10 s, no marco 100 m','t = 15 s, no marco 300 m','t = 30 s, no marco 600 m','t = 20 s, no marco 400 m'], ans:0,
  hint:'Escreva a função horária de cada carro, com cuidado no sinal da velocidade de B. Eles se encontram quando estão na mesma posição: s_A = s_B.',
  steps:[
    ['Funções horárias', `<div class="eq">s<sub>A</sub> = 0 + 20t</div><div class="eq">s<sub>B</sub> = 300 − 10t</div><p>A velocidade de B entra negativa porque ele anda no sentido em que os marcos diminuem.</p>`],
    ['Condição de encontro', `<div class="eq">s<sub>A</sub> = s<sub>B</sub></div><div class="eq">20t = 300 − 10t</div><div class="eq">30t = 300 &nbsp;⇒&nbsp; <span class="hl">t = 10 s</span></div>`],
    ['Posição do encontro', `<div class="eq">s<sub>A</sub> = 20 × 10 = <span class="hl">200 m</span></div><p>Conferindo com B: s<sub>B</sub> = 300 − 10 × 10 = 200 m ✓</p>`],
  ],
  alt:'Como os carros vêm um em direção ao outro, a distância entre eles diminui 20 + 10 = 30 m a cada segundo. Para zerar 300 m: 300 ÷ 30 = 10 s. Nesse tempo, A andou 20 × 10 = 200 m.',
  warn:'O marco 100 m (alternativa b) é a distância que B andou, não a posição do encontro. Posição se mede a partir do marco 0: B saiu do 300 e andou 100 m para trás, chegando ao 200.'
},
{
  src:'Inédita', nivel:'avançado',
  text:`O gráfico mostra as posições de dois ciclistas, A e B, que pedalam no mesmo sentido em uma ciclovia reta, nos primeiros 4 s de movimento. Os dois mantêm velocidades constantes. Em que instante e em que posição A alcança B?${plot({aria:'Gráfico posição por tempo de dois ciclistas nos primeiros 4 segundos. A sai de 0 e chega a 60 metros. B sai de 100 metros e chega a 140 metros.', xmax:5, ymax:160, xt:[0,1,2,3,4,5], yt:[0,40,80,120,160], xl:'t (s)', yl:'s (m)', L:[{p:[[0,0],[4,60]], c:'var(--sign)', lab:'A'}, {p:[[0,100],[4,140]], c:'var(--plot2)', lab:'B'}], g:[[4,60,true],[4,140,true]], pts:[[0,100]]})}`,
  opts:['t = 4 s, em s = 60 m','t = 10 s, em s = 150 m','t = 20 s, em s = 300 m','t = 20 s, em s = 200 m','t = 40 s, em s = 600 m'], ans:2,
  hint:'Use o gráfico para descobrir a posição inicial e a velocidade de cada ciclista. Depois escreva as duas funções horárias e iguale.',
  steps:[
    ['Lendo o gráfico', `<ul><li>A: sai de 0 e chega a 60 m em 4 s ⇒ v<sub>A</sub> = ${f('60','4')} = 15 m/s</li><li>B: sai de 100 m e chega a 140 m em 4 s ⇒ v<sub>B</sub> = ${f('40','4')} = 10 m/s</li></ul>`],
    ['Funções horárias', `<div class="eq">s<sub>A</sub> = 15t</div><div class="eq">s<sub>B</sub> = 100 + 10t</div>`],
    ['Encontro', `<div class="eq">15t = 100 + 10t</div><div class="eq">5t = 100 &nbsp;⇒&nbsp; <span class="hl">t = 20 s</span></div><div class="eq">s<sub>A</sub> = 15 × 20 = <span class="hl">300 m</span></div><p>Conferindo com B: s<sub>B</sub> = 100 + 10 × 20 = 300 m ✓</p>`],
    ['Vendo no gráfico', `<p>Prolongando as retas, elas se cruzam exatamente em t = 20 s e s = 300 m:</p>${plot({aria:'Retas de A e B prolongadas até 24 segundos, cruzando-se em t igual a 20 segundos e posição 300 metros.', xmax:24, ymax:360, xt:[0,4,8,12,16,20,24], yt:[0,100,200,300], xl:'t (s)', yl:'s (m)', L:[{p:[[0,0],[24,360]], c:'var(--sign)', lab:'A', lp:[14,160]}, {p:[[0,100],[24,340]], c:'var(--plot2)', lab:'B', lp:[5,195]}], g:[[20,300]], pts:[[20,300]]})}`],
  ],
  alt:'A está 100 m atrás de B e é 5 m/s mais rápido. A cada segundo, ele tira 5 m dessa diferença: 100 ÷ 5 = 20 s. Nesse tempo, A andou 15 × 20 = 300 m.',
  warn:'Em t = 4 s (alternativa a) as retas ainda não se cruzaram: A está em 60 m e B em 140 m. E s = 200 m (alternativa d) aparece quando se esquece que B começou no marco 100 m: 10 × 20 = 200 m é só o que B andou.'
},
];
