import React from 'react';
import { Target, Plus, TrendingUp, ArrowUpRight, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import useDerivedStats from '../stores/derivedStats';

// Define the type for the goal object
interface Goal {
  id: number;
  title: string;
  target: number;
  saved: number;
  deadline: string;
  icon: string;
  color: string;
}

const Savings: React.FC = () => {
  // Get data from the hook
  const derivedStats = useDerivedStats();
  
  // Create goals array from the available data
  const goals: Goal[] = [
    {
      id: 1,
      title: "Main Savings Goal",
      target: derivedStats.goal,
      saved: derivedStats.saving,
      deadline: "2024-12-01",
      icon: '🎯',
      color: "from-indigo-600 to-violet-600"
    }
  ];

  // Calculate derived values
  const totalSaved = derivedStats.saving;
  const totalTarget = derivedStats.goal;
  const overallProgress = derivedStats.progress;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Savings Goals</h1>
            <p className="text-slate-500 mt-2">
              Tracking <span className="font-bold text-indigo-600">{goals.length} active goal</span>
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200">
            <Plus size={20} />
            Create New Goal
          </button>
        </div>

        {/* OVERALL PROGRESS CARD */}
        <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 mb-10">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <TrendingUp size={240} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-500">Global Progress</span>
              <div className="flex items-baseline gap-3 mt-2">
                <h2 className="text-5xl md:text-6xl font-black text-slate-900">{overallProgress}%</h2>
                <span className="text-xl font-bold text-slate-400">Achieved</span>
              </div>
              <p className="text-slate-500 mt-4 max-w-sm">
                You've locked in <span className="text-slate-900 font-bold">{totalSaved.toLocaleString()} ETB</span> toward your total target of {totalTarget.toLocaleString()} ETB.
              </p>
            </div>

            <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* GOALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal) => {
            const progress = (goal.saved / goal.target) * 100;
            return (
              <motion.div 
                key={goal.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${goal.color} text-white shadow-lg`}>
                      <Target size={20} />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                      <Clock size={14} />
                      {goal.deadline}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{goal.title}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl font-black text-slate-900">{goal.saved.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">/ {goal.target.toLocaleString()} ETB</span>
                  </div>

                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${goal.color}`}
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 group">
                  Goal Details
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            );
          })}

          <button className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all group min-h-[300px]">
            <Plus size={32} className="mb-4" />
            <span className="font-bold">Add New Savings Goal</span>
          </button>
        </div>

        {/* SMART TIPS */}
        <div className="mt-16 p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-white rounded-2xl shadow-sm">
            <Zap className="text-indigo-600" size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-slate-900">Savings Optimization</h4>
            <p className="text-slate-600 mt-1">
              Your current savings rate is <span className="font-bold text-indigo-600">healthy</span>. At this pace, you'll reach your primary goals 2 months ahead of schedule.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Savings;