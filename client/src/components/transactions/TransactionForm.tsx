import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { type TransactionInput, transactionSchema } from "../../types/transaction";

import { useCreateTransaction, useUpdateTransaction } from "../../hooks/useTransactions";
import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";
import { useSavings } from "../../hooks/useSavings";

import TransactionFormTitle from "./TransactionFormTitle";
import TransactionFormCloseButton from "./TransactionFormCloseButton";

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
  });

  const selectedType = watch("type");

  // data
  const { 
    data: accounts, 
    isLoading: accountsLoading } = useAccounts();
  const { 
    data: categories, isLoading: 
    categoriesLoading } = useCategories(selectedType);
  const { 
    data: savings, 
    isLoading: savingsLoading } = useSavings();

  // mutations
  const { 
    mutate: createTransaction, 
    isPending: creating } = useCreateTransaction();
  const { 
    mutate: updateTransaction, 
    isPending: updating } = useUpdateTransaction();

  const isLoading = isTransactionLoading || accountsLoading || categoriesLoading || savingsLoading;
  const isPending = creating || updating;


useEffect(() => {
  if (isLoading) return;
  
  if (mode === "edit" && transaction) {
    reset(transaction);
  } else {
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA"); // Returns YYYY-MM-DD
    reset({
      transaction_date: localDate
    });
  }
}, [mode, transaction, reset, isLoading]);

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
      <TransactionFormCloseButton
        onSuccess={onSuccess}
      />

      <div className="card-body">

        {/* Title */}
        <TransactionFormTitle mode={mode}/>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

          {/* AMOUNT */}
          <div>
            <input
              type="number"
              placeholder="Amount"
              className={`input input-bordered w-full ${errors.amount ? "input-error" : ""}`}
              {...register("amount", { valueAsNumber: true })}
            />
          </div>

          {/* TYPE */}
          <select
            disabled={isTransactionLoading}
            className="select select-bordered w-full"
            {...register("type")}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="savings">Savings</option>
          </select>

          {/* ACCOUNT */}
          <select
            disabled={accountsLoading}
            className={`select select-bordered w-full ${errors.account_id ? "input-error" : ""}`}
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
              disabled={categoriesLoading}
              className={`select select-bordered w-full ${"category_id" in errors && errors.category_id && "input-error"}`}
              {...register("category_id", { valueAsNumber: true })}
            >
              <option value="">
                {categoriesLoading ? "Loading..." : "Select Category"}
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
              disabled={savingsLoading}
              className="select select-bordered w-full"
              {...register("savings_id", { valueAsNumber: true })}
            >
              <option value="">
                {savingsLoading ? "Loading..." : "Select Savings Goal"}
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
            className={`input input-bordered w-full ${errors.transaction_date ? "input-error" : ""}`}
            {...register("transaction_date")}
          />

          {/* DESCRIPTION */}
          <textarea
            className={`input input-bordered w-full ${errors.description ? "input-error" : ""}`}
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