import React from "react";
import {
  Wallet,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth"

interface BudgetAnalyticsCardProps {
  name: string;
  spent: number;
  budget: number;
  remaining: number;
  month: number;
  year: number;
}

const BudgetAnalyticsCard: React.FC<BudgetAnalyticsCardProps> = ({
  name,
  spent,
  budget,
  remaining,
  month,
  year,
}) => {
  const percentSpent =
    budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;

  const isOverBudget = Number(spent) > Number(budget);
  const isNearLimit = percentSpent >= 85 && !isOverBudget;
  
  const { data: user } = useAuth(); 
  const currency = user.currency;

  const getStatus = () => {
    if (isOverBudget)
      return {
        label: "Over Budget",
        color: "text-error",
        icon: <AlertTriangle size={16} />,
      };

    if (isNearLimit)
      return {
        label: "Near Limit",
        color: "text-warning",
        icon: <AlertTriangle size={16} />,
      };

    return {
      label: "On Track",
      color: "text-success",
      icon: <CheckCircle2 size={16} />,
    };
  };

  const status = getStatus();

  // Format month number to name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month - 1];

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
      
      {/* HEADER */}
      <div className="card-body pb-3">
        <div className="flex items-start justify-between">
          
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Wallet size={18} className="text-primary" />
              {name}
            </h2>

            <div className="flex items-center gap-2 text-sm opacity-70 mt-1">
              <Calendar size={14} />
              {monthName} {year}
            </div>
          </div>

          {/* Status Badge */}
          <div className={`badge ${status.color} badge-outline gap-1 relative`}>
            {status.icon}
            {status.label}
            
            {remaining < 0 &&
            <span className="text-sm absolute top-7 right-0 font-normal">
              {remaining} {currency}
            </span>
            }
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-4">
          <progress
            className={`progress w-full ${
              isOverBudget ? "progress-error" : "progress-primary"
            }`}
            value={spent}
            max={budget}
          ></progress>

          <div className="flex justify-start text-xs mt-2 opacity-70">
            <span>{percentSpent}% used</span>
          </div>
        </div>
      </div>

      {/* BODY STATS */}
      <div className="grid grid-cols-3 divide-x divide-base-300 bg-base-200/40 py-4">
        
        {/* Spent */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-error text-xs font-bold">
            <TrendingDown size={14} />
            Spent
          </div>
          <p className="text-lg font-bold">
            {spent} <span className="text-sm font-normal">{currency}</span>
          </p>
        </div>

        {/* Budget */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-info text-xs font-bold">
            <Wallet size={14} />
            Budget
          </div>
          <p className="text-lg font-bold">
            {budget} <span className="text-sm font-normal">{currency}</span>
          </p>
        </div>

        {/* Remaining */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-success text-xs font-bold">
            <TrendingUp size={14} />
            Remaining
          </div>
          <p
            className={`text-lg font-bold ${
              remaining < 0 ? "text-error" : ""
            }`}
          >
            {Math.max(remaining, 0)} <span className="text-sm font-normal">{currency}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetAnalyticsCard;