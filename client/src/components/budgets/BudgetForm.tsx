import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { budgetSchema, type BudgetFormValues } from "../../types";
import { useCreateBudget, useUpdateBudget } from "../../hooks/useBudgets";
import { X, Loader2 } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";

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
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      amount: 0,
      category_id: undefined,
      month: 1,
      year: new Date().getFullYear(),
    },
  });

  const { mutate: createBudget, isPending: isCreating } = useCreateBudget();
  const { mutate: updateBudget, isPending: isUpdating } = useUpdateBudget();

  const { data: categories } = useCategories("expense");

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: BudgetFormValues) => {
    const payload = {
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
      reset(budget);
    }
  }, [budget, mode, reset]);

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button onClick={onSuccess} className="btn btn-circle btn-sm absolute right-2 top-2">
          <X size={16} />
        </button>

        <h2 className="text-lg font-bold mb-4">
          {mode === "edit" ? "Edit Budget" : "Create Budget"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("amount", { valueAsNumber: true })}
          />

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

          <input
            type="number"
            min={1}
            max={12}
            className="input input-bordered w-full"
            {...register("month", { valueAsNumber: true })}
          />

          <input
            type="number"
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