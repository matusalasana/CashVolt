import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TransactionInput, transactionSchema } from "../types";
import { useAccounts } from "../hooks/useAccounts";
import { useCategories } from "../hooks/useCategories";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../hooks/useTransactions";

type Props = {
  mode: "create" | "update";
  transaction?: TransactionInput & { id: number };
  onSuccess?: () => void;
};

const TransactionForm = ({ mode, transaction, onSuccess }: Props) => {
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();

  const { mutate: createTransaction } = useCreateTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      mode === "update" && transaction
        ? transaction
        : {
            transaction_date: new Date().toISOString().split("T")[0],
          },
  });

  const onSubmit = (data: TransactionInput) => {
    if (mode === "create") {
      createTransaction(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    } else {
      updateTransaction(
        { ...data, id: transaction!.id },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Amount */}
      <input
        type="number"
        className="input input-bordered w-full"
        {...register("amount", { valueAsNumber: true })}
        placeholder="Amount (ETB)"
      />

      {/* Description */}
      <textarea
        className="textarea textarea-bordered w-full"
        {...register("description")}
        placeholder="Description"
      />

      {/* Account */}
      <select
        className="select select-bordered w-full"
        {...register("account_id")}
      >
        <option value="">Account</option>
        {accounts?.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      {/* Category */}
      <select
        className="select select-bordered w-full"
        {...register("category_id")}
      >
        <option value="">Category</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Date */}
      <input
        type="date"
        className="input input-bordered w-full"
        {...register("transaction_date")}
      />

      {/* Submit */}
      <button className="btn btn-primary w-full" disabled={isSubmitting}>
        {mode === "create"
          ? "Add Transaction"
          : "Update Transaction"}
      </button>

    </form>
  );
};

export default TransactionForm;