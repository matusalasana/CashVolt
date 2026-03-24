import React from 'react';
import { type Transaction } from '../types/transaction';
import { HiTrendingUp, HiTrendingDown, HiWallet } from "react-icons/hi";

interface Props {
  transactions: Transaction[] | undefined;
}

export const BalanceSummary: React.FC<Props> = ({ transactions }) => {
  // Calculate totals manually from the current transactions list
  const totals = transactions?.reduce((acc, curr) => {
    const val = Number(curr.amount);
    if (curr.type === 'income') acc.income += val;
    if (curr.type === 'expense') acc.expense += val;
    return acc;
  }, { income: 0, expense: 0 }) || { income: 0, expense: 0 };

  const balance = totals.income - totals.expense;

  return (
    <div className="stats stats-vertical sm:stats-horizontal shadow bg-primary text-primary-content w-full mb-8">
      <div className="stat">
        <div className="stat-title text-primary-content/60">Total Balance</div>
        <div className="stat-value">${balance.toFixed(2)}</div>
        <div className="stat-actions">
           <div className="badge badge-outline gap-1 border-primary-content/30">
             <HiWallet /> Net Worth
           </div>
        </div>
      </div>
      
      <div className="stat">
        <div className="stat-title text-primary-content/60">Income</div>
        <div className="stat-value text-xl text-success flex items-center gap-1">
          <HiTrendingUp /> ${totals.income.toFixed(2)}
        </div>
      </div>
      
      <div className="stat">
        <div className="stat-title text-primary-content/60">Expenses</div>
        <div className="stat-value text-xl text-error flex items-center gap-1">
          <HiTrendingDown /> ${totals.expense.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
