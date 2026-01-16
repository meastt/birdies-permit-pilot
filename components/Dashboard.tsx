
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
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">Road Ready</h1>
          <p className="text-white/40 font-bold tracking-widest uppercase text-xs mt-2">Current Route: St. George to Logan</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => onNavigate(AppView.MOCK_EXAM)}
            className="flex-1 md:flex-initial px-8 py-5 bg-white text-black font-black rounded-[1.5rem] chunky-button hover:bg-lime-400 uppercase tracking-tighter text-sm"
          >
            Practice Exam
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* The Map / Journey */}
        <div className="lg:col-span-8 chunky-card p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <i className="fas fa-map-marked-alt text-[20rem]"></i>
          </div>
          
          <h2 className="text-3xl font-black italic mb-12 uppercase tracking-tighter flex items-center gap-4">
            <span className="w-2 h-8 bg-lime-400 rounded-full"></span>
            The Journey
          </h2>

          <div className="relative space-y-8">
            {MILESTONES.map((m, idx) => {
              const isCompleted = stats.completedMilestones.includes(m.id);
              const isCurrent = !isCompleted && (idx === 0 || stats.completedMilestones.includes(MILESTONES[idx-1].id));
              
              return (
                <div key={m.id} className="flex items-center gap-8 group">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-black transition-all chunky-button ${isCompleted ? 'lime-gradient text-black rotate-3' : isCurrent ? 'bg-white text-black scale-110 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/20'}`}>
                    {isCompleted ? <i className="fas fa-check"></i> : idx + 1}
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/5 group-last:border-0">
                    <h3 className={`text-2xl font-black uppercase tracking-tighter ${isCompleted || isCurrent ? 'text-white' : 'text-white/20'}`}>{m.name}</h3>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">{m.section}</p>
                  </div>
                  {(isCompleted || isCurrent) && (
                     <div className="text-lime-400 font-black text-xs uppercase tracking-widest hidden md:block">
                        {isCompleted ? 'LEVEL CLEAR' : 'NEXT STOP'}
                     </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12">
             <button 
                onClick={() => onNavigate(AppView.QUIZ)}
                className="w-full py-8 lime-gradient text-black font-black text-3xl rounded-[2.5rem] chunky-button flex items-center justify-center gap-6 group hover:scale-[1.02]"
             >
               <i className="fas fa-steering-wheel group-hover:rotate-45 transition-transform"></i>
               {hasStarted ? 'CONTINUE JOURNEY' : 'START JOURNEY'}
             </button>
          </div>
        </div>

        {/* Side Stats */}
        <div className="lg:col-span-4 space-y-10">
          <div className="chunky-card p-10 border-lime-400/20">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8">Ready Status</h3>
            <div className="relative h-40 w-40 mx-auto flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * accuracy / 100)} className="text-lime-400 transition-all duration-1000" strokeLinecap="round" />
               </svg>
               <div className="absolute flex flex-col items-center">
                 <span className="text-5xl font-black">{accuracy}%</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Accuracy</span>
               </div>
            </div>
          </div>

          <div className="bg-purple-600 rounded-[2.5rem] p-10 shadow-[0_10px_0_0_#4c1d95] relative overflow-hidden">
             <i className="fas fa-bolt absolute -top-4 -right-4 text-[10rem] text-white/10 rotate-12"></i>
             <h3 className="text-xl font-black uppercase italic mb-4">Stat Lab Pulse</h3>
             <p className="text-white/80 text-sm font-bold leading-relaxed mb-8">Master the high-stakes measurements (ft/mph) in rapid fire mode.</p>
             <button 
               onClick={() => onNavigate(AppView.STAT_LAB)}
               className="w-full py-4 bg-black text-white font-black rounded-2xl chunky-button text-xs uppercase tracking-widest"
             >
               Launch Lab
             </button>
          </div>

          <div className="chunky-card p-8 flex items-center gap-6">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">
               <i className="fas fa-medal text-orange-400"></i>
             </div>
             <div>
               <div className="text-3xl font-black uppercase">{stats.completedMilestones.length}</div>
               <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Milestones Met</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
