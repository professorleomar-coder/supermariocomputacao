/**
 * Super Bit Bros - Motor de Jogo e Física de Plataforma
 * Colisões AABB precisas, câmera contínua com rolagem lateral e gerenciamento de entidades.
 */

class GameEngine {
    constructor(canvas, pedagogicalCtrl) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.pedagogical = pedagogicalCtrl;

        // Dimensões lógicas do Canvas
        this.viewWidth = canvas.width;
        this.viewHeight = canvas.height;

        // Estado do Jogo
        this.score = 0;
        this.coins = 0;
        this.lives = 3;
        this.currentLevelIndex = 1;
        this.isPaused = false;
        this.animTimer = 0;

        // Câmera
        this.cameraX = 0;

        // Entidades
        this.player = null;
        this.level = null;
        this.activeCoins = [];
        this.activeEnemies = [];
        this.floatingTexts = [];
        this.bouncingBlocks = [];

        // Flag de finalização de fase
        this.levelCompleted = false;
        this.flagProgress = 0;

        this.initPlayer();
        this.loadLevel(this.currentLevelIndex);
    }

    initPlayer() {
        this.player = {
            x: 80,
            y: 380,
            w: 32,
            h: 44,
            vx: 0,
            vy: 0,
            speed: 0.45,
            maxSpeed: 4.8,
            friction: 0.84,
            gravity: 0.6,
            jumpStrength: -13.5,
            onGround: false,
            facingRight: true,
            isJumping: false,
            isMoving: false,
            animTimer: 0,
            invulnerableTimer: 0,
            isDead: false
        };
    }

    loadLevel(levelIndex) {
        this.currentLevelIndex = levelIndex;
        this.level = LevelManager.getLevel(levelIndex);
        this.pedagogical.setWorld(this.level.worldId);

        // Clona blocos para preservar estado da fase
        this.blocks = JSON.parse(JSON.stringify(this.level.blocks));
        this.activeCoins = JSON.parse(JSON.stringify(this.level.coins));
        this.activeEnemies = this.level.enemies.map(e => ({
            x: e.x,
            y: e.y,
            w: 34,
            h: 30,
            vx: e.vx,
            isSquashed: false,
            squashTimer: 0,
            isDead: false
        }));

        // Reposiciona o jogador
        this.player.x = this.level.spawn.x;
        this.player.y = this.level.spawn.y;
        this.player.vx = 0;
        this.player.vy = 0;
        this.cameraX = 0;
        this.levelCompleted = false;
        this.flagProgress = 0;

        this.updateHUD();
        this.pedagogical.showToast(`🚩 ${this.level.name}!`, 3000);
    }

    addScore(pts) {
        this.score += pts;
        this.updateHUD();
    }

    addCoin() {
        this.coins++;
        this.addScore(100);
        sounds.playCoin();
        if (this.coins >= 100) {
            this.coins = 0;
            this.lives++;
            sounds.playPowerUp();
            this.pedagogical.showToast("⭐ 1-UP! Vida Extra!", 2000);
        }
        this.updateHUD();
    }

    updateHUD() {
        document.getElementById("hud-score").textContent = String(this.score).padStart(6, "0");
        document.getElementById("hud-coins").textContent = `x${String(this.coins).padStart(2, "0")}`;
        document.getElementById("hud-world").textContent = this.level ? this.level.levelNumber : "1-1";
        document.getElementById("hud-lives").textContent = `❤️ x${this.lives}`;
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    // Loop de Atualização de Física
    update(keys) {
        if (this.isPaused) return;

        this.animTimer++;
        const p = this.player;

        if (p.invulnerableTimer > 0) {
            p.invulnerableTimer--;
        }

        // Se estiver em animação de término de fase descendo a bandeira
        if (this.levelCompleted) {
            if (this.flagProgress < 1) {
                this.flagProgress += 0.025;
            }
            if (p.y < 416) {
                p.y += 3;
            } else {
                p.vx = 2.4;
                p.x += p.vx;
                p.facingRight = true;
                p.isMoving = true;
                p.animTimer++;
                // Quando o jogador entra na porta do castelo
                if (p.x >= this.level.flagX + 180) {
                    p.vx = 0;
                    this.pause();
                    setTimeout(() => {
                        this.showVictoryModal();
                    }, 400);
                }
            }
            return;
        }

        // Controles Horizontais
        if (keys.left) {
            p.vx -= p.speed;
            p.facingRight = false;
            p.isMoving = true;
        } else if (keys.right) {
            p.vx += p.speed;
            p.facingRight = true;
            p.isMoving = true;
        } else {
            p.vx *= p.friction;
            if (Math.abs(p.vx) < 0.1) p.vx = 0;
            p.isMoving = false;
        }

        // Limita velocidade máxima horizontal
        p.vx = Math.max(Math.min(p.vx, p.maxSpeed), -p.maxSpeed);

        // Pulo
        if (keys.jump && p.onGround) {
            p.vy = p.jumpStrength;
            p.onGround = false;
            p.isJumping = true;
            sounds.playJump();
        }

        // Aplica Gravidade
        p.vy += p.gravity;
        if (p.vy > 12) p.vy = 12; // Velocidade terminal de queda

        p.isJumping = !p.onGround;
        p.animTimer = p.isMoving ? p.animTimer + 1 : 0;

        // Movimento Horizontal e Colisões
        p.x += p.vx;
        this.checkHorizontalCollisions(p);

        // Movimento Vertical e Colisões
        p.onGround = false;
        p.y += p.vy;
        this.checkVerticalCollisions(p);

        // Interação manual com blocos
        if (keys.action) {
            this.checkActionInteraction();
        }

        // Atualização e física dos inimigos
        this.updateEnemies();

        // Checagem de coleta de moedas
        this.checkCoinCollections();

        // Checagem de término de fase (chegada ao mastro)
        if (p.x >= this.level.flagX && !this.levelCompleted) {
            this.reachFlagpole();
        }

        // Queda no abismo (perde vida)
        if (p.y > this.viewHeight + 60) {
            this.handlePlayerDeath();
        }

        // Atualiza blocos que saltam ao bater por baixo
        this.updateBouncingBlocks();

        // Câmera acompanha o jogador
        const targetCamX = p.x - this.viewWidth * 0.35;
        this.cameraX += (targetCamX - this.cameraX) * 0.1;
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.level.width - this.viewWidth));
    }

    // Colisões Horizontais com Blocos e Canos
    checkHorizontalCollisions(p) {
        for (const b of this.blocks) {
            if (this.isColliding(p, b)) {
                if (p.vx > 0) {
                    p.x = b.x - p.w;
                    p.vx = 0;
                } else if (p.vx < 0) {
                    p.x = b.x + b.w;
                    p.vx = 0;
                }
            }
        }
        // Limites da fase
        if (p.x < 0) {
            p.x = 0;
            p.vx = 0;
        }
    }

    // Colisões Verticais (Chão, Teto e Cabeçada em Blocos)
    checkVerticalCollisions(p) {
        for (const b of this.blocks) {
            if (this.isColliding(p, b)) {
                // Aterrissando sobre a plataforma/bloco
                if (p.vy >= 0 && (p.y + p.h - p.vy) <= b.y + 12) {
                    p.y = b.y - p.h;
                    p.vy = 0;
                    p.onGround = true;
                }
                // Cabeçada por baixo do bloco (pulando para cima)
                else if (p.vy < 0) {
                    p.y = b.y + b.h;
                    p.vy = 0;
                    this.hitBlockFromBelow(b);
                }
            }
        }
    }

    // Interação manual com tecla E / Enter ou botão Interagir
    checkActionInteraction() {
        const p = this.player;
        const reachBox = {
            x: p.x - 24,
            y: p.y - 24,
            w: p.w + 48,
            h: p.h + 48
        };
        for (const b of this.blocks) {
            if (b.type === "question" && !b.hit && this.isColliding(reachBox, b)) {
                this.hitBlockFromBelow(b);
                break;
            }
        }
    }

    // Ação ao bater a cabeça no bloco por baixo
    hitBlockFromBelow(b) {
        if (b.type === "question" && !b.hit) {
            b.hit = true;
            this.triggerBlockBounce(b);

            if (b.itemId) {
                // Bloco pedagógico da BNCC!
                const worldItems = PedagogicalData[this.level.worldId].items;
                const itemData = worldItems.find(it => it.id === b.itemId);
                if (itemData) {
                    sounds.playPowerUp();
                    this.pause();
                    this.pedagogical.openItemModal(itemData, () => {
                        this.addScore(1000);
                    });
                }
            } else if (b.hasCoin) {
                // Bloco que solta moeda
                this.addCoin();
            }
        } else if (b.type === "brick") {
            this.triggerBlockBounce(b);
            sounds.playBump();
        }
    }

    triggerBlockBounce(b) {
        b.bounceOffset = -8;
        this.bouncingBlocks.push(b);
    }

    updateBouncingBlocks() {
        for (let i = this.bouncingBlocks.length - 1; i >= 0; i--) {
            const b = this.bouncingBlocks[i];
            if (b.bounceOffset < 0) {
                b.bounceOffset += 1.5;
                if (b.bounceOffset >= 0) {
                    b.bounceOffset = 0;
                    this.bouncingBlocks.splice(i, 1);
                }
            }
        }
    }

    // Atualiza inimigos e suas colisões
    updateEnemies() {
        const p = this.player;

        this.activeEnemies.forEach(e => {
            if (e.isDead) return;

            if (e.isSquashed) {
                e.squashTimer++;
                if (e.squashTimer > 25) e.isDead = true;
                return;
            }

            // Movimentação
            e.x += e.vx;

            // Inverte direção ao bater em blocos ou canos
            for (const b of this.blocks) {
                if (this.isColliding(e, b)) {
                    e.vx = -e.vx;
                    e.x += e.vx * 2;
                    break;
                }
            }

            // Colisão com o Jogador
            if (!p.isDead && p.invulnerableTimer === 0 && this.isColliding(p, e)) {
                // Pulo na cabeça do Bug!
                if (p.vy > 0 && p.y + p.h < e.y + e.h * 0.75) {
                    e.isSquashed = true;
                    p.vy = -8.5; // Impulso do salto
                    sounds.playStomp();
                    this.addScore(200);
                    this.pedagogical.showToast("👾 Bug Eliminado! +200", 1500);
                } else {
                    // Jogador atingido de lado
                    this.handlePlayerDamage();
                }
            }
        });
    }

    // Coleta de Moedas
    checkCoinCollections() {
        const p = this.player;
        for (let i = this.activeCoins.length - 1; i >= 0; i--) {
            const c = this.activeCoins[i];
            const coinBox = { x: c.x, y: c.y, w: 24, h: 24 };
            if (this.isColliding(p, coinBox)) {
                this.activeCoins.splice(i, 1);
                this.addCoin();
            }
        }
    }

    // Chegada ao Mastro e Desafio Final da Fase
    reachFlagpole() {
        this.levelCompleted = true;
        this.player.vx = 0;
        this.player.vy = 0;

        // Desafio do Portão / Castelo da BNCC
        const gate = PedagogicalData[this.level.worldId].gateChallenge;
        sounds.playPowerUp();
        this.pause();

        this.pedagogical.openItemModal(gate, () => {
            sounds.playVictory();
            this.resume();
        });
    }

    showVictoryModal() {
        const vModal = document.getElementById("victory-modal");
        const vTitle = document.getElementById("victory-title");
        const vMsg = document.getElementById("victory-message");
        const vStats = document.getElementById("victory-stats");
        const nextBtn = document.getElementById("btn-next-level");

        vTitle.textContent = `${this.level.name} Concluído!`;
        vMsg.textContent = `Parabéns! Você aplicou com sucesso a habilidade ${PedagogicalData[this.level.worldId].skill}!`;
        vStats.innerHTML = `
            <p><strong>Pontuação Total:</strong> ${this.score} pontos</p>
            <p><strong>Bits Coletados:</strong> ${this.coins}</p>
            <p><strong>Vidas Restantes:</strong> ${this.lives}</p>
        `;

        if (this.currentLevelIndex >= 3) {
            nextBtn.textContent = "JOGAR NOVAMENTE 🏆";
        } else {
            nextBtn.textContent = `IR PARA O MUNDO ${this.currentLevelIndex + 1} ➔`;
        }

        vModal.classList.remove("hidden");
    }

    handlePlayerDamage() {
        this.lives--;
        this.updateHUD();
        sounds.playQuizWrong();

        if (this.lives <= 0) {
            this.handleGameOver();
        } else {
            this.player.invulnerableTimer = 90; // Piscar por 1.5s
            this.player.vy = -6;
            this.player.vx = this.player.facingRight ? -4 : 4;
            this.pedagogical.showToast("⚠️ Cuidado com os Bugs! -1 Vida", 2000);
        }
    }

    handlePlayerDeath() {
        this.lives--;
        this.updateHUD();
        sounds.playQuizWrong();

        if (this.lives <= 0) {
            this.handleGameOver();
        } else {
            // Respawn no início da fase
            this.player.x = this.level.spawn.x;
            this.player.y = this.level.spawn.y;
            this.player.vx = 0;
            this.player.vy = 0;
            this.player.invulnerableTimer = 60;
            this.pedagogical.showToast("🔄 Reiniciando na base!", 2000);
        }
    }

    handleGameOver() {
        this.pause();
        sounds.playQuizWrong();
        alert("GAME OVER! Você perdeu todas as vidas. Vamos recarregar a fase para aprender ainda mais!");
        this.lives = 3;
        this.score = 0;
        this.coins = 0;
        this.loadLevel(this.currentLevelIndex);
        this.resume();
    }

    // Teste AABB simples
    isColliding(r1, r2) {
        return (
            r1.x < r2.x + r2.w &&
            r1.x + r1.w > r2.x &&
            r1.y < r2.y + r2.h &&
            r1.y + r1.h > r2.y
        );
    }

    // Renderização no Canvas
    render() {
        const ctx = this.ctx;
        ctx.save();

        // Limpa a tela com o fundo temático
        ctx.fillStyle = this.level.bgColor || "#5c94fc";
        ctx.fillRect(0, 0, this.viewWidth, this.viewHeight);

        // Nuvens e cenário de fundo com parallax suave
        this.level.scenery.forEach(s => {
            const scX = s.x - this.cameraX * 0.4;
            Sprites.drawCloud(ctx, scX, s.y, s.scale);
        });

        // Aplica translação da Câmera
        ctx.translate(-Math.floor(this.cameraX), 0);

        // Renderiza Blocos e Plataformas
        this.blocks.forEach(b => {
            const drawY = b.y + (b.bounceOffset || 0);

            if (b.type === "ground") {
                for (let gx = b.x; gx < b.x + b.w; gx += LevelManager.tileSize) {
                    Sprites.drawGroundTile(ctx, gx, drawY, LevelManager.tileSize, this.level.theme);
                }
            } else if (b.type === "pipe") {
                Sprites.drawPipe(ctx, b.x, drawY, b.w, b.h);
            } else if (b.type === "brick") {
                for (let bx = b.x; bx < b.x + b.w; bx += LevelManager.tileSize) {
                    Sprites.drawBrickBlock(ctx, bx, drawY, LevelManager.tileSize);
                }
            } else if (b.type === "question") {
                Sprites.drawQuestionBlock(ctx, b.x, drawY, b.w, b.hit, this.animTimer);
            } else if (b.type === "cloud_platform") {
                Sprites.drawCloudPlatform(ctx, b.x, drawY, b.w, b.h);
            }
        });

        // Renderiza Moedas Binárias
        this.activeCoins.forEach(c => {
            Sprites.drawCoin(ctx, c.x, c.y, 24, this.animTimer);
        });

        // Renderiza Castelo de Final de Fase
        Sprites.drawCastle(ctx, this.level.flagX + 110, 280, 180, 180);

        // Renderiza Mastro de Vitória
        Sprites.drawFlagpole(ctx, this.level.flagX, 160, 300, this.flagProgress);

        // Renderiza Inimigos
        this.activeEnemies.forEach(e => {
            if (!e.isDead) {
                Sprites.drawEnemy(ctx, e.x, e.y, e.w, e.h, e.isSquashed, this.animTimer);
            }
        });

        // Se estiver no Mundo 3, renderiza o "Bug do Caos" guardando o castelo antes da vitória
        if (this.level.worldId === "world3" && !this.levelCompleted) {
            Sprites.drawBoss(ctx, this.level.flagX - 100, 400, 60, 60, this.animTimer);
        }

        // Renderiza o Jogador (com efeito de piscar se invulnerável)
        const p = this.player;
        // Oculta o jogador caso ele já tenha entrado completamente na porta do castelo
        if (!(this.levelCompleted && p.x >= this.level.flagX + 180)) {
            if (p.invulnerableTimer === 0 || Math.floor(p.invulnerableTimer / 6) % 2 === 0) {
                Sprites.drawPlayer(ctx, p.x, p.y, p.w, p.h, p, p.facingRight);
            }
        }

        ctx.restore();
    }
}
