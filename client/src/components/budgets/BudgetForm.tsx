import { type BudgetInput, budgetSchema } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useCreateBudget, useUpdateBudget } from "../../hooks/useBudgets";
import { useCategories } from "../../hooks/useCategories";
import { Loader2, X } from "lucide-react";

interface Props {
  budget?: BudgetInput & { id: number };
  mode?: "add" | "edit";
  onSuccess?: () => void;
}

const BudgetForm = ({ budget, mode = "add", onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      amount: 0,
      category_id: undefined,
      month: 1, // ✅ FIXED
      year: new Date().getFullYear(),
    },
  });

  const { mutate: createBudget, isPending: isCreating } = useCreateBudget();
  const { mutate: updateBudget, isPending: isUpdating } = useUpdateBudget();

  const { data: categories } = useCategories("expense");

  const isPending = isCreating || isUpdating;

  const onFormSubmit = (data: BudgetInput) => {
    const payload = {
      category_id: Number(data.category_id),
      amount: Number(data.amount),
      month: Number(data.month), // ✅ FIXED
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
        ...budget,
        month: Number(budget.month),
      });
    }
  }, [budget, mode, reset]);

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">

        <button onClick={onSuccess} className="btn btn-sm btn-circle absolute right-2 top-2">
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {mode === "edit" ? "Edit Budget" : "Create Budget"}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

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
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* MONTH FIXED */}
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
            {isPending ? <Loader2 className="animate-spin" /> : "Save Budget"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;