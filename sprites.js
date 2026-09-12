// Polyfill para CanvasRenderingContext2D.roundRect caso navegador antigo seja utilizado
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (typeof r === 'undefined') r = 4;
        if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
        this.beginPath();
        this.moveTo(x + (r.tl || 0), y);
        this.lineTo(x + w - (r.tr || 0), y);
        this.quadraticCurveTo(x + w, y, x + w, y + (r.tr || 0));
        this.lineTo(x + w, y + h - (r.br || 0));
        this.quadraticCurveTo(x + w, y + h, x + w - (r.br || 0), y + h);
        this.lineTo(x + (r.bl || 0), y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - (r.bl || 0));
        this.lineTo(x, y + (r.tl || 0));
        this.quadraticCurveTo(x, y, x + (r.tl || 0), y);
        this.closePath();
        return this;
    };
}

const Sprites = {
    // Desenha o protagonista "Bit Boy" estilo Super Mario
    drawPlayer(ctx, x, y, width, height, state, facingRight = true) {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        if (!facingRight) {
            ctx.scale(-1, 1);
        }
        ctx.translate(-width / 2, -height / 2);

        const pw = width;
        const ph = height;

        // Boné Vermelho
        ctx.fillStyle = "#d32f2f";
        ctx.fillRect(pw * 0.2, ph * 0.05, pw * 0.65, ph * 0.2);
        ctx.fillRect(pw * 0.45, ph * 0.15, pw * 0.5, ph * 0.1); // Aba do boné

        // Rosto / Pele
        ctx.fillStyle = "#ffcc80";
        ctx.fillRect(pw * 0.25, ph * 0.25, pw * 0.55, ph * 0.25);

        // Olho
        ctx.fillStyle = "#212121";
        ctx.fillRect(pw * 0.6, ph * 0.28, pw * 0.1, ph * 0.12);

        // Bigode icônico
        ctx.fillStyle = "#3e2723";
        ctx.fillRect(pw * 0.5, ph * 0.4, pw * 0.32, ph * 0.1);

        // Camisa Vermelha
        ctx.fillStyle = "#d32f2f";
        ctx.fillRect(pw * 0.2, ph * 0.5, pw * 0.6, ph * 0.25);

        // Macacão Azul
        ctx.fillStyle = "#1976d2";
        ctx.fillRect(pw * 0.25, ph * 0.55, pw * 0.5, ph * 0.28);
        ctx.fillRect(pw * 0.2, ph * 0.75, pw * 0.6, ph * 0.12);

        // Botões dourados do macacão
        ctx.fillStyle = "#ffd54f";
        ctx.fillRect(pw * 0.32, ph * 0.62, pw * 0.08, ph * 0.08);
        ctx.fillRect(pw * 0.6, ph * 0.62, pw * 0.08, ph * 0.08);

        // Pernas e Sapatos com animação de corrida/pulo
        ctx.fillStyle = "#4e342e";
        if (state.isJumping) {
            // Pose de salto heroico
            ctx.fillRect(pw * 0.1, ph * 0.85, pw * 0.35, ph * 0.15);
            ctx.fillRect(pw * 0.55, ph * 0.78, pw * 0.35, ph * 0.15);
        } else if (state.isMoving) {
            const frame = Math.floor(state.animTimer / 8) % 3;
            if (frame === 0) {
                ctx.fillRect(pw * 0.15, ph * 0.85, pw * 0.3, ph * 0.15);
                ctx.fillRect(pw * 0.55, ph * 0.85, pw * 0.3, ph * 0.15);
            } else if (frame === 1) {
                ctx.fillRect(pw * 0.05, ph * 0.85, pw * 0.35, ph * 0.15);
                ctx.fillRect(pw * 0.6, ph * 0.8, pw * 0.35, ph * 0.15);
            } else {
                ctx.fillRect(pw * 0.2, ph * 0.8, pw * 0.35, ph * 0.15);
                ctx.fillRect(pw * 0.45, ph * 0.85, pw * 0.35, ph * 0.15);
            }
        } else {
            // Em pé / Idle
            ctx.fillRect(pw * 0.2, ph * 0.85, pw * 0.28, ph * 0.15);
            ctx.fillRect(pw * 0.52, ph * 0.85, pw * 0.28, ph * 0.15);
        }

        ctx.restore();
    },

    // Bloco de Interrogação [?] brilhante
    drawQuestionBlock(ctx, x, y, size, hit = false, animFrame = 0) {
        ctx.save();
        if (hit) {
            // Bloco vazio já atingido
            ctx.fillStyle = "#8d6e63";
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = "#4e342e";
            ctx.lineWidth = 3;
            ctx.strokeRect(x + 1.5, y + 1.5, size - 3, size - 3);

            // Parafusos nos cantos
            ctx.fillStyle = "#3e2723";
            ctx.fillRect(x + 4, y + 4, 3, 3);
            ctx.fillRect(x + size - 7, y + 4, 3, 3);
            ctx.fillRect(x + 4, y + size - 7, 3, 3);
            ctx.fillRect(x + size - 7, y + size - 7, 3, 3);
        } else {
            // Bloco ativo dourado pulsante
            const glow = Math.sin(animFrame * 0.1) * 15;
            ctx.fillStyle = `rgb(${251 + glow * 0.2}, ${192 + glow}, 45)`;
            ctx.fillRect(x, y, size, size);

            // Borda e sombra 3D
            ctx.fillStyle = "#ffeb3b";
            ctx.fillRect(x, y, size, 4);
            ctx.fillRect(x, y, 4, size);
            ctx.fillStyle = "#f57f17";
            ctx.fillRect(x, y + size - 4, size, 4);
            ctx.fillRect(x + size - 4, y, 4, size);

            // Parafusos
            ctx.fillStyle = "#e65100";
            ctx.fillRect(x + 5, y + 5, 3, 3);
            ctx.fillRect(x + size - 8, y + 5, 3, 3);
            ctx.fillRect(x + 5, y + size - 8, 3, 3);
            ctx.fillRect(x + size - 8, y + size - 8, 3, 3);

            // Símbolo "?"
            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${Math.floor(size * 0.65)}px 'Press Start 2P', monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("?", x + size / 2, y + size / 2 + 2);

            ctx.fillStyle = "#e65100";
            ctx.fillText("?", x + size / 2 - 1, y + size / 2 + 1);
        }
        ctx.restore();
    },

    // Bloco de Tijolo Clássico
    drawBrickBlock(ctx, x, y, size) {
        ctx.save();
        ctx.fillStyle = "#b71c1c";
        ctx.fillRect(x, y, size, size);

        ctx.strokeStyle = "#450a0a";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, size, size);

        // Textura de tijolos horizontais
        const midY = y + size / 2;
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x + size, midY);
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, midY);
        ctx.moveTo(x + size / 4, midY);
        ctx.lineTo(x + size / 4, y + size);
        ctx.moveTo(x + 3 * size / 4, midY);
        ctx.lineTo(x + 3 * size / 4, y + size);
        ctx.stroke();

        ctx.restore();
    },

    // Bloco de Terra com Grama / Circuito Integrado Verde
    drawGroundTile(ctx, x, y, size, theme = "world1") {
        ctx.save();
        if (theme === "world3") {
            // Tema Placa-Mãe / Circuito Tecnológico
            ctx.fillStyle = "#0d2b1d";
            ctx.fillRect(x, y, size, size);

            // Linhas douradas de circuito
            ctx.strokeStyle = "#ffd54f";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y + size * 0.3);
            ctx.lineTo(x + size * 0.6, y + size * 0.3);
            ctx.lineTo(x + size, y + size * 0.8);
            ctx.stroke();

            ctx.fillStyle = "#ffd54f";
            ctx.beginPath();
            ctx.arc(x + size * 0.6, y + size * 0.3, 3, 0, Math.PI * 2);
            ctx.fill();

            // Borda superior brilhante
            ctx.fillStyle = "#00e676";
            ctx.fillRect(x, y, size, 4);
        } else if (theme === "world2") {
            // Tema Nuvem e Servidor
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(x, y, size, 5);
            ctx.fillStyle = "#0284c7";
            ctx.fillRect(x + 4, y + 10, size - 8, 4);
            ctx.fillRect(x + 4, y + 20, size - 8, 4);
        } else {
            // Tema Clássico Mario: Terra Marrom com Topo Verde Gramado
            ctx.fillStyle = "#8d6e63";
            ctx.fillRect(x, y, size, size);

            ctx.fillStyle = "#43a047";
            ctx.fillRect(x, y, size, 8);

            ctx.fillStyle = "#2e7d32";
            for (let i = 0; i < size; i += 8) {
                ctx.fillRect(x + i, y + 8, 4, 3);
            }
        }
        ctx.restore();
    },

    // Cano Verde de Dados / Barramento de Sistema
    drawPipe(ctx, x, y, width, height) {
        ctx.save();
        const headHeight = 28;

        // Cabeça do cano
        ctx.fillStyle = "#2e7d32";
        ctx.fillRect(x - 4, y, width + 8, headHeight);

        // Brilho do topo
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(x - 2, y + 3, width * 0.3, headHeight - 6);
        ctx.fillStyle = "#81c784";
        ctx.fillRect(x + 2, y + 5, 4, headHeight - 10);

        // Sombra lateral
        ctx.fillStyle = "#1b5e20";
        ctx.fillRect(x + width - 4, y, 8, headHeight);

        // Corpo do cano
        ctx.fillStyle = "#2e7d32";
        ctx.fillRect(x, y + headHeight, width, height - headHeight);

        // Brilho no corpo
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(x + 4, y + headHeight, width * 0.25, height - headHeight);
        ctx.fillStyle = "#1b5e20";
        ctx.fillRect(x + width - 6, y + headHeight, 6, height - headHeight);

        // Borda preta clássica
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 4, y, width + 8, headHeight);
        ctx.strokeRect(x, y + headHeight, width, height - headHeight);

        ctx.restore();
    },

    // Moeda Binária / Bit ('0' ou '1' giratório)
    drawCoin(ctx, x, y, size, animTimer = 0) {
        ctx.save();
        const frame = Math.floor(animTimer / 10) % 4;
        const scaleX = [1, 0.6, 0.15, 0.6][frame];
        const char = Math.floor(animTimer / 40) % 2 === 0 ? "1" : "0";

        ctx.translate(x + size / 2, y + size / 2);
        ctx.scale(scaleX, 1);

        // Borda dourada
        ctx.fillStyle = "#ffd54f";
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#f57f17";
        ctx.beginPath();
        ctx.arc(0, 0, size / 2 - 2, 0, Math.PI * 2);
        ctx.fill();

        if (scaleX > 0.4) {
            ctx.fillStyle = "#fff";
            ctx.font = `bold ${Math.floor(size * 0.6)}px 'Press Start 2P', monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(char, 0, 1);
        }

        ctx.restore();
    },

    // Inimigo: Bug / Glitch estilo Goomba digital
    drawEnemy(ctx, x, y, width, height, isSquashed = false, animTimer = 0) {
        ctx.save();
        if (isSquashed) {
            // Inimigo achatado após pulo
            ctx.fillStyle = "#7b1fa2";
            ctx.fillRect(x, y + height * 0.7, width, height * 0.3);
            ctx.fillStyle = "#f44336";
            ctx.fillRect(x + width * 0.2, y + height * 0.75, width * 0.6, 4);
        } else {
            // Corpo do Bug
            const bob = Math.sin(animTimer * 0.2) * 2;
            ctx.fillStyle = "#8e24aa";
            ctx.fillRect(x + 2, y + 4 + bob, width - 4, height - 8);

            // Cabeça / Antenas
            ctx.fillStyle = "#ba68c8";
            ctx.fillRect(x + 6, y + bob, 4, 6);
            ctx.fillRect(x + width - 10, y + bob, 4, 6);

            // Olhos vermelhos ameaçadores de bug
            ctx.fillStyle = "#f44336";
            ctx.fillRect(x + 6, y + 10 + bob, 6, 6);
            ctx.fillRect(x + width - 12, y + 10 + bob, 6, 6);

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(x + 7, y + 11 + bob, 2, 2);
            ctx.fillRect(x + width - 11, y + 11 + bob, 2, 2);

            // Patinhas pixeladas alternando
            ctx.fillStyle = "#4a148c";
            const walk = Math.floor(animTimer / 10) % 2;
            if (walk === 0) {
                ctx.fillRect(x, y + height - 5, 8, 5);
                ctx.fillRect(x + width - 8, y + height - 5, 8, 5);
            } else {
                ctx.fillRect(x + 3, y + height - 5, 8, 5);
                ctx.fillRect(x + width - 11, y + height - 5, 8, 5);
            }
        }
        ctx.restore();
    },

    // Mastro com Bandeira de Vitória do Mario
    drawFlagpole(ctx, x, y, height, flagProgress = 0) {
        ctx.save();
        // Mastro metálico
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 8, y, 6, height);
        ctx.fillStyle = "#ffd54f";
        ctx.beginPath();
        ctx.arc(x + 11, y, 7, 0, Math.PI * 2);
        ctx.fill();

        // Bandeira verde subindo/descendo
        const flagY = y + 10 + (height - 40) * (1 - flagProgress);
        ctx.fillStyle = "#43a047";
        ctx.beginPath();
        ctx.moveTo(x + 14, flagY);
        ctx.lineTo(x + 45, flagY + 12);
        ctx.lineTo(x + 14, flagY + 24);
        ctx.closePath();
        ctx.fill();

        // Ícone de chip/coração na bandeira
        ctx.fillStyle = "#fff";
        ctx.font = "12px sans-serif";
        ctx.fillText("💻", x + 18, flagY + 16);

        // Base de pedra
        ctx.fillStyle = "#455a64";
        ctx.fillRect(x, y + height - 16, 24, 16);

        ctx.restore();
    },

    // Nuvem alegre com olhos do Mario
    drawCloud(ctx, x, y, scale = 1) {
        ctx.save();
        ctx.scale(scale, scale);
        ctx.fillStyle = "#ffffff";

        // Círculos da nuvem
        ctx.beginPath();
        ctx.arc(x + 20, y + 20, 15, 0, Math.PI * 2);
        ctx.arc(x + 40, y + 12, 18, 0, Math.PI * 2);
        ctx.arc(x + 60, y + 20, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(x + 10, y + 18, 60, 14);

        // Olhos da nuvem (estilo Super Mario Bros)
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 32, y + 16, 3, 7);
        ctx.fillRect(x + 46, y + 16, 3, 7);

        ctx.restore();
    },

    // Plataforma Nuvem Flutuante (Fase 2)
    drawCloudPlatform(ctx, x, y, width, height) {
        ctx.save();
        ctx.fillStyle = "#e0f2fe";
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, 16);
        ctx.fill();

        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Detalhe de conexão de dados
        ctx.fillStyle = "#0284c7";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("☁️ NUVEM", x + width / 2, y + height / 2 + 5);

        ctx.restore();
    },

    // Ícone de Item Flutuante (Hardware Card, Wi-Fi ou Módulo de SO)
    drawPedagogicalItem(ctx, x, y, item, animTimer = 0) {
        ctx.save();
        const floatOffset = Math.sin(animTimer * 0.1) * 4;
        const drawY = y + floatOffset;

        // Aura de destaque
        ctx.shadowColor = "#ffd54f";
        ctx.shadowBlur = 12;

        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "#ffd54f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, drawY, 36, 36, 6);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.icon || "💾", x + 18, drawY + 18);

        ctx.restore();
    },

    // Castelo de Final de Fase (Estilo Super Mario)
    drawCastle(ctx, x, y, width = 180, height = 180) {
        ctx.save();
        // Parede principal de tijolos cinza/marrom
        ctx.fillStyle = "#5d4037";
        ctx.fillRect(x, y + 50, width, height - 50);

        // Ameias / Torres do topo
        ctx.fillStyle = "#4e342e";
        const towerW = 32;
        // Torre esquerda
        ctx.fillRect(x, y + 20, towerW, 40);
        ctx.fillRect(x - 4, y + 10, towerW + 8, 12);
        // Torre central mais alta
        ctx.fillRect(x + width / 2 - 20, y, 40, 60);
        ctx.fillRect(x + width / 2 - 24, y - 10, 48, 12);
        // Torre direita
        ctx.fillRect(x + width - towerW, y + 20, towerW, 40);
        ctx.fillRect(x + width - towerW - 4, y + 10, towerW + 8, 12);

        // Bandeirinha no topo do castelo
        ctx.fillStyle = "#e53935";
        ctx.beginPath();
        ctx.moveTo(x + width / 2, y - 10);
        ctx.lineTo(x + width / 2 + 16, y - 16);
        ctx.lineTo(x + width / 2, y - 22);
        ctx.closePath();
        ctx.fill();

        // Porta preta em arco (onde Mario entra)
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(x + width / 2, y + height - 45, 24, Math.PI, 0, false);
        ctx.rect(x + width / 2 - 24, y + height - 45, 48, 45);
        ctx.fill();

        // Janelas frestas
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 24, y + 70, 12, 18);
        ctx.fillRect(x + width - 36, y + 70, 12, 18);

        ctx.restore();
    },

    // Chefão "Bug do Caos" (Fase 3)
    drawBoss(ctx, x, y, width, height, animTimer = 0) {
        ctx.save();
        const bob = Math.sin(animTimer * 0.15) * 4;
        
        // Aura vermelha perigosa
        ctx.shadowColor = "#ff1744";
        ctx.shadowBlur = 15;

        // Corpo Robusto
        ctx.fillStyle = "#4a148c";
        ctx.fillRect(x + 4, y + 8 + bob, width - 8, height - 12);

        // Coroa de Glitch dourada
        ctx.fillStyle = "#ffd54f";
        ctx.beginPath();
        ctx.moveTo(x + 10, y + bob + 4);
        ctx.lineTo(x + 18, y + bob - 12);
        ctx.lineTo(x + width / 2, y + bob - 4);
        ctx.lineTo(x + width - 18, y + bob - 12);
        ctx.lineTo(x + width - 10, y + bob + 4);
        ctx.closePath();
        ctx.fill();

        // Olhos Maliciosos
        ctx.fillStyle = "#ff1744";
        ctx.fillRect(x + 14, y + 18 + bob, 14, 10);
        ctx.fillRect(x + width - 28, y + 18 + bob, 14, 10);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 18, y + 20 + bob, 6, 6);
        ctx.fillRect(x + width - 24, y + 20 + bob, 6, 6);

        // Presas
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 20, y + height - 12 + bob, 6, 8);
        ctx.fillRect(x + width - 26, y + height - 12 + bob, 6, 8);

        ctx.restore();
    }
};
