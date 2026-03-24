import React from 'react';
import { type Transaction } from '../types/transaction';
import { HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp, HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";
import { useTransactions } from '../hooks/useTransactions';

interface Props {
  transaction: Transaction[];
}

export const TransactionCard: React.FC<Props> = ({ transaction }) => {
  const { deleteTransaction } = useTransactions();

  // Formatting the date nicely
  const date = new Date(transaction.transaction_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const isExpense = transaction.type === 'expense';

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200 mb-3">
      <div className="card-body p-4 flex-row items-center justify-between">
        
        {/* Left Side: Icon & Info */}
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isExpense ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
            {isExpense ? <HiOutlineArrowTrendingDown size={24} /> : <HiOutlineArrowTrendingUp size={24} />}
          </div>
          
          <div>
            <h3 className="font-bold text-base capitalize">{transaction.source}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs opacity-60 font-medium">{date}</span>
              <span className="badge badge-ghost badge-xs text-[10px] uppercase tracking-wider px-1">
                {transaction.category_name || 'General'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Amount & Actions */}
        <div className="flex flex-col items-end gap-1">
          <span className={`text-lg font-bold ${isExpense ? 'text-error' : 'text-success'}`}>
            {isExpense ? '-' : '+'}${Number(transaction.amount).toFixed(2)}
          </span>
          
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-xs text-info p-0 h-auto min-h-0">
              <HiOutlinePencilSquare size={16} />
            </button>
            <button 
              onClick={() => { if(confirm('Delete this?')) deleteTransaction(transaction.id!) }}
              className="btn btn-ghost btn-xs text-error p-0 h-auto min-h-0"
            >
              <HiOutlineTrash size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
