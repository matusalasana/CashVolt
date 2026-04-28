import { Pencil, Trash2, CreditCard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  name: string;
  recent_transaction_type: string;
  id: number;
  balance?: number;
  lastTransaction?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AccountCard = ({
  name,
  recent_transaction_type,
  id,
  balance = 0,
  lastTransaction,
  onEdit,
  onDelete,
}: Props) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  
  const { data: user } = useAuth();
  const currency = user?.currency ?? "ETB";

  return (
    <div className="group relative overflow-hidden rounded-2xl 
      bg-base-100/70 backdrop-blur-xl
      border border-base-200
      shadow-sm hover:shadow-xl
      transition-all duration-300 hover:scale-[1.02]">

      {/* hover glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-5">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-4">

          <div className="flex items-center gap-3">

            {/* avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition" />

              <div className="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold shadow-sm">
                {initials}
              </div>
            </div>

            {/* info */}
            <div>
              <h3 className="font-bold text-base-content">
                {name}
              </h3>

              <span className="text-[10px] font-mono text-base-content/50">
                REF: {id}
              </span>
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg hover:bg-base-200 text-base-content/60 hover:text-primary transition"
            >
              <Pencil size={14} />
            </button>

            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg hover:bg-base-200 text-base-content/60 hover:text-error transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* BALANCE */}
        <div className="mb-4 p-3 rounded-xl bg-base-200/40">

          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-base-content/50">
              Available Balance
            </span>
          </div>

          <div className="text-xl font-bold text-base-content">
            {balance}
            <span className="text-xs text-base-content/50 ml-1">
              {currency}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                balance > 0 
                  ? "bg-success" 
                  : balance < 0 
                  ? "bg-error"
                  : "bg-accent"
              }`}
            />
            <span className="text-[10px] text-base-content/50">
              {balance > 0 
                ? "Positive balance" 
                : balance < 0  
                ? "Overdrawn"
                : "Empty balance"
              }
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-2 pt-2 border-t border-base-200">

          <CreditCard size={12} className="text-base-content/40" />

          <span className="text-[10px] text-base-content/50 truncate">
            Last transaction: {lastTransaction ? Number(lastTransaction).toLocaleString() : "No transaction"}{" "}
            {(recent_transaction_type && lastTransaction) && recent_transaction_type
            }
          </span>
        </div>

      </div>
    </div>
  );
};

export default AccountCard;