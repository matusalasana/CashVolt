import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Wallet,
  X,
  Tag,
  Calendar,
  FileText,
  DollarSign,
  PlusCircle,
  Save,
  Loader2,
  ArrowUpDown,
} from "lucide-react";

import { type TransactionInput, transactionSchema } from "../../types";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";

interface Props {
  transaction?: TransactionInput & { id: number};
  mode?: "edit" | "add";
  onSuccess?: () => void;
}

const TransactionForm = ({ transaction, mode="add", onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: (mode === "edit" && transaction) 
      ? transaction
      : {transaction_date: new Date().toISOString().split("T")[0],},
  });
  
  const selectedType = watch("type")

  // --- Data ---
  const { data: accounts, isLoading: isAccountsLoading } = useAccounts();
const { data: categories, isLoading: isCategoriesLoading } = useCategories(selectedType);

  // --- Mutations ---
  const { mutate: createTransaction, isPending: isCreating } = useCreateTransaction();
  const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    setValue("category_id", undefined);
  }, [selectedType, setValue]);
  
  useEffect(() => {
    if (mode === "edit" && transaction) {
      reset(transaction);
    }
  }, [transaction, mode, isAccountsLoading, isCategoriesLoading, reset]);

  // --- Handlers ---
  const onFormSubmit = (data: TransactionInput) => {
    if (mode === "edit" && transaction) {
      updateTransaction(
        { id: transaction.id, data: data },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      createTransaction(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    }
  };

  return (
    <div className="relative card w-full max-w-lg bg-base-100 shadow-xl border border-base-200">
      {/* Close Button */}
      <button
        type="button"
        onClick={onSuccess}
        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50 text-base-content/50"
      >
        <X size={20} />
      </button>

      <div className="card-body">
        <h2 className="card-title flex items-center gap-2 text-2xl mb-4">
          {mode === "edit" ? (
            <>
              <Save className="text-primary" /> Edit Transaction
            </>
          ) : (
            <>
              <PlusCircle className="text-success" /> Add Transaction
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Amount */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-base-content/70">Amount</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-base-content/40">
                <DollarSign size={18} />
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`input input-bordered w-full pl-10 ${
                  errors.amount ? "input-error" : "focus:border-primary"
                }`}
                {...register("amount", { valueAsNumber: true })}
              />
            </div>
            {errors.amount && (
              <span className="text-error text-xs mt-1 font-medium">
                {errors.amount.message}
              </span>
            )}
          </div>

          {/* Type */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2 text-base-content/70">
                <ArrowUpDown size={14} /> Transaction Type
              </span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.type ? "select-error" : ""}`}
              {...register("type")}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2 text-base-content/70">
                  <Wallet size={14} /> Account
                </span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.account_id ? "select-error" : ""}`}
                {...register("account_id", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              >
                <option value="">Select Account</option>
                {accounts?.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2 text-base-content/70">
                  <Tag size={14} /> Category
                </span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.category_id ? "select-error" : ""}`}
                {...register("category_id", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2 text-base-content/70">
                <Calendar size={14} /> Date
              </span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("transaction_date")}
            />
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2 text-base-content/70">
                <FileText size={14} /> Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="What was this for?"
              {...register("description")}
            />
          </div>

          {/* Submit */}
          <div className="card-actions justify-end mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary btn-block md:btn-wide flex items-center gap-2"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={18} />
              ) : mode === "edit" ? (
                <>
                  <Save size={18} /> Update Transaction
                </>
              ) : (
                <>
                  <PlusCircle size={18} /> Create Transaction
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
