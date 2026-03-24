import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema, type Transaction } from "../types/transaction";
import { useTransactions } from "../hooks/useTransactions";
import { X, Save, AlertCircle } from "lucide-react";

export const AddTransactionForm = () => {
  const { addTransaction, isAdding } = useTransactions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Transaction>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: "expense",
      transaction_date: new Date().toISOString().split("T")[0],
      account_id: 1,
    },
  });

  const onSubmit = (data: Transaction) => {
    addTransaction(data, {
      onSuccess: () => {
        reset();
        const modalCheckbox = document.getElementById("add-tx-modal") as HTMLInputElement;
        if (modalCheckbox) modalCheckbox.checked = false;
      },
    });
  };

  return (
    <>
      {/* The Button */}
      <label htmlFor="add-tx-modal" className="btn btn-primary btn-md shadow-lg gap-2">
        <Save size={18} />
        Add Transaction
      </label>

      {/* The Modal Logic */}
      <input type="checkbox" id="add-tx-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box bg-base-100 border border-base-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black">New Record</h3>
            <label htmlFor="add-tx-modal" className="btn btn-sm btn-circle btn-ghost">
              <X size={20} />
            </label>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Amount & Type Row */}
            <div className="flex gap-4">
              <div className="form-control flex-1">
                <label className="label font-bold text-xs uppercase opacity-60">Amount</label>
                <input
                  {...register("amount")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`input input-bordered text-lg font-semibold ${errors.amount ? 'input-error' : ''}`}
                />
              </div>

              <div className="form-control w-32">
                <label className="label font-bold text-xs uppercase opacity-60">Type</label>
                <select {...register("type")} className="select select-bordered font-bold">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
            </div>

            {/* Source / Merchant */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Source / Merchant</label>
              <input
                {...register("source")}
                placeholder="e.g. Starbucks, Salary, Rent"
                className={`input input-bordered ${errors.source ? 'input-error' : ''}`}
              />
              {errors.source && (
                <label className="label py-1">
                  <span className="label-text-alt text-error flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.source.message}
                  </span>
                </label>
              )}
            </div>

            {/* Date & Category Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase opacity-60">Date</label>
                <input
                  {...register("transaction_date")}
                  type="date"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label font-bold text-xs uppercase opacity-60">Category ID</label>
                <input
                  {...register("category_id", { valueAsNumber: true })}
                  type="number"
                  className="input input-bordered"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Note (Optional)</label>
              <textarea
                {...register("description")}
                className="textarea textarea-bordered h-20"
                placeholder="Add more details..."
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className={`btn btn-primary btn-block h-14 text-lg ${isAdding ? 'loading' : ''}`}
                disabled={isAdding}
              >
                {isAdding ? "Saving..." : "Confirm Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
