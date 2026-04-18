import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { type BudgetInput, budgetSchema } from "../../types";
import { useCreateBudget, useUpdateBudget } from "../../hooks/useBudgets";
import { useCategories } from "../../hooks/useCategories";
import { Loader2, X } from "lucide-react";

interface Props {
  budget?: BudgetInput & { id: number };
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const BudgetForm = ({ budget, mode = "add", onSuccess }: Props) => {
  const currentYear = new Date().getFullYear();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: currentYear,
      amount: undefined, // Add this to match the BudgetInput type
      category_id: undefined, // Add this to match the BudgetInput type
    },
  });
  
  const monthsOfTheYear = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 }
  ];

  const { mutate: createBudget, isPending: isCreating } = useCreateBudget();
  const { mutate: updateBudget, isPending: isUpdating } = useUpdateBudget();

  const { data: categories } = useCategories("expense");

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: BudgetInput) => {
    if (mode === "edit" && budget) {
      updateBudget(
        { id: budget.id, data: data },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      createBudget(data, {
        onSuccess: () => {
          reset({
            month: new Date().getMonth() + 1,
            year: currentYear,
            amount: undefined,
            category_id: undefined,
          });
          onSuccess?.();
        },
      });
    }
  };

  useEffect(() => {
    if (mode === "edit" && budget) {
      reset({
        ...budget,
        year: budget.year ?? currentYear,
        month: budget.month ?? new Date().getMonth() + 1,
      });
    }
  }, [budget, mode, reset, currentYear]);

  return (
    <div>
      <div className="relative card w-full max-w-lg bg-base-100 shadow-xl border border-base-200 p-5">
        <button
          onClick={onSuccess}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg text-center font-semibold mb-4">
          {mode === "edit" ? "Edit Budget" : "Create Budget"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p id="name-error" className="text-red-500 text-sm">
              {errors.amount.message}
            </p>
          )}

          <select
            className="select select-bordered w-full"
            {...register("category_id", { valueAsNumber: true })}
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p id="category-error" className="text-red-500 text-sm">
              category is required 
            </p>
          )}

          <select
            className="select select-bordered w-full"
            {...register("month", { valueAsNumber: true })}
          >
            <option value="">Select Month</option>
            {monthsOfTheYear?.map((mon) => (
              <option key={mon.value} value={mon.value}>
                {mon.name}
              </option>
            ))}
          </select>
          {errors.month && (
            <p id="month-error" className="text-red-500 text-sm">
              select month
            </p>
          )}

          <input
            type="number"
            readOnly
            className="input input-bordered w-full"
            {...register("year", { valueAsNumber: true })}
          />

          <button className="btn btn-primary w-full" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;