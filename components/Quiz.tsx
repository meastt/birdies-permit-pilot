
import React, { useState, useEffect } from 'react';
import { UTAH_QUESTIONS } from '../constants';
import { Question, Difficulty, AppView } from '../types';
import HankFeedback from './HankFeedback';
import { generateStudyGuide } from '../services/geminiService';

interface QuizProps {
  difficulty?: Difficulty;
  isMock?: boolean;
  onExit: (score: number, missedIds: string[], total: number, didComplete: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ difficulty, isMock = false, onExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showHank, setShowHank] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [missedIds, setMissedIds] = useState<string[]>([]);
  const [studyGuide, setStudyGuide] = useState<string | null>(null);
  const [loadingGuide, setLoadingGuide] = useState(false);

  const [sessionQuestions] = useState(() => {
    const pool = difficulty
      ? UTAH_QUESTIONS.filter(q => q.difficulty === difficulty)
      : isMock ? [...UTAH_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 25)
        : UTAH_QUESTIONS.slice(0, 15); // Default training session size
    return pool;
  });

  const currentQuestion = sessionQuestions[currentIdx];
  const isHighStakes = currentQuestion.category === "DUI Laws" || currentQuestion.difficulty === Difficulty.EXPERT;

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    const isCorrect = idx === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setMissedIds(prev => [...prev, currentQuestion.id]);
    }

    if (isMock) {
      setTimeout(() => handleNext(), 800);
    } else {
      if (!isCorrect) {
        setTimeout(() => setShowHank(true), 400);
      } else {
        setTimeout(() => handleNext(), 1200);
      }
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setShowHank(false);
    if (currentIdx < sessionQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsFinished(true);
    const passRate = (score / sessionQuestions.length);
    if (isMock && passRate < 0.8) {
      setLoadingGuide(true);
      const missed = UTAH_QUESTIONS.filter(q => missedIds.includes(q.id));
      const guide = await generateStudyGuide(missed);
      setStudyGuide(guide);
      setLoadingGuide(false);
    }
  };

  if (isFinished) {
    const passed = (score / sessionQuestions.length) >= 0.8;
    const categoryStats = sessionQuestions.reduce((acc, q) => {
      const cat = q.category || 'General';
      if (!acc[cat]) acc[cat] = { total: 0, correct: 0 };
      acc[cat].total++;
      if (!missedIds.includes(q.id)) acc[cat].correct++;
      return acc;
    }, {} as Record<string, { total: number; correct: number }>);

    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 md:p-16 chunky-card text-center animate-in fade-in zoom-in duration-500 overflow-y-auto max-h-[85vh]">
        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-4xl md:text-6xl mx-auto mb-6 md:mb-10 rotate-3 shadow-2xl ${passed ? 'lime-gradient text-black font-black' : 'orange-gradient text-white font-black'}`}>
          {passed ? 'A+' : 'F'}
        </div>

        <h2 className="text-3xl md:text-5xl font-black mb-2 md:mb-4 uppercase italic tracking-tighter">
          {passed ? 'LEVEL CLEARED!' : 'MISSION FAILED'}
        </h2>
        <p className="text-white/40 mb-8 md:mb-12 text-sm md:text-xl font-bold uppercase tracking-widest">
          Score: <span className="text-white">{score}</span> / {sessionQuestions.length} ({Math.round((score / sessionQuestions.length) * 100)}%)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
          {Object.entries(categoryStats).map(([cat, stat]) => {
            const s = stat as { correct: number; total: number };
            return (
              <div key={cat} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="block text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-widest">{cat}</span>
                  <span className="text-sm md:text-lg font-black uppercase italic">{s.correct}/{s.total}</span>
                </div>
                <div className="h-2 w-20 md:w-32 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.correct === s.total ? 'bg-lime-400' : 'bg-orange-500'}`}
                    style={{ width: `${(s.correct / s.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {loadingGuide ? (
          <div className="py-12 bg-white/5 rounded-3xl mb-10 border-2 border-dashed border-white/10">
            <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-lime-400 font-black uppercase tracking-widest text-xs">Hank is coding your recovery plan...</p>
          </div>
        ) : studyGuide ? (
          <div className="text-left bg-orange-500/10 p-10 rounded-[2.5rem] mb-12 border-2 border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <i className="fas fa-book-dead text-6xl"></i>
            </div>
            <h3 className="text-2xl font-black text-orange-400 mb-6 uppercase italic flex items-center gap-3">
              <i className="fas fa-biohazard"></i> Recovery Intel
            </h3>
            <div className="prose prose-invert max-w-none text-white/80 whitespace-pre-wrap font-medium leading-relaxed">
              {studyGuide}
            </div>
          </div>
        ) : null}

        <button
          onClick={() => onExit(score, missedIds, sessionQuestions.length, true)}
          className="w-full md:w-auto px-16 py-6 bg-white text-black font-black rounded-[1.5rem] chunky-button text-xl uppercase tracking-tighter hover:bg-lime-400 transition-colors"
        >
          Back to Base
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-5xl mx-auto p-2 md:p-8 transition-colors duration-700 ${isHighStakes ? 'bg-orange-500/5' : ''}`}>
      <div className="flex justify-between items-center mb-4 md:mb-12">
        <button onClick={() => onExit(0, [], sessionQuestions.length, false)} className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-sm hover:bg-white hover:text-black transition-all chunky-button">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="flex-1 px-4 md:px-10">
          <div className="flex justify-between items-end mb-1.5 md:mb-3">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/30">
              {isMock ? 'SIMULATION MODE' : 'TRAINING'}
            </span>
            <span className="text-[10px] md:text-xs font-black text-lime-400">{currentIdx + 1} / {sessionQuestions.length}</span>
          </div>
          <div className="h-2 md:h-4 w-full bg-white/5 rounded-full p-0.5 md:p-1 border border-white/10 shadow-inner">
            <div
              className="h-full lime-gradient rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(190,242,100,0.5)]"
              style={{ width: `${((currentIdx + 1) / sessionQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="w-9 h-9 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10">
          <i className="fas fa-clock text-white/30 text-sm"></i>
        </div>
      </div>

      <div className={`chunky-card p-4 md:p-16 border-2 transition-all duration-500 ${isHighStakes ? 'border-orange-500/30 shadow-[0_10px_0_0_#7c2d12]' : 'border-white/5'}`}>
        <div className="flex gap-3 md:gap-8 items-start mb-4 md:mb-12">
          <div className="shrink-0">
            <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl ${isHighStakes ? 'orange-gradient shadow-[0_0_20px_rgba(251,146,60,0.4)]' : 'utah-gradient'} text-white`}>
              <i className={`fas ${isHighStakes ? 'fa-radiation' : 'fa-car'}`}></i>
            </div>
          </div>
          <div className="flex-1">
            {currentQuestion.scenario && (
              <div className="mb-2 inline-block px-2 py-1 rounded-full bg-white/5 border border-white/10">
                <p className="text-lime-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest italic">
                  <i className="fas fa-map-pin mr-1"></i> {currentQuestion.scenario}
                </p>
              </div>
            )}
            <h2 className="text-lg md:text-4xl font-black text-white leading-tight tracking-tight uppercase italic">
              {currentQuestion.text}
            </h2>
          </div>
        </div>

        <div className="grid gap-2 md:gap-5">
          {currentQuestion.options.map((option, idx) => {
            let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20";
            let icon = null;

            if (selectedIdx !== null) {
              if (idx === currentQuestion.correctIndex) {
                stateClass = "bg-green-500 text-black border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.3)]";
                icon = <i className="fas fa-check-circle"></i>;
              } else if (idx === selectedIdx) {
                stateClass = "bg-orange-500 text-white border-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.3)]";
                icon = <i className="fas fa-times-circle"></i>;
              } else {
                stateClass = "opacity-20 grayscale scale-95 pointer-events-none";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selectedIdx !== null}
                className={`p-3 md:p-8 rounded-xl md:rounded-[1.5rem] border-2 text-left font-black text-sm md:text-xl transition-all flex justify-between items-center group chunky-button ${stateClass}`}
              >
                <span className="uppercase tracking-tight">{option}</span>
                <span className="text-lg md:text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showHank && (
        <HankFeedback
          question={currentQuestion}
          selectedAnswerIndex={selectedIdx!}
          isCorrect={selectedIdx === currentQuestion.correctIndex}
          onClose={handleNext}
        />
      )}
    </div>
  );
};

export default Quiz;
