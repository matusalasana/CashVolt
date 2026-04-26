import { Pencil, Trash2, Target, Clock } from "lucide-react";

interface Props {
  id: number;
  title: string;
  target_amount: number | string;
  saved_amount?: number;
  due_date?: string;
  days_left?: number;

  onEdit?: () => void;
  onDelete?: () => void;
}

const SavingsCard = ({
  title,
  target_amount,
  saved_amount = 0,
  due_date,
  days_left,
  onEdit,
  onDelete,
}: Props) => {
  const target = Number(target_amount);
  const saved = Number(saved_amount);

  const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
  const remaining = Math.max(target - saved, 0);
  const isCompleted = progress >= 100;

  const getUrgencyClasses = () => {
    if (isCompleted) return "bg-success/10 text-success border-success/20";
    if (days_left !== undefined) {
      if (days_left <= 3) return "bg-error/10 text-error border-error/20 animate-pulse";
      if (days_left <= 7) return "bg-warning/10 text-warning border-warning/20";
    }
    return "bg-base-200 text-base-content border-base-300";
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold tracking-tight text-base-content group-hover:text-primary">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-medium text-base-content/60">
            <Target size={14} className="text-primary" />
            <span>Goal: {target.toLocaleString()} ETB</span>
          </div>
        </div>

        <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="rounded-lg p-2 text-base-content/60 hover:bg-base-200 hover:text-primary"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg p-2 text-base-content/60 hover:bg-error/10 hover:text-error"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between items-end">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-base-content">
              {saved.toLocaleString()}
            </span>
            <span className="text-xs font-bold uppercase text-base-content/50">
              ETB
            </span>
          </div>

          <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getUrgencyClasses()}`}>
            {isCompleted ? "Goal Reached" : `${progress.toFixed(0)}%`}
          </span>
        </div>

        <div className="h-2.5 w-full rounded-full bg-base-200 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ${
              isCompleted ? "bg-success" : "bg-primary"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex justify-between border-t border-base-200 pt-4">

        <div>
          <span className="text-[10px] uppercase text-base-content/50">
            Remaining
          </span>
          <div className="text-sm font-bold text-base-content">
            {remaining.toLocaleString()} ETB
          </div>
        </div>

        <div className="text-right">
          {days_left !== undefined && !isCompleted && (
            <div className="flex items-center gap-1 text-xs font-bold text-base-content/60">
              <Clock size={12} className={days_left <= 3 ? "text-error" : ""} />
              {days_left} {days_left === 1 ? "day" : "days"} left
            </div>
          )}

          {due_date && (
            <div className="text-[10px] text-base-content/40">
              Due {new Date(due_date).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsCard;