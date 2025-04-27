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

const NextMatches: Match[] = [
  {
    id: 1,
    opponent: "Astralis",
    opponentLogo: "/images/team-astralis.png",
    tournament: "ESL Pro League",
    tournamentLogo: "/images/tournament-esl.png",
    date: "28 Abril, 2025",
    time: "16:00 BRT",
    matchType: "Bo3"
  },
  {
    id: 2,
    opponent: "NAVI",
    opponentLogo: "/images/team-navi.png",
    tournament: "BLAST Premier",
    tournamentLogo: "/images/tournament-blast.png",
    date: "3 Maio, 2025",
    time: "13:30 BRT",
    matchType: "Bo3"
  },
  {
    id: 3,
    opponent: "Liquid",
    opponentLogo: "/images/team-liquid.png",
    tournament: "IEM Dallas",
    tournamentLogo: "/images/tournament-iem.png",
    date: "12 Maio, 2025",
    time: "11:00 BRT",
    matchType: "Bo3"
  }
];

const nextMatches: React.FC = () => {
  return (
    <section className="py-20 bg-furia-dark relative overflow-hidden">
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
          {NextMatches.map((match, index) => (
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
                      <img src="/images/furia-logo.svg" alt="FURIA" className="max-w-full max-h-full object-contain" />
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
                  <button className="flex-1 bg-furia-orange text-white py-2 rounded hover:bg-furia-orange/90 transition-colors">
                    HLTV
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

export default NextMatches;
