import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  type TransactionInput, transactionSchema
} from "../../types";

import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";

import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";

import {
  X,
  PlusCircle,
  Save,
  Loader2,
} from "lucide-react";

interface Props {
  transaction?: TransactionInput & { id: number };
  mode?: "edit" | "add";
  onSuccess?: () => void;
  isTransactionLoading?: boolean;
}

const TransactionForm = ({ transaction, isTransactionLoading, mode = "add", onSuccess }: Props) => {
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

  const { data: accounts, isLoading:isAccountLoading } = useAccounts();
  const { data: categories, isLoading: isCategoryLoading } = useCategories(selectedType);

  const { mutate: createTransaction, isPending: isCreating } =
    useCreateTransaction();

  const { mutate: updateTransaction, isPending: isUpdating } =
    useUpdateTransaction();

  const isPending = isCreating || isUpdating;
  const isFormLoading = isTransactionLoading || isAccountLoading || isCategoryLoading

  // Edit mode preload
  useEffect(() => {
    if (mode === "edit" && transaction) {
      reset(transaction);
    }
  }, [
    transaction, 
    mode, 
    reset, 
    isFormLoading,
  ]);

  const onSubmit = (data: TransactionInput) => {

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
      {/* Close button */}
      <button
        type="button"
        onClick={onSuccess}
        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
      >
        <X size={18} />
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* AMOUNT */}
          <div className="form-control">
            <input
              type="number"
              placeholder="Amount"
              className={`input input-bordered w-full ${errors.amount ? 'input-error' : ''}`}
              {...register("amount", {valueAsNumber: true})}
            />
            {errors.amount && (
              <span className="text-error text-xs mt-1">{errors.amount.message}</span>
            )}
          </div>

          {/* TYPE */}
          <div className="form-control">
            <select disabled={isFormLoading} className="select select-bordered w-full" {...register("type")}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* ACCOUNT */}
          <div className="form-control">
            <select disabled={isFormLoading} className="select select-bordered w-full" {...register("account_id", {valueAsNumber: true})}>
              <option value="">{isFormLoading ? "Loading..." : "Select Account"}</option>
              {accounts?.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
            {errors.account_id && (
              <span className="text-error text-xs mt-1">{errors.account_id.message}</span>
            )}
          </div>

          {/* CATEGORY */}
          <div className="form-control">
            <select disabled={isFormLoading} className="select select-bordered w-full" {...register("category_id", {valueAsNumber: true})}>
              <option value="">
                {isFormLoading 
                  ? "Loading..."
                  : "Select Category"
                }
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <span className="text-error text-xs mt-1">{errors.category_id.message}</span>
            )}
          </div>

          {/* DATE */}
          <div className="form-control">
            <input
              type="date"
              className={`input input-bordered w-full ${errors.transaction_date ? 'input-error' : ''}`}
              {...register("transaction_date")}
            />
            {errors.transaction_date && (
              <span className="text-error text-xs mt-1">{errors.transaction_date.message}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="form-control">
            <textarea
              className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-error text-xs mt-1">{errors.description.message}</span>
            )}
          </div>

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