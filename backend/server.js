/**
 * Este arquivo define um servidor backend em Node.js utilizando o framework Express.js.
 * Ele fornece uma API no endpoint /api/furia-players que busca e retorna informações
 * dos jogadores do time de Counter-Strike FURIA através da biblioteca 'hltv'.
 *
 * Tecnologias Utilizadas:
 * - Node.js: Ambiente de execução JavaScript do lado do servidor.
 * - Express.js: Framework web minimalista para Node.js.
 * - cors: Middleware para habilitar Cross-Origin Resource Sharing (CORS).
 * - hltv: Biblioteca para interagir com os dados do site HLTV.org.
 */

const express = require('express');
const cors = require('cors'); // Adicionando CORS
const { HLTV } = require('hltv');

const app = express();
const port = 3001;

app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
let contadorID = 1; // Contador de IDs para os jogadores
// Inicializa o array de jogadores com o sidde já presente
let players = [
  {
    id: 6,
    name: "sidde",
    fullName: "Sid Macedo",
    country: "Brazil",
    image: "https://img-cdn.hltv.org/playerbodyshot/q2PQMwyNdB4qAuRN9mEWl0.png?ixlib=java-2.1.0&w=400&s=456ffc5a425a22d8711a9b32c7789af0",
    stats: {
      timeInTeam: 289
    },
    role: 'Coach'
  }
];


/**
 * Função responsável por extrair e formatar os dados relevantes de um objeto de jogador
 * retornado pela biblioteca 'hltv' para um formato mais adequado para a aplicação.
 *
 * @param {object} player - O objeto contendo os dados brutos do jogador obtido da 'hltv'.
 * @returns {object} Um novo objeto com os dados do jogador formatados, incluindo um 'id' único,
 * nome no jogo ('name'), nome completo ('fullName'), URL da imagem ('image'),
 * país ('country') e estatísticas relevantes ('stats').
 */
function filtrarDadosDoJogador(player) {
    let id = contadorID; // meu id próprio
    contadorID++; // incrementa
  return {
    id: id, // ID único gerado para cada jogador
    name: player.ign, // Nome no jogo
    fullName: player.name, // Nome completo
    image: player.image, // URL da imagem
    country: player.country.name, // País
    stats: {
      rating: player.statistics?.rating,
      kd: player.statistics?.killsPerRound,
      hs: player.statistics?.headshots,
      maps: player.statistics?.mapsPlayed,
    }
  };
}

/**
 * Rota GET /api/furia-players
 *
 * Busca e retorna as informações dos jogadores ativos do time FURIA de Counter-Strike
 * utilizando a biblioteca 'hltv'.
 *
 * - Se os dados dos jogadores já foram carregados (o array 'players' tem mais de um elemento,
 * indicando que a busca já ocorreu), a rota retorna os dados existentes em cache,
 * incluindo o técnico 'sidde' que foi adicionado inicialmente.
 *
 * - Caso contrário, a rota realiza as seguintes operações:
 * 1. Utiliza 'HLTV.getTeamByName' para obter informações básicas sobre o time FURIA.
 * 2. Itera sobre a lista de jogadores retornada.
 * 3. Para cada jogador ativo (não 'Benched'), utiliza 'HLTV.getPlayerByName' para buscar
 * informações detalhadas.
 * 4. A função 'filtrarDadosDoJogador' é chamada para formatar os dados relevantes.
 * 5. Os jogadores formatados são adicionados ao array 'players', evitando a adição duplicada
 * do técnico 'sidde' e de outros jogadores que possam aparecer repetidamente na API.
 * 6. Finalmente, o array 'players' é ordenado pelo 'id' e enviado como uma resposta JSON.
 *
 * @async
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @returns {void} - Envia um JSON com um array de objetos de jogador ou um erro 500.
 */

app.get('/api/furia-players', async (req, res) => {
  try {
    // Se os dados dos jogadores já foram carregados, só retorna os dados existentes
    if (players.length > 1) {
      return res.json(players); // Retorna a lista de jogadores já existente (com o sidde)
    }

    const team = await HLTV.getTeamByName({ name: 'FURIA' }); // Obtém os dados do time FURIA
    
    // Mapeia os jogadores e busca as informações detalhadas
    await Promise.all(team.players.map(async (player) => {
      try {
        if (player.type !== 'Benched') { // Verifica se o jogador está na ativa
          const playerData = await HLTV.getPlayerByName({ name: player.name }); // Obtém as informações do jogador
          const jogadorFiltrado = filtrarDadosDoJogador(playerData); // Filtra e estrutura os dados
          
          // Adiciona os jogadores ao array, mas evita adicionar o 'sidde' novamente
          if (!players.some(p => p.name === jogadorFiltrado.name)) {
            players.push(jogadorFiltrado); // Adiciona ao array de jogadores
          }
        }
      } catch (error) {
        console.error(`Erro ao buscar o jogador ${player.name}:`, error);
      }
    }));
    const sortById = (a, b) => a.id - b.id;
    // Envia os jogadores para o frontend
    res.json(players.sort(sortById)); // Retorna a lista de jogadores ordenada por ID
  } catch (error) {
    console.error('Erro ao buscar o time:', error);
    res.status(500).json({ message: 'Erro ao buscar jogadores' });
  }
});

// Inicia o servidor Express na porta especificada (neste caso, 3001).
// Uma mensagem é exibida no console indicando que o servidor está rodando.
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
