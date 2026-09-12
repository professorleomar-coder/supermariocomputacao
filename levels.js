/**
 * Super Bit Bros - Definição dos Mundos e Fases Pedagógicas
 * Fases 1, 2 e 3 com design de plataforma clássico no estilo Super Mario.
 */

const LevelManager = {
    tileSize: 40,

    getLevel(levelIndex) {
        switch(levelIndex) {
            case 1:
                return this.getWorld1();
            case 2:
                return this.getWorld2();
            case 3:
                return this.getWorld3();
            default:
                return this.getWorld1();
        }
    },

    // Mundo 1: O Reino dos Componentes (EF05CO05)
    getWorld1() {
        const T = this.tileSize;
        return {
            worldId: "world1",
            levelNumber: "1-1",
            name: "O Reino dos Componentes",
            theme: "world1",
            bgColor: "#5c94fc", // Céu azul clássico
            width: 3000,
            height: 540,
            spawn: { x: 80, y: 380 },
            flagX: 2700,

            // Plataformas e Blocos
            blocks: [
                // Chão Contínuo com pequenos desníveis
                { x: 0, y: 460, w: 900, h: 80, type: "ground" },
                { x: 980, y: 460, w: 800, h: 80, type: "ground" },
                { x: 1860, y: 460, w: 1200, h: 80, type: "ground" },

                // Canos Verdes (Barramentos)
                { x: 420, y: 380, w: 60, h: 80, type: "pipe" },
                { x: 760, y: 340, w: 60, h: 120, type: "pipe" },
                { x: 1480, y: 360, w: 60, h: 100, type: "pipe" },
                { x: 2160, y: 360, w: 60, h: 100, type: "pipe" },

                // Seção 1: Bloco '?' com Teclado e Mouse (Entrada)
                { x: 240, y: 320, w: T, h: T, type: "question", itemId: "teclado_mouse" },
                { x: 280, y: 320, w: T, h: T, type: "brick" },
                { x: 320, y: 320, w: T, h: T, type: "question", hasCoin: true },
                { x: 360, y: 320, w: T, h: T, type: "brick" },

                // Seção 2: Bloco '?' com CPU (Processamento)
                { x: 600, y: 280, w: T, h: T, type: "question", itemId: "cpu" },
                { x: 640, y: 280, w: T, h: T, type: "brick" },
                { x: 680, y: 280, w: T, h: T, type: "question", hasCoin: true },

                // Plataformas elevadas sobre o vão
                { x: 1100, y: 330, w: 120, h: T, type: "brick" },
                { x: 1260, y: 250, w: T, h: T, type: "question", itemId: "ssd_ram" }, // Armazenamento
                { x: 1300, y: 250, w: 120, h: T, type: "brick" },

                // Seção 3: Bloco '?' com Monitor e Som (Saída)
                { x: 1720, y: 320, w: T, h: T, type: "question", itemId: "monitor_som" },
                { x: 1760, y: 320, w: T, h: T, type: "brick" },
                { x: 1800, y: 320, w: T, h: T, type: "question", hasCoin: true },

                // Escadaria para o mastro
                { x: 2400, y: 420, w: 40, h: 40, type: "brick" },
                { x: 2440, y: 380, w: 40, h: 80, type: "brick" },
                { x: 2480, y: 340, w: 40, h: 120, type: "brick" },
                { x: 2520, y: 300, w: 40, h: 160, type: "brick" }
            ],

            // Moedas Binárias
            coins: [
                { x: 200, y: 400 }, { x: 280, y: 260 }, { x: 360, y: 260 },
                { x: 500, y: 410 }, { x: 540, y: 410 }, { x: 580, y: 410 },
                { x: 1120, y: 280 }, { x: 1160, y: 280 }, { x: 1200, y: 280 },
                { x: 1960, y: 410 }, { x: 2000, y: 410 }, { x: 2040, y: 410 }
            ],

            // Inimigos Glitch/Bug
            enemies: [
                { x: 500, y: 420, vx: -1.2 },
                { x: 1180, y: 420, vx: -1.2 },
                { x: 1620, y: 420, vx: 1.2 },
                { x: 2050, y: 420, vx: -1.2 },
                { x: 2320, y: 420, vx: -1.2 }
            ],

            // Nuvens decorativas de fundo
            scenery: [
                { x: 100, y: 80, scale: 1.2 },
                { x: 500, y: 60, scale: 0.9 },
                { x: 900, y: 100, scale: 1.4 },
                { x: 1400, y: 70, scale: 1 },
                { x: 1900, y: 90, scale: 1.3 },
                { x: 2400, y: 60, scale: 1.1 }
            ]
        };
    },

    // Mundo 2: Vale dos Dados (Local vs Nuvem - EF05CO06)
    getWorld2() {
        const T = this.tileSize;
        return {
            worldId: "world2",
            levelNumber: "2-1",
            name: "O Vale dos Dados (Local vs Nuvem)",
            theme: "world2",
            bgColor: "#1e1b4b", // Céu espacial/tecnológico profundo
            width: 3200,
            height: 540,
            spawn: { x: 80, y: 380 },
            flagX: 2900,

            blocks: [
                // Plataformas Terrestres (Armazenamento Local)
                { x: 0, y: 460, w: 750, h: 80, type: "ground" },
                { x: 880, y: 460, w: 600, h: 80, type: "ground" },
                { x: 1620, y: 460, w: 600, h: 80, type: "ground" },
                { x: 2340, y: 460, w: 900, h: 80, type: "ground" },

                // Canos
                { x: 380, y: 370, w: 60, h: 90, type: "pipe" },
                { x: 1100, y: 360, w: 60, h: 100, type: "pipe" },
                { x: 1820, y: 360, w: 60, h: 100, type: "pipe" },

                // Bloco 1: Armazenamento Local (No chão)
                { x: 220, y: 320, w: T, h: T, type: "question", itemId: "armazenamento_local" },
                { x: 260, y: 320, w: T, h: T, type: "brick" },
                { x: 300, y: 320, w: T, h: T, type: "question", hasCoin: true },

                // Plataformas Nuvem Flutuantes no Céu (Nuvem / Remoto)
                // Nuvem 1: plataforma de acesso
                { x: 480, y: 340, w: 140, h: 28, type: "cloud_platform" },
                // Nuvem 2: plataforma ampla onde fica o bloco de Armazenamento Nuvem
                { x: 660, y: 280, w: 200, h: 28, type: "cloud_platform" },
                // Bloco 'armazenamento_nuvem': elevado a y: 150 (espaço livre de 90px para o salto do Mario!)
                { x: 740, y: 150, w: T, h: T, type: "question", itemId: "armazenamento_nuvem" },

                // Nuvem 3: plataforma de transição
                { x: 1200, y: 340, w: 140, h: 28, type: "cloud_platform" },
                // Nuvem 4: plataforma ampla do Wi-Fi
                { x: 1380, y: 280, w: 200, h: 28, type: "cloud_platform" },
                // Bloco 'wifi_token': elevado a y: 150 (espaço livre de 90px para o salto do Mario!)
                { x: 1460, y: 150, w: T, h: T, type: "question", itemId: "wifi_token" },

                // Nuvem 5: Moedas nas alturas
                { x: 1960, y: 320, w: 180, h: 28, type: "cloud_platform" },
                { x: 2030, y: 190, w: T, h: T, type: "question", hasCoin: true },

                // Escada final
                { x: 2600, y: 420, w: 40, h: 40, type: "brick" },
                { x: 2640, y: 380, w: 40, h: 80, type: "brick" },
                { x: 2680, y: 340, w: 40, h: 120, type: "brick" },
                { x: 2720, y: 300, w: 40, h: 160, type: "brick" }
            ],

            coins: [
                { x: 180, y: 410 }, { x: 500, y: 290 }, { x: 540, y: 290 },
                { x: 680, y: 230 }, { x: 820, y: 230 },
                { x: 1220, y: 290 }, { x: 1400, y: 230 }, { x: 1540, y: 230 },
                { x: 2420, y: 410 }, { x: 2460, y: 410 }, { x: 2500, y: 410 }
            ],

            enemies: [
                { x: 550, y: 420, vx: -1.4 },
                { x: 1020, y: 420, vx: 1.4 },
                { x: 1740, y: 420, vx: -1.4 },
                { x: 2480, y: 420, vx: -1.5 }
            ],

            scenery: [
                { x: 80, y: 50, scale: 1 },
                { x: 420, y: 90, scale: 1.3 },
                { x: 880, y: 60, scale: 1.1 },
                { x: 1350, y: 80, scale: 1.4 },
                { x: 1820, y: 50, scale: 1.2 },
                { x: 2350, y: 70, scale: 1 }
            ]
        };
    },

    // Mundo 3: O Castelo do Sistema Operacional (EF05CO07)
    getWorld3() {
        const T = this.tileSize;
        return {
            worldId: "world3",
            levelNumber: "3-1",
            name: "O Castelo do Sistema Operacional",
            theme: "world3",
            bgColor: "#091a13", // Verde escuro circuito impresso
            width: 3400,
            height: 540,
            spawn: { x: 80, y: 380 },
            flagX: 3100,

            blocks: [
                // Placa-Mãe Gigante
                { x: 0, y: 460, w: 900, h: 80, type: "ground" },
                { x: 980, y: 460, w: 750, h: 80, type: "ground" },
                { x: 1820, y: 460, w: 750, h: 80, type: "ground" },
                { x: 2660, y: 460, w: 800, h: 80, type: "ground" },

                // Barramentos / Canos
                { x: 420, y: 360, w: 60, h: 100, type: "pipe" },
                { x: 1220, y: 340, w: 60, h: 120, type: "pipe" },
                { x: 2060, y: 340, w: 60, h: 120, type: "pipe" },

                // Bloco 1: O Maestro do Computador (No chão)
                { x: 240, y: 320, w: T, h: T, type: "question", itemId: "so_maestro" },
                { x: 280, y: 320, w: T, h: T, type: "brick" },
                { x: 320, y: 320, w: T, h: T, type: "question", hasCoin: true },

                // Plataforma elevada 1: Hardware Driver
                // Plataforma de tijolos em y: 340, largura 220px
                { x: 620, y: 340, w: 220, h: T, type: "brick" },
                // Bloco 'gerenciador_hardware': em y: 210 (espaço livre de 90px para o salto do Mario!)
                { x: 710, y: 210, w: T, h: T, type: "question", itemId: "gerenciador_hardware" },

                // Plataforma elevada 2: Interface Gráfica
                // Plataforma de tijolos em y: 340, largura 220px
                { x: 1420, y: 340, w: 220, h: T, type: "brick" },
                // Bloco 'interface_grafica': em y: 210 (espaço livre de 90px para o salto do Mario!)
                { x: 1510, y: 210, w: T, h: T, type: "question", itemId: "interface_grafica" },

                // Plataforma elevada 3: Moedas
                { x: 2240, y: 340, w: 220, h: T, type: "brick" },
                { x: 2330, y: 210, w: T, h: T, type: "question", hasCoin: true },

                // Escadaria do Chefe Final
                { x: 2800, y: 420, w: 40, h: 40, type: "brick" },
                { x: 2840, y: 380, w: 40, h: 80, type: "brick" },
                { x: 2880, y: 340, w: 40, h: 120, type: "brick" },
                { x: 2920, y: 300, w: 40, h: 160, type: "brick" }
            ],

            coins: [
                { x: 160, y: 410 }, { x: 640, y: 290 }, { x: 800, y: 290 },
                { x: 1040, y: 410 }, { x: 1080, y: 410 },
                { x: 1440, y: 290 }, { x: 1600, y: 290 },
                { x: 2260, y: 290 }, { x: 2420, y: 290 }
            ],

            enemies: [
                { x: 520, y: 420, vx: -1.6 },
                { x: 1100, y: 420, vx: 1.6 },
                { x: 1560, y: 420, vx: -1.6 },
                { x: 1940, y: 420, vx: 1.6 },
                { x: 2440, y: 420, vx: -1.8 },
                { x: 2740, y: 420, vx: -2.0 } // Bug rápido perto da escada
            ],

            scenery: [
                { x: 120, y: 60, scale: 1 },
                { x: 540, y: 80, scale: 1.2 },
                { x: 1020, y: 50, scale: 1.1 },
                { x: 1600, y: 70, scale: 1.3 },
                { x: 2150, y: 60, scale: 1 },
                { x: 2700, y: 80, scale: 1.2 }
            ]
        };
    }
};
