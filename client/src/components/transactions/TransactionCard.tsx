import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Pencil, 
  Trash2, 
  Calendar, 
  Tag, 
  Wallet 
} from 'lucide-react';

import { useAuth } from "../../hooks/useAuth"

interface TransactionCardProps {
  amount: number;
  description: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  account: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  amount,
  description,
  date,
  type,
  category,
  account,
  onEdit,
  onDelete,
}) => {
  const isIncome = type === 'income';
  
  const { data: user } = useAuth(); 
  const currency = user.currency;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
      <div className="card-body p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Left Section: Icon & Info */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${isIncome ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
              {isIncome ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
            </div>
            
            <div>
              <h3 className="font-bold text-lg leading-tight">{description}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs opacity-70">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {date}
                </span>
                <span className="flex items-center gap-1 uppercase tracking-wider font-semibold">
                  <Tag size={12} /> {category}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Amount & Actions */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
            <div className={`text-xl font-black ${isIncome ? 'text-success' : 'text-error'}`}>
              {isIncome ? '+' : '-'}{Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-sm font-normal">{currency}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="badge badge-outline badge-sm gap-1 opacity-60 mr-2">
                <Wallet size={10} /> {account}
              </div>
              
              <div className="join">
                <button 
                  onClick={onEdit}
                  className="btn btn-ghost btn-xs join-item hover:bg-base-200 text-info"
                  aria-label="Edit transaction"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={onDelete}
                  className="btn btn-ghost btn-xs join-item hover:bg-error/10 text-error"
                  aria-label="Delete transaction"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
