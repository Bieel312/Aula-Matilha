// Base de Conhecimento Especializada sobre a Estância Turística de Tupã - SP
const TUPA_KNOWLEDGE_BASE = {
  cidade: {
    nome: "Estância Turística de Tupã",
    estado: "São Paulo",
    regiao: "Alta Paulista / Centro-Oeste Paulista",
    gentilico: "Tupaense",
    aniversario: "12 de Outubro",
    anoFundacao: 1929,
    fundador: "Luiz de Souza Leão",
    populacaoAproximada: "Aprox. 64.000 a 65.000 habitantes",
    altitude: "508 metros",
    clima: "Tropical de altitude (verões quentes e chuvosos, invernos amenos e secos)",
    ddd: "14",
    cepGeral: "17600-000",
    tituloTuristico: "Estância Turística do Estado de São Paulo"
  },

  categorias: [
    {
      id: "historia",
      titulo: "História e Origem",
      icone: "🏛️",
      resumo: "Fundação em 1929 por Luiz de Souza Leão e a homenagem aos povos originários.",
      itens: [
        {
          pergunta: "Como e quando Tupã foi fundada?",
          resposta: "Tupã foi fundada no dia **12 de outubro de 1929** pelo desbravador e fazendeiro **Luiz de Souza Leão**. Ele adquiriu terras no espigão entre os rios Feio (Aguapeí) e do Peixe, na região da Alta Paulista, planejando o traçado urbano com ruas largas e arborizadas, algo moderno e visionário para a época.",
          palavrasChave: ["fundacao", "fundador", "luiz de souza leao", "1929", "12 de outubro", "origem", "historia"]
        },
        {
          pergunta: "Qual o significado do nome Tupã?",
          resposta: "O nome **Tupã** é de origem Tupi-Guarani e significa o **Deus do Trovão** ou o Ser Supremo Criador na cosmologia indígena. O fundador escolheu esse nome em profundo respeito e homenagem aos povos indígenas (como os Kaingang e Krenak) que habitavam secularmente as florestas da região.",
          palavrasChave: ["significado", "nome", "tupa", "tupi", "deus", "origem do nome", "trovao"]
        },
        {
          pergunta: "Quem foi a Índia Vanuíre?",
          resposta: "**Vanuíre** foi uma célebre líder indígena Kaingang que teve papel histórico pacificador crucial no início do século XX na Alta Paulista. Ela atuou como mediadora cultural entre os colonizadores e os povos originários, subindo em árvores e cantando em sua língua nativa para evitar massacres e promover a paz. Ela dá nome ao principal museu da cidade.",
          palavrasChave: ["india vanuire", "vanuire", "kaingang", "pacificadora", "indigena", "origens"]
        }
      ]
    },
    {
      id: "turismo",
      titulo: "Pontos Turísticos & Cultura",
      icone: "🏺",
      resumo: "Museu Índia Vanuíre, Solar Luiz de Souza Leão, Praça da Bandeira e Varpa.",
      itens: [
        {
          pergunta: "O que é o Museu Histórico e Pedagógico Índia Vanuíre?",
          resposta: "O **Museu Índia Vanuíre** (inaugurado em 1966) é um dos maiores e mais importantes museus etnográficos do Brasil! Administrado em parceria com o Governo do Estado de SP e a ACAM Portinari, possui um acervo monumental sobre povos indígenas brasileiros (especialmente Kaingang, Krenak, Terena e Guarani), além da história dos pioneiros. Fica na Rua Coroados, 521, no Centro de Tupã.",
          palavrasChave: ["museu india vanuire", "museu", "acervo", "etnografico", "indios", "visitar", "cultura"]
        },
        {
          pergunta: "O que é o Solar Luiz de Souza Leão?",
          resposta: "O **Solar Luiz de Souza Leão** é a antiga residência histórica do fundador de Tupã, situada em frente à Praça da Bandeira. Tombada pelo Condephaat como Patrimônio Histórico, a mansão preserva mobiliário nobre dos anos 1930/1940, documentos fundacionais e conta com um belíssimo bosque com dezenas de árvores nativas preservadas.",
          palavrasChave: ["solar", "solar luiz de souza leao", "mansao", "patrimonio", "condephaat", "casa do fundador"]
        },
        {
          pergunta: "Como é a Praça da Bandeira e a Igreja Matriz de São Pedro?",
          resposta: "A **Praça da Bandeira** é o coração cívico e social de Tupã. É ampla, arborizada, conta com fonte luminosa, concha acústica, parquinho infantil e o famoso Obelisco. Nela fica a imponente **Igreja Matriz de São Pedro**, padroeiro de Tupã, com bela arquitetura, vitrais e celebrações históricas todo dia 29 de junho.",
          palavrasChave: ["praca da bandeira", "igreja matriz", "sao pedro", "padroeiro", "centro", "obelisco", "fonte"]
        },
        {
          pergunta: "O que tem para fazer no Distrito de Varpa?",
          resposta: "**Varpa** é uma joia turística e cultural de Tupã! Fundada em 1922 por imigrantes da Letônia (imigração letã), preserva a arquitetura europeia de madeira, o **Museu dos Pioneiros 'Janis Erdbergs'**, a Igreja Batista pioneira, artesanato de palha de milho, queijos típicos, doces, mel e defumados letones. Além disso, abriga belezas naturais como a Cachoeira do Palma e o Balneário Sete de Setembro.",
          palavrasChave: ["varpa", "letonia", "letos", "imigracao leta", "museu dos pioneiros", "artesanato", "cachoeira", "defumados"]
        },
        {
          pergunta: "Tupã tem parques aquáticos e ecoturismo?",
          resposta: "Sim! Tupã conta com opções incríveis de lazer termal e ecológico, como o **Eco Thermas Tupã** (parque aquático com águas termais, piscinas de ondas e toboáguas), o **Recanto das Águas**, fazendas com turismo rural, orquidários e trilhas na Bacia dos rios Aguapeí e do Peixe.",
          palavrasChave: ["ecotermas", "eco thermas", "termas", "parque aquatico", "piscinas", "lazer", "balneario"]
        }
      ]
    },
    {
      id: "educacao",
      titulo: "Educação & Faculdades",
      icone: "🎓",
      resumo: "Polo universitário da Alta Paulista: FADAP / FAP, UNESP, ETEC e FATEC.",
      itens: [
        {
          pergunta: "Quais faculdades e universidades existem em Tupã?",
          resposta: "Tupã é um forte polo de ensino superior da Alta Paulista:\n- **FADAP / FAP (Faculdade da Alta Paulista)**: Tradicional instituição de ensino superior com décadas de história na formação em Direito, Administração e outras áreas.\n- **UNESP (Campus de Tupã - FCE)**: Faculdade de Ciências e Engenharia da Universidade Estadual Paulista, oferecendo cursos de ponta como Engenharia de Biossistemas e Administração.\n- **ETEC Prof. Massuyuki Kawano**: Excelência em ensino técnico profissionalizante.\n- **FATEC Tupã**: Ensino superior tecnológico público.",
          palavrasChave: ["faculdade", "universidade", "fadap", "fap", "unesp", "etec", "fatec", "estudo", "educacao", "cursos"]
        },
        {
          pergunta: "O que é a FADAP e qual sua importância?",
          resposta: "A **FADAP** (Faculdades da Alta Paulista) é uma das instituições educacionais mais tradicionais e renomadas da cidade. Há décadas tem formado milhares de bacharéis e líderes profissionais para toda a região oeste de São Paulo e estados vizinhos, principalmente nas áreas de Ciências Jurídicas e Gestão.",
          palavrasChave: ["fadap", "faculdades de tupa", "fap", "direito fadap", "ensino superior fadap"]
        },
        {
          pergunta: "Quais cursos a UNESP oferece em Tupã?",
          resposta: "A **UNESP Tupã (FCE)** é reconhecida nacionalmente pelos seus cursos de **Engenharia de Biossistemas** (pioneiro no Brasil integrando agronegócio, tecnologia, automação e sustentabilidade) e **Administração**, além de programas de pós-graduação e mestrado que atraem estudantes do país inteiro.",
          palavrasChave: ["unesp", "engenharia de biossistemas", "administracao unesp", "pos graduacao unesp", "fce"]
        }
      ]
    },
    {
      id: "economia",
      titulo: "Economia & Agronegócio",
      icone: "🥜",
      resumo: "Capital Nacional do Amendoim, produção de ovos, cana-de-açúcar e comércio.",
      itens: [
        {
          pergunta: "Por que Tupã é chamada de Capital do Amendoim?",
          resposta: "A região de Tupã é um dos maiores polos mundiais de plantio, beneficiamento e exportação de **amendoim**! A cidade abriga grandes cooperativas e indústrias de ponta no setor de doces, confeitos, pasta de amendoim e grãos in natura, exportando toneladas para a União Europeia, América Latina e Ásia.",
          palavrasChave: ["amendoim", "capital do amendoim", "agro", "producao", "exportacao", "industria", "economia"]
        },
        {
          pergunta: "Quais são as outras forças econômicas de Tupã?",
          resposta: "Além do amendoim, Tupã se destaca por:\n- **Avicultura de Postura**: A região é uma das maiores produtoras de ovos do Brasil.\n- **Sucroalcooleiro**: Cultivo de cana-de-açúcar e usinas de etanol e açúcar.\n- **Indústria e Comércio**: Setor metalmecânico, moveleiro e confecções, além de um comércio central dinâmico que atende dezenas de cidades vizinhas.",
          palavrasChave: ["avicultura", "ovos", "cana de acucar", "usinas", "comercio", "trabalho", "pib", "riqueza"]
        }
      ]
    },
    {
      id: "eventos",
      titulo: "Festas, Eventos & Gastronomia",
      icone: "🎉",
      resumo: "Exapit, Tupã Junina, cultura japonesa e culinária típica.",
      itens: [
        {
          pergunta: "O que é a EXAPIT?",
          resposta: "A **EXAPIT (Exposição Agropecuária e Industrial de Tupã)** é o maior e mais tradicional evento festivo do município. Realizada no Recinto de Exposições 'Cel. Octávio Barros Castanheira', reúne leilões de gado, exposições do agronegócio, parque de diversões, rodeio profissional e grandes shows de artistas nacionais com entrada franca ou beneficente.",
          palavrasChave: ["exapit", "festa de peao", "rodeio", "recinto", "shows", "exposicao agropecuaria"]
        },
        {
          pergunta: "Como é a Tupã Junina?",
          resposta: "A **Tupã Junina** é um dos maiores arraiais do interior paulista! Ocorre anualmente na Praça da Bandeira, com decoração típica especial, dezenas de barracas de comidas tradicionais (quentão, pamonha, espetinhos), apresentações de quadrilhas premiadas e grandes shows populares.",
          palavrasChave: ["tupa junina", "festa junina", "arraia", "sao joao", "quadrilha", "comidas tipicas"]
        },
        {
          pergunta: "Quais são as influências gastronômicas de Tupã?",
          resposta: "A gastronomia tupaense é rica e diversificada graças aos seus colonizadores:\n- **Pratos e doces de amendoim** (pé de moleque, paçoca fresca, pratos regionais).\n- **Culinária letã em Varpa** (pães escuros de centeio, queijo de caraway, linguiças defumadas artesanais, mel puro e biscoitos de gengibre piparkūkas).\n- **Culinária japonesa** (comunidade ativa na ACERT que realiza eventos com yakisoba, sushi e o tradicional almoço beneficente).\n- **Comida caipira tradicional** paulista (feijão gordo, leitoa, costela e pamonha).",
          palavrasChave: ["gastronomia", "comida", "culinaria", "doces", "restaurantes", "onde comer", "comida letonia"]
        }
      ]
    },
    {
      id: "distritos",
      titulo: "Distritos de Tupã",
      icone: "🗺️",
      resumo: "Conheça os distritos de Varpa, Parnaso e Universo.",
      itens: [
        {
          pergunta: "Quais são os distritos do município de Tupã?",
          resposta: "O município de Tupã é composto pela sede urbana e três distritos oficiais:\n1. **Varpa**: Célebre pela imigração letã de 1922, ecoturismo e gastronomia artesanal.\n2. **Parnaso**: Distrito agrícola acolhedor, com forte produção rural familiar e festas de comunidade.\n3. **Universo**: Polo rural com forte produção agrícola, comunidade unida e eventos tradicionais no campo.",
          palavrasChave: ["distritos", "parnaso", "universo", "varpa", "zona rural", "municipio"]
        }
      ]
    }
  ],

  curiosidades: [
    "O fundador Luiz de Souza Leão mandou desenhar o traçado das avenidas com 30 metros de largura para garantir ventilação e arborização.",
    "Varpa abriga a maior concentração de descendentes de letos de toda a América do Sul!",
    "O Museu Índia Vanuíre possui uma das 3 maiores coleções etnográficas indígenas de todo o território brasileiro.",
    "A padroeira original e o padroeiro de Tupã é São Pedro, comemorado com festa popular no dia 29 de junho.",
    "A bandeira de Tupã traz as cores azul, branco e vermelho, com o cocar indígena simbolizando a raiz e o sol simbolizando o futuro próspero."
  ]
};

// Prompt do Sistema caso o usuário queira plugar uma IA externa (ex: Google Gemini)
const TUPA_SYSTEM_PROMPT = `Você é o TupãBot, a Inteligência Artificial especialista oficial na Estância Turística de Tupã, estado de São Paulo, Brasil.
Seu papel é responder com precisão, entusiasmo, educação e riqueza de detalhes a qualquer dúvida sobre a cidade de Tupã.
Você conhece detalhadamente:
- A fundação em 12 de outubro de 1929 por Luiz de Souza Leão e o significado do nome Tupã (Tupi-Guarani).
- A figura histórica pacificadora da Índia Vanuíre (Kaingang).
- O Museu Histórico e Pedagógico Índia Vanuíre e o Solar Luiz de Souza Leão.
- A Praça da Bandeira, Igreja Matriz de São Pedro e os distritos de Varpa, Parnaso e Universo.
- A colônia e imigração letã em Varpa (1922), Museu Janis Erdbergs, artesanato e gastronomia de Varpa.
- O polo universitário com a FADAP (Faculdade da Alta Paulista), UNESP (FCE - Engenharia de Biossistemas e Administração), ETEC Massuyuki Kawano e FATEC.
- A economia como Capital do Amendoim, polo avícola (ovos), cana-de-açúcar e agronegócio.
- Festas tradicionais como a EXAPIT e a Tupã Junina.
Responda sempre em português brasileiro de forma acolhedora, clara e bem estruturada.`;

if (typeof module !== 'undefined') {
  module.exports = { TUPA_KNOWLEDGE_BASE, TUPA_SYSTEM_PROMPT };
}
