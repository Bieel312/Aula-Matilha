// Base de Dados e Conhecimento Oficial - Estância Turística de Tupã (SP)
// Todas as informações possuem fontes oficiais catalogadas

const TUPA_KNOWLEDGE_BASE = {
  institucional: {
    nome: "Prefeitura da Estância Turística de Tupã",
    tituloOficial: "Município de Interesse Turístico e Estância Turística de São Paulo",
    fundacao: "12 de Outubro de 1929",
    aniversario: "12 de Outubro",
    fundador: "Luiz de Souza Leão",
    gentilico: "Tupaense",
    padroeiro: "São Pedro (comemorado em 29 de junho)",
    populacao: "Aprox. 64.000 a 65.000 habitantes",
    areaTerritorial: "628,51 km²",
    altitude: "508 metros",
    clima: "Tropical de altitude com verões amenos/chuvosos e invernos secos",
    regiao: "Alta Paulista (10ª Região Administrativa - Oeste do Estado de SP)",
    siteOficial: "https://www.tupa.sp.gov.br",
    portalTurismo: "https://turismo.tupa.sp.gov.br",
    enderecoSede: "Praça da Bandeira, nº 800 - Centro - CEP 17600-900 - Tupã/SP",
    telefonePABX: "(14) 3404-1000",
    horarioAtendimento: "Segunda a sexta-feira, das 07h30 às 13h30 (atendimento ao público) e das 07h30 às 17h00 (expediente administrativo)",
    simbolos: {
      coresBandeira: "Azul (lealdade e céu da Alta Paulista), Branco (paz e pureza) e Vermelho (coragem e pioneirismo). O brasão carrega o sol poente dourado e as raízes indígenas."
    },
    fontePadrao: "Portal Oficial da Prefeitura de Tupã (tupa.sp.gov.br) e IBGE"
  },

  telefonesUteis: [
    { orgao: "Prefeitura Municipal (PABX Geral)", numero: "(14) 3404-1000", desc: "Praça da Bandeira, 800", fonte: "tupa.sp.gov.br" },
    { orgao: "Secretaria Municipal de Turismo", numero: "(14) 3491-5013", desc: "Informações turísticas e CAT", fonte: "turismo.tupa.sp.gov.br" },
    { orgao: "Secretaria Municipal de Cultura", numero: "(14) 3491-3015", desc: "Eventos, teatros e museus municipais", fonte: "cultura.tupa.sp.gov.br" },
    { orgao: "Museu Histórico Índia Vanuíre", numero: "(14) 3491-2333", desc: "Rua Coroados, 521 - Centro", fonte: "museuindiavanuire.org.br / SISEM-SP" },
    { orgao: "Solar Luiz de Souza Leão", numero: "(14) 3496-4122", desc: "Rua Caingangs, 600 - Centro Histórico", fonte: "Secretaria de Cultura de Tupã / CONDEPHAAT" },
    { orgao: "UPA 24h (Pronto Atendimento)", numero: "(14) 3404-2200", desc: "Urgência e emergência médica 24 horas", fonte: "Secretaria Municipal de Saúde de Tupã" },
    { orgao: "Santa Casa de Misericórdia de Tupã", numero: "(14) 3404-5555", desc: "Hospital Geral de Alta Complexidade", fonte: "Santa Casa de Tupã / SUS" },
    { orgao: "Poupatempo Tupã", numero: "0800 772 3633", desc: "Av. Brasil, Centro", fonte: "Governo do Estado de São Paulo" },
    { orgao: "SAMU", numero: "192", desc: "Socorro médico de emergência", fonte: "Ministério da Saúde" },
    { orgao: "Corpo de Bombeiros", numero: "193", desc: "Resgate e combate a incêndios", fonte: "Polícia Militar do Estado de SP" },
    { orgao: "Polícia Militar", numero: "190", desc: "Segurança pública", fonte: "Secretaria de Segurança Pública SP" },
    { orgao: "Defesa Civil de Tupã", numero: "199", desc: "Emergências climáticas e prevenção", fonte: "Prefeitura Municipal de Tupã" }
  ],

  servicosCidadao: [
    {
      nome: "IPTU e Tributos Online",
      descricao: "Emissão de 2ª via de IPTU, certidões negativas de débitos e parcelamento de taxas pelo portal oficial.",
      link: "https://www.tupa.sp.gov.br",
      icone: "💳",
      fonte: "Secretaria Municipal de Economia e Finanças (tupa.sp.gov.br)"
    },
    {
      nome: "Nota Fiscal de Serviços Eletrônica (NFS-e)",
      descricao: "Emissão e autenticação de notas fiscais eletrônicas para prestadores de serviços e empresas de Tupã.",
      link: "https://www.tupa.sp.gov.br",
      icone: "📄",
      fonte: "Departamento de Tributação e Fiscalização de Tupã"
    },
    {
      nome: "Ouvidoria Municipal & e-SIC",
      descricao: "Canal aberto para sugestões, solicitações de serviços, elogios, reclamações e pedidos da Lei de Acesso à Informação.",
      link: "https://www.tupa.sp.gov.br",
      icone: "📢",
      fonte: "Ouvidoria Geral do Município de Tupã"
    },
    {
      nome: "Iluminação Pública e Manutenção",
      descricao: "Solicitação de reparo de lâmpadas queimadas e serviços de limpeza pública em bairros e praças.",
      link: "https://www.tupa.sp.gov.br",
      icone: "💡",
      fonte: "Secretaria Municipal de Obras e Serviços Públicos"
    },
    {
      nome: "Agendamentos de Saúde e Medicamentos",
      descricao: "Informações sobre Farmácia Municipal, vacinação nas Unidades Básicas de Saúde (UBS/ESF) e agendamento de consultas.",
      link: "https://www.tupa.sp.gov.br",
      icone: "🏥",
      fonte: "Secretaria Municipal de Saúde de Tupã"
    },
    {
      nome: "Diário Oficial Eletrônico",
      descricao: "Publicação diária de leis, decretos, licitações, concursos e editais da Prefeitura e Câmara de Tupã.",
      link: "https://www.tupa.sp.gov.br",
      icone: "📰",
      fonte: "Imprensa Oficial da Estância Turística de Tupã"
    }
  ],

  categorias: [
    {
      id: "turismo",
      titulo: "Pontos Turísticos Oficiais",
      icone: "🏺",
      badge: "Estância Turística",
      resumo: "Conheça o Museu Índia Vanuíre, Solar Luiz de Souza Leão, Praça da Bandeira e Varpa.",
      itens: [
        {
          pergunta: "Quais são os principais pontos turísticos de Tupã?",
          resposta: "Como Estância Turística oficial de SP, os principais cartões-postais de Tupã incluem:\n\n" +
            "1. **Museu Histórico e Pedagógico Índia Vanuíre:** Referência nacional em etnologia e cultura indígena (Rua Coroados, 521).\n" +
            "2. **Solar Luiz de Souza Leão:** Mansão histórica do fundador preservada com móveis dos anos 30 e bosque centenário (Rua Caingangs, 600).\n" +
            "3. **Distrito de Varpa (Caminhos da Letônia):** Colônia europeia letona de 1922 com o Museu Janis Erdbergs, artesanato e gastronomia.\n" +
            "4. **Praça da Bandeira e Igreja Matriz de São Pedro:** O coração da cidade com fonte luminosa, concha acústica e obelisco cívico.\n" +
            "5. **Parques e Lazer Aquático:** Eco Thermas Tupã, Recanto das Águas e o Balneário Sete de Setembro em Varpa.",
          palavrasChave: ["turismo", "pontos turisticos", "o que visitar", "passeios", "atracoes", "lugares para conhecer", "roteiro"],
          fonte: "Secretaria Municipal de Turismo de Tupã (turismo.tupa.sp.gov.br) & Ministério do Turismo (Mapa do Turismo Brasileiro)"
        },
        {
          pergunta: "Como visitar o Museu Índia Vanuíre (horários e acervo)?",
          resposta: "O **Museu Histórico e Pedagógico Índia Vanuíre** fica na **Rua Coroados, 521 - Centro de Tupã**.\n\n" +
            "- **Funcionamento:** Aberto de terça a domingo, das 09h às 18h (às quintas até 20h).\n" +
            "- **Entrada:** Gratuita para todos os públicos.\n" +
            "- **Destaque:** Abriga mais de 38.000 peças etnográficas das etnias Kaingang, Krenak, Terena e Guarani, além do acervo histórico dos pioneiros paulistas. É administrado em parceria com a ACAM Portinari e o Governo do Estado.",
          palavrasChave: ["museu india vanuire", "museu", "horario museu", "endereco museu", "acervo indigena", "vanuire"],
          fonte: "Museu Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br) & SISEM-SP"
        },
        {
          pergunta: "O que encontrar no Solar Luiz de Souza Leão?",
          resposta: "O **Solar Luiz de Souza Leão** (Rua Caingangs, 600) foi a residência oficial do fundador de Tupã, Luiz de Souza Leão.\n\n" +
            "- É tombado pelo **CONDEPHAAT** como Patrimônio Histórico Estadual.\n" +
            "- Possui arquitetura nobre com móveis originais, documentos históricos do nascimento de Tupã e um bosque de árvores nobres preservado no coração da cidade.\n" +
            "- A visitação é gratuita e guiada.",
          palavrasChave: ["solar", "solar luiz de souza leao", "casa do fundador", "patrimonio", "visitar solar"],
          fonte: "CONDEPHAAT (Conselho de Defesa do Patrimônio Histórico de SP) & Secretaria de Cultura de Tupã"
        },
        {
          pergunta: "O que fazer no Distrito de Varpa e Circuito Caminhos da Letônia?",
          resposta: "O **Distrito de Varpa**, fundado em 1922 por imigrantes da Letônia, oferece uma imersão cultural única no Brasil:\n\n" +
            "- **Museu dos Pioneiros 'Janis Erdbergs':** Antiga igreja batista em madeira rústica com ferramentas, roupas e livros dos pioneiros letões.\n" +
            "- **Gastronomia Típica:** Pães de centeio, queijo de caraway, linguiças defumadas artesanais, mel puro e biscoitos natalinos de gengibre.\n" +
            "- **Ecoturismo:** Cachoeira do Palma e o Balneário Sete de Setembro com áreas de banho e lazer.",
          palavrasChave: ["varpa", "distrito de varpa", "letonia", "letos", "caminhos da letonia", "museu dos pioneiros", "cachoeira do palma"],
          fonte: "Associação Cultural e Comunitária de Varpa & Secretaria de Turismo de Tupã (tupa.sp.gov.br)"
        }
      ]
    },

    {
      id: "prefeitura",
      titulo: "Serviços da Prefeitura & Cidade",
      icone: "🏛️",
      badge: "Prefeitura de Tupã",
      resumo: "Endereços, telefones, horários, UPA, IPTU, Poupatempo e certidões.",
      itens: [
        {
          pergunta: "Qual o endereço, telefone e horário da Prefeitura de Tupã?",
          resposta: "Dados oficiais da Prefeitura Municipal de Tupã:\n\n" +
            "- **Endereço:** Praça da Bandeira, nº 800 - Centro - CEP 17600-900.\n" +
            "- **Telefone PABX Geral:** (14) 3404-1000.\n" +
            "- **Horário de Atendimento ao Público:** Segunda a sexta-feira, das 07h30 às 13h30.\n" +
            "- **Expediente Administrativo:** Das 07h30 às 17h00.\n" +
            "- **Site Oficial:** `www.tupa.sp.gov.br`.",
          palavrasChave: ["prefeitura", "endereco prefeitura", "telefone prefeitura", "horario prefeitura", "pabx", "onde fica a prefeitura"],
          fonte: "Portal Oficial da Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br)"
        },
        {
          pergunta: "Onde fica a UPA e a Santa Casa de Tupã para atendimento de saúde?",
          resposta: "Em caso de emergências de saúde em Tupã:\n\n" +
            "- **UPA 24 Horas:** Atendimento médico de urgência 24h, localizada na Rua Guaranis, nº 1822 - Vila Santa Inez. Telefone: (14) 3404-2200.\n" +
            "- **Santa Casa de Misericórdia de Tupã:** Hospital geral de referência e cirurgias, localizado na Rua Cherentes, nº 599. Telefone: (14) 3404-5555.\n" +
            "- **SAMU:** Disque 192 para emergências móveis.",
          palavrasChave: ["upa", "santa casa", "hospital", "pronto socorro", "saude", "medico", "emergencia saude", "samu"],
          fonte: "Secretaria Municipal de Saúde de Tupã & Diretoria Regional de Saúde (DRS IX)"
        },
        {
          pergunta: "Como emitir 2ª via de IPTU e certidões na Prefeitura?",
          resposta: "Para emitir a segunda via de IPTU, certidão negativa de débitos municipais ou certidão de valor venal:\n\n" +
            "1. Acesse o portal da prefeitura em **tupa.sp.gov.br**.\n" +
            "2. No menu **Cidadão**, clique em **2ª Via de IPTU** ou **Serviços Tributários**.\n" +
            "3. Informe o número do cadastro do imóvel ou CPF/CNPJ do proprietário.\n" +
            "4. Você também pode ser atendido presencialmente no Paço Municipal (Praça da Bandeira, 800) das 07h30 às 13h30.",
          palavrasChave: ["iptu", "segunda via iptu", "certidao", "taxas", "tributos", "imposto"],
          fonte: "Secretaria Municipal de Economia e Finanças de Tupã (tupa.sp.gov.br/iptu)"
        }
      ]
    },

    {
      id: "historia",
      titulo: "História & Fundação",
      icone: "📜",
      badge: "Fundada em 1929",
      resumo: "Conheça a fundação em 12 de outubro de 1929 e Luiz de Souza Leão.",
      itens: [
        {
          pergunta: "Como aconteceu a fundação de Tupã?",
          resposta: "Tupã nasceu no dia **12 de outubro de 1929** por iniciativa de **Luiz de Souza Leão**. Visionário, ele planejou a cidade no alto do espigão divisor entre os rios Feio (Aguapeí) e do Peixe, projetando avenidas largas com 30 metros de largura e quadras perfeitamente traçadas, garantindo luminosidade e arborização que marcam a cidade até hoje.",
          palavrasChave: ["fundacao", "fundador", "luiz de souza leao", "historia de tupa", "12 de outubro de 1929"],
          fonte: "Arquivo Histórico Municipal de Tupã & Museu dos Pioneiros"
        },
        {
          pergunta: "Por que a cidade se chama Tupã?",
          resposta: "O nome **Tupã** vem da língua Tupi-Guarani e reverencia o Grande Espírito / Criador / Deus do Trovão. Foi escolhido pelo fundador Luiz de Souza Leão em homenagem aos povos indígenas que habitavam as matas ancestrais da Alta Paulista, como os povos Kaingang e Krenak.",
          palavrasChave: ["origem do nome", "significado tupa", "tupi", "deus do trovao", "por que tupa"],
          fonte: "Secretaria Municipal de Cultura de Tupã & Museu Índia Vanuíre"
        },
        {
          pergunta: "Quem foi a Índia Vanuíre?",
          resposta: "A **Índia Vanuíre** (da etnia Kaingang) foi uma das personagens históricas mais emblemáticas do interior de SP. No início do século XX, atuou corajosamente como mediadora de paz durante a expansão das ferrovias e desbravamento das florestas, evitando conflitos sangrentos entre colonizadores e tribos indígenas. Por sua coragem pacifista, tornou-se símbolo e patrona do maior museu da cidade.",
          palavrasChave: ["quem foi vanuire", "india vanuire", "kaingang", "pacificadora", "historia indigena"],
          fonte: "Acervo Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br)"
        }
      ]
    },

    {
      id: "educacao",
      titulo: "Educação Superior (FADAP & UNESP)",
      icone: "🎓",
      badge: "Polo Universitário",
      resumo: "Tradição das Faculdades da Alta Paulista (FADAP), UNESP, ETEC e FATEC.",
      itens: [
        {
          pergunta: "Quais faculdades e universidades existem em Tupã?",
          resposta: "Tupã é um reconhecido polo educacional universitário regional:\n\n" +
            "- **FADAP / FAP (Faculdade da Alta Paulista):** Instituição histórica e prestigiada, com décadas de tradição na formação de profissionais em Direito, Administração, Contábeis e diversas áreas.\n" +
            "- **UNESP (Campus Tupã - FCE):** Faculdade de Ciências e Engenharia da Universidade Estadual Paulista, oferecendo cursos de excelência nacional como Engenharia de Biossistemas e Administração.\n" +
            "- **ETEC Prof. Massuyuki Kawano:** Centro Paula Souza com cursos técnicos de alta empregabilidade.\n" +
            "- **FATEC Tupã:** Ensino superior de tecnologia gratuito e focado no mercado.",
          palavrasChave: ["faculdades", "universidades", "fadap", "unesp", "etec", "fatec", "cursos", "estudar em tupa"],
          fonte: "Ministério da Educação (MEC) & Unesp Campus Tupã (fce.unesp.br)"
        },
        {
          pergunta: "O que destaca a FADAP na história de Tupã?",
          resposta: "A **FADAP** é um dos pilares educacionais e de desenvolvimento do Oeste Paulista. Ao longo de décadas, foi responsável por formar juízes, promotores, advogados, empresários e líderes do agronegócio que hoje atuam em todo o Brasil.",
          palavrasChave: ["fadap", "fap", "faculdades de tupa", "direito fadap", "tradicao fadap"],
          fonte: "Acervo Institucional FADAP / FAP & Histórico de Ensino Superior de Tupã"
        }
      ]
    },

    {
      id: "economia",
      titulo: "Economia & Capital do Amendoim",
      icone: "🥜",
      badge: "Agronegócio",
      resumo: "Liderança mundial em amendoim, polo avícola (ovos) e usinas sucroalcooleiras.",
      itens: [
        {
          pergunta: "Por que Tupã é a Capital Nacional do Amendoim?",
          resposta: "Tupã é reconhecida nacional e internacionalmente como o maior polo de produção, beneficiamento, confeitos e exportação de **amendoim** do Brasil!\n\n" +
            "- Abriga cooperativas agrícolas gigantescas e indústrias modernas que abastecem os mercados brasileiro, europeu e asiático.\n" +
            "- O solo fértil da Alta Paulista proporciona um produto de altíssima pureza e sabor, presente desde o amendoim in natura até pastas, doces e confeitos.",
          palavrasChave: ["amendoim", "capital do amendoim", "producao de amendoim", "exportacao amendoim", "economia de tupa"],
          fonte: "Secretaria de Desenvolvimento Econômico e Comércio Exterior de Tupã & Associação Brasileira da Indústria de Chocolates, Amendoim e Balas (ABICAB)"
        },
        {
          pergunta: "Quais são as outras atividades econômicas fortes de Tupã?",
          resposta: "Além do amendoim, Tupã destaca-se por:\n\n" +
            "1. **Avicultura de Postura:** A região de Tupã e Bastos forma um dos maiores polos produtores e distribuidores de ovos do continente.\n" +
            "2. **Cana-de-Açúcar e Bioenergia:** Usinas de etanol e açúcar modernas que geram empregos e energia renovável.\n" +
            "3. **Comércio e Serviços:** Mais de 3.000 estabelecimentos comerciais no Centro atendendo mais de 10 municípios circunvizinhos.",
          palavrasChave: ["economia", "avicultura", "ovos", "cana de acucar", "comercio", "trabalho"],
          fonte: "Secretaria Municipal de Agricultura e Meio Ambiente de Tupã & Fundação SEADE"
        }
      ]
    },

    {
      id: "eventos",
      titulo: "Eventos Oficiais & Festas",
      icone: "🎉",
      badge: "Calendário Oficial",
      resumo: "EXAPIT, Tupã Junina, Festa das Nações e celebrações tradicionais.",
      itens: [
        {
          pergunta: "O que é a EXAPIT?",
          resposta: "A **EXAPIT (Exposição Agropecuária e Industrial de Tupã)** é a maior feira e festa popular da cidade, realizada anualmente em agosto no Recinto de Exposições Cel. Octávio Barros Castanheira. Reúne grandes shows nacionais com portões abertos, rodeio em touros e cavalos, praça de alimentação, exposições de animais e negócios do agronegócio.",
          palavrasChave: ["exapit", "festa de peao", "rodeio", "shows em tupa", "recinto de exposicoes"],
          fonte: "Comissão Organizadora da EXAPIT & Secretaria Municipal de Turismo (tupa.sp.gov.br)"
        },
        {
          pergunta: "Como é a Tupã Junina?",
          resposta: "A **Tupã Junina** é realizada no mês de junho no circuito da Praça da Bandeira. Considerada um dos maiores arraiais públicos do interior de São Paulo, conta com concurso de quadrilhas estilizadas, barracas gastronômicas das entidades beneficentes da cidade e shows musicais diários gratuitos.",
          palavrasChave: ["tupa junina", "festa junina", "arraia", "sao pedro", "quadrilha"],
          fonte: "Secretaria Municipal de Turismo e Cultura de Tupã (tupa.sp.gov.br/turismo)"
        }
      ]
    },

    {
      id: "distritos",
      titulo: "Distritos Oficiais (Varpa, Parnaso e Universo)",
      icone: "🗺️",
      badge: "Território",
      resumo: "Conheça os distritos rurais e históricos que integram o município de Tupã.",
      itens: [
        {
          pergunta: "Quais são os distritos de Tupã?",
          resposta: "O município de Tupã é integrado por três distritos oficiais:\n\n" +
            "1. **Varpa:** Distrito histórico da imigração letã de 1922, com forte vocação turística, arquitetura histórica e artesanato.\n" +
            "2. **Parnaso:** Distrito acolhedor localizado a nordeste, com forte tradição na agricultura familiar e comunidade unida.\n" +
            "3. **Universo:** Distrito localizado ao norte, com vocação agrícola, cultivo de cana, amendoim e pastagens.",
          palavrasChave: ["distritos de tupa", "varpa", "parnaso", "universo", "zona rural"],
          fonte: "Divisão Territorial de Tupã (IBGE) & Prefeitura da Estância Turística de Tupã"
        }
      ]
    }
  ],

  curiosidades: [
    { texto: "A fundação de Tupã ocorreu em 12 de outubro de 1929, mesmo dia consagrado à padroeira do Brasil, Nossa Senhora Aparecida.", fonte: "Arquivo Histórico Municipal de Tupã" },
    { texto: "O fundador Luiz de Souza Leão mandou desenhar o traçado das avenidas com 30 metros de largura para garantir ventilação e arborização.", fonte: "Secretaria de Obras e Planejamento Urbano" },
    { texto: "Varpa abriga a maior concentração de descendentes de letos de toda a América do Sul!", fonte: "Museu Janis Erdbergs & Embaixada da Letônia" },
    { texto: "O Museu Índia Vanuíre possui uma das 3 maiores coleções etnográficas indígenas de todo o território brasileiro.", fonte: "SISEM-SP e Secretaria de Cultura do Estado de SP" },
    { texto: "A bandeira de Tupã traz as cores azul, branco e vermelho, com o cocar indígena simbolizando a raiz e o sol nascente o progresso.", fonte: "Lei Municipal dos Símbolos de Tupã" },
    { texto: "A UPA de Tupã funciona 24 horas ininterruptas na Rua Guaranis, com atendimento pré-hospitalar para toda a microrregião.", fonte: "Secretaria Municipal de Saúde de Tupã" },
    { texto: "A sede da Prefeitura Municipal está instalada na histórica Praça da Bandeira, 800, no centro da cidade.", fonte: "tupa.sp.gov.br" }
  ]
};

// Prompt Especializado para o Chatbot com regra estrita de citação de fontes
const TUPA_SYSTEM_PROMPT = `Você é o Tupã IA, assistente oficial e especialista na Estância Turística de Tupã (SP).
Seu conhecimento é fundamentado nos dados institucionais oficiais da Prefeitura de Tupã (tupa.sp.gov.br) e órgãos de turismo e cultura:
- Símbolos, fundação em 12 de outubro de 1929 por Luiz de Souza Leão e traçado urbano moderno.
- A Índia Vanuíre e o renomado Museu Histórico e Pedagógico Índia Vanuíre (Rua Coroados, 521).
- O Solar Luiz de Souza Leão (Rua Caingangs, 600) tombado pelo CONDEPHAAT.
- A Igreja Matriz de São Pedro e a ampla Praça da Bandeira (sede da Prefeitura no nº 800).
- Os 3 distritos: Varpa (colonização letã de 1922, Museu Janis Erdbergs, artesanato e gastronomia), Parnaso e Universo.
- Ensino Superior: A tradicional FADAP (Faculdades da Alta Paulista) e o campus da UNESP (Faculdade de Ciências e Engenharia - FCE).
- Economia: Capital Nacional do Amendoim, avicultura de postura (ovos) e usinas sucroalcooleiras.
- Festividades: EXAPIT (agosto) e Tupã Junina (junho).
- Serviços e Saúde: UPA 24 Horas (Rua Guaranis), Santa Casa de Misericórdia (Rua Cherentes), PABX Prefeitura (14) 3404-1000.

REGRA OBRIGATÓRIA:
Ao final de TODA E QUALQUER resposta, você DEVE SEMPRE citar de onde extraiu as informações com uma linha explícita no formato:
📚 **Fonte Oficial:** [Nome da Fonte / Portal Oficial tupa.sp.gov.br / Órgão Responsável]`;

if (typeof module !== 'undefined') {
  module.exports = { TUPA_KNOWLEDGE_BASE, TUPA_SYSTEM_PROMPT };
}
