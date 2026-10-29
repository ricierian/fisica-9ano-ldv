/* ===== Lista 3 · MUV: aceleração e função horária da velocidade ===== */

const TAB_V3 = `<div class="tblwrap"><table>
<tr><th>t (s)</th><td>0</td><td>2</td><td>4</td><td>6</td></tr>
<tr><th>v (m/s)</th><td>5</td><td>11</td><td>17</td><td>23</td></tr>
</table></div>`;

const TAB_TRECHOS3 = `<div class="tblwrap"><table>
<tr><th>t (s)</th><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td></tr>
<tr><th>v (m/s)</th><td>4</td><td>10</td><td>16</td><td>16</td><td>10</td><td>4</td></tr>
</table></div>`;

const TAB_ELEVADOR = `<div class="tblwrap"><table>
<tr><th>Trecho</th><th>Velocidade</th><th>Duração</th></tr>
<tr><td>1 · partida</td><td>de 0 a 3 m/s</td><td>4 s</td></tr>
<tr><td>2 · subida</td><td>3 m/s constante</td><td>20 s</td></tr>
<tr><td>3 · chegada</td><td>de 3 m/s a 0</td><td>2 s</td></tr>
</table></div>`;

const carro = (x, y, cor, op) => `<g opacity="${op || 1}"><rect x="${x-20}" y="${y-11}" width="40" height="15" rx="5" fill="${cor}" stroke="var(--road-ink)" stroke-width="1.5"/><rect x="${x-10}" y="${y-19}" width="20" height="10" rx="3" fill="${cor}" stroke="var(--road-ink)" stroke-width="1.5"/><circle cx="${x-11}" cy="${y+5}" r="4.5" fill="var(--road-ink)"/><circle cx="${x+11}" cy="${y+5}" r="4.5" fill="var(--road-ink)"/></g>`;

const ESQ_SENTIDO = `<figure class="fig"><svg viewBox="0 0 340 150" class="plot" role="img" aria-label="Estrada reta com o sentido positivo da trajetória para a direita. No instante zero o carro está à direita com velocidade de menos 20 metros por segundo; no instante 4 segundos está mais à esquerda com velocidade de menos 12 metros por segundo. O carro anda para a esquerda.">
  <text x="255" y="18" text-anchor="middle" class="pt pt-strong">t = 0 · v = −20 m/s</text>
  <text x="100" y="18" text-anchor="middle" class="pt pt-strong">t = 4 s · v = −12 m/s</text>
  <path d="M232 34 H176" stroke="var(--ink)" stroke-width="2"/><path d="M176 29 L166 34 L176 39 Z" fill="var(--ink)"/>
  <rect x="8" y="58" width="324" height="34" rx="5" fill="var(--road)"/>
  <line x1="14" y1="75" x2="326" y2="75" stroke="var(--lane)" stroke-width="3" stroke-dasharray="12 10"/>
  ${carro(255, 70, 'var(--sign)')}${carro(100, 70, 'var(--sign)', .55)}
  <path d="M40 118 H290" stroke="var(--muted)" stroke-width="1.5"/><path d="M290 113 L300 118 L290 123 Z" fill="var(--muted)"/>
  <text x="170" y="140" text-anchor="middle" class="pt">sentido positivo da trajetória</text>
</svg></figure>`;

const TOOLS3 = [
  ['Aceleração média', `a = ${f('Δv','Δt')} = ${f('v − v<sub>0</sub>','t − t<sub>0</sub>')}`],
  ['Função horária da velocidade', `v = v<sub>0</sub> + a · t`],
  ['O que significa m/s²', `a = 3 m/s²: a velocidade muda 3 m/s a cada segundo`],
  ['Acelerado ou retardado', `v e a com o <b>mesmo sinal</b>: acelerado<br>v e a com <b>sinais opostos</b>: retardado`],
  ['km/h ⇄ m/s', `km/h <b>÷ 3,6</b> → m/s<br>m/s <b>× 3,6</b> → km/h`],
];

const Q3 = [
{
  src:'Inédita', nivel:'básico',
  text:'Uma moto está parada num semáforo. Quando o sinal abre, ela parte e atinge a velocidade de 20 m/s em 5 s, com aceleração constante. Qual é a aceleração da moto?',
  opts:['0,25 m/s²','4 m/s²','15 m/s²','25 m/s²','100 m/s²'], ans:1,
  hint:'Aceleração é quanto a velocidade muda dividido pelo tempo que levou. Parada significa v₀ = 0.',
  steps:[
    ['Dados', `<ul><li>v<sub>0</sub> = 0 (parada no semáforo)</li><li>v = 20 m/s</li><li>Δt = 5 s</li></ul>`],
    ['Aceleração', `<div class="eq">a = ${f('Δv','Δt')} = ${f('20 − 0','5')} = <span class="hl">4 m/s²</span></div>`],
  ],
  alt:'4 m/s² quer dizer que a moto ganha 4 m/s a cada segundo: 4, 8, 12, 16 e 20 m/s ao fim do 5º segundo. Confere.',
  warn:'5 ÷ 20 = 0,25 (alternativa a) inverte a conta. Aceleração é variação de velocidade sobre tempo, nunca o contrário. E 20 × 5 = 100 (alternativa e) não tem significado aqui.'
},
{
  src:'Inédita', nivel:'básico',
  text:`Um ciclista desce uma ladeira e sua velocidade foi medida a cada 2 segundos:${TAB_V3}Qual é a aceleração do ciclista?`,
  opts:['2 m/s²','6 m/s²','23 m/s²','3 m/s²','11,5 m/s²'], ans:3,
  hint:'Veja quanto a velocidade aumenta entre duas medidas seguidas e em quanto tempo isso acontece.',
  steps:[
    ['Lendo a tabela', `<p>A cada 2 s, a velocidade aumenta 6 m/s: 5 → 11 → 17 → 23.</p>`],
    ['Aceleração', `<div class="eq">a = ${f('Δv','Δt')} = ${f('6 m/s','2 s')} = <span class="hl">3 m/s²</span></div><p>Usando o trecho todo dá o mesmo: ${f('23 − 5','6 − 0')} = ${f('18','6')} = 3 m/s².</p>`],
    ['É MUV?', `<p>Sim. A velocidade muda sempre a mesma quantidade em intervalos de tempo iguais, então a aceleração é constante.</p>`],
  ],
  alt:'Se a cada 2 s o ciclista ganha 6 m/s, a cada 1 s ele ganha metade disso: 3 m/s. É exatamente o que 3 m/s² significa.',
  warn:'6 m/s² (alternativa b) é o aumento de velocidade em 2 s, não em 1 s. Falta dividir pelo tempo.'
},
{
  src:'Inédita', nivel:'básico',
  text:'A velocidade de um patinete elétrico em uma ciclovia reta é dada pela função v = 8 + 2t, com v em m/s e t em segundos. Qual é a velocidade do patinete no instante t = 5 s?',
  opts:['10 m/s','15 m/s','18 m/s','50 m/s','80 m/s'], ans:2,
  hint:'Substitua t = 5 na função. Lembre que a multiplicação vem antes da soma.',
  steps:[
    ['Comparando com a função geral', `<div class="eq">v = v<sub>0</sub> + a · t</div><div class="eq">v = <span class="hl">8</span> + <span class="hl">2</span>t</div><p>v<sub>0</sub> = 8 m/s e a = 2 m/s².</p>`],
    ['Substituindo', `<div class="eq">v = 8 + 2 · 5 = 8 + 10 = <span class="hl">18 m/s</span></div>`],
  ],
  alt:'O patinete começa a 8 m/s e ganha 2 m/s a cada segundo. Em 5 s ganha 10 m/s: 8 + 10 = 18 m/s.',
  warn:'(8 + 2) × 5 = 50 (alternativa d) faz a soma antes da multiplicação. Na função, o 2 multiplica só o t.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:'Um trem de metrô parte do repouso numa estação e atinge 72 km/h em 25 s, com aceleração constante. Qual é a aceleração do trem, no SI?',
  opts:['0,8 m/s²','1,25 m/s²','2,88 m/s²','3,6 m/s²','20 m/s²'], ans:0,
  hint:'"No SI" pede m/s². Antes de dividir, transforme 72 km/h em m/s.',
  steps:[
    ['Converter a velocidade', `<div class="eq">72 km/h ÷ 3,6 = 20 m/s</div>`],
    ['Aceleração', `<div class="eq">a = ${f('Δv','Δt')} = ${f('20 − 0','25')} = <span class="hl">0,8 m/s²</span></div>`],
  ],
  alt:'0,8 m/s² é uma aceleração suave, como deve ser num metrô com passageiros em pé: a velocidade aumenta menos de 1 m/s a cada segundo.',
  warn:'72 ÷ 25 = 2,88 (alternativa c) mistura km/h com segundos. A unidade fica sem sentido. Converta a velocidade para m/s primeiro.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:'Um carro trafega a 108 km/h numa rodovia reta quando o motorista freia. A velocidade diminui de forma uniforme e o carro para em 6 s. Adotando como positivo o sentido do movimento, qual é a aceleração do carro durante a frenagem?',
  opts:['−18 m/s²','−5 m/s²','+5 m/s²','−0,2 m/s²','+18 m/s²'], ans:1,
  hint:'Converta 108 km/h para m/s. O carro para: qual é a velocidade final? Atenção ao sinal da variação.',
  steps:[
    ['Dados', `<ul><li>v<sub>0</sub> = 108 ÷ 3,6 = 30 m/s</li><li>v = 0 (o carro para)</li><li>Δt = 6 s</li></ul>`],
    ['Aceleração', `<div class="eq">a = ${f('v − v<sub>0</sub>','Δt')} = ${f('0 − 30','6')} = <span class="hl">−5 m/s²</span></div>`],
    ['Interpretando', `<p>A velocidade é positiva e a aceleração é negativa: sinais opostos, movimento <b>retardado</b>. O carro perde 5 m/s a cada segundo.</p>`],
  ],
  alt:'Em 6 s o carro perde 30 m/s de velocidade: 30 ÷ 6 = 5 m/s a cada segundo. Como ele está perdendo velocidade, o sinal é negativo.',
  warn:'+5 m/s² (alternativa c) tem o valor certo, mas o sinal errado: v − v₀ = 0 − 30 é negativo. E −18 (alternativa a) divide 108 km/h por 6 s sem converter.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:`O esquema mostra um carro numa estrada reta, em dois instantes. O sentido positivo da trajetória é para a direita, e o carro anda para a esquerda.${ESQ_SENTIDO}Sobre a aceleração do carro entre t = 0 e t = 4 s, é correto afirmar:`,
  opts:['a = −2 m/s² e o movimento é acelerado','a = +2 m/s² e o movimento é retardado','a = +8 m/s² e o movimento é retardado','a = −8 m/s² e o movimento é acelerado','a = +2 m/s² e o movimento é acelerado'], ans:1,
  hint:'Use a = (v − v₀)/Δt com os sinais. Depois compare o sinal de v com o de a.',
  steps:[
    ['Aceleração', `<div class="eq">a = ${f('v − v<sub>0</sub>','Δt')} = ${f('−12 − (−20)','4')}</div><div class="eq">a = ${f('−12 + 20','4')} = ${f('8','4')} = <span class="hl">+2 m/s²</span></div>`],
    ['Classificando', `<p>v é negativa (o carro anda para a esquerda) e a é positiva: <b>sinais opostos</b>, então o movimento é <b>retardado</b>.</p><p>Faz sentido: o valor da velocidade caiu de 20 m/s para 12 m/s. O carro está freando.</p>`],
  ],
  alt:'Esqueça os sinais por um instante: o carro andava a 20 m/s e passou a 12 m/s. Ele está mais devagar, então o movimento é retardado. O sinal + da aceleração só diz que ela aponta para a direita, contra o movimento.',
  warn:'Aceleração positiva não significa "acelerando". O que decide é comparar com o sinal da velocidade. A alternativa e tem o valor certo, mas a classificação errada.'
},
{
  src:'Inédita', nivel:'intermediário',
  text:`Um carro percorre um trecho reto e sua velocidade foi registrada a cada 3 segundos:${TAB_TRECHOS3}Assinale a afirmação correta sobre esse movimento.`,
  opts:['De 6 s a 9 s, o carro está parado.','De 9 s a 15 s, a aceleração é +2 m/s².','De 9 s a 15 s, o movimento é acelerado.','A aceleração é a mesma do início ao fim.','De 0 a 6 s, a aceleração é 2 m/s².'], ans:4,
  hint:'Divida a tabela em três trechos: quando a velocidade sobe, quando fica igual e quando desce. Calcule a aceleração de cada um.',
  steps:[
    ['Trecho de 0 a 6 s', `<div class="eq">a = ${f('16 − 4','6 − 0')} = ${f('12','6')} = 2 m/s²</div><p>A velocidade aumenta: movimento acelerado.</p>`],
    ['Trecho de 6 s a 9 s', `<p>A velocidade fica em 16 m/s: a = 0. O carro <b>não</b> está parado, está em movimento uniforme.</p>`],
    ['Trecho de 9 s a 15 s', `<div class="eq">a = ${f('4 − 16','15 − 9')} = ${f('−12','6')} = −2 m/s²</div><p>A velocidade diminui: movimento retardado.</p>`],
    ['Conclusão', `<p>Só a alternativa e está correta: <span class="hl">de 0 a 6 s, a = 2 m/s²</span>.</p>`],
  ],
  alt:'Leia a tabela como uma história: o carro ganha velocidade, mantém 16 m/s por um tempo e depois perde velocidade no mesmo ritmo em que ganhou.',
  warn:'Aceleração zero não quer dizer parado (alternativa a). Quer dizer velocidade constante: o carro seguia a 16 m/s.'
},
{
  src:'Inédita', nivel:'avançado',
  text:'Um foguete parte do repouso e sobe com aceleração média de 8 m/s² até atingir a velocidade de 12 km/s, quando os motores desligam. Quanto tempo, em minutos, o foguete leva para atingir essa velocidade?',
  opts:['1,5 min','25 min','90 min','150 min','1 500 min'], ans:1,
  hint:'Há duas conversões: a velocidade está em km/s (passe para m/s) e a resposta é pedida em minutos (o cálculo vai dar segundos).',
  steps:[
    ['Converter a velocidade', `<div class="eq">12 km/s = 12 000 m/s</div><p>1 km tem 1 000 m. Aqui não se usa 3,6, porque o tempo já está em segundos.</p>`],
    ['Tempo em segundos', `<div class="eq">v = v<sub>0</sub> + a · t</div><div class="eq">12 000 = 0 + 8 · t</div><div class="eq">t = ${f('12 000','8')} = 1 500 s</div>`],
    ['Tempo em minutos', `<div class="eq">t = ${f('1 500','60')} = <span class="hl">25 min</span></div>`],
  ],
  alt:'A 8 m/s², o foguete ganha 480 m/s por minuto (8 × 60). Para chegar a 12 000 m/s: 12 000 ÷ 480 = 25 minutos.',
  warn:'12 ÷ 8 = 1,5 (alternativa a) esquece de converter km/s em m/s. E 1 500 (alternativa e) é o tempo em segundos, não em minutos.'
},
{
  src:'Inédita', nivel:'avançado',
  text:'Um carrinho é lançado para cima numa rampa reta e perde velocidade de forma constante. Tomando como positivo o sentido de subida, a velocidade do carrinho é v = 24 − 3t, no SI. Assinale a afirmação correta.',
  opts:['O carrinho para no instante t = 8 s.','Em t = 4 s, o movimento é acelerado.','Em t = 10 s, a velocidade é +6 m/s.','A aceleração do carrinho é +3 m/s².','Em t = 10 s, o movimento é retardado.'], ans:0,
  hint:'Identifique v₀ e a, com os sinais. Para cada instante citado, calcule v e compare o sinal de v com o sinal de a.',
  steps:[
    ['Identificando', `<div class="eq">v = <span class="hl">24</span> − <span class="hl">3</span>t</div><p>v<sub>0</sub> = 24 m/s e a = −3 m/s².</p>`],
    ['Quando para', `<div class="eq">0 = 24 − 3t &nbsp;⇒&nbsp; t = 8 s</div><p>A alternativa a está correta.</p>`],
    ['Conferindo as outras', `<ul>
      <li><b>b)</b> Falsa. Em t = 4 s, v = 24 − 12 = +12 m/s e a = −3 m/s²: sinais opostos, retardado.</li>
      <li><b>c)</b> Falsa. Em t = 10 s, v = 24 − 30 = −6 m/s.</li>
      <li><b>d)</b> Falsa. a = −3 m/s².</li>
      <li><b>e)</b> Falsa. Em t = 10 s, v = −6 m/s e a = −3 m/s²: mesmo sinal, acelerado.</li></ul>`],
  ],
  alt:'Pense no carrinho de verdade: ele sobe perdendo velocidade, para no alto em t = 8 s e depois desce a rampa cada vez mais rápido. Descendo e ganhando velocidade, o movimento é acelerado.',
  warn:'Depois de t = 8 s a velocidade fica negativa, porque o carrinho passa a descer. Quem esquece isso marca a alternativa c (+6 m/s) ou a e (retardado).'
},
{
  src:'Inédita', nivel:'avançado',
  text:`Um elevador sobe de um andar a outro em três trechos, descritos na tabela. Nos trechos 1 e 3 a aceleração é constante.${TAB_ELEVADOR}Adotando como positivo o sentido de subida, as acelerações do elevador nos trechos 1 e 3 são, respectivamente:`,
  opts:['+1,33 m/s² e −0,67 m/s²','+12 m/s² e −6 m/s²','+0,75 m/s² e +1,5 m/s²','+0,75 m/s² e −1,5 m/s²','−0,75 m/s² e +1,5 m/s²'], ans:3,
  hint:'Calcule a = Δv/Δt separadamente para o trecho 1 e para o trecho 3. Em cada um, a velocidade aumenta ou diminui?',
  steps:[
    ['Trecho 1 (partida)', `<div class="eq">a<sub>1</sub> = ${f('3 − 0','4')} = +0,75 m/s²</div><p>A velocidade aumenta: a aceleração tem o mesmo sinal do movimento.</p>`],
    ['Trecho 3 (chegada)', `<div class="eq">a<sub>3</sub> = ${f('0 − 3','2')} = −1,5 m/s²</div><p>A velocidade diminui: a aceleração é contrária ao movimento.</p>`],
    ['Resposta', `<p><span class="hl">+0,75 m/s² e −1,5 m/s²</span>. O trecho 2 não entra na conta: nele a velocidade é constante e a = 0.</p>`],
  ],
  alt:'Na chegada, o elevador perde os mesmos 3 m/s que ganhou na partida, mas em metade do tempo. Por isso a aceleração da chegada tem o dobro do valor (1,5 contra 0,75), com sinal contrário.',
  warn:'+1,33 e −0,67 (alternativa a) vêm de dividir tempo por velocidade (4 ÷ 3 e 2 ÷ 3). A ordem é sempre Δv dividido por Δt.'
},
];
