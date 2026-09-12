/**
 * Super Bit Bros - Inicializador Principal e Controle de Entrada
 * Gerenciamento de teclado, trackpad/mouse, botões de ação e loop de animação.
 */

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const pedagogical = new PedagogicalController();
    const engine = new GameEngine(canvas, pedagogical);
    window.gameEngine = engine;

    // Estado das entradas (Teclado e Controles Virtuais)
    const keys = {
        left: false,
        right: false,
        jump: false,
        action: false
    };

    let audioInitialized = false;

    // Inicia o áudio na primeira interação do usuário (exigência do Chrome)
    const startAudioOnGesture = () => {
        if (!audioInitialized) {
            sounds.init();
            sounds.startMusic();
            audioInitialized = true;
        }
    };

    window.addEventListener("keydown", startAudioOnGesture, { once: true });
    window.addEventListener("click", startAudioOnGesture, { once: true });

    // === MAPEAMENTO DE TECLADO ===
    window.addEventListener("keydown", (e) => {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
            e.preventDefault(); // Evita rolagem da página no navegador
        }

        switch (e.code) {
            case "ArrowLeft":
            case "KeyA":
                keys.left = true;
                break;
            case "ArrowRight":
            case "KeyD":
                keys.right = true;
                break;
            case "ArrowUp":
            case "KeyW":
            case "Space":
                keys.jump = true;
                break;
            case "KeyE":
            case "Enter":
                keys.action = true;
                break;
        }
    });

    window.addEventListener("keyup", (e) => {
        switch (e.code) {
            case "ArrowLeft":
            case "KeyA":
                keys.left = false;
                break;
            case "ArrowRight":
            case "KeyD":
                keys.right = false;
                break;
            case "ArrowUp":
            case "KeyW":
            case "Space":
                keys.jump = false;
                break;
            case "KeyE":
            case "Enter":
                keys.action = false;
                break;
        }
    });

    // === MAPEAMENTO DE CONTROLES PARA TRACKPAD & MOUSE / TOQUE ===
    const bindVirtualButton = (btnId, keyName) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        const press = (e) => {
            e.preventDefault();
            startAudioOnGesture();
            keys[keyName] = true;
            btn.classList.add("active");
        };

        const release = (e) => {
            e.preventDefault();
            keys[keyName] = false;
            btn.classList.remove("active");
        };

        btn.addEventListener("mousedown", press);
        btn.addEventListener("mouseup", release);
        btn.addEventListener("mouseleave", release);

        btn.addEventListener("touchstart", press, { passive: false });
        btn.addEventListener("touchend", release, { passive: false });
        btn.addEventListener("touchcancel", release, { passive: false });
    };

    bindVirtualButton("vbtn-left", "left");
    bindVirtualButton("vbtn-right", "right");
    bindVirtualButton("vbtn-jump", "jump");
    bindVirtualButton("vbtn-action", "action"); // Botão de ação/interação direta com blocos e objetos

    // === BOTÕES DO CABEÇALHO ARCADE ===
    // Botão Som
    const btnSound = document.getElementById("btn-sound");
    btnSound.addEventListener("click", () => {
        startAudioOnGesture();
        const muted = sounds.toggleMute();
        btnSound.textContent = muted ? "🔇 SOM" : "🔊 SOM";
        btnSound.style.borderColor = muted ? "#e53935" : "#5c6bc0";
    });

    // Botão Ajuda / BNCC
    const btnHelp = document.getElementById("btn-help");
    const helpModal = document.getElementById("help-modal");
    const btnCloseHelp = document.getElementById("btn-close-help");

    btnHelp.addEventListener("click", () => {
        engine.pause();
        helpModal.classList.remove("hidden");
    });

    btnCloseHelp.addEventListener("click", () => {
        helpModal.classList.add("hidden");
        engine.resume();
    });

    // Botão Reiniciar Fase
    const btnRestart = document.getElementById("btn-restart");
    btnRestart.addEventListener("click", () => {
        if (confirm("Deseja reiniciar a fase atual?")) {
            engine.loadLevel(engine.currentLevelIndex);
        }
    });

    // Botão Próxima Fase no Modal de Vitória
    const nextLevelBtn = document.getElementById("btn-next-level");
    const victoryModal = document.getElementById("victory-modal");

    nextLevelBtn.addEventListener("click", () => {
        victoryModal.classList.add("hidden");
        let nextLvl = engine.currentLevelIndex + 1;
        if (nextLvl > 3) {
            nextLvl = 1; // Recomeça se terminou o Mundo 3
            engine.score = 0;
            engine.coins = 0;
            engine.lives = 3;
        }
        engine.loadLevel(nextLvl);
        engine.resume();
        sounds.startMusic();
    });

    // === LOOP PRINCIPAL DE EXECUÇÃO (60 FPS) ===
    function gameLoop() {
        engine.update(keys);
        engine.render();
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});
