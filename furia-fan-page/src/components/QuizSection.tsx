import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual jogador é o capitão da FURIA?",
    options: ["yuurih", "KSCERATO", "FalleN", "YEKINDAR"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Em que ano a FURIA foi fundada?",
    options: ["2016", "2017", "2018", "2019"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Qual foi o primeiro Major que marcou a FURIA?",
    options: ["Katowice 2019", "Masters Rio 2022", "Stockholm 2021", "Antwerp 2022"],
    correctAnswer: 1
  }
];

const QuizSection: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  
  const handleOptionClick = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setStartQuiz(false);
  };
  
  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-furia-dark to-furia-charcoal relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-furia-purple/5 blur-3xl -top-20 left-1/3" />
        <div className="absolute w-96 h-96 rounded-full bg-furia-orange/5 blur-3xl -bottom-20 right-1/4" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bebas-neue mb-4 text-white">QUIZ <span className="text-furia-purple neon-text">FURIOSO</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Teste seus conhecimentos sobre a FURIA e mostre que você é um verdadeiro fã da selva!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="furia-card min-h-[400px] flex flex-col">
            {!startQuiz ? (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <Trophy size={64} className="text-furia-purple mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Está pronto para testar seu conhecimento?</h3>
                <p className="text-gray-400 mb-8">Responda perguntas sobre a FURIA e veja quanto você sabe sobre o seu time favorito!</p>
                <button 
                  onClick={() => setStartQuiz(true)}
                  className="furia-btn text-lg px-8"
                >
                  COMEÇAR QUIZ
                </button>
              </div>
            ) : showResult ? (
              <div className="flex flex-col items-center justify-center text-center h-full">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {score === quizQuestions.length ? (
                    "Perfeito! Você é um verdadeiro fã da FURIA!"
                  ) : score >= quizQuestions.length / 2 ? (
                    "Bom trabalho! Você conhece bem a FURIA!"
                  ) : (
                    "Você ainda tem muito a aprender sobre a FURIA!"
                  )}
                </h3>
                
                <div className="mb-8">
                  <div className="text-furia-purple text-5xl font-bebas-neue mb-2">{score} / {quizQuestions.length}</div>
                  <p className="text-gray-400">Respostas corretas</p>
                </div>
                
                <button 
                  onClick={resetQuiz}
                  className="furia-btn text-lg px-8">
                  JOGAR NOVAMENTE
                </button>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="w-full bg-furia-dark h-2 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-furia-purple to-furia-orange transition-all duration-300"
                    style={{ width: `${(currentQuestion / quizQuestions.length) * 100}%` }}
                  />
                </div>
                
                {/* Question Number */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-furia-purple font-bold">
                    Pergunta {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                  <span className="text-gray-400">
                    Pontuação: {score}
                  </span>
                </div>
                
                {/* Question */}
                <h3 className="text-xl md:text-2xl text-white font-bold mb-8">
                  {quizQuestions[currentQuestion].question}
                </h3>
                
                {/* Options */}
                <div className="space-y-4 mb-8">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(index)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedOption === null
                          ? "bg-furia-charcoal hover:bg-furia-purple/20 text-white"
                          : selectedOption === index
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? "bg-green-500/20 border border-green-500 text-green-500"
                              : "bg-red-500/20 border border-red-500 text-red-500"
                            : index === quizQuestions[currentQuestion].correctAnswer && selectedOption !== null
                              ? "bg-green-500/20 border border-green-500 text-green-500"
                              : "bg-furia-charcoal text-gray-400"
                      }`}
                      disabled={selectedOption !== null}
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-furia-dark flex items-center justify-center mr-3 text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
