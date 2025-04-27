import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '../lib/utils';


interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses = [
  "Fala, fã da selva! Quer saber quando o arT vai aprontar de novo?",
  "KSCERATO tá on fire ultimamente! Viu aquele clutch?",
  "Aquele tático da FURIA no Mirage... MANO, QUE COISA ABSURDA!",
  "A FURIA vai DESTRUIR esses cara, confia!",
  "Próximo jogo é quinta-feira contra a Astralis. Tá na agenda?",
  "GG! Essa vitória foi muito importante pro nosso ranking.",
  "Sabe quem tá mandando bem no DM? O drop! O cara não perde um tiro.",
  "Eu tô animado pro próximo Major! E você?",
  "Rush B, não para, não para! Clássico da FURIA hahaha",
  "Dizem que arT tá treinando umas jogadas novas no treino. Corre que vem chumbo!",
  "Essa nova lineup tá dando o que falar! Você tá curtindo?"
];

const getRandomResponse = () => {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

const PanteraBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Salve, torcedor da FURIA! Aqui é o PanteraBot! Como posso ajudar hoje? Quer saber sobre os próximos jogos? Estatísticas dos players? Ou só trocar uma ideia sobre a selva?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    
    // Simulate bot typing with a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getRandomResponse(),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-furia-purple to-furia-purple-neon shadow-lg transition-transform duration-300 animate-pulse-glow",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="text-white" size={28} />
      </button>
      
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[500px] max-h-[calc(100vh-100px)] glass-panel rounded-t-xl flex flex-col transition-all duration-300 shadow-xl border border-furia-purple/30",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-furia-purple/20">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-furia-purple mr-3">
              <span className="font-bold text-lg">P</span>
            </div>
            <div>
              <h3 className="font-bebas-neue text-xl text-white">PANTERABOT</h3>
              <div className="flex items-center text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-green-400">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.isBot 
                    ? "bg-furia-charcoal text-white rounded-tl-none"
                    : "bg-furia-purple text-white rounded-tr-none"
                )}
              >
                <p>{message.text}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-furia-purple/20">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-furia-dark border border-furia-purple/20 rounded-l-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-furia-purple"
            />
            <button
              type="submit"
              className="bg-furia-purple rounded-r-md p-2 text-white flex items-center justify-center"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PanteraBot;
