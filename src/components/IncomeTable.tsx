import React from 'react';
import { Heart, User, Banknote, Calendar } from 'lucide-react';
import Title from "./Title";

const IncomeTable: React.FC = () => {
  const incomeData = [
    { source: "Mom", desc: "Monthly allowance", amount: 1500, icon: <Heart className="text-rose-500" /> },
    { source: "Romeo", desc: "Fixed money from Tinsae", amount: 3000, icon: <User className="text-blue-500" /> },
    { source: "Mom", desc: "Additional support", amount: 500, icon: <Heart className="text-rose-500" /> },
  ];

  const total = 5000; // Corrected total based on the rows provided

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Title txt1="MY" txt2="INCOME" />
        
        {/* Quick Total Summary Card */}
        <div className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="p-2 bg-emerald-500 text-white rounded-full">
            <Banknote size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">Total Received</p>
            <p className="text-xl font-black text-emerald-900">{total.toLocaleString()} <span className="text-sm font-normal">ETB</span></p>
          </div>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
              <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {incomeData.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-slate-800">{item.source}</span>
                  </div>
                  {/* Mobile-only description view */}
                  <p className="md:hidden text-xs text-slate-400 mt-1">{item.desc}</p>
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-slate-500 italic">
                  {item.desc}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-bold text-emerald-600">
                    +{item.amount.toLocaleString()} 
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">ETB</span>
                </td>
              </tr>
            ))}
          </tbody>
          
          {/* Detailed Footer */}
          <tfoot className="bg-slate-50/50">
            <tr>
              <td colSpan={2} className="hidden md:table-cell px-6 py-4 text-sm font-bold text-slate-900 text-right">
                Grand Total
              </td>
              <td className="md:hidden px-6 py-4 text-sm font-bold text-slate-900">
                Total
              </td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex flex-col items-end">
                  <span className="text-lg font-black text-slate-900">{total.toLocaleString()} ETB</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold">
                    <Calendar size={10} />
                    Refreshed Today
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default IncomeTable;
