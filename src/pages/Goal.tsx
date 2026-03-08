import React from 'react';
import { 
  Target, 
  Plus, 
  Car, 
  Home, 
  Palmtree, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import useDerivedStats from "../stores/derivedStats"

const Goal: React.FC = () => {
  const {saving, progress, goal} = useDerivedStats()
  const goals = [
    {
      id: 1,
      title: "Buy HP laptop",
      target: goal,
      saved: saving,
      deadline: "2024-12-01",
      icon: '💻',
      color: "bg-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Savings Goals</h1>
          <p className="text-slate-500 mt-1">Turning your dreams into achievable milestones.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100">
          <Plus size={20} />
          Create New Goal
        </button>
      </header>

      {/* Global Progress Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Savings Progress</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">{saving}</span>
            <span className="text-lg font-bold text-slate-400">ETB</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-[28%] rounded-full" />
          </div>
          <p className="text-sm text-slate-500">You are {progress}% towards your combined goals.</p>
        </div>
        <div className="h-20 w-px bg-slate-100 hidden md:block" />
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{goals.length}</p>
            <p className="text-xs font-bold text-slate-400 uppercase">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">0</p>
            <p className="text-xs font-bold text-slate-400 uppercase">Completed</p>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          return (
            <div key={goal.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${goal.color} group-hover:scale-110 transition-transform`}>
                  <p className="text-2xl">
                    {goal.icon}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Remaining</span>
                  <p className="font-bold text-slate-900">{(goal.target - goal.saved).toLocaleString()} ETB</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">{goal.title}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Clock size={14} />
                <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>

              {/* Progress Ring & Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Saved So Far</p>
                    <p className="text-lg font-black text-indigo-600">{goal.saved.toLocaleString()} ETB</p>
                  </div>
                  <span className="text-2xl font-black text-blue-600">{Math.round(progress)}%</span>
                </div>
                
                <div className="w-full bg-slate-100 h-4 rounded-full p-1">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                   <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                     <TrendingUp size={14} />
                     <span>On Track</span>
                   </div>
                   <button className="text-xs font-bold text-indigo-600 hover:underline">
                     Add Savings
                   </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Goal Placeholder */}
        <button className="border-4 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all group">
          <div className="p-4 rounded-full bg-slate-100 mb-4 group-hover:bg-indigo-50 transition-colors">
            <Plus size={32} />
          </div>
          <span className="font-bold">Add Another Goal</span>
        </button>
      </div>
    </div>
  );
};

export default Goal;
