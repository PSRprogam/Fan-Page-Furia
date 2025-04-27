import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}


const fetchBotResponse = async (userMessage: string): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    const chat = model.startChat({
      history: [
        {
           role: "user",
          parts: [{ text: "Você é o PanteraBot, bot de comunicação do time da Furia de CS2, traga informações com base na https://www.hltv.org/team/8297/furia e https://liquipedia.net/counterstrike/FURIA, fale de forma animada e empolgada, usando termos e girias do CS2" }],
        },
        {
          role: "model",
          parts: [{ text: "Salve, furioso! Tá pronto pra mandar ver na selva? Eu tô aqui pra te passar as melhores dicas, os próximos jogos e tudo sobre o nosso time! Manda ver aí, qual é a boa?" }],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return text || "Eita, deu ruim aqui! Tenta de novo aí, meu furioso!";
  } catch (error) {
    console.error("Erro no Gemini:", error);
    return "Pô, deu um tilt aqui no sistema! Tenta de novo mais tarde, valeu?";
  }
};

const PanteraBot = () => {
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

  const handleSendMessage = async (e: React.FormEvent) => {
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

    // Espera pela resposta do bot via API
    const botMessageText = await fetchBotResponse(inputValue);

    const botMessage: Message = {
      id: messages.length + 2,
      text: botMessageText,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <button id="chat-button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-furia-purple to-furia-purple-neon shadow-lg transition-transform duration-300 animate-pulse-glow",
          !isOpen && "scale-100 opacity-100", // Botão aparece quando o chat está fechado
          isOpen && "scale-0 opacity-0" // Esconde o botão quando o chat está aberto
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
