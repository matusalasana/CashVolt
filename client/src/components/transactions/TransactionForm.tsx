import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, PlusCircle, Save, Loader2 } from "lucide-react";

import { type TransactionInput, transactionSchema } from "../../types";
import { useCreateTransaction, useUpdateTransaction } from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
import { useSavings } from "../../hooks/useSavings";

interface Props {
  transaction?: TransactionInput & { id: number };
  mode?: "edit" | "add";
  onSuccess?: () => void;
  isTransactionLoading?: boolean;
}

const TransactionForm = ({
  transaction,
  mode = "add",
  onSuccess,
  isTransactionLoading,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      transaction_date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  // data
  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const { data: categories, isLoading: categoriesLoading } = useCategories(selectedType);
  const { data: savings, isLoading: savingsLoading } = useSavings();

  // mutations
  const { mutate: createTransaction, isPending: creating } = useCreateTransaction();
  const { mutate: updateTransaction, isPending: updating } = useUpdateTransaction();

  const isLoading = isTransactionLoading || accountsLoading || categoriesLoading || savingsLoading;
  const isPending = creating || updating;

  // reset in edit mode
  useEffect(() => {
    if (mode === "edit" && transaction) {
      reset(transaction);
    }
  }, [mode, transaction, isTransactionLoading, accountsLoading, categoriesLoading, reset]);

  const submitHandler = (data: TransactionInput) => {
    if (mode === "edit" && transaction) {
      updateTransaction(
        { id: transaction.id, data },
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
      
      {/* Close */}
      <button
        type="button"
        onClick={onSuccess}
        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
      >
        <X size={18} />
      </button>

      <div className="card-body">

        {/* Title */}
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

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          {/* AMOUNT */}
          <div>
            <input
              type="number"
              placeholder="Amount"
              className={`input input-bordered w-full ${errors.amount ? "input-error" : ""}`}
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-error text-xs">{errors.amount.message}</p>
            )}
          </div>

          {/* TYPE */}
          <select
            disabled={isLoading}
            className="select select-bordered w-full"
            {...register("type")}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="savings">Savings</option>
          </select>

          {/* ACCOUNT */}
          <select
            disabled={isLoading}
            className="select select-bordered w-full"
            {...register("account_id", { valueAsNumber: true })}
          >
            <option value="">
              {isLoading ? "Loading..." : "Select Account"}
            </option>
            {accounts?.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>

          {/* CATEGORY */}
          {selectedType !== "savings" && (
            <select
              disabled={isLoading}
              className="select select-bordered w-full"
              {...register("category_id", { valueAsNumber: true })}
            >
              <option value="">
                {isLoading ? "Loading..." : "Select Category"}
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}

          {/* SAVINGS */}
          {selectedType === "savings" && (
            <select
              disabled={isLoading}
              className="select select-bordered w-full"
              {...register("savings_id", { valueAsNumber: true })}
            >
              <option value="">
                {isLoading ? "Loading..." : "Select Savings Goal"}
              </option>
              {savings?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          )}

          {/* DATE */}
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("transaction_date")}
          />

          {/* DESCRIPTION */}
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            {...register("description")}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : mode === "edit" ? (
              "Update Transaction"
            ) : (
              "Create Transaction"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default TransactionForm;