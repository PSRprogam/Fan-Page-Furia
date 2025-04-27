import React, { useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import TeamSection from '../components/TeamSection';
import NextMatches from '../components/NextMatches';
import QuizSection from '../components/QuizSection';
import Footer from '../components/Footer';
import PanteraBot from '../components/PanteraBot';

const Index = () => {
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const handleOpenChat = () => {
    setIsChatOpen(true);
    // This would be handled by the PanteraBot component's internal state
  };

  return (
    <div className="min-h-screen bg-furia-dark flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <HeroSection onOpenChat={handleOpenChat} />
        <TeamSection />
        {/* <NextMatches /> */}
        <QuizSection />
      </main>
      
      <Footer />
      <PanteraBot />
    </div>
  );
};

export default Index;
