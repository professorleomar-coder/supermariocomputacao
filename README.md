# 🍄 Super Bit Bros: Aventura no Mundo Digital 🎮

Um jogo pedagógico 2D de plataforma inspirado no clássico **Super Mario**, desenvolvido especificamente para o ensino das competências e habilidades do eixo **Mundo Digital** da **BNCC Computação** (5º ano do Ensino Fundamental).

---

## 🎯 Habilidades da BNCC Contempladas

| Habilidade | Descrição Oficial BNCC | Como é ensinada no Jogo |
| :--- | :--- | :--- |
| **(EF05CO05)** | Identificar os componentes principais de um computador (dispositivos de entrada/saída, processadores e armazenamento). | **Mundo 1: O Reino dos Componentes**. O jogador bate em blocos `?` e coleta cartas de periféricos (Teclado, Mouse, Microfone = Entrada; Monitor, Caixas de Som = Saída; Processador CPU = Cérebro de Cálculos; SSD e Memória RAM = Armazenamento). O castelo final exige classificar componentes para abrir o portão! |
| **(EF05CO06)** | Reconhecer que os dados podem ser armazenados em um dispositivo local ou remoto. | **Mundo 2: O Vale dos Dados (Local vs Nuvem)**. O jogador percorre plataformas terrestres (Armazenamento Local - HD/Pen Drive, acessíveis sem internet) e plataformas aéreas nas nuvens (Armazenamento Remoto - Google Drive, Nuvem, acessíveis de qualquer lugar via internet/Wi-Fi). Enfrenta decisões práticas sobre onde salvar arquivos de trabalho escolar em grupo ou quando está offline. |
| **(EF05CO07)** | Reconhecer a necessidade de um sistema operacional para a execução de programas e gerenciamento do hardware. | **Mundo 3: O Castelo do Sistema Operacional**. Diante do "Bug do Caos", o jogador descobre que sem o Sistema Operacional (Windows, Linux, Android), os programas não sabem conversar com o hardware nem dividir a memória. Restaura o Gerenciador de Hardware (drivers), o Sistema de Arquivos e a Interface Gráfica para vencer o jogo! |

---

## 🕹️ Controles

O jogo foi projetado para uso nativo no **Google Chrome**, com dupla modalidade de controles:

### 1. Teclado
- **Mover para Esquerda:** `Seta Esquerda [←]` ou tecla `[A]`
- **Mover para Direita:** `Seta Direita [→]` ou tecla `[D]`
- **Pular:** `Barra de Espaço`, `Seta Cima [↑]` ou tecla `[W]`
- **Interagir / Confirmar:** Tecla `[E]` ou `[Enter]`

### 2. Trackpad / Mouse / Touch
- **Botoeira Arcade na base da tela:**
  - `[◀]`: Move para a esquerda
  - `[▶]`: Move para a direita
  - `[🦘 PULAR]`: Salto simples ou duplo sobre blocos e bugs
  - `[⚡ INTERAGIR]`: Ação contextual
- **Nos Desafios e Quizzes:** Basta clicar ou tocar com o trackpad diretamente nas opções `A`, `B`, `C` ou `D` e no botão `CONTINUAR`.

---

## 🚀 Como Executar

1. **Opção 1 (Mais Rápida):**
   - Dê um duplo clique no arquivo `iniciar_jogo.bat` nesta pasta.
2. **Opção 2 (Direto no Navegador):**
   - Abra o **Google Chrome** e arraste o arquivo `index.html` para uma nova aba, ou dê um duplo clique em [index.html](file:///C:/Users/profe/.gemini/antigravity/scratch/super-mario-computacao/index.html).

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 Canvas 2D:** Renderização procedural de alta performance com estilo Pixel Art clássico (8-bit / 16-bit).
- **Web Audio API:** Sintetizador procedural em tempo real para efeitos sonoros retrô (pulo, moedas, bugs, power-ups) e música chiptune contínua sem depender de arquivos pesados ou problemas de CORS.
- **CSS3 Flexbox/Grid:** Interface arcade imersiva com suporte responsivo a telas de computadores escolares, notebooks e tablets.
