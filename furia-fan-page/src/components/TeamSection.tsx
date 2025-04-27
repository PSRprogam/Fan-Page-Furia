import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Carregando os dados dos jogadores

const TeamSection: React.FC = () => {
  const [players, setPlayers] = useState([]); // Estado para armazenar os jogadores
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão carregando

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/furia-players'); // Requisição para o backend
        const data = await response.json(); // Dados recebidos do backend
        console.log(data);

        // Se a lista de jogadores estiver vazia, adiciona os dados. Caso contrário, ignora.
        if (players.length === 0) {
          setPlayers(data); // Atualiza o estado com os dados
        }

        setLoading(false); // Marca como carregado
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        setLoading(false); // Mesmo em caso de erro, marca como carregado
      }
    };

    fetchData();
  }, [players.length]); 

  if (loading) {
    return <div>Carregando...</div>; // Exibe "Carregando..." enquanto os dados estão sendo buscados
  }

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-furia-dark to-furia-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bebas-neue mb-4 text-white">O ELENCO DA <span className="text-furia-purple neon-text">FURIA</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conheça os jogadores que representam a força da selva no cenário global de Counter-Strike
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative furia-card overflow-hidden h-full glow-effect ${player.role === 'Coach' ? 'coach-card' : ''}`}>
                {/* Player Image Container */}
                <div className="relative h-80 mb-4 overflow-hidden rounded-md">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="absolute h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/player-fallback.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

                  {/* Player Name on Image */}
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-4 xl font-bebas-neue text-white">{player.name}</h3>
                  </div>
                </div>

                {/* Player Details */}
                <div className="p-4 space-y-2">
                  <p className="text-gray-300">{player.fullName}</p>
                  <p className="text-furia-purple font-medium">{player.role}</p>

                  {/* Renderização condicional para Coach */}
                  {player.role === 'Coach' ? (
                    <div className="pt-4">
                      <div className="bg-furia-dark/40 p-4 rounded-lg text-center">
                        <p className="text-gray-400">Tempo com a equipe</p>
                        <p className="text-furia-purple text-xl font-bold">{player.stats.timeInTeam} dias</p>
                      </div>
                      <p className="text-gray-500 text-sm mt-3 text-center">
                        O estrategista por trás da força da selva
                      </p>
                    </div>
                  ) : (
                    /* Stats Grid para jogadores normais */
                    <div className="pt-4 grid grid-cols-2 gap-3">
                      <div className="bg-furia-dark/40 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Rating 2.0</p>
                        <p className="text-furia-purple text-lg font-bold">{player.stats.rating}</p>
                      </div>
                      <div className="bg-furia-dark/40 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">K/D Ratio</p>
                        <p className="text-furia-purple text-lg font-bold">{player.stats.kd?? 'N/A'}</p>
                      </div>
                      <div className="bg-furia-dark/40 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Headshot %</p>
                        <p className="text-furia-purple text-lg font-bold">{player.stats.hs?? 'N/A'}</p>
                      </div>
                      <div className="bg-furia-dark/40 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Maps Played</p>
                        <p className="text-furia-purple text-lg font-bold">{player.stats.maps?? 'N/A'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
