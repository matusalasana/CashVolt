import   { useState, useEffect } from 'react';
import { CheckCircle2, Circle, CalendarDays, Info, Trophy, Lock } from 'lucide-react';

const Tracker: React.FC = () => {
  // Persistence: Load from localStorage so progress isn't lost on refresh
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('habit-streak') : null;
    return saved ? JSON.parse(saved) : [];
  });

  const totalDays = 30;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const completedCount = completedDays.length;

  useEffect(() => {
    localStorage.setItem('habit-streak', JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleDay = (day: number) => {
    const isCompleted = completedDays.includes(day);
    const isFirstDay = day === 1;
    const isPreviousDayDone = completedDays.includes(day - 1);
    const isNextDayDone = completedDays.includes(day + 1);

    if (isCompleted) {
      // UNMARKING: Only allow if it's the LAST one in the current chain
      if (!isNextDayDone) {
        setCompletedDays(prev => prev.filter(d => d !== day));
      } else {
        // Optional: A subtle shake or toast would be better than an alert
        console.log("Cannot break the chain from the middle.");
      }
    } else {
      // MARKING: Only allow if it's Day 1 OR the chain is continuous
      if (isFirstDay || isPreviousDayDone) {
        setCompletedDays(prev => [...prev, day].sort((a, b) => a - b));
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* Main Tracker Card */}
      <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 w-full shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="text-indigo-600" size={22} />
              <h2 className="text-xl font-black text-slate-800 tracking-tight">30-Day Mastery</h2>
            </div>
            <p className="text-sm text-slate-400 font-medium">Build your chain. Don't break it.</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-black text-indigo-600">{completedCount}/30</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Days Done</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-4">
          {days.map((day) => {
            const isDone = completedDays.includes(day);
            const isNextToComplete = day === 1 ? !isDone : completedDays.includes(day - 1) && !isDone;
            const isLocked = !isDone && !isNextToComplete;
            const isLastInChain = isDone && !completedDays.includes(day + 1);

            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`group relative aspect-square flex items-center justify-center rounded-2xl border-2 transition-all duration-300 
                  ${isDone 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' 
                    : isNextToComplete 
                      ? 'bg-white border-indigo-400 text-indigo-500 ring-4 ring-indigo-50 animate-pulse' 
                      : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'}`}
              >
                <span className={`absolute top-2 left-2 text-[10px] font-bold ${isDone ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {day.toString().padStart(2, '0')}
                </span>
                
                {isDone ? (
                  <CheckCircle2 size={35} strokeWidth={2.5} />
                ) : isLocked ? (
                  <Lock size={25} className="opacity-20" />
                ) : (
                  <Circle size={35} className="opacity-40 group-hover:opacity-100" />
                )}

                {/* Helpful tooltip-like indicator for unmarking */}
                {isDone && !isLastInChain && (
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition-opacity">
                    <Lock size={16} className="text-white/50" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-6 flex items-center gap-2">
            <Info size={18} className="text-indigo-400" />
            Performance
          </h3>
          
          <div className="space-y-5">
            <StatRow label="Current Streak" value={`${completedCount} Days`} highlight="text-emerald-600" />
            <StatRow label="Completion" value={`${Math.round((completedCount / totalDays) * 100)}%`} />
            
            <div className="pt-2">
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-1000 ease-out" 
                  style={{ width: `${(completedCount / totalDays) * 100}%` }}
                />
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-2xl flex items-center gap-4 transition-colors ${completedCount === 30 ? 'bg-amber-100' : 'bg-slate-50'}`}>
              <Trophy className={completedCount === 30 ? 'text-amber-600' : 'text-slate-300'} size={32} />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Achievement</p>
                <p className="text-sm font-black text-slate-700">
                  {completedCount === 30 ? "Grandmaster! 🏆" : completedCount >= 20 ? "Almost there!" : "Building Habits"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => { if(confirm("Reset all progress?")) setCompletedDays([]); }}
          className="w-full py-3 text-sm font-bold text-rose-400 hover:text-rose-600 transition-colors"
        >
          Reset Challenge
        </button>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, highlight = "text-slate-800" }: { label: string, value: any, highlight?: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className={`text-sm font-black ${highlight}`}>{value}</span>
  </div>
);

export default Tracker;
