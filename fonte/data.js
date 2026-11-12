const f = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
const L = ['A','B','C','D','E'];
const TOOLS = [
['Velocidade média', `v<sub>m</sub> = ${f('Δs','Δt')}`],
['Isolando', `Δs = v · Δt<br>Δt = ${f('Δs','v')}`],
['km/h ⇄ m/s', `km/h <b>÷ 3,6</b> → m/s<br>m/s <b>× 3,6</b> → km/h`],
['Tempo e distância', `1 h = 60 min = 3 600 s<br>1 km = 1 000 m`],
['Função horária (MU)', `s = s<sub>0</sub> + v · t`],
];
const Q = [
{
src:'Cesgranrio (adaptada)', nivel:'básico',
text:'Uma pessoa, correndo, percorre 5,0 km com velocidade escalar média de 12 km/h. O tempo do percurso é de:',
opts:['2,4 min','12 min','15 min','25 min','42 min'], ans:3,
hint:'Isole o tempo na fórmula: Δt = Δs ÷ v. Como a velocidade está em km/h, o resultado sai em horas.',
steps:[
['Dados', `<ul><li>Distância: Δs = 5,0 km</li><li>Velocidade: v = 12 km/h</li><li>Pede-se: Δt (as alternativas estão em minutos)</li></ul>`],
['Isolar o tempo', `<div class="eq">v = ${f('Δs','Δt')} &nbsp;⇒&nbsp; Δt = ${f('Δs','v')}</div><div class="eq">Δt = ${f('5,0 km','12 km/h')} = ${f('5','12')} h</div>`],
['Passar de horas para minutos', `<div class="eq">${f('5','12')} h = ${f('5','12')} × 60 min = <span class="hl">25 min</span></div>`],
],
alt:'A 12 km/h, a pessoa anda 12 km em 60 min, ou seja, 1 km a cada 5 min. Para 5 km: 5 × 5 = 25 min.',
warn:'5 ÷ 12 ≈ 0,42 h, mas 0,42 h <b>não</b> é 42 min! Uma hora tem 60 minutos, não 100. Quem marca e) caiu nessa armadilha.'
},
{
src:'Unicamp (adaptada)', nivel:'básico',
text:'Drones são veículos voadores não tripulados, controlados remotamente e guiados por GPS. Uma de suas potenciais aplicações é reduzir o tempo da prestação de primeiros socorros, levando pequenos equipamentos e instruções ao local do socorro, para que qualquer pessoa administre os primeiros cuidados até a chegada de uma ambulância. Considere um caso em que o drone ambulância se deslocou 12 km em 8 minutos. Nesse caso, o módulo de sua velocidade média é de aproximadamente:',
opts:['1,5 m/s','15 m/s','25 m/s','90 m/s'], ans:2,
hint:'As alternativas estão em m/s. Passe a distância para metros e o tempo para segundos.',
steps:[
['Dados', `<ul><li>Distância: Δs = 12 km</li><li>Tempo: Δt = 8 min</li><li>Pede-se: v<sub>m</sub> em <b>m/s</b></li></ul>`],
['Converter para o SI', `<div class="eq">12 km = 12 × 1 000 = 12 000 m</div>
<div class="eq">8 min = 8 × 60 = 480 s</div>`],
['Aplicar a fórmula', `<div class="eq">v<sub>m</sub> = ${f('12 000 m','480 s')} = <span class="hl">25 m/s</span></div>`],
],
alt:'Confira se o resultado faz sentido: 25 m/s × 3,6 = 90 km/h. É uma velocidade razoável para um drone (mais ou menos a de um carro na estrada).',
warn:'12 ÷ 8 = 1,5 dá a velocidade em km por minuto, não em m/s (alternativa a). E 90 é a velocidade em km/h, não em m/s (alternativa d). Sempre confira as unidades.'
},
{
src:'Fuvest (adaptada)', nivel:'básico',
text:'Após chover na cidade de São Paulo, as águas da chuva descerão o rio Tietê até o rio Paraná, percorrendo cerca de 1 000 km. Sendo de 2 km/h a velocidade média das águas, o percurso mencionado será cumprido pelas águas da chuva em aproximadamente:',
opts:['5 dias','10 dias','21 dias','42 dias','500 dias'], ans:2,
hint:'Calcule o tempo em horas. Depois lembre que um dia tem 24 horas.',
steps:[
['Dados', `<ul><li>Distância: Δs = 1 000 km</li><li>Velocidade média: v = 2 km/h</li><li>Pede-se: tempo em <b>dias</b></li></ul>`],
['Calcular o tempo em horas', `<div class="eq">Δt = ${f('Δs','v')} = ${f('1 000 km','2 km/h')} = 500 h</div>`],
['Passar de horas para dias', `<div class="eq">${f('500 h','24 h/dia')} ≈ 20,8 dias ≈ <span class="hl">21 dias</span></div>
<p>A questão pede “aproximadamente”, então 21 dias é a alternativa mais próxima.</p>`],
],
alt:'Em um dia as águas andam 2 km/h × 24 h = 48 km, quase 50 km. Para 1 000 km, são cerca de 20 dias.',
warn:'Não pare no 500! O resultado da fórmula sai em horas, e as alternativas estão em dias. Quem marca e) esqueceu de converter.'
},
{
src:'FCC (adaptada)', nivel:'intermediário',
text:'Qual é a velocidade escalar média, em km/h, de uma pessoa que percorre, a pé, 1 500 m em 15 min?',
opts:['1,5','3,6','4,5','5,4','6,0'], ans:4,
hint:'A resposta é pedida em km/h. Passe a distância para quilômetros e o tempo para horas antes de dividir.',
steps:[
['Dados', `<ul><li>Distância: Δs = 1 500 m</li><li>Tempo: Δt = 15 min</li><li>Pede-se: v<sub>m</sub> em <b>km/h</b></li></ul>`],
['Converter as unidades', `<p>Como a resposta é em km/h, a distância vai para km e o tempo para horas:</p>
<div class="eq">1 500 m = 1,5 km &nbsp;&nbsp;(÷ 1 000)</div>
<div class="eq">15 min = ${f('15','60')} h = ${f('1','4')} h</div>`],
['Aplicar a fórmula', `<div class="eq">v<sub>m</sub> = ${f('Δs','Δt')} = ${f('1,5 km',f('1','4')+' h')}</div><div class="eq">v<sub>m</sub> = 1,5 × 4 = <span class="hl">6,0 km/h</span></div>
<p>Dividir por ¼ é o mesmo que multiplicar por 4.</p>`],
],
alt:`Repare que 15 min = 15 × 60 = 900 s. Então v = ${f('1 500 m','900 s')} ≈ 1,67 m/s. Convertendo: 1,67 × 3,6 ≈ 6,0 km/h.`,
warn:'Não divida 1 500 por 15 direto: isso dá 100 metros por minuto, que não é km/h. E 1,5 (alternativa a) é a distância em km, não a velocidade. Converta as unidades primeiro.'
},
{
src:'Unitau (adaptada)', nivel:'intermediário',
text:'Um carro mantém uma velocidade escalar constante de 90,0 km/h. Em uma hora e vinte minutos ele percorre, em quilômetros, a distância de:',
opts:['108','120','125','130','135'], ans:1,
hint:'Cuidado: 1 h 20 min não é 1,20 h. Que fração da hora são 20 minutos?',
steps:[
['Dados', `<ul><li>Velocidade constante: v = 90 km/h</li><li>Tempo: Δt = 1 h 20 min</li><li>Pede-se: Δs em km</li></ul>`],
['Separar o tempo em partes', `<p>Em 1 hora inteira o carro anda 90 km.</p>
<p>20 min é ${f('20','60')} = ${f('1','3')} de hora. Nesse tempo ele anda:</p>
<div class="eq">90 × ${f('1','3')} = 30 km</div>`],
['Somar', `<div class="eq">Δs = 90 km + 30 km = <span class="hl">120 km</span></div>`],
],
alt:`Pela fórmula: Δt = 1 + ${f('1','3')} = ${f('4','3')} h. Então Δs = v · Δt = 90 × ${f('4','3')} = ${f('360','3')} = 120 km.`,
warn:'Se você fez 90 × 1,20 = 108 (alternativa a), tratou 20 minutos como 0,20 h. Mas 20 min = 0,333… h.'
},
{
src:'FGV (adaptada)', nivel:'intermediário',
text:'Numa corrida de Fórmula 1, a volta mais rápida foi feita em 1 min e 30 s a uma velocidade média de 216 km/h. Pode-se afirmar que o comprimento da pista, em metros, é de:',
opts:['216','1 800','3 240','19 440','5 400'], ans:4,
hint:'A resposta é em metros. Converta 216 km/h para m/s e escreva o tempo todo em segundos.',
steps:[
['Dados', `<ul><li>Tempo da volta: Δt = 1 min 30 s</li><li>Velocidade média: v = 216 km/h</li><li>Pede-se: comprimento da pista (Δs) em metros</li></ul>`],
['Converter as unidades', `<div class="eq">Δt = 60 s + 30 s = 90 s</div>
<div class="eq">v = 216 km/h ÷ 3,6 = 60 m/s</div>`],
['Calcular a distância', `<div class="eq">Δs = v · Δt</div><div class="eq">Δs = 60 m/s × 90 s = <span class="hl">5 400 m</span></div>`],
],
alt:`216 km/h significa 216 km em 60 min, ou seja, 3,6 km por minuto. Como 90 s = 1,5 min, a distância é 3,6 × 1,5 = 5,4 km = 5 400 m.`,
warn:'216 × 90 = 19 440 (alternativa d) mistura km/h com segundos. Velocidade e tempo precisam estar em unidades que combinam.'
},
{
src:'UFPE (adaptada)', nivel:'intermediário',
text:'Um automóvel se desloca numa estrada retilínea sempre no mesmo sentido. Inicialmente, ele percorre um trecho de comprimento 360 km em 5 horas. O motorista para durante uma hora e, em seguida, percorre mais 180 km em 3 horas. A velocidade média em todo o percurso, em km/h, é igual a:',
opts:['54','60','66','67,5','72'], ans:1,
hint:'Velocidade média = distância total ÷ tempo total. O relógio continua correndo durante a parada.',
steps:[
['Dados', `<ul><li>Trecho 1: 360 km em 5 h</li><li>Parada: 1 h (anda 0 km)</li><li>Trecho 2: 180 km em 3 h</li></ul>`],
['Somar distâncias e tempos', `<div class="eq">Δs<sub>total</sub> = 360 + 0 + 180 = 540 km</div>
<div class="eq">Δt<sub>total</sub> = 5 + 1 + 3 = 9 h</div>`],
['Aplicar a fórmula', `<div class="eq">v<sub>m</sub> = ${f('540 km','9 h')} = <span class="hl">60 km/h</span></div>`],
],
alt:'Pense na viagem inteira como um único bloco: do momento em que o carro saiu até o momento em que chegou passaram 9 h, e ele avançou 540 km. A parada faz parte da viagem.',
warn:'Velocidade média não é a média das velocidades dos trechos. O trecho 1 teve 72 km/h e o trecho 2, 60 km/h, mas a resposta não é a média desses números (66, alternativa c). Esquecer a parada também leva a erro: 540 ÷ 8 = 67,5 km/h (alternativa d).'
},
{
src:'PUC-MG (adaptada)', nivel:'avançado',
text:'Um homem, caminhando na praia, deseja calcular sua velocidade. Para isso, ele conta o número de passadas que dá em um minuto, contando uma unidade a cada vez que o pé direito toca o solo, e conclui que são 60 passadas por minuto. A seguir, ele mede a distância entre duas posições sucessivas do seu pé direito e encontra o equivalente a quatro pés e meio. Sabendo que três pés correspondem a um metro, sua velocidade, suposta constante, é:',
opts:['5,4 km/h','6 km/h','7,2 km/h','9 km/h','10,8 km/h'], ans:0,
hint:'Descubra quantos metros tem uma passada. Depois, quantos metros ele anda em 1 minuto e em 1 hora.',
steps:[
['Tamanho de uma passada', `<p>“Pé” aqui é uma unidade de medida. Se 3 pés = 1 m, então:</p>
<div class="eq">4,5 pés = 1,5 × 3 pés = 1,5 m</div>
<p>Cada passada (de um apoio do pé direito até o próximo) mede 1,5 m.</p>`],
['Distância em 1 minuto', `<div class="eq">60 × 1,5 m = 90 m por minuto</div>`],
['Distância em 1 hora', `<div class="eq">90 m × 60 min = 5 400 m = 5,4 km</div>
<p>Ele anda 5,4 km a cada hora, ou seja, <span class="hl">5,4 km/h</span>.</p>`],
],
alt:`Em m/s: 90 m por minuto = ${f('90 m','60 s')} = 1,5 m/s. Multiplicando por 3,6: 1,5 × 3,6 = 5,4 km/h.`,
warn:'O enunciado mede a passada em “pés”. Troque para metros antes de fazer qualquer conta, senão a velocidade sai numa unidade estranha.'
},
{
src:'UFRGS (adaptada)', nivel:'avançado',
text:'Em grandes aeroportos e shoppings, existem esteiras móveis horizontais para facilitar o deslocamento de pessoas. Considere uma esteira com 60 m de comprimento e velocidade de 0,8 m/s. Uma pessoa ingressa na esteira e segue caminhando sobre ela com velocidade constante no mesmo sentido de movimento da esteira. A pessoa atinge a outra extremidade 40 s após ter ingressado na esteira. Com que velocidade, em m/s, a pessoa caminha sobre a esteira?',
opts:['2,3','1,5','0,8','0,7','0,5'], ans:3,
hint:'Primeiro calcule a velocidade da pessoa vista por alguém parado no chão. Uma parte dessa velocidade vem da esteira.',
steps:[
['Dados', `<ul><li>Comprimento da esteira: 60 m</li><li>Velocidade da esteira: 0,8 m/s</li><li>Tempo para atravessar: 40 s</li><li>Pede-se: a velocidade com que a pessoa <b>caminha sobre</b> a esteira</li></ul>`],
['Velocidade vista de fora', `<p>Para alguém parado no chão, a pessoa percorreu 60 m em 40 s:</p>
<div class="eq">v<sub>total</sub> = ${f('60 m','40 s')} = 1,5 m/s</div>`],
['Descontar a ajuda da esteira', `<p>Como a pessoa anda no mesmo sentido da esteira, as velocidades se somam:</p>
<div class="eq">v<sub>total</sub> = v<sub>esteira</sub> + v<sub>pessoa</sub></div>
<div class="eq">1,5 = 0,8 + v<sub>pessoa</sub></div><div class="eq">v<sub>pessoa</sub> = 1,5 − 0,8 = <span class="hl">0,7 m/s</span></div>`],
],
alt:'Tire a prova: em 40 s, a esteira leva a pessoa 0,8 × 40 = 32 m, e as próprias pernas dela a levam 0,7 × 40 = 28 m. Total: 32 + 28 = 60 m, exatamente o comprimento da esteira.',
warn:'1,5 m/s (alternativa b) é a velocidade em relação ao chão, mas a pergunta é sobre a velocidade da pessoa caminhando sobre a esteira. E 2,3 m/s (alternativa a) soma a esteira em vez de descontar.'
},
{
src:'Fuvest (adaptada)', nivel:'avançado',
text:'Um automóvel que se desloca com uma velocidade escalar constante de 90 km/h ultrapassa outro que se desloca com uma velocidade escalar constante de 72 km/h numa mesma estrada reta. O primeiro encontra-se 150 m atrás do segundo no instante t = 0. O primeiro estará ao lado do segundo no instante:',
opts:['t = 10 s','t = 20 s','t = 30 s','t = 40 s','t = 50 s'], ans:2,
hint:'Passe as velocidades para m/s. A cada segundo, quantos metros o carro de trás “tira” da distância de 150 m?',
steps:[
['Converter para m/s', `<p>Carro 1 (atrás) e carro 2 (à frente):</p><div class="eq">v<sub>1</sub> = 90 ÷ 3,6 = 25 m/s</div>
<div class="eq">v<sub>2</sub> = 72 ÷ 3,6 = 20 m/s</div>`],
['Quanto a distância diminui por segundo', `<p>A cada segundo, o carro 1 anda 25 m e o carro 2 anda 20 m. A distância entre eles diminui:</p>
<div class="eq">25 − 20 = 5 m a cada segundo</div>`],
['Tempo para zerar os 150 m', `<div class="eq">t = ${f('150 m','5 m/s')} = <span class="hl">30 s</span></div>
<p>Veja na tabela como a distância cai de 5 em 5 metros por segundo:</p>
<div class="tblwrap"><table>
<tr><th>t (s)</th><th>0</th><th>10</th><th>20</th><th>30</th></tr>
<tr><th>Carro 1 (m)</th><td>0</td><td>250</td><td>500</td><td class="meet">750</td></tr>
<tr><th>Carro 2 (m)</th><td>150</td><td>350</td><td>550</td><td class="meet">750</td></tr>
<tr><th>Distância (m)</th><td>150</td><td>100</td><td>50</td><td class="meet">0</td></tr>
</table></div>`],
],
alt:`Com a função horária do MU (s = s<sub>0</sub> + v·t), colocando a origem no carro 1:<br>
s<sub>1</sub> = 0 + 25t &nbsp;e&nbsp; s<sub>2</sub> = 150 + 20t.<br>
Eles ficam lado a lado quando s<sub>1</sub> = s<sub>2</sub>: 25t = 150 + 20t ⇒ 5t = 150 ⇒ t = 30 s.`,
warn:'Não misture unidades: a distância está em metros e as velocidades em km/h. Converta para m/s antes de calcular.'
},
];
