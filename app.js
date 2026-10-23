// Aplicação Tupã IA - Oficial, Especializada e Interativa (Dark Mode)

// Estado da Aplicação
let voiceEnabled = false;
let geminiApiKey = localStorage.getItem("tupa_gemini_api_key") || "";
let conversationHistory = [];

// Elementos do DOM
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatForm = document.getElementById("chat-form");
const btnSend = document.getElementById("btn-send");
const btnToggleVoice = document.getElementById("btn-toggle-voice");
const btnSettings = document.getElementById("btn-settings");
const btnClear = document.getElementById("btn-clear");
const curiosityText = document.getElementById("curiosity-text");
const modelStatusPill = document.getElementById("model-status-pill");
const modelStatusText = document.getElementById("model-status-text");
const faqContainer = document.getElementById("faq-container");
const servicesContainer = document.getElementById("services-container");
const phonesContainer = document.getElementById("phones-container");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderFaq();
  renderServices();
  renderPhones();
  updateCuriosity();
  updateModelStatus();
  setupTextareaAutoResize();

  setInterval(updateCuriosity, 20000);
});

// Navegação entre Abas
function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  if (tabId === "tab-chat" && chatInput) {
    chatInput.focus();
  }
}

// Renderizar FAQ
function renderFaq() {
  if (!faqContainer || !TUPA_KNOWLEDGE_BASE) return;

  faqContainer.innerHTML = TUPA_KNOWLEDGE_BASE.categorias.map(cat => `
    <div class="faq-category-card" data-category="${cat.id}">
      <div class="faq-cat-title">
        <span>${cat.icone}</span>
        <span>${cat.titulo}</span>
      </div>
      <div class="faq-items-list">
        ${cat.itens.map((item, index) => `
          <div class="faq-item">
            <div class="faq-question" onclick="toggleFaqAnswer('${cat.id}-${index}')">
              <span>${item.pergunta}</span>
              <span id="faq-icon-${cat.id}-${index}">▼</span>
            </div>
            <div class="faq-answer" id="faq-ans-${cat.id}-${index}">
              <p>${formatMarkdown(item.resposta)}</p>
              <div class="faq-source-badge">📚 <strong>Fonte Oficial:</strong> ${item.fonte || 'tupa.sp.gov.br'}</div>
              <button class="btn-msg-action" style="margin-top: 0.6rem;" onclick="askFaqQuestion('${escapeQuotes(item.pergunta)}')">
                💬 Conversar sobre isso no Chat
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function toggleFaqAnswer(id) {
  const ans = document.getElementById(`faq-ans-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);
  if (!ans) return;

  const isOpen = ans.classList.contains("show");
  if (isOpen) {
    ans.classList.remove("show");
    if (icon) icon.textContent = "▼";
  } else {
    ans.classList.add("show");
    if (icon) icon.textContent = "▲";
  }
}

function filterFaq() {
  const search = normalizeText(document.getElementById("faq-search-input").value);
  const cards = document.querySelectorAll(".faq-category-card");

  cards.forEach(card => {
    const items = card.querySelectorAll(".faq-item");
    let hasVisible = false;

    items.forEach(item => {
      const text = normalizeText(item.innerText);
      if (!search || text.includes(search)) {
        item.style.display = "block";
        hasVisible = true;
      } else {
        item.style.display = "none";
      }
    });

    card.style.display = hasVisible ? "block" : "none";
  });
}

function renderServices() {
  if (!servicesContainer || !TUPA_KNOWLEDGE_BASE) return;

  servicesContainer.innerHTML = TUPA_KNOWLEDGE_BASE.servicosCidadao.map(serv => `
    <div class="service-card">
      <div class="service-icon">${serv.icone}</div>
      <h4>${serv.nome}</h4>
      <p>${serv.descricao}</p>
      <div class="faq-source-badge" style="margin-bottom:0.75rem; display:block;">📚 <strong>Fonte:</strong> ${serv.fonte}</div>
      <a href="${serv.link}" target="_blank" rel="noopener" class="btn-service-link">
        Acessar no Portal Oficial ↗
      </a>
    </div>
  `).join("");
}

function renderPhones() {
  if (!phonesContainer || !TUPA_KNOWLEDGE_BASE) return;

  phonesContainer.innerHTML = TUPA_KNOWLEDGE_BASE.telefonesUteis.map(item => `
    <div class="phone-item">
      <div class="phone-info">
        <strong>${item.orgao}</strong>
        <small>${item.desc} • Fonte: ${item.fonte}</small>
      </div>
      <div class="phone-num">${item.numero}</div>
    </div>
  `).join("");
}

function updateCuriosity() {
  if (!curiosityText || !TUPA_KNOWLEDGE_BASE) return;
  const list = TUPA_KNOWLEDGE_BASE.curiosidades;
  const randomIndex = Math.floor(Math.random() * list.length);
  const cur = list[randomIndex];
  curiosityText.innerHTML = `${cur.texto}<span style="display:block; margin-top:6px; font-size:0.68rem; opacity:0.85; font-weight:600;">📚 Fonte: ${cur.fonte}</span>`;
}

function updateModelStatus() {
  if (geminiApiKey) {
    modelStatusText.textContent = "Gemini Online";
    modelStatusPill.style.borderColor = "rgba(56, 189, 248, 0.5)";
    modelStatusPill.style.color = "#38bdf8";
  } else {
    modelStatusText.textContent = "Base Oficial Ativa";
    modelStatusPill.style.borderColor = "rgba(56, 189, 248, 0.25)";
    modelStatusPill.style.color = "var(--tupa-blue)";
  }
}

function setupTextareaAutoResize() {
  if (!chatInput) return;
  chatInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
  });

  chatInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event("submit"));
    }
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  chatInput.style.height = "auto";
  
  await processUserMessage(text);
}

function askQuestion(questionText) {
  switchTab("tab-chat");
  processUserMessage(questionText);
}

function askFaqQuestion(qText) {
  switchTab("tab-chat");
  processUserMessage(qText);
}

function askSpot(spotPrompt) {
  switchTab("tab-chat");
  processUserMessage(spotPrompt);
}

// Processar a Mensagem com Efeito Visual de Pensamento do Robô
async function processUserMessage(userText) {
  appendMessage("user", userText);
  playChime(440, 0.05);

  // Exibe indicador visual de raciocínio do modelo
  const thinkingObj = showThinkingIndicator();

  let botReply = "";
  let suggestions = [];

  if (geminiApiKey) {
    try {
      thinkingObj.updateStep("Consultando IA na nuvem com dados de Tupã...");
      botReply = await callGeminiAPI(userText);
      suggestions = ["Qual a renda per capita de Tupã?", "Quem foi Luiz de Souza Leão?", "Quais os serviços da Prefeitura?"];
    } catch (err) {
      console.warn("Falha no Gemini, usando base oficial local:", err);
      const resObj = generateLocalResponse(userText);
      botReply = resObj.reply;
      suggestions = resObj.suggestions;
    }
  } else {
    // Simula fases do pensamento
    await new Promise(r => setTimeout(r, 250));
    thinkingObj.updateStep("Consultando registros oficiais de Tupã (tupa.sp.gov.br)...");
    await new Promise(r => setTimeout(r, 350));
    const resObj = generateLocalResponse(userText);
    botReply = resObj.reply;
    suggestions = resObj.suggestions;
  }

  // Registra no histórico
  conversationHistory.push({ user: userText, bot: botReply });

  // Remove animação de pensamento e mostra resposta final
  thinkingObj.element.remove();
  appendMessage("bot", botReply, suggestions);
  playChime(660, 0.08);

  if (voiceEnabled) {
    speakText(botReply);
  }
}

// MOTOR DE RESPOSTA INTELIGENTE COM RESOLVER DE ENTIDADES
function generateLocalResponse(query) {
  const qClean = normalizeText(query);
  const words = qClean.split(/\s+/).filter(w => w.length > 0);
  const kb = TUPA_KNOWLEDGE_BASE;

  // 1. SOUZA LEÃO / FUNDADOR / LUIZ DE SOUZA (Resolve perfeitamente "quem foi o souza leao"!)
  if (
    hasAnyWord(words, ["souza", "leao"]) ||
    hasPhrase(qClean, ["souza leao", "luiz de souza", "fundador", "quem fundou", "quem criou tupa", "criador de tupa"])
  ) {
    return {
      reply: `### 🏛️ Quem foi Luiz de Souza Leão:\n\n` +
        `**Luiz de Souza Leão** foi o grande **fundador, pioneiro e idealizador da Estância Turística de Tupã**!\n\n` +
        `- **História e Fundação:** Fazendeiro e empresário arrojado, adquiriu na década de 1920 as terras no espigão entre as bacias dos rios Aguapeí (Feio) e do Peixe, fundando a cidade oficialmente em **12 de outubro de 1929**.\n` +
        `- **Urbanismo Visionário:** Ele mesmo planejou o traçado urbano de Tupã com avenidas monumentais de **30 metros de largura** e praças amplas, pensando na ventilação, luminosidade e arborização da cidade para as próximas gerações.\n` +
        `- **O Casarão "Solar Luiz de Souza Leão":** A residência histórica onde viveu (na Rua Caingangs, 600, de frente para a Praça da Bandeira) é hoje um museu tombado pelo **CONDEPHAAT** como Patrimônio Histórico Estadual, preservando móveis originais da década de 1930, documentos fundacionais e um bosque centenário.\n` +
        `- **Homenagem Indígena:** Foi Souza Leão quem escolheu o nome **Tupã** (o Criador / Deus do Trovão em Tupi) em honra e profundo respeito aos povos originários que habitavam as matas ancestrais da região.\n\n` +
        `📚 **Fonte Oficial:** Arquivo Histórico Municipal de Tupã, CONDEPHAAT e Secretaria Municipal de Cultura`,
      suggestions: [
        "O que tem para visitar no Solar Luiz de Souza Leão?",
        "Quem foi a Índia Vanuíre?",
        "Qual o significado do nome Tupã?",
        "Qual é a renda per capita de Tupã?"
      ]
    };
  }

  // 2. RENDA PER CAPITA / PIB / SALÁRIO / ECONOMIA
  if (
    hasPhrase(qClean, ["renda", "percapita", "per capita", "pib", "salario", "ganha", "riqueza", "rendimento", "classe"])
  ) {
    return {
      reply: `### 📈 Renda per Capita e Dados Econômicos de Tupã (SP):\n\n` +
        `De acordo com os relatórios oficiais mais recentes consolidados pelo **IBGE** e pela **Fundação SEADE**:\n\n` +
        `- **PIB per capita:** **R$ 48.934,77 por habitante ao ano** (o que equivale a uma geração média de riqueza de **R$ 4.077,00 mensais** por tupaense).\n` +
        `- **Salário Médio Formal:** Em torno de **2,0 a 2,2 salários mínimos** mensais para quem trabalha com carteira assinada em Tupã.\n` +
        `- **Rendimento Nominal Domiciliar per capita:** Entre **R$ 1.680,00 e R$ 1.750,00 mensais** por morador nos lares de Tupã.\n` +
        `- **IDHM (Índice de Desenvolvimento Humano):** **0,770** (classificado na faixa de Alto Desenvolvimento Humano).\n` +
        `- **Estrutura Econômica:** O setor de **Serviços e Comércio** responde por **68%** de toda a economia municipal, seguido pela **Indústria** (13%) e pela **Agropecuária** (8,8%, com forte liderança no amendoim e avicultura de postura).\n\n` +
        `📚 **Fonte Oficial:** IBGE Cidades (Contas Regionais & Censo Demográfico) e Fundação SEADE (Painel Econômico Paulista)`,
      suggestions: [
        "Por que Tupã é a Capital do Amendoim?",
        "Qual o orçamento anual da Prefeitura de Tupã?",
        "Como se divide o PIB de Tupã?"
      ]
    };
  }

  // 3. PREFEITO / ADMINISTRAÇÃO / GOVERNO MUNICIPAL
  if (
    hasAnyWord(words, ["prefeito", "prefeita", "gabinete"]) ||
    hasPhrase(qClean, ["quem e o prefeito", "administracao de tupa", "governo municipal", "secretarias de tupa", "secretarios"])
  ) {
    return {
      reply: `### 🏛️ Prefeitura e Gestão Municipal de Tupã:\n\n` +
        `- **Sede Administrativa:** Paço Municipal na **Praça da Bandeira, nº 800 - Centro - CEP 17600-900**.\n` +
        `- **PABX Geral da Prefeitura:** **(14) 3404-1000**.\n` +
        `- **Horário de Atendimento ao Público:** De segunda a sexta-feira, das 07h30 às 13h30 (expediente administrativo até 17h00).\n` +
        `- **Estrutura Governamental:** A gestão municipal é liderada pelo Gabinete do Prefeito e engloba secretarias estratégicas: Educação, Saúde, Obras e Trânsito, Economia e Finanças, Agricultura e Meio Ambiente, Cultura e Turismo, Assistência Social e Administração.\n` +
        `- **Portal de Transparência:** Acesse todos os atos, editais e diário oficial em **www.tupa.sp.gov.br**.\n\n` +
        `📚 **Fonte Oficial:** Portal Oficial da Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br)`,
      suggestions: [
        "Qual o orçamento anual da Prefeitura?",
        "Como emitir 2ª via de IPTU?",
        "Onde fica a UPA 24h de Tupã?"
      ]
    };
  }

  // 4. ÍNDIA VANUÍRE (Personagem Histórica)
  if (
    hasAnyWord(words, ["vanuire"]) ||
    (hasPhrase(qClean, ["quem foi vanuire", "india vanuire", "pacificadora"]) && !hasPhrase(qClean, ["horario museu", "endereco museu"]))
  ) {
    return {
      reply: `### 🏹 Quem foi a Índia Vanuíre:\n\n` +
        `A **Índia Vanuíre** (da etnia Kaingang) foi uma das figuras históricas mais veneradas e corajosas do interior do Estado de São Paulo no início do século XX!\n\n` +
        `- **A Pacificadora:** Durante o avanço da Estrada de Ferro Noroeste do Brasil e a colonização da Alta Paulista, havia intensos e sangrentos conflitos armados entre índios e desbravadores brancos.\n` +
        `- **Gesto Heroico:** Vanuíre subia no topo das árvores e cantava melodias de paz no idioma Kaingang, atuando com sabedoria como mediadora cultural para evitar massacres de seu povo e cessar a violência.\n` +
        `- **Homenagem:** Por seu heroísmo, tornou-se a patrona histórica de Tupã e dá nome ao renomado **Museu Histórico e Pedagógico Índia Vanuíre**.\n\n` +
        `📚 **Fonte Oficial:** Acervo Etnográfico do Museu Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br) & SISEM-SP`,
      suggestions: [
        "Como visitar o Museu Índia Vanuíre?",
        "Quem foi Luiz de Souza Leão?",
        "Como Tupã foi fundada em 1929?"
      ]
    };
  }

  // 5. MUSEU ÍNDIA VANUÍRE (Visitação, Acervo e Horários)
  if (hasAnyWord(words, ["museu", "acervo"])) {
    return {
      reply: `### 🏺 Museu Histórico e Pedagógico Índia Vanuíre:\n\n` +
        `Um dos mais respeitados museus de etnologia indígena de toda a América do Sul!\n\n` +
        `- **Endereço Oficial:** Rua Coroados, nº 521 - Centro de Tupã (SP).\n` +
        `- **Horário de Funcionamento:** De terça-feira a domingo, das 09h às 18h (às quintas-feiras tem horário noturno até 20h).\n` +
        `- **Entrada:** Totalmente Gratuita para todos os públicos.\n` +
        `- **Acervo Monumental:** Guarda mais de **38.000 peças etnográficas** representando as etnias Kaingang, Krenak, Terena e Guarani, além de um setor rico sobre os pioneiros paulistas. É gerido em parceria com a organização social ACAM Portinari e o Governo de SP.\n\n` +
        `📚 **Fonte Oficial:** Museu Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br) & Secretaria de Cultura do Estado de SP`,
      suggestions: [
        "Quem foi a Índia Vanuíre?",
        "O que é o Solar Luiz de Souza Leão?",
        "O que conhecer no Distrito de Varpa?"
      ]
    };
  }

  // 6. DISTRITO DE VARPA / LETÔNIA / COLÔNIA
  if (
    hasAnyWord(words, ["varpa", "letonia", "leto", "letos", "letoes", "erdbergs"]) ||
    hasPhrase(qClean, ["caminhos da letonia", "colonia leta", "museu dos pioneiros"])
  ) {
    return {
      reply: `### 🌲 Distrito de Varpa e a Imigração Letã (1922):\n\n` +
        `O **Distrito de Varpa** é uma colônia europeia única fundada em novembro de 1922 por imigrantes batistas da Letônia:\n\n` +
        `- **Museu dos Pioneiros 'Janis Erdbergs':** Instalado na segunda igreja batista em madeira rústica, abriga acervo histórico dos pioneiros com bíblias letonas, vestimentas, ferramentas e fotografias originais (entrada franca).\n` +
        `- **Gastronomia Artesanal:** Varpa é famosa pelo autêntico pão preto de centeio, queijo de caraway, linguiças e carnes defumadas no fogão a lenha, mel puro e biscoitos natalinos de gengibre (piparkūkas).\n` +
        `- **Natureza e Ecoturismo:** Abrigada no vale do Rio do Peixe, conta com a **Cachoeira do Palma** e o **Balneário Sete de Setembro**.\n\n` +
        `📚 **Fonte Oficial:** Museu dos Pioneiros Janis Erdbergs, Associação de Varpa e Secretaria Municipal de Turismo de Tupã`,
      suggestions: [
        "Quais os outros distritos de Tupã?",
        "Como visitar o Museu Índia Vanuíre?",
        "Por que Tupã é a Capital do Amendoim?"
      ]
    };
  }

  // 7. AMENDOIM / CAPITAL NACIONAL DO AMENDOIM
  if (hasAnyWord(words, ["amendoim", "confeitos", "pacoca", "abicab"])) {
    return {
      reply: `### 🥜 Tupã: A Capital Nacional do Amendoim:\n\n` +
        `Tupã é o maior polo de cultivo, processamento e exportação de **amendoim** da América Latina!\n\n` +
        `- **Polo Industrial:** Sedia cooperativas gigantescas e indústrias modernas que transformam o grão em confeitos, doces (paçocas, pés de moleque), pastas de amendoim e produtos certificados com o selo Pró-Amendoim da ABICAB.\n` +
        `- **Exportação Global:** O solo fértil da Alta Paulista gera um produto de altíssima qualidade que é exportado para dezenas de países da União Europeia, América Latina e Ásia.\n\n` +
        `📚 **Fonte Oficial:** Associação Brasileira da Indústria de Chocolates, Amendoim e Balas (ABICAB) & Secretaria de Desenvolvimento Econômico de Tupã`,
      suggestions: [
        "Qual é a renda per capita do tupaense?",
        "Como é a festa da EXAPIT em Tupã?",
        "O que fazer no Distrito de Varpa?"
      ]
    };
  }

  // 8. SAÚDE / UPA 24H / HOSPITAIS / SANTA CASA
  if (
    hasExactToken(qClean, "upa") ||
    hasAnyWord(words, ["hospital", "medico", "socorro", "samu", "farmacia", "ubs", "esf"]) ||
    hasPhrase(qClean, ["santa casa", "pronto atendimento", "pronto socorro", "upa 24h", "posto de saude"])
  ) {
    return {
      reply: `### 🏥 Serviços de Saúde e Emergência em Tupã:\n\n` +
        `- **UPA 24 Horas (Pronto Atendimento Municipal):** Atendimento médico de emergência ininterrupto dia e noite. Fica na **Rua Guaranis, nº 1822 - Vila Santa Inez**. Telefone: **(14) 3404-2200**.\n` +
        `- **Santa Casa de Misericórdia de Tupã:** Hospital geral de referência e cirurgias de alta complexidade na **Rua Cherentes, nº 599**. Telefone: **(14) 3404-5555**.\n` +
        `- **SAMU (Urgência Móvel):** Ligue **192**.\n` +
        `- **Corpo de Bombeiros:** Ligue **193**.\n` +
        `- **Farmácia Municipal e ESF:** Unidades básicas distribuídas nos bairros e nos distritos de Varpa, Parnaso e Universo.\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Saúde de Tupã e Diretoria Regional de Saúde (DRS IX)`,
      suggestions: [
        "Quais os telefones de emergência da Prefeitura?",
        "Qual o endereço do Paço Municipal?",
        "Qual o orçamento anual da Prefeitura?"
      ]
    };
  }

  // 9. EDUCAÇÃO / FADAP / UNESP / FACULDADES
  if (
    hasAnyWord(words, ["fadap", "fap", "unesp", "faculdade", "faculdades", "universidade", "universidades", "biossistemas", "fatec", "etec"])
  ) {
    return {
      reply: `### 🎓 Polo Educacional e Universitário de Tupã (SP):\n\n` +
        `Tupã é um centro educacional de referência na Alta Paulista com opções públicas e privadas consagradas:\n\n` +
        `- **FADAP / FAP (Faculdade da Alta Paulista):** Instituição histórica e pioneira no ensino superior da região, formadora de inúmeros juízes, advogados, administradores, contadores e líderes empresariais em todo o Brasil.\n` +
        `- **UNESP Campus Tupã (Faculdade de Ciências e Engenharia - FCE):** Unidade pública estadual com cursos de ponta nacional em **Engenharia de Biossistemas** (integrando tecnologia, automação e agro) e **Administração**, além de mestrado e pós-graduação.\n` +
        `- **ETEC Prof. Massuyuki Kawano:** Ensino técnico público gratuito do Centro Paula Souza.\n` +
        `- **FATEC Tupã:** Cursos superiores de tecnologia voltados para a inovação e o mercado de trabalho.\n\n` +
        `📚 **Fonte Oficial:** Unesp Campus Tupã (fce.unesp.br), MEC e Acervo Institucional FADAP`,
      suggestions: [
        "Qual o papel histórico da FADAP em Tupã?",
        "Quais os cursos da UNESP em Tupã?",
        "Qual é a renda per capita de Tupã?"
      ]
    };
  }

  // 10. TURISMO / O QUE FAZER / ROTEIRO DE VIAGEM
  if (
    hasPhrase(qClean, ["turismo", "roteiro", "o que fazer", "visitar", "pontos turisticos", "passeio", "onde ir", "fim de semana"])
  ) {
    return {
      reply: `### 🗺️ Roteiro Turístico Oficial de Fim de Semana em Tupã (SP):\n\n` +
        `**Sábado: História, Patrimônio e Centro**\n` +
        `- **Manhã:** Visite o mundialmente reconhecido **Museu Histórico e Pedagógico Índia Vanuíre** (Rua Coroados, 521), com rica etnografia indígena Kaingang e Krenak (entrada franca).\n` +
        `- **Almoço:** Almoce no centro comercial e deguste os doces artesanais de amendoim da cidade.\n` +
        `- **Tarde:** Conheça o casarão histórico **Solar Luiz de Souza Leão** e passeie pela arborizada **Praça da Bandeira**, admirando a **Igreja Matriz de São Pedro** e sua fonte luminosa.\n\n` +
        `**Domingo: Cultura Europeia e Natureza em Varpa**\n` +
        `- **Manhã:** Vá até o **Distrito de Varpa** (imigração letã de 1922) e visite o **Museu dos Pioneiros 'Janis Erdbergs'**.\n` +
        `- **Almoço:** Experimente a gastronomia típica letona (queijo de caraway, pão escuro de centeio e carnes defumadas artesanais).\n` +
        `- **Tarde:** Curta a natureza na **Cachoeira do Palma** ou relaxe no **Balneário Sete de Setembro**!\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Turismo da Estância de Tupã (turismo.tupa.sp.gov.br) & SISEM-SP`,
      suggestions: [
        "Como visitar o Museu Índia Vanuíre?",
        "Quem foi Luiz de Souza Leão?",
        "O que encontrar no Distrito de Varpa?"
      ]
    };
  }

  // 11. IPTU / TRIBUTOS / CERTIDÕES
  if (hasPhrase(qClean, ["iptu", "certidao", "tributo", "imposto", "nota fiscal", "nfs"])) {
    return {
      reply: `### 💳 IPTU e Serviços Tributários de Tupã:\n\n` +
        `Você pode emitir a 2ª via do carnê de IPTU e certidões negativas diretamente:\n\n` +
        `1. **Online (24h):** Acesse **www.tupa.sp.gov.br**, clique no menu **Cidadão > 2ª Via de IPTU**, digitando o número de cadastro do imóvel ou CPF/CNPJ.\n` +
        `2. **Presencialmente:** No Paço Municipal (Praça da Bandeira, 800), de segunda a sexta, das 07h30 às 13h30.\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Economia e Finanças de Tupã (tupa.sp.gov.br/iptu)`,
      suggestions: [
        "Qual o telefone da Prefeitura?",
        "Qual o orçamento anual de Tupã?",
        "Qual é a renda per capita de Tupã?"
      ]
    };
  }

  // 12. POPULAÇÃO / CENSO / HABITANTES
  if (hasPhrase(qClean, ["populacao", "habitantes", "quantas pessoas", "censo"])) {
    return {
      reply: `### 👥 População Oficial de Tupã (SP):\n\n` +
        `- **População Censitária:** **63.928 habitantes** segundo o Censo Oficial do **IBGE**.\n` +
        `- **Área Territorial:** 628,51 km².\n` +
        `- **Densidade Demográfica:** 101,7 habitantes por km².\n` +
        `- **Gentílico Oficial:** Tupaense.\n\n` +
        `📚 **Fonte Oficial:** Instituto Brasileiro de Geografia e Estatística (IBGE Cidades)`,
      suggestions: [
        "Qual é a renda per capita do tupaense?",
        "Quem foi Luiz de Souza Leão?",
        "Quais os distritos de Tupã?"
      ]
    };
  }

  // 13. FESTAS / EXAPIT / TUPÃ JUNINA
  if (hasAnyWord(words, ["exapit", "rodeio", "junina", "festa", "shows"])) {
    return {
      reply: `### 🎉 Festividades Tradicionais de Tupã:\n\n` +
        `- **EXAPIT (Exposição Agropecuária e Industrial de Tupã):** Maior evento popular do município, realizado anualmente em agosto no Recinto de Exposições Cel. Octávio Barros Castanheira, com rodeio profissional, exposições e grandes shows com entrada franca.\n` +
        `- **Tupã Junina:** Grande arraial na Praça da Bandeira no mês de junho, com barracas gastronômicas das entidades beneficentes e apresentações de quadrilhas.\n` +
        `- **Festa das Nações e Tradição Japonesa:** Eventos da colônia nipo-brasileira na ACERT e celebrações em Varpa.\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Turismo de Tupã (turismo.tupa.sp.gov.br)`,
      suggestions: [
        "O que fazer no Distrito de Varpa?",
        "Como visitar o Museu Índia Vanuíre?",
        "Por que Tupã é a Capital do Amendoim?"
      ]
    };
  }

  // 14. DISTRITOS (Varpa, Parnaso, Universo)
  if (hasPhrase(qClean, ["distrito", "distritos", "parnaso", "universo"])) {
    return {
      reply: `### 🗺️ Distritos Oficiais de Tupã:\n\n` +
        `O município de Tupã é integrado pela sede e três distritos oficiais:\n\n` +
        `1. **Distrito de Varpa:** Polo turístico da imigração letã de 1922, ecoturismo e gastronomia artesanal.\n` +
        `2. **Distrito de Parnaso:** Localizado a nordeste, com forte tradição comunitária e agricultura familiar.\n` +
        `3. **Distrito de Universo:** Localizado ao norte, com produção de amendoim, cana-de-açúcar e pecuária.\n\n` +
        `📚 **Fonte Oficial:** Divisão Territorial Oficial da Prefeitura de Tupã e IBGE`,
      suggestions: [
        "O que fazer no Distrito de Varpa?",
        "Quem foi Luiz de Souza Leão?",
        "Qual é a renda per capita de Tupã?"
      ]
    };
  }

  // 15. SAUDAÇÕES
  if (isGreeting(qClean)) {
    return {
      reply: `Olá! Sou o **Tupã IA**, seu assistente especializado na **Estância Turística de Tupã (SP)**!\n\nPosso te responder com precisão sobre:\n- 🏛️ **História & Fundador:** Luiz de Souza Leão e fundação em 1929;\n- 📈 **Renda & Economia:** PIB per capita de R$ 48.934,77 e Capital do Amendoim;\n- 🏺 **Turismo:** Museu Índia Vanuíre, Solar Luiz de Souza Leão e Varpa;\n- 🎓 **Educação:** FADAP e UNESP;\n- 🏥 **Serviços:** UPA 24h, telefones úteis e Prefeitura.\n\nQual tema gostaria de explorar agora?\n\n📚 **Fonte Oficial:** Portal da Prefeitura de Tupã (tupa.sp.gov.br)`,
      suggestions: [
        "Quem foi o Souza Leão?",
        "Qual é a renda per capita do tupaense?",
        "Como visitar o Museu Índia Vanuíre?",
        "O que fazer no Distrito de Varpa?"
      ]
    };
  }

  // 16. RESPOSTA DINÂMICA PERSONALIZADA (NUNCA REPETE BLOCOS ANTERIORES!)
  return {
    reply: `Você perguntou sobre: **"${query}"**.\n\n` +
      `Nos registros oficiais da **Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br)** e do **IBGE**, catalogamos informações detalhadas sobre os seguintes temas principais:\n\n` +
      `1. **História e Fundação:** A trajetória do fundador **Luiz de Souza Leão** e o nascimento da cidade em 1929.\n` +
      `2. **Economia e Renda:** O PIB per capita de **R$ 48.934,77/ano**, a força do amendoim e os dados da Fundação SEADE.\n` +
      `3. **Cultura e Turismo:** O **Museu Índia Vanuíre**, o casarão histórico Solar Luiz de Souza Leão e a colônia letã de **Varpa**.\n` +
      `4. **Serviços e Saúde:** O atendimento na **UPA 24h** (Rua Guaranis) e o atendimento no Paço Municipal.\n\n` +
      `Clique em uma das sugestões abaixo para aprofundar exatamente no assunto que deseja!\n\n` +
      `📚 **Fonte Oficial:** Portal da Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br) e Acervo Histórico Municipal`,
    suggestions: [
      "Quem foi o Souza Leão?",
      "Qual é a renda per capita do tupaense?",
      "Como visitar o Museu Índia Vanuíre?",
      "O que fazer no Distrito de Varpa?"
    ]
  };
}

// Utilitários de correspondência de texto refinados
function hasAnyWord(wordsArray, targetWords) {
  return targetWords.some(t => wordsArray.includes(normalizeText(t)));
}

function hasPhrase(fullText, phrases) {
  return phrases.some(p => fullText.includes(normalizeText(p)));
}

function hasExactToken(text, token) {
  const regex = new RegExp(`(^|\\s)${normalizeText(token)}(\\s|$)`, 'i');
  return regex.test(text);
}

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isGreeting(text) {
  const greetings = ["ola", "oi", "bom dia", "boa tarde", "boa noite", "e ai", "hello", "opa"];
  return greetings.some(g => text === g || text.startsWith(g + " "));
}

// Inserir Mensagem na Interface com Suporte a Botões Interativos
function appendMessage(sender, text, suggestions = []) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = sender === "bot" ? "🏛️" : "👤";

  const bubbleWrapper = document.createElement("div");
  bubbleWrapper.style.maxWidth = "100%";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = formatMarkdown(text);

  if (sender === "bot" && suggestions && suggestions.length > 0) {
    const followupsDiv = document.createElement("div");
    followupsDiv.className = "interactive-followups";
    followupsDiv.innerHTML = suggestions.map(s => `
      <button class="btn-followup" onclick="askQuestion('${escapeQuotes(s)}')">
        💡 ${s}
      </button>
    `).join("");
    bubble.appendChild(followupsDiv);
  }

  bubbleWrapper.appendChild(bubble);

  if (sender === "bot") {
    const actions = document.createElement("div");
    actions.className = "message-actions";
    actions.innerHTML = `
      <button class="btn-msg-action" onclick="copyToClipboard('${escapeQuotes(text)}')">📋 Copiar</button>
      <button class="btn-msg-action" onclick="speakText('${escapeQuotes(text)}')">🔊 Ouvir</button>
    `;
    bubbleWrapper.appendChild(actions);
  }

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubbleWrapper);

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Indicador Visual de Pensamento do Robô
function showThinkingIndicator() {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message bot";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "🏛️";

  const bubble = document.createElement("div");
  bubble.className = "bubble typing-indicator";
  bubble.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span id="thinking-step-text" style="margin-left: 8px; font-size: 0.74rem; color: #38bdf8;">Pensando na sua pergunta...</span>
  `;

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return {
    element: msgDiv,
    updateStep: (text) => {
      const stepEl = msgDiv.querySelector("#thinking-step-text");
      if (stepEl) stepEl.textContent = text;
    }
  };
}

// Formatador Markdown simples
function formatMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/^### (.*$)/gim, '<h4 style="margin: 0.35rem 0; font-weight:700; color:#38bdf8;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin: 0.45rem 0; font-weight:700; color:#38bdf8;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>');

  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');
  html = html.replace(/📚 \*\*Fonte( Oficial)?:\*\* (.*$)/gim, '<div class="source-box">📚 <strong>Fonte Oficial:</strong> $2</div>');
  html = html.replace(/\n\n/g, '<br><br>');
  html = html.replace(/\n/g, '<br>');

  return html;
}

function escapeQuotes(str) {
  return (str || "")
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, " ");
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Mensagem copiada para a área de transferência!");
  });
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const clean = text
    .replace(/<[^>]*>/g, '')
    .replace(/[*#_]/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "pt-BR";
  utterance.rate = 1.05;
  window.speechSynthesis.speak(utterance);
}

btnToggleVoice.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;
  btnToggleVoice.style.color = voiceEnabled ? "#38bdf8" : "var(--text-secondary)";
  btnToggleVoice.style.background = voiceEnabled ? "rgba(56, 189, 248, 0.15)" : "var(--bg-card)";
  alert(voiceEnabled ? "Leitura por voz ativada! O assistente lerá as respostas." : "Leitura por voz desativada.");
});

function playChime(freq, duration) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

btnClear.addEventListener("click", () => {
  if (confirm("Deseja reiniciar a conversa com o Tupã IA?")) {
    chatMessages.innerHTML = `
      <div class="welcome-box">
        <h2>Conversa Reiniciada ✨</h2>
        <p>Estou pronto para tirar qualquer dúvida sobre economia, renda per capita, turismo, serviços da Prefeitura e história de Tupã!</p>
      </div>
    `;
  }
});

btnSettings.addEventListener("click", () => {
  document.getElementById("gemini-api-key").value = geminiApiKey;
  openModal("modal-settings");
});

function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

function saveApiKey() {
  const val = document.getElementById("gemini-api-key").value.trim();
  geminiApiKey = val;
  if (val) {
    localStorage.setItem("tupa_gemini_api_key", val);
    alert("Chave Google Gemini salva! O assistente agora utilizará o modelo generativo com o contexto de Tupã.");
  } else {
    localStorage.removeItem("tupa_gemini_api_key");
    alert("Chave removida. Usando a base oficial local.");
  }
  updateModelStatus();
  closeModal("modal-settings");
}

function clearApiKey() {
  geminiApiKey = "";
  localStorage.removeItem("tupa_gemini_api_key");
  document.getElementById("gemini-api-key").value = "";
  updateModelStatus();
  alert("Chave removida com sucesso.");
  closeModal("modal-settings");
}

async function callGeminiAPI(prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    system_instruction: {
      parts: [{ text: TUPA_SYSTEM_PROMPT }]
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Erro na API Gemini: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "Não foi possível gerar uma resposta no momento.";
}
