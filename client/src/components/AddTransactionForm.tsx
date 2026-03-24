import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema, type Transaction } from "../types/transaction"; //
import { useTransactions } from "../hooks/useTransactions"; //
import { useCategories } from "../hooks/useCategories"; //
import { useAccounts } from "../hooks/useAccounts"; //

interface Props {
  initialData?: Transaction; // If present, we are EDITING
  onClose: () => void;
}

export const AddTransactionForm = ({ initialData, onClose }: Props) => {
  const { addTransaction, updateTransaction, isUpdating, isAdding } = useTransactions();
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();

  const { register, handleSubmit, formState: { errors } } = useForm<Transaction>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: initialData || {
      type: "expense",
      transaction_date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: Transaction) => {
    if (initialData?.id) {
      // Logic for UPDATE
      updateTransaction(
        { id: initialData.id, data }, 
        { onSuccess: onClose }
      );
    } else {
      // Logic for CREATE
      addTransaction(data, { onSuccess: onClose });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Amount Field */}
      <div>
        <label>Amount</label>
        <input type="number" {...register("amount")} className="border p-2 w-full" />
        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
      </div>

      {/* Source/Title Field */}
      <div>
        <label>Source</label>
        <input {...register("source")} className="border p-2 w-full" />
        {errors.source && <p className="text-red-500">{errors.source.message}</p>}
      </div>

      {/* Account Selection */}
      <div>
        <label>Account</label>
        <select {...register("account_id")} className="border p-2 w-full">
          {accounts?.map((acc: any) => (
            <option key={acc.id} value={acc.id}>Savings</option>
          ))}
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isUpdating || isAdding}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {initialData ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};
