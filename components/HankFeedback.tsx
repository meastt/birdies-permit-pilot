
import React, { useState, useEffect } from 'react';
import { getHankExplanation } from '../services/geminiService';
import { Question } from '../types';

interface HankFeedbackProps {
  question: Question;
  selectedAnswerIndex: number;
  isCorrect: boolean;
  onClose: () => void;
}

const HankFeedback: React.FC<HankFeedbackProps> = ({ question, selectedAnswerIndex, isCorrect, onClose }) => {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeedback() {
      const text = await getHankExplanation(question, question.options[selectedAnswerIndex], isCorrect);
      setExplanation(text);
      setLoading(false);
    }
    fetchFeedback();
  }, [question, selectedAnswerIndex, isCorrect]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-end justify-center md:items-center p-6 sm:p-10 animate-in fade-in duration-300">
      <div className="max-w-2xl w-full flex flex-col md:flex-row gap-8 items-end md:items-center">

        {/* Hank Avatar - The GSP Pointer */}
        <div className="shrink-0 flex flex-col items-center animate-bounce-slow">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-lime-400 p-1 bg-[#1e1e1e] shadow-[0_0_50px_rgba(190,242,100,0.2)] overflow-hidden flex items-center justify-center">
            <img
              src="/Hank.png"
              alt="Hank the GSP"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 px-4 py-1.5 bg-lime-400 text-black font-black text-[10px] uppercase tracking-widest rounded-full rotate-2">
            HANK (ELITE GSP)
          </div>
        </div>

        {/* Feedback Card */}
        <div className="flex-1 chunky-card p-10 border-2 border-white/10 relative overflow-hidden flex flex-col max-h-[70vh]">
          <div className={`absolute top-0 left-0 w-2 h-full ${isCorrect ? 'bg-lime-400' : 'bg-orange-500'}`}></div>

          <div className="mb-8">
            <h3 className={`text-3xl font-black italic uppercase tracking-tighter ${isCorrect ? 'text-lime-400' : 'text-orange-400'}`}>
              {isCorrect ? "STANDING ON POINT!" : "OFF THE SCENT..."}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 mb-8 custom-scrollbar">
            {loading ? (
              <div className="space-y-4 py-6">
                <div className="h-4 bg-white/10 rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded-full w-[90%] animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded-full w-[95%] animate-pulse"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-xl font-bold text-white/90 leading-relaxed italic">
                  "{explanation}"
                </p>

                {!isCorrect && (
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block mb-2">Hank's Handbook Point:</span>
                    <p className="text-lg font-black text-white italic">
                      {question.options[question.correctIndex]}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full py-5 bg-white text-black font-black rounded-2xl chunky-button uppercase tracking-widest disabled:opacity-50 transition-colors hover:bg-lime-400"
          >
            Hunt Next Question!
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default HankFeedback;
