# Monta o index.html do app a partir dos arquivos desta pasta.
# Uso (na raiz do repositório):  python3 fonte/montar.py
# Ordem do script: data.js (helpers + Lista 1) → lista2.js, lista3.js... (em ordem numérica) → engine_app.js (SITE, CONFIG e motor).
import glob, os, re
B=os.path.dirname(os.path.abspath(__file__))+'/'
head=open(B+'head.html',encoding='utf-8').read().replace('<title>Lista de Cinemática 9º Ano</title>','''<title>Física 9º Ano LDV</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#1D4E89">
<meta name="description" content="Listas interativas de Física do 9º ano do Colégio Leonardo da Vinci Alfa, com dica e resolução passo a passo.">
<link rel="icon" type="image/png" href="icons/favicon.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Física 9º">
<meta name="apple-mobile-web-app-status-bar-style" content="default">''')
extra=open(B+'extra.css',encoding='utf-8').read()+'''
.install{border-color:var(--sign)}
.install p{margin:0}
@media (display-mode: standalone){.wrap{padding-top:max(20px,env(safe-area-inset-top,0px))}}
'''
data=open(B+'data.js',encoding='utf-8').read()
extras=sorted(glob.glob(B+'lista*.js'), key=lambda p:int(re.findall(r'\d+',os.path.basename(p))[0]))
l2='\n'.join(open(p,encoding='utf-8').read() for p in extras)
eng=open(B+'engine_app.js',encoding='utf-8').read()
body='''<div class="wrap">
<header class="plate"><div class="plate-inner"><div class="eyebrow" id="eyebrow"></div><h1 id="ptitle"></h1><p id="psub"></p></div></header>
<nav class="crumbs" id="crumbs" aria-label="Você está em" hidden></nav>
<main id="view" style="display:flex;flex-direction:column;gap:18px"></main>
</div>
'''
doc=head+extra+'\n</style>\n</head>\n<body>\n'+body+'<script>\n'+data+'\n'+l2+'\n'+eng+'</script>\n</body>\n</html>\n'
open(B+'../index.html','w',encoding='utf-8').write(doc)
print(len(doc))
