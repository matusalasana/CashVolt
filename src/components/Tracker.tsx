import React, { useState } from 'react';
import { CheckCircle2, Circle, CalendarDays, Info, Trophy } from 'lucide-react';

const Tracker: React.FC = () => {
  // Mocking state for 30 days (true = completed, false = missed)
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2, 3, 5, 6, 8, 10, 12]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const totalDays = 30;
  const completedCount = completedDays.length;
  const remainingDays = totalDays - 30; // Assuming today is day 30
  
  const toggleDay = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      
      {/* Interactive Grid Card */}
      <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold text-slate-800">Daily Consistency</h2>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
            Click a day to toggle
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
          {days.map((day) => {
            const isDone = completedDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`group relative aspect-square flex items-center justify-center rounded-xl border-2 transition-all duration-200 
                  ${isDone 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600' 
                    : 'bg-white border-slate-100 text-slate-300 hover:border-slate-300'}`}
              >
                <span className="absolute top-1 left-1.5 text-[10px] font-bold uppercase opacity-50">
                  {day}
                </span>
                {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-20 group-hover:opacity-100" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Table Replacement */}
      <div className="w-full lg:w-80 space-y-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
            <Info size={18} className="text-slate-400" />
            Summary
          </h3>
          
          <div className="space-y-4">
            <StatRow label="Total Days" value="30" />
            <StatRow label="Completed" value={completedCount} highlight="text-emerald-600" />
            <StatRow label="Missed" value={totalDays - completedCount} highlight="text-rose-500" />
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-500">Progress</span>
                <span className="text-sm font-bold text-indigo-600">
                  {Math.round((completedCount / totalDays) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${(completedCount / totalDays) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-indigo-50 rounded-xl flex items-center gap-3">
              <Trophy className="text-indigo-600" size={24} />
              <div>
                <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Status</p>
                <p className="text-sm font-bold text-indigo-900">Very Good 👍</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small reusable row component
const StatRow = ({ label, value, highlight = "text-slate-800" }: { label: string, value: any, highlight?: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-slate-500">{label}</span>
    <span className={`text-sm font-bold ${highlight}`}>{value}</span>
  </div>
);

export default Tracker;
