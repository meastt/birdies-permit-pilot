
import React, { useState, useEffect } from 'react';

const NUMERICAL_STATS = [
  { label: "Fire Hydrant distance", value: 15, unit: "ft" },
  { label: "Crosswalk distance", value: 20, unit: "ft" },
  { label: "Stop sign distance", value: 30, unit: "ft" },
  { label: "Dim high beams (following)", value: 300, unit: "ft" },
  { label: "Dim high beams (oncoming)", value: 500, unit: "ft" },
  { label: "Min passing space for cyclists", value: 3, unit: "ft" },
  { label: "Adult legal BAC limit", value: 0.05, unit: "%" },
];

const StatLab: React.FC<{onExit: () => void}> = ({ onExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | 'correct' | 'wrong'>(null);
  const [score, setScore] = useState(0);

  const currentItem = NUMERICAL_STATS[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseFloat(userInput) === currentItem.value;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setUserInput("");
      if (currentIdx < NUMERICAL_STATS.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        onExit();
      }
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto p-10 mt-12 chunky-card border-purple-500/20 shadow-[0_15px_0_0_#4c1d95] relative overflow-hidden">
      <div className="absolute -top-10 -left-10 p-20 opacity-5 pointer-events-none">
        <i className="fas fa-bolt text-[15rem] text-purple-500"></i>
      </div>

      <div className="flex justify-between items-center mb-12 relative z-10">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Stat Lab</h2>
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Rapid Fire Pulse</span>
        </div>
        <button onClick={onExit} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="bg-white/5 p-12 rounded-[2rem] border border-white/10 mb-10 text-center flex flex-col justify-center min-h-[250px] transition-transform hover:scale-[1.01]">
        <p className="text-purple-400 uppercase tracking-[0.3em] text-[10px] font-black mb-6">Unit: {currentItem.unit}</p>
        <h3 className="text-4xl font-black leading-tight italic uppercase tracking-tight">{currentItem.label}</h3>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="relative">
          <input 
            autoFocus
            type="number" 
            step="0.01"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="0"
            className="w-full bg-[#121212] border-4 border-white/5 rounded-[2rem] p-10 text-6xl font-black text-center focus:border-purple-500 focus:outline-none transition-all shadow-inner text-white"
          />
          <div className="mt-8">
            <button 
              type="submit" 
              className="w-full py-6 bg-white text-black font-black rounded-[1.5rem] chunky-button text-xl uppercase tracking-tighter hover:bg-purple-500 hover:text-white"
            >
              Verify Intel
            </button>
          </div>
        </div>

        {feedback && (
          <div className={`absolute inset-0 flex items-center justify-center rounded-[2rem] z-20 animate-in zoom-in duration-200 ${feedback === 'correct' ? 'bg-green-500 text-black shadow-[0_0_50px_rgba(74,222,128,0.4)]' : 'bg-orange-500 text-white shadow-[0_0_50px_rgba(251,146,60,0.4)]'}`}>
            <i className={`fas ${feedback === 'correct' ? 'fa-check' : 'fa-times'} text-8xl animate-bounce`}></i>
          </div>
        )}
      </form>
      
      <div className="mt-12 flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/20">
         <span>Item {currentIdx + 1} of {NUMERICAL_STATS.length}</span>
         <span className="text-purple-400">Streak: {score}</span>
      </div>
    </div>
  );
};

export default StatLab;
