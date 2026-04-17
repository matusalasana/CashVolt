import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { budgetSchema } from "../../types";
import type {
  BudgetFormInput,
  BudgetFormValues,
} from "../../types/forms";

import { useCreateBudget, useUpdateBudget } from "../../hooks/useBudgets";
import { useCategories } from "../../hooks/useCategories";
import { Loader2, X } from "lucide-react";

interface Props {
  budget?: BudgetFormValues & { id: number };
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const BudgetForm = ({ budget, mode = "add", onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetFormInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category_id: "",
      amount: "",
      month: "1",
      year: String(new Date().getFullYear()),
    },
  });

  const { mutate: createBudget, isPending: isCreating } = useCreateBudget();
  const { mutate: updateBudget, isPending: isUpdating } = useUpdateBudget();

  const { data: categories } = useCategories("expense");

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: BudgetFormInput) => {
    const payload: BudgetFormValues = {
      category_id: Number(data.category_id),
      amount: Number(data.amount),
      month: Number(data.month),
      year: Number(data.year),
    };

    if (mode === "edit" && budget) {
      updateBudget(
        { id: budget.id, data: payload },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      createBudget(payload, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    }
  };

  useEffect(() => {
    if (mode === "edit" && budget) {
      reset({
        category_id: String(budget.category_id),
        amount: String(budget.amount),
        month: String(budget.month),
        year: String(budget.year ?? new Date().getFullYear()),
      });
    }
  }, [budget, mode, reset]);

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={onSuccess}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Edit Budget" : "Create Budget"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full"
            {...register("amount")}
          />

          <select
            className="select select-bordered w-full"
            {...register("category_id")}
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            max={12}
            className="input input-bordered w-full"
            {...register("month")}
          />

          <input
            type="number"
            className="input input-bordered w-full"
            {...register("year")}
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