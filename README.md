# Fan Page da Fúria com Chatbot

Este é um projeto React construído com TypeScript para criar uma fan page dedicada ao time de eSports Fúria. A página exibe informações sobre o time, jogadores e também inclui um chatbot interativo para os fãs.


## Frontend (Aplicação React com TypeScript)

Esta é a interface do usuário (frontend) da Fan Page da Fúria, construída utilizando a biblioteca React e a linguagem TypeScript. Ela oferece uma experiência interativa para os fãs, exibindo informações sobre o time e integrando um chatbot.

### Tecnologias Utilizadas

* [React](https://react.dev/): Framework  JavaScript para construir interfaces de usuário.
* [TypeScript](https://www.typescriptlang.org/): Superset de JavaScript que adiciona tipagem estática.
* [Lucide](https://lucide.dev/): Biblioteca de ícones vetoriais para uma interface visual atraente.
* [React Router DOM](https://reactrouter.com/web/guides/quick-start): Para gerenciamento de rotas e navegação dentro da aplicação.

### Estrutura de Pastas (Exemplo)

Este backend em Node.js utiliza o framework Express.js para fornecer dados sobre os jogadores do time FURIA de Counter-Strike.

### Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [cors](https://github.com/expressjs/cors): Middleware para habilitar CORS.
* [hltv](https://www.npmjs.com/package/hltv): Biblioteca para interagir com os dados do site HLTV.org.

## Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. Recomendamos a versão LTS. Além disso, você precisará do [npm](https://www.npmjs.com/) (instalado com o Node.js) ou do [yarn](https://yarnpkg.com/).

### Endpoints da API

* `GET /api/furia-players`: Retorna um array de objetos JSON contendo informações dos jogadores ativos do time FURIA. Cada objeto inclui um `id` único, `name` (nome no jogo), `fullName`, `image` (URL da imagem), `country` e um objeto `stats` com `rating`, `kd`, `hs` e `maps`. O técnico 'sidde' também está incluído nesta lista.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/PSRprogam/Fan-Page-Furia
    cd furia-fan-page
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```
    
### Como Rodar o Frontend

1.  Navegue até a pasta furia-fan-oage no terminal.
2.  ```bash    
    cd furia-fan-page
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:8080`.

### Como Rodar o Backend

1.  Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
2.  Navegue até o diretório do seu backend no terminal.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor:
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3001`.

## Chatbot Integrado (PanteraBot)

Este projeto inclui um chatbot interativo chamado PanteraBot, que permite aos fãs da FURIA fazerem perguntas e obterem informações sobre o time de Counter-Strike 2. O chatbot utiliza a API Gemini da Google para processar as mensagens e gerar respostas contextuais.

### Como o Chatbot foi Integrado

1.  **Dependências:** As seguintes bibliotecas foram adicionadas ao projeto para implementar o chatbot:
    * `@google/generative-ai`: Para interagir com a API Gemini da Google.
    * `lucide-react`: Para os ícones de abrir/fechar o chat e enviar mensagens.

    Você pode instalá-las executando o seguinte comando no diretório do seu projeto frontend:
    ```bash
    npm install @google/generative-ai lucide-react
    # ou
    yarn add @google/generative-ai lucide-react
    ```

2.  **Configurar a API Gemini:**

    * Obtenha uma chave de API no Google AI Studio: [https://ai.google.dev/](https://ai.google.dev/).
    * Crie um arquivo `.env.local` na raiz do seu projeto (se ainda não existir).
    * Adicione sua chave de API como uma variável de ambiente, garantindo que ela comece com `VITE_` para ser reconhecida por Vite (se você estiver usando Vite como ferramenta de build):

        ```
        VITE_GEMINI_API_KEY=SUA_CHAVE_DE_API_AQUI
        ```

    * Certifique-se de que sua configuração de build (por exemplo, Vite) esteja configurada para carregar essas variáveis de ambiente.
4.  **Interagir com o Chatbot:**

    Após a integração, um botão com um ícone de balão de mensagem aparecerá no canto inferior direito da tela. Clique neste botão para abrir a janela de chat. Você pode então digitar suas perguntas na caixa de texto e pressionar o ícone de enviar (uma seta) para enviar sua mensagem ao PanteraBot. As respostas do bot aparecerão na janela de chat.

### Detalhes Técnicos

O componente `PanteraBot` gerencia o estado da interface do chat (aberto/fechado, mensagens, input do usuário) utilizando os hooks do React (`useState`, `useRef`, `useEffect`).

A comunicação com a API Gemini é feita através da função assíncrona `fetchBotResponse`. Esta função:

* Lê a chave de API da variável de ambiente `VITE_GEMINI_API_KEY`.
* Inicializa o cliente da API Gemini.
* Configura o modelo `gemini-2.0-flash` com parâmetros de geração (temperatura, top P, top K, max tokens) e configurações de segurança para conteúdo potencialmente prejudicial (atualmente configuradas para não bloquear nada).
* Inicia uma conversa com um histórico predefinido, instruindo o bot sobre sua identidade como assistente da FURIA e as fontes de informação a serem usadas (HLTV e Liquipedia).
* Envia a mensagem do usuário para a API e retorna a resposta do bot.
