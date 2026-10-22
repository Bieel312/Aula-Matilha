// Aplicação Principal - Tupã IA Especialista

// Estado da Aplicação
let conversationHistory = [];
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
const btnAbout = document.getElementById("btn-about");
const topicsList = document.getElementById("topics-list");
const curiosityText = document.getElementById("curiosity-text");
const modelStatusPill = document.getElementById("model-status-pill");
const modelStatusText = document.getElementById("model-status-text");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderTopics();
  updateCuriosity();
  updateModelStatus();
  setupTextareaAutoResize();

  // Atualizar curiosidade periodicamente
  setInterval(updateCuriosity, 20000);
});

// Renderizar Tópicos na Barra Lateral
function renderTopics() {
  if (!topicsList || !TUPA_KNOWLEDGE_BASE) return;

  topicsList.innerHTML = TUPA_KNOWLEDGE_BASE.categorias.map(cat => `
    <button class="topic-btn" onclick="askTopic('${cat.id}')">
      <span class="topic-icon">${cat.icone}</span>
      <div class="topic-info">
        <h3>${cat.titulo}</h3>
        <p>${cat.resumo}</p>
      </div>
    </button>
  `).join("");
}

// Atualizar Curiosidade Aleatória
function updateCuriosity() {
  if (!curiosityText || !TUPA_KNOWLEDGE_BASE) return;
  const list = TUPA_KNOWLEDGE_BASE.curiosidades;
  const randomIndex = Math.floor(Math.random() * list.length);
  curiosityText.textContent = list[randomIndex];
}

// Atualizar status do modelo
function updateModelStatus() {
  if (geminiApiKey) {
    modelStatusText.textContent = "Gemini IA Online";
    modelStatusPill.style.borderColor = "#60a5fa";
    modelStatusPill.style.background = "#eff6ff";
    modelStatusPill.style.color = "#1d4ed8";
  } else {
    modelStatusText.textContent = "Base Local Ativa";
    modelStatusPill.style.borderColor = "#a7f3d0";
    modelStatusPill.style.background = "#ecfdf5";
    modelStatusPill.style.color = "#065f46";
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
  processUserMessage(questionText);
}

// Consultar tema completo da barra lateral
function askTopic(topicId) {
  const cat = TUPA_KNOWLEDGE_BASE.categorias.find(c => c.id === topicId);
  if (!cat) return;

  const prompt = `Conte-me tudo sobre ${cat.titulo} em Tupã`;
  processUserMessage(prompt);
}

// Processar a Mensagem do Usuário
async function processUserMessage(userText) {
  // Adicionar mensagem do usuário na tela
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
    // Simular tempo sutil de raciocínio natural
    await new Promise(r => setTimeout(r, 450));
    botReply = generateLocalResponse(userText);
  }

  // Remover indicador e adicionar resposta do bot
  typingIndicator.remove();
  appendMessage("bot", botReply);
  playChime(660, 0.08);

  // Leitura por voz se ativada
  if (voiceEnabled) {
    speakText(botReply);
  }
}

// Motor de Resposta Local Especializado em Tupã
function generateLocalResponse(query) {
  const qClean = normalizeText(query);
  const kb = TUPA_KNOWLEDGE_BASE;

  // 1. Saudações e Apresentação
  if (isGreeting(qClean)) {
    return `Olá! Sou o **Tupã IA**, especialista na encantadora **Estância Turística de Tupã (SP)**!\n\nPosso te contar tudo sobre nossa história, a fundação por Luiz de Souza Leão em 1929, o Museu Índia Vanuíre, a colônia letã de Varpa, faculdades como FADAP e UNESP, nossa força como Capital do Amendoim e muito mais.\n\nO que gostaria de saber hoje?`;
  }

  // 2. Roteiro Turístico de Final de Semana
  if (qClean.includes("roteiro") || (qClean.includes("fim de semana") && qClean.includes("tupa")) || qClean.includes("o que fazer")) {
    return `### 🗺️ Roteiro Perfeito de Fim de Semana em Tupã (SP):\n\n` +
      `**Sábado: História e Tradição no Centro**\n` +
      `- **Manhã:** Visite o renomado **Museu Histórico e Pedagógico Índia Vanuíre**, um dos mais importantes do Brasil em cultura indígena.\n` +
      `- **Almoço:** Experimente a gastronomia local no centro e aproveite para degustar doces tradicionais de amendoim.\n` +
      `- **Tarde:** Passeie pelo **Solar Luiz de Souza Leão** e caminhe pela ampla e arborizada **Praça da Bandeira**, admirando a **Igreja Matriz de São Pedro** e sua fonte luminosa.\n\n` +
      `**Domingo: Cultura Europeia e Natureza em Varpa**\n` +
      `- **Manhã:** Vá até o **Distrito de Varpa** (imigração letã de 1922) e visite o **Museu dos Pioneiros 'Janis Erdbergs'**.\n` +
      `- **Almoço:** Saboreie queijos artesanais, pratos típicos e defumados letones em Varpa.\n` +
      `- **Tarde:** Relaxe na natureza na **Cachoeira do Palma** ou dê um mergulho no **Balneário Sete de Setembro**!`;
  }

  // 3. FADAP e Ensino Superior
  if (qClean.includes("fadap") || qClean.includes("fap") || qClean.includes("faculdade da alta paulista")) {
    const item = kb.categorias.find(c => c.id === "educacao").itens.find(i => i.palavrasChave.includes("fadap"));
    return item ? item.resposta : "A FADAP (Faculdades da Alta Paulista) é uma tradicional instituição de ensino superior de Tupã, formadora de inúmeros líderes e profissionais de destaque na região.";
  }

  // 4. UNESP
  if (qClean.includes("unesp") || qClean.includes("biosistemas") || qClean.includes("fce")) {
    const item = kb.categorias.find(c => c.id === "educacao").itens.find(i => i.palavrasChave.includes("unesp"));
    return item ? item.resposta : "O campus da UNESP em Tupã (FCE) destaca-se pelos cursos de ponta em Engenharia de Biossistemas e Administração.";
  }

  // 5. Museu Índia Vanuíre
  if (qClean.includes("vanuire") || qClean.includes("museu")) {
    const cat = kb.categorias.find(c => c.id === "turismo");
    const item = cat.itens.find(i => i.palavrasChave.includes("museu india vanuire"));
    return item.resposta;
  }

  // 6. Varpa e Letônia
  if (qClean.includes("varpa") || qClean.includes("letonia") || qClean.includes("letos") || qClean.includes("erdbergs")) {
    const cat = kb.categorias.find(c => c.id === "turismo");
    const item = cat.itens.find(i => i.palavrasChave.includes("varpa"));
    return item.resposta;
  }

  // 7. Amendoim / Economia
  if (qClean.includes("amendoim") || qClean.includes("capital do amendoim") || qClean.includes("industria")) {
    const cat = kb.categorias.find(c => c.id === "economia");
    const item = cat.itens.find(i => i.palavrasChave.includes("amendoim"));
    return item.resposta;
  }

  // 8. Fundação / História / Luiz de Souza Leão
  if (qClean.includes("fundad") || qClean.includes("luiz de souza") || qClean.includes("1929") || qClean.includes("historia")) {
    const cat = kb.categorias.find(c => c.id === "historia");
    const item = cat.itens.find(i => i.palavrasChave.includes("fundacao"));
    return item.resposta;
  }

  // 9. Pesquisa semântica por pontuação em toda a base de dados
  let bestMatch = null;
  let highestScore = 0;

  for (const cat of kb.categorias) {
    for (const item of cat.itens) {
      let score = 0;
      
      // Pontua por palavras-chave
      for (const kw of item.palavrasChave) {
        if (qClean.includes(normalizeText(kw))) {
          score += 3;
        }
      }

      // Pontua por termos da pergunta
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
    return bestMatch.resposta;
  }

  // 10. Resposta sintética rica de visão geral quando a dúvida for aberta
  return `Tupã é um município fascinante do interior paulista! Aqui estão alguns pontos fundamentais para enriquecer sua pesquisa:\n\n` +
    `- **Fundação:** 12 de outubro de 1929 por Luiz de Souza Leão.\n` +
    `- **Patrimônio Cultural:** O renomado **Museu Histórico e Pedagógico Índia Vanuíre** e o casarão histórico **Solar Luiz de Souza Leão**.\n` +
    `- **Tradição Europeia:** O charmoso **Distrito de Varpa**, berço da imigração letã no Brasil.\n` +
    `- **Educação de Ponta:** Instituições respeitadas como a **FADAP** e a **UNESP (Campus Tupã)**.\n` +
    `- **Economia:** Conhecida como a **Capital Nacional do Amendoim** e forte pólo avícola e sucroalcooleiro.\n\n` +
    `Você gostaria de aprofundar sobre algum destes assuntos específicos?`;
}

// Normalizador de texto para comparação
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

  // Ações de mensagem para o bot (Copiar e Ouvir)
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

// Formatar Markdown simples para HTML seguro
function formatMarkdown(text) {
  if (!text) return "";
  let html = text
    .replace(/^### (.*$)/gim, '<h4 style="margin: 0.3rem 0; font-weight:700;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin: 0.4rem 0; font-weight:700;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>');

  // Tratar listas
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');
  
  // Tratar quebras de linha normais
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

// Copiar para área de transferência
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Mensagem copiada para a área de transferência!");
  });
}

// Síntese de Voz (Text-to-Speech)
function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  // Limpar marcações HTML/markdown para leitura limpa
  const clean = text
    .replace(/<[^>]*>/g, '')
    .replace(/[*#_]/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "pt-BR";
  utterance.rate = 1.05;
  window.speechSynthesis.speak(utterance);
}

// Alternar Voz
btnToggleVoice.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;
  btnToggleVoice.style.color = voiceEnabled ? "var(--primary)" : "var(--text-muted)";
  btnToggleVoice.style.background = voiceEnabled ? "var(--primary-subtle)" : "var(--bg-card)";
  alert(voiceEnabled ? "Leitura por voz ativada!" : "Leitura por voz desativada.");
});

// Sintetizar som suave de feedback (Web Audio API)
function playChime(freq, duration) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silencioso se navegador bloquear áudio automático
  }
}

// Limpar Conversa
btnClear.addEventListener("click", () => {
  if (confirm("Deseja limpar o histórico da conversa?")) {
    chatMessages.innerHTML = `
      <div class="welcome-hero">
        <h2>Conversa Reiniciada ✨</h2>
        <p>Pergunte-me qualquer coisa sobre a história, distritos, museus, faculdades e economia de Tupã (SP)!</p>
      </div>
    `;
  }
});

// Modal de Configurações
btnSettings.addEventListener("click", () => {
  document.getElementById("gemini-api-key").value = geminiApiKey;
  openModal("modal-settings");
});

btnAbout.addEventListener("click", () => {
  openModal("modal-about");
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
    alert("Chave Gemini salva! Agora o Tupã IA usará o modelo generativo com todo o contexto de Tupã.");
  } else {
    localStorage.removeItem("tupa_gemini_api_key");
    alert("Chave removida. Usando o motor de conhecimento local.");
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

// Chamada à API do Google Gemini (se configurada)
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
