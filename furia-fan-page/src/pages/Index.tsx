import React, { useRef } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import UpcomingMatches from '@/components/UpcomingMatches';
import QuizSection from '@/components/QuizSection';
import Footer from '@/components/Footer';
import PanteraBot from '@/components/PanteraBot';

const Index = () => {
  // Ref para o chatbot (se necessário para manipulação direta)
  const chatbotRef = useRef<HTMLDivElement | null>(null);
  
  // Estado para controlar a abertura/fechamento do chat

  return (
    <div className="min-h-screen bg-furia-dark flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <HeroSection />
        <TeamSection />
        <UpcomingMatches />
        <QuizSection />
      </main>
      
      <Footer />
      
      {/* Componente do chatbot, referenciado para uso direto */}
      <div ref={chatbotRef}>
        <PanteraBot/>
      </div>
    </div>
  );
};

export default Index;
