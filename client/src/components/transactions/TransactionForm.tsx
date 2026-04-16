import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  transactionSchema,
  type TransactionFormValues,
} from "../../types";

import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";

import { useAccounts } from "../../hooks/useAccounts";
import { useCategories } from "../../hooks/useCategories";

interface Props {
  transaction?: TransactionFormValues & { id: number };
  mode?: "edit" | "add";
  onSuccess?: () => void;
}

const TransactionForm = ({ transaction, mode = "add", onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      type: "expense",
      amount: 0,
      description: "",
      account_id: 0,
      category_id: 0,
      transaction_date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories(selectedType);

  const { mutate: createTransaction, isPending: isCreating } =
    useCreateTransaction();
  const { mutate: updateTransaction, isPending: isUpdating } =
    useUpdateTransaction();

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    setValue("category_id", 0);
  }, [selectedType, setValue]);

  useEffect(() => {
    if (mode === "edit" && transaction) {
      reset(transaction);
    }
  }, [transaction, mode, reset]);

  const onFormSubmit = (data: TransactionFormValues) => {
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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

      <input
        type="number"
        className="input"
        {...register("amount", { valueAsNumber: true })}
      />

      <select {...register("type")}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select {...register("account_id", { valueAsNumber: true })}>
        <option value="">Account</option>
        {accounts?.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <select {...register("category_id", { valueAsNumber: true })}>
        <option value="">Category</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input type="date" {...register("transaction_date")} />

      <textarea {...register("description")} />

      <button disabled={isPending}>
        {isPending ? "Loading..." : "Save"}
      </button>
    </form>
  );
};

export default TransactionForm;