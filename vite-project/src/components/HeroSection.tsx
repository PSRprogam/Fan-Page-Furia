import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
        <iframe
          className="w-full h-full absolute inset-0 scale-150"
          src="https://www.youtube.com/embed/5bJ10kGAcPU?autoplay=1&mute=1&loop=1&playlist=5bJ10kGAcPU&controls=0&disablekb=1"
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title="FURIA Semi-finals"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img 
              src="/images/furia-panther-logo.svg" 
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
              onClick={onOpenChat}
              className={cn(
                "furia-btn text-xl py-3 px-8 relative overflow-hidden group"
              )}
            >
              FALE COM O PANTERABOT 🐾
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
