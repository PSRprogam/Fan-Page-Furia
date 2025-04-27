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


// Função para filtrar e formatar os dados do jogador, conforme seu formato
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

// Rota para pegar os jogadores do time FURIA
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

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
