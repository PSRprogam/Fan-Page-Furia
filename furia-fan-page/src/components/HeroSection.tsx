import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';


const HeroSection: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
        <iframe
          className="w-full h-full absolute inset-0 scale-150"
          src={`https://www.youtube.com/embed/5bJ10kGAcPU?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=5bJ10kGAcPU&controls=0&disablekb=1`}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title="FURIA Semi-finals"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      
      {/* Botão de controle de som - Posicionado no canto inferior direito */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute right-4 bottom-20 z-20 bg-black/50 hover:bg-black/70 rounded-full p-3 backdrop-blur-sm transition-all"
        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </motion.button>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img 
              src="https://img-cdn.hltv.org/teamlogo/mvNQc4csFGtxXk5guAh8m1.svg?ixlib=java-2.1.0&s=11e5056829ad5d6c06c5961bbe76d20c" 
              alt="FURIA Panther Logo" 
              className="h-64 mx-auto filter brightness-100"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bebas-neue mb-4 text-white neon-text"
          >
            FURIA FAN HUB CENTRAL
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            A selva é nossa! Entre agora e fique por dentro de tudo sobre a FURIA CS
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              className={cn(
                "furia-btn text-xl py-3 px-8 relative overflow-hidden group"
              )}
            >
              FALE COM O PANTERABOT 
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-furia-purple to-furia-orange opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Diagonal Divider */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-furia-dark" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)' }} />
    </section>
  );
};

export default HeroSection;