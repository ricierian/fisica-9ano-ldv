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
src:'Cesgranrio', nivel:'básico',
text:'Uma pessoa, correndo, percorre 4,0 km com velocidade escalar média de 12 km/h. O tempo do percurso é de:',
opts:['3,0 min','8,0 min','20 min','30 min','33 min'], ans:2,
hint:'Isole o tempo na fórmula: Δt = Δs ÷ v. Como a velocidade está em km/h, o resultado sai em horas.',
steps:[
['Dados', `<ul><li>Distância: Δs = 4,0 km</li><li>Velocidade: v = 12 km/h</li><li>Pede-se: Δt (as alternativas estão em minutos)</li></ul>`],
['Isolar o tempo', `<div class="eq">v = ${f('Δs','Δt')} &nbsp;⇒&nbsp; Δt = ${f('Δs','v')} = ${f('4,0 km','12 km/h')} = ${f('1','3')} h</div>`],
['Passar de horas para minutos', `<div class="eq">${f('1','3')} h = ${f('1','3')} × 60 min = <span class="hl">20 min</span></div>`],
],
alt:'A 12 km/h, a pessoa anda 12 km em 60 min, ou seja, 1 km a cada 5 min. Para 4 km: 4 × 5 = 20 min.',
warn:'⅓ h ≈ 0,33 h, mas 0,33 h <b>não</b> é 33 min! Uma hora tem 60 minutos, não 100. Quem marca e) caiu nessa armadilha.'
},
{
src:'Unicamp', nivel:'básico',
text:'Drones são veículos voadores não tripulados, controlados remotamente e guiados por GPS. Uma de suas potenciais aplicações é reduzir o tempo da prestação de primeiros socorros, levando pequenos equipamentos e instruções ao local do socorro, para que qualquer pessoa administre os primeiros cuidados até a chegada de uma ambulância. Considere um caso em que o drone ambulância se deslocou 9 km em 5 minutos. Nesse caso, o módulo de sua velocidade média é de aproximadamente:',
opts:['1,4 m/s','30 m/s','45 m/s','140 m/s'], ans:1,
hint:'As alternativas estão em m/s. Passe a distância para metros e o tempo para segundos.',
steps:[
['Dados', `<ul><li>Distância: Δs = 9 km</li><li>Tempo: Δt = 5 min</li><li>Pede-se: v<sub>m</sub> em <b>m/s</b></li></ul>`],
['Converter para o SI', `<div class="eq">9 km = 9 × 1 000 = 9 000 m</div>
<div class="eq">5 min = 5 × 60 = 300 s</div>`],
['Aplicar a fórmula', `<div class="eq">v<sub>m</sub> = ${f('9 000 m','300 s')} = <span class="hl">30 m/s</span></div>`],
],
alt:'Confira se o resultado faz sentido: 30 m/s × 3,6 = 108 km/h. É uma velocidade razoável para um drone (mais ou menos a de um carro na estrada).',
warn:'9 ÷ 5 = 1,8 dá a velocidade em km por minuto, que não é nenhuma das unidades das alternativas. Sempre confira as unidades antes de dividir.'
},
{
src:'Fuvest', nivel:'básico',
text:'Após chover na cidade de São Paulo, as águas da chuva descerão o rio Tietê até o rio Paraná, percorrendo cerca de 1 000 km. Sendo de 4 km/h a velocidade média das águas, o percurso mencionado será cumprido pelas águas da chuva em aproximadamente:',
opts:['30 dias','10 dias','25 dias','2 dias','4 dias'], ans:1,
hint:'Calcule o tempo em horas. Depois lembre que um dia tem 24 horas.',
steps:[
['Dados', `<ul><li>Distância: Δs = 1 000 km</li><li>Velocidade média: v = 4 km/h</li><li>Pede-se: tempo em <b>dias</b></li></ul>`],
['Calcular o tempo em horas', `<div class="eq">Δt = ${f('Δs','v')} = ${f('1 000 km','4 km/h')} = 250 h</div>`],
['Passar de horas para dias', `<div class="eq">${f('250 h','24 h/dia')} ≈ 10,4 dias ≈ <span class="hl">10 dias</span></div>
<p>A questão pede “aproximadamente”, então 10 dias é a alternativa mais próxima.</p>`],
],
alt:'Em um dia as águas andam 4 km/h × 24 h = 96 km, quase 100 km. Para 1 000 km, são cerca de 10 dias.',
warn:'Não pare no 250! O resultado da fórmula sai em horas, e as alternativas estão em dias.'
},
{
src:'FCC', nivel:'intermediário',
text:'Qual é a velocidade escalar média, em km/h, de uma pessoa que percorre, a pé, 1 200 m em 20 min?',
opts:['4,8','3,6','2,7','2,1','1,2'], ans:1,
hint:'A resposta é pedida em km/h. Passe a distância para quilômetros e o tempo para horas antes de dividir.',
steps:[
['Dados', `<ul><li>Distância: Δs = 1 200 m</li><li>Tempo: Δt = 20 min</li><li>Pede-se: v<sub>m</sub> em <b>km/h</b></li></ul>`],
['Converter as unidades', `<p>Como a resposta é em km/h, a distância vai para km e o tempo para horas:</p>
<div class="eq">1 200 m = 1,2 km &nbsp;&nbsp;(÷ 1 000)</div>
<div class="eq">20 min = ${f('20','60')} h = ${f('1','3')} h</div>`],
['Aplicar a fórmula', `<div class="eq">v<sub>m</sub> = ${f('Δs','Δt')} = ${f('1,2 km',f('1','3')+' h')} = 1,2 × 3 = <span class="hl">3,6 km/h</span></div>
<p>Dividir por ⅓ é o mesmo que multiplicar por 3.</p>`],
],
alt:`Repare que 20 min = 20 × 60 = 1 200 s. Então v = ${f('1 200 m','1 200 s')} = 1 m/s. Convertendo: 1 m/s × 3,6 = 3,6 km/h.`,
warn:'Não divida 1 200 por 20 direto: isso dá 60 metros por minuto, que não é km/h. Converta as unidades primeiro.'
},
{
src:'Unitau', nivel:'intermediário',
text:'Um carro mantém uma velocidade escalar constante de 72,0 km/h. Em uma hora e dez minutos ele percorre, em quilômetros, a distância de:',
opts:['79,2','80,0','82,4','84,0','90,0'], ans:3,
hint:'Cuidado: 1 h 10 min não é 1,10 h. Que fração da hora são 10 minutos?',
steps:[
['Dados', `<ul><li>Velocidade constante: v = 72 km/h</li><li>Tempo: Δt = 1 h 10 min</li><li>Pede-se: Δs em km</li></ul>`],
['Separar o tempo em partes', `<p>Em 1 hora inteira o carro anda 72 km.</p>
<p>10 min é ${f('10','60')} = ${f('1','6')} de hora. Nesse tempo ele anda:</p>
<div class="eq">72 × ${f('1','6')} = 12 km</div>`],
['Somar', `<div class="eq">Δs = 72 km + 12 km = <span class="hl">84 km</span></div>`],
],
alt:`Pela fórmula: Δt = 1 + ${f('1','6')} = ${f('7','6')} h. Então Δs = v · Δt = 72 × ${f('7','6')} = ${f('504','6')} = 84 km.`,
warn:'Se você fez 72 × 1,10 = 79,2 (alternativa a), tratou 10 minutos como 0,10 h. Mas 10 min = 0,1666… h.'
},
{
src:'FGV', nivel:'intermediário',
text:'Numa corrida de Fórmula 1, a volta mais rápida foi feita em 1 min e 20 s a uma velocidade média de 180 km/h. Pode-se afirmar que o comprimento da pista, em metros, é de:',
opts:['180','4 000','1 800','14 400','2 160'], ans:1,
hint:'A resposta é em metros. Converta 180 km/h para m/s e escreva o tempo todo em segundos.',
steps:[
['Dados', `<ul><li>Tempo da volta: Δt = 1 min 20 s</li><li>Velocidade média: v = 180 km/h</li><li>Pede-se: comprimento da pista (Δs) em metros</li></ul>`],
['Converter as unidades', `<div class="eq">Δt = 60 s + 20 s = 80 s</div>
<div class="eq">v = 180 km/h ÷ 3,6 = 50 m/s</div>`],
['Calcular a distância', `<div class="eq">Δs = v · Δt = 50 m/s × 80 s = <span class="hl">4 000 m</span></div>`],
],
alt:`180 km/h significa 180 km em 60 min, ou seja, 3 km por minuto. Como 80 s = ${f('4','3')} min, a distância é 3 × ${f('4','3')} = 4 km = 4 000 m.`,
warn:'180 × 80 = 14 400 (alternativa d) mistura km/h com segundos. Velocidade e tempo precisam estar em unidades que combinam.'
},
{
src:'UFPE', nivel:'intermediário',
text:'Um automóvel se desloca numa estrada retilínea sempre no mesmo sentido. Inicialmente, ele percorre um trecho de comprimento 400 km em 8 horas. O motorista para durante uma hora e, em seguida, percorre mais 200 km em 6 horas. A velocidade média em todo o percurso, em km/h, é igual a:',
opts:['100','80','60','50','40'], ans:4,
hint:'Velocidade média = distância total ÷ tempo total. O relógio continua correndo durante a parada.',
steps:[
['Dados', `<ul><li>Trecho 1: 400 km em 8 h</li><li>Parada: 1 h (anda 0 km)</li><li>Trecho 2: 200 km em 6 h</li></ul>`],
['Somar distâncias e tempos', `<div class="eq">Δs<sub>total</sub> = 400 + 0 + 200 = 600 km</div>
<div class="eq">Δt<sub>total</sub> = 8 + 1 + 6 = 15 h</div>`],
['Aplicar a fórmula', `<div class="eq">v<sub>m</sub> = ${f('600 km','15 h')} = <span class="hl">40 km/h</span></div>`],
],
alt:'Pense na viagem inteira como um único bloco: do momento em que o carro saiu até o momento em que chegou passaram 15 h, e ele avançou 600 km. A parada faz parte da viagem.',
warn:'Velocidade média não é a média das velocidades dos trechos. O trecho 1 teve 50 km/h e o trecho 2 cerca de 33 km/h, mas a resposta não é a média desses números. Esquecer a parada também leva a erro: 600 ÷ 14 ≈ 42,9 km/h.'
},
{
src:'PUC-MG', nivel:'avançado',
text:'Um homem, caminhando na praia, deseja calcular sua velocidade. Para isso, ele conta o número de passadas que dá em um minuto, contando uma unidade a cada vez que o pé direito toca o solo, e conclui que são 50 passadas por minuto. A seguir, ele mede a distância entre duas posições sucessivas do seu pé direito e encontra o equivalente a seis pés. Sabendo que três pés correspondem a um metro, sua velocidade, suposta constante, é:',
opts:['3 km/h','4,5 km/h','6 km/h','9 km/h','10 km/h'], ans:2,
hint:'Descubra quantos metros tem uma passada. Depois, quantos metros ele anda em 1 minuto e em 1 hora.',
steps:[
['Tamanho de uma passada', `<p>“Pé” aqui é uma unidade de medida. Se 3 pés = 1 m, então:</p>
<div class="eq">6 pés = 2 × 3 pés = 2 m</div>
<p>Cada passada (de um apoio do pé direito até o próximo) mede 2 m.</p>`],
['Distância em 1 minuto', `<div class="eq">50 passadas × 2 m = 100 m por minuto</div>`],
['Distância em 1 hora', `<div class="eq">100 m × 60 min = 6 000 m = 6 km</div>
<p>Ele anda 6 km a cada hora, ou seja, <span class="hl">6 km/h</span>.</p>`],
],
alt:`Em m/s: 100 m por minuto = ${f('100 m','60 s')} ≈ 1,67 m/s. Multiplicando por 3,6: 1,67 × 3,6 ≈ 6 km/h.`,
warn:'O enunciado mede a passada em “pés”. Troque para metros antes de fazer qualquer conta, senão a velocidade sai numa unidade estranha.'
},
{
src:'UFRGS', nivel:'avançado',
text:'Em grandes aeroportos e shoppings, existem esteiras móveis horizontais para facilitar o deslocamento de pessoas. Considere uma esteira com 48 m de comprimento e velocidade de 1,0 m/s. Uma pessoa ingressa na esteira e segue caminhando sobre ela com velocidade constante no mesmo sentido de movimento da esteira. A pessoa atinge a outra extremidade 30 s após ter ingressado na esteira. Com que velocidade, em m/s, a pessoa caminha sobre a esteira?',
opts:['2,6','1,6','1,0','0,8','0,6'], ans:4,
hint:'Primeiro calcule a velocidade da pessoa vista por alguém parado no chão. Uma parte dessa velocidade vem da esteira.',
steps:[
['Dados', `<ul><li>Comprimento da esteira: 48 m</li><li>Velocidade da esteira: 1,0 m/s</li><li>Tempo para atravessar: 30 s</li><li>Pede-se: a velocidade com que a pessoa <b>caminha sobre</b> a esteira</li></ul>`],
['Velocidade vista de fora', `<p>Para alguém parado no chão, a pessoa percorreu 48 m em 30 s:</p>
<div class="eq">v<sub>total</sub> = ${f('48 m','30 s')} = 1,6 m/s</div>`],
['Descontar a ajuda da esteira', `<p>Como a pessoa anda no mesmo sentido da esteira, as velocidades se somam:</p>
<div class="eq">v<sub>total</sub> = v<sub>esteira</sub> + v<sub>pessoa</sub></div>
<div class="eq">1,6 = 1,0 + v<sub>pessoa</sub> &nbsp;⇒&nbsp; v<sub>pessoa</sub> = <span class="hl">0,6 m/s</span></div>`],
],
alt:'Tire a prova: em 30 s, a esteira leva a pessoa 1,0 × 30 = 30 m, e as próprias pernas dela a levam 0,6 × 30 = 18 m. Total: 30 + 18 = 48 m, exatamente o comprimento da esteira.',
warn:'1,6 m/s (alternativa b) é a velocidade em relação ao chão, mas a pergunta é sobre a velocidade da pessoa caminhando sobre a esteira.'
},
{
src:'Fuvest', nivel:'avançado',
text:'Um automóvel que se desloca com uma velocidade escalar constante de 72 km/h ultrapassa outro que se desloca com uma velocidade escalar constante de 54 km/h numa mesma estrada reta. O primeiro encontra-se 200 m atrás do segundo no instante t = 0. O primeiro estará ao lado do segundo no instante:',
opts:['t = 10 s','t = 20 s','t = 30 s','t = 40 s','t = 50 s'], ans:3,
hint:'Passe as velocidades para m/s. A cada segundo, quantos metros o carro de trás “tira” da distância de 200 m?',
steps:[
['Converter para m/s', `<div class="eq">Carro 1 (atrás): 72 ÷ 3,6 = 20 m/s</div>
<div class="eq">Carro 2 (à frente): 54 ÷ 3,6 = 15 m/s</div>`],
['Quanto a distância diminui por segundo', `<p>A cada segundo, o carro 1 anda 20 m e o carro 2 anda 15 m. A distância entre eles diminui:</p>
<div class="eq">20 − 15 = 5 m a cada segundo</div>`],
['Tempo para zerar os 200 m', `<div class="eq">t = ${f('200 m','5 m/s')} = <span class="hl">40 s</span></div>
<p>Veja na tabela como a distância cai de 5 em 5 metros por segundo:</p>
<div class="tblwrap"><table>
<tr><th>t (s)</th><th>0</th><th>10</th><th>20</th><th>30</th><th>40</th></tr>
<tr><th>Carro 1 (m)</th><td>0</td><td>200</td><td>400</td><td>600</td><td class="meet">800</td></tr>
<tr><th>Carro 2 (m)</th><td>200</td><td>350</td><td>500</td><td>650</td><td class="meet">800</td></tr>
<tr><th>Distância (m)</th><td>200</td><td>150</td><td>100</td><td>50</td><td class="meet">0</td></tr>
</table></div>`],
],
alt:`Com a função horária do MU (s = s<sub>0</sub> + v·t), colocando a origem no carro 1:<br>
s<sub>1</sub> = 0 + 20t &nbsp;e&nbsp; s<sub>2</sub> = 200 + 15t.<br>
Eles ficam lado a lado quando s<sub>1</sub> = s<sub>2</sub>: 20t = 200 + 15t ⇒ 5t = 200 ⇒ t = 40 s.`,
warn:'Não misture unidades: a distância está em metros e as velocidades em km/h. Converta para m/s antes de calcular.'
},
];
