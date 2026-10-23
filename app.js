// Aplicação Tupã IA - Oficial, Especializada e Interativa (Dark Mode)

// Estado da Aplicação
let voiceEnabled = false;
let geminiApiKey = localStorage.getItem("tupa_gemini_api_key") || "";

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

// Renderizar FAQ (Perguntas Frequentes Programadas)
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

// Abrir/Fechar resposta no FAQ
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

// Filtrar FAQ por texto digitado
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

// Renderizar Serviços do Cidadão (tupa.sp.gov.br)
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

// Renderizar Telefones Úteis
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

// Atualizar Curiosidade Aleatória
function updateCuriosity() {
  if (!curiosityText || !TUPA_KNOWLEDGE_BASE) return;
  const list = TUPA_KNOWLEDGE_BASE.curiosidades;
  const randomIndex = Math.floor(Math.random() * list.length);
  const cur = list[randomIndex];
  curiosityText.innerHTML = `${cur.texto}<span style="display:block; margin-top:6px; font-size:0.68rem; opacity:0.85; font-weight:600;">📚 Fonte: ${cur.fonte}</span>`;
}

// Atualizar status do modelo
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

// Auto-expandir campo de digitação
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

// Enviar formulário
async function handleFormSubmit(event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  chatInput.style.height = "auto";
  
  await processUserMessage(text);
}

// Perguntas rápidas
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

// Processar a Mensagem do Usuário
async function processUserMessage(userText) {
  appendMessage("user", userText);
  playChime(440, 0.05);

  const typingIndicator = showTypingIndicator();

  let botReply = "";
  let suggestions = [];

  if (geminiApiKey) {
    try {
      botReply = await callGeminiAPI(userText);
      suggestions = ["Qual a renda per capita de Tupã?", "Como visitar o Museu Índia Vanuíre?", "Quais os serviços da Prefeitura?"];
    } catch (err) {
      console.warn("Falha no Gemini, usando base oficial local:", err);
      const resObj = generateLocalResponse(userText);
      botReply = resObj.reply;
      suggestions = resObj.suggestions;
    }
  } else {
    await new Promise(r => setTimeout(r, 400));
    const resObj = generateLocalResponse(userText);
    botReply = resObj.reply;
    suggestions = resObj.suggestions;
  }

  typingIndicator.remove();
  appendMessage("bot", botReply, suggestions);
  playChime(660, 0.08);

  if (voiceEnabled) {
    speakText(botReply);
  }
}

// Motor de Resposta Local Inteligente e Preciso (SEM FALSOS POSITIVOS!)
function generateLocalResponse(query) {
  const qClean = normalizeText(query);
  const kb = TUPA_KNOWLEDGE_BASE;

  // 1. RENDA PER CAPITA / PIB PER CAPITA / SALÁRIO (Tratado com prioridade máxima!)
  if (
    hasWords(qClean, ["renda", "percapita", "per capita", "pib per capita"]) ||
    hasWords(qClean, ["quanto ganha", "salario medio", "rendimento"]) ||
    (hasWords(qClean, ["renda"]) && hasWords(qClean, ["tupaense", "tupa", "morador", "populacao"]))
  ) {
    return {
      reply: `### 📈 Renda per Capita e Dados Econômicos de Tupã (SP):\n\n` +
        `De acordo com os relatórios oficiais mais recentes consolidados pelo **IBGE** e pela **Fundação SEADE**:\n\n` +
        `- **PIB per capita:** **R$ 48.934,77 por habitante ao ano** (o que equivale a uma geração média de riqueza de **R$ 4.077,00 mensais** por tupaense).\n` +
        `- **Salário Médio Formal:** Em torno de **2,0 a 2,2 salários mínimos** mensais para quem trabalha com carteira assinada em Tupã.\n` +
        `- **Rendimento Nominal Domiciliar per capita:** Entre **R$ 1.680,00 e R$ 1.750,00 mensais** por morador nos domicílios particulares.\n` +
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

  // 2. ORÇAMENTO DA PREFEITURA / FINANÇAS
  if (hasWords(qClean, ["orcamento", "loa", "quanto arrecada", "receita da prefeitura", "contas publicas"])) {
    return {
      reply: `### 📊 Orçamento Municipal de Tupã (LOA):\n\n` +
        `O orçamento anual da Prefeitura da Estância Turística de Tupã está fixado em aproximadamente **R$ 473,77 milhões**.\n\n` +
        `- **Maiores Investimentos:** As áreas prioritárias com maiores recursos são a **Educação** (manutenção de creches, escolas e transporte) e a **Saúde** (Fundo Municipal de Saúde, manutenção da UPA 24h, postos ESF e convênios).\n` +
        `- **Transparência Pública:** Toda a execução de receitas, despesas e contratos de licitação pode ser acompanhada em tempo real pelo Portal da Transparência de Tupã.\n\n` +
        `📚 **Fonte Oficial:** Lei Orçamentária Anual (LOA), Câmara Municipal de Tupã e Portal da Transparência (transparencia.tupa.sp.gov.br)`,
      suggestions: [
        "Qual o endereço da Prefeitura?",
        "Onde fica a UPA 24h?",
        "Como emitir 2ª via de IPTU?"
      ]
    };
  }

  // 3. POPULAÇÃO E HABITANTES
  if (hasWords(qClean, ["populacao", "habitantes", "quantas pessoas", "censo"])) {
    return {
      reply: `### 👥 População Oficial de Tupã (SP):\n\n` +
        `- **População Censitária:** **63.928 habitantes** segundo o Censo Demográfico do **IBGE**.\n` +
        `- **Área Territorial:** 628,51 km².\n` +
        `- **Densidade Demográfica:** 101,7 habitantes por km².\n` +
        `- **Gentílico Oficial:** Tupaense.\n\n` +
        `📚 **Fonte Oficial:** Instituto Brasileiro de Geografia e Estatística (IBGE Cidades)`,
      suggestions: [
        "Qual é a renda per capita do tupaense?",
        "Quais os distritos de Tupã?",
        "Como Tupã foi fundada em 1929?"
      ]
    };
  }

  // 4. SAÚDE, UPA 24H E HOSPITAIS (Com verificação de limites de palavras para NÃO colidir com 'tupaense'!)
  if (
    hasExactToken(qClean, "upa") || 
    hasWords(qClean, ["upa 24h", "pronto atendimento", "pronto socorro", "santa casa", "hospital", "samu", "emergencia medica"])
  ) {
    return {
      reply: `### 🏥 Atendimento de Saúde e Emergências em Tupã:\n\n` +
        `- **UPA 24 Horas (Pronto Atendimento):** Atendimento médico ininterrupto para urgências e emergências. Fica na **Rua Guaranis, nº 1822 - Vila Santa Inez**. Telefone: **(14) 3404-2200**.\n` +
        `- **Santa Casa de Misericórdia de Tupã:** Hospital geral de referência regional na **Rua Cherentes, nº 599**. Telefone: **(14) 3404-5555**.\n` +
        `- **SAMU (Ambulância de Urgência):** Ligue **192**.\n` +
        `- **Farmácia Municipal e UBS:** Atendimento preventivo e distribuição de medicamentos da rede básica da Prefeitura.\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Saúde de Tupã e DRS IX (Diretoria Regional de Saúde)`,
      suggestions: [
        "Quais os telefones úteis da Prefeitura?",
        "Qual o endereço do Paço Municipal?",
        "Como funciona a UPA 24h?"
      ]
    };
  }

  // 5. TELEFONES ÚTEIS E DE EMERGÊNCIA
  if (hasWords(qClean, ["telefone", "telefones", "contato", "bombeiro", "policia militar", "defesa civil"]) && !hasWords(qClean, ["renda", "pib", "salario"])) {
    return {
      reply: `### 📞 Telefones Úteis e Emergenciais de Tupã:\n\n` +
        `- **Prefeitura Municipal (PABX Geral):** (14) 3404-1000\n` +
        `- **UPA 24 Horas:** (14) 3404-2200 (Rua Guaranis, 1822)\n` +
        `- **Santa Casa de Tupã:** (14) 3404-5555\n` +
        `- **SAMU:** 192\n` +
        `- **Corpo de Bombeiros:** 193\n` +
        `- **Polícia Militar:** 190\n` +
        `- **Defesa Civil:** 199\n` +
        `- **Secretaria de Turismo:** (14) 3491-5013\n` +
        `- **Museu Índia Vanuíre:** (14) 3491-2333\n\n` +
        `📚 **Fonte Oficial:** Portal Oficial da Prefeitura de Tupã (tupa.sp.gov.br)`,
      suggestions: [
        "Qual o horário de atendimento da Prefeitura?",
        "Como emitir 2ª via de IPTU?",
        "Onde fica a UPA 24h?"
      ]
    };
  }

  // 6. IPTU, CERTIDÕES E TRIBUTOS
  if (hasWords(qClean, ["iptu", "certidao", "tributo", "imposto", "nota fiscal", "nfs"])) {
    return {
      reply: `### 💳 IPTU e Serviços Tributários de Tupã:\n\n` +
        `Você pode emitir a 2ª via do seu carnê de IPTU e certidões negativas diretamente:\n\n` +
        `1. **Online pelo Portal:** Acesse **www.tupa.sp.gov.br**, clique no menu **Cidadão > 2ª Via de IPTU**, informando o número do cadastro do imóvel ou CPF/CNPJ.\n` +
        `2. **Presencialmente:** No Paço Municipal (Praça da Bandeira, 800), de segunda a sexta, das 07h30 às 13h30.\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Economia e Finanças de Tupã (tupa.sp.gov.br/iptu)`,
      suggestions: [
        "Qual o telefone da Prefeitura de Tupã?",
        "Qual o orçamento anual da Prefeitura?",
        "Qual a renda per capita de Tupã?"
      ]
    };
  }

  // 7. PREFEITURA / HORÁRIO / ENDEREÇO
  if (hasWords(qClean, ["prefeitura", "paco municipal"]) && hasWords(qClean, ["horario", "endereco", "onde fica", "aberta", "sede"])) {
    return {
      reply: `### 🏛️ Sede da Prefeitura da Estância Turística de Tupã:\n\n` +
        `- **Endereço:** Praça da Bandeira, nº 800 - Centro - CEP 17600-900 (Paço Municipal).\n` +
        `- **Telefone Geral (PABX):** (14) 3404-1000.\n` +
        `- **Horário de Atendimento ao Público:** Segunda a sexta-feira, das 07h30 às 13h30.\n` +
        `- **Expediente Administrativo:** Das 07h30 às 17h00.\n` +
        `- **Portal Oficial:** www.tupa.sp.gov.br.\n\n` +
        `📚 **Fonte Oficial:** Secretaria Municipal de Administração de Tupã (tupa.sp.gov.br)`,
      suggestions: [
        "Como emitir 2ª via de IPTU?",
        "Qual o orçamento anual da Prefeitura?",
        "Quais são os pontos turísticos de Tupã?"
      ]
    };
  }

  // 8. AMENDOIM E ECONOMIA AGRÍCOLA
  if (hasWords(qClean, ["amendoim", "capital do amendoim", "cooperativa de amendoim", "exportacao amendoim"])) {
    return {
      reply: `### 🥜 Tupã: A Capital Nacional do Amendoim:\n\n` +
        `Tupã ostenta o título de maior polo de cultivo, beneficiamento e exportação de **amendoim** da América Latina!\n\n` +
        `- O solo fértil da Alta Paulista proporciona um amendoim de alta pureza e qualidade internacional.\n` +
        `- Abriga cooperativas gigantes e modernas indústrias de confeitos, doces (paçoca, pé de moleque) e pastas de amendoim.\n` +
        `- Toneladas de grãos in natura e processados são exportadas anualmente para os mercados mais exigentes da Europa e Ásia.\n\n` +
        `📚 **Fonte Oficial:** Associação Brasileira da Indústria de Chocolates, Amendoim e Balas (ABICAB) & Secretaria de Desenvolvimento Econômico de Tupã`,
      suggestions: [
        "Qual é a renda per capita do tupaense?",
        "Como é a festa da EXAPIT em Tupã?",
        "O que fazer no Distrito de Varpa?"
      ]
    };
  }

  // 9. ROTEIRO TURÍSTICO E O QUE FAZER
  if (hasWords(qClean, ["roteiro", "o que fazer", "fim de semana", "pontos turisticos", "visitar"])) {
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
        "O que encontrar em Varpa?",
        "Qual é a renda per capita de Tupã?"
      ]
    };
  }

  // 10. MUSEU ÍNDIA VANUÍRE
  if (hasWords(qClean, ["vanuire", "museu india vanuire"]) || (hasWords(qClean, ["museu"]) && !hasWords(qClean, ["varpa", "erdbergs"]))) {
    return {
      reply: `### 🏺 Museu Histórico e Pedagógico Índia Vanuíre:\n\n` +
        `- **Endereço:** Rua Coroados, nº 521 - Centro de Tupã.\n` +
        `- **Horário:** De terça a domingo, das 09h às 18h (quintas até 20h).\n` +
        `- **Entrada:** Totalmente Gratuita.\n` +
        `- **Acervo:** Possui mais de 38.000 peças etnográficas e é um dos 3 maiores museus dedicados aos povos indígenas no Brasil, com foco nas nações Kaingang, Krenak, Terena e Guarani.\n\n` +
        `📚 **Fonte Oficial:** Museu Histórico e Pedagógico Índia Vanuíre (museuindiavanuire.org.br) & SISEM-SP`,
      suggestions: [
        "Quem foi a Índia Vanuíre?",
        "O que é o Solar Luiz de Souza Leão?",
        "Sugira um roteiro de turismo em Tupã"
      ]
    };
  }

  // 11. VARPA E LETÔNIA
  if (hasWords(qClean, ["varpa", "letonia", "letos", "erdbergs", "caminhos da letonia"])) {
    return {
      reply: `### 🌲 Distrito de Varpa e a Imigração Letã (1922):\n\n` +
        `Varpa é uma joia histórica e turística de Tupã, colonizada em novembro de 1922 por imigrantes batistas da Letônia:\n\n` +
        `- **Museu dos Pioneiros 'Janis Erdbergs':** Antiga igreja batista em madeira rústica com ferramentas, documentos, roupas e bíblias dos pioneiros letões.\n` +
        `- **Culinária Típica:** Queijos artesanais, pão preto de centeio, mel, linguiças defumadas no fogão a lenha e biscoitos natalinos de gengibre.\n` +
        `- **Natureza:** Belas cachoeiras (Cachoeira do Palma) e o Balneário Sete de Setembro.\n\n` +
        `📚 **Fonte Oficial:** Associação dos Pioneiros de Varpa & Secretaria Municipal de Turismo de Tupã`,
      suggestions: [
        "Quais os outros distritos de Tupã?",
        "Como visitar o Museu Índia Vanuíre?",
        "Qual a renda per capita de Tupã?"
      ]
    };
  }

  // 12. FUNDAÇÃO, HISTÓRIA E LUIZ DE SOUZA LEÃO
  if (hasWords(qClean, ["fundacao", "fundador", "luiz de souza", "1929", "historia de tupa", "solar"])) {
    return {
      reply: `### 📜 Fundação e História da Estância de Tupã:\n\n` +
        `- **Data de Fundação:** **12 de outubro de 1929** por **Luiz de Souza Leão**.\n` +
        `- **Planejamento Moderno:** O fundador traçou as avenidas com **30 metros de largura**, garantindo iluminação, arborização e ventilação perenes.\n` +
        `- **Origem do Nome:** Homenagem aos povos indígenas, significando o Deus do Trovão / Criador em Tupi-Guarani.\n` +
        `- **Solar Luiz de Souza Leão:** O casarão onde ele viveu (Rua Caingangs, 600) é tombado pelo CONDEPHAAT como Patrimônio Histórico do Estado de SP.\n\n` +
        `📚 **Fonte Oficial:** Arquivo Histórico Municipal de Tupã & CONDEPHAAT`,
      suggestions: [
        "Quem foi a Índia Vanuíre?",
        "Qual o significado do nome Tupã?",
        "Qual é a renda per capita de Tupã?"
      ]
    };
  }

  // 13. FACULDADES (FADAP & UNESP)
  if (hasWords(qClean, ["fadap", "fap", "unesp", "faculdade", "universidade", "cursos"])) {
    return {
      reply: `### 🎓 Polo Universitário de Tupã (SP):\n\n` +
        `- **FADAP / FAP (Faculdade da Alta Paulista):** Instituição tradicional pioneira com décadas de história na formação em Direito, Administração e Gestão.\n` +
        `- **UNESP Campus Tupã (FCE):** Faculdade de Ciências e Engenharia pública estadual com cursos de ponta em **Engenharia de Biossistemas** e **Administração**.\n` +
        `- **ETEC Prof. Massuyuki Kawano & FATEC Tupã:** Ensino técnico e tecnológico de alta empregabilidade.\n\n` +
        `📚 **Fonte Oficial:** Unesp Campus Tupã (fce.unesp.br) e Acervo Institucional FADAP`,
      suggestions: [
        "Quais cursos a UNESP oferece em Tupã?",
        "Qual é a renda per capita de Tupã?",
        "Por que Tupã é a Capital do Amendoim?"
      ]
    };
  }

  // 14. SAUDAÇÕES
  if (isGreeting(qClean)) {
    return {
      reply: `Olá! Sou o **Tupã IA**, assistente virtual interativo da **Estância Turística de Tupã (SP)**!\n\nPosso te responder com precisão oficial sobre:\n- **Renda e PIB per capita** (dados IBGE e SEADE);\n- **Prefeitura e Serviços:** IPTU, horários e UPA 24h;\n- **Turismo:** Museu Índia Vanuíre, Solar Luiz de Souza Leão e Varpa;\n- **Educação:** FADAP e UNESP;\n- **História de 1929** e a Capital do Amendoim.\n\nComo posso te ajudar agora?\n\n📚 **Fonte Oficial:** Portal Oficial da Prefeitura de Tupã (tupa.sp.gov.br)`,
      suggestions: [
        "Qual é a renda per capita do tupaense?",
        "Como visitar o Museu Índia Vanuíre?",
        "Onde fica a UPA 24h?",
        "O que fazer no Distrito de Varpa?"
      ]
    };
  }

  // 15. PESQUISA SEMÂNTICA POR ITENS CATALOGADOS
  let bestMatch = null;
  let highestScore = 0;

  for (const cat of kb.categorias) {
    for (const item of cat.itens) {
      let score = 0;
      for (const kw of item.palavrasChave) {
        if (qClean.includes(normalizeText(kw))) {
          score += 3;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }
  }

  if (bestMatch && highestScore >= 3) {
    return {
      reply: `${bestMatch.resposta}\n\n📚 **Fonte Oficial:** ${bestMatch.fonte}`,
      suggestions: bestMatch.sugestoes || ["Qual a renda per capita de Tupã?", "Como visitar o Museu Índia Vanuíre?", "Quais os serviços da Prefeitura?"]
    };
  }

  // 16. RESPOSTA INSTITUCIONAL GERAL (Fallback Amigável)
  return {
    reply: `A **Estância Turística de Tupã (SP)** conta com uma rica base de dados oficiais:\n\n` +
      `- **Economia & Renda:** PIB per capita de **R$ 48.934,77/ano** (IBGE/SEADE) e liderança nacional em amendoim e avicultura.\n` +
      `- **Sede Administrativa:** Paço Municipal na Praça da Bandeira, 800 - PABX (14) 3404-1000 - www.tupa.sp.gov.br.\n` +
      `- **Saúde:** UPA 24h ininterrupta na Rua Guaranis, 1822.\n` +
      `- **Cultura & Turismo:** Museu Índia Vanuíre, Solar Luiz de Souza Leão e o Distrito de Varpa (imigração letã de 1922).\n` +
      `- **Educação:** Faculdades da Alta Paulista (FADAP) e UNESP Campus Tupã.\n\n` +
      `Você gostaria de aprofundar em algum desses temas?\n\n` +
      `📚 **Fonte Oficial:** Portal da Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br) e IBGE Cidades`,
    suggestions: [
      "Qual é a renda per capita do tupaense?",
      "Onde fica a UPA 24h?",
      "Como visitar o Museu Índia Vanuíre?",
      "Por que Tupã é a Capital do Amendoim?"
    ]
  };
}

// Utilitários de comparação sem falsos positivos
function hasWords(text, wordsList) {
  return wordsList.some(w => text.includes(normalizeText(w)));
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

  // Botões de Sugestões Interativas
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

// Indicador de Digitação
function showTypingIndicator() {
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
  `;

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return msgDiv;
}

// Formatador Markdown simples com destaque visual de fonte oficial
function formatMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/^### (.*$)/gim, '<h4 style="margin: 0.35rem 0; font-weight:700; color:#38bdf8;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin: 0.45rem 0; font-weight:700; color:#38bdf8;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>');

  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');

  // Caixa elegante de Fonte Oficial no Dark Mode
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

// Botão de Áudio
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
