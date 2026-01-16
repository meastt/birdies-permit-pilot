
import React from 'react';
import { MILESTONES } from '../constants';
import { AppView, UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate }) => {
  const accuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100)
    : 0;

  const hasStarted = stats.totalQuestionsAnswered > 0 || stats.completedMilestones.length > 0;

  return (
    <div className="space-y-4 md:space-y-12">
      <header className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-6xl font-black tracking-tighter uppercase italic">Road Ready</h1>
          <p className="text-white/40 font-bold tracking-widest uppercase text-[9px] md:text-xs">St. George → Logan</p>
        </div>
        <button
          onClick={() => onNavigate(AppView.MOCK_EXAM)}
          className="px-4 md:px-8 py-2 md:py-5 bg-white text-black font-black rounded-xl md:rounded-[1.5rem] chunky-button hover:bg-lime-400 uppercase tracking-tighter text-[10px] md:text-sm"
        >
          Exam
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        {/* The Map / Journey */}
        <div className="lg:col-span-8 chunky-card p-4 md:p-10 relative overflow-hidden">
          <h2 className="text-base md:text-3xl font-black italic mb-3 md:mb-12 uppercase tracking-tighter flex items-center gap-2 md:gap-4">
            <span className="w-1 md:w-2 h-4 md:h-8 bg-lime-400 rounded-full"></span>
            The Journey
          </h2>

          <div className="relative space-y-2 md:space-y-8">
            {MILESTONES.map((m, idx) => {
              const isCompleted = stats.completedMilestones.includes(m.id);
              const isCurrent = !isCompleted && (idx === 0 || stats.completedMilestones.includes(MILESTONES[idx - 1].id));

              return (
                <div key={m.id} className="flex items-center gap-3 md:gap-8 group">
                  <div className={`w-9 h-9 md:w-20 md:h-20 rounded-xl md:rounded-3xl flex items-center justify-center text-sm md:text-2xl font-black transition-all ${isCompleted ? 'lime-gradient text-black' : isCurrent ? 'bg-white text-black' : 'bg-white/5 text-white/20'}`}>
                    {isCompleted ? <i className="fas fa-check"></i> : idx + 1}
                  </div>
                  <div className="flex-1 py-1 md:pb-8 border-b border-white/5 group-last:border-0">
                    <h3 className={`text-sm md:text-2xl font-black uppercase tracking-tighter ${isCompleted || isCurrent ? 'text-white' : 'text-white/20'}`}>{m.name}</h3>
                    <p className="text-white/30 text-[9px] md:text-xs font-bold uppercase tracking-wide hidden md:block">{m.section}</p>
                  </div>
                  {isCurrent && (
                    <div className="text-lime-400 font-black text-[9px] md:text-xs uppercase">GO</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 md:mt-12">
            <button
              onClick={() => onNavigate(AppView.QUIZ)}
              className="w-full py-3 md:py-8 lime-gradient text-black font-black text-base md:text-3xl rounded-xl md:rounded-[2.5rem] chunky-button flex items-center justify-center gap-3 md:gap-6 group hover:scale-[1.02]"
            >
              <i className="fas fa-steering-wheel group-hover:rotate-45 transition-transform"></i>
              {hasStarted ? 'CONTINUE' : 'START'}
            </button>
          </div>
        </div>

        {/* Stats Row - Compact grid on mobile */}
        <div className="lg:col-span-4 grid grid-cols-3 lg:flex lg:flex-col gap-2 md:gap-10">
          {/* Accuracy */}
          <div className="chunky-card p-3 md:p-10 border-lime-400/20 flex flex-col items-center justify-center">
            <div className="relative w-14 h-14 md:w-40 md:h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * accuracy / 100)}
                  className="text-lime-400 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-sm md:text-5xl font-black">{accuracy}%</span>
              </div>
            </div>
            <span className="text-[7px] md:text-[10px] font-black uppercase tracking-wide text-white/30 mt-1">Accuracy</span>
          </div>

          {/* Stat Lab */}
          <button
            onClick={() => onNavigate(AppView.STAT_LAB)}
            className="bg-purple-600 rounded-xl md:rounded-[2.5rem] p-3 md:p-10 shadow-[0_3px_0_0_#4c1d95] md:shadow-[0_10px_0_0_#4c1d95] flex flex-col items-center justify-center text-center hover:scale-105 transition-transform"
          >
            <i className="fas fa-bolt text-xl md:text-4xl mb-1 md:mb-4"></i>
            <span className="text-[8px] md:text-base font-black uppercase">Stat Lab</span>
            <span className="text-[6px] md:text-xs text-white/60 hidden md:block">Rapid Fire</span>
          </button>

          {/* Milestones */}
          <div className="chunky-card p-3 md:p-8 flex flex-col items-center justify-center">
            <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center text-lg md:text-3xl mb-1">
              <i className="fas fa-medal text-orange-400"></i>
            </div>
            <div className="text-lg md:text-3xl font-black">{stats.completedMilestones.length}</div>
            <div className="text-[7px] md:text-[10px] font-black text-white/30 uppercase">Cleared</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
