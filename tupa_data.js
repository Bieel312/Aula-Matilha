// Base de Dados e Conhecimento Oficial da Estância Turística de Tupã (SP)
// Fontes: Portal Oficial da Prefeitura (tupa.sp.gov.br), IBGE Cidades, Fundação SEADE,
// SISEM-SP / Museu Índia Vanuíre, CONDEPHAAT e Secretaria de Turismo do Estado de SP.

const TUPA_KNOWLEDGE_BASE = {
  institucional: {
    nome: "Prefeitura da Estância Turística de Tupã",
    tituloOficial: "Município de Interesse Turístico e Estância Turística de São Paulo",
    fundacao: "12 de Outubro de 1929",
    aniversario: "12 de Outubro",
    fundador: "Luiz de Souza Leão",
    gentilico: "Tupaense",
    padroeiro: "São Pedro (comemorado em 29 de junho)",
    populacaoCenso: "63.928 habitantes (Censo Oficial IBGE)",
    areaTerritorial: "628,51 km²",
    densidadeDemografica: "101,7 hab/km²",
    altitude: "508 metros",
    clima: "Tropical de altitude (Cwa), verões amenos/chuvosos e invernos secos",
    regiao: "Alta Paulista (10ª Região Administrativa - Oeste de São Paulo)",
    orcamentoAnual: "Aprox. R$ 473,7 milhões (LOA - Lei Orçamentária Anual)",
    siteOficial: "https://www.tupa.sp.gov.br",
    portalTransparencia: "https://transparencia.tupa.sp.gov.br",
    portalTurismo: "https://turismo.tupa.sp.gov.br",
    enderecoSede: "Praça da Bandeira, nº 800 - Centro - CEP 17600-900 - Tupã/SP",
    telefonePABX: "(14) 3404-1000",
    horarioAtendimento: "Segunda a sexta-feira, das 07h30 às 13h30 (atendimento ao público) e das 07h30 às 17h00 (expediente administrativo)",
    simbolos: {
      coresBandeira: "Azul (lealdade e céu da Alta Paulista), Branco (paz e pureza) e Vermelho (coragem e pioneirismo). O brasão traz o sol nascente dourado e o cocar indígena Kaingang."
    }
  },

  socioeconomico: {
    pibTotal: "Aprox. R$ 3,12 bilhões",
    pibPerCapita: "R$ 48.934,77 por habitante/ano (IBGE / Fundação SEADE)",
    salarioMedioFormal: "2,0 a 2,2 salários mínimos mensais para trabalhadores formais",
    rendaMediaDomiciliarPerCapita: "R$ 1.680,00 a R$ 1.750,00 mensais",
    idhm: "0,770 (Índice de Desenvolvimento Humano Municipal - Faixa Alta)",
    taxaEscolarizacao: "97,8% para crianças e jovens de 6 a 14 anos",
    composicaoPib: {
      servicos: "68,0% (Comércio, Administração Pública, Saúde e Educação)",
      industria: "13,0% (Alimentos, Confeitos, Amendoim e Metalmecânica)",
      impostos: "9,5%",
      agropecuaria: "8,8% (Amendoim, Cana-de-Açúcar, Ovos/Avicultura e Café)"
    },
    fonte: "IBGE Cidades (Contas Regionais & Censo Demográfico) e Fundação SEADE"
  },

  telefonesUteis: [
    { orgao: "Prefeitura Municipal (PABX Geral)", numero: "(14) 3404-1000", desc: "Praça da Bandeira, 800", fonte: "tupa.sp.gov.br" },
    { orgao: "Secretaria Municipal de Turismo", numero: "(14) 3491-5013", desc: "Informações turísticas e CAT", fonte: "turismo.tupa.sp.gov.br" },
    { orgao: "Secretaria Municipal de Cultura", numero: "(14) 3491-3015", desc: "Eventos, teatros e museus municipais", fonte: "cultura.tupa.sp.gov.br" },
    { orgao: "Museu Histórico Índia Vanuíre", numero: "(14) 3491-2333", desc: "Rua Coroados, 521 - Centro", fonte: "museuindiavanuire.org.br / SISEM-SP" },
    { orgao: "Solar Luiz de Souza Leão", numero: "(14) 3496-4122", desc: "Rua Caingangs, 600 - Centro Histórico", fonte: "Secretaria de Cultura de Tupã / CONDEPHAAT" },
    { orgao: "UPA 24h (Pronto Atendimento)", numero: "(14) 3404-2200", desc: "Rua Guaranis, 1822 - Vila Santa Inez", fonte: "Secretaria Municipal de Saúde de Tupã" },
    { orgao: "Santa Casa de Misericórdia de Tupã", numero: "(14) 3404-5555", desc: "Rua Cherentes, 599 - Hospital Geral", fonte: "Santa Casa de Tupã / SUS" },
    { orgao: "Poupatempo Tupã", numero: "0800 772 3633", desc: "Av. Brasil, Centro", fonte: "Governo do Estado de São Paulo" },
    { orgao: "SAMU", numero: "192", desc: "Socorro médico de urgência 24h", fonte: "Ministério da Saúde" },
    { orgao: "Corpo de Bombeiros", numero: "193", desc: "Resgate e salvamento", fonte: "Polícia Militar do Estado de SP" },
    { orgao: "Polícia Militar", numero: "190", desc: "Segurança pública", fonte: "Secretaria de Segurança Pública SP" },
    { orgao: "Defesa Civil de Tupã", numero: "199", desc: "Emergências climáticas e prevenção", fonte: "Prefeitura Municipal de Tupã" }
  ],

  servicosCidadao: [
    {
      nome: "IPTU e Tributos Online",
      descricao: "Emissão de 2ª via de IPTU, certidões negativas de débitos municipais e parcelamentos pelo portal oficial.",
      link: "https://www.tupa.sp.gov.br",
      icone: "💳",
      fonte: "Secretaria Municipal de Economia e Finanças (tupa.sp.gov.br)"
    },
    {
      nome: "Nota Fiscal Eletrônica (NFS-e)",
      descricao: "Emissão e autenticação de notas fiscais de serviços para empresas e autônomos de Tupã.",
      link: "https://www.tupa.sp.gov.br",
      icone: "📄",
      fonte: "Departamento de Tributação e Fiscalização de Tupã"
    },
    {
      nome: "Portal da Transparência & LOA",
      descricao: "Consulta em tempo real de receitas, despesas, licitações, folha de pagamento e orçamento municipal (R$ 473M).",
      link: "https://transparencia.tupa.sp.gov.br",
      icone: "📊",
      fonte: "Controladoria Geral do Município de Tupã"
    },
    {
      nome: "Ouvidoria Municipal & e-SIC",
      descricao: "Canal aberto para solicitações de serviços, elogios, denúncias e pedidos da Lei de Acesso à Informação.",
      link: "https://www.tupa.sp.gov.br",
      icone: "📢",
      fonte: "Ouvidoria Geral do Município de Tupã"
    },
    {
      nome: "Saúde e Agendamento de Consultas",
      descricao: "Informações sobre Farmácia Municipal, vacinação nas UBS/ESF e atendimento de urgência na UPA 24h.",
      link: "https://www.tupa.sp.gov.br",
      icone: "🏥",
      fonte: "Secretaria Municipal de Saúde de Tupã"
    },
    {
      nome: "Diário Oficial Eletrônico",
      descricao: "Publicação diária de leis, decretos do prefeito, editais de concursos e atos administrativos oficiais.",
      link: "https://www.tupa.sp.gov.br",
      icone: "📰",
      fonte: "Imprensa Oficial da Estância Turística de Tupã"
    }
  ],

  categorias: [
    {
      id: "economia_renda",
      titulo: "Renda, PIB & Economia",
      icone: "📈",
      badge: "Indicadores Oficiais",
      resumo: "Renda per capita, PIB per capita de R$ 48.934, salário médio e setores produtivos.",
      itens: [
        {
          pergunta: "Qual é a renda per capita e o PIB per capita do tupaense?",
          resposta: "De acordo com os dados oficiais mais recentes do **IBGE** e da **Fundação SEADE**:\n\n" +
            "- **PIB per capita:** **R$ 48.934,77 por habitante ao ano** (o que equivale a cerca de **R$ 4.077,00 mensais** em riqueza gerada por habitante).\n" +
            "- **Salário Médio Formal:** Cerca de **2,0 a 2,2 salários mínimos** mensais para trabalhadores com carteira assinada.\n" +
            "- **Rendimento Médio Domiciliar per capita:** Aproximadamente **R$ 1.680,00 a R$ 1.750,00 mensais** por morador nos domicílios particulares.\n" +
            "- **IDHM (Índice de Desenvolvimento Humano):** **0,770** (faixa de Alto Desenvolvimento Humano no Brasil).",
          palavrasChave: ["renda per capita", "percapita", "pib per capita", "salario medio", "quanto ganha", "renda", "riqueza", "salario tupaense", "pib", "seade"],
          sugestoes: ["Quais são os principais setores de emprego?", "Por que Tupã é a Capital do Amendoim?", "Qual o orçamento da Prefeitura de Tupã?"],
          fonte: "IBGE Cidades (Contas Regionais) e Fundação SEADE (Painel Econômico Paulista)"
        },
        {
          pergunta: "Como se divide a economia e o PIB de Tupã?",
          resposta: "A economia da Estância Turística de Tupã movimenta mais de **R$ 3,12 bilhões anuais** e possui a seguinte composição oficial:\n\n" +
            "1. **Setor de Serviços (68,0%):** O grande motor da cidade, impulsionado pelo forte comércio central da Alta Paulista, saúde regional, rede educacional universitária e administração pública.\n" +
            "2. **Indústria (13,0%):** Destaque para o processamento de alimentos, derivados de amendoim, confeitos, indústria metalmecânica e usinas de bioenergia/açúcar.\n" +
            "3. **Agropecuária (8,8%):** Liderança nacional no cultivo de amendoim, cana-de-açúcar, avicultura de postura (ovos) e pecuária.\n" +
            "4. **Arrecadação de Impostos Líquidos (9,5%):** Tributos sobre a produção e circulação.",
          palavrasChave: ["divisao pib", "setores da economia", "economia de tupa", "industria", "comercio", "agricultura", "pib total"],
          sugestoes: ["Qual é a renda per capita do tupaense?", "Por que Tupã é a Capital do Amendoim?", "Quais os distritos de Tupã?"],
          fonte: "Fundação SEADE e Secretaria Municipal de Desenvolvimento Econômico de Tupã"
        },
        {
          pergunta: "Por que Tupã é chamada de Capital Nacional do Amendoim?",
          resposta: "Tupã é o maior polo das Américas no cultivo, processamento e exportação de **amendoim**!\n\n" +
            "- O solo fértil e o clima favorável da Alta Paulista tornaram a região responsável por grande parte de todo o amendoim processado no país.\n" +
            "- A cidade sedia indústrias modernas de pastas de amendoim, doces (paçoca, pé de moleque), confeitos e grãos in natura certificados com o selo ABICAB.\n" +
            "- Grande parcela da produção é exportada para países da União Europeia, América Latina e Ásia.",
          palavrasChave: ["amendoim", "capital do amendoim", "producao amendoim", "exportacao", "agro", "doces de amendoim"],
          sugestoes: ["Qual a renda per capita do tupaense?", "Como é a EXAPIT em Tupã?", "O que fazer em Varpa?"],
          fonte: "Associação Brasileira da Indústria de Chocolates, Amendoim e Balas (ABICAB) & Prefeitura de Tupã"
        },
        {
          pergunta: "Qual o orçamento anual da Prefeitura de Tupã?",
          resposta: "A Lei Orçamentária Anual (LOA) da Prefeitura de Tupã prevê receitas e despesas estimadas em **R$ 473,77 milhões** para o exercício financeiro.\n\n" +
            "- As maiores fatias do orçamento são destinadas à **Educação** (manutenção de creches, escolas municipais e transporte escolar) e à **Saúde** (Fundo Municipal de Saúde, UPA 24h, postos ESF e convênios hospitalares).\n" +
            "- Os relatórios fiscais completos e licitações são públicos e podem ser consultados no **Portal da Transparência** (transparencia.tupa.sp.gov.br).",
          palavrasChave: ["orcamento", "loa", "quanto arrecada", "dinheiro prefeitura", "receita municipal", "despesas prefeitura"],
          sugestoes: ["Qual o endereço da Prefeitura?", "Onde fica a UPA 24h?", "Como emitir 2ª via de IPTU?"],
          fonte: "Câmara Municipal de Tupã & Portal da Transparência (tupa.sp.gov.br)"
        }
      ]
    },

    {
      id: "prefeitura_servicos",
      titulo: "Prefeitura, Saúde & Cidadão",
      icone: "🏛️",
      badge: "Canais Oficiais",
      resumo: "Endereço do Paço, horários, UPA 24h, telefones de emergência e IPTU.",
      itens: [
        {
          pergunta: "Qual o endereço, telefone e horário da Prefeitura de Tupã?",
          resposta: "Informações oficiais da sede administrativa:\n\n" +
            "- **Endereço:** Praça da Bandeira, nº 800 - Centro - CEP 17600-900 (Paço Municipal).\n" +
            "- **Telefone PABX Geral:** (14) 3404-1000.\n" +
            "- **Horário de Atendimento ao Público:** Segunda a sexta-feira, das 07h30 às 13h30.\n" +
            "- **Expediente Administrativo Interno:** Das 07h30 às 17h00.\n" +
            "- **Portal Oficial na Web:** `www.tupa.sp.gov.br`.",
          palavrasChave: ["prefeitura", "endereco prefeitura", "telefone prefeitura", "horario prefeitura", "paco municipal", "contato prefeitura"],
          sugestoes: ["Como emitir 2ª via de IPTU?", "Onde fica a UPA 24h?", "Qual o orçamento da Prefeitura?"],
          fonte: "Secretaria Municipal de Administração de Tupã (tupa.sp.gov.br)"
        },
        {
          pergunta: "Onde fica a UPA 24h e quais os hospitais de Tupã?",
          resposta: "Em caso de emergências de saúde em Tupã:\n\n" +
            "- **UPA 24 Horas (Pronto Atendimento):** Atendimento médico de urgência ininterrupto na **Rua Guaranis, nº 1822 - Vila Santa Inez**. Telefone: **(14) 3404-2200**.\n" +
            "- **Santa Casa de Misericórdia de Tupã:** Hospital geral de referência regional na **Rua Cherentes, nº 599**. Telefone: **(14) 3404-5555**.\n" +
            "- **SAMU:** Ligue **192** para resgate de urgência.\n" +
            "- **Corpo de Bombeiros:** Ligue **193**.",
          palavrasChave: ["upa", "upa 24h", "santa casa", "hospital", "pronto socorro", "medico", "emergencia medica", "samu"],
          sugestoes: ["Quais os telefones de emergência?", "Qual o endereço da Prefeitura?", "Como agendar consulta municipal?"],
          fonte: "Secretaria Municipal de Saúde de Tupã & Diretoria Regional de Saúde (DRS IX)"
        },
        {
          pergunta: "Como emitir 2ª via de IPTU e certidões na Prefeitura?",
          resposta: "Você pode emitir sua 2ª via de IPTU ou certidões municipais de duas formas:\n\n" +
            "1. **Online (24h por dia):** Acesse **www.tupa.sp.gov.br**, clique no menu **Cidadão > 2ª Via de IPTU**, digite o número de cadastro do imóvel ou CPF/CNPJ.\n" +
            "2. **Presencialmente:** No Paço Municipal (Praça da Bandeira, 800), de segunda a sexta, das 07h30 às 13h30.",
          palavrasChave: ["iptu", "segunda via iptu", "certidao negativa", "tributos", "imposto municipal", "pagar iptu"],
          sugestoes: ["Qual o telefone da Prefeitura?", "Onde fica a UPA 24h?", "Qual a renda per capita de Tupã?"],
          fonte: "Secretaria Municipal de Economia e Finanças (tupa.sp.gov.br/iptu)"
        }
      ]
    },

    {
      id: "turismo_cultura",
      titulo: "Turismo, Varpa & Cultura",
      icone: "🏺",
      badge: "Estância Turística",
      resumo: "Museu Índia Vanuíre, Solar Luiz de Souza Leão, Distrito de Varpa e roteiros.",
      itens: [
        {
          pergunta: "Quais são os principais pontos turísticos de Tupã?",
          resposta: "Como Estância Turística oficial do Estado de SP, os principais atrativos são:\n\n" +
            "1. **Museu Histórico e Pedagógico Índia Vanuíre:** Um dos 3 maiores museus de etnologia indígena do Brasil (Rua Coroados, 521 - Centro).\n" +
            "2. **Solar Luiz de Souza Leão:** Mansão histórica do fundador com mobiliário de época e bosque nativo preservado (Rua Caingangs, 600).\n" +
            "3. **Distrito de Varpa (Caminhos da Letônia):** Colônia europeia fundada em 1922 com o Museu Janis Erdbergs, artesanato, queijos e defumados.\n" +
            "4. **Praça da Bandeira e Igreja Matriz de São Pedro:** O coração da cidade com fonte luminosa e concha acústica.\n" +
            "5. **Turismo Aquático & Termal:** Eco Thermas Tupã, Recanto das Águas e o Balneário Sete de Setembro em Varpa.",
          palavrasChave: ["turismo", "pontos turisticos", "o que visitar", "passeios em tupa", "roteiro turistico", "atracoes"],
          sugestoes: ["Como visitar o Museu Índia Vanuíre?", "O que fazer em Varpa?", "Sugira um roteiro de fim de semana"],
          fonte: "Secretaria Municipal de Turismo de Tupã (turismo.tupa.sp.gov.br) & SISEM-SP"
        },
        {
          pergunta: "Como visitar o Museu Índia Vanuíre (horários e acervo)?",
          resposta: "O **Museu Histórico e Pedagógico Índia Vanuíre** é um orgulho nacional situado na **Rua Coroados, 521 - Centro**.\n\n" +
            "- **Funcionamento:** De terça a domingo, das 09h às 18h (às quintas-feiras com horário estendido até 20h).\n" +
            "- **Entrada:** Totalmente Gratuita.\n" +
            "- **Acervo:** Mais de 38.000 peças etnográficas que retratam as etnias Kaingang, Krenak, Terena e Guarani, além da história dos pioneiros.",
          palavrasChave: ["museu india vanuire", "museu", "horario museu", "endereco museu", "acervo indigena", "vanuire"],
          sugestoes: ["Quem foi a Índia Vanuíre?", "O que é o Solar Luiz de Souza Leão?", "O que fazer em Varpa?"],
          fonte: "Museu Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br) & ACAM Portinari"
        },
        {
          pergunta: "O que encontrar no Distrito de Varpa e colônia da Letônia?",
          resposta: "O **Distrito de Varpa** foi fundado em novembro de 1922 por imigrantes batistas da Letônia que cruzaram o oceano em busca de liberdade religiosa.\n\n" +
            "- **Museu dos Pioneiros 'Janis Erdbergs':** Instalado na antiga igreja batista em madeira rústica, com objetos originais dos colonos.\n" +
            "- **Gastronomia Típica:** Pão escuro de centeio, queijo de caraway, linguiças e carnes defumadas no fogão a lenha, mel puro e biscoitos natalinos piparkūkas.\n" +
            "- **Ecoturismo:** A bucólica **Cachoeira do Palma** e o **Balneário Sete de Setembro**.",
          palavrasChave: ["varpa", "distrito de varpa", "letonia", "letos", "imigracao leta", "museu dos pioneiros", "erdbergs"],
          sugestoes: ["Quais os outros distritos de Tupã?", "Como visitar o Museu Índia Vanuíre?", "Qual a renda per capita de Tupã?"],
          fonte: "Associação Cultural e Comunitária de Varpa & Secretaria de Turismo de Tupã"
        }
      ]
    },

    {
      id: "historia_fundacao",
      titulo: "História, Fundação & Origens",
      icone: "📜",
      badge: "12 de Outubro de 1929",
      resumo: "Luiz de Souza Leão, o nome Tupi de Deus e a pacificadora Índia Vanuíre.",
      itens: [
        {
          pergunta: "Como e quando Tupã foi fundada?",
          resposta: "Tupã foi fundada oficialmente em **12 de outubro de 1929** por **Luiz de Souza Leão**.\n\n" +
            "- Ele adquiriu terras no espigão entre as bacias dos rios Aguapeí (Feio) e do Peixe.\n" +
            "- Visionário, traçou ruas e avenidas com **30 metros de largura**, garantindo iluminação natural, arborização e um planejamento urbano exemplar para a época.\n" +
            "- O dia 12 de outubro foi escolhido por ser o Dia de Nossa Senhora Aparecida e Dia da Criança.",
          palavrasChave: ["fundacao", "fundador", "luiz de souza leao", "historia de tupa", "12 de outubro de 1929", "quando foi fundada"],
          sugestoes: ["Por que a cidade se chama Tupã?", "Quem foi a Índia Vanuíre?", "O que é o Solar Luiz de Souza Leão?"],
          fonte: "Arquivo Histórico Municipal de Tupã & Museu dos Pioneiros"
        },
        {
          pergunta: "Qual o significado do nome Tupã?",
          resposta: "O nome **Tupã** vem da língua indígena **Tupi-Guarani** e significa o **Deus do Trovão** ou o Ser Supremo Criador da natureza.\n\n" +
            "- O fundador Luiz de Souza Leão escolheu o nome para prestar reverência e honra perpétua aos povos indígenas que habitavam as matas primitivas do Oeste Paulista.",
          palavrasChave: ["origem do nome", "significado tupa", "tupi", "deus do trovao", "por que tupa"],
          sugestoes: ["Quem foi a Índia Vanuíre?", "Como Tupã foi fundada?", "Quais faculdades existem em Tupã?"],
          fonte: "Secretaria Municipal de Cultura de Tupã & Museu Índia Vanuíre"
        },
        {
          pergunta: "Quem foi a Índia Vanuíre?",
          resposta: "A **Índia Vanuíre** (da etnia Kaingang) foi uma pacificadora histórica que viveu no início do século XX.\n\n" +
            "- Ela subia nas árvores e cantava melodias ancestrais kaingang para estabelecer contato e impedir massacres entre índios e os desbravadores da ferrovia.\n" +
            "- Por sua nobreza e mediação de paz, tornou-se patrona de Tupã e dá nome ao museu etnográfico mais célebre do interior do Brasil.",
          palavrasChave: ["quem foi vanuire", "india vanuire", "kaingang", "pacificadora", "historia indigena"],
          sugestoes: ["Como visitar o Museu Índia Vanuíre?", "Qual a história da fundação?", "O que fazer em Varpa?"],
          fonte: "Acervo Etnográfico do Museu Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br)"
        }
      ]
    },

    {
      id: "educacao_ensino",
      titulo: "Educação Superior (FADAP & UNESP)",
      icone: "🎓",
      badge: "Polo Universitário",
      resumo: "Polo com FADAP (Faculdades da Alta Paulista), UNESP (FCE), ETEC e FATEC.",
      itens: [
        {
          pergunta: "Quais faculdades e universidades existem em Tupã?",
          resposta: "Tupã é um dos polos de ensino superior mais conceituados do Oeste Paulista:\n\n" +
            "- **FADAP / FAP (Faculdade da Alta Paulista):** Tradicional instituição privada, formadora de gerações de juízes, promotores, advogados, administradores e profissionais de destaque regional.\n" +
            "- **UNESP Campus Tupã (FCE - Faculdade de Ciências e Engenharia):** Campus público estadual com cursos de excelência nacional em **Engenharia de Biossistemas** e **Administração**, além de mestrado e pós-graduação.\n" +
            "- **ETEC Prof. Massuyuki Kawano:** Cursos técnicos de alta qualificação vinculados ao Centro Paula Souza.\n" +
            "- **FATEC Tupã:** Faculdade de Tecnologia pública com cursos superiores tecnólogos voltados ao mercado.",
          palavrasChave: ["faculdades", "universidades", "fadap", "fap", "unesp", "etec", "fatec", "cursos superiores", "estudar em tupa"],
          sugestoes: ["Qual o papel da FADAP em Tupã?", "Quais cursos a UNESP oferece?", "Qual a renda per capita de Tupã?"],
          fonte: "Ministério da Educação (MEC) & Unesp Campus Tupã (fce.unesp.br)"
        }
      ]
    }
  ],

  curiosidades: [
    { texto: "O PIB per capita de Tupã é de R$ 48.934,77 por ano, impulsionado pelo comércio, serviços e a indústria de amendoim.", fonte: "IBGE Contas Regionais / Fundação SEADE" },
    { texto: "A cidade foi planejada em 1929 com avenidas de 30 metros de largura para garantir iluminação e ventilação permanentes.", fonte: "Arquivo Histórico Municipal de Tupã" },
    { texto: "O Distrito de Varpa concentra a maior comunidade de descendentes da Letônia de toda a América do Sul!", fonte: "Museu dos Pioneiros Janis Erdbergs" },
    { texto: "O Museu Índia Vanuíre possui uma das 3 maiores coleções etnográficas indígenas de todo o território brasileiro.", fonte: "SISEM-SP e Secretaria de Cultura do Estado de SP" },
    { texto: "O orçamento anual da Prefeitura de Tupã ultrapassa R$ 473 milhões, sendo a maior parte para Saúde e Educação.", fonte: "Lei Orçamentária Anual (LOA) / Câmara Municipal" },
    { texto: "A UPA 24 Horas de Tupã fica na Rua Guaranis, 1822, com pronto atendimento ininterrupto.", fonte: "Secretaria Municipal de Saúde de Tupã" }
  ]
};

// Prompt do Sistema para IA Generativa com instrução estrita de fontes e tom escuro
const TUPA_SYSTEM_PROMPT = `Você é o Tupã IA, o assistente virtual especialista oficial da Estância Turística de Tupã (SP).
Seu conhecimento é fundamentado nos dados institucionais oficiais da Prefeitura de Tupã (tupa.sp.gov.br), IBGE Cidades, Fundação SEADE e órgãos culturais:
- Indicadores Econômicos: PIB per capita de R$ 48.934,77/ano, salário médio de 2,0 a 2,2 salários mínimos, renda domiciliar per capita de aprox. R$ 1.700, IDHM de 0,770 (Alto) e orçamento municipal de R$ 473M.
- Divisão do PIB: Serviços 68%, Indústria 13%, Impostos 9,5%, Agropecuária 8,8%.
- Capital Nacional do Amendoim e polo avícola.
- História: Fundação em 12/10/1929 por Luiz de Souza Leão, traçado urbano de 30m, Índia Vanuíre e Museu Índia Vanuíre (Rua Coroados, 521).
- Casarão Solar Luiz de Souza Leão (Rua Caingangs, 600 - tombado pelo CONDEPHAAT).
- Distritos: Varpa (colonização letã de 1922, Museu Janis Erdbergs, gastronomia), Parnaso e Universo.
- Faculdades: FADAP (Faculdades da Alta Paulista) e UNESP (FCE - Engenharia de Biossistemas e Administração).
- Serviços e Saúde: Paço Municipal (Praça da Bandeira, 800 - PABX 14 3404-1000), UPA 24h (Rua Guaranis, 1822), Santa Casa (Rua Cherentes, 599).

REGRAS DE RESPOSTA:
1. Responda DIRETAMENTE à pergunta do usuário com dados exatos e tom atencioso, interativo e prestativo.
2. Nunca confunda palavras (por exemplo: "tupaense" não é a sigla UPA!).
3. OBRIGATÓRIO: Ao final de cada resposta, adicione uma linha explícita citando a fonte:
   📚 **Fonte Oficial:** [Nome da Fonte / Portal Oficial tupa.sp.gov.br / IBGE / Órgão Responsável]`;

if (typeof module !== 'undefined') {
  module.exports = { TUPA_KNOWLEDGE_BASE, TUPA_SYSTEM_PROMPT };
}
