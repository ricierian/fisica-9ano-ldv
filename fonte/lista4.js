/* ===== Lista 4 · MUV: função horária do espaço e equação de Torricelli ===== */

const TAB_S4 = `<div class="tblwrap"><table>
<tr><th>t (s)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
<tr><th>s (m)</th><td>0</td><td>1,5</td><td>6</td><td>13,5</td><td>24</td></tr>
</table></div>`;

const ESQ_FRENAGEM = `<figure class="fig"><svg viewBox="0 0 340 140" class="plot" role="img" aria-label="Carro que começa a frear a 25 metros por segundo e para depois de deixar 50 metros de marcas de pneu no asfalto.">
  <text x="22" y="18" class="pt pt-strong">início da frenagem: 25 m/s</text>
  <text x="318" y="18" text-anchor="end" class="pt pt-strong">parado</text>
  <rect x="8" y="40" width="324" height="40" rx="5" fill="var(--road)"/>
  <line x1="60" y1="70" x2="276" y2="70" stroke="var(--road-ink)" stroke-width="3" opacity=".55"/>
  <line x1="60" y1="76" x2="276" y2="76" stroke="var(--road-ink)" stroke-width="3" opacity=".55"/>
  ${carro(48, 62, 'var(--sign)', .45)}${carro(290, 62, 'var(--sign)')}
  <path d="M60 98 V110 M276 98 V110 M60 104 H276" stroke="var(--muted)" stroke-width="1.5"/>
  <text x="168" y="128" text-anchor="middle" class="pt pt-strong">50 m de marcas no asfalto</text>
</svg></figure>`;

const ESQ_REACAO = `<figure class="fig"><svg viewBox="0 0 340 150" class="plot" role="img" aria-label="Estrada dividida em dois trechos: primeiro o tempo de reação de 0,8 segundo, com velocidade constante de 54 quilômetros por hora; depois a frenagem com desaceleração de 5 metros por segundo ao quadrado, até parar.">
  <path d="M20 26 V34 M150 26 V34 M20 30 H150" stroke="var(--plot2)" stroke-width="2"/>
  <text x="85" y="18" text-anchor="middle" class="pt pt-strong">reação: 0,8 s</text>
  <path d="M150 26 V34 M320 26 V34 M150 30 H320" stroke="var(--sign)" stroke-width="2"/>
  <text x="235" y="18" text-anchor="middle" class="pt pt-strong">frenagem: 5 m/s²</text>
  <rect x="8" y="46" width="324" height="34" rx="5" fill="var(--road)"/>
  <line x1="14" y1="63" x2="326" y2="63" stroke="var(--lane)" stroke-width="3" stroke-dasharray="12 10"/>
  <line x1="20" y1="44" x2="20" y2="94" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <line x1="150" y1="44" x2="150" y2="94" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <line x1="320" y1="44" x2="320" y2="94" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="20" y="110" class="pt">vê o perigo</text>
  <text x="150" y="110" text-anchor="middle" class="pt">pisa no freio</text>
  <text x="320" y="110" text-anchor="end" class="pt">para</text>
  <path d="M24 132 H74" stroke="var(--ink)" stroke-width="2"/><path d="M74 127 L84 132 L74 137 Z" fill="var(--ink)"/>
  <text x="92" y="136" class="pt pt-strong">54 km/h</text>
</svg></figure>`;

const semaforo = (x, l) => `<rect x="${x-6}" y="20" width="12" height="30" rx="3" fill="var(--road)"/><circle cx="${x}" cy="27" r="3" fill="#D94A3A"/><circle cx="${x}" cy="35" r="3" fill="#F2B705"/><circle cx="${x}" cy="43" r="3" fill="#2E9E5B"/><line x1="${x}" y1="50" x2="${x}" y2="62" stroke="var(--road)" stroke-width="3"/><text x="${x}" y="112" text-anchor="middle" class="pt pt-strong">${l}</text>`;
const ESQ_SEMAFOROS = `<figure class="fig"><svg viewBox="0 0 340 124" class="plot" role="img" aria-label="Avenida reta com quatro semáforos, O, A, B e C, separados por 400 metros um do outro. O carro está parado no semáforo O.">
  <rect x="8" y="62" width="324" height="30" rx="5" fill="var(--road)"/>
  <line x1="14" y1="77" x2="326" y2="77" stroke="var(--lane)" stroke-width="3" stroke-dasharray="12 10"/>
  ${semaforo(24,'O')}${semaforo(121,'A')}${semaforo(218,'B')}${semaforo(315,'C')}
  <text x="72" y="58" text-anchor="middle" class="pt">400 m</text><text x="170" y="58" text-anchor="middle" class="pt">400 m</text><text x="266" y="58" text-anchor="middle" class="pt">400 m</text>
  <circle cx="40" cy="77" r="8" fill="var(--sign)" stroke="var(--road-ink)" stroke-width="2"/>
</svg></figure>`;

const TOOLS4 = [
  ['Função horária do espaço', `s = s<sub>0</sub> + v<sub>0</sub> · t + ${f('1','2')} · a · t²`],
  ['Velocidade média no MUV', `v<sub>m</sub> = ${f('v<sub>0</sub> + v','2')} &nbsp;e&nbsp; Δs = v<sub>m</sub> · Δt`],
  ['Equação de Torricelli', `v² = v<sub>0</sub>² + 2 · a · Δs<br>Útil quando o tempo não aparece`],
  ['Partindo do repouso', `Δs = ${f('1','2')} · a · t²<br>Tempo × 2 → distância × 4`],
  ['Tempo de reação', `O carro ainda não freou: velocidade constante<br>d = v · t`],
  ['km/h ⇄ m/s', `km/h <b>÷ 3,6</b> → m/s<br>m/s <b>× 3,6</b> → km/h`],
];

const Q4 = [
{
  src:'Inédita', nivel:'básico',
  text:'A posição de um skatista numa pista reta é dada por s = 5 + 4t + 3t², no SI. A posição inicial, a velocidade inicial e a aceleração do skatista são, respectivamente:',
  opts:['5 m, 4 m/s e 3 m/s²','5 m, 4 m/s e 6 m/s²','4 m, 5 m/s e 6 m/s²','5 m, 3 m/s e 4 m/s²','0 m, 4 m/s e 6 m/s²'], ans:1,
  hint:'Compare termo a termo com s = s₀ + v₀t + ½at². Cuidado: o número na frente do t² é a metade da aceleração.',
  steps:[
    ['Comparando', `<div class="eq">s = s<sub>0</sub> + v<sub>0</sub>t + ${f('1','2')}at²</div><div class="eq">s = <span class="hl">5</span> + <span class="hl">4</span>t + <span class="hl">3</span>t²</div>`],
    ['Os três valores', `<ul><li>s<sub>0</sub> = 5 m</li><li>v<sub>0</sub> = 4 m/s</li><li>${f('1','2')}a = 3 &nbsp;⇒&nbsp; a = 6 m/s²</li></ul>`],
  ],
  alt:'Se a aceleração fosse 3 m/s², o termo seria ½ · 3 · t² = 1,5t². Para aparecer 3t², a aceleração precisa ser o dobro: 6 m/s².',
  warn:'A armadilha é ler a aceleração direto no t² (alternativa a). Esse número é a/2, então a aceleração é o dobro dele.'
},
{
  src:'Inédita', nivel:'básico',
  text:'Um carro aumenta sua velocidade de forma uniforme, de 10 m/s para 30 m/s, em 8 s. Qual distância o carro percorre nesses 8 s?',
  opts:['80 m','160 m','240 m','320 m','20 m'], ans:1,
  hint:'No MUV, a velocidade média é a média entre a velocidade inicial e a final. Depois, distância = velocidade média × tempo.',
  steps:[
    ['Velocidade média', `<div class="eq">v<sub>m</sub> = ${f('v<sub>0</sub> + v','2')} = ${f('10 + 30','2')} = 20 m/s</div>`],
    ['Distância', `<div class="eq">Δs = v<sub>m</sub> · Δt = 20 × 8 = <span class="hl">160 m</span></div>`],
  ],
  alt:'Com a função horária: a = (30 − 10)/8 = 2,5 m/s² e Δs = 10 · 8 + ½ · 2,5 · 8² = 80 + 80 = 160 m. Mesmo resultado.',
  warn:'30 × 8 = 240 m (alternativa c) usa a velocidade final como se o carro tivesse andado a 30 m/s o tempo todo. E 10 × 8 = 80 m (alternativa a) usa só a inicial.'
},
{
  src:'Inédita', nivel:'básico',
  text:'Um corredor parte do repouso com aceleração constante de 2 m/s². Qual distância ele percorre nos primeiros 5 s?',
  opts:['10 m','50 m','25 m','100 m','5 m'], ans:2,
  hint:'Partindo do repouso, v₀ = 0 e a função horária fica Δs = ½ · a · t².',
  steps:[
    ['Função horária', `<div class="eq">Δs = v<sub>0</sub>t + ${f('1','2')}at² = 0 + ${f('1','2')} · 2 · t²</div>`],
    ['Substituindo t = 5 s', `<div class="eq">Δs = ${f('1','2')} · 2 · 5² = 1 · 25 = <span class="hl">25 m</span></div>`],
  ],
  alt:'Em 5 s, a velocidade vai de 0 a 10 m/s (2 × 5). A velocidade média é (0 + 10)/2 = 5 m/s, e 5 m/s × 5 s = 25 m.',
  warn:'Esquecer o ½ dá 2 × 25 = 50 m (alternativa b). E 10 m (alternativa a) é a velocidade em t = 5 s, não a distância.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:`Um carro vinha a 25 m/s quando o motorista freou. A velocidade diminuiu de forma uniforme e o carro parou, deixando 50 m de marcas de pneu no asfalto.${ESQ_FRENAGEM}Qual foi a aceleração do carro durante a frenagem?`,
  opts:['−0,5 m/s²','−2,5 m/s²','−6,25 m/s²','−12,5 m/s²','−625 m/s²'], ans:2,
  hint:'O enunciado não dá o tempo. Use a equação que relaciona velocidades, aceleração e distância: v² = v₀² + 2aΔs.',
  steps:[
    ['Dados', `<ul><li>v<sub>0</sub> = 25 m/s</li><li>v = 0 (o carro para)</li><li>Δs = 50 m</li></ul>`],
    ['Torricelli', `<div class="eq">0² = 25² + 2 · a · 50</div><div class="eq">0 = 625 + 100a</div><div class="eq">a = −${f('625','100')} = <span class="hl">−6,25 m/s²</span></div>`],
    ['Interpretando', `<p>O sinal negativo indica que a aceleração é contrária ao movimento: o carro está freando.</p>`],
  ],
  alt:'Dá para conferir pelo tempo: com a = −6,25 m/s², o carro leva 25 ÷ 6,25 = 4 s para parar. A velocidade média é 12,5 m/s, e 12,5 × 4 = 50 m ✓.',
  warn:'−12,5 m/s² (alternativa d) esquece o 2 da fórmula: 625 ÷ 50. O termo é 2 · a · Δs.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:'Um avião parte do repouso na cabeceira da pista e acelera de forma constante a 2,5 m/s² até atingir a velocidade de decolagem, 70 m/s. Qual é o comprimento mínimo da pista para essa decolagem?',
  opts:['28 m','175 m','1 960 m','980 m','490 m'], ans:3,
  hint:'Você conhece v₀, v e a, e quer a distância. Qual equação não precisa do tempo?',
  steps:[
    ['Dados', `<ul><li>v<sub>0</sub> = 0</li><li>v = 70 m/s</li><li>a = 2,5 m/s²</li></ul>`],
    ['Torricelli', `<div class="eq">70² = 0² + 2 · 2,5 · Δs</div><div class="eq">4 900 = 5 · Δs</div><div class="eq">Δs = <span class="hl">980 m</span></div>`],
  ],
  alt:'Pelo tempo: t = 70 ÷ 2,5 = 28 s. A velocidade média é (0 + 70)/2 = 35 m/s, e 35 × 28 = 980 m.',
  warn:'28 (alternativa a) é o tempo da decolagem em segundos, não a distância. E 1 960 m (alternativa c) esquece o 2 da equação de Torricelli.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:`Uma bola rola a partir do repouso por uma rampa, em movimento uniformemente variado. A tabela mostra a distância percorrida desde o ponto de partida:${TAB_S4}Qual é a aceleração da bola?`,
  opts:['1,5 m/s²','3 m/s²','4,5 m/s²','6 m/s²','24 m/s²'], ans:1,
  hint:'Partindo do repouso, Δs = ½ · a · t². Escolha uma coluna da tabela e isole a aceleração.',
  steps:[
    ['Escolhendo um ponto', `<p>Em t = 2 s, a bola percorreu 6 m.</p>`],
    ['Isolando a', `<div class="eq">6 = ${f('1','2')} · a · 2²</div><div class="eq">6 = 2a &nbsp;⇒&nbsp; <span class="hl">a = 3 m/s²</span></div>`],
    ['Conferindo', `<p>Em t = 4 s: ${f('1','2')} · 3 · 4² = 1,5 · 16 = 24 m ✓</p>`],
  ],
  alt:'Repare que, dobrando o tempo de 1 s para 2 s, a distância vai de 1,5 m para 6 m: fica 4 vezes maior. Isso é a marca do MUV que parte do repouso, Δs proporcional a t².',
  warn:'1,5 m/s² (alternativa a) sai de dividir a distância de 1 s por 1²: falta o ½ da fórmula. Como Δs = ½at², a aceleração é o dobro de Δs/t².'
},
{
  src:'Inédita', nivel:'intermediário',
  text:'Um carrinho parte do repouso em movimento uniformemente variado e percorre 5 m nos primeiros 2 s. Quantos metros ele percorre nos primeiros 6 s de movimento?',
  opts:['15 m','20 m','30 m','90 m','45 m'], ans:4,
  hint:'Partindo do repouso, a distância é proporcional ao quadrado do tempo. Por quanto o tempo foi multiplicado?',
  steps:[
    ['Comparando os tempos', `<p>De 2 s para 6 s, o tempo foi multiplicado por 3.</p>`],
    ['Efeito na distância', `<p>Como Δs = ${f('1','2')}at², a distância é multiplicada por 3² = 9:</p><div class="eq">Δs = 5 × 9 = <span class="hl">45 m</span></div>`],
  ],
  alt:'Pela fórmula: 5 = ½ · a · 2² ⇒ a = 2,5 m/s². Em 6 s: ½ · 2,5 · 36 = 45 m.',
  warn:'15 m (alternativa a) multiplica a distância por 3, como se fosse movimento uniforme. Com aceleração, o carrinho fica cada vez mais rápido e percorre muito mais nos segundos finais.'
},
{
  src:'Inédita', nivel:'avançado',
  text:`Um motorista dirige a 54 km/h quando vê um obstáculo. Ele leva 0,8 s para reagir e pisar no freio. Depois disso, o carro desacelera a 5 m/s² até parar.${ESQ_REACAO}Qual é a distância total percorrida desde que o motorista vê o obstáculo até o carro parar?`,
  opts:['22,5 m','12 m','57 m','34,5 m','45 m'], ans:3,
  hint:'São dois trechos. Durante a reação, o carro ainda não freou (velocidade constante). Depois vem a frenagem, em MUV. Converta 54 km/h para m/s antes.',
  steps:[
    ['Converter', `<div class="eq">54 km/h ÷ 3,6 = 15 m/s</div>`],
    ['Trecho de reação', `<p>Velocidade constante:</p><div class="eq">d<sub>1</sub> = v · t = 15 × 0,8 = 12 m</div>`],
    ['Trecho de frenagem', `<div class="eq">0² = 15² + 2 · (−5) · d<sub>2</sub></div><div class="eq">10 · d<sub>2</sub> = 225 &nbsp;⇒&nbsp; d<sub>2</sub> = 22,5 m</div>`],
    ['Total', `<div class="eq">d = 12 + 22,5 = <span class="hl">34,5 m</span></div>`],
  ],
  alt:'Quase 35% da distância é percorrida antes de o freio ser acionado. Por isso distração e celular ao volante são tão perigosos: a reação mais lenta aumenta só o primeiro trecho, mas ele já é grande.',
  warn:'22,5 m (alternativa a) ignora o tempo de reação: considera que o carro começa a frear no instante em que o motorista vê o obstáculo. E 57 m (alternativa c) esquece o 2 na equação de Torricelli.'
},
{
  src:'Inédita', nivel:'avançado',
  text:`Uma avenida reta tem quatro semáforos, O, A, B e C, separados por 400 m, como no esquema. Um carro parado em O parte quando o sinal abre, com aceleração constante de 2 m/s², até atingir 20 m/s (72 km/h). Daí em diante, segue com velocidade constante.${ESQ_SEMAFOROS}Cada semáforo deve ficar verde quando o carro estiver a 100 m dele. Quanto tempo depois da abertura de O devem abrir A, B e C, respectivamente?`,
  opts:['15 s, 35 s e 55 s','25 s, 45 s e 65 s','20 s, 40 s e 60 s','10 s, 30 s e 50 s','20 s, 30 s e 40 s'], ans:2,
  hint:'Primeiro descubra quanto tempo e quanta distância o carro leva para chegar a 20 m/s. Depois, quanto falta, a velocidade constante, até cada ponto que fica 100 m antes de um semáforo.',
  steps:[
    ['Fase de aceleração', `<div class="eq">t<sub>1</sub> = ${f('20 − 0','2')} = 10 s</div><div class="eq">d<sub>1</sub> = ${f('1','2')} · 2 · 10² = 100 m</div><p>Em t = 10 s, o carro está a 100 m de O, já a 20 m/s.</p>`],
    ['Onde cada sinal deve abrir', `<p>100 m antes de cada semáforo:</p><ul><li>A (em 400 m): ponto em 300 m</li><li>B (em 800 m): ponto em 700 m</li><li>C (em 1 200 m): ponto em 1 100 m</li></ul>`],
    ['Tempos', `<div class="eq">A: 10 + ${f('300 − 100','20')} = 10 + 10 = 20 s</div><div class="eq">B: 10 + ${f('700 − 100','20')} = 10 + 30 = 40 s</div><div class="eq">C: 10 + ${f('1 100 − 100','20')} = 10 + 50 = 60 s</div><p>Resposta: <span class="hl">20 s, 40 s e 60 s</span>.</p>`],
  ],
  alt:'Depois que o carro atinge 20 m/s, ele leva 400 ÷ 20 = 20 s entre um semáforo e o seguinte. Por isso os tempos de A, B e C crescem de 20 em 20 segundos.',
  warn:'15, 35 e 55 s (alternativa a) supõem o carro a 20 m/s desde a partida, ignorando os 10 s de aceleração. E 25, 45 e 65 s (alternativa b) calculam a chegada aos semáforos, e não ao ponto 100 m antes deles.'
},
{
  src:'Inédita', nivel:'avançado',
  text:'Dois motoristas saem de um semáforo acelerando seus carros a 2 m/s². Diante de uma emergência, o motorista atento pisa no freio quando o carro está a 10 m/s. O outro, distraído com o celular, leva 1 s a mais para frear e continua acelerando nesse segundo. Os dois freiam com desaceleração de 5 m/s² até parar. Quantos metros a mais o motorista distraído percorre, desde o instante em que o atento freia até a parada dos dois carros?',
  opts:['4,4 m','11 m','14,4 m','15,4 m','25,4 m'], ans:3,
  hint:'Compare os dois a partir do instante em que o atento freia (os dois estão juntos a 10 m/s). O distraído tem dois trechos: 1 s ainda acelerando e depois a frenagem, que começa com uma velocidade maior.',
  steps:[
    ['Motorista atento', `<div class="eq">0² = 10² − 2 · 5 · d &nbsp;⇒&nbsp; d = ${f('100','10')} = 10 m</div>`],
    ['Distraído: o segundo a mais', `<p>Continua acelerando a 2 m/s² por 1 s, a partir de 10 m/s:</p><div class="eq">d<sub>1</sub> = 10 · 1 + ${f('1','2')} · 2 · 1² = 11 m</div><div class="eq">v = 10 + 2 · 1 = 12 m/s</div>`],
    ['Distraído: frenagem', `<div class="eq">0² = 12² − 2 · 5 · d<sub>2</sub> &nbsp;⇒&nbsp; d<sub>2</sub> = ${f('144','10')} = 14,4 m</div>`],
    ['Diferença', `<div class="eq">(11 + 14,4) − 10 = <span class="hl">15,4 m</span></div>`],
  ],
  alt:'O celular custa duas vezes: o carro anda 11 m antes de começar a frear e ainda chega ao freio mais rápido (12 m/s em vez de 10 m/s), o que aumenta também a distância de frenagem.',
  warn:'25,4 m (alternativa e) é o total percorrido pelo distraído, não a diferença. E 11 m (alternativa b) conta só o segundo de atraso, esquecendo que ele freia a uma velocidade maior.'
},
];
