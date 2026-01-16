
import React, { useState, useEffect } from 'react';
import { AppView, UserStats, Milestone, Difficulty } from './types';
import { MILESTONES, UTAH_QUESTIONS } from './constants';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import StatLab from './components/StatLab';
import HandbookViewer from './components/HandbookViewer';

const STORAGE_KEY = 'birdies_permit_pilot_data_v2';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      completedMilestones: [],
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      history: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const handleQuizFinish = (score: number, missedIds: string[], total: number, didComplete: boolean) => {
    if (!didComplete) {
      setView(AppView.DASHBOARD);
      return;
    }

    const isMock = view === AppView.MOCK_EXAM;
    const newStats = { ...stats };
    newStats.totalQuestionsAnswered += total;
    newStats.correctAnswers += score;
    newStats.history.push({
      date: new Date().toISOString(),
      score,
      total,
      missedQuestions: missedIds,
      isMock
    });

    const passRate = (score / total) * 100;
    MILESTONES.forEach(m => {
      if (!newStats.completedMilestones.includes(m.id) && passRate >= m.requiredScore) {
        newStats.completedMilestones.push(m.id);
      }
    });

    setStats(newStats);
    setView(AppView.DASHBOARD);
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <nav className="border-b border-white/5 bg-[#121212]/80 backdrop-blur-xl py-6 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setView(AppView.DASHBOARD)}
          >
            <div className="w-14 h-14 lime-gradient rounded-2xl flex items-center justify-center text-black shadow-[0_4px_0_0_#4d7c0f] rotate-2 group-hover:rotate-0 transition-transform">
              <i className="fas fa-dove text-2xl"></i>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter block uppercase">Birdies Permit Pilot</span>
              <span className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Utah Ver. 2026</span>
            </div>
          </div>

          <div className="hidden lg:flex gap-12 font-black text-xs uppercase tracking-[0.2em] text-white/40">
            {Object.values(AppView).filter(v => v !== 'EXAM_REVIEW').map(v => (
              <button
                key={v}
                onClick={() => setView(v as AppView)}
                className={`transition-colors hover:text-white ${view === v ? 'text-lime-400' : ''}`}
              >
                {v.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
              <i className="fas fa-fire text-orange-500 text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-black px-1.5 rounded-full">0</span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-lime-400 p-1">
              <img src="/Birdie.jpeg" alt="Birdie Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {view === AppView.DASHBOARD && <Dashboard stats={stats} onNavigate={setView} />}
        {view === AppView.QUIZ && <Quiz onExit={handleQuizFinish} />}
        {view === AppView.STAT_LAB && <StatLab onExit={() => setView(AppView.DASHBOARD)} />}
        {view === AppView.HANDBOOK && <HandbookViewer />}
        {view === AppView.MOCK_EXAM && (
          <div className="fixed inset-0 bg-[#121212] z-[100] flex flex-col">
            <Quiz isMock={true} onExit={handleQuizFinish} />
          </div>
        )}
      </main>

      {/* Mobile Nav */}
      <div className="fixed bottom-3 left-3 right-3 p-1.5 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 md:hidden flex justify-around items-center z-50">
        <button onClick={() => setView(AppView.DASHBOARD)} className={`p-2.5 rounded-xl text-sm ${view === AppView.DASHBOARD ? 'bg-lime-400 text-black' : 'text-white/40'}`}>
          <i className="fas fa-home"></i>
        </button>
        <button onClick={() => setView(AppView.HANDBOOK)} className={`p-2.5 rounded-xl text-sm ${view === AppView.HANDBOOK ? 'bg-lime-400 text-black' : 'text-white/40'}`}>
          <i className="fas fa-book"></i>
        </button>
        <button onClick={() => setView(AppView.STAT_LAB)} className={`p-2.5 rounded-xl text-sm ${view === AppView.STAT_LAB ? 'bg-lime-400 text-black' : 'text-white/40'}`}>
          <i className="fas fa-bolt"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
