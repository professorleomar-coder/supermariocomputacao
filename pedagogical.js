/**
 * Super Bit Bros - Módulo Pedagógico BNCC Computação (5º Ano)
 * Conteúdos, desafios e quizzes interativos baseados em:
 * (EF05CO05), (EF05CO06) e (EF05CO07).
 */

const PedagogicalData = {
    // Fase 1: Componentes Principais do Computador (EF05CO05)
    world1: {
        title: "Mundo 1: O Reino dos Componentes",
        skill: "BNCC (EF05CO05)",
        description: "Identifique os componentes principais de um computador: Entrada, Saída, Processamento e Armazenamento!",
        
        // Itens que saem das caixas '?'
        items: [
            {
                id: "teclado_mouse",
                name: "Teclado e Mouse",
                category: "Dispositivo de Entrada",
                icon: "⌨️",
                concept: "Dispositivos de Entrada enviam informações e ordens de nós (humanos) para dentro do computador!",
                question: "Para que servem dispositivos de entrada como o teclado e o mouse?",
                options: [
                    { text: "Mostrar imagens e vídeos na tela", correct: false },
                    { text: "Enviar comandos e dados para o computador", correct: true },
                    { text: "Fazer o computador desligar sozinho", correct: false },
                    { text: "Guardar arquivos para sempre", correct: false }
                ],
                explanation: "Muito bem! O teclado e o mouse são 'portas de entrada': tudo o que você digita ou clica entra no computador como comandos."
            },
            {
                id: "cpu",
                name: "Processador (CPU)",
                category: "Processamento",
                icon: "🧠",
                concept: "A CPU é o 'cérebro' do computador! Ela calcula, toma decisões e executa as instruções de todos os programas.",
                question: "Qual é a função principal da CPU (Processador)?",
                options: [
                    { text: "Tocar música bem alto", correct: false },
                    { text: "Imprimir folhas de papel coloridas", correct: false },
                    { text: "Processar dados e executar cálculos dos programas", correct: true },
                    { text: "Servir de apoio para a mesa", correct: false }
                ],
                explanation: "Exatamente! A CPU é o coração do processamento. Ela realiza bilhões de cálculos por segundo para seus jogos funcionarem."
            },
            {
                id: "ssd_ram",
                name: "SSD / Memória",
                category: "Armazenamento",
                icon: "💾",
                concept: "Os dispositivos de armazenamento guardam suas fotos, jogos e trabalhos escolares para você nunca perdê-los.",
                question: "Onde ficam guardados seus arquivos e fotos mesmo depois de desligar o computador?",
                options: [
                    { text: "No cabo de energia", correct: false },
                    { text: "Dentro do monitor", correct: false },
                    { text: "Na caixinha de som", correct: false },
                    { text: "Nos dispositivos de Armazenamento (SSD / HD)", correct: true }
                ],
                explanation: "Excelente! O SSD e o HD são memórias permanentes de armazenamento. Eles mantêm tudo seguro para quando você ligar a máquina de novo."
            },
            {
                id: "monitor_som",
                name: "Monitor e Caixas de Som",
                category: "Dispositivo de Saída",
                icon: "🖥️",
                concept: "Dispositivos de Saída recebem os resultados do computador e mostram ou tocam para nós.",
                question: "Se você quer ver as imagens do seu jogo e escutar os efeitos sonoros, que tipo de dispositivo você usa?",
                options: [
                    { text: "Dispositivos de Saída (Monitor e Som)", correct: true },
                    { text: "Apenas dispositivos de Entrada", correct: false },
                    { text: "A tomada da parede", correct: false },
                    { text: "O mouse de bolinha", correct: false }
                ],
                explanation: "Perfeito! A tela e os alto-falantes transformam os dados binários do computador em luz e som que podemos ver e ouvir."
            }
        ],

        // Desafio do Castelo de Final de Fase (Portão da CPU)
        gateChallenge: {
            title: "Desafio Final: Montando o Computador",
            icon: "🏰",
            concept: "O Castelo dos Componentes precisa de energia! Para abrir o portão da bandeira, classifique corretamente:",
            question: "Um MICROFONE que grava sua voz para falar com amigos no jogo é um dispositivo de:",
            options: [
                { text: "Saída (imprime a voz no papel)", correct: false },
                { text: "Entrada (leva sua voz para o computador)", correct: true },
                { text: "Armazenamento remoto", correct: false },
                { text: "Nenhuma das anteriores", correct: false }
            ],
            explanation: "Incrível! O microfone captura as ondas sonoras do mundo real e envia para dentro do computador como dados digitais: é ENTRADA!"
        }
    },

    // Fase 2: Armazenamento Local vs Remoto / Nuvem (EF05CO06)
    world2: {
        title: "Mundo 2: O Vale dos Dados (Local vs Nuvem)",
        skill: "BNCC (EF05CO06)",
        description: "Aprenda quando os dados estão salvos no seu aparelho (Local) ou na internet (Nuvem Remota)!",
        
        items: [
            {
                id: "armazenamento_local",
                name: "Disco Local (HD / Pen Drive)",
                category: "Armazenamento Local",
                icon: "💽",
                concept: "Armazenamento LOCAL significa que os arquivos estão guardados na memória física do próprio aparelho que você está usando.",
                question: "Qual a maior vantagem de salvar um arquivo no Armazenamento Local (como o HD do seu notebook)?",
                options: [
                    { text: "Qualquer pessoa no planeta pode ver sem autorização", correct: false },
                    { text: "O notebook fica 10x mais pesado fisicamente", correct: false },
                    { text: "Você pode abrir o arquivo mesmo sem nenhuma internet!", correct: true },
                    { text: "Nunca ocupa nenhum espaço de memória", correct: false }
                ],
                explanation: "Isso mesmo! O armazenamento local não precisa de conexão de rede ou Wi-Fi. Está sempre ali pertinho do processador."
            },
            {
                id: "armazenamento_nuvem",
                name: "A Nuvem (Servidor Remoto)",
                category: "Armazenamento Remoto",
                icon: "☁️",
                concept: "Armazenamento REMOTO (Nuvem) guarda os arquivos em grandes computadores (servidores) espalhados pelo mundo conectados pela internet.",
                question: "Por que muitas pessoas salvam documentos importantes na Nuvem (Remoto)?",
                options: [
                    { text: "Porque na nuvem os arquivos chovem quando chove", correct: false },
                    { text: "Para poder abrir de qualquer computador, tablet ou celular com internet", correct: true },
                    { text: "Porque é proibido salvar no próprio computador", correct: false },
                    { text: "Para o computador gastar menos bateria", correct: false }
                ],
                explanation: "Certíssimo! A Nuvem permite acessar seus arquivos de onde você estiver e protege seus dados caso seu computador local quebre!"
            },
            {
                id: "wifi_token",
                name: "Conexão de Internet (Wi-Fi)",
                category: "Ponte de Rede",
                icon: "📶",
                concept: "Para enviar dados do seu computador local para a Nuvem remota, você precisa de uma conexão de rede (Internet).",
                question: "Se a internet cair na sua casa, o que acontece com os arquivos guardados na Nuvem?",
                options: [
                    { text: "Eles são deletados para sempre", correct: false },
                    { text: "Eles caem no chão da sua sala", correct: false },
                    { text: "O computador explode", correct: false },
                    { text: "Eles continuam salvos lá, mas você só poderá acessá-los quando a internet voltar", correct: true }
                ],
                explanation: "Exatamente! Seus dados na Nuvem continuam seguros nos servidores, aguardando você se reconectar à internet."
            }
        ],

        gateChallenge: {
            title: "Desafio Final: O Dilema dos Arquivos",
            icon: "🌐",
            concept: "Situação prática de computação: você precisa decidir o melhor local para guardar o arquivo!",
            question: "Ana e Lucas estão fazendo um trabalho da escola juntos e precisam editar o mesmo arquivo de suas casas. Onde eles devem salvar?",
            options: [
                { text: "Apenas no Pen Drive que ficou esquecido na mochila", correct: false },
                { text: "Apenas na memória RAM do computador", correct: false },
                { text: "No Armazenamento Remoto (Nuvem / Google Drive / OneDrive)", correct: true },
                { text: "Imprimir no papel e queimar o arquivo", correct: false }
            ],
            explanation: "Perfeito! A Nuvem é ideal para trabalho colaborativo e compartilhamento remoto entre pessoas!"
        }
    },

    // Fase 3: O Castelo do Sistema Operacional (EF05CO07)
    world3: {
        title: "Mundo 3: O Castelo do Sistema Operacional",
        skill: "BNCC (EF05CO07)",
        description: "Reconheça a necessidade fundamental do Sistema Operacional para executar programas e gerenciar o hardware!",

        items: [
            {
                id: "so_maestro",
                name: "O Maestro do Computador",
                category: "Sistema Operacional",
                icon: "⚙️",
                concept: "O Sistema Operacional (como Windows, Linux, Android) é como o maestro de uma orquestra: ele comanda todas as peças para tocarem juntas sem desafinar!",
                question: "O que aconteceria se um computador NÃO tivesse nenhum Sistema Operacional instalado?",
                options: [
                    { text: "Ele funcionaria 10 vezes mais rápido", correct: false },
                    { text: "Os programas e jogos não conseguiriam rodar nem usar as peças do computador", correct: true },
                    { text: "Ele viraria um videogame da Nintendo automaticamente", correct: false },
                    { text: "A tela ficaria colorida com fogos de artifício", correct: false }
                ],
                explanation: "Perfeito! Sem o Sistema Operacional, o computador é apenas um amontoado de peças sem saber como conversar entre si!"
            },
            {
                id: "gerenciador_hardware",
                name: "Gerenciador de Hardware",
                category: "Controle de Dispositivos",
                icon: "🔌",
                concept: "Quando você abre um jogo, o Sistema Operacional avisa a placa de vídeo para desenhar os gráficos e a caixa de som para tocar a música.",
                question: "Quem é responsável por organizar quais programas podem usar o processador e a memória a cada segundo?",
                options: [
                    { text: "O Sistema Operacional", correct: true },
                    { text: "O cabo de rede", correct: false },
                    { text: "A tampa plástica do gabinete", correct: false },
                    { text: "A tomada da parede", correct: false }
                ],
                explanation: "Correto! O Sistema Operacional gerencia o tempo do processador e divide a memória para que nenhum aplicativo trave o outro."
            },
            {
                id: "interface_grafica",
                name: "Interface com o Usuário",
                category: "Usabilidade",
                icon: "🪟",
                concept: "O Sistema Operacional cria janelas, botões, pastas e ícones para que qualquer pessoa possa usar o computador com facilidade!",
                question: "Por que é fácil para crianças e adultos usarem celulares e computadores modernos?",
                options: [
                    { text: "Porque as pessoas precisam memorizar códigos de física quântica", correct: false },
                    { text: "Porque o computador lê os pensamentos das pessoas", correct: false },
                    { text: "Porque tudo funciona por telepatia", correct: false },
                    { text: "Porque o Sistema Operacional oferece uma Interface Gráfica com ícones, toques e janelas amigáveis", correct: true }
                ],
                explanation: "Excelente! A interface gráfica criada pelo Sistema Operacional traduz códigos complexos em botões fáceis e intuitivos."
            }
        ],

        gateChallenge: {
            title: "Grande Batalha: Domando o Bug do Caos",
            icon: "👾",
            concept: "O Bug do Caos tentou bloquear o computador! Restaure a ordem provando que você compreende o Sistema Operacional:",
            question: "Qual das frases abaixo resume melhor a importância do Sistema Operacional?",
            options: [
                { text: "Ele serve apenas para desenhar o papel de parede", correct: false },
                { text: "Ele é apenas uma peça de plástico dentro do teclado", correct: false },
                { text: "Ele gerencia o hardware (peças) e fornece a base para que todos os nossos programas e jogos possam funcionar", correct: true },
                { text: "Ele é desnecessário porque os jogos falam sozinhos com os chips", correct: false }
            ],
            explanation: "VITÓRIA TOTAL! Você compreendeu perfeitamente o papel vital do Sistema Operacional! O computador está totalmente recuperado e pronto para o futuro digital!"
        }
    }
};

class PedagogicalController {
    constructor() {
        this.currentWorld = "world1";
        this.discoveredItems = new Set();
        this.activeChallenge = null;
        this.onSuccessCallback = null;

        // Elementos de UI
        this.modal = document.getElementById("pedagogical-modal");
        this.badge = document.getElementById("modal-skill-badge");
        this.title = document.getElementById("modal-title");
        this.icon = document.getElementById("modal-illustration");
        this.conceptText = document.getElementById("modal-concept-text");
        this.challengeArea = document.getElementById("modal-challenge-area");
        this.feedback = document.getElementById("modal-feedback");
        this.confirmBtn = document.getElementById("modal-confirm-btn");
        this.toast = document.getElementById("game-toast");

        this.initEvents();
    }

    initEvents() {
        this.confirmBtn.addEventListener("click", () => {
            this.closeModal();
            if (this.onSuccessCallback) {
                const cb = this.onSuccessCallback;
                this.onSuccessCallback = null;
                cb();
            }
        });
    }

    setWorld(worldKey) {
        this.currentWorld = worldKey;
    }

    showToast(message, duration = 3000) {
        if (!this.toast) return;
        this.toast.textContent = message;
        this.toast.classList.remove("hidden");
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            this.toast.classList.add("hidden");
        }, duration);
    }

    // Abre modal para desafio ou item de bloco '?'
    openItemModal(item, onComplete) {
        this.activeChallenge = item;
        this.onSuccessCallback = onComplete;
        const worldData = PedagogicalData[this.currentWorld];

        this.badge.textContent = worldData.skill;
        this.title.textContent = item.name + " (" + item.category + ")";
        this.icon.textContent = item.icon || "💡";
        this.conceptText.textContent = item.concept;

        // Renderiza botões de opção
        this.challengeArea.innerHTML = "";
        this.feedback.className = "feedback-msg hidden";
        this.confirmBtn.classList.add("hidden");

        const questionTitle = document.createElement("p");
        questionTitle.style.fontWeight = "bold";
        questionTitle.style.marginBottom = "10px";
        questionTitle.style.color = "#fbc02d";
        questionTitle.style.gridColumn = "1 / -1";
        questionTitle.textContent = "❓ " + item.question;
        this.challengeArea.appendChild(questionTitle);

        // Clona e embaralha as opções aleatoriamente (Fisher-Yates) para que a resposta correta
        // fique distribuída aleatoriamente entre as alternativas A, B, C ou D a cada exibição!
        const shuffledOptions = [...item.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        shuffledOptions.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.innerHTML = `<span>${["A", "B", "C", "D"][idx]})</span> <span>${opt.text}</span>`;
            btn.addEventListener("click", () => this.handleAnswer(opt, btn, item.explanation));
            this.challengeArea.appendChild(btn);
        });

        this.modal.classList.remove("hidden");
    }

    // Trata clique na resposta
    handleAnswer(option, btnElement, explanation) {
        const buttons = this.challengeArea.querySelectorAll(".opt-btn");

        if (option.correct) {
            sounds.playQuizCorrect();
            btnElement.classList.add("correct");
            buttons.forEach(b => b.disabled = true);

            this.feedback.className = "feedback-msg success";
            this.feedback.innerHTML = `<span>✅</span> <span>${explanation}</span>`;
            this.confirmBtn.classList.remove("hidden");
            this.confirmBtn.focus();

            // Adiciona pontuação extra
            window.gameEngine?.addScore(500);
            this.showToast("⭐ +500 Pontos de Conhecimento BNCC!", 2500);
        } else {
            sounds.playQuizWrong();
            btnElement.classList.add("wrong");
            this.feedback.className = "feedback-msg error";
            this.feedback.innerHTML = "<span>❌</span> <span>Ops! Tente novamente. Lembre-se do conceito lido acima!</span>";
            setTimeout(() => {
                btnElement.classList.remove("wrong");
            }, 1200);
        }
    }

    closeModal() {
        this.modal.classList.add("hidden");
        window.gameEngine?.resume();
    }
}
