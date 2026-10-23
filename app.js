// Aplicação Tupã IA - Oficial e Especializada

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
  // Atualizar botões
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  // Atualizar painéis
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  // Se for a aba de chat, focar no input
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
              <div class="faq-source-badge">📚 <strong>Fonte:</strong> ${item.fonte || 'tupa.sp.gov.br'}</div>
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
    modelStatusPill.style.borderColor = "#93c5fd";
    modelStatusPill.style.background = "#eff6ff";
    modelStatusPill.style.color = "#1d4ed8";
  } else {
    modelStatusText.textContent = "Base Oficial Ativa";
    modelStatusPill.style.borderColor = "var(--border-highlight)";
    modelStatusPill.style.background = "var(--tupa-blue-subtle)";
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

// Fazer pergunta direta via clique
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
  // Inserir mensagem do usuário
  appendMessage("user", userText);
  playChime(440, 0.05);

  // Exibir indicador de digitação
  const typingIndicator = showTypingIndicator();

  // Obter resposta
  let botReply = "";

  if (geminiApiKey) {
    try {
      botReply = await callGeminiAPI(userText);
    } catch (err) {
      console.warn("Falha no Gemini, usando base de conhecimento local:", err);
      botReply = generateLocalResponse(userText);
    }
  } else {
    // Leve atraso para sensação natural de processamento
    await new Promise(r => setTimeout(r, 450));
    botReply = generateLocalResponse(userText);
  }

  // Remover indicador e exibir resposta
  typingIndicator.remove();
  appendMessage("bot", botReply);
  playChime(660, 0.08);

  // Leitura por voz se habilitada
  if (voiceEnabled) {
    speakText(botReply);
  }
}

// Motor de Resposta Local Especializado em Tupã
function generateLocalResponse(query) {
  const qClean = normalizeText(query);
  const kb = TUPA_KNOWLEDGE_BASE;

  // 1. Saudações
  if (isGreeting(qClean)) {
    return `Olá! Sou o **Tupã IA**, assistente virtual especializado na **Estância Turística de Tupã (SP)**!\n\nEstou abastecido com informações oficiais da prefeitura (**tupa.sp.gov.br**), história de 1929, dados do Museu Índia Vanuíre, da colônia letã de Varpa, faculdades (FADAP e UNESP), produção de amendoim e serviços municipais.\n\nQual é a sua dúvida hoje?\n\n📚 **Fonte Oficial:** Portal da Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br) e Acervo Histórico Municipal`;
  }

  // 2. Telefones, Emergência e Prefeitura Geral
  if (qClean.includes("telefone") || qClean.includes("contato") || qClean.includes("emergencia") || qClean.includes("upa") || qClean.includes("samu") || qClean.includes("bombeiro")) {
    return `### 📞 Telefones Úteis e de Emergência em Tupã:\n\n` +
      `- **Prefeitura Municipal (PABX Geral):** (14) 3404-1000\n` +
      `- **UPA 24 Horas (Pronto Atendimento):** (14) 3404-2200 (Rua Guaranis, 1822)\n` +
      `- **Santa Casa de Misericórdia:** (14) 3404-5555 (Rua Cherentes, 599)\n` +
      `- **SAMU:** 192\n` +
      `- **Corpo de Bombeiros:** 193\n` +
      `- **Polícia Militar:** 190\n` +
      `- **Defesa Civil:** 199\n` +
      `- **Museu Índia Vanuíre:** (14) 3491-2333\n` +
      `- **Secretaria de Turismo:** (14) 3491-5013\n\n` +
      `Você também pode conferir todos os serviços municipais na aba **Serviços da Prefeitura & Telefones**.\n\n` +
      `📚 **Fonte Oficial:** Secretaria Municipal de Saúde de Tupã, Prefeitura de Tupã (tupa.sp.gov.br) e Polícia Militar SP`;
  }

  // 3. IPTU, Certidões e Tributos
  if (qClean.includes("iptu") || qClean.includes("certidao") || qClean.includes("tributo") || qClean.includes("nota fiscal") || qClean.includes("nfs")) {
    const item = kb.categorias.find(c => c.id === "prefeitura").itens.find(i => i.palavrasChave.includes("iptu"));
    const resp = item ? item.resposta : `Para serviços de IPTU, certidões e notas fiscais de Tupã, acesse o portal oficial da prefeitura em **www.tupa.sp.gov.br** no menu Cidadão, ou dirija-se ao Paço Municipal na Praça da Bandeira, 800 (das 07h30 às 13h30).`;
    const f = item ? item.fonte : "Secretaria Municipal de Economia e Finanças (tupa.sp.gov.br/iptu)";
    return `${resp}\n\n📚 **Fonte Oficial:** ${f}`;
  }

  // 4. Endereço e Horário da Prefeitura
  if (qClean.includes("prefeitura") && (qClean.includes("horario") || qClean.includes("endereco") || qClean.includes("onde fica") || qClean.includes("aberta"))) {
    const item = kb.categorias.find(c => c.id === "prefeitura").itens.find(i => i.palavrasChave.includes("endereco prefeitura"));
    return `${item.resposta}\n\n📚 **Fonte Oficial:** ${item.fonte}`;
  }

  // 5. Roteiro Turístico de Final de Semana
  if (qClean.includes("roteiro") || (qClean.includes("fim de semana") && qClean.includes("tupa")) || qClean.includes("o que fazer") || qClean.includes("turismo")) {
    return `### 🗺️ Roteiro Turístico Oficial de Fim de Semana em Tupã (SP):\n\n` +
      `**Sábado: Patrimônio Histórico no Centro**\n` +
      `- **Manhã:** Conheça o célebre **Museu Histórico e Pedagógico Índia Vanuíre** (Rua Coroados, 521), referência nacional em cultura e etnografia dos povos indígenas Kaingang e Krenak.\n` +
      `- **Almoço:** Prove a gastronomia local no centro e deguste doces artesanais de amendoim.\n` +
      `- **Tarde:** Visite o casarão histórico **Solar Luiz de Souza Leão** e passeie pela arborizada **Praça da Bandeira**, admirando a **Igreja Matriz de São Pedro** e sua fonte luminosa.\n\n` +
      `**Domingo: Cultura Europeia e Ecoturismo em Varpa**\n` +
      `- **Manhã:** Vá até o **Distrito de Varpa** (colônia letã de 1922) e visite o **Museu dos Pioneiros 'Janis Erdbergs'**.\n` +
      `- **Almoço:** Saboreie os queijos tradicionais, pão de centeio, mel e linguiças defumadas letonas.\n` +
      `- **Tarde:** Refresque-se na natureza na **Cachoeira do Palma** ou aproveite o **Balneário Sete de Setembro**!\n\n` +
      `📚 **Fonte Oficial:** Secretaria Municipal de Turismo da Estância de Tupã (turismo.tupa.sp.gov.br) & SISEM-SP`;
  }

  // 6. FADAP e Universidades
  if (qClean.includes("fadap") || qClean.includes("fap") || qClean.includes("faculdade da alta paulista")) {
    const item = kb.categorias.find(c => c.id === "educacao").itens.find(i => i.palavrasChave.includes("fadap"));
    const resp = item ? item.resposta : "A FADAP (Faculdades da Alta Paulista) é uma tradicional instituição pioneira no ensino superior em Tupã, formadora de inúmeros juízes, advogados, administradores e líderes regionais.";
    const f = item ? item.fonte : "Acervo Institucional FADAP / FAP e Histórico da Educação Superior em Tupã";
    return `${resp}\n\n📚 **Fonte Oficial:** ${f}`;
  }

  // 7. UNESP
  if (qClean.includes("unesp") || qClean.includes("biosistemas") || qClean.includes("fce")) {
    const item = kb.categorias.find(c => c.id === "educacao").itens.find(i => i.palavrasChave.includes("unesp"));
    const resp = item ? item.resposta : "A UNESP Campus Tupã (Faculdade de Ciências e Engenharia - FCE) oferece cursos de graduação e pós-graduação de referência em Engenharia de Biossistemas e Administração.";
    const f = item ? item.fonte : "Universidade Estadual Paulista - Unesp Campus Tupã (fce.unesp.br)";
    return `${resp}\n\n📚 **Fonte Oficial:** ${f}`;
  }

  // 8. Museu Índia Vanuíre
  if (qClean.includes("vanuire") || qClean.includes("museu")) {
    const cat = kb.categorias.find(c => c.id === "turismo");
    const item = cat.itens.find(i => i.palavrasChave.includes("museu india vanuire"));
    return `${item.resposta}\n\n📚 **Fonte Oficial:** ${item.fonte}`;
  }

  // 9. Varpa e Letônia
  if (qClean.includes("varpa") || qClean.includes("letonia") || qClean.includes("letos") || qClean.includes("erdbergs")) {
    const cat = kb.categorias.find(c => c.id === "turismo");
    const item = cat.itens.find(i => i.palavrasChave.includes("varpa"));
    return `${item.resposta}\n\n📚 **Fonte Oficial:** ${item.fonte}`;
  }

  // 10. Amendoim / Economia
  if (qClean.includes("amendoim") || qClean.includes("capital do amendoim") || qClean.includes("economia")) {
    const cat = kb.categorias.find(c => c.id === "economia");
    const item = cat.itens.find(i => i.palavrasChave.includes("amendoim"));
    return `${item.resposta}\n\n📚 **Fonte Oficial:** ${item.fonte}`;
  }

  // 11. Fundação e Luiz de Souza Leão
  if (qClean.includes("fundad") || qClean.includes("luiz de souza") || qClean.includes("1929") || qClean.includes("historia")) {
    const cat = kb.categorias.find(c => c.id === "historia");
    const item = cat.itens.find(i => i.palavrasChave.includes("fundacao"));
    return `${item.resposta}\n\n📚 **Fonte Oficial:** ${item.fonte}`;
  }

  // 12. Busca Semântica em Toda a Base
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

      const pClean = normalizeText(item.pergunta);
      const queryWords = qClean.split(/\s+/).filter(w => w.length > 3);
      for (const w of queryWords) {
        if (pClean.includes(w)) score += 2;
        if (normalizeText(item.resposta).includes(w)) score += 1;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }
  }

  if (bestMatch && highestScore >= 2) {
    return `${bestMatch.resposta}\n\n📚 **Fonte Oficial:** ${bestMatch.fonte || "Portal Oficial da Prefeitura de Tupã (tupa.sp.gov.br)"}`;
  }

  // 13. Resposta Institucional Completa
  return `A **Estância Turística de Tupã** é rica em história, cultura e serviços! Aqui está um panorama dos dados oficiais:\n\n` +
    `- **Fundação:** 12 de outubro de 1929 pelo desbravador Luiz de Souza Leão.\n` +
    `- **Sede Administrativa:** Praça da Bandeira, 800 - Telefone: (14) 3404-1000 - www.tupa.sp.gov.br.\n` +
    `- **Patrimônio Cultural:** O **Museu Histórico e Pedagógico Índia Vanuíre** e o tombado **Solar Luiz de Souza Leão**.\n` +
    `- **Tradição Letã:** O **Distrito de Varpa** e o Museu dos Pioneiros 'Janis Erdbergs'.\n` +
    `- **Ensino Superior:** A prestigiada **FADAP** e a **UNESP (FCE - Tupã)**.\n` +
    `- **Economia:** Liderança como **Capital Nacional do Amendoim** e forte produção avícola.\n\n` +
    `Se quiser saber algo mais específico sobre qualquer um desses temas, basta digitar sua pergunta!\n\n` +
    `📚 **Fonte Oficial:** Portal Oficial da Prefeitura da Estância Turística de Tupã (tupa.sp.gov.br), IBGE e Acervo Municipal`;
}

// Normalizador de texto
function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

function isGreeting(text) {
  const greetings = ["ola", "oi", "bom dia", "boa tarde", "boa noite", "e ai", "hello", "opa"];
  return greetings.some(g => text === g || text.startsWith(g + " "));
}

// Inserir Mensagem na Interface
function appendMessage(sender, text) {
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

// Formatador Markdown simples
function formatMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/^### (.*$)/gim, '<h4 style="margin: 0.35rem 0; font-weight:700; color:var(--tupa-blue-dark);">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin: 0.45rem 0; font-weight:700; color:var(--tupa-blue-dark);">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>');

  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');

  // Destacar caixa de fonte oficial
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
  btnToggleVoice.style.color = voiceEnabled ? "var(--tupa-blue)" : "var(--text-secondary)";
  btnToggleVoice.style.background = voiceEnabled ? "var(--tupa-blue-subtle)" : "white";
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
        <p>Estou pronto para tirar qualquer dúvida sobre a Estância Turística de Tupã (SP) e os serviços da Prefeitura!</p>
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
