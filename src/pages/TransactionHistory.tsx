import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download,
  Calendar,
  MoreVertical,
  Tag
} from 'lucide-react';

const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Data
  const transactions = [
    { id: 1, type: 'expense', category: 'Food', title: 'Dabo Kolo', amount: 400, date: '2024-05-20', method: 'Cash' },
    { id: 2, type: 'income', category: 'Salary', title: 'Monthly Pay', amount: 9000, date: '2024-05-18', method: 'Bank' },
    { id: 3, type: 'expense', category: 'Shopping', title: 'New Jacket', amount: 2400, date: '2024-05-15', method: 'Telebirr' },
    { id: 4, type: 'expense', category: 'Medical', title: 'Dentist Checkup', amount: 4000, date: '2024-05-12', method: 'Bank Transfer' },
    { id: 5, type: 'income', category: 'Gift', title: 'From Romeo', amount: 3000, date: '2024-05-10', method: 'Telebirr' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-slate-500 mt-1">Detailed history of your cash flow.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Controls: Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Search Bar */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, category or amount..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <div className="bg-white p-1 border border-slate-200 rounded-2xl flex">
          {(['all', 'income', 'expense'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === t 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Date Selector Placeholder */}
        <button className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-indigo-500" />
            <span>Last 30 Days</span>
          </div>
          <Filter size={16} />
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Method</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${
                        tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {tx.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{tx.title}</p>
                        <p className="text-xs text-slate-400 font-medium">{tx.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold w-fit">
                      <Tag size={12} />
                      {tx.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-slate-500 font-medium">{tx.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-right md:text-left font-black ${
                      tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()}
                      <span className="text-[10px] ml-1 font-bold text-slate-400 uppercase">ETB</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
            Showing 5 of 128 transactions
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">Prev</button>
            <button className="px-4 py-2 text-xs font-bold text-indigo-600 bg-white border border-indigo-100 rounded-lg hover:bg-indigo-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
