import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy } from 'lucide-react';

interface Match {
  id: number;
  opponent: string;
  opponentLogo: string;
  tournament: string;
  tournamentLogo: string;
  date: string;
  time: string;
  matchType: string;
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    opponent: "Spirit",
    opponentLogo: "https://img-cdn.hltv.org/teamlogo/syrtYYKR7sBRw3ZHy1YFX7.png?ixlib=java-2.1.0&w=100&s=8d98ab33e1c8139633132cb9eccda0af",
    tournament: "PGL Astana 2025",
    tournamentLogo: "https://upload.wikimedia.org/wikipedia/commons/4/46/PGL_Logo.png",
    date: "10 Maio, 2025",
    time: "A definir",
    matchType: "Bo1"
  },
  {
    id: 2,
    opponent: "MOUZ",
    opponentLogo: "https://img-cdn.hltv.org/teamlogo/IejtXpquZnE8KqYPB1LNKw.svg?ixlib=java-2.1.0&s=7fd33b8def053fbfd8fdbb58e3bdcd3c",
    tournament: "IEM Dallas 2025",
    tournamentLogo: "https://img-cdn.hltv.org/eventlogo/2mt5dKGFBdIcxv37gayq1X.png?ixlib=java-2.1.0&w=100&s=d2e3f2b67dff6f0d9a599db4c3a7b881",
    date: "19 Maio, 2025",
    time: "A definir",
    matchType: "Bo3"
  },
  {
    id: 3,
    opponent: "M80",
    opponentLogo: "https://img-cdn.hltv.org/teamlogo/U6ziW17pgYxsxR_WQJ_9-V.png?ixlib=java-2.1.0&w=100&s=f10c0b0a590b897a073cbb3b6ca7a759",
    tournament: "BLAST.tv Austin Major 2025",
    tournamentLogo: "https://img-cdn.hltv.org/eventlogo/adIB7mzeYFH6m60KEvZhus.svg?ixlib=java-2.1.0&s=1edbd1a4b3f670ee7dcd9818c80bdbcf",
    date: "07 Junho, 2025",
    time: "A definir",
    matchType: "Bo1"
  }
];

const UpcomingMatches: React.FC = () => {
  return (
    <section id="matches" className="py-20 bg-furia-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-furia-purple blur-3xl -top-20 -left-20" />
        <div className="absolute w-96 h-96 rounded-full bg-furia-orange blur-3xl -bottom-20 -right-20" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bebas-neue mb-4 text-white">PRÓXIMOS <span className="text-furia-orange neon-text">JOGOS</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Acompanhe os próximos desafios da FURIA e não perca nenhuma partida
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="furia-card h-full backdrop-blur-lg">
                {/* Tournament Info */}
                <div className="flex items-center mb-6">
                  <div 
                    className="w-10 h-10 bg-white rounded p-1 flex items-center justify-center mr-3"
                    style={{ filter: "brightness(0.9)" }}
                  >
                    <img 
                      src={match.tournamentLogo} 
                      alt={match.tournament} 
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{match.tournament}</h4>
                    <p className="text-xs text-gray-400">{match.matchType}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-block bg-furia-purple/20 border border-furia-purple/30 text-furia-purple text-xs font-semibold px-2 py-1 rounded">
                      {match.matchType}
                    </span>
                  </div>
                </div>
                
                {/* Teams */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded p-1 flex items-center justify-center">
                      <img src="https://img-cdn.hltv.org/teamlogo/mvNQc4csFGtxXk5guAh8m1.svg?ixlib=java-2.1.0&s=11e5056829ad5d6c06c5961bbe76d20c" alt="FURIA" className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="mt-2 text-white font-bold">FURIA</span>
                  </div>
                  
                  <div className="text-white text-lg font-bebas-neue">
                    VS
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded p-1 flex items-center justify-center">
                      <img src={match.opponentLogo} alt={match.opponent} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="mt-2 text-white font-bold">{match.opponent}</span>
                  </div>
                </div>
                
                  {/* Match Details */}
                <div className="flex flex-col space-y-3 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Trophy size={16} className="mr-2" />
                    <span>{match.tournament}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-furia-purple/20 hover:bg-furia-purple/30 text-furia-purple py-2 rounded transition-colors">
                    Lembrar
                  </button>
                  <button   className="flex-1 bg-furia-orange text-white py-2 rounded hover:bg-furia-orange/90 transition-colors">
                    <a href="https://www.hltv.org/team/8297/furia#tab-matchesBox" target="_blank"  rel="noopener noreferrer">HLTV</a>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
