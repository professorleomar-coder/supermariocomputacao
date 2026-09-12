# 🌐 Como Publicar o Jogo "Super Bit Bros" na Web Gratuitamente

Como o jogo foi construído em **HTML5 puro (Canvas + JavaScript + CSS)**, sem servidores ou banco de dados de retaguarda, ele pode ser hospedado gratuitamente e em poucos segundos em várias plataformas.

Já preparamos o arquivo compactado pronto para envio:
📁 **[`super-bit-bros-web.zip`](file:///C:/Users/profe/.gemini/antigravity/scratch/super-mario-computacao/super-bit-bros-web.zip)** (apenas ~28 KB)

---

## 🥇 Opção 1: Netlify Drop (Mais Rápida - Menos de 1 minuto, sem instalar nada)

1. Acesse o site oficial: **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Crie uma conta gratuita (ou entre com Google/Email).
3. **Arraste e solte** a pasta `super-mario-computacao` ou o arquivo `super-bit-bros-web.zip` na área indicada da página.
4. O Netlify publicará o jogo instantaneamente com um link `https://` seguro.
5. *(Opcional)* Em **Site settings > Change site name**, você pode escolher um nome amigável, como:
   `https://super-bit-bros-bncc.netlify.app`.

---

## 🎮 Opção 2: itch.io (Especial para Jogos e Ambientes Educacionais)

O **itch.io** é a maior comunidade de jogos independentes do mundo, ideal para disponibilizar jogos para alunos jogarem no navegador ou incorporar em portais escolares:

1. Acesse **[itch.io](https://itch.io)** e crie sua conta gratuita.
2. Clique no seu perfil no canto superior direito e selecione **"Upload new project"**.
3. Preencha os campos básicos:
   - **Title:** `Super Bit Bros: Aventura no Mundo Digital`
   - **Classification:** `Games`
   - **Kind of project:** Escolha **"HTML - You have a ZIP file of HTML5 game"**.
4. Na seção **Uploads**:
   - Clique em **"Upload files"** e selecione o arquivo **`super-bit-bros-web.zip`**.
   - Marque a caixinha: **"This file will be played in the browser"**.
5. Na seção **Embed options**:
   - Viewport dimensions: `960` x `540` px (ou `960` x `620` px).
   - Marque **"Enable fullscreen button"**.
6. Em **Visibility & Access**, marque **Public** e clique em **Save & View Page**.
7. Pronto! Seus alunos poderão jogar direto pelo link do itch.io ou em tela cheia no Chrome.

---

## 🐙 Opção 3: GitHub Pages (Sem precisar de terminal Git)

1. Acesse **[github.com](https://github.com)** e crie um novo repositório (ex: `super-mario-computacao`), marcando como **Public**.
2. Na página do repositório, clique em **"uploading an existing file"**.
3. Arraste todos os arquivos da pasta:
   - `index.html`
   - Pasta `css` (com `style.css`)
   - Pasta `js` (com todos os scripts)
   - `README.md`
4. Clique em **Commit changes**.
5. Vá em **Settings** > **Pages** (no menu lateral esquerdo):
   - Em **Branch**, selecione `main` e a pasta `/ (root)`.
   - Clique em **Save**.
6. Em 1 a 2 minutos, o GitHub gerará o seu link permanente:
   `https://seu-usuario.github.io/super-mario-computacao/`.

---

## 📲 Dica para Salas de Aula:
Com qualquer um dos links gerados acima, você pode gerar um **QR Code gratuito** (no próprio Google Chrome: clique com o botão direito na página > *"Criar código QR para esta página"*) e projetar na lousa para que os estudantes acessem instantaneamente em computadores, Chromebooks ou tablets!
