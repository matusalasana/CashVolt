import { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { useTransactions } from "../hooks/useTransactions";
import { TransactionCard } from "../components/TransactionCard";
import { AddTransactionForm } from "../components/AddTransactionForm"

const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { transactions, isLoading } = useTransactions(filter === 'all' ? undefined : filter);

  const filteredTransactions = transactions?.filter(tx => 
    tx.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.amount.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Transactions</h1>
          <p className="text-base-content/60 mt-1">Detailed history of your cash flow.</p>
        </div>
        <button className="btn btn-outline btn-sm rounded-xl">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Controls: Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Search Bar */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, category..."
            className="input input-bordered w-full pl-12 rounded-2xl focus:ring-2 focus:ring-primary outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <AddTransactionForm />

        {/* Filter Toggle (daisyUI style) */}
        <div className="tabs tabs-boxed bg-base-100 p-1 rounded-2xl flex">
          {(['all', 'income', 'expense'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 tab tab-sm font-bold uppercase transition-all ${
                filter === t ? 'tab-active !bg-primary !text-primary-content' : ''
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Date Selector */}
        <button className="btn btn-ghost bg-base-100 border-base-300 flex justify-between px-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span>Last 30 Days</span>
          </div>
          <Filter size={16} />
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </div>
        ) : filteredTransactions?.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
            <p className="opacity-50">No transactions found matching your criteria.</p>
          </div>
        ) : (
          filteredTransactions?.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx}/>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-bold opacity-40 uppercase tracking-widest">
          {filteredTransactions?.length || 0} Transactions Found
        </p>
        <div className="join">
          <button className="join-item btn btn-sm btn-outline">Prev</button>
          <button className="join-item btn btn-sm btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
